package edu.gatech.streamingwars.product.models;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "accounts")
public class Account {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;
    private String name;
    private String demoShortName;
    private boolean active;
}
