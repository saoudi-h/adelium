/* (C)2023 */
package com.adelium.web.quizservice.core.media;

import com.adelium.web.common.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;

/**
 * This abstract class represents a base media entity that extends the BaseEntity class and implements the Media interface.
 * It is used as a parent class for all media entities in the quiz service.
 */
@Entity(name = "media")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class BaseMedia extends BaseEntity<Long> implements Media {}
