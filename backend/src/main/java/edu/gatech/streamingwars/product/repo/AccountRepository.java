package edu.gatech.streamingwars.product.repo;

import edu.gatech.streamingwars.product.models.Account;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends CrudRepository<Account, Integer> {
    List<Account> findAllByDemoShortName(String demoShortName);
    List<Account> findAllByActive(boolean active);
}
