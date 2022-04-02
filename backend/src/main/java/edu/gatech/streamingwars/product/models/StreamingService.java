package edu.gatech.streamingwars.product.models;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Data
@Table(name = "streamingServices")
public class StreamingService {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;
    private String streamShortName;
    private String streamLongName;
    private BigDecimal streamSubscription;
    private BigDecimal streamCurrentRevenue;
    private BigDecimal streamPreviousRevenue;
    private BigDecimal streamTotalRevenue;
    private BigDecimal streamLicensing;
}
