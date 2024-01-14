/* (C)2024 */
package com.adelium.web.authservice.oauth.pojos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OAuthUser {
    // TODO: email not used yet
    private String email;
    private String firstname;
    private String lastname;
    private String username;
    private String oAuthId;
    private String avatar;
    // TODO: profile not used yet
    private String profile;
}
