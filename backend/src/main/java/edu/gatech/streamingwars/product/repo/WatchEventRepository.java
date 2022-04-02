package edu.gatech.streamingwars.product.repo;


import edu.gatech.streamingwars.product.models.WatchEvent;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WatchEventRepository extends CrudRepository<WatchEvent, Integer> {
    boolean existsByWatchStreamAndWatchType(String watchStream, String watchType);
    boolean existsByWatchEventNameAndWatchEventYear(String watchEventName, int watchEventYear );
}