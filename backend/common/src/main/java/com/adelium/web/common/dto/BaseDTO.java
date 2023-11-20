/* (C)2023 */
package com.adelium.web.common.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public abstract class BaseDTO<ID> {
    protected ID id;
}
