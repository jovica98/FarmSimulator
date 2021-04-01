-- migrate:up
ALTER TABLE question
ADD COLUMN connection integer default 0;

-- migrate:down

