package edu.gatech.streamingwars.product.services;

import edu.gatech.streamingwars.product.models.Event;
import edu.gatech.streamingwars.product.models.StudioModel;
import edu.gatech.streamingwars.product.repo.EventRepository;
import edu.gatech.streamingwars.product.repo.WatchEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class EventService {

    private EventRepository eventRepo;
    private WatchEventRepository watchEventRepo;
    private StudioService studioService;

    @Autowired
    public EventService(EventRepository eventRepo, WatchEventRepository watchEventRepo, StudioService studioService){
        this.eventRepo = eventRepo;
        this.watchEventRepo = watchEventRepo;
        this.studioService = studioService;
    }

    public void addEvent(Event event) {
        eventRepo.save(event);
    }

    public void updateEvent(Event event) throws Exception {
        Event e = eventRepo.findFirstByEventFullNameAndEventYear(event.getEventFullName(), event.getEventYear());
        if (e == null) {
            throw new Exception("eventName and/or eventYear is invalid");
        }

        StudioModel studio = studioService.getStudio(event.getEventStudioOwner());
        if (studio == null) {
            throw new Exception("Studio Owner Not Found");
        }
        if (!(event.getEventLicenseFee().equals(e.getEventLicenseFee())) &&
                watchEventRepo.existsByWatchEventNameAndWatchEventYear(event.getEventFullName(), event.getEventYear())){
            throw new Exception("Can't update license fee. Event has been accessed/viewed by a demographic group");
        }
        this.eventRepo.save(event);
    }

    public void deleteEvent(Event event){
        this.eventRepo.delete(event);
    }

    public Iterable<Event> getAll(){
        return this.eventRepo.findAll();
    }
}
