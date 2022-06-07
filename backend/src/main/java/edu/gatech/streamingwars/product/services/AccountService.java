package edu.gatech.streamingwars.product.services;

import edu.gatech.streamingwars.archive.services.AccountArchiveService;
import edu.gatech.streamingwars.product.models.Account;
import edu.gatech.streamingwars.product.models.DemoGraphicGroup;
import edu.gatech.streamingwars.product.repo.AccountRepository;
import edu.gatech.streamingwars.product.repo.DemoGraphicGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

// We mark beans with @Service to indicate that they're holding the business logic. 
// Besides being used in the service layer, there isn't any other special use for this annotation.
@Service
public class AccountService {
    // @Autowired on Constructors
    private AccountRepository accountRepo;
    private AccountArchiveService accountArchiveService;
    private  DemoGraphicGroupRepository demoRepo;

    @Autowired
    public AccountService(AccountRepository accountRepo, DemoGraphicGroupRepository demoRepo,
                          AccountArchiveService accountArchiveService){
        this.accountRepo = accountRepo;
        this.demoRepo = demoRepo;
        this.accountArchiveService = accountArchiveService;
    }

    public void addOrUpdateAccount(Account account){
        // find holding demo group
        DemoGraphicGroup group = demoRepo.findFirstByDemoShortName(account.getDemoShortName());
        // add account to repo
        this.accountRepo.save(account);
        // get all accounts with cur demo short name
        List<Account> accounts = getAccountsByDemoShortName(account.getDemoShortName());
        // update demo group
        group.setAccounts(accounts);
        demoRepo.save(group);
    }

    public void makeAccountsInactive(List<Account> accounts){
        for(Account acct : accounts){
            acct.setActive(false);
        }
        accountRepo.saveAll(accounts);
    }

    public List<Account> getAccountsByDemoShortName(String demoShortName){
        return accountRepo.findAllByDemoShortName(demoShortName);
    }

    public Iterable<Account> getAllAccounts(){
        return accountRepo.findAll();
    }

    public void deleteAccount(Account account){
        accountRepo.delete(account);
    }

    // Can be triggered manually or using the scheduled job which runs every 2 minutes
    // <second> <minute> <hour> <day-of-month> <month> <day-of-week> 
    @Scheduled(cron = "0 */2 * * * *")
    public void archiveAccounts(){
        System.out.println("-----> Started Archiving job <------");
        List<Account> inactive = accountRepo.findAllByActive(false);
        int size = inactive == null ? 0 : inactive.size();
        if(inactive != null){
            this.accountArchiveService.archiveAccounts(inactive);
            System.out.println(String.format("**** Archived %d records ******",size));
        }
        accountRepo.deleteAll(inactive);
    }
}
