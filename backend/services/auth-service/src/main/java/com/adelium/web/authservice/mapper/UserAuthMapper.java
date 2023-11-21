/* (C)2023 */
package com.adelium.web.authservice.mapper;

import com.adelium.web.authservice.entity.User;
import com.adelium.web.common.dto.UserAuthDTO;
import com.adelium.web.common.mapper.BaseMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserAuthMapper extends BaseMapper<User, UserAuthDTO, Long> {}
