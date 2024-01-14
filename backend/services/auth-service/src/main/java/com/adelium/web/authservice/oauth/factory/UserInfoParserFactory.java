/* (C)2024 */
package com.adelium.web.authservice.oauth.factory;

import com.adelium.web.authservice.oauth.parser.GitHubUserInfoParser;
import com.adelium.web.authservice.oauth.parser.GoogleUserInfoParser;
import com.adelium.web.authservice.oauth.parser.UserInfoParser;

public class UserInfoParserFactory {

    public static UserInfoParser getParser(String providerName) {
        switch (providerName.toLowerCase()) {
            case "github":
                return new GitHubUserInfoParser();
            case "google":
                return new GoogleUserInfoParser();
            default:
                throw new IllegalArgumentException(
                        "Parser non disponible pour le fournisseur : " + providerName);
        }
    }
}
