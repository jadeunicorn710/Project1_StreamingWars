package edu.gatech.streamingwars.product.repo;

import edu.gatech.streamingwars.product.models.Time;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimeRepository extends CrudRepository<Time, Integer> {
    Time findFirstByOrderByIdDesc();
}
