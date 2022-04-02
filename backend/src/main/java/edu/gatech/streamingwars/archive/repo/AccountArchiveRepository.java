package edu.gatech.streamingwars.archive.repo;


import edu.gatech.streamingwars.archive.models.AccountArchive;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountArchiveRepository extends CrudRepository<AccountArchive, Integer>  {
    List<AccountArchive> findAllByDemoShortName(String demoShortName);
    AccountArchive findFirstByDemoShortName(String demoShortName);
}
