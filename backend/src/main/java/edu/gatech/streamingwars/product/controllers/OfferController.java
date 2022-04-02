package edu.gatech.streamingwars.product.controllers;

import edu.gatech.streamingwars.product.models.Offer;
import edu.gatech.streamingwars.product.models.RetractMovie;
import edu.gatech.streamingwars.product.services.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3001")
public class OfferController {

    private OfferService service;

    @Autowired
    public OfferController(OfferService service) {
        this.service = service;
    }

    // Create Offer
    @RequestMapping(method= RequestMethod.POST, value="/offer/add")
    public ResponseEntity addOffer(@RequestBody Offer offer) throws Exception {
        service.addOffer(offer);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // Update Offer
    @RequestMapping(method= RequestMethod.PUT, value="/offer/update")
    public ResponseEntity updateOffer(@RequestBody Offer offer) throws Exception {
        service.updateOffer(offer);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // Get All Offers
    @RequestMapping(method= RequestMethod.GET, value="/offer/getall")
    public ResponseEntity getAllOffers() {
        return new ResponseEntity<>(this.service.getAll(),HttpStatus.OK);
    }

    // Delete Offer
    @RequestMapping(method= RequestMethod.DELETE, value="/offer/retract")
    public ResponseEntity retractMovie(@RequestBody RetractMovie retractMovie) {
        try {
            this.service.deleteOffer(retractMovie);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
