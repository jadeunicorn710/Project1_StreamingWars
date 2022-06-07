package edu.gatech.streamingwars.product.models;

import lombok.Data;

import javax.persistence.*;

// Lombok Data annotation ( @Data ) Generates getters for all fields, 
// a useful toString method, and hashCode and equals implementations 
// that check all non-transient fields. Will also generate setters for all non-final fields, as well as a constructor.
// @Data is a shortcut annotation that combines the features of @ToString, @EqualsAndHashCode, @Getter @Setter, and @RequiredArgsConstructor together.
@Data
// The @Entity annotation specifies that the class is an entity and is mapped to a database table. 
@Entity
// The @Table annotation specifies the name of the database table to be used for mapping.
@Table(name = "accounts")
public class Account {
    // The @Id annotation is inherited from javax.persistence.Id，indicating the member field below is the primary key of current entity. 
    @Id
    // @Column Specifies the mapped column for a persistent property or field. 
    // If no Column annotation is specified, then the filed names will be used for mapping.
    @Column(name = "id")
    // The @GeneratedValue annotation is to configure the way of increment of the specified column(field).
    // For example when using Mysql, you may specify auto_increment in the definition of table to make it self-incremental, and then use following
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;
    private String name;
    private String demoShortName;
    private boolean active;
}
