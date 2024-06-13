# Read this first👋

### Dummy username and password

`username:saurabh`
`password:saurabh`

## Searching & Pagination (NOT RECOMMENDED)

Given api does not provide option to search thru name, so for demo purpose,

- First i fetched 500 users from the api
- Then calculated total pages (500/ 10 = 50) - showing 10 results at a time
- According to that i built the pagination and searching thru that data

## Way to implement searching & pagination

- Pass the page number as param in api
- Pass the search value in api endpoint to get the desired results from database

## How to run

1. Clone the repo `git clone https://github.com/starc007/basic-loginAuth.git`
2. run `yarn` or `npm install`
3. run `yarn dev` or `npm run dev`
