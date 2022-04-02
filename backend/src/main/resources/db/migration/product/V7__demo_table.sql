create table if not exists demoGroups
(
    id SERIAL PRIMARY KEY,
    demoShortName varchar NOT NULL,
    demoLongName varchar NOT NULL,
    demoAccounts integer NOT NULL DEFAULT 0,
    demoCurrentSpending decimal NOT NULL DEFAULT 0,
    demoPreviousSpending decimal NOT NULL DEFAULT 0,
    demoTotalSpending decimal NOT NULL DEFAULT 0,
    demoIndex decimal NOT NULL DEFAULT 0
);

