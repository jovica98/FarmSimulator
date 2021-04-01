-- migrate:up
ALTER TABLE company
DROP COLUMN activerequestforoperators;
ALTER TABLE company
ADD COLUMN activerequests integer DEFAULT 0;
ALTER TABLE company
DROP COLUMN realizationofrequestforoperators;
ALTER TABLE company
ADD COLUMN realization decimal DEFAULT 0;


-- migrate:down

