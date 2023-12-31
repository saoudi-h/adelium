/* (C)2023 */
package com.adelium.web.mediaservice.repository;

import com.adelium.web.common.repository.BaseRepository;
import com.adelium.web.mediaservice.entity.FileMetadata;
import java.util.Optional;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource(collectionResourceRel = "fileMetadata", path = "fileMetadata")
public interface FileMetadataRepository extends BaseRepository<FileMetadata, Long> {

    Optional<FileMetadata> findByFileName(String fileName);
}
