package edu.gatech.streamingwars.configuration;

import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManagerFactory;
import java.util.stream.Stream;

@Configuration
public class ConnectionValidatorConfiguration {
    @Bean
    public static BeanFactoryPostProcessor dependsOnPostProcessor() {
        return bf -> {
            String[] flyway = bf.getBeanNamesForType(Flyway.class);
            Stream.of(flyway)
                    .map(bf::getBeanDefinition)
                    .forEach(it -> it.setDependsOn("archiveStartupValidator"));

            String[] jpa = bf.getBeanNamesForType(EntityManagerFactory.class);
            Stream.of(jpa)
                    .map(bf::getBeanDefinition)
                    .forEach(it -> it.setDependsOn("archiveStartupValidator"));

            String[] flywayStreaming = bf.getBeanNamesForType(Flyway.class);
            Stream.of(flywayStreaming)
                    .map(bf::getBeanDefinition)
                    .forEach(it -> it.setDependsOn("streamingStartupValidator"));

            String[] jpaStreaming = bf.getBeanNamesForType(EntityManagerFactory.class);
            Stream.of(jpaStreaming)
                    .map(bf::getBeanDefinition)
                    .forEach(it -> it.setDependsOn("streamingStartupValidator"));
        };
    }
}
