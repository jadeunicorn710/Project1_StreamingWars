package edu.gatech.streamingwars.product.services;

import edu.gatech.streamingwars.product.models.StreamingService;
import edu.gatech.streamingwars.product.repo.StreamingServiceRepository;
import edu.gatech.streamingwars.product.repo.WatchEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class StreamingServiceService {

    private StreamingServiceRepository streamRepo;
    private WatchEventRepository watchEventRepo;

    @Autowired
    public StreamingServiceService(StreamingServiceRepository repository,
                                   WatchEventRepository watchEventRepo) {
        this.streamRepo = repository;
        this.watchEventRepo = watchEventRepo;
    }

    public StreamingService getStreamingService(String streamShortName) {
        return this.streamRepo.findFirstByStreamShortName(streamShortName);
    }

    public void addStreamingService(StreamingService streamingService) {
        this.streamRepo.save(streamingService);
    }

    public void updateStreamingService(StreamingService streamingService) throws Exception {
        StreamingService ss = this.streamRepo.findFirstByStreamShortName(streamingService.getStreamShortName());
        if (ss == null) {
            throw new Exception("streamShortName is invalid");
        } else if (!(streamingService.getStreamSubscription().equals(ss.getStreamSubscription())) &&
                this.watchEventRepo.existsByWatchStreamAndWatchType(streamingService.getStreamShortName(), "Movie"))
        {
            throw new Exception("can't update streamSubscription: movie with this streamShortName was already viewed");
        }
        this.addStreamingService(streamingService);
    }

    public void calculateStreamLicensing(StreamingService streamingService, BigDecimal payLicenseFee) {
        streamingService.setStreamLicensing(streamingService.getStreamLicensing().add(payLicenseFee));
        this.addStreamingService(streamingService);
    }

    public void calculateCurrentRevenue(StreamingService streamingService, BigDecimal watchViewingCost) {
        streamingService.setStreamCurrentRevenue(streamingService.getStreamCurrentRevenue().add(watchViewingCost));
        this.addStreamingService(streamingService);
    }

    public void setNextMonthRevenue() throws Exception {
        Iterable<StreamingService> streamingServices = this.getAll();
        for (StreamingService ss : streamingServices) {
            BigDecimal sum = ss.getStreamTotalRevenue().add(ss.getStreamCurrentRevenue());
            ss.setStreamTotalRevenue(sum);
            ss.setStreamPreviousRevenue(ss.getStreamCurrentRevenue());
            ss.setStreamCurrentRevenue(BigDecimal.ZERO);
            this.updateStreamingService(ss);
        }
    }

    // delete streaming service
    public void deleteStreamingService(StreamingService streamingService) {
        this.streamRepo.delete(streamingService);
    }

    public Iterable<StreamingService> getAll() {
        return this.streamRepo.findAll();
    }
}
