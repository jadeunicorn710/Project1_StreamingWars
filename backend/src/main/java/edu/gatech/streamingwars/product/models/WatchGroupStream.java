package edu.gatech.streamingwars.product.models;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Data
@Table(name = "watchGroupStreams")
public class WatchGroupStream {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String demoShortName;
    private String streamShortName;
    private BigDecimal watchViewerCount;
}
