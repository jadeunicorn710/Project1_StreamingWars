# User Manual

## Quickstart

To start our web application, download the `ProjectStreamingWars` package, open a terminal in it and run the following commands:

```
docker build -t gatech/loadbalancer -f ./images/Dockerfile.loadbalancer ./loadbalancer 

docker build -t gatech/backend -f ./images/Dockerfile.backend ./backend 

docker build -t gatech/frontend -f ./images/Dockerfile.frontend ./frontend/my-app 

docker-compose -p gatech -f docker-compose.yml up -d
```

Go to http://localhost:3001 to start exploring our web application as our demo video shows.

<!-- [Demo here](https://www.dropbox.com/s/jwpy085aimzpx87/mts_video.mp4?dl=0). -->

## 1. Backend

**Technologies used:** Java, Spring Boot, Docker, PostgreSQL, and Nginx.

**Modifications made:** 

- We modified the `docker-compose.yml` file to create two instances of the API.
- We added an additional entry in the docker-compose.yml file to create an additional instance of a PostgresQL database to be used for archiving.
- We added an instance of Nginx for the load balancer and configured it to round robin between our two API instances.
- We added an instance of Prometheus and Grafana for metrics.
- We added an additional image called `Dockerfile.loadbalancer` under the images folder to be used by the `docker-compose.yml` file.
- The frontend folder docker command now needs to be called with the /my-app extension i.e, `docker build -t gatech/frontend -f ./images/Dockerfile.frontend ./frontend/my-app` .
- The `Dockerfile.backend` was modified to set the correct profiles on initialization.
- The `Dockerfile.frontend` was modified to work with the React application.

To run the backend use the following two commands : 

```
docker build -t gatech/loadbalancer -f ./images/Dockerfile.loadbalancer ./loadbalancer 

docker build -t gatech/backend -f ./images/Dockerfile.backend ./backend
```

**Description:** When the application is started using the docker commands, it will create a docker container with Nginx in it and configured to load balance between two API applications in a round robin fashion. The load balancer runs on port 8090. Then, two containers are brought up with our API code which runs on ports 8080 on the container but mapped to the host on 8091 and 8092 respectively. The load balancer then acts as a proxy to the two API instances relaying the requests made from the UI to one of the APIs (in a round robin fashion) as shown in the diagram below:

![img](https://lh4.googleusercontent.com/-IrW3pvnArtk-CqWUG0Y3ny9UocSW_JGd1hy0gOpsdoHlOILPD06AAHl2I_DyfFj42n4YLkjaaL8Ime1ODx4Ze2igewvMO1nU6wHxo82GxJ-hLxRKHPQlyGsMKdb_HhpLSynYPY)

Once the request makes into one of the APIs instances the request is handled and saved to the main PostgresQL database (StreamingWars). We also implemented an archiving function that runs every two minutes and just checks for any inactive accounts that are saved in the database. If any are found, they are sent to a separate storage running on a different container and saved in a PosgreSQL database. There are two additional containers that are created for metrics and performance, one for Prometheus and another for Grafana for which we expand on this on the Performance section.

We follow the API REST conventions in the back end to accept requests of types GET / POST / DELETE and PUT by using the annotations provided by the Spring Boot framework. We also configure the databases manually since we have multiple data sources, for this we had to make one of them the primary and the other one a secondary and configure appropriately.

The architecture is divided between three segments and following MVC standards. We have multiple controllers and models that help model the data to be sent to the UI (our View part of MVC). By following this standard it made it easy for us to add features in a standard and organized manner. See the diagram below:

![img](https://lh6.googleusercontent.com/vLGXt1U3g5Q7tpy85uXzcmgHgdU9ygHfhx1HLeks5p1pvwAod_zd1msHQ6KixujbwyBtKE0paOwc9ltJlq7V3T27q8MtMAhiRFnHLrgtDvjM1GUsNfjr8umn_jUgGDOUDRiMGEk)

**Migrations :** We make the use of migrations by using a framework called FlyWay which makes it really easy to use to create new schemas, schema updates and the creation of routines or data seeding. We needed to again configure this manually since we have multiple data sources, one for the Archive database and the other one for our main / product database StreamingWars.

**Validations :** In terms of validation we added safegaurds to demoShortName and/or demoAccountName being invalid when demoShortName is not present in our database. 
We also incorporated validations for updateEvent where we first check if the eventName or eventYear exists in the event table and then we check if there exists a valid studioOwner in the studioService.
There are three checks for updateEvents. First check is whether eventFullName or eventFullYear exists. If it doesn't exist then an exception is thrown, alternatively, if it does exist then an event object is pulled from the event table. Then, the event object's property studioOwner, is used to look up to see if there is a match in the studio table. If there isn't a match then an exception is thrown. If there is a match then you can continue to the final check. In the user payload, if they proceed to change the licenseFee and if that's true then the watch event table is checked to see if watchEventName and watchEventYear exist in the table. If that's true then, this would imply this event has been accessed by a demographic group, therefore, the user cannot update the license fee and an exception is thrown.
In streamingServiceService, to see if the streamShortName is valid. The streamShortName is looked up in the table to see if it exists. If it doesn't exist then an exception is thrown, alternatively, if it does then a streamingService object is pulled from the table.
If the user wants to change the subscription fee, if they do then the watchEvent table is checked to look for watchStream and watchType. You check if a streamingservice short name has a movie in the watch event table. If so, then an exception is thrown because this implies a movie with this streamingService short name has been viewed so a user cannot update the subscription fee.
You will look up in the offer table for an object for offerEventName, offerEventYear, offerStream from the payload given. If there isn't one(null) then an exception is thrown. Otherwise, delete the offer from the table. Note to satisfy the requirement, the frontend only sends the payload if a movie offer is being retracted and NOT for a PPV offer. 


## 2. Frontend

**Technologies used:** ReactJS, HTML, Axios, CSS, Node, npm, Docker, SQL, Nginx, Chrome developer tools

![img](https://lh6.googleusercontent.com/0QTUecuhtBM500geuAQzduDbfa6rqq4pBQRRDAj64kIa2Dd09eFguQQt85UopdqXoYlqubMqRlWu-9feZECkCi6ISsWJRZ0ow5Y06i3nsWxP3aBRNtZh1RKiLJdm44vM1XjD5OA)

​																		StreamingWars UI Page



**Deploy UI :** The react UI for Streaming Wars is deployed using `docker build -t gatech/frontend -f ./images/Dockerfile.frontend ./frontend/my-app`. 

The my-app folder contains all the necessary react code. We use `docker-compose -p gatech -f docker-compose.yml up -d` to bring up Docker containers for the project along with the UI.Dockerized UI in `images/Dockerfile.frontend` contains all the requirements to stand up an UI. It takes care of the OS dependency, software dependency, packages, Nginx etc.

**Access UI:** UI can be accessed with http://localhost:3001

**UI Project Structure:**Below is the project structure of the UI. We have separated all of the services into components and placed it under Comp. The rest of the code is under the `/src` main folder.		

src

├── App.css

├── App.js

├── App.test.js

├── Comp

│  ├── AccountComp.jsx

│  ├── ArchiveComp.jsx

│  ├── DemographicGroupComp.jsx

│  ├── EventComp.jsx

│  ├── EventOfferComp.jsx

│  ├── StreamingServiceComp.jsx

│  ├── StudioComp.jsx

│  ├── TimeComp.jsx

│  └── WatchEventComp.jsx

├── Header.js

├── Home.jsx

├── index.css

├── index.js

├── reportWebVitals.js

└── setupTests.js	



**Gotchas:** 

1. When creating demographic groups, accounts or streaming services we need to fill all the fields from left to right before clicking create.
2. Validations are strict, when creating offers, events we need matching studios and demos or else we will get an error. 
3. There are instances where archive services will show duplicate data on multiple rows. It's a race condition that we did not get to attest.



## 3. Performance Monitoring

**Technologies used:** Spring Boot actuator, Micrometer, Prometheus, Grafana

We added into the `pom.xml` file of our Spring Boot framework `spring-boot-starter-actuator` and `micrometer-registry-prometheus` dependencies for monitoring default JVM metrics and customized performance metrics. Our Spring Boot web application can be monitored using Micrometer that exposes the metrics from our application, Prometheus that stores the metrics data, and Grafana that scrapes and visualizes the data in graphs. We also added in the `docker-compose.yml` file prometheus and grafana configurations so that there are docker containers built for them.

We defined the following additional customized performance metrics for the Studio class to showcase the monitoring procedure:

1. *get_all_studio_timer*: provides the feedback on timing when `getAllStudios()` method is called, there are maximum values and summarised values available. This uses the `@Timed` annotation.
2. *studio_gauge*: monitors the number of studios created. This uses the `MeterRegistry` meter `Gauge`.
3. *studio_counter*: monitors the number of times that the `getAllStudios()` method was called. This uses the `MeterRegistry` meter `Counter`.

Once the application is up running, you can view all performance metrics as follows:

**a. Via /actuator endpoint**

The production-ready endpoints are exposed via `/actuator` endpoint in localhost 8090:

http://localhost:8090/actuator/metrics

To view any of these metrics, append the specific metric name after `/metrics`, for example, to monitor the http server requests, you can go to the following address, this is more of a static and statistical view of the metrics.

http://localhost:8090/actuator/metrics/http.server.requests 

**b. Via Prometheus**

The Prometheus metrics (both default and customized) are also exposed via `/actuator/prometheus` endpoint and you can view the statistical information in the following address similarly:

http://localhost:8090/actuator/prometheus 

You can also view them graphically in time series through the following localhost, although we would recommend viewing them through Grafana in the following section.

http://localhost:9090. Type in the search box any default prometheus metrics or our customised metrics for monitoring.

![img](https://lh3.googleusercontent.com/VIwm0Z02TUrVFkRDw9zQiX1ek_apt7kQ5FoiswI9AgpbnZeyABLWfQsYPP_aV4fnd6J2guDR83ZIxt4prCfnc32jCc7dTRiOnKuOZhXDGxeZSxm5xrX80DT-8Zbz25nLh_v73Rc)



**c. Via Grafana**

Grafana provides a rich UI where we can create and explore dashboards that contain multiple graphs. Open the following localhost to log into Grafana:

http://localhost:3000 

Username is *admin*, password is *password*.

![img](https://lh4.googleusercontent.com/wlf9YwdjGfnMIlfKSCKKRqdseslB0stMGeGJr75GU8zoptvxsb7bpn3_ywDTWSFySB1wPj0AneEC6E_Xtw4slxAcR30hgU0tgMmD5eUWgBZvH7JY9WMCXiDYbA4Jk_YTiZCHtus)



Once you logged in, import the JVM dashboard as follows:

(1) Click the “+” sign on the left and click “import”.

![img](https://lh3.googleusercontent.com/pLGRIjjEMlfgw7Qv9BPDEuvlRhnNu2gmYbtcPMRpDAb7ugtOMh2zOM0up0u32Xw2EM-6CPYhbsEfmdIjlZIH9UC2vt9GYWttTeUxqWpPu3f27YNs7E9T8W72JT9PGOMpa32FVEA)



(2) In the Load text box, input the following http address, and select “Prometheus” as the Prometheus data source. It should lead you to the JVM dashboard as follows.

*https://grafana.com/grafana/dashboards/4701*

![img](https://lh5.googleusercontent.com/bf71c5cUJ60ezjnzBMrRqtNxII9urFgfzyHptRhP7R5ejE4dL_0wt_366Cv7UXr42p_s_VC2ZwhW25zumT9qK4B4Jbfyg5xH3k9QxbGSSbaXjGYnVF-KJI-EqQpNQ7Mq7l8B47c)



(3) In the JVM dashboard, there are plenty of useful performance metrics that are being monitored, we adopted a few for our interests: the HTTP Rate graph, the Errors graph, and the CPU Usage graph. 

![img](https://lh5.googleusercontent.com/QrJ1-yFqVD2lM8ms05UxiYBJRmSzK6EMIgGMotFOuOP9s1daBIPP1mjNIraHlKubnZW0a84B25fsN7M2wqLyCOvlEu3v3ylfaugMFGNscaVWQIwqQmw5IHs7VYMb7hJmvkGrXvU)



(4) To visualize the 3 custom metrics we defined earlier for Studio, we can create new dashboards for them as follows:

1) Click the “+” sign on the left and select “Dashboard” to create a new dashboard. Choose “Graph” for visualizing.

2) Click “Edit” under the “Panel Title” to bring up the panel.

![img](https://lh6.googleusercontent.com/KGXklrKk5cEAk_Z5ShGm8brZ46ZuJ5tc0VrQc3qoDphQ8Q303mlC6k95bN9hF6rD7AdYDZo6Sg3eJ6hi00jCuF4bXepS0JEVmJIly6rcNkHMGa_y3NB_ILLR9jia-mSME2qX5K0)



3) Type in any of the customized metrics in the underlined text box and click on the blue capital letter “A”, it should bring up the corresponding time series. Change the monitoring period to a smaller value (like 5 minutes).

![img](https://lh5.googleusercontent.com/1MsIvkTxVL7Z71wsinpWqKHrnAtj_jQsETvUXCNgM6EvCDue2wevgq6yULHCAzllNkVpNVH6Vwr5aOfwt9DrBUQtfr7-bVU36dbj-J0yIYXeZp3El-DfTG4X2I733PBEkdmDQv4)



4) That should be all for the performance monitoring part.

