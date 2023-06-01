# Delivery management system

<!-- ### [Demo](https://basic-express-authentication.herokuapp.com/) -->


## Getting Started
![Colorful Creative Browser Pop Up Client Testimonials Instagram Post (1280 × 769 px) (1)](https://github.com/maruffahmed/Delivery-management-system/assets/39343312/3e78e58d-d621-4c8a-ad9f-239c3cc36927)


This instruction will get you a copy of this project up and running on your local machine

### Prerequisites

You need [Node JS](https://nodejs.org) installed on your local machine.

### Installing ⚙️

Run the followning command to install all the packages:

```
npm run setup
```

#### Setup environment variable

Set the following environment variable to `backend` directory. Also, an example file is given with the name of `.env.example`:

```
DATABASE_URL = "file:./dev.db"
JWT_SECRET = 'ANYTHING_YOU_LIKE'
BCRYPT_SALT_OR_ROUNDS = "10"
```

Set the following environment variable to `frontend` directory. Also, an example file is given with the name of `.env.example`:

```
SESSION_SECRET = "dearMj"
API_BASE_URL = "http://localhost:5000"
```

### Database migration 💿

Run the followning command to migrate the prisma schema:

```
npm run prisma:migrate
```

You only have to run this for only one time at the beginning of project setup

#### Run 🏃🏻‍♂️

By this command your app and server will be run concurrently

```
npm start
```

An server will be run at http://localhost:5000 <br/>
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
