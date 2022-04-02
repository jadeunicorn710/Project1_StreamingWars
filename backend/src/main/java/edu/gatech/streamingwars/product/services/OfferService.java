package edu.gatech.streamingwars.product.services;

import edu.gatech.streamingwars.product.models.*;
import edu.gatech.streamingwars.product.repo.EventRepository;
import edu.gatech.streamingwars.product.repo.OfferRepository;
import edu.gatech.streamingwars.product.repo.StreamingServiceRepository;
import edu.gatech.streamingwars.product.repo.StudioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class OfferService {

    private OfferRepository offerRepo;
    private EventRepository eventRepo;
    private StreamingServiceRepository streamRepo;
    private StudioRepository studioRepo;
    private StreamingServiceService streamingServiceService;
    private StudioService studioService;

    @Autowired
    public OfferService(OfferRepository offerRepo, EventRepository eventRepo, StreamingServiceRepository streamRepo,
                        StudioRepository studioRepo, StreamingServiceService streamingServiceService,
                        StudioService studioService, DemoGraphicGroupService demoService) {
        this.offerRepo = offerRepo;
        this.eventRepo = eventRepo;
        this.streamRepo = streamRepo;
        this.studioRepo = studioRepo;
        this.streamingServiceService = streamingServiceService;
        this.studioService = studioService;
    }

    public void addLicenseTransaction(Offer offer) throws Exception {
        // find key (movie and year) to event object
        Event e = eventRepo.findFirstByEventFullNameAndEventYear(offer.getOfferEventName(), offer.getOfferEventYear());

        if(e == null){
            throw new Exception(String.format("No event found for event name %s", offer.getOfferEventName()));
        }

        String payStudio = e.getEventStudioOwner();
        BigDecimal payLicenseFee = e.getEventLicenseFee();
        StreamingService ss = streamRepo.findFirstByStreamShortName(offer.getOfferStream());
        this.streamingServiceService.calculateStreamLicensing(ss, payLicenseFee);
        StudioModel s = this.studioRepo.findFirstByStudioShortName(payStudio);
        this.studioService.calculateCurrentRevenue(s, payLicenseFee);
    }

    public void addOffer(Offer offer) throws Exception {
        this.addLicenseTransaction(offer);
        this.offerRepo.save(offer);
    }

    public void updateOffer(Offer offer) throws Exception {
        this.addOffer(offer);
    }


    public void deleteOffer(RetractMovie retractMovie) throws Exception {
        Offer offer = this.offerRepo.findFirstByOfferStreamAndOfferEventNameAndOfferEventYear(
                retractMovie.getOfferStream(), retractMovie.getOfferEventName(), retractMovie.getOfferEventYear());
        if (offer == null) {
            throw new Exception("offerStream, offerEventName, and/or offerEventYear is invalid");
        }
        this.offerRepo.delete(offer);
    }

    public Iterable<Offer> getAll() {
        return this.offerRepo.findAll();
    }

    public Offer getByOfferStreamAndOfferEventAndOfferEventYear(String offerStream, String offerEvent, int offerEventYear){
        return this.offerRepo.findFirstByOfferStreamAndOfferEventNameAndOfferEventYear(offerStream,offerEvent, offerEventYear);
    }
}
