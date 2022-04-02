package edu.gatech.streamingwars.archive.services;

import edu.gatech.streamingwars.archive.models.AccountArchive;
import edu.gatech.streamingwars.archive.repo.AccountArchiveRepository;
import edu.gatech.streamingwars.product.models.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AccountArchiveService {
    private AccountArchiveRepository repository;
    @Autowired
    public AccountArchiveService(AccountArchiveRepository repository){
        this.repository = repository;
    }

    public void addToArchive(AccountArchive accountArchive){
        this.repository.save(accountArchive);
    }

    public List<AccountArchive> getArchivedByDemoShortName(String shortName){
        return this.repository.findAllByDemoShortName(shortName);
    }

    public void archiveAccounts(List<Account> accounts){
        this.repository.saveAll(toArchiveAccount(accounts));
    }

    private List<AccountArchive> toArchiveAccount(List<Account> accounts){
        List<AccountArchive> accountArchives = new ArrayList<>();
        for(Account acct : accounts){

            AccountArchive archive = this.repository.findFirstByDemoShortName(acct.getDemoShortName());
            if(archive == null || !(archive.getName().equals(acct.getName()) && archive.getDemoShortName().equals(acct.getDemoShortName()))) {
                AccountArchive acctArchive = new AccountArchive();
                acctArchive.setDemoShortName(acct.getDemoShortName());
                acctArchive.setName(acct.getName());
                acctArchive.setActive(false);
                accountArchives.add(acctArchive);
            }
        }
        return accountArchives;
    }

}
