--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2023-07-23 21:47:19

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
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3470 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 238 (class 1259 OID 32800)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(255),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 32799)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.categories ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 234 (class 1259 OID 24735)
-- Name: changePassword; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."changePassword" (
    id integer NOT NULL,
    email character varying(255),
    "oldPassword" character varying(255),
    "newPassword" character varying(255),
    "confirmPassword" character varying(255),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public."changePassword" OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 24734)
-- Name: changePassword_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."changePassword" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."changePassword_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 218 (class 1259 OID 24653)
-- Name: cities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cities (
    id integer NOT NULL,
    picture character varying(255),
    name character varying(255),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone,
    "mapLocation" character varying(255)
);


ALTER TABLE public.cities OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 24652)
-- Name: cities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.cities ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 244 (class 1259 OID 32825)
-- Name: eventCategories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."eventCategories" (
    id integer NOT NULL,
    "eventId" integer,
    "categoryId" integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public."eventCategories" OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 32824)
-- Name: eventCategories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."eventCategories" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."eventCategories_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 242 (class 1259 OID 32816)
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id integer NOT NULL,
    picture character varying(255),
    title character varying(255),
    date date,
    "cityId" integer,
    "createdBy" integer,
    descriptions text,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.events OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 32815)
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.events ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 236 (class 1259 OID 32791)
-- Name: forgotRequest; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."forgotRequest" (
    id integer NOT NULL,
    email character varying(255),
    code character varying(255),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public."forgotRequest" OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 32790)
-- Name: forgotRequest_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."forgotRequest" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."forgotRequest_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 240 (class 1259 OID 32807)
-- Name: partners; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.partners (
    id integer NOT NULL,
    picture character varying(255),
    name character varying(255),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.partners OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 32806)
-- Name: partners_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.partners ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.partners_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 224 (class 1259 OID 24685)
-- Name: paymentMethod; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."paymentMethod" (
    id integer NOT NULL,
    name character varying(255),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public."paymentMethod" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 24684)
-- Name: paymentMethod_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."paymentMethod" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."paymentMethod_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 232 (class 1259 OID 24715)
-- Name: profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile (
    id integer NOT NULL,
    picture character varying(255),
    "fullName" character varying(255),
    "phoneNumber" character varying(255),
    gender boolean,
    profession character varying(255),
    nationality character varying(255),
    "birthDate" date,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone,
    "userId" integer
);


ALTER TABLE public.profile OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 24714)
-- Name: profile_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.profile ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.profile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 220 (class 1259 OID 24671)
-- Name: reservationSections; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."reservationSections" (
    id integer NOT NULL,
    name character varying(255),
    price integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public."reservationSections" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24670)
-- Name: reservationSections_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."reservationSections" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."reservationSections_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 222 (class 1259 OID 24678)
-- Name: reservationStatus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."reservationStatus" (
    id integer NOT NULL,
    name character varying(255),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public."reservationStatus" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24677)
-- Name: reservationStatus_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."reservationStatus" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."reservationStatus_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 228 (class 1259 OID 24699)
-- Name: reservationTicket; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."reservationTicket" (
    id integer NOT NULL,
    "reservationId" integer,
    "sectionId" integer,
    quantity integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public."reservationTicket" OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 24698)
-- Name: reservationTicket_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."reservationTicket" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."reservationTicket_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 226 (class 1259 OID 24692)
-- Name: reservations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reservations (
    id integer NOT NULL,
    "eventId" integer,
    "userId" integer,
    status integer,
    "paymentMethodId" integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.reservations OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 24691)
-- Name: reservations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.reservations ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.reservations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 216 (class 1259 OID 24610)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255),
    email character varying(255),
    password character varying(255),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 24609)
-- Name: users0_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users0_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 230 (class 1259 OID 24706)
-- Name: wishlist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.wishlist (
    id integer NOT NULL,
    "eventId" integer,
    "userId" integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.wishlist OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 24705)
