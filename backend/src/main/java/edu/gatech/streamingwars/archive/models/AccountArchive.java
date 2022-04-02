package edu.gatech.streamingwars.archive.models;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "accountarchive")
public class AccountArchive {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    private String name;
    private String demoShortName;
    private boolean active;
}
