/* (C)2024 */
package com.adelium.web.authservice.oauth.parser;

import com.adelium.web.authservice.oauth.pojos.OAuthUser;
import com.fasterxml.jackson.core.JsonProcessingException;

public interface UserInfoParser {
    OAuthUser parse(String userInfoJson) throws JsonProcessingException;
}
