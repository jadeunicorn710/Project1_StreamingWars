package edu.gatech.streamingwars.archive.controllers;

import edu.gatech.streamingwars.archive.models.AccountArchive;
import edu.gatech.streamingwars.archive.services.AccountArchiveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3001")
public class AccountArchiveController {

    private AccountArchiveService service;

    @Autowired
    public AccountArchiveController(AccountArchiveService service){
        this.service = service;
    }

    @RequestMapping(method= RequestMethod.GET, value="/archive/{demoShortName}")
    public ResponseEntity getArchivedByDemoShortName(@PathVariable String demoShortName) {
        return new ResponseEntity<>(this.service.getArchivedByDemoShortName(demoShortName), HttpStatus.OK);
    }

    @RequestMapping(method= RequestMethod.POST, value="/archive/add")
    public ResponseEntity addAccount(@RequestBody AccountArchive account) {
        this.service.addToArchive(account);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
