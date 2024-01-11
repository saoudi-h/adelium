/* (C)2024 */
package com.adelium.web.common.utility;

import java.util.Optional;

public interface EntityResolver {
    Optional<RepositoryAndClassPair<?>> resolveEntity(String entityName);
}
