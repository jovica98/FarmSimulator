-- migrate:up
CREATE TABLE answers(
	role_id int,
	answer text,
	role text,
	question_id int
);

-- migrate:down
DROP TABLE answers;
