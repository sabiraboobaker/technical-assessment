# MTCT

## Introduction
This Project contains a simple api solution for demonstrating backend api for a financial company. This project demonstract 
- A simple investor on-boarding process andThis platform consist of 4 user types. 
- Depositing amount to trade account

An investor can create an account in this platform for trading the crypto currencies. The investor can decide under which branch he needs to create the account. The Head quartors will assign the financial advisor to the investor for further trande support. The branch will verifies the investor KYC which completes the investors on-boarding process

The platform provides an API for the investor to Deposit fund to Trade Account.

## Prerequisite
1. Make sure you have MongoDB and NodeJS installed in you Machine
2. Open Terminal in `Section3` folder.
3. Install project dependencies using below command
    ```bash
    npm install
    ```
4. Next you need to Initilize the database. For that run below command. this command will test create user accounts for Head Quators, 2 Branches and 2 Financial Advisors.
    ```bash
    npx nodemon initializeDB.ts
    ```

## Run Application
1. Open Terminal in `Section3` folder.
2. Run below command to start the API Service
    ```bash
        npx nodemon app.ts
    ```

## API Documentation
### Register API
Investors can Register in the platform using this api

URL : localhost:3000/api/investor/register 
<br>
Method : Post
<br>
Body : {
    "name":"alice", 
    "email":"alice@xyz", 
    "branch":"MTCT002", 
    "userId":"MTCT006", 
    "password":"test123"
}

### Login API
The platform consist of 2 login APIs. One for investors Portal and other API for HQ, Branch and Advisors

Investor Login URL : localhost:3000/api/investor/register 
HQ/Branch/Advisors URL : localhost:3000/api/staff/register 
<br>
Method : Post
<br>
Body : {
    "userId":"MTCT006", 
    "password":"test123"
}

### Assign Financial Advisor
Once Investor registers to the platform, HQ can assign a Financial Advisor to the investor. This Api requires authentication with JWT token created for HQ user
URL : localhost:3000/api/hq/assign-advisor
<br>
Method : Post
<br>
Body : {
    "investorId": "MTCT006",
    "advisorId": "MTCT004"
}


### Verify KYC
The branch user can verify the Investors kyc details and approve it using below API. This Api requires authentication with JWT token created for Branch user

URL : localhost:3000/api/branch/verify-kyc
<br>
Method : Post
<br>
Body : {
    "investorId": "MTCT006"
}

### Deposit Amount to Trade Accoun ty
The branch user can verify the Investors kyc details and approve it using below API. This Api requires authentication with JWT token created for Investor user

URL : localhost:3000/api/investor/trade-deposit
<br>
Method : Post
<br>
Body : {
    "amount": "100"
}



