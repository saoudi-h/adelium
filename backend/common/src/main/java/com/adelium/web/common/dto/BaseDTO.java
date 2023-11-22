/* (C)2023 */
package com.adelium.web.common.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@SuperBuilder
public abstract class BaseDTO<ID> {
    protected ID id;
}
