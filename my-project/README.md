# Library API

Small NestJS and MongoDB backend for a library application. Users can browse books, authors, and categories, authenticate with JWT, and create reviews for books.

## Project Setup

Run these commands from the `my-project` directory:

```bash
npm install
npm run start:dev
```

The API runs at:

```text
http://localhost:3000
```

MongoDB connection:

```text
mongodb://127.0.0.1:27017/library
```

MongoDB must be running before starting the application.

## Frontend Integration

The frontend does not need access to NestJS controller files. It communicates with this backend through HTTP requests.

For local development, use this API base URL:

```text
http://localhost:3000
```

The frontend should store the JWT returned by login and send it on protected requests:

```text
Authorization: Bearer <accessToken>
```

IDs in the examples below are placeholders. Use the real MongoDB `_id` values returned by the API.

## Authentication

### Register

```http
POST /authentication/register
```

No token required.

Request body:

```json
{
  "name": "Ivana Petrovic",
  "email": "ivana@example.com",
  "password": "tajna-lozinka"
}
```

Response:

```json
{
  "id": "USER_ID",
  "name": "Ivana Petrovic",
  "email": "ivana@example.com"
}
```

The password hash is never returned.

### Login

```http
POST /authentication/login
```

No token required.

Request body:

```json
{
  "email": "ivana@example.com",
  "password": "tajna-lozinka"
}
```

Response:

```json
{
  "accessToken": "JWT_TOKEN"
}
```

### Current user

```http
GET /authentication/me
```

JWT required.

Response:

```json
{
  "userId": "USER_ID",
  "email": "ivana@example.com",
  "name": "Ivana Petrovic"
}
```

## Books

Books are currently read-only through the API. They are added directly to MongoDB or through seed data.

### List books

```http
GET /books
```

No token required.

Optional query parameters:

- `search`: case-insensitive search in the book title
- `authorId`: filter by author
- `categoryId`: filter by category

Examples:

```text
GET /books?search=dark
GET /books?authorId=AUTHOR_ID
GET /books?categoryId=CATEGORY_ID
GET /books?search=dark&authorId=AUTHOR_ID&categoryId=CATEGORY_ID
```

Response:

```json
[
  {
    "_id": "BOOK_ID",
    "title": "1984",
    "description": "A dystopian novel.",
    "publishedYear": 1949,
    "authorId": "AUTHOR_ID",
    "categoryId": "CATEGORY_ID"
  }
]
```

### Get one book

```http
GET /books/:id
```

No token required.

Example:

```text
GET /books/BOOK_ID
```

## Authors

Authors are currently read-only through the API.

### List authors

```http
GET /authors
```

No token required.

### Get one author

```http
GET /authors/:id
```

No token required.

Author response fields:

```json
{
  "_id": "AUTHOR_ID",
  "firstName": "George",
  "lastName": "Orwell",
  "birthYear": 1903,
  "biography": "English novelist and essayist."
}
```

The frontend can use the author ID to request books by that author:

```text
GET /books?authorId=AUTHOR_ID
```

## Categories

Categories are currently read-only through the API.

### List categories

```http
GET /categories
```

No token required.

### Get one category

```http
GET /categories/:id
```

No token required.

Category response fields:

```json
{
  "_id": "CATEGORY_ID",
  "name": "Science Fiction",
  "description": "Books about imagined science and future societies."
}
```

The frontend can use the category ID to filter books:

```text
GET /books?categoryId=CATEGORY_ID
```

## Reviews

Reviews belong to a user and a book. The `userId` is taken from the JWT token when a review is created; the frontend must not send it in the request body.

### List reviews for a book

```http
GET /reviews/book/:bookId
```

No token required.

Response:

```json
[
  {
    "_id": "REVIEW_ID",
    "userId": "USER_ID",
    "bookId": "BOOK_ID",
    "rating": 5,
    "comment": "Excellent book."
  }
]
```

### List reviews for the current user

```http
GET /reviews/me
```

JWT required.

### List reviews for any user

```http
GET /reviews/user/:userId
```

No token required.

### Create a review

```http
POST /reviews/book/:bookId
```

JWT required.

Request body:

```json
{
  "rating": 5,
  "comment": "Excellent book."
}
```

`rating` must be between 1 and 5.

### Update a review

```http
PATCH /reviews/:id
```

JWT required. The token must belong to the user who created the review.

Request body can contain one or both fields:

```json
{
  "rating": 4,
  "comment": "Still a very good book."
}
```

### Delete a review

```http
DELETE /reviews/:id
```

JWT required. The token must belong to the user who created the review.

## Users

The user creation flow is handled by Authentication. The current Users controller exposes these endpoints:

```http
GET /users
GET /users/:id
PATCH /users/:id
DELETE /users/:id
```

These endpoints currently do not have JWT guards. They are kept for learning purposes and should be protected before production use.

## Suggested Frontend Pages

The current API supports this small frontend:

- `/login`: login and store the access token
- `/register`: create an account
- `/books`: list, search, and filter books
- `/books/:id`: show book details and its reviews
- `/authors/:id`: show author details and that author's books
- `/profile`: call `/authentication/me` and `/reviews/me`

Typical frontend flow:

```text
Register -> Login -> Books -> Book details -> Read reviews -> Add or manage own review
```

## Useful Commands

```bash
npm run start:dev
npm run build
npm run lint
npm run test
npm run test:e2e
```
