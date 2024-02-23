# Recipe App

This recipe app lets users publish and add recipes to their favourite list.

You can play around with the following test user or create a new account after you set up the local environment.

```
email: test@test.com
password: password
```

![screencapture-localhost-3000-2024-02-23-11_57_51](https://github.com/kanatagu/recipe-app/assets/66394413/6633928b-6a52-4c18-a9d3-5a7ae898f941)


## Features

- Authentication
- CRUD Recipe Post with image Upload and dynamic form
- Search recipe
- Filter recipe
- Add to favourite list
- Review

## Requirements

- Node v20.8.0 or above
- Docker

## Setup

### Env file

Create .env file in root directory

- You need get own Google client API and Cloudinary API.

```
DB_NAME=
DB_USER=
DB_PASS=

DATABASE_URL="[DB_NAME]://[DB_USER]:[DB_PASS]@localhost:5555/recipe-db?schema=public"

NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_PRESET=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### Start running PostgreSQL in docker

DB Container Start

```bash
docker compose up
or
docker compose up -d
```

DB Container Stop

```bash
docker compose down
```

### DB Migration

```bash
npx prisma migrate reset
```

### Install dependencies

```bash
npm install
```

## Running with dev mode

Start dev mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Upcoming Features

- Update Account
- Change More Recipes to more related recipes
