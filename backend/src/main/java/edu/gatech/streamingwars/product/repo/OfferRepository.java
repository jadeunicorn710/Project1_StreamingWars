package edu.gatech.streamingwars.product.repo;

import edu.gatech.streamingwars.product.models.Offer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfferRepository extends CrudRepository<Offer, Integer> {
    //made the assumption validation to movie year on top of movie name as well
    Offer findFirstByOfferStreamAndOfferEventNameAndOfferEventYear(String offerStream, String offerEventName, int offerEventYear);
}