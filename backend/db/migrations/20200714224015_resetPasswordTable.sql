-- migrate:up
CREATE TABLE reset_password(
	email text,
	expiredate date,
	token text
);

-- migrate:down
DROP TABLE reset_password;
