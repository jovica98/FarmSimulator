-- migrate:up
ALTER TABLE operator 
ADD COLUMN answers answer[];

-- migrate:down

