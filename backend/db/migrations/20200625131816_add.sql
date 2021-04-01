-- migrate:up
ALTER TABLE jobinvite
ADD column accept text default 'None';

-- migrate:down
ALTER TABLE jobinvite
DROP column accept;
