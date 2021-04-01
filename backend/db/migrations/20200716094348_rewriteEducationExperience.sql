-- migrate:up
DROP TABLE IF EXISTS education;
DROP TABLE IF EXISTS experience;

CREATE TABLE education(
	operator_id integer,
	school text ,
	location text ,
	diploma text ,
	date_start date,
	date_finish date
);

CREATE TABLE experience(
	operator_id integer,
	firm text ,
	location text ,
	diploma text ,
	date_start date,
	date_finish date
);

-- migrate:down
DROP TABLE IF EXISTS education;
DROP TABLE IF EXISTS experience;
