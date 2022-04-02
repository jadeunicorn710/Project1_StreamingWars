create table if not exists streamingServices
(
    id SERIAL PRIMARY KEY,
    streamShortName varchar NOT NULL,
    streamLongName varchar NOT NULL,
    streamSubscription decimal NOT NULL DEFAULT 0,
    streamCurrentRevenue decimal NOT NULL DEFAULT 0,
    streamPreviousRevenue decimal NOT NULL DEFAULT 0,
    streamTotalRevenue decimal NOT NULL DEFAULT 0,
    streamLicensing decimal NOT NULL DEFAULT 0,
    streamIndex decimal NOT NULL DEFAULT 0
);