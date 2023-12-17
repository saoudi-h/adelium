/* (C)2023 */
package com.adelium.web.quizservice.config;

import com.adelium.web.common.client.AuthServiceClient;
import com.adelium.web.common.security.JwtFilter;
import com.adelium.web.common.security.JwtService;
import org.springframework.stereotype.Component;

@Component
public class JwtQuizFilter extends JwtFilter {
    public JwtQuizFilter(JwtService jwtService, AuthServiceClient authServiceClient) {
        super(jwtService, authServiceClient);
    }
}
