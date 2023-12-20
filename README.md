# Recipe App

## Install tools
* docker mac

## Running DB (postgresql)
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

## Set Up Prisma
```bash
npx prisma migrate reset
```

## Running dev
Install dependencies
```bash
npm install
```

Start dev mode
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.




## Env file
Create .env file in root directory

* You need get own Google client API and Cloudinary API.

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
