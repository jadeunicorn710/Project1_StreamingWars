package edu.gatech.streamingwars.product.models;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Data
@Table(name = "offer")

public class Offer {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;
    private String offerStream;
    private String offerType;
    private String offerEventName;
    private int offerEventYear;
    private BigDecimal offerEventPrice;
}

