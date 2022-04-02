package edu.gatech.streamingwars.product.services;

import edu.gatech.streamingwars.product.models.StudioModel;
import edu.gatech.streamingwars.product.repo.StudioRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultMatcher;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.internal.bytebuddy.matcher.ElementMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.jsonPath;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class StudioServiceTest {

    private StudioRepository studioRepository = Mockito.mock(StudioRepository.class);

    @Test
    @DisplayName("Should get studio by studio short name")
    public void testGetStudioByShortName() {
        StudioService studioService = new StudioService(studioRepository);
        StudioModel netfix = new StudioModel();
        netfix.setStudioShortName("ntfx");
        netfix.setStudioLongName("netflix");
        netfix.setStudioCurrentRevenue(BigDecimal.valueOf(10));
        netfix.setStudioPreviousRevenue(BigDecimal.valueOf(15));
        netfix.setStudioTotalRevenue(BigDecimal.valueOf(45));
        Mockito.when(studioRepository.findFirstByStudioShortName("ntfx")).thenReturn(netfix);

        StudioModel model = studioService.getStudio("ntfx");

        Mockito.verify(studioRepository).findFirstByStudioShortName("ntfx");

        assertEquals(model, netfix);
    }

    @Test
    @DisplayName("Should get all studios")
    public void testGetAllStudios() {
        StudioService studioService = new StudioService(studioRepository);
        StudioModel netflix = new StudioModel();
        netflix.setStudioShortName("ntfx");
        netflix.setStudioLongName("netflix");
        netflix.setStudioCurrentRevenue(BigDecimal.valueOf(10));
        netflix.setStudioPreviousRevenue(BigDecimal.valueOf(15));
        netflix.setStudioTotalRevenue(BigDecimal.valueOf(45));

        List<StudioModel> allStudios = Arrays.asList(netflix);

        Mockito.when(studioRepository.findAll()).thenReturn(allStudios);

        Iterable<StudioModel> studios = studioService.getAllStudios();

        Mockito.verify(studioRepository).findAll();

        assertEquals(studios, allStudios);
    }

//    @Test
//    @DisplayName("Add studio")
//    public void testAddStudio() {
//        StudioService studioService = new StudioService(studioRepository);
//        StudioModel netflix = new StudioModel();
//        netflix.setStudioShortName("ntfx");
//        netflix.setStudioLongName("netflix");
//        netflix.setStudioCurrentRevenue(BigDecimal.valueOf(10));
//        netflix.setStudioPreviousRevenue(BigDecimal.valueOf(15));
//        netflix.setStudioTotalRevenue(BigDecimal.valueOf(45));
//
//        Mockito.when(studioRepository.save(any(StudioModel.class))).thenReturn(new StudioModel());
//
//        StudioModel studio = studioService.addStudio(netflix);
//
//        assertEquals(studio, netflix);
//
//    }
}