-- migrate:up
ALTER TABLE operator
DROP COLUMN invitations;

-- migrate:down

