create table if not exists watchEvents
(
    id SERIAL PRIMARY KEY,
    watchDemoGroup varchar NOT NULL,
    watchPercentage decimal NOT NULL DEFAULT 0,
    watchStream varchar NOT NULL,
    watchEventName varchar NOT NULL,
    watchEventYear integer NOT NULL DEFAULT 0
);