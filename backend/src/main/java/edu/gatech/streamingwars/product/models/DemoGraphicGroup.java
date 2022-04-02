package edu.gatech.streamingwars.product.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Data
@Entity
@Table(name = "demoGroups")

public class DemoGraphicGroup {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;
    private String demoShortName;
    private String demoLongName;

    private BigDecimal demoCurrentSpending;
    private BigDecimal demoPreviousSpending;
    private BigDecimal demoTotalSpending;

    @Transient
    @JsonIgnore
    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    private List<Account> accounts;

    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    private int demoAccounts;

    public List<Account> getAccounts() {
        return accounts;
    }

    public void setAccounts(List<Account> accounts){
        this.accounts = accounts;
        setDemoAccounts();
    }

    public int getDemoAccounts() {
        return getAccounts() == null ? 0 : getAccounts().size();
    }

    public void setDemoAccounts(){
        demoAccounts = getAccounts() == null ? 0 : getAccounts().size();
    }
}