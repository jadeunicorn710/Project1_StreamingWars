package edu.gatech.streamingwars.product.models;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Data
@Table(name = "events")
public class Event {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String eventType;
    private String eventFullName;
    private String eventStudioOwner;
    private int eventYear;
    private int eventDuration;
    private BigDecimal eventLicenseFee;
}
