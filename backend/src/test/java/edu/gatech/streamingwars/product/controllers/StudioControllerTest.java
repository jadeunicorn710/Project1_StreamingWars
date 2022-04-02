package edu.gatech.streamingwars.product.controllers;

import edu.gatech.streamingwars.product.models.StudioModel;
import edu.gatech.streamingwars.product.services.StudioService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.BDDAssumptions.given;
import static org.assertj.core.internal.bytebuddy.matcher.ElementMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.jsonPath;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(StudioController.class)
class StudioControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private StudioService studioService;

    @Test
    public void testGetAllStudios() throws Exception {
        StudioModel netflix = new StudioModel();
        netflix.setStudioShortName("ntfx");
        netflix.setStudioLongName("netflix");
        netflix.setStudioCurrentRevenue(BigDecimal.valueOf(10));
        netflix.setStudioPreviousRevenue(BigDecimal.valueOf(15));
        netflix.setStudioTotalRevenue(BigDecimal.valueOf(45));

        List<StudioModel> allStudios = Arrays.asList(netflix);

        Mockito.when(studioService.getAllStudios()).thenReturn(allStudios);

        mvc.perform(get("/studios/getall").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect((ResultMatcher) jsonPath("$", hasSize(1)))
                .andExpect((ResultMatcher) jsonPath("$[0].studioShortName", is(netflix.getStudioShortName())));

    }
}