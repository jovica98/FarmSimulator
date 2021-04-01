-- migrate:up
ALTER TABLE company
ADD column answers answer[];

-- migrate:down

