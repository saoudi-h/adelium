/* (C)2023 */
package com.adelium.web.common.config;

import feign.RequestInterceptor;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Configuration
public class FeignConfig {
    @Bean
    public RequestInterceptor requestInterceptor() {
        return (requestTemplate) -> {
            ServletRequestAttributes requestAttributes =
                    (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            HttpServletRequest request = null;
            if (requestAttributes != null) {
                request = requestAttributes.getRequest();
                String token = request.getHeader(HttpHeaders.AUTHORIZATION);
                if (token != null) {
                    requestTemplate.header(HttpHeaders.AUTHORIZATION, token);
                }
            }
        };
    }
}
