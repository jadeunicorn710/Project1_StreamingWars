package edu.gatech.streamingwars.product.repo;

import edu.gatech.streamingwars.product.models.WatchGroupStream;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WatchGroupStreamRepository extends CrudRepository<WatchGroupStream, Integer> {
    WatchGroupStream getFirstByDemoShortNameAndStreamShortName(String demoShort, String streamShort);
}
