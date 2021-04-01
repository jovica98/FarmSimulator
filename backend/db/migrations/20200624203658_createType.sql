-- migrate:up
CREATE TYPE answer AS(
	idquestion integer,
	value text 
);

-- migrate:down
DROP type answer;
