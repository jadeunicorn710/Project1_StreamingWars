package edu.gatech.streamingwars.product.controllers;

import edu.gatech.streamingwars.product.models.WatchEvent;
import edu.gatech.streamingwars.product.services.WatchEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3001")
public class WatchEventController {

    private WatchEventService service;

    @Autowired
    public WatchEventController(WatchEventService service){
        this.service = service;
    }

    // Create Watch Event
    @RequestMapping(method= RequestMethod.POST, value="/watchEvent/add")
    public ResponseEntity addWatchEvent(@RequestBody WatchEvent watchEvent) throws Exception {
        service.addWatchEvent(watchEvent);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // Update Watch Event
    @RequestMapping(method= RequestMethod.PUT, value="/watchEvent/update")
    public ResponseEntity updateWatchEvent(@RequestBody WatchEvent watchEvent) throws Exception {
        service.updateWatchEvent(watchEvent);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // Delete Watch Event
    @RequestMapping(method= RequestMethod.DELETE, value="/watchEvent/delete")
    public ResponseEntity deleteWatchEvent(@RequestBody WatchEvent watchEvent) {
        service.deleteWatchEvent(watchEvent);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

    // Get All Watch Events
    @RequestMapping(method= RequestMethod.GET, value="/watchEvent/getall")
    public ResponseEntity getAllWatchEvents() {
        return new ResponseEntity<>(this.service.getAll(),HttpStatus.OK);
    }
}
