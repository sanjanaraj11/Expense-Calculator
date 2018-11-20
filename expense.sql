drop table if exists user;
create table user (
  user_id integer primary key autoincrement,
  username text not null,
  email text not null,
  pw_hash text not null
);

drop table if exists expense;
create table expense (
  uid integer primary key autoincrement,
  expname text not null,
  amount real not null
);

drop table if exists card;
create table card (
  ctype text primary key,
  cname text not null
);
