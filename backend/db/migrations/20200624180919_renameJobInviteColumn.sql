-- migrate:up
ALTER TABLE jobinvite
RENAME COLUMN realization TO hired_operators;

-- migrate:down

