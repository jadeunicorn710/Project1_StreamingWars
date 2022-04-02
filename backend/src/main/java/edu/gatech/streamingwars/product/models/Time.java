package edu.gatech.streamingwars.product.models;

import lombok.Data;
import javax.persistence.*;

@Entity
@Data
@Table(name = "time")
public class Time {

    @Id
    @Column(name ="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int monthTimeStamp = 10;
    private int yearTimeStamp = 2020;
}
