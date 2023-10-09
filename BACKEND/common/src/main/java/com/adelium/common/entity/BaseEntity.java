package com.adelium.common.entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;

@MappedSuperclass
@NoArgsConstructor
@AllArgsConstructor
@Data
@SuperBuilder
public abstract class BaseEntity<ID extends Serializable> {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    protected ID id;
}
