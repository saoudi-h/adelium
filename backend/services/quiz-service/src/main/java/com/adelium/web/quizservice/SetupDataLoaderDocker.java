/* (C)2023 */
package com.adelium.web.quizservice;

import com.adelium.web.quizservice.core.tag.Tag;
import com.adelium.web.quizservice.repository.tag.TagRepository;
import com.github.javafaker.Faker;
import jakarta.transaction.Transactional;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Profile;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

/**
 * This class is responsible for loading initial data into the database when the application starts.
 * It implements ApplicationListener to listen to the ContextRefreshedEvent event.
 * It creates default roles, authorities, and a user with admin privileges if they do not exist in the database.
 *
 * @see ApplicationListener
 * @see ContextRefreshedEvent
 * @see Component
 */
@Component
@Profile("docker")
@RequiredArgsConstructor
public class SetupDataLoaderDocker implements ApplicationListener<ContextRefreshedEvent> {

    private final TagRepository tagRepository;
    private boolean alreadySetup = false;

    private final Faker faker = new Faker();

    @Override
    @Transactional
    public void onApplicationEvent(ContextRefreshedEvent event) {

        if (alreadySetup) return;

        for (int i = 0; i < 30; i++) {
            createTagIfNotFound(faker.programmingLanguage().name().toUpperCase());
        }

        alreadySetup = true;
    }

    @Transactional
    public Tag createTagIfNotFound(String name) {

        Optional<Tag> optionalTag = tagRepository.findByName(name);
        Tag tag = null;
        if (optionalTag.isEmpty()) {
            tag = Tag.builder().name(name).build();
            tagRepository.save(tag);
        } else {
            tag = optionalTag.get();
        }
        return tag;
    }
}
