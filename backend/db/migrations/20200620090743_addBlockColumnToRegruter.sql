-- migrate:up
ALTER TABLE regruter
ADD COLUMN blocked boolean DEFAULT false;

-- migrate:down
ALTER TABLE regruter
DROP COLUMN blocked;
