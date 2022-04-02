package edu.gatech.streamingwars.product.controllers;

import edu.gatech.streamingwars.product.models.StudioModel;
import edu.gatech.streamingwars.product.services.StudioService;
import io.micrometer.core.annotation.Timed;
import io.micrometer.core.instrument.MeterRegistry;
import org.apache.commons.collections4.IterableUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.atomic.AtomicInteger;
import io.micrometer.core.instrument.Counter;

@RestController
@CrossOrigin("http://localhost:3001")
public class StudioController {
    private StudioService studio_service;
    private MeterRegistry meterRegistry;

    private final AtomicInteger studioGauge;
    private final Counter studioCounter;

    @Autowired
    public StudioController(StudioService studio_service, MeterRegistry meterRegistry) {
        this.studio_service = studio_service;
        this.meterRegistry = meterRegistry;
        studioGauge = meterRegistry.gauge("studio_gauge", new AtomicInteger(0));
        studioCounter = meterRegistry.counter("studio_counter");
    }

    @Timed("get_all_studio_timer")
    @RequestMapping(method=RequestMethod.GET, value="/studios/getAll")
    // Show all studios info
    public ResponseEntity getAllStudios() {
        studioGauge.set(IterableUtils.size((studio_service.getAllStudios())));
        studioCounter.increment();
        return new ResponseEntity<>(studio_service.getAllStudios(),HttpStatus.OK);
    }

    // Show one studio info by its short name
    @RequestMapping(method=RequestMethod.GET, value="/studios/get/{studioShortName}")
    public ResponseEntity getStudio(@PathVariable String studioShortName) {
        return new ResponseEntity<>(this.studio_service.getStudio(studioShortName),HttpStatus.OK);
    }

    // Add new studio
    @RequestMapping(method= RequestMethod.POST, value="/studios/add")
    public ResponseEntity addStudio(@RequestBody StudioModel studio) {
        studio_service.addStudio(studio);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // Update one studio info by its short name
    @RequestMapping(method= RequestMethod.PUT, value="/studios/update")
    public ResponseEntity updateStudio(@RequestBody StudioModel studio) {
        studio_service.updateStudio(studio);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // Delete one studio info by its short name
    @RequestMapping(method= RequestMethod.DELETE, value="/studios/delete")
    public ResponseEntity deleteStudio(@RequestBody StudioModel studio) {
        studio_service.deleteStudio(studio);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }
}