/* (C)2024 */
package com.adelium.web.quizservice.repository.option;

import com.adelium.web.common.repository.BaseRepository;
import com.adelium.web.quizservice.entity.option.OptionMCQ;
import jakarta.transaction.Transactional;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
@RepositoryRestResource(collectionResourceRel = "optionMcqs", path = "option-mcqs")
public interface OptionMcqRepository extends BaseRepository<OptionMCQ, Long> {}
