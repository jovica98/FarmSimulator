-- migrate:up
ALTER TABLE operator
ADD COLUMN status text DEFAULT 'active';

-- migrate:down
ALTER TABLE operator
DROP COLUMN status;
