create table if not exists studios
(
    id SERIAL PRIMARY KEY,
    studioShortName varchar NOT NULL,
    studioLongName varchar NOT NULL,
    studioCurrentRevenue decimal NOT NULL DEFAULT 0,
    studioPreviousRevenue decimal NOT NULL DEFAULT 0,
    studioTotalRevenue decimal NOT NULL DEFAULT 0
);
