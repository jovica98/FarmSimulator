-- migrate:up
ALTER TABLE operator
RENAME COLUMN activesupply TO active_requests;
ALTER TABLE operator
RENAME COLUMN declinesupply TO decline_requests;
ALTER TABLE operator
RENAME COLUMN acceptsupply TO accept_requests;
-- migrate:down

