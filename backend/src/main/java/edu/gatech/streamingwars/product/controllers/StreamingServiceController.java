package edu.gatech.streamingwars.product.controllers;

import edu.gatech.streamingwars.product.models.StreamingService;
import edu.gatech.streamingwars.product.services.StreamingServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3001")
public class StreamingServiceController {

    private StreamingServiceService service;

    @Autowired
    public StreamingServiceController(StreamingServiceService service) {
        this.service = service;
    }

    @RequestMapping(method=RequestMethod.POST, value="/streamingservice/add")
    public ResponseEntity addStreamingService(@RequestBody StreamingService streamingService) {
        this.service.addStreamingService(streamingService);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @RequestMapping(method=RequestMethod.PUT, value="/streamingservice/update")
    public ResponseEntity updateStreamingService(@RequestBody StreamingService streamingService) {
        try {
            service.updateStreamingService(streamingService);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @RequestMapping(method=RequestMethod.GET, value="/streamingservice/get/{streamShortName}")
    public ResponseEntity getStreamingService(@PathVariable String streamShortName) {
        return new ResponseEntity<>(this.service.getStreamingService(streamShortName),HttpStatus.OK);
    }

    // Delete streaming service
    @RequestMapping(method= RequestMethod.DELETE, value="/streamingservice/delete")
    public ResponseEntity deleteDemo(@RequestBody StreamingService streamService) {
        service.deleteStreamingService(streamService);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }


    @RequestMapping(method= RequestMethod.GET, value="/streamingservice/getall")
    public ResponseEntity getAllStreamingServices() {
        return new ResponseEntity<>(this.service.getAll(),HttpStatus.OK);
    }
}
