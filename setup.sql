CREATE DATABASE insulindb WITH TEMPLATE TEMPLATE(0);
CREATE ROLE dbmanager NOLOGIN;

CREATE TABLE patients(id SERIAL PRIMARY KEY,name TEXT,uhid TEXT,dob TIMESTAMP(0),bednum TEXT,profile JSONB,modifieddt TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP); 
CREATE TABLE users(id SERIAL PRIMARY KEY,name TEXT,role TEXT,info JSONB,modifieddt TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE forms(id BIGSERIAL PRIMARY KEY,type TEXT,dt TIMESTAMP(0),savedBy JSONB,patientId INT,data JSONB,modifieddt TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE protocols(id SERIAL PRIMARY KEY,type TEXT,data JSONB,savedBy JSONB,modifieddt TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public to dbmanager; GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public to dbmanager;