-- Name: wishlist_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.wishlist ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.wishlist_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3458 (class 0 OID 32800)
-- Dependencies: 238
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name, "createdAt", "updatedAt") FROM stdin;
1	Music	2023-05-01 01:47:36.407583	\N
2	Arts	2023-05-01 01:47:54.055442	\N
3	Outdoors	2023-05-01 01:48:06.490897	\N
4	Workshop	2023-05-01 01:48:21.469998	\N
5	Sport	2023-05-01 01:48:33.070386	\N
6	Festival	2023-05-01 01:48:43.689133	\N
7	Fashion	2023-05-01 01:48:54.855991	\N
\.


--
-- TOC entry 3454 (class 0 OID 24735)
-- Dependencies: 234
-- Data for Name: changePassword; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."changePassword" (id, email, "oldPassword", "newPassword", "confirmPassword", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 3438 (class 0 OID 24653)
-- Dependencies: 218
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cities (id, picture, name, "createdAt", "updatedAt", "mapLocation") FROM stdin;
2	https://res.cloudinary.com/dxs0yxeyr/image/upload/v1684051593/demo/fajarfath/1684051589463.png	Bandung	2023-04-15 11:54:15.337651	\N	https://goo.gl/maps/SKCeNnNLC985YaEX6
3	https://res.cloudinary.com/dxs0yxeyr/image/upload/v1684051612/demo/fajarfath/1684051608833.png	Bali	2023-04-30 23:08:35.089524	\N	https://goo.gl/maps/tNWBpeByL9wJ3WxB9
4	https://res.cloudinary.com/dxs0yxeyr/image/upload/v1684051643/demo/fajarfath/1684051640275.png	Aceh	2023-04-30 23:10:34.650718	\N	https://goo.gl/maps/Qzk4XJQhNKR4jma28
5	https://res.cloudinary.com/dxs0yxeyr/image/upload/v1684051663/demo/fajarfath/1684051660067.png	Solo	2023-04-30 23:11:57.349732	\N	https://goo.gl/maps/gDFcXeXkcX2NC98e9
6	https://res.cloudinary.com/dxs0yxeyr/image/upload/v1684051678/demo/fajarfath/1684051675423.png	Yogyakarta	2023-04-30 23:12:40.976231	\N	https://goo.gl/maps/EaFVxoWXd2dSdwyg9
7	https://res.cloudinary.com/dxs0yxeyr/image/upload/v1684051695/demo/fajarfath/1684051690404.png	Semarang	2023-04-30 23:13:48.055332	\N	https://goo.gl/maps/dJh6X3uRji2fHr7r5
1	https://res.cloudinary.com/dxs0yxeyr/image/upload/v1684073379/demo/fajarfath/1684073376862.png	Jakarta	2023-04-15 11:48:15.276191	\N	https://goo.gl/maps/YqDh86GimQkZeC539
\.


--
-- TOC entry 3464 (class 0 OID 32825)
-- Dependencies: 244
-- Data for Name: eventCategories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."eventCategories" (id, "eventId", "categoryId", "createdAt", "updatedAt") FROM stdin;
1	1	1	2023-05-07 23:08:12.677929	\N
2	1	6	2023-05-07 23:08:12.677929	\N
3	2	7	2023-05-07 23:08:12.677929	\N
4	3	3	2023-05-07 23:08:12.677929	\N
5	4	4	2023-05-07 23:08:12.677929	\N
6	5	5	2023-05-07 23:08:12.677929	\N
7	6	3	2023-05-07 23:08:12.677929	\N
8	6	5	2023-05-07 23:08:12.677929	\N
9	7	4	2023-05-07 23:08:12.677929	\N
10	8	7	2023-05-07 23:08:12.677929	\N
11	9	2	2023-05-13 15:46:47.552971	\N
\.


--
-- TOC entry 3462 (class 0 OID 32816)
-- Dependencies: 242
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (id, picture, title, date, "cityId", "createdBy", descriptions, "createdAt", "updatedAt") FROM stdin;
5	https://res.cloudinary.com/dxs0yxeyr/image/upload/v1688719480/demo/fajarfath/1688719476719.png	X-GAMES BMX Megaramp	2023-11-20	3	14	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.	2023-05-07 23:06:34.555052	\N
9	https://res.cloudinary.com/dxs0yxeyr/image/upload/v1688719480/demo/fajarfath/1688719476719.png	The 'Mona Lisa' Virtual Reality Experience	2023-12-31	7	14	\N	2023-05-13 15:46:47.540069	\N
6	https://res.cloudinary.com/dxs0yxeyr/image/upload/v1688718805/demo/fajarfath/1688718802301.png	Mancing Mania Mantap	2023-11-21	2	15	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.	2023-05-07 23:06:34.555052	\N
4	https://res.cloudinary.com/dxs0yxeyr/image/upload/v1688718944/demo/fajarfath/1688718939957.png	Aquascaping Exceptional	2023-11-19	4	8	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.	2023-05-07 23:06:34.555052	\N
3	https://res.cloudinary.com/dxs0yxeyr/image/upload/v1688719001/demo/fajarfath/1688718996641.png	Set Green for Next Gen	2023-11-17	7	13	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.	2023-05-07 23:06:34.555052	\N
8	https://res.cloudinary.com/dxs0yxeyr/image/upload/v1684069801/demo/fajarfath/1684069799729.png	Versace Villains Vampire	2023-11-23	2	17	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.	2023-05-07 23:06:34.555052	\N
7	https://res.cloudinary.com/dxs0yxeyr/image/upload/v1688718620/demo/fajarfath/1688718615579.png	TED-X Bright Future	2023-11-22	1	16	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.	2023-05-07 23:06:34.555052	\N
2	https://res.cloudinary.com/dxs0yxeyr/image/upload/v1688719053/demo/fajarfath/1688719049293.png	Afternoon S(T)ea Party	2023-11-17	6	11	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.	2023-05-07 23:06:34.555052	\N
1	https://res.cloudinary.com/dxs0yxeyr/image/upload/v1688719136/demo/fajarfath/1688719132322.png	Jimi Hendrix Experience	2023-11-16	1	10	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.	2023-05-07 23:06:34.555052	\N
\.


--
-- TOC entry 3456 (class 0 OID 32791)
-- Dependencies: 236
-- Data for Name: forgotRequest; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."forgotRequest" (id, email, code, "createdAt", "updatedAt") FROM stdin;
1	johncenacena@mail.com	397230	2023-04-18 15:37:19.926145	\N
\.


--
-- TOC entry 3460 (class 0 OID 32807)
-- Dependencies: 240
-- Data for Name: partners; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.partners (id, picture, name, "createdAt", "updatedAt") FROM stdin;
1	1682882172751.png	Etihad Airways	2023-05-01 02:16:12.991486	\N
2	1682882194313.jpg	Universal Studios	2023-05-01 02:16:34.515588	\N
3	1682882247001.png	Airbnb	2023-05-01 02:17:27.221526	\N
4	1682882275055.png	Olay	2023-05-01 02:17:55.26609	\N
5	1682882294438.jpg	Motorolla Tech	2023-05-01 02:18:14.626843	\N
6	1682882342363.jpg	Hardrock Cafe	2023-05-01 02:19:02.549949	\N
\.


--
-- TOC entry 3444 (class 0 OID 24685)
-- Dependencies: 224
-- Data for Name: paymentMethod; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."paymentMethod" (id, name, "createdAt", "updatedAt") FROM stdin;
1	Card	2023-05-02 08:15:49.760885	\N
2	Bank Transfer	2023-05-02 08:15:49.760885	\N
3	Retail	2023-05-02 08:15:49.760885	\N
4	eMoney	2023-05-02 08:15:49.760885	\N
\.


--
-- TOC entry 3452 (class 0 OID 24715)
-- Dependencies: 232
-- Data for Name: profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile (id, picture, "fullName", "phoneNumber", gender, profession, nationality, "birthDate", "createdAt", "updatedAt", "userId") FROM stdin;
16	https://res.cloudinary.com/dxs0yxeyr/image/upload/v1684584610/demo/fajarfath/1684584607712.png	Jack Sparrow	\N	\N	\N	\N	\N	2023-05-16 18:08:40.684562	\N	19
21	https://res.cloudinary.com/dxs0yxeyr/image/upload/v1684742058/demo/fajarfath/1684742057456.png	David Backham	\N	f	Football Player	united arab emirates	2018-05-20	2023-05-22 14:49:29.416927	\N	24
22	\N	User Pertama	\N	\N	\N	\N	\N	2023-07-06 21:34:58.99978	\N	25
7	1682702374515.jpg	Matt Hardy	081234567890	f	Elite Wrestler	USA	1974-09-22	2023-04-28 22:47:35.154404	\N	8
11	\N	Paulo	\N	\N	\N	\N	\N	2023-05-02 12:23:07.873862	\N	14
23	\N	user2	\N	\N	\N	\N	\N	2023-07-06 21:39:47.485409	\N	26
13	\N	Jonas Kahnwald	\N	\N	\N	\N	\N	2023-05-07 21:45:37.97096	\N	16
8	https://res.cloudinary.com/dxs0yxeyr/image/upload/v1688896245/demo/fajarfath/1688896242268.png	Lionel Andrés Messi Cuccittini	081010101010	f	Football Player	argentina	2020-06-20	2023-04-29 00:07:19.636677	\N	10
9	https://res.cloudinary.com/dxs0yxeyr/image/upload/v1684045617/demo/fajarfath/1684045614908.png	Cristiano Ronaldo dos Santos Aveiro	080707070707	f	Football Player	Portugal	1985-02-05	2023-04-29 00:13:16.732371	\N	11
14	https://res.cloudinary.com/dxs0yxeyr/image/upload/v1684051035/demo/fajarfath/1684051032665.png	Marco Reus	08311112131415	f	Football Player	Germany	1989-05-31	2023-05-07 21:46:35.432241	\N	17
15	\N	Test 1	\N	\N	\N	\N	\N	2023-05-16 15:10:13.424677	\N	18
17	\N	Ozzy Ousbourne	\N	\N	\N	\N	\N	2023-05-16 18:18:28.304147	\N	20
18	\N	Robert Kiyosaki	\N	\N	\N	\N	\N	2023-05-16 20:44:38.265874	\N	21
19	https://res.cloudinary.com/dxs0yxeyr/image/upload/v1684245652/demo/fajarfath/1684245650660.png	Riri Alasary	\N	\N	\N	\N	\N	2023-05-16 20:55:03.010062	\N	22
24	\N	mencoba	\N	\N	\N	\N	\N	2023-07-10 11:39:45.357003	\N	27
25	\N	mencoba1	\N	\N	\N	\N	\N	2023-07-10 11:45:27.816416	\N	28
26	\N	mencoba3	\N	\N	\N	\N	\N	2023-07-10 11:59:36.469992	\N	29
27	\N	mencoba4	\N	\N	Designer	\N	2023-07-10	2023-07-10 12:15:57.773731	\N	30
28	\N	uercoba	\N	\N	\N	\N	\N	2023-07-10 14:25:47.890915	\N	31
29	\N	cobalagi	\N	\N	\N	\N	\N	2023-07-10 14:27:31.8079	\N	32
10	https://res.cloudinary.com/dxs0yxeyr/image/upload/v1688974497/demo/fajarfath/1688974493639.png	Deddy Drogba	0898767654	f	Elite Wrestler	Luxembourg	1982-09-14	2023-05-02 11:45:37.156412	\N	13
30	\N	useruser	\N	\N	\N	\N	\N	2023-07-10 14:49:26.560834	\N	33
31	\N	coba1	\N	\N	\N	\N	\N	2023-07-10 14:54:37.92631	\N	34
32	\N	userpercobaan	\N	\N	\N	\N	\N	2023-07-15 19:37:31.250671	\N	35
33	\N	userpercobaan1	\N	\N	\N	\N	\N	2023-07-15 19:41:33.535676	\N	36
34	\N	userpercobaan2	\N	\N	\N	\N	\N	2023-07-15 19:43:41.672647	\N	37
12	https://res.cloudinary.com/dxs0yxeyr/image/upload/v1684591763/demo/fajarfath/1684591761320.png	Patrick Bateman	\N	f	Artist	united states	\N	2023-05-07 21:44:17.208069	\N	15
20	https://res.cloudinary.com/dxs0yxeyr/image/upload/v1684594413/demo/fajarfath/1684594410400.png	Domestos Nomos	081213141516	t	Social Worker	uruguay	2020-01-20	2023-05-19 21:54:51.224775	\N	23
\.


--
-- TOC entry 3440 (class 0 OID 24671)
-- Dependencies: 220
-- Data for Name: reservationSections; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."reservationSections" (id, name, price, "createdAt", "updatedAt") FROM stdin;
1	Regular	150000	2023-05-02 08:15:46.095438	\N
2	VIP	350000	2023-05-02 08:15:46.095438	\N
3	VVIP	500000	2023-05-02 08:15:46.095438	\N
\.


--
-- TOC entry 3442 (class 0 OID 24678)
-- Dependencies: 222
-- Data for Name: reservationStatus; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."reservationStatus" (id, name, "createdAt", "updatedAt") FROM stdin;
1	PENDING	2023-05-02 08:15:39.490907	\N
2	PAID	2023-05-02 08:15:39.490907	\N
3	EXPIRED	2023-05-02 08:15:39.490907	\N
\.


--
-- TOC entry 3448 (class 0 OID 24699)
-- Dependencies: 228
-- Data for Name: reservationTicket; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."reservationTicket" (id, "reservationId", "sectionId", quantity, "createdAt", "updatedAt") FROM stdin;
1	1	2	2	2023-05-22 03:26:55.057277	\N
2	2	3	4	2023-05-22 10:57:00.326463	\N
3	3	3	2	2023-05-22 10:58:53.796685	\N
4	4	1	2	2023-05-22 11:51:39.536869	\N
5	5	3	4	2023-05-22 14:56:16.067124	\N
6	6	2	2	2023-05-22 15:03:19.627404	\N
\.


--
-- TOC entry 3446 (class 0 OID 24692)
-- Dependencies: 226
-- Data for Name: reservations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reservations (id, "eventId", "userId", status, "paymentMethodId", "createdAt", "updatedAt") FROM stdin;
1	2	23	2	2	2023-05-22 03:26:55.043871	\N
2	1	23	1	\N	2023-05-22 10:57:00.304821	\N
3	1	23	2	2	2023-05-22 10:58:53.787066	\N
4	6	13	1	\N	2023-05-22 11:51:39.511666	\N
5	6	24	2	4	2023-05-22 14:56:16.056047	\N
6	4	24	2	2	2023-05-22 15:03:19.617669	\N
\.


--
-- TOC entry 3436 (class 0 OID 24610)
-- Dependencies: 216
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, "createdAt", "updatedAt") FROM stdin;
22	\N	riri@gmail.com	$argon2id$v=19$m=65536,t=3,p=4$5Mp4T/++is9mKstST6IJew$Kem7TghaEUjljfKu4EJ2/p8XeR5sBE+Oe1RhfkV6E+I	2023-05-16 20:55:03.001678	\N
31	\N	usercoba@mail.com	$argon2id$v=19$m=65536,t=3,p=4$LW+9kXHyGDF5j86APfZjeQ$HjLc1HBty5jwN6cOD1e8roCAJB40B3698MR6iVdtjw8	2023-07-10 14:25:47.840179	\N
32	\N	cobalagi@mail.com	$argon2id$v=19$m=65536,t=3,p=4$D56BvVEIXgWTVVdQdJEibg$Za433KJ5wRlo8Eg5K3QJZ6D50Z8n3xmVGq942H2iSgo	2023-07-10 14:27:31.801172	\N
33	\N	useruser@mail.com	$argon2id$v=19$m=65536,t=3,p=4$MJYIOhPNUOPymj60RIyIUA$FeDWexcfREGgjqBAth8i9Y7aom+rGy6PGFRAxAgRUpw	2023-07-10 14:49:26.513338	\N
34	\N	coba1@mail.com	$argon2id$v=19$m=65536,t=3,p=4$L6LOlXYHOyTjx7mcH96SAw$NbAWRX7NKKinCT9zYFNFlCWIthcX65wwBdBh2mjEL2I	2023-07-10 14:54:37.84157	\N
35	\N	userpercobaan@mail.com	$argon2id$v=19$m=65536,t=3,p=4$GgpwZ+qFbCRckPPSLkUpGw$Iz/3ZXyfaBTEqUpfvOyhrPWLmh+FdzPzKOKezgIRaTo	2023-07-15 19:37:31.089641	\N
11	\N	cristiano@mail.com	$argon2id$v=19$m=65536,t=3,p=4$97y2tnvAeoZgjxVx3VXj/g$GY1lEfCw3BAi6lWMb9bN+eLPI8dIO5NLty0xQBwZxio	2023-04-29 00:13:16.72432	\N
36	\N	userpercobaan1@mail.com	$argon2id$v=19$m=65536,t=3,p=4$dOdT/B6/sLnLFxBb/ImYMw$ar/jRxqqyuipcY3+fDQrHE1SeB9wcwUuf4LImOQC45E	2023-07-15 19:41:33.527785	\N
37	\N	userpercobaan2@mail.com	$argon2id$v=19$m=65536,t=3,p=4$6H12Y5yOG1YHxrCQ3wrs5Q$o3lz9zdSIC8tjDyqwnVxHkw1icnmP36B9z73oekOstw	2023-07-15 19:43:41.663142	\N
13	mas_drogba	drogba@mail.com	$argon2id$v=19$m=65536,t=3,p=4$dLwU+xNtC/aOpdN1Gts9Ug$yZcsvOeJ9rGpK+2xWM6I9ih9v9OKvVavQPtqWyMpIRk	2023-05-02 11:45:37.145502	\N
1	fazz	fazz@mail.com	$argon2id$v=19$m=65536,t=3,p=4$2R2n1pmDhSb3Bid+HsWkoA$A7VszMtxmMYH/yjKzsKb/ZrAcnab+DPK07zFo7T8zJE	2023-04-14 21:56:27.692774	\N
8	\N	mhardy@mail.com	$argon2id$v=19$m=65536,t=3,p=4$2R2n1pmDhSb3Bid+HsWkoA$A7VszMtxmMYH/yjKzsKb/ZrAcnab+DPK07zFo7T8zJE	2023-04-28 22:47:35.129393	\N
14	\N	paulo@mail.com	$argon2id$v=19$m=65536,t=3,p=4$2R2n1pmDhSb3Bid+HsWkoA$A7VszMtxmMYH/yjKzsKb/ZrAcnab+DPK07zFo7T8zJE	2023-05-02 12:23:07.864616	\N
16	\N	jonaskahn@mail.com	$argon2id$v=19$m=65536,t=3,p=4$2R2n1pmDhSb3Bid+HsWkoA$A7VszMtxmMYH/yjKzsKb/ZrAcnab+DPK07zFo7T8zJE	2023-05-07 21:45:37.961824	\N
17	\N	marco@mail.com	$argon2id$v=19$m=65536,t=3,p=4$2R2n1pmDhSb3Bid+HsWkoA$A7VszMtxmMYH/yjKzsKb/ZrAcnab+DPK07zFo7T8zJE	2023-05-07 21:46:35.423696	\N
15	\N	p_bateman@mail.com	$argon2id$v=19$m=65536,t=3,p=4$2R2n1pmDhSb3Bid+HsWkoA$A7VszMtxmMYH/yjKzsKb/ZrAcnab+DPK07zFo7T8zJE	2023-05-07 21:44:17.197512	\N
18	\N	test1@mail.com	$argon2id$v=19$m=65536,t=3,p=4$Rtohb3UZa9n1qezj/Dz+zw$q0Ir4T77xkrSVNDAiqX1ObBeknl9PavoXA7zbTtl0Q0	2023-05-16 15:10:13.392304	\N
20	\N	ozzy@mail.com	$argon2id$v=19$m=65536,t=3,p=4$iLqOc17qQoxM9ikBAYRGzg$oe4j/818ZhaJ0c45Vc14Y49pQYCyDj0CThint94/9EQ	2023-05-16 18:18:28.293051	\N
21	\N	rkiyosaki@mail.com	$argon2id$v=19$m=65536,t=3,p=4$NwEKqNJcuEhyAhdKkrVRIw$zGl28ehNHMq33ct6CRqCoSQ3uQX24yXrE3dRg9cjnwg	2023-05-16 20:44:38.251849	\N
23	malaria	domestos@mail.com	$argon2id$v=19$m=65536,t=3,p=4$ub+MrlFqqSvf4797at5wSA$KwjFcMtuadtHz515PMq6IBLoCOHIZCgQp8h3epKiSfA	2023-05-19 21:54:51.207511	\N
19	\N	jsparrow@mail.com	$argon2id$v=19$m=65536,t=3,p=4$59CDLC8pQ6nnXe7QARyi8Q$FIm/wqkq1CIWb9rvSZdss69cOTaWRddoE22xDT3nQfk	2023-05-16 18:08:40.670031	\N
10	\N	lionelmessi@mail.com	$argon2id$v=19$m=65536,t=3,p=4$2R2n1pmDhSb3Bid+HsWkoA$A7VszMtxmMYH/yjKzsKb/ZrAcnab+DPK07zFo7T8zJE	2023-04-29 00:07:19.622525	\N
24	\N	beckham@mail.com	$argon2id$v=19$m=65536,t=3,p=4$T6HJx6XnxxBy3kkq58WBnw$6TV5lIcQsqB0nTNck/jjncD8IJZKSz8oeIr5YSsxWKo	2023-05-22 14:49:29.40196	\N
25	\N	userpertama@mail.com	$argon2id$v=19$m=65536,t=3,p=4$1s3ext7tcKzbRgwhMazlGg$oLsEgCAq5QafQDQSYYeodaqbUHng9iDeBtcgLPxkZNY	2023-07-06 21:34:58.673683	\N
26	\N	user2@mail.com	$argon2id$v=19$m=65536,t=3,p=4$2xzxWZgUJcfcLLP5+p8oPw$+q+fhbSj+5X0uS/asvCsPs7RrhGafuF4xY37Qwo3ums	2023-07-06 21:39:47.476432	\N
27	\N	mencoba@mail.com	$argon2id$v=19$m=65536,t=3,p=4$z2LnuJ5RDNJ9a90RaBi3vw$ADhai4BsRz+xK9p16P9GJU0Parv9thrSHGGk5l9uooY	2023-07-10 11:39:45.323651	\N
28	\N	mencoba1@mail.com	$argon2id$v=19$m=65536,t=3,p=4$WOa2n1Seu190l7HzesFQKg$iabUs0Aj9q7WWMcPCJsecRwlNg9n0+hIU+xgd0G07Hg	2023-07-10 11:45:27.752411	\N
29	\N	mencoba3@mail.com	$argon2id$v=19$m=65536,t=3,p=4$5cEK/aCRC2EKKPkvzBysCQ$QUkpYgFBwlA498cCjbWDJG1jNY4Rz3zjVBjX9DMsJns	2023-07-10 11:59:36.427989	\N
30	\N	mencoba4@mail.com	$argon2id$v=19$m=65536,t=3,p=4$7jP7hux1Wx0L3pjxKscHMw$6n2cjp76rSR374kUxlC6ijd1vsWU8fzfAaXb1y0dEbs	2023-07-10 12:15:57.765121	\N
\.


