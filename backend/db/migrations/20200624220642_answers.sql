-- migrate:up
ALTER TABLE question
RENAME COLUMN answer TO answers;

-- migrate:down

