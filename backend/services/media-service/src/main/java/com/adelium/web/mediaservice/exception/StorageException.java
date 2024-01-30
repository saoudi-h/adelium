/* (C)2024 */
package com.adelium.web.mediaservice.exception;

/**
 * Storage exception.
 */
public class StorageException extends RuntimeException {
    public StorageException(String message) {
        super(message);
    }

    /**
     * Constructor.
     *
     * @param message message
     * @param cause   cause
     */
    public StorageException(String message, Throwable cause) {
        super(message, cause);
    }
}
