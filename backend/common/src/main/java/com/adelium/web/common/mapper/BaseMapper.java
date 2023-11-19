/* (C)2023 */
package com.adelium.web.common.mapper;

import com.adelium.web.common.dto.BaseDTO;
import com.adelium.web.common.entity.BaseEntity;
import java.io.Serializable;
import java.util.List;

public interface BaseMapper<
        Model extends BaseEntity<ID>, DTO extends BaseDTO<ID>, ID extends Serializable> {
    DTO toDTO(Model model);

    Model toEntity(DTO DTO);

    List<DTO> toDTO(List<Model> model);

    List<Model> toEntity(List<DTO> DTO);
}
