-- migrate:up
ALTER TABLE jobinvite
RENAME COLUMN requiredofoperators TO requireoperators;

ALTER TABLE jobinvite
RENAME COLUMN realizedoperators TO realization;

-- migrate:down

