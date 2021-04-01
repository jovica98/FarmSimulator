-- migrate:up
ALTER TABLE question
DROP COLUMN questionText;
ALTER TABLE question
ADD COLUMN questionText text;

-- migrate:down

