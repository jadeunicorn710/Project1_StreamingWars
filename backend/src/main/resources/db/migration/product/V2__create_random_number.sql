create table if not exists randomnumber
(
    id bigint not null
    constraint randomnumber_pkey
    primary key,
    value integer
);

create sequence hibernate_sequence;