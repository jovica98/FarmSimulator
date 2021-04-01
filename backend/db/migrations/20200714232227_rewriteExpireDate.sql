-- migrate:up
ALTER TABLE reset_password
DROP COLUMN expiredate;

ALTER TABLE reset_password
ADD COLUMN expiredate integer;

-- migrate:down

