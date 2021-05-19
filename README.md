# Demo React app for SharpSports Integration

## Getting started

### Installation `npm install`

This will install all necessary node dependencies. You need to have node and npm installed on your machine.

### Variables

Set the following variables in public/index.html

- token: set this to your sandbox API key
- internalId: set this to a test internal id value

You can also change the styling of the button using the other parameters in SharpSports button script tag in the index.html file.

### Button Implementation

You can see the implementation of the button in src/components/home.js

### Run `npm start`

You can now view the demo at http://localhost:3000

### Adding different Bettors and BettorAccounts

- Every time you change the "internalId" value in the button code in index.html this will indicate to the SharpSports API that a different end user (Bettor)
is interacting with the button.
- Once a new BettorAccount is linked by clicking the "Link SportsBook" button and entering valid test user credentials (http://docs.sharpsports.io/#sandbox-and-test-users) a BettorAccount and Bettor object is created in our database.
- You can then interact with the Bettors/BettorAccounts as well as randomly generated test Bets using the endpoints found at http://docs.sharpsports.io/#core-resources.
