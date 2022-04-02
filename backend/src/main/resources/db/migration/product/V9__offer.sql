create table if not exists offer
(
    id SERIAL PRIMARY KEY,
    offerStream varchar NOT NULL,
    offerType varchar NOT NULL,
    offerEventName varchar NOT NULL,
    offerEventYear integer NOT NULL DEFAULT 0,
    offerEventPrice decimal NOT NULL DEFAULT 0
);