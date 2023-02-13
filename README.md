# ⏳ Time Tracking API ⌛️

A project to track work on projects for clients.

## 📦 Getting started

### Requirements Overview

The following are required to run this project:

- Node & NPM installed, package dependencies installed `npm i`.
- MySQL database set up and running.

### Setting Up The Database

Create a mysql database for this project. We're using "tt" as an identifier here often, shortform for "time tracking". Set the database user password `your_password` to your own appropriate password.
```
mysql> CREATE DATABASE tt;
mysql> CREATE USER 'tt' IDENTIFIED BY 'your_password';
mysql> GRANT SELECT, REFERENCES, INSERT, UPDATE, DELETE, ALTER, CREATE, DROP ON tt.* TO 'tt';
mysql> FLUSH PRIVILEGES;
```

Run `cp .env.defaults .env` to set up your configuration. Update `.env` with the database username and password you set up.

Populate the database using knex, which should add tables automatically.
```bash
$ npx knex --knexfile src/knexfile.ts migrate:latest
```

This should populate your database with the required tables.

## 🎬 Running
From the root directory, initiate the project with `make start-dev` (make sure the deps are installed).

The API server can be browsed at http://localhost:8901/.
