-- migrate:up
CREATE TABLE public.admin(
	id SERIAL PRIMARY KEY,
	questionText varchar(25),
	answer text[],
	typeProfile text
)

TABLESPACE pg_default;

CREATE TABLE public.company
(
    id SERIAL PRIMARY KEY,
    username varchar(25),
    name character varying(25) ,
    lastName character varying(25) ,
    mb varchar(13),
    companyName character varying(25)  ,
    cellphone character varying(25)  ,
    email character varying(25)  ,
    comments text[]  ,
    activerequestforoperators integer DEFAULT 0,
    unfillsurvey integer DEFAULT 0,
    realizationofrequestforoperators double precision DEFAULT 0,
    acceptregistration boolean DEFAULT false,
    password character varying(64)   DEFAULT ''::character varying
)



TABLESPACE pg_default;

CREATE TABLE public.jobinvite
(
	id SERIAL PRIMARY KEY,
    open date,
    typeoperator character varying(25) ,
    requiredofoperators integer,
    realizedoperators integer,
    location character varying(25) ,
    close date,
    status character varying(10)  DEFAULT 'otvoren'::character varying,
    company varchar(25)
)

TABLESPACE pg_default;

CREATE TABLE public.operator
(
    id SERIAL PRIMARY KEY,
    username character varying(25)  NOT NULL,
    password character varying(25)  NOT NULL,
    name character varying(25)   NOT NULL,
    lastname character varying(25)   NOT NULL,
    email character varying(25)  ,
    cellphone character varying(15)   NOT NULL,
    activesupply integer DEFAULT 0,
    acceptsupply integer DEFAULT 0,
    declinesupply integer DEFAULT 0,
    blanksurvey integer DEFAULT 0,
    comments text[]  
)

TABLESPACE pg_default;

CREATE TABLE public.regruter(
	id SERIAL PRIMARY KEY,
	username varchar(25),
	password varchar(25)
)

TABLESPACE pg_default;


-- migrate:down
DROP TABLE public.admin;
DROP TABLE public.company;
DROP TABLE public.operator;
DROP TABLE public.jobinvite;
DROP TABLE public.regruter;
