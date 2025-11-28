This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Tech Stack

-   [Sanity CMS](https://sanity.io) to store the post data
-   [Next Auth](https://next-auth.js.org/) for authenticating PGS users

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

The project is deployed on [Vercel](https://vercel.com/)

## How to:

### Add a user to admin list

-   Add the user to [Sanity](https://www.sanity.io/organizations/o2g1yjbTn/project/y0gl8d29/members)
-   Add the email to the `AdminList` sheet on [Google Sheets](https://docs.google.com/spreadsheets/d/1h12U2HPSTgJb7eOirtYD2LX-8-XT1gdzIrksLvEUIWI) to see the edit button

### Add an external (Non-PGS) email to the whitelist

-   Add the email to the `EmailWhitelist` sheet on [Google Sheets](https://docs.google.com/spreadsheets/d/1h12U2HPSTgJb7eOirtYD2LX-8-XT1gdzIrksLvEUIWI)