--
-- TOC entry 3450 (class 0 OID 24706)
-- Dependencies: 230
-- Data for Name: wishlist; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.wishlist (id, "eventId", "userId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 3471 (class 0 OID 0)
-- Dependencies: 237
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 7, true);


--
-- TOC entry 3472 (class 0 OID 0)
-- Dependencies: 233
-- Name: changePassword_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."changePassword_id_seq"', 1, false);


--
-- TOC entry 3473 (class 0 OID 0)
-- Dependencies: 217
-- Name: cities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cities_id_seq', 7, true);


--
-- TOC entry 3474 (class 0 OID 0)
-- Dependencies: 243
-- Name: eventCategories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."eventCategories_id_seq"', 11, true);


--
-- TOC entry 3475 (class 0 OID 0)
-- Dependencies: 241
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_id_seq', 9, true);


--
-- TOC entry 3476 (class 0 OID 0)
-- Dependencies: 235
-- Name: forgotRequest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."forgotRequest_id_seq"', 33, true);


--
-- TOC entry 3477 (class 0 OID 0)
-- Dependencies: 239
-- Name: partners_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.partners_id_seq', 6, true);


--
-- TOC entry 3478 (class 0 OID 0)
-- Dependencies: 223
-- Name: paymentMethod_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."paymentMethod_id_seq"', 6, true);


