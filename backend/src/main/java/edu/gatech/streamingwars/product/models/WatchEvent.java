package edu.gatech.streamingwars.product.models;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Data
@Table(name = "watchEvents")
public class WatchEvent {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String watchDemoGroup;
    private int watchPercentage;
    private String watchStream;
    private String watchEventName;
    private int watchEventYear;
    private String watchType;

    @Transient
    private BigDecimal watchViewerCount;

    @Transient
    private BigDecimal watchSubscriptionFee;

    @Transient
    private BigDecimal watchPayPerViewPrice;

    @Transient
    private BigDecimal watchViewingCost;
}
