/* (C)2024 */
package com.adelium.web.authservice.oauth.parser;

import com.adelium.web.authservice.oauth.pojos.OAuthUser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class GitHubUserInfoParser implements UserInfoParser {
    @Override
    public OAuthUser parse(String userInfoJson) {
        // response.getBody() : {
        // "login":"saoudi-h",
        // "id":68503582,
        // "node_id":"MDQ6VXNlcjY4NTAzNTgy",
        // "avatar_url":
        // "https://avatars.githubusercontent.com/u/68503582?v=4",
        // "gravatar_id":"",
        // "url":"https://api.github.com/users/saoudi-h",
        // "html_url":"https://github.com/saoudi-h",
        // "followers_url":"https://api.github.com/users/saoudi-h/followers",
        // "following_url":"https://api.github.com/users/saoudi-h/following{/other_user}",
        // "gists_url":"https://api.github.com/users/saoudi-h/gists{/gist_id}",
        // "starred_url":"https://api.github.com/users/saoudi-h/starred{/owner}{/repo}",
        // "subscriptions_url":"https://api.github.com/users/saoudi-h/subscriptions",
        // "organizations_url":"https://api.github.com/users/saoudi-h/orgs",
        // "repos_url":"https://api.github.com/users/saoudi-h/repos",
        // "events_url":"https://api.github.com/users/saoudi-h/events{/privacy}",
        // "received_events_url":"https://api.github.com/users/saoudi-h/received_events",
        // "type":"User",
        // "site_admin":false,
        // "name":"Hakim Saoudi"
        // "company":null,
        // "blog":"https://hakimsaoudi.dev/",
        // "location":"France",
        // "email":null,
        // "hireable":null,
        // "bio":null,
        // "twitter_username":"hakim__saoudi","public_repos":41,
        // "public_gists":0,"followers":4,"following":14,
        // "created_at":"2020-07-19T12:41:39Z",
        // "updated_at":"2023-12-31T12:23:27Z","private_gists":0,
        // "total_private_repos":10,"owned_private_repos":10,"disk_usage":110950,
        // "collaborators":1,"two_factor_authentication":false,
        // "plan":{"name":"pro","space":976562499,"collaborators":0,"private_repos":9999}}
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
