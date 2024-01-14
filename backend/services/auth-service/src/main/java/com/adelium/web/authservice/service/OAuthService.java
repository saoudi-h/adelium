/* (C)2024 */
package com.adelium.web.authservice.service;

import com.adelium.web.authservice.dto.TokensDTO;
import com.adelium.web.authservice.entity.OAuthAccount;
import com.adelium.web.authservice.entity.Role;
import com.adelium.web.authservice.entity.User;
import com.adelium.web.authservice.exception.RoleNotFoundException;
import com.adelium.web.authservice.oauth.config.ProviderConfig;
import com.adelium.web.authservice.oauth.factory.UserInfoParserFactory;
import com.adelium.web.authservice.oauth.parser.UserInfoParser;
import com.adelium.web.authservice.oauth.pojos.OAuthUser;
import com.adelium.web.authservice.repository.OAuthAccountRepository;
import com.adelium.web.authservice.repository.RoleRepository;
import com.adelium.web.authservice.repository.UserRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@Service
public class OAuthService {

    private final Map<String, ProviderConfig> providerConfigs;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final TokenService tokenService;
    private final AuthService authService;
    private final OAuthAccountRepository oAuthAccountRepository;
    private final RestTemplate restTemplate;

    private final Logger logger = LoggerFactory.getLogger(OAuthService.class);

    public ResponseEntity<?> exchangeCodeForToken(String providerName, String code) {
        logger.info("exchangeCodeForToken");
        logger.info("providerName : " + providerName);
        ProviderConfig config = providerConfigs.get(providerName);
        if (config == null) {
            return ResponseEntity.badRequest()
                    .body("Fournisseur OAuth non supporté : " + providerConfigs);
        }

        ResponseEntity<String> response = requestToken(config, code);

        return handleTokenResponse(response, config);
    }

    private ResponseEntity<String> requestToken(ProviderConfig config, String code) {
        logger.info("requestToken");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("client_id", config.getRegistration().getClientId());
        map.add("client_secret", config.getRegistration().getClientSecret());
        map.add("code", code);
        map.add("redirect_uri", config.getRegistration().getRedirectUri());
        map.add("grant_type", "authorization_code");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

        return restTemplate.postForEntity(
                config.getProvider().getTokenUri(), request, String.class);
    }

    public ResponseEntity<?> handleTokenResponse(
            ResponseEntity<String> response, ProviderConfig config) {
        logger.info("handleTokenResponse");
        if (response.getStatusCode() == HttpStatus.OK) {
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                JsonNode rootNode = objectMapper.readTree(response.getBody());

                if (rootNode.has("access_token")
                        && !rootNode.get("access_token").asText().isEmpty()) {
                    String accessToken = rootNode.get("access_token").asText();
                    OAuthUser oAuthUser = getOAuthUser(accessToken, config);
                    System.out.println("oAuthUser : " + oAuthUser);
                    if (oAuthUser == null) {
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("Erreur lors de l'analyse de la réponse OAuth.");
                    }

                    User user = null;
                    boolean isUserExist = false;

                    Optional<User> optionalUser =
                            userRepository.findByUsername(oAuthUser.getUsername());
                    if (optionalUser.isPresent()) {
                        isUserExist = true;
                        user = optionalUser.get();
                    } else {
                        user = processOAuthUser(oAuthUser, config);
                        logger.info("user : " + user);
                    }
                    if (isUserExist) {
                        logger.info("user exist");
                        updateUserInfo(user, oAuthUser);
                        user = userRepository.save(user);
                    }
                    logger.info("before generateTokens");
                    return generateTokens(user);

                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body("L'access_token est manquant ou invalide.");
                }
            } catch (IOException e) {
                logger.error("Erreur lors de l'analyse de la réponse OAuth.");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Erreur lors de l'analyse de la réponse OAuth.");
            }
        } else {
            return ResponseEntity.status(response.getStatusCode())
                    .body("Erreur lors de l'obtention du token OAuth.");
        }
    }

    private User processOAuthUser(OAuthUser oAuthUser, ProviderConfig config) {
        logger.info("processOAuthUser");
        String providerName = config.getName();

        Optional<OAuthAccount> existingAccount =
                oAuthAccountRepository.findByoAuthIdAndProvider(
                        oAuthUser.getOAuthId(), providerName);

        if (existingAccount.isPresent()) {
            User user = existingAccount.get().getUser();
            updateUserInfo(user, oAuthUser);
            return userRepository.save(user);
        } else {
            logger.info("before createNewUser");
            User newUser = createNewUser(oAuthUser, config);
            logger.info("after createNewUser");
            logger.info("newUser : " + newUser);
            User savedUser = userRepository.save(newUser);
            logger.info("savedUser : " + savedUser);

            OAuthAccount newOAuthAccount =
                    OAuthAccount.builder()
                            .provider(providerName)
                            .oAuthId(oAuthUser.getOAuthId())
                            .user(savedUser)
                            .build();
            oAuthAccountRepository.save(newOAuthAccount);
            logger.info("newOAuthAccount : " + newOAuthAccount);

            return savedUser;
        }
    }

    private ResponseEntity<TokensDTO> generateTokens(User user) {
        logger.info("generateTokens");
        try {
            var jwtToken = tokenService.generateToken(user);
            var jwtRefreshToken = tokenService.generateRefreshToken(user);
            var refreshToken = authService.saveRefreshToken(user, jwtRefreshToken);
            authService.saveUserToken(user, jwtToken, refreshToken);

            return ResponseEntity.ok(
                    TokensDTO.builder()
                            .accessToken(jwtToken)
                            .refreshToken(jwtRefreshToken)
                            .build());
        } catch (Exception e) {
            logger.error("Interal server error", e);
            throw new RuntimeException("Interal server error");
        }
    }

    private User createNewUser(OAuthUser oAuthUser, ProviderConfig config) {
        logger.info("createNewUser");
        Role userRole =
                roleRepository
                        .findByName("ROLE_USER")
                        .orElseThrow(() -> new RoleNotFoundException("Role USER not found"));

        logger.info("userRole : " + userRole);
        var user =
                User.builder()
                        .enabled(true)
                        .roles(Set.of(userRole))
                        .isOAuthAccount(true)
                        .avatar(oAuthUser.getAvatar())
                        .username(oAuthUser.getUsername())
                        .firstname(oAuthUser.getFirstname())
                        .lastname(oAuthUser.getLastname())
                        .build();
        logger.info("user : " + user);
        return user;
    }

    public OAuthUser getOAuthUser(String accessToken, ProviderConfig config) {
        logger.info("getOAuthUser");
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.setBearerAuth(accessToken);
        HttpEntity<?> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response =
                restTemplate.exchange(
                        config.getProvider().getUserInfoUri(),
                        HttpMethod.GET,
                        entity,
                        String.class);

        UserInfoParser parser = UserInfoParserFactory.getParser(config.getName());
        try {
            logger.info("response.getBody() : " + response.getBody());
            var userParsed = parser.parse(response.getBody());
            logger.info("userParsed : " + userParsed);
            return userParsed;
        } catch (Exception e) {
            logger.error("Error while parsing user info", e);
            return null;
        }
    }

    private void updateUserInfo(User user, OAuthUser oAuthUser) {
        logger.info("updateUserInfo");
        user.setAvatar(oAuthUser.getAvatar());
        user.setFirstname(oAuthUser.getFirstname());
        user.setLastname(oAuthUser.getLastname());
        user.setUsername(oAuthUser.getUsername());
        user.setAvatar(oAuthUser.getAvatar());
    }
}
