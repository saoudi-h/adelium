/* (C)2024 */
package com.adelium.web.authservice.oauth.parser;

import com.adelium.web.authservice.oauth.pojos.OAuthUser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class GoogleUserInfoParser implements UserInfoParser {
    @Override
    public OAuthUser parse(String userInfoJson) {

        ObjectMapper mapper = new ObjectMapper();

        try {
            JsonNode rootNode = mapper.readTree(userInfoJson);
            String username = rootNode.get("email").asText();
            String oAuthId = rootNode.get("sub").asText();
            String avatar = rootNode.get("picture").asText();
            String firstName = rootNode.get("given_name").asText();
            String lastName = rootNode.get("family_name").asText();
            return OAuthUser.builder()
                    .oAuthId(oAuthId)
                    .email(username)
                    .firstname(firstName)
                    .lastname(lastName)
                    .username(username)
                    .avatar(avatar)
                    .build();
        } catch (Exception e) {
            return null;
        }
    }
}
