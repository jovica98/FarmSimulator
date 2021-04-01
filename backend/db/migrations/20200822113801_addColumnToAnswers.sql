-- migrate:up
ALTER TABLE answers
ADD COLUMN profiletype text;

-- migrate:down
ALTER TABLE answers
DROP COLUMN profiletype;
