create table if not exists events
(
    id SERIAL PRIMARY KEY,
    eventType varchar NOT NULL,
    eventFullName varchar NOT NULL,
    eventStudioOwner varchar NOT NULL,
    eventYear integer NOT NULL DEFAULT 0,
    eventDuration integer NOT NULL DEFAULT 0,
    eventLicenseFee decimal NOT NULL DEFAULT 0
);