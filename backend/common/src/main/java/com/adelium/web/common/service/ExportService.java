/* (C)2024 */
package com.adelium.web.common.service;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.lang.reflect.Field;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.stereotype.Service;

@Service
public class ExportService {

    public byte[] exportToCSV(List<?> entities, Class<?> entityClass) {
        try (ByteArrayOutputStream out = new ByteArrayOutputStream();
                CSVPrinter csvPrinter =
                        new CSVPrinter(
                                new OutputStreamWriter(out, StandardCharsets.UTF_8),
                                CSVFormat.DEFAULT.withHeader(extractHeader(entityClass)))) {

            for (Object entity : entities) {
                csvPrinter.printRecord(extractValues(entity));
            }
            csvPrinter.flush();
            return out.toByteArray();
        } catch (IOException | IllegalAccessException e) {
            throw new RuntimeException("Erreur lors de la création du fichier CSV", e);
        }
    }

    private String[] extractHeader(Class<?> entityClass) {
        List<String> headers = new ArrayList<>();
        for (Field field : entityClass.getDeclaredFields()) {
            if (field.isAnnotationPresent(JsonIgnore.class)) {
                continue;
            }
            headers.add(field.getName());
        }
        return headers.toArray(new String[0]);
    }

    private List<Object> extractValues(Object entity) throws IllegalAccessException {
        List<Object> values = new ArrayList<>();
        Field[] fields = entity.getClass().getDeclaredFields();
        for (Field field : fields) {
            if (field.isAnnotationPresent(JsonIgnore.class)) {
                continue;
            }
            field.setAccessible(true);
            values.add(field.get(entity));
        }
        return values;
    }
}
