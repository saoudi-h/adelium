/* (C)2023 */
package com.adelium.web.authservice.exception;

/**
 * Exception thrown when a username already exists.
 */
public class UsernameAlreadyExistsException extends RuntimeException {

    public UsernameAlreadyExistsException(String message) {
        super(message);
    }
}
