-- migrate:up
ALTER TABLE operator
ADD column accepted integer[];
ALTER TABLE operator
ADD column declined integer[];
-- migrate:down
ALTER TABLE operator
DROP column accepted ;
ALTER TABLE operator
DROP column declined;
