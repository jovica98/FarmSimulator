-- migrate:up
ALTER TABLE blog
DROP COLUMN image;
ALTER TABLE blog
ADD COLUMN imageUrl text;
ALTER TABLE blog
ADD COLUMN htmlString text;

-- migrate:down
ALTER TABLE blog
DROP COLUMN imageUrl;
ALTER TABLE blog
DROP COLUMN htmlString;
