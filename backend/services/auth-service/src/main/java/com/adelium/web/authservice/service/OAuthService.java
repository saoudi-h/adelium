/* (C)2024 */
package com.adelium.web.authservice.service;

import com.adelium.web.authservice.dto.TokensDTO;
import com.adelium.web.authservice.entity.OAuthAccount;
import com.adelium.web.authservice.entity.Role;
import com.adelium.web.authservice.entity.User;
import com.adelium.web.authservice.exception.RoleNotFoundException;
import com.adelium.web.authservice.exception.TokenGenerationException;
import com.adelium.web.authservice.exception.TokenRetrievalException;
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
import java.util.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

/**
 * This class is responsible for handling OAuth authentication.
 * <p>
 * It is responsible for exchanging an OAuth code for an access token,
 * exchanging an access token for a user info and creating a user if it does not exist.
 * </p>
 */
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
        return exchangeForToken(providerName, code, true);
    }

    public ResponseEntity<?> exchangeTokenForToken(String providerName, String token) {
        return exchangeForToken(providerName, token, false);
    }

    private ResponseEntity<?> exchangeForToken(
            String providerName, String codeOrToken, boolean isCode) {
        ProviderConfig config = providerConfigs.get(providerName);
        if (config == null) {
            return ResponseEntity.badRequest()
                    .body("Unsupported OAuth provider: " + providerConfigs);
        }

        String accessToken = isCode ? getAccessToken(codeOrToken, config) : codeOrToken;
        OAuthUser oAuthUser = getOAuthUser(accessToken, config);
        if (oAuthUser == null) {
            logger.error("Failed to get OAuth user");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        User user = getUser(oAuthUser, config);
        if (user == null) {
            logger.error("Failed to get user");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        return generateTokens(user);
    }

    private User getUser(OAuthUser oAuthUser, ProviderConfig config) {
        if (oAuthUser == null) {
            return null;
        }

        Optional<User> optionalUser = userRepository.findByUsername(oAuthUser.getUsername());
        return optionalUser
                .map(user -> updateUserInfo(user, oAuthUser))
                .orElseGet(() -> getUserByAccountOrCreate(oAuthUser, config));
    }

    private String getAccessToken(String code, ProviderConfig config)
            throws TokenRetrievalException, TokenGenerationException {

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

        ResponseEntity<String> response =
                restTemplate.postForEntity(
                        config.getProvider().getTokenUri(), request, String.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                JsonNode rootNode = objectMapper.readTree(response.getBody());

                if (rootNode.has("access_token")
                        && !rootNode.get("access_token").asText().isEmpty()) {
                    return rootNode.get("access_token").asText();

                } else {
                    throw new TokenGenerationException("L'access_token est manquant ou invalide.");
                }
            } catch (IOException e) {
                throw new RuntimeException("Erreur lors de l'analyse de la réponse OAuth.");
            }
        } else {
            throw new TokenRetrievalException("Erreur lors de l'obtention du token OAuth.");
        }
    }

    private User getUserByAccountOrCreate(OAuthUser oAuthUser, ProviderConfig config) {
        String providerName = config.getName();

        Optional<OAuthAccount> existingAccount =
                oAuthAccountRepository.findByoAuthIdAndProvider(
                        oAuthUser.getOAuthId(), providerName);

        if (existingAccount.isPresent()) {
            User user = existingAccount.get().getUser();
            updateUserInfo(user, oAuthUser);
            return userRepository.save(user);
        } else {
            User newUser = createNewUser(oAuthUser, config);
            User savedUser = userRepository.save(newUser);

            OAuthAccount newOAuthAccount =
                    OAuthAccount.builder()
                            .provider(providerName)
                            .oAuthId(oAuthUser.getOAuthId())
                            .user(savedUser)
                            .build();
            oAuthAccountRepository.save(newOAuthAccount);
            return savedUser;
        }
    }

    private ResponseEntity<TokensDTO> generateTokens(User user) {
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

    private OAuthUser getOAuthUser(String accessToken, ProviderConfig config) {
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
            return parser.parse(response.getBody());
        } catch (Exception e) {
            logger.error("Error while parsing user info", e);
            return null;
        }
    }

    private User updateUserInfo(User user, OAuthUser oAuthUser) {
        user.setAvatar(oAuthUser.getAvatar());
        user.setFirstname(oAuthUser.getFirstname());
        user.setLastname(oAuthUser.getLastname());
        user.setUsername(oAuthUser.getUsername());
        user.setAvatar(oAuthUser.getAvatar());
        return user;
    }
}
