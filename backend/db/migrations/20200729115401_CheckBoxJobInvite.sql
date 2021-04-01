-- migrate:up
ALTER TABLE jobinvite
ADD COLUMN checkbox boolean;

-- migrate:down
ALTER TABLE jobinvite
DROP COLUMN checkbox ;
