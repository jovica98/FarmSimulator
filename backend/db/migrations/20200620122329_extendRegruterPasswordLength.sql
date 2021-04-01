-- migrate:up
ALTER TABLE regruter
DROP COLUMN password;

ALTER TABLE regruter
ADD COLUMN password varchar(128)

-- migrate:down

