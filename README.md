# Fullstack Blog Project

Welcome to our Fullstack Blog Project! This application is a collaborative effort where we developed both the backend and frontend components. The project showcases a blog platform, built with the flexibility to cover various topics like travel, sports, photography, Dungeon & Dragons, or Warhammer. We used React for the frontend and a Node.js RESTful API for the backend.

## Table of Contents
- [Duration](#duration)
- [Presentation](#presentation)
- [Project Overview](#project-overview)
  - [Group Project](#group-project)
  - [GitHub Repositories](#github-repositories)
  - [Setup](#setup)
    - [Database](#database)
    - [Frontend](#frontend)
    - [Backend](#backend)
- [Features](#features)
  - [Homepage](#homepage)
  - [Create Post Page](#create-post-page)
  - [Post Details Page](#post-details-page)
- [Backend API](#backend-api)
  - [GET /posts](#get-posts)
  - [GET /posts/:id](#get-postsid)
  - [POST /posts](#post-posts)
  - [PUT /posts/:id](#put-postsid)
  - [DELETE /posts/:id](#delete-postsid)
- [Planning and Development Tips](#planning-and-development-tips)
- [Conclusion](#conclusion)
- [Project Resources](#project-resources)

## Duration
- **Full Time**: 5 days
- **Part Time**: 10 days

## Presentation
- **TBD by Instructor** | **Mandatory**

## Project Overview

### Group Project
This project is a collaborative effort by:
- **ArthurLiebe - Arthur**
- **adnanabdalrahman - Adnan**
- **SebOltCode - Sebastian**

We followed group work guidelines throughout the development process to ensure smooth collaboration and efficient workflow.

### GitHub Repositories
- We maintained separate repositories for the frontend and backend components.
- All updates to the main branch were managed via Pull Requests (PRs).

### Setup

#### Database
- We set up a PostgreSQL database locally.
- Our `posts` table includes the following fields:
  - `id`: Primary key, auto-incrementing integer.
  - `author`
  - `title`: Text field for the post title, cannot be NULL.
  - `content`: Text field for the post content, cannot be NULL.
  - `cover`: Text field for the image cover, cannot be NULL.
  - `date`: Date field, defaults to the creation time.

#### Frontend
- The frontend is built with a React application using Vite.
- We used React Router for seamless navigation between pages.
- The application includes the following pages:
  - **Homepage**: Displays a list of available posts.
  - **Create Post Page**: Contains a form to create a new post.
  - **Post Details Page**: Displays a single post’s information by ID with buttons to delete or update the post.

#### Backend
- The backend is powered by a Node.js server using the built-in `http` module.
- We used the `pg` package to connect to our PostgreSQL database.
- The following endpoints were created for the posts resource:
  - `GET /posts`: Retrieve all posts.
  - `GET /posts/:id`: Retrieve a single post by ID.
  - `POST /posts`: Create a new post.
  - `PUT /posts/:id`: Update an existing post by ID.
  - `DELETE /posts/:id`: Delete a post by ID.

## Features

### Homepage
- Displays a list of all blog posts.
- Each post shows a title, image, and a snippet of the content.
- Posts are clickable and lead to the Post Details Page.

### Create Post Page
- Includes a form with fields for the title and content of the post.
- Features a submit button to create a new post.
- Form validation ensures both fields are filled in before submission.

### Post Details Page
- Displays the full title and content of the post.
- Includes buttons to delete and update the post.
  - The delete button removes the post from the database.
  - The update button leads to a form to update the post’s title and content.

## Backend API

### GET /posts
- **Description**: Retrieve all posts.
- **Response**: A JSON array of all posts.

### GET /posts/:id
- **Description**: Retrieve a single post by ID.
- **Response**: A JSON object of the post.

### POST /posts
- **Description**: Create a new post.
- **Request Body**: JSON object with post fields.
- **Response**: The newly created post as a JSON object.

### PUT /posts/:id
- **Description**: Update an existing post by ID.
- **Request Body**: JSON object with post fields.
- **Response**: The updated post as a JSON object.

### DELETE /posts/:id
- **Description**: Delete a post by ID.
- **Response**: A success message or the deleted post as a JSON object.

## Planning and Development Tips
- Prioritized functionality over aesthetics.
- Focused on mocking the response format from the backend to accelerate frontend development.
- Conducted daily stand-ups to keep track of progress and address any blockers.
- Maintained organization and used tools like Trello for task management.
- Sought help whenever stuck for more than 30 minutes to ensure continuous progress.

## Conclusion
This project provided us with hands-on experience in building a fullstack application using React for the frontend and Node.js with PostgreSQL for the backend. We hope you enjoy exploring our blog platform as much as we enjoyed building it! ❤️

## Project Resources
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [The HTTP module](https://nodejs.org/api/http.html)
- [Connecting to a Database](https://node-postgres.com/)
- [pg Package Documentation](https://node-postgres.com/)

---

Collaborators:
- **ArthurLiebe - Arthur**
- **adnanabdalrahman - Adnan**
- **SebOltCode - Sebastian**
