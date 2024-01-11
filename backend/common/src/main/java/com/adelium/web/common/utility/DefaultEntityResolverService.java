/* (C)2024 */
package com.adelium.web.common.utility;

import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class DefaultEntityResolverService implements EntityResolver {

    @Override
    public Optional<RepositoryAndClassPair<?>> resolveEntity(String entityName) {
        return Optional.empty();
    }
}
