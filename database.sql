
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR (255) NOT NULL,
    "last_name" VARCHAR (255) NOT NULL,
    "email" VARCHAR (255) NOT NULL,
    "password" VARCHAR (255) NOT NULL,
    "disabled" BOOLEAN DEFAULT 'false'
);

CREATE TABLE "jobs" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "users" ON DELETE CASCADE,
    "position" VARCHAR (255),
    "company_name" VARCHAR (255) NOT NULL,
    "notes" VARCHAR (500),
    "posting_url" VARCHAR (500),
    "deadline" DATE,
    "compensation" VARCHAR (255),
    "benefits" VARCHAR (500),
    "travel" VARCHAR (500),
    "closed" BOOLEAN DEFAULT 'false'
);

CREATE TABLE "contacts" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "users" ON DELETE CASCADE,
    "first_name" VARCHAR (255),
    "last_name" VARCHAR (255),
    "company" VARCHAR (255),
    "position" VARCHAR (255),
    "email" VARCHAR (255),
    "linkedin_url" VARCHAR (200),
    "cell" VARCHAR (30),
    "phone" VARCHAR (30),
    "notes" VARCHAR (255),
    "disabled" BOOLEAN DEFAULT 'false'
);

CREATE TABLE "stages" (
    "id" SERIAL PRIMARY KEY,
    "job_id" INTEGER REFERENCES "jobs" ON DELETE CASCADE,
    "stage" VARCHAR (255) NOT NULL,
    "note" VARCHAR (500),
    "date" DATE
);


CREATE TABLE "requirements" (
    "id" SERIAL PRIMARY KEY,
    "requirement" VARCHAR (255) NOT NULL,
    "user_id" INTEGER REFERENCES "users" ON DELETE CASCADE,
    "disabled" BOOLEAN DEFAULT 'false'
);

CREATE TABLE "jobs_requirements" (
    "id" SERIAL PRIMARY KEY,
    "job_id" INTEGER REFERENCES "jobs" ON DELETE CASCADE,
    "requirement_id" INTEGER REFERENCES "requirements" ON DELETE CASCADE,
    "requirement_offer" VARCHAR (255),
    "requirement_met" BOOLEAN
);

CREATE TABLE "tasks" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "users" ON DELETE CASCADE,
    "task_name" VARCHAR (255) NOT NULL,
    "due_date" DATE,
    "complete" BOOLEAN DEFAULT 'false' NOT NULL,
    "contact_id" INTEGER REFERENCES "contacts" ON DELETE CASCADE,
    "job_id" INTEGER REFERENCES "jobs" ON DELETE CASCADE,
    "note" VARCHAR (255),
    "disabled" BOOLEAN DEFAULT 'false'
);

CREATE TABLE "interview_stages" (
    "id" SERIAL PRIMARY KEY,
    "stage" VARCHAR (100) NOT NULL
);

INSERT INTO "interview_stages" ("stage") 
VALUES 
('Job Identified'), ('Applied'), ('Phone Screening'), ('Informational Interview'), ('Networking Meeting'), 
('Testing'), ('Video Conference'), ('Presentation'), ('Hiring Manager Interview'), ('Hiring MGR - Phone Screen'), 
('Director Interview'), ('Director - Phone Screen'), ('VP Interview'), ('VP - Phone Screen'), ('Await Decision'), 
('Peer Interview'), ('C-Level interview'),('Accepted Offer'),('Closed');

