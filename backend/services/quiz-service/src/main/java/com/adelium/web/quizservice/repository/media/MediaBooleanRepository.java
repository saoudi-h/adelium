/* (C)2024 */
package com.adelium.web.quizservice.repository.media;

import com.adelium.web.common.repository.BaseRepository;
import com.adelium.web.quizservice.entity.media.MediaBoolean;
import jakarta.transaction.Transactional;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
@RepositoryRestResource(collectionResourceRel = "mediaBooleans", path = "media-booleans")
public interface MediaBooleanRepository extends BaseRepository<MediaBoolean, Long> {}
