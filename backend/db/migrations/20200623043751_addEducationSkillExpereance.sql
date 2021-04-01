-- migrate:up
ALTER TABLE operator
ADD COLUMN education text[];
ALTER TABLE operator
ADD COLUMN experience text[];
ALTER TABLE operator
ADD COLUMN skill text[];
-- migrate:down
ALTER TABLE operator
DROP COLUMN education ;
ALTER TABLE operator
DROP COLUMN experience ;
ALTER TABLE operator
DROP COLUMN skill ;
