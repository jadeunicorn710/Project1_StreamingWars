create table if not exists time
(
    id SERIAL PRIMARY KEY,
    monthTimeStamp integer NOT NULL DEFAULT 0,
    yearTimeStamp integer NOT NULL DEFAULT 0

);