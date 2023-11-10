/* (C)2023 */
package com.adelium.web.authservice.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * Represents a request for changing a password, containing the current password, the new password and the confirmation
 * password.
 */
@Getter
@Setter
@Builder
public class ChangePasswordRequest {

    private String currentPassword;
    private String newPassword;
    private String confirmationPassword;
}
