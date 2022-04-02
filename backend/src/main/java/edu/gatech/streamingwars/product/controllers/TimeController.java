package edu.gatech.streamingwars.product.controllers;

import edu.gatech.streamingwars.product.services.TimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin("http://localhost:3001")
public class TimeController {

    @Autowired
    private ServerProperties serverProperties;
    private TimeService service;

    @Autowired
    public TimeController(TimeService service){this.service = service; }

    @RequestMapping(method=RequestMethod.POST, value="/time/updatePeriod")
    public ResponseEntity updatePeriod(){
        try {
            service.updatePeriod();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @RequestMapping(method=RequestMethod.GET, value="/time/getTime")
    public ResponseEntity getTime() {
        System.out.println(serverProperties.getPort());
        return new ResponseEntity<>(service.getTime(),HttpStatus.OK);
    }
}
