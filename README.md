# dynamo-copy
Copy DynamoDb tables between accounts

## Install
```bash
npm install
```
  
## Run

### Add the following Environment Variables

```bash
export RA_AWS_ACCESS_KEY_ID=SOURCEACCESSKEY
export RA_AWS_SECRET_ACCESS_KEY=SOURCESECRETKEY
export RA_AWS_SESSION_TOKEN=SOURCESESSIONTOKEN
export RA_AWS_DEFAULT_REGION=us-east-1
export DMS_AWS_ACCESS_KEY_ID=DESTACCESSKEY
export DMS_AWS_SECRET_ACCESS_KEY=DESTSECRETKEY
export DMS_AWS_SESSION_TOKEN=DESTSESSIONTOKEN
export DMS_AWS_DEFAULT_REGION=us-east-1
export APPLICATION_ENV=production
```

### Execute the application

```bash
node ./app.js
```

#### Notes

* Modify the list of tables in `app.js` to change which tables are copied.
* App assumes source tables are prepended with `prod-` or `nonprod-`
