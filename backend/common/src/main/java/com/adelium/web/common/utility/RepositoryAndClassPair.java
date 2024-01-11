/* (C)2024 */
package com.adelium.web.common.utility;

import org.springframework.data.jpa.repository.JpaRepository;

public record RepositoryAndClassPair<T>(JpaRepository<T, ?> repository, Class<?> entityClass) {}
