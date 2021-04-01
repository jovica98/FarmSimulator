-- migrate:up
ALTER TABLE operator
ADD COLUMN invitations integer[];
-- migrate:down

