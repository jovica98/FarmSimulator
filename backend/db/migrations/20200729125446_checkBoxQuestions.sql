-- migrate:up
ALTER TABLE question
ADD COLUMN checkbox boolean;

-- migrate:down
ALTER TABLE question
DROP COLUMN checkbox ;
