-- migrate:up
ALTER TABLE blog
DROP COLUMN imageUrl;
ALTER TABLE blog
ADD COLUMN imageUrls text[];

-- migrate:down

