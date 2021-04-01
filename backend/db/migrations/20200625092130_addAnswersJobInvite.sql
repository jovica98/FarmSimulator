-- migrate:up
ALTER TABLE jobinvite
ADD COLUMN answers answer[];

-- migrate:down

