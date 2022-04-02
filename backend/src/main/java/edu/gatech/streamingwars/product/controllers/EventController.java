package edu.gatech.streamingwars.product.controllers;

import edu.gatech.streamingwars.product.models.Event;
import edu.gatech.streamingwars.product.services.EventService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3001")
public class EventController {

    private EventService service;

    @Autowired
    public EventController(EventService service){
        this.service = service;
    }

    // Add new event
    @RequestMapping(method= RequestMethod.POST, value="/event/add")
    public ResponseEntity addEvent(@RequestBody Event event) {
        service.addEvent(event);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // Update Event
    @RequestMapping(method= RequestMethod.POST, value="/event/update")
    public ResponseEntity updateEvent(@RequestBody Event event) {
        try {
            service.updateEvent(event);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // Delete Event
    @RequestMapping(method= RequestMethod.DELETE, value="/event/delete")
    public ResponseEntity deleteEvent(@RequestBody Event event) {
        service.deleteEvent(event);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

    // Get All Events
    @RequestMapping(method= RequestMethod.GET, value="/event/getall")
    public ResponseEntity getAllEvents() {
        return new ResponseEntity<>(this.service.getAll(),HttpStatus.OK);
    }
}
