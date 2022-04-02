package edu.gatech.streamingwars.product.services;

import edu.gatech.streamingwars.product.models.Time;
import edu.gatech.streamingwars.product.repo.TimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

@Service
public class TimeService {

    private TimeRepository repository;
    private DemoGraphicGroupService demoService; //UNCOMMENT THIS LINE
    private StreamingServiceService streamService; //UNCOMMENT THIS LINE
    private StudioService studioService; //UNCOMMENT THIS LINE

    @Autowired
    public TimeService(TimeRepository repository, DemoGraphicGroupService demoService, StreamingServiceService streamService,
                     StudioService studioService) {
        this.repository = repository;
        this.demoService = demoService;
        this.streamService = streamService;
        this.studioService = studioService;
    }

    public void updatePeriod() throws Exception {
        Time time = this.getTime();

        if (time.getMonthTimeStamp() == 12) {
            time.setYearTimeStamp(time.getYearTimeStamp() + 1);
        }
        time.setMonthTimeStamp((time.getMonthTimeStamp() % 12) + 1);

        this.repository.save(time);
        //this is the equivalent to updating current revenue
        studioService.setNextMonthRevenue();
        streamService.setNextMonthRevenue();
        demoService.setNextMonthSpending();

    }

    public Time getTime(){
        Time time = this.repository.findFirstByOrderByIdDesc();

        if(time == null){
            time = new Time();
            time.setMonthTimeStamp(10);
            time.setYearTimeStamp(2020);
            this.repository.save(time);
        }

        return time;
    }
}
