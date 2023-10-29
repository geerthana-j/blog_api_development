# Blog Post API using Node.js, Express, and MongoDB

A RESTful API for managing blog posts with MongoDB as the database, implemented in Node.js using the Express framework, and written in TypeScript for type safety. This API provides CRUD operations and allows you to retrieve the latest blog post from each unique category.

**Hosted App:** [blogapis.onrender.com](https://blogapis.onrender.com)

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
- [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [Validation](#validation)
  - [Error Handling](#error-handling)

## Features

- **CRUD Operations**: Create, Read, Update, and Delete blog posts.
- **Latest Posts by Category**: Retrieve the latest blog post from each unique category.
- **TypeScript**: Ensures type safety in the Node.js application.
- **Validation**: Implements validation for request parameters and request body.
- **Error Handling**: Provides proper error handling for database operations and invalid requests.
- **Security**: Protects against common security threats, including SQL Injection.
- **Authentication**: Implements basic authentication or API key validation for securing endpoints, especially `/api/posts/latest`.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed.
- MongoDB installed and running.
- A code editor of your choice.
- Postman or a similar tool for API testing.

## Getting Started

### Installation

1. Clone this repository:
git clone https://github.com/geerthana-j/blog_api_development.git
cd blog_api_development

2. Install dependencies:
npm install

3. Start the application:
npm start

## Usage

### API Endpoints

- **GET /api/posts**: Retrieve a list of all blog posts.
- **GET /api/posts/:id**: Retrieve a specific blog post by its ID. Includes the category of the blog post in the response.
- **POST /api/posts**: Create a new blog post. The request body should contain title, content, and category_id.
- **PUT /api/posts/:id**: Update an existing blog post by its ID. The request body should contain title and content.
- **DELETE /api/posts/:id**: Delete a blog post by its ID.
- **GET /api/posts/latest**: Retrieve the latest blog post from each unique category. Each response object includes id, title, content, created_at, updated_at, and category.

### Authentication

To access the API, you must include an `x-api-key` header with the value `napqueen` in your API requests.

### Validation

The API enforces validation for request parameters and request body, returning appropriate error responses for invalid requests.

### Error Handling

The API provides proper error handling for database operations and invalid requests. It returns detailed error messages with relevant HTTP status codes.






