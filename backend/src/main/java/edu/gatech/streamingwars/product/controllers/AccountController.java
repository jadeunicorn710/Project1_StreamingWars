package edu.gatech.streamingwars.product.controllers;

import edu.gatech.streamingwars.product.models.Account;
import edu.gatech.streamingwars.product.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3001")
public class AccountController {
    private AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService){
        this.accountService = accountService;
    }

    @RequestMapping(method= RequestMethod.POST, value="/account/add")
    public ResponseEntity addAccount(@RequestBody Account account) {
        this.accountService.addOrUpdateAccount(account);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @RequestMapping(method= RequestMethod.PUT, value="/account/update")
    public ResponseEntity updateAccount(@RequestBody Account account) {
        this.accountService.addOrUpdateAccount(account);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @RequestMapping(method= RequestMethod.DELETE, value="/account/delete")
    public ResponseEntity deleteAccount(@RequestBody Account account) {
        this.accountService.deleteAccount(account);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

    @RequestMapping(method= RequestMethod.GET, value="/account/getall")
    public ResponseEntity getAllAccounts() {
        return new ResponseEntity<>(this.accountService.getAllAccounts(),HttpStatus.OK);
    }

    @RequestMapping(method= RequestMethod.GET, value="/account/{demoShortName}")
    public ResponseEntity getAccountsByDemoShortName(@PathVariable String demoShortName) {
        return new ResponseEntity<>(this.accountService.getAccountsByDemoShortName(demoShortName),HttpStatus.OK);
    }

    //archive manually by using controller.
    @RequestMapping(method= RequestMethod.POST, value="/account/archive")
    public ResponseEntity archiveAccounts() {
        this.accountService.archiveAccounts();
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
