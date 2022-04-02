package edu.gatech.streamingwars.product.models;

import javax.persistence.*;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;


@Entity
@Data
@Table(name = "studios")
public class StudioModel { //rename
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)

    private int id;
    private String studioShortName;
    private String studioLongName;
    @ColumnDefault("0")
    private BigDecimal studioCurrentRevenue;
    @ColumnDefault("0")
    private BigDecimal studioPreviousRevenue;
    @ColumnDefault("0")
    private BigDecimal studioTotalRevenue;
}