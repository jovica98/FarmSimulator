-- migrate:up
ALTER TABLE jobinvite
DROP COLUMN companyname;
ALTER TABLE jobinvite
ADD COLUMN companyid integer;

-- migrate:down
ALTER TABLE jobinvite
DROP COLUMN companyid;
ALTER TABLE jobinvite
ADD COLUMN companyname varchar(25);