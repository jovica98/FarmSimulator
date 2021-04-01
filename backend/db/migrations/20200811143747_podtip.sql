-- migrate:up
ALTER TABLE jobinvite
ADD COLUMN podtip text;

-- migrate:down

ALTER TABLE jobinvite
DROP COLUMN podtip;