package edu.gatech.streamingwars.product.services;

import edu.gatech.streamingwars.product.models.Account;
import edu.gatech.streamingwars.product.models.DemoGraphicGroup;
import edu.gatech.streamingwars.product.repo.DemoGraphicGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;


@Service
public class DemoGraphicGroupService {
    private DemoGraphicGroupRepository repository;
    private AccountService accountService;

    @Autowired
    public DemoGraphicGroupService(DemoGraphicGroupRepository repository, AccountService accountService) {
        this.repository = repository;
        this.accountService = accountService;
    }

    // get all demographic group
    public Iterable<DemoGraphicGroup> getAll() {
        Iterable<DemoGraphicGroup> demos = this.repository.findAll();
        for(DemoGraphicGroup demo : demos)
            demo.setAccounts(getAccounts(demo.getDemoShortName()));
        return demos;
    }

    // get one demographic group by short name
    public DemoGraphicGroup getDemoByShortName(String demoShortName) {
        DemoGraphicGroup demo = this.repository.findFirstByDemoShortName(demoShortName);
        if(demo != null) {
            demo.setAccounts(getAccounts(demo.getDemoShortName()));
        }
        return demo;
    }

    // add new demographic group
    public void addDemoGroup(DemoGraphicGroup demo) {
        demo.setAccounts(getAccounts(demo.getDemoShortName()));
        validateDemo(demo);
        this.repository.save(demo);
    }

    // update demographic group
    public boolean updateDemo(DemoGraphicGroup updatedDemo) throws Exception {
        if (!repository.existsByDemoShortName(updatedDemo.getDemoShortName())) {
            throw new Exception("demoShortName and/or demoAccounts is invalid");
        }
        updatedDemo.setAccounts(getAccounts(updatedDemo.getDemoShortName()));

        validateDemo(updatedDemo);
        this.repository.save(updatedDemo);
        return true;
    }

    // delete demographic group
    public void deleteDemo(DemoGraphicGroup demo) {
        List<Account> accounts = this.accountService.getAccountsByDemoShortName(demo.getDemoShortName());
        this.accountService.makeAccountsInactive(accounts);
        this.repository.delete(demo);
    }


    public void setNextMonthSpending() throws Exception {
        Iterable<DemoGraphicGroup> demoServices = this.getAll();
        for (DemoGraphicGroup dg : demoServices) {
            BigDecimal sum = dg.getDemoTotalSpending().add(dg.getDemoCurrentSpending());
            dg.setDemoTotalSpending(sum);
            dg.setDemoPreviousSpending(dg.getDemoCurrentSpending());
            dg.setDemoCurrentSpending(BigDecimal.ZERO);
            this.updateDemo(dg);
        }
    }

    // calculate Current Spending
    public void calculateCurrentSpending(DemoGraphicGroup demo, BigDecimal viewCost) throws Exception {
        demo.setDemoCurrentSpending(demo.getDemoCurrentSpending().add(viewCost));
        this.updateDemo(demo);
    }

    public DemoGraphicGroup getWithAccounts(String demoShortName){
        DemoGraphicGroup group = this.repository.findFirstByDemoShortName(demoShortName);

        if(group == null)
            return null;

        List<Account> accounts = this.accountService.getAccountsByDemoShortName(demoShortName);
        group.setAccounts(accounts);
        return group;
    }

    private List<Account> getAccounts(String demoShortName){
        List<Account> accounts = this.accountService.getAccountsByDemoShortName(demoShortName);
        return accounts == null ? new ArrayList<>() : accounts;
    }

    private void validateDemo(DemoGraphicGroup demo){
        if (demo.getDemoCurrentSpending() == null) {
            demo.setDemoCurrentSpending(BigDecimal.ZERO);
        }
        if (demo.getDemoTotalSpending() == null) {
            demo.setDemoTotalSpending(BigDecimal.ZERO);
        }
        if (demo.getDemoPreviousSpending() == null) {
            demo.setDemoPreviousSpending(BigDecimal.ZERO);
        }
    }
}
