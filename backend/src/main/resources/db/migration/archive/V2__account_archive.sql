create table if not exists accountarchive
(
    id SERIAL PRIMARY KEY,
    name varchar NOT NULL,
    demoShortName varchar NOT NULL,
    active BOOLEAN NOT NULL DEFAULT FALSE
);
