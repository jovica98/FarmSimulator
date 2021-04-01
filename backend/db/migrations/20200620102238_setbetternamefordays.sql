-- migrate:up
ALTER TABLE jobinvite
RENAME COLUMN open TO opendate;
ALTER TABLE jobinvite
RENAME COLUMN close TO closedate;

-- migrate:down

