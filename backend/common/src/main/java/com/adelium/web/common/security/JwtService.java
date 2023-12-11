/* (C)2023 */
package com.adelium.web.common.security;

import com.adelium.web.common.dto.TokenDTO;
import com.adelium.web.common.dto.UserDetailsDTO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    @Value("${application.security.jwt.secret-key}")
    private String secretKey;

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        if (token == null || claimsResolver == null) {
            return null;
        }
        final Claims claims = extractAllClaims(token);
        if (claims == null) {
            return null;
        }

        return claimsResolver.apply(claims);
    }

    public boolean isTokenValid(String token, UserDetailsDTO userDetails) {
        if (token == null || userDetails == null) {
            return false;
        }

        Set<TokenDTO> tokens = userDetails.getTokens();
        if (tokens == null) {
            return false;
        }

        final Optional<TokenDTO> serverTokenOptional =
                tokens.stream().filter(t -> t.token.equals(token)).findFirst();

        if (serverTokenOptional.isEmpty()) {
            return false;
        }

        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()))
                && !isTokenExpired(token)
                && !serverTokenOptional.get().isRevoked();
    }

    private boolean isTokenExpired(String token) {
        try {
            return extractExpiration(token).before(new Date());
        } catch (Exception e) {
            return true;
        }
    }

    private Date extractExpiration(String token) {

        return extractClaim(token, Claims::getExpiration);
    }

    public Claims extractAllClaims(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(getSignInKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (Exception e) {
            return null;
        }
    }

    private SecretKey getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public boolean isRefreshValid(String token, UserDetailsDTO userDetails) {
        if (token == null || userDetails == null) {
            return false;
        }

        Set<TokenDTO> tokens = userDetails.getTokens();
        if (tokens == null) {
            return false;
        }

        final Optional<TokenDTO> serverTokenOptional =
                tokens.stream().filter(t -> t.token.equals(token)).findFirst();

        if (serverTokenOptional.isEmpty()) {
            return false;
        }

        final String username = extractUsername(token);

        return (username.equals(userDetails.getUsername()))
                && !isTokenExpired(token)
                && !serverTokenOptional.get().isRevoked();
    }
}
