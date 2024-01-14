/* (C)2024 */
package com.adelium.web.authservice.oauth.config;

import lombok.Data;

@Data
public class ProviderConfig {
    private String name;
    private Provider provider;
    private Registration registration;
}
