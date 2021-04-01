-- migrate:up
ALTER TABLE operator
ADD COLUMN invitations jobInviteAnswer[];

-- migrate:down

ALTER TABLE operator
DROP column accepted ;
ALTER TABLE operator
DROP column declined;
