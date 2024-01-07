/* (C)2024 */
package com.adelium.web.quizservice.deserializer;

import com.adelium.web.quizservice.core.media.BaseMedia;
import com.adelium.web.quizservice.entity.media.MediaBoolean;
import com.adelium.web.quizservice.entity.media.MediaLong;
import com.adelium.web.quizservice.entity.media.MediaText;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.io.IOException;

public class MediaDeserializer extends JsonDeserializer<BaseMedia> {

    @Override
    public BaseMedia deserialize(JsonParser jp, DeserializationContext ctxt)
            throws IOException, JsonProcessingException {
        ObjectMapper mapper = (ObjectMapper) jp.getCodec();
        ObjectNode root = jp.readValueAsTree();

        String type = root.get("type").asText();
        Class<? extends BaseMedia> concreteClass = getConcreteClass(type);

        return mapper.treeToValue(root, concreteClass);
    }

    private Class<? extends BaseMedia> getConcreteClass(String type) {
        switch (type) {
            case "text":
                return MediaText.class;
            case "boolean":
                return MediaBoolean.class;
            case "long":
                return MediaLong.class;
            default:
                throw new IllegalArgumentException("Type non reconnu");
        }
    }
}
