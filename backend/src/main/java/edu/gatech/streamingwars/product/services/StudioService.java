package edu.gatech.streamingwars.product.services;

import edu.gatech.streamingwars.product.models.StudioModel;
import edu.gatech.streamingwars.product.repo.StudioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class StudioService {

    public StudioRepository studio_repository;

    @Autowired
    public StudioService(StudioRepository studio_repository) {
        this.studio_repository = studio_repository;
    }


    public void setNextMonthRevenue() {
        Iterable<StudioModel> studioServices = this.getAllStudios();
        for (StudioModel sm : studioServices) {
            BigDecimal sum = sm.getStudioTotalRevenue().add(sm.getStudioCurrentRevenue());
            sm.setStudioTotalRevenue(sum);
            sm.setStudioPreviousRevenue(sm.getStudioCurrentRevenue());
            sm.setStudioCurrentRevenue(BigDecimal.ZERO);
            this.updateStudio(sm);
        }
    }

    // Calculate current revenue
    public void calculateCurrentRevenue(StudioModel studio, BigDecimal payLicenseFee) {
        studio.setStudioCurrentRevenue(studio.getStudioCurrentRevenue().add(payLicenseFee));
        this.updateStudio(studio);
    }

    public Iterable<StudioModel> getAllStudios() {
        return this.studio_repository.findAll();
    }

    public StudioModel getStudio(String studioShortName) {
        return this.studio_repository.findFirstByStudioShortName(studioShortName);
    }

    public void addStudio(StudioModel studio) {
        this.studio_repository.save(studio);
    }


    public void updateStudio(StudioModel updatedStudio) {
        this.studio_repository.save(updatedStudio);
    }

    public void deleteStudio(StudioModel studio) {
        this.studio_repository.delete(studio);
    }
}