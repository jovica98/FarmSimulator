-- migrate:up
ALTER TABLE question
ADD COLUMN podtip text;

-- migrate:down

ALTER TABLE question
DROP COLUMN podtip;