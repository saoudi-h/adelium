/* (C)2023 */
package com.adelium.web.authservice.exception;

public class TokenRetrievalException extends RuntimeException {
    public TokenRetrievalException(String message) {
        super(message);
    }

    public TokenRetrievalException(String message, Throwable cause) {
        super(message, cause);
    }
}
