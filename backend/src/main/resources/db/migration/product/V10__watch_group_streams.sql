create table if not exists watchGroupStreams
(
    id SERIAL PRIMARY KEY,
    demoShortName varchar NOT NULL,
    streamShortName varchar NOT NULL,
    watchViewerCount integer NOT NULL DEFAULT 0
);
