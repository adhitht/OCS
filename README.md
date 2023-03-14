
# OCS

A React JS app to show CV of users with backend. Done as a part of selection to OCS IITH





## Run Locally
If you are using IITH Internet, please disconnet and use your personal hotspot

```bash
  git clone https://github.com/adhitht/OCS
```


### Backend
```bash
cd backend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run start
```


## Demo


Follow [this link ](localhost:2000/users) to see all users in database after starting the backend.

Username and password is also returned in the response. 

Use that to login.

OrElse

Register by clicking on page.

Fill the neccessary details and login.


## Usage/Examples
[Frontend](http://localhost:3000) uses PORT 3000 by default.

[Backend](http://localhost:2000) runs on port specified by environment variable or else on port 2000 



### API Endpoints
- ```/``` -> Returns ```{"Hello":"World"}```
- ```users``` -> Only for development not used in production. It returns details of all users registered
- ```login``` -> Accepts username(Roll umber) and password, checks it with MYSQL database and generates JSON Web Tokens and returns to user. Frontend stores it in localStorage to disable login screen later.
- ```register``` -> Accepts Roll Number, Name, Email, password and CV Link, then store it in MYSQL Database 
- ```auth``` -> Accepts token stored in localStorage and checks whether it is valid and is not tampered.
- ```delete``` -> Accepts token and deletes the user corresponding to token from Database
- ```update``` -> Accepts details from user and updates data to database. Username is fetched from token and not recieved as a post request
- ```cv``` -> Fetches Name, Email, CV Link of all users currently registered