--
-- TOC entry 3479 (class 0 OID 0)
-- Dependencies: 231
-- Name: profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profile_id_seq', 34, true);


--
-- TOC entry 3480 (class 0 OID 0)
-- Dependencies: 219
-- Name: reservationSections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."reservationSections_id_seq"', 3, true);


--
-- TOC entry 3481 (class 0 OID 0)
-- Dependencies: 221
-- Name: reservationStatus_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."reservationStatus_id_seq"', 3, true);


--
-- TOC entry 3482 (class 0 OID 0)
-- Dependencies: 227
-- Name: reservationTicket_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."reservationTicket_id_seq"', 6, true);


--
-- TOC entry 3483 (class 0 OID 0)
-- Dependencies: 225
-- Name: reservations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reservations_id_seq', 6, true);


--
-- TOC entry 3484 (class 0 OID 0)
-- Dependencies: 215
-- Name: users0_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users0_id_seq', 37, true);


--
-- TOC entry 3485 (class 0 OID 0)
-- Dependencies: 229
-- Name: wishlist_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.wishlist_id_seq', 18, true);


--
-- TOC entry 3286 (class 2606 OID 32805)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 3280 (class 2606 OID 24744)
-- Name: changePassword changePassword_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."changePassword"
    ADD CONSTRAINT "changePassword_email_key" UNIQUE (email);


