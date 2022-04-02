package edu.gatech.streamingwars.product.repo;

import edu.gatech.streamingwars.product.models.StreamingService;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StreamingServiceRepository extends CrudRepository<StreamingService, Integer> {
    StreamingService findFirstByStreamShortName(String streamShortName);
}
