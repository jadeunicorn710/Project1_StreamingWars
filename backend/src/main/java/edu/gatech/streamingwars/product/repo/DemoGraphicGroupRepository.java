package edu.gatech.streamingwars.product.repo;

import edu.gatech.streamingwars.product.models.DemoGraphicGroup;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DemoGraphicGroupRepository extends CrudRepository<DemoGraphicGroup, Integer> {
    DemoGraphicGroup findFirstByDemoShortName(String demoShortName);
    boolean existsByDemoShortName(String demoShortName);
}
