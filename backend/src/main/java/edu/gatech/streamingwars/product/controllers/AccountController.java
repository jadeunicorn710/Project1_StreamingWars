package edu.gatech.streamingwars.product.controllers;

import edu.gatech.streamingwars.product.models.Account;
import edu.gatech.streamingwars.product.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Spring 4.0 introduced the @RestController annotation in order to simplify the creation of RESTful web services. 
// It's a convenient annotation that combines @Controller and @ResponseBody, which eliminates the need to 
// annotate every request handling method of the controller class with the @ResponseBody annotation.
// @RestController is a specialized version of the controller. It includes the @Controller and @ResponseBody annotations, 
// and as a result, simplifies the controller implementation:
@RestController

// Often, the host that serves the JS (e.g. example.com) is different from the host that serves the data (e.g. api.example.com).
// In such a case, CORS enables cross-domain communication.
@CrossOrigin("http://localhost:3001")
public class AccountController {
    // use Composition to include an instance of AccountService class as its field
    private AccountService accountService;

    // Starting with Spring 2.5, the framework introduced annotations-driven Dependency Injection. 
    // The main annotation of this feature is @Autowired. It allows Spring to resolve and inject collaborating beans into our bean.
    // @Autowired on Constructors
    @Autowired
    public AccountController(AccountService accountService){
        this.accountService = accountService;
    }

    // the annotation is used to map web requests to Spring Controller methods.
    // @RequestMapping — by Path
    @RequestMapping(method= RequestMethod.POST, value="/account/add")
    // ResponseEntity represents the whole HTTP response: status code, headers, and body. 
    // As a result, we can use it to fully configure the HTTP response.

    // the @RequestBody annotation maps the HttpRequest body to a transfer or domain object, 
    // enabling automatic deserialization of the inbound HttpRequest body onto a Java object.
    // Spring automatically deserializes the JSON into a Java type, assuming an appropriate one is specified.
    // By default, the type we annotate with the @RequestBody annotation must correspond to the JSON sent from our client-side controller
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
