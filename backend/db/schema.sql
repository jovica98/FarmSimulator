SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: answer; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.answer AS (
	questionid integer,
	value text
);


--
-- Name: jobinviteanswer; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.jobinviteanswer AS (
	jobinviteid integer,
	isaccept text,
	isactive text
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: question; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.question (
    id integer NOT NULL,
    answers text[],
    typeprofile text,
    questiontext text,
    connection integer DEFAULT 0,
    checkbox boolean,
    podtip text
);


--
-- Name: admin_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.admin_id_seq OWNED BY public.question.id;


--
-- Name: answers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.answers (
    role_id integer,
    answer text,
    role text,
    question_id integer,
    profiletype text
);


--
-- Name: blog; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blog (
    title text,
    id integer NOT NULL,
    htmlurl text,
    imageurls text[]
);


--
-- Name: blog_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.blog_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: blog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.blog_id_seq OWNED BY public.blog.id;


--
-- Name: comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comments (
    comment_id integer NOT NULL,
    comment_text text,
    profile_type text,
    profile_id integer,
    regrutor_admin_id integer,
    admin_name text
);


--
-- Name: comments_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comments_comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comments_comment_id_seq OWNED BY public.comments.comment_id;


--
-- Name: company; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.company (
    id integer NOT NULL,
    username character varying(25),
    name character varying(25),
    lastname character varying(25),
    mb character varying(13),
    companyname character varying(25),
    cellphone character varying(25),
    email character varying(25),
    comments text[],
    unfillsurvey integer DEFAULT 0,
    acceptregistration boolean DEFAULT false,
    password character varying(64) DEFAULT ''::character varying,
    active_requests integer DEFAULT 0,
    hired_operators numeric DEFAULT 0,
    answers public.answer[],
    mark integer
);


--
-- Name: company_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.company_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: company_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.company_id_seq OWNED BY public.company.id;


--
-- Name: education; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.education (
    operator_id integer,
    school text,
    location text,
    smer text,
    level text,
    duration text
);


--
-- Name: experience; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.experience (
    operator_id integer,
    firm text,
    location text,
    "position" text,
    duration text,
    description text,
    hired text,
    abroad text,
    country text
);


--
-- Name: jobinvite; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.jobinvite (
    id integer NOT NULL,
    opendate date,
    typeoperator character varying(25),
    requireoperators integer,
    hired_operators integer,
    location character varying(25),
    closedate date,
    status character varying(10) DEFAULT 'otvoren'::character varying,
    companyid integer,
    answers public.answer[],
    accept text DEFAULT 'None'::text,
    podtip text
);


--
-- Name: jobinvite_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.jobinvite_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: jobinvite_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.jobinvite_id_seq OWNED BY public.jobinvite.id;


--
-- Name: operator; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.operator (
    id integer NOT NULL,
    username character varying(25) NOT NULL,
    name character varying(25) NOT NULL,
    lastname character varying(25) NOT NULL,
    email text,
    cellphone character varying(15) NOT NULL,
    active_requests integer DEFAULT 0,
    accept_requests integer DEFAULT 0,
    decline_requests integer DEFAULT 0,
    blanksurvey integer DEFAULT 0,
    comments text[],
    password character varying(150),
    skill text[],
    status text DEFAULT 'active'::text,
    answers public.answer[],
    accepted integer[],
    declined integer[],
    invitations integer[],
    education integer[],
    experience integer[],
    mark integer
);


--
-- Name: operator_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.operator_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: operator_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.operator_id_seq OWNED BY public.operator.id;


--
-- Name: regruter; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.regruter (
    id integer NOT NULL,
    username character varying(25),
    blocked boolean DEFAULT false,
    password character varying(128),
    name text,
    lastname text,
    email text,
    is_admin boolean DEFAULT false
);


--
-- Name: regruter_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.regruter_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: regruter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.regruter_id_seq OWNED BY public.regruter.id;


--
-- Name: reset_password; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reset_password (
    email text,
    token text,
    expiredate bigint
);


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying(255) NOT NULL
);


--
-- Name: blog id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog ALTER COLUMN id SET DEFAULT nextval('public.blog_id_seq'::regclass);


--
-- Name: comments comment_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments ALTER COLUMN comment_id SET DEFAULT nextval('public.comments_comment_id_seq'::regclass);


--
-- Name: company id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.company ALTER COLUMN id SET DEFAULT nextval('public.company_id_seq'::regclass);


--
-- Name: jobinvite id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.jobinvite ALTER COLUMN id SET DEFAULT nextval('public.jobinvite_id_seq'::regclass);


--
-- Name: operator id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.operator ALTER COLUMN id SET DEFAULT nextval('public.operator_id_seq'::regclass);


--
-- Name: question id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.question ALTER COLUMN id SET DEFAULT nextval('public.admin_id_seq'::regclass);


--
-- Name: regruter id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.regruter ALTER COLUMN id SET DEFAULT nextval('public.regruter_id_seq'::regclass);


--
-- Name: question admin_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);


--
-- Name: blog blog_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog
    ADD CONSTRAINT blog_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (comment_id);


--
-- Name: company company_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (id);


--
-- Name: jobinvite jobinvite_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.jobinvite
    ADD CONSTRAINT jobinvite_pkey PRIMARY KEY (id);


--
-- Name: operator operator_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.operator
    ADD CONSTRAINT operator_pkey PRIMARY KEY (id);


--
-- Name: regruter regruter_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.regruter
    ADD CONSTRAINT regruter_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- PostgreSQL database dump complete
--


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
    ('20200619142355'),
    ('20200619233211'),
    ('20200620000949'),
    ('20200620002553'),
    ('20200620022658'),
    ('20200620090743'),
    ('20200620100255'),
    ('20200620102238'),
    ('20200620102853'),
    ('20200620122329'),
    ('20200623032500'),
    ('20200623043751'),
    ('20200623055044'),
    ('20200623153139'),
    ('20200623212908'),
    ('20200623233124'),
    ('20200624163439'),
    ('20200624165102'),
    ('20200624180919'),
    ('20200624203658'),
    ('20200624220642'),
    ('20200625001822'),
    ('20200625035259'),
    ('20200625042851'),
    ('20200625054454'),
    ('20200625080212'),
    ('20200625092130'),
    ('20200625111733'),
    ('20200625131816'),
    ('20200627162418'),
    ('20200627183222'),
    ('20200627202602'),
    ('20200628081412'),
    ('20200628083657'),
    ('20200628091534'),
    ('20200628091826'),
    ('20200628105601'),
    ('20200703214539'),
    ('20200707020929'),
    ('20200707140733'),
    ('20200714224015'),
    ('20200714232227'),
    ('20200714232828'),
    ('20200715002312'),
    ('20200715004238'),
    ('20200716094348'),
    ('20200716122010'),
    ('20200729095033'),
    ('20200729115401'),
    ('20200729125446'),
    ('20200729125839'),
    ('20200802181434'),
    ('20200810101005'),
    ('20200811143747'),
    ('20200811144014'),
    ('20200820081840'),
    ('20200822113801'),
    ('20200822133202');