--
-- TOC entry 3282 (class 2606 OID 24742)
-- Name: changePassword changePassword_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."changePassword"
    ADD CONSTRAINT "changePassword_pkey" PRIMARY KEY (id);


--
-- TOC entry 3264 (class 2606 OID 24660)
-- Name: cities cities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_pkey PRIMARY KEY (id);


--
-- TOC entry 3292 (class 2606 OID 32830)
-- Name: eventCategories eventCategories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."eventCategories"
    ADD CONSTRAINT "eventCategories_pkey" PRIMARY KEY (id);


--
-- TOC entry 3290 (class 2606 OID 32823)
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- TOC entry 3284 (class 2606 OID 32798)
-- Name: forgotRequest forgotRequest_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."forgotRequest"
    ADD CONSTRAINT "forgotRequest_pkey" PRIMARY KEY (id);


--
-- TOC entry 3288 (class 2606 OID 32814)
-- Name: partners partners_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partners
    ADD CONSTRAINT partners_pkey PRIMARY KEY (id);


--
-- TOC entry 3270 (class 2606 OID 24690)
-- Name: paymentMethod paymentMethod_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."paymentMethod"
    ADD CONSTRAINT "paymentMethod_pkey" PRIMARY KEY (id);


--
-- TOC entry 3278 (class 2606 OID 24722)
-- Name: profile profile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_pkey PRIMARY KEY (id);


