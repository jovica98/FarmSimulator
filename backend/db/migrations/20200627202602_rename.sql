-- migrate:up
ALTER TABLE blog
RENAME COLUMN htmlstring TO htmlurl;

-- migrate:down

