package edu.gatech.streamingwars.configuration;

import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.jdbc.DatabaseDriver;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.support.DatabaseStartupValidator;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        entityManagerFactoryRef = "streamingWarsEntityManagerFactory",
        transactionManagerRef = "streamingWarsTransactionManager",
        basePackages = {"edu.gatech.streamingwars.product.repo"})
public class StreamingWarsDatabaseConfiguration {

    @Primary
    @Bean(name = "streamingDataSource")
    @ConfigurationProperties(prefix = "spring.streaming-datasource")
    public DataSource streamingDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Primary
    @Bean(name = "streamingWarsEntityManagerFactory")
    @DependsOn({"streamingDataSource","streamingStartupValidator"})
    public LocalContainerEntityManagerFactoryBean
    streamingWarsEntityManagerFactory(
            EntityManagerFactoryBuilder builder,
            @Qualifier("streamingDataSource") DataSource streamingDataSource
    ) {
        Flyway.configure()
                .dataSource(streamingDataSource)
                .locations("db/migration/product")
                .load()
                .migrate();

        return builder
                .dataSource(streamingDataSource)
                .packages("edu.gatech.streamingwars.product.models")
                .persistenceUnit("streaming")
                .build();
    }
    @Bean(name = "streamingWarsTransactionManager")
    public PlatformTransactionManager streamingWarsTransactionManager(
            @Qualifier("streamingWarsEntityManagerFactory") EntityManagerFactory
                    streamingWarsEntityManagerFactory
    ) {
        return new JpaTransactionManager(streamingWarsEntityManagerFactory);
    }

    @Bean(name="streamingStartupValidator")
    public DatabaseStartupValidator streamingStartupValidator(@Qualifier("streamingDataSource") DataSource streamingDataSource) {
        var validator = new DatabaseStartupValidator();
        validator.setDataSource(streamingDataSource);
        validator.setValidationQuery(DatabaseDriver.POSTGRESQL.getValidationQuery());
        return validator;
    }
}
