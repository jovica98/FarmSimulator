-- migrate:up
CREATE TABLE comments(
	comment_id SERIAL PRIMARY KEY,
	comment_text text,
	profile_type text,
	profile_id int,
	regrutor_admin_id int
);

-- migrate:down

DROP TABLE comments;