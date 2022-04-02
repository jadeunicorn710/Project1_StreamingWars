package edu.gatech.streamingwars.product.services;

import edu.gatech.streamingwars.product.models.*;
import edu.gatech.streamingwars.product.repo.WatchEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.MathContext;
import java.util.Locale;

@Service
public class WatchEventService {

    private WatchEventRepository repository;
    private DemoGraphicGroupService demoService;
    private StreamingServiceService streamingService;
    private WatchGroupStreamService watchGroupStreamService;
    private OfferService offerService;

    @Autowired
    public WatchEventService(WatchEventRepository repository,
                             OfferService offerService,
                             DemoGraphicGroupService demoService,
                             StreamingServiceService streamingService,
                             WatchGroupStreamService watchGroupStreamService){
        this.repository = repository;
        this.demoService = demoService;
        this.streamingService = streamingService;
        this.watchGroupStreamService = watchGroupStreamService;
        this.offerService = offerService;
    }

    public void addWatchEvent(WatchEvent watchEvent) throws Exception {

        DemoGraphicGroup demoGroup = demoService.getDemoByShortName(watchEvent.getWatchDemoGroup());

        StreamingService streamService = streamingService.getStreamingService(watchEvent.getWatchStream());
        watchEvent.setWatchSubscriptionFee(streamService.getStreamSubscription());
        setViewerCount(demoGroup, watchEvent);

        Offer offer = this.offerService.getByOfferStreamAndOfferEventAndOfferEventYear(streamService.getStreamShortName(), watchEvent.getWatchEventName(),watchEvent.getWatchEventYear());

        if(offer == null)
            throw new Exception(String.format("Offer not found for event name %s", watchEvent.getWatchEventName()));

        watchEvent.setWatchType(offer.getOfferType());
        watchEvent.setWatchPayPerViewPrice(offer.getOfferEventPrice());

        //Calculate watch viewing cost
        calculateWatchViewingCost(watchEvent, demoGroup.getDemoShortName(), streamService.getStreamShortName());

        demoService.calculateCurrentSpending(demoGroup,watchEvent.getWatchViewingCost());
        streamingService.calculateCurrentRevenue(streamService,watchEvent.getWatchViewingCost());

        this.repository.save(watchEvent);
    }

    public void updateWatchEvent(WatchEvent watchEvent) throws Exception {
        this.addWatchEvent(watchEvent);
    }

    public void deleteWatchEvent(WatchEvent watchEvent){
        this.repository.delete(watchEvent);
    }

    public Iterable<WatchEvent> getAll(){
        return this.repository.findAll();
    }

    private void setViewerCount(DemoGraphicGroup demoGroup, WatchEvent watchEvent) {
        watchEvent.setWatchViewerCount(new BigDecimal(demoGroup.getDemoAccounts() * watchEvent.getWatchPercentage()/100.0, MathContext.DECIMAL64));
    }

    private void calculateWatchViewingCost(WatchEvent watchEvent, String demoGroup, String streamService){
        if (watchEvent.getWatchType().toLowerCase(Locale.ROOT).equals("movie")) {
            WatchGroupStream watchGroupStream = this.watchGroupStreamService.getByDemoShortNameAndShortStream(demoGroup, streamService);

            BigDecimal watchEventViewerCount = watchEvent.getWatchViewerCount();

            BigDecimal watchSubscriptionFee = watchEvent.getWatchSubscriptionFee();

            if(watchGroupStream == null || watchEventViewerCount.doubleValue() > watchGroupStream.getWatchViewerCount().doubleValue()){
                if(watchGroupStream == null) {
                    watchGroupStream = new WatchGroupStream();
                    watchGroupStream.setStreamShortName(streamService);
                    watchGroupStream.setWatchViewerCount(BigDecimal.ZERO);
                    watchGroupStream.setDemoShortName(demoGroup);
                }

                BigDecimal watchViewingCost = watchEventViewerCount.subtract(
                        watchGroupStream.getWatchViewerCount()).multiply(watchSubscriptionFee);
                watchEvent.setWatchViewingCost(watchViewingCost);
                watchGroupStream.setWatchViewerCount(watchEventViewerCount);
            }
            else {
                watchEvent.setWatchViewingCost(new BigDecimal(0));
            }
            watchGroupStreamService.addWatchGroupStream(watchGroupStream);;
        }
        else {
            watchEvent.setWatchViewingCost(watchEvent.getWatchViewerCount().multiply(watchEvent.getWatchPayPerViewPrice()));
        }
    }
}
