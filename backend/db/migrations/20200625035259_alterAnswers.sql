-- migrate:up
ALTER TYPE answer
RENAME ATTRIBUTE idquestion TO questionid;

-- migrate:down

