/* (C)2024 */
package com.adelium.web.authservice.oauth.parser;

import com.adelium.web.authservice.oauth.pojos.OAuthUser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class GoogleUserInfoParser implements UserInfoParser {
    @Override
    public OAuthUser parse(String userInfoJson) {

        // TODO : parse the REAL JSON response from Google to get the user info
        // currently, we just return the same thing as GitHub, which is probably wrong
        ObjectMapper mapper = new ObjectMapper();

        try {
            JsonNode rootNode = mapper.readTree(userInfoJson);
            String username = rootNode.get("login").asText();
            int oAuthId = rootNode.get("id").asInt();
            String avatar = rootNode.get("avatar_url").asText();
            String name = rootNode.get("name").asText();
            String email = rootNode.get("email").asText();
            String firstName = name.split(" ")[0];
            String lastName = name.split(" ")[1];
            String profileUrl = rootNode.get("html_url").asText();
            return OAuthUser.builder()
                    .oAuthId(String.valueOf(oAuthId))
                    .email(email)
                    .firstname(firstName)
                    .lastname(lastName)
                    .username(username)
                    .avatar(avatar)
                    .profile(profileUrl)
                    .build();
        } catch (Exception e) {
            return null;
        }
    }
}
