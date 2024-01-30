/* (C)2024 */
package com.adelium.web.common.service;

import com.adelium.web.common.exception.CsvCreationException;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.lang.reflect.Field;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
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
                                CSVFormat.Builder.create()
                                        .setHeader(extractHeader(entityClass))
                                        .build())) {

            for (Object entity : entities) {
                csvPrinter.printRecord(extractValues(entity));
            }
            csvPrinter.flush();
            return out.toByteArray();
        } catch (IOException | IllegalAccessException e) {
            throw new CsvCreationException("Error while creating CSV file", e);
        }
    }

    private <T> String[] extractHeader(Class<T> entityClass) {
        Set<String> headers = new LinkedHashSet<>();
        Class<?> currentClass = entityClass;

        while (currentClass != null) {
            Field[] fields = currentClass.getDeclaredFields();
            for (Field field : fields) {
                if (field.isAnnotationPresent(JsonIgnore.class)) {
                    continue;
                }
                headers.add(field.getName());
            }
            currentClass = currentClass.getSuperclass();
        }

        return headers.toArray(new String[0]);
    }

    private <T> List<Object> extractValues(T entity) throws IllegalAccessException {
        List<Object> values = new ArrayList<>();
        Class<?> currentClass = entity.getClass();

        while (currentClass != null) {
            Field[] fields = currentClass.getDeclaredFields();
            for (Field field : fields) {
                if (field.isAnnotationPresent(JsonIgnore.class)) {
                    continue;
                }
                field.setAccessible(true);
                values.add(field.get(entity));
            }
            currentClass = currentClass.getSuperclass();
        }

        return values;
    }
}
