package edu.gatech.streamingwars.product.services;

import org.springframework.stereotype.Service;
import edu.gatech.streamingwars.product.models.WatchGroupStream;
import edu.gatech.streamingwars.product.repo.WatchGroupStreamRepository;

@Service
public class WatchGroupStreamService {
    private WatchGroupStreamRepository watchGroupStreamRepository;

    public WatchGroupStreamService(WatchGroupStreamRepository watchGroupStreamRepository){
        this.watchGroupStreamRepository = watchGroupStreamRepository;
    }

    public WatchGroupStream getByDemoShortNameAndShortStream(String demoShort, String streamShort){
        return this.watchGroupStreamRepository.getFirstByDemoShortNameAndStreamShortName(demoShort, streamShort);
    }

    public void addWatchGroupStream(WatchGroupStream watchGroupStream){
        this.watchGroupStreamRepository.save(watchGroupStream);
    }
}
