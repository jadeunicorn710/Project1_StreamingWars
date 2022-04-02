package edu.gatech.streamingwars.product.repo;

import edu.gatech.streamingwars.product.models.Event;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends CrudRepository<Event, Integer> {
    Event findFirstByEventFullNameAndEventYear(String eventFullName, int eventYear);
}