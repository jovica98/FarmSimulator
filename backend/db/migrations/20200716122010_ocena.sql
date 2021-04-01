-- migrate:up
ALTER TABLE operator
ADD COLUMN mark integer;
ALTER TABLE company
ADD COLUMN mark integer;
-- migrate:down
ALTER TABLE operator
DROP COLUMN mark ;
ALTER TABLE company
DROP COLUMN mark ;
