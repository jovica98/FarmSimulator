-- migrate:up
CREATE TABLE education(
	id SERIAL PRIMARY KEY,
	school text ,
	location text ,
	diploma text ,
	date_start date,
	date_finish date
);

-- migrate:down

