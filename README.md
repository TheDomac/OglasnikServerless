## Adding new user
- Add new object in users array in `src/consts/users.js`

## Enabling/Disabling Lambda function
- Uncomment/Comment `- schedule: rate(5 minutes)` in `serverless.yml` (Line ~53)
- Run in terminal: `serverless deploy`

## Config
You can control if:
  - Does the new user get all ads in the first check for new ads.
  - Does the user who is checking from a new URL get all ads in the first check for new ads
