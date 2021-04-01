-- migrate:up
ALTER TABLE regruter
ADD COLUMN name text;
ALTER TABLE regruter
ADD COLUMN lastname text;
ALTER TABLE regruter
ADD COLUMN email text;

-- migrate:down

