-- migrate:up
ALTER TABLE operator DROP COLUMN password;
ALTER TABLE operator 
ADD COLUMN password varchar(150);

-- migrate:down

