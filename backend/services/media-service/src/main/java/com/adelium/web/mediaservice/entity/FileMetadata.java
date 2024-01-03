/* (C)2023 */
package com.adelium.web.mediaservice.entity;

import com.adelium.web.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.util.Date;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
public class FileMetadata extends BaseEntity<Long> {

    @Column(unique = true)
    private String fileName;

    private String originalFileName;

    private String fileDownloadUri;

    private String fileType;

    private long size;

    @Column(nullable = false)
    @Builder.Default
    private boolean isPublic = false;

    private String ownerName;

    @Temporal(TemporalType.TIMESTAMP)
    @Builder.Default
    private Date uploadDate = new Date();
}
