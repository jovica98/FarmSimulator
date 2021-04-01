-- migrate:up
create table test(
	tekst text;
);

-- migrate:down
drop table test;
