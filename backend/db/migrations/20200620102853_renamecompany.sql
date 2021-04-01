-- migrate:up
ALTER TABLE jobinvite
RENAME COLUMN company to companyname;

-- migrate:down

