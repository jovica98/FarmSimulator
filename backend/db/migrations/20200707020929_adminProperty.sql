-- migrate:up
ALTER TABLE regruter
ADD COLUMN is_admin boolean default false;

-- migrate:down
ALTER TABLE regruter
DROP COLUMN is_admin;
