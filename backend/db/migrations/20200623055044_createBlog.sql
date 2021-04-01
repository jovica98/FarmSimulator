-- migrate:up
CREATE TABLE blog(
	content text,
	image bytea,
	id serial primary key 
);

-- migrate:down
DROP TABLE blog;
