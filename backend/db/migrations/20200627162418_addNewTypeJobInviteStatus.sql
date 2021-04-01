-- migrate:up
CREATE TYPE jobInviteAnswer AS(
	jobinviteid integer,
	isaccept text 
);

-- migrate:down
DROP TYPE jobInviteAnswer;
