-- migrate:up
ALTER TABLE comments
ADD COLUMN admin_name text;

-- migrate:down

