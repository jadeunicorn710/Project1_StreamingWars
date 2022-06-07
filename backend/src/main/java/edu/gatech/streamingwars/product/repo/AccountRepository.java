package edu.gatech.streamingwars.product.repo;

import edu.gatech.streamingwars.product.models.Account;
// CrudRepository is a Spring Data interface for generic CRUD operations on a repository of a specific type. 
// It provides several methods out of the box for interacting with a database.
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// Spring @Repository annotation is used to indicate that the class provides the mechanism for 
// storage, retrieval, search, update and delete operation on objects.
@Repository
public interface AccountRepository extends CrudRepository<Account, Integer> {
    // Crudrepository findBy method
    // The only important bit is the "By" keyword, anything following it is treated as a field name 
    List<Account> findAllByDemoShortName(String demoShortName);
    List<Account> findAllByActive(boolean active);
}
