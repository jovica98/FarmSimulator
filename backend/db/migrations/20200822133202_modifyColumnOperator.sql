-- migrate:up
ALTER TABLE operator
ALTER COLUMN email TYPE text;

-- migrate:down

