-- migrate:up
ALTER TABLE operator
ADD COLUMN picture bytea;

-- migrate:down
ALTER TABLE operator
DROP COLUMN picture;
