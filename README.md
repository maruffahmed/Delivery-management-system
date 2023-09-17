# Delivery Management System

<!-- ### [Demo](https://basic-express-authentication.herokuapp.com/) -->

## Getting Started

This instruction will get you a copy of this project up and running on your local machine

### Prerequisites

You need [Node JS](https://nodejs.org) (v18.x.x) installed on your local machine.

### Installing ⚙️

Run the followning command to install all the packages:

```sh
npm run setup
```

#### Setup Environment Variable

Set the following environment variable to `backend` directory. Also, an example file is given with the name of `.env.example`:

```
DATABASE_URL = "mysql://root:password@localhost:3306/delivery"
JWT_SECRET = 'ANYTHING_YOU_LIKE'
BCRYPT_SALT_OR_ROUNDS = "10"
```

Set the following environment variable to `frontend` directory. Also, an example file is given with the name of `.env.example`:

```
SESSION_SECRET = "dearMj"
API_BASE_URL = "http://localhost:8000"
```

### Database Migration 💿

Run the followning command to migrate the prisma schema:

```sh
npm run prisma:migrate
```

You only have to run this for only one time at the beginning of project setup

#### Seed Database 🌱

Run the following command to seed your database with some preset dataset. It includes delivery area info (Division, Districs, Areas), Delivery zones, Parcel pricing (for 0.5KG, 1KG, 2KG, 3KG, 4KG, 5KG), Parcel products categories, Shop products categories, a default user and admin, etc.

```sh
cd backend
npm run seed
```

#### Run 🏃🏻‍♂️

By this command your app and server will be run concurrently

```sh
npm start
```

An server will be run at http://localhost:8000 <br/>
And frontend server will be run at http://localhost:3000

## Built With 🏗️👷🏻

-   [NodeJs](https://nodejs.org/en/) - Node.js® is an open-source, cross-platform JavaScript runtime environment.
-   [NestJs](https://nestjs.com/) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
-   [Prisma](https://nestjs.com/) - Next-generation Node.js and TypeScript ORM
-   [Remix](https://remix.run/) - Remix is a full stack web framework
-   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework packed with classes

## Credit

## Authors

-   **Md Maruf Ahmed** - _Software Engineer_
