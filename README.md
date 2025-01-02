## Directus Exploration with Next.js
This project is an exploration of integrating Next.js with Directus, a headless CMS, to build dynamic and flexible web applications. The goal of this project is to explore how Directus can be used as a backend to manage content, while Next.js serves as the frontend framework to display and interact with that content.

## Features
- **Headless CMS Integration:** Connects to Directus to manage content dynamically.
- **Next.js as Frontend:** Uses Next.js for server-side rendering (SSR) and static site generation (SSG).
- **Directus API:** Fetches data from Directus API endpoints to display in the Next.js application.
- **Responsive Design:** Ensures the application works seamlessly across different screen sizes.

## Getting Started
### Prerequisites
Before you begin, ensure you have the following installed:

- Node.js (v16 or later)
- Yarn (or NPM)
- Docker

You also need access to a **Directus instance** (self-hosted or cloud version) with your content setup.

## Setup
1. Clone the repository:

```
git clone https://github.com/xlatios1/directus_exploration.git
cd directus_exploration
```

2. Install dependencies:
```
npm install

# Or, if you are using yarn:

yarn install
```

3. Set up environment variables:
Create a .env file at the root of the project with the following content:
```
DIRECTUS_URL=<DIRECTUS URL>

SECRET_KEY=<SECRET KEY>
DB_CLIENT=<CLIENT>
DB_DATABASE=<DB_DATABASE>
DB_USER=<DB_USER>
DB_PASSWORD=<DB_PASSWORD>
POSTGRES_USER=<POSTGRES_USER>
POSTGRES_PASSWORD=<POSTGRES_PASSWORD>
POSTGRES_DB=<POSTGRES_DB>
ADMIN_EMAIL=<ADMIN_EMAIL>
ADMIN_PASSWORD=<ADMIN_PASSWORD>

Replace all the <> parameters with your own fields
```

4. Spin up Docker:
Set up the project image by running:
```
docker compose up --build -d
```

## Running the Development Server
To start the development server, run:
```
npm run dev

# Or with yarn:

yarn dev
```
Visit http://localhost:3000 in your browser to see the project in action.

## API Calls
The project fetches data from the Directus API using the @directus/sdk package. The data is retrieved using the API client initialized with the URL of the Directus instance.

Example API call (in `lib/directus.js`):

```
import { Directus } from '@directus/sdk';

const directus = new Directus(process.env.NEXT_PUBLIC_DIRECTUS_URL);

export const getContent = async (collection) => {
  try {
    const data = await directus.items(collection).readMany();
    return data;
  } catch (error) {
    console.error('Error fetching content:', error);
    return [];
  }
};
```
You can replace collection with the name of the collection you want to query from Directus.

## To Open an API Specs json to save down
`- <your url>/server/specs/oas` and save json

import into collection in postman.

## Contributed by:
- `Woon Yi Jun`