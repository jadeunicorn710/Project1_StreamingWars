package edu.gatech.streamingwars.product.controllers;

import edu.gatech.streamingwars.product.models.DemoGraphicGroup;
import edu.gatech.streamingwars.product.services.DemoGraphicGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3001")
public class DemoGraphicGroupController {
    private DemoGraphicGroupService service;

    @Autowired
    public DemoGraphicGroupController(DemoGraphicGroupService service) {
        this.service = service;
    }

    // Create demographic group
    @RequestMapping(method= RequestMethod.POST, value="/demos/add")
    public ResponseEntity addDemoGroup(@RequestBody DemoGraphicGroup demoGraphicGroup) {
        service.addDemoGroup(demoGraphicGroup);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // Get demographic group by short name
    @RequestMapping(method= RequestMethod.GET, value="/demos/get/{demoShortName}")
    public ResponseEntity getDemoByShortName(@PathVariable String demoShortName) {
        return new ResponseEntity<>(this.service.getDemoByShortName(demoShortName), HttpStatus.OK);
    }

    // Update demographic group
    @RequestMapping(method= RequestMethod.PUT, value="/demos/update")
    public ResponseEntity updateDemo(@RequestBody DemoGraphicGroup demoGraphicGroup) {
        try {
            service.updateDemo(demoGraphicGroup);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // Delete demographic group
    @RequestMapping(method= RequestMethod.DELETE, value="/demos/delete")
    public ResponseEntity deleteDemo(@RequestBody DemoGraphicGroup demoGraphicGroup) {
        service.deleteDemo(demoGraphicGroup);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

    // Get all demographic groups
    @RequestMapping(method= RequestMethod.GET, value="/demos/getall")
    public ResponseEntity getAllDemos() {
        return new ResponseEntity<>(service.getAll(), HttpStatus.OK);
    }
}
