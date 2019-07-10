
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

INSERT INTO "users" ("first_name", "last_name", "email", "password") 
VALUES 
('Anna', 'Employee', 'anna.employee@gmail.com', '0000');

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

INSERT INTO "jobs" ("user_id", "position", "company_name", "notes", "posting_url", "deadline", "compensation", "benefits", "travel", "closed")
VALUES 
('1', 'Sales Manager', 'Target', 'Karen used to work in sales at Target', 
'www.target.com/salesjob/andgibberishtolookofficial', '07/12/2019', '85K', 'health/dental', 'Atlanta Conference every Sept', 'false'), 
('1', 'Sales Lead', 'Best Buy', 'I am over qualified for this job so I need to negotiate the salary', 
'www.bestbuy.com/saleslead/andgibberishtolookofficial', '07/18/2019', '62K and annual bonus', 'health/dental', 'none', 'false');

CREATE TABLE "contacts" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "users" ON DELETE CASCADE,
    "first_name" VARCHAR (255) NOT NULL,
    "last_name" VARCHAR (255) NOT NULL,
    "company" VARCHAR (255) NOT NULL,
    "position" VARCHAR (255),
    "email" VARCHAR (255),
    "linkedin_url" VARCHAR (200),
    "cell" VARCHAR (30),
    "phone" VARCHAR (30),
    "notes" VARCHAR (255),
    "disabled" BOOLEAN DEFAULT 'false'
);

INSERT INTO "contacts" ("user_id", "first_name", "last_name", "company", "position", "email", "linkedin_url", 
"cell", "phone", "notes", "disabled")
VALUES 
('1', 'Karen', 'Wickleberg', 'Orbit', 'Sales Lead', 'Karen.Wickleberg@gmail.com', 
'www.linkedin.com/in/Karen-wickleberg/', '952-555-0555', '612-555-0555', 'Karen worked at Target', 'false');

CREATE TABLE "stages" (
    "id" SERIAL PRIMARY KEY,
    "job_id" INTEGER REFERENCES "jobs" ON DELETE CASCADE,
    "stage" VARCHAR (255) NOT NULL,
    "note" VARCHAR (500),
    "date" DATE
);

INSERT INTO "stages" ("job_id", "stage", "note", "date")
VALUES 
('1', 'Hiring Manager Interview', 'Talk to Karen for advice', '7/13/2019'),
('2', 'Phone Screening', 'Review the position information on their website', '7/13/2019');

CREATE TABLE "requirements" (
    "id" SERIAL PRIMARY KEY,
    "requirement" VARCHAR (255) NOT NULL,
    "user_id" INTEGER REFERENCES "users" ON DELETE CASCADE,
    "disabled" BOOLEAN DEFAULT 'false'
);

INSERT INTO "requirements" ("requirement", "user_id", "disabled")
VALUES 
('70k salary', '1', 'false');

CREATE TABLE "jobs_requirements" (
    "id" SERIAL PRIMARY KEY,
    "job_id" INTEGER REFERENCES "jobs" ON DELETE CASCADE,
    "requirement_id" INTEGER REFERENCES "requirements" ON DELETE CASCADE,
    "requirement_offer" VARCHAR (255),
    "requirement_met" BOOLEAN
);

INSERT INTO "jobs_requirements"
    ("job_id", "requirement_id", "requirement_offer", "requirement_met")
VALUES
    ('1', '1', '68k salary', 'false');

CREATE TABLE "tasks" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "users" ON DELETE CASCADE,
    "task_name" VARCHAR (255) NOT NULL,
    "due_date" DATE,
    "complete" BOOLEAN DEFAULT 'false',
    "contact_id" INTEGER REFERENCES "contacts" ON DELETE CASCADE,
    "job_id" INTEGER REFERENCES "jobs" ON DELETE CASCADE,
    "note" VARCHAR (255),
    "disabled" BOOLEAN DEFAULT 'false'
);

INSERT INTO "tasks" ("user_id", "task_name", "due_date", "complete", "contact_id", "job_id", "disabled")
VALUES 
('1', 'Call Karen', '7/10/2019', 'false', '1', '1', 'false');

CREATE TABLE "interview_stages" (
    "id" SERIAL PRIMARY KEY,
    "stage" VARCHAR (100) NOT NULL
);

INSERT INTO "interview_stages" ("stage") 
VALUES 
('Job Identified'), ('Applied'), ('Phone Screening'), ('Informational Interview'), ('Networking Meeting'), 
('Testing'), ('Video Conference'), ('Presentation'), ('Hiring Manager Interview'), ('Hiring MGR - Phone Screen'), 
('Director Interview'), ('Director - Phone Screen'), ('VP Interview'), ('VP - Phone Screen'), ('Await Decision'), 
('Peer Interview'), ('C-Level interview');

