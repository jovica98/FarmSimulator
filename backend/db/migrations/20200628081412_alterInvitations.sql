-- migrate:up
ALTER TYPE jobInviteAnswer
ADD ATTRIBUTE isactive text;

-- migrate:down

