# PlateMate — A Full-Stack Recipe Sharing Platform

CSC317 — Fall 2025 | Group Web Application Project

## Overview

RecipeHub is a full-stack recipe sharing application built as part of the CSC317 course.
The platform allows users to create, view, edit, and delete recipes while also managing their profiles through secure session-based authentication.

The project emphasizes full-stack development, RESTful design, responsive UI, and collaborative software engineering practices.

## Features
### User System

Forked user registration and login (session-based authentication)

Profile page with uploaded profile picture

View personal recipes and manage them from the profile page

## Core Recipe Features

### Create recipes with:

Title

Description

Automatically numbered step-by-step instructions

Dynamic ingredient fields (name, unit, quantity)

View individual recipe pages

View all recipes in a browsable feed

Edit or delete user-owned recipes

## Frontend & UI/UX

Fully responsive HTML/CSS layout

Interactive dynamic forms using JavaScript

Consistent color scheme, spacing, and typography

Clean page structure for readability and usability

## Backend & Database

Express.js RESTful routes for recipe CRUD operations

PostgreSQL database with users, recipes, and ingredients tables

Secure data validation on both client and server


## Deployment

Backend and PostgreSQL hosted on Render.com

Application prepared for production deployment

## Tech Stack
### Frontend

HTML5

CSS3

JavaScript (Vanilla)

EJS Templating

### Backend

Node.js + Express.js

Session-based authentication

Bcrypt for password hashing

### Database

PostgreSQL

pg-promise for database interaction

## Tools & Workflow

GitHub (Version Control, Pull Requests)

Postman (API Testing)

Zoom / Discord / WhatsApp (Team Collaboration)

## Directory Structure
```
├── app.js
├── package.json
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── routes/
│   └── api/
├── views/
├── middlewares/
├── models/
├── config/
├── scripts/
└── README.md
└── CONTRIBUTION.md
```

## Team Contribution Breakdown
### Syed Shah

Designed UI components

Created front-end layout for profile pages

Designed styling consistency across the platform

### Graciela Ramirez

Implemented backend routing, controllers, and database logic

Designed PostgreSQL schemas and connected queries to EJS views

Contributed to documentation and testing, and troubleshooting via Postman

Ensured API reliability and data flow accuracy

### Shreya

Built the Edit Recipe page layout 

Refined CSS for spacing, alignment, and visual consistency

Cleaned project structure and resolved UI merge conflicts

## Testing Process
Functional Testing

Verified all routes (GET/POST/PUT/DELETE) using Postman

Tested form validation on both client and server sides

Browser Testing

Checked UI responsiveness on multiple screen sizes

Database Testing

Confirmed recipe creation, updating, and deletion in PostgreSQL

Validated schema relationships between users, recipes, and ingredients

Performed review before merging pull requests

## Challenges & Solutions
1. Dynamic Form Handling

Challenge: Adding variable numbers of ingredients and steps
Solution: Implemented JavaScript functions that:

Add and remove ingredient rows

Automatically number steps

Validate input before submission

2. Merge Conflicts in EJS Templates

Challenge: Team members frequently edited shared pages
Solution:

Established page ownership during sprints

Increased commit frequency

Required reviews before merging

3. Database Connectivity Issues

Challenge: Environment variables differed across team machines
Solution:

Standardized .env structure

Documented required database configuration

Synced team settings through shared setup instructions

## Deployment

The application is deployed using:

Render.com (Backend Hosting)

Render PostgreSQL (Database)

Deployment includes environment variable configuration, production build settings, and persistent database storage.

## Final Notes

PlateMate reflects the full-stack skills we developed throughout CSC317, demonstrating proficiency in:

Web development

Database design

UI/UX implementation

Team collaboration

Version control and deployment practices

This project showcases our practical experience in building real-world web applications from the ground up.
