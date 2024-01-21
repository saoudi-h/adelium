/* (C)2023 */
package com.adelium.web.mediaservice.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.adelium.web.mediaservice.entity.FileMetadata;
import com.adelium.web.mediaservice.repository.FileMetadataRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@WithMockUser(
        username = "user123",
        roles = {"ADMIN"})
public class FileStorageServiceTest {

    @Autowired private MockMvc mockMvc;

    @Autowired private FileMetadataRepository fileMetadataRepository;

    @Value("${file.storage-location.public}")
    private String testPublicStorageLocation;

    private final String testFileName = "testfile.txt";
    private final String testFileContent = "Contenu du test";

    @BeforeEach
    public void setup() throws IOException {
        Path testFilePath = Paths.get(testPublicStorageLocation, testFileName);
        Files.write(testFilePath, testFileContent.getBytes());
    }

    @AfterEach
    public void cleanup() {
        Path publicStorageDir = Paths.get(testPublicStorageLocation);
        try {
            Files.newDirectoryStream(publicStorageDir, path -> path.toFile().isFile())
                    .forEach(
                            path -> {
                                try {
                                    Files.deleteIfExists(path);
                                } catch (IOException e) {
                                    e.printStackTrace();
                                }
                            });
        } catch (IOException e) {
            e.printStackTrace();
        }
        fileMetadataRepository.deleteAll();
    }

    @Test
    public void testFileUploadAndMetadataStorageByOriginalFileName() throws Exception {
        MockMultipartFile file =
                new MockMultipartFile(
                        "file",
                        testFileName,
                        MediaType.TEXT_PLAIN_VALUE,
                        testFileContent.getBytes());

        mockMvc.perform(
                        MockMvcRequestBuilders.multipart("/files/upload/true")
                                .file(file)
                                .param("ownerId", "user123"))
                .andExpect(status().isOk());

        List<FileMetadata> listMetadata =
                fileMetadataRepository.findByOriginalFileName(testFileName);
        assertEquals(1, listMetadata.size());
        FileMetadata metadata = listMetadata.get(0);
        assertEquals(testFileName, metadata.getOriginalFileName());
        assertEquals(testFileContent.length(), metadata.getSize());
    }

    @Test
    public void testFileUploadAndMetadataStorageByFileName() throws Exception {
        MockMultipartFile file =
                new MockMultipartFile(
                        "file",
                        testFileName,
                        MediaType.TEXT_PLAIN_VALUE,
                        testFileContent.getBytes());

        MvcResult result =
                mockMvc.perform(
                                MockMvcRequestBuilders.multipart("/files/upload/true")
                                        .file(file)
                                        .param("ownerId", "user123"))
                        .andExpect(status().isOk())
                        .andReturn();

        String responseString = result.getResponse().getContentAsString();
        String newFileName = extractNewFileName(responseString);

        Optional<FileMetadata> metadata = fileMetadataRepository.findByFileName(newFileName);
        assertTrue(metadata.isPresent());
        assertEquals("user123", metadata.get().getOwnerName());
    }

    private String extractNewFileName(String responseJson) throws JsonProcessingException {

        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = mapper.readTree(responseJson);
        JsonNode urlNode = rootNode.path("url");
        String url = urlNode.asText();
        return url.substring(url.lastIndexOf('/') + 1);
    }

    @Test
    public void testFileRetrieval() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/files/true/" + testFileName))
                .andExpect(status().isOk())
                .andExpect(content().string(testFileContent));
    }
}
