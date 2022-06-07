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
// used to scan the packages for configuration and repository class for Spring Data JPA.
@EnableJpaRepositories(
        entityManagerFactoryRef = "streamingWarsEntityManagerFactory",
        transactionManagerRef = "streamingWarsTransactionManager",
        basePackages = {"edu.gatech.streamingwars.product.repo"})
public class StreamingWarsDatabaseConfiguration {

    // This annotation defines a preference when multiple beans of the same type are present. 
    // The bean associated with the @Primary annotation will be used unless otherwise indicated.
    @Primary
    // @Bean annotation returns an object that spring registers as a bean in application context.
    // applied on a method to specify that it returns a bean to be managed by Spring context.
    // usually declared in Configuration classes methods. This annotation is also a part of the spring core framework
    // Here the method name is the bean id/bean name
    @Bean(name = "streamingDataSource")
    @ConfigurationProperties(prefix = "spring.streaming-datasource")
    // create the custom DataSource object
    public DataSource streamingDataSource() {
        return DataSourceBuilder.create().build();
    }

    // LocalContainerEntityManagerFactoryBean is the most powerful JPA setup option, 
    // allowing for flexible local configuration within the application.
    @Primary
    @Bean(name = "streamingWarsEntityManagerFactory")
    @DependsOn({"streamingDataSource","streamingStartupValidator"})
    public LocalContainerEntityManagerFactoryBean
    streamingWarsEntityManagerFactory(
            EntityManagerFactoryBuilder builder,
            // By using the @Qualifier annotation, we can eliminate the issue of which bean needs to be injected.
            // By including the @Qualifier annotation, together with the name of the specific implementation we want to use,
            // we can avoid ambiguity when Spring finds multiple beans of the same type.
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
    // The PlatformTransactionManager helps the template to create, commit, or rollback transactions
    @Bean(name = "streamingWarsTransactionManager")
    public PlatformTransactionManager streamingWarsTransactionManager(
            @Qualifier("streamingWarsEntityManagerFactory") EntityManagerFactory
                    streamingWarsEntityManagerFactory
    ) {
        return new JpaTransactionManager(streamingWarsEntityManagerFactory);
    }

    // Bean that checks if a database has already started up
    @Bean(name="streamingStartupValidator")
    public DatabaseStartupValidator streamingStartupValidator(@Qualifier("streamingDataSource") DataSource streamingDataSource) {
        var validator = new DatabaseStartupValidator();
        validator.setDataSource(streamingDataSource);
        validator.setValidationQuery(DatabaseDriver.POSTGRESQL.getValidationQuery());
        return validator;
    }
}
