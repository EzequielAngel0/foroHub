-- Connect as root or a user with privileges to create databases
-- Usage: mysql -u root -p < setup.sql

CREATE DATABASE IF NOT EXISTS forohub_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'forohub_user'@'localhost' IDENTIFIED BY '<tu_password_mysql>';

GRANT ALL PRIVILEGES ON forohub_db.* TO 'forohub_user'@'localhost';

FLUSH PRIVILEGES;

USE forohub_db;

-- Initial tables will be managed by Flyway migrations in Spring Boot, 
-- but this script ensures the DB and user exist.
