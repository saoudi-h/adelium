/* (C)2023 */
package com.adelium.web.common.client;

import com.adelium.web.common.dto.UserDetailsDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "auth-service", contextId = "authServiceClient")
public interface AuthServiceClient {
    @GetMapping("/users/by-username/{username}")
    ResponseEntity<UserDetailsDTO> getUser(@PathVariable("username") String username);
}