--
-- TOC entry 3266 (class 2606 OID 24676)
-- Name: reservationSections reservationSections_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."reservationSections"
    ADD CONSTRAINT "reservationSections_pkey" PRIMARY KEY (id);


--
-- TOC entry 3268 (class 2606 OID 24683)
-- Name: reservationStatus reservationStatus_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."reservationStatus"
    ADD CONSTRAINT "reservationStatus_pkey" PRIMARY KEY (id);


--
-- TOC entry 3274 (class 2606 OID 24704)
-- Name: reservationTicket reservationTicket_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."reservationTicket"
    ADD CONSTRAINT "reservationTicket_pkey" PRIMARY KEY (id);


--
-- TOC entry 3272 (class 2606 OID 24697)
-- Name: reservations reservations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_pkey PRIMARY KEY (id);


--
-- TOC entry 3260 (class 2606 OID 24619)
-- Name: users users0_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users0_email_key UNIQUE (email);


--
-- TOC entry 3262 (class 2606 OID 24617)
-- Name: users users0_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users0_pkey PRIMARY KEY (id);


--
-- TOC entry 3276 (class 2606 OID 24711)
-- Name: wishlist wishlist_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wishlist
    ADD CONSTRAINT wishlist_pkey PRIMARY KEY (id);


-- Completed on 2023-07-23 21:47:19

--
-- PostgreSQL database dump complete
--

