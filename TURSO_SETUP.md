# Turso Database Setup Guide

This project uses Turso (LibSQL) for storing user reviews. Follow these steps to set up your Turso database.

## Prerequisites

- Node.js installed
- A Turso account (free at [turso.tech](https://turso.tech))

## Step 1: Install Turso CLI

```bash
# macOS/Linux
curl -sSfL https://get.tur.so/install.sh | bash

# Windows (PowerShell)
irm get.tur.so/install.ps1 | iex
```

Or install via npm:
```bash
npm install -g @libsql/client
```

## Step 2: Sign Up/Login to Turso

```bash
turso auth signup
# or
turso auth login
```

## Step 3: Create a Database

```bash
turso db create astrogon-reviews
```

## Step 4: Get Your Database URL

```bash
turso db show astrogon-reviews --url
```

Copy the URL (it will look like: `libsql://astrogon-reviews-yourname.turso.io`)

## Step 5: Create an Auth Token

```bash
turso db tokens create astrogon-reviews
```

Copy the token that is generated.

## Step 6: Set Up Environment Variables

### For Local Development

Create a `.env` file in the root of your project:

```env
TURSO_DATABASE_URL=libsql://astrogon-reviews-yourname.turso.io
TURSO_AUTH_TOKEN=your-auth-token-here
```

### For Production (Sevalla/Other Hosting)

Add these environment variables in your hosting platform's settings:

- `TURSO_DATABASE_URL`: Your database URL from Step 4
- `TURSO_AUTH_TOKEN`: Your auth token from Step 5

## Step 7: Initialize the Database

Run the initialization script to create the reviews table:

```bash
pnpm tsx src/scripts/init-db.ts
```

You should see: `✅ Database tables created successfully!`

## Step 8: Test the Setup

Start your development server:

```bash
pnpm dev
```

Navigate to `/reviews` and try submitting a review!

## Database Schema

The `reviews` table has the following structure:

| Column      | Type    | Description                    |
|-------------|---------|--------------------------------|
| id          | INTEGER | Primary key (auto-increment)   |
| name        | TEXT    | Reviewer's name                |
| review      | TEXT    | Review content                 |
| timestamp   | TEXT    | Formatted date/time string     |
| created_at  | INTEGER | Unix timestamp (milliseconds)  |

## Turso CLI Commands

### View all databases
```bash
turso db list
```

### View database shell
```bash
turso db shell astrogon-reviews
```

### Query reviews (in shell)
```sql
SELECT * FROM reviews ORDER BY created_at DESC;
```

### Delete the database (if needed)
```bash
turso db destroy astrogon-reviews
```

## Troubleshooting

### Error: "TURSO_DATABASE_URL environment variable is not set"

Make sure your `.env` file is in the project root and contains the correct variables.

### Error: "Failed to initialize database"

1. Check that your auth token is valid
2. Verify the database URL is correct
3. Ensure you have internet connection

### Reviews not showing up

1. Check browser console for errors
2. Verify environment variables are set correctly
3. Try running the init-db script again

## Free Tier Limits

Turso's free tier includes:
- 500 databases
- 1 billion row reads per month
- 9 GB total storage
- Multiple locations available

Perfect for personal projects and small applications!

## Additional Resources

- [Turso Documentation](https://docs.turso.tech)
- [LibSQL Client Documentation](https://github.com/libsql/libsql-client-ts)
- [Turso Dashboard](https://turso.tech/app)
