package edu.gatech.streamingwars.product.repo;

import edu.gatech.streamingwars.product.models.StudioModel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudioRepository extends CrudRepository<StudioModel, Long> {
    StudioModel findFirstByStudioShortName(String studioShortName);
}
