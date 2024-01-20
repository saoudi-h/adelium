/* (C)2024 */
package com.adelium.web.common.controller;

import com.adelium.web.common.service.ExportService;
import com.adelium.web.common.utility.EntityResolver;
import com.adelium.web.common.utility.RepositoryAndClassPair;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ExportController {

    private final ExportService exportService;
    private final EntityResolver entityResolver;

    private final Logger logger = LoggerFactory.getLogger(ExportController.class);

    @GetMapping("/export/csv/{entity}/all")
    public ResponseEntity<byte[]> exportAll(@PathVariable("entity") String entity) {
        Optional<RepositoryAndClassPair<?>> resolvedEntity = entityResolver.resolveEntity(entity);

        if (resolvedEntity.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        JpaRepository<?, ?> repository = resolvedEntity.get().repository();
        Class<?> entityClass = resolvedEntity.get().entityClass();

        List<?> entities = repository.findAll();
        byte[] csvData = exportService.exportToCSV(entities, entityClass);

        String dateTime =
                LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy-HH-mm"));
        String filename = entity + "_" + dateTime + ".csv";

        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename);
        headers.set(HttpHeaders.CONTENT_TYPE, "text/csv");

        return ResponseEntity.ok().headers(headers).body(csvData);
    }
}
