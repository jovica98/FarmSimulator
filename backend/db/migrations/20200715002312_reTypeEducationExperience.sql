-- migrate:up
ALTER TABLE operator
DROP COLUMN education ;
ALTER TABLE operator
DROP COLUMN experience ;
ALTER TABLE operator
ADD COLUMN education int[];
ALTER TABLE operator
ADD COLUMN experience int[];

-- migrate:down

