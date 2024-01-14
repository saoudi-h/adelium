/* (C)2024 */
package com.adelium.web.authservice.oauth.config;

import lombok.Data;

@Data
public class Provider {
    private String authorizationUri;
    private String tokenUri;
    private String userInfoUri;
    private String userNameAttribute;
}
