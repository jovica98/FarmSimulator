-- migrate:up
ALTER TABLE blog
RENAME COLUMN content TO title;

-- migrate:down

