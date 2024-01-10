/* (C)2023 */
package com.adelium.web.quizservice.entity.media;

import com.adelium.web.common.entity.BaseEntity;
import com.adelium.web.quizservice.core.media.Media;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/**
 * This abstract class represents a base media entity that extends the BaseEntity class and implements the Media interface.
 * It is used as a parent class for all media entities in the quiz service.
 */
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@Data
@SuperBuilder
@Entity(name = "media")
@Inheritance(strategy = InheritanceType.JOINED)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
    @JsonSubTypes.Type(value = MediaText.class, name = "text"),
    @JsonSubTypes.Type(value = MediaBoolean.class, name = "boolean"),
    @JsonSubTypes.Type(value = MediaLong.class, name = "long")
})
public abstract class BaseMedia extends BaseEntity<Long> implements Media {}
