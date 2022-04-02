package edu.gatech.streamingwars.configuration;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.jdbc.DatabaseDriver;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.support.DatabaseStartupValidator;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import org.flywaydb.core.Flyway;

import java.util.stream.Stream;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        entityManagerFactoryRef = "archiveEntityManagerFactory",
        transactionManagerRef = "archiveTransactionManager",
        basePackages = {"edu.gatech.streamingwars.archive.repo"})
public class ArchiveDatabaseConfiguration {

    @Bean(name = "archiveDataSource")
    @ConfigurationProperties(prefix = "spring.archive-datasource")
    public DataSource archiveDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "archiveEntityManagerFactory")
    @DependsOn({"archiveDataSource","archiveStartupValidator"})
    public LocalContainerEntityManagerFactoryBean
    archiveEntityManagerFactory(
            EntityManagerFactoryBuilder builder,
            @Qualifier("archiveDataSource") DataSource archiveDataSource
    ) {
        Flyway.configure()
                .dataSource(archiveDataSource)
                .locations("db/migration/archive")
                .load()
                .migrate();

        return builder
                .dataSource(archiveDataSource)
                .packages("edu.gatech.streamingwars.archive.models")
                .persistenceUnit("archive")
                .build();
    }

    @Bean(name = "archiveTransactionManager")
    public PlatformTransactionManager archiveTransactionManager(
            @Qualifier("archiveEntityManagerFactory") EntityManagerFactory
                    archiveEntityManagerFactory
    ) {
        return new JpaTransactionManager(archiveEntityManagerFactory);
    }

    @Bean(name="archiveStartupValidator")
    public DatabaseStartupValidator archiveStartupValidator(@Qualifier("archiveDataSource") DataSource archiveDataSource) {
        var validator = new DatabaseStartupValidator();
        validator.setDataSource(archiveDataSource);
        validator.setValidationQuery(DatabaseDriver.POSTGRESQL.getValidationQuery());
        return validator;
    }
}
