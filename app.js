var Promise = require("bluebird");
var copyDynamo = Promise.promisifyAll(require('copy-dynamodb-table'));

if (!process.env.RA_AWS_ACCESS_KEY_ID || !process.env.DMS_AWS_ACCESS_KEY_ID) {
    throw "RA and DMS AWS Environment variables must be set";
}

var dynamoRA = {
    accessKeyId: process.env.RA_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.RA_AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.RA_AWS_SESSION_TOKEN,
    region: process.env.RA_AWS_DEFAULT_REGION
}

var dynamoDMS = {
    accessKeyId: process.env.DMS_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.DMS_AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.DMS_AWS_SESSION_TOKEN,
    region: process.env.DMS_AWS_DEFAULT_REGION
}

var tables = [
    'cit-notes',
    'config-history',
    'fni-targets',
    'gl-account-mapping',
    'gl-category-metric-grouping',
    'gl-mapping-reference-v4',
    'rap-config',
    'user-access',
    'workdays-setup-config'
];
const ENV = process.env.APPLICATION_ENV === 'production' ? 'prod' : 'nonprod';

console.log(`Current Environment: ${ENV}`);

var func = async function () {
    for (let i = 0; i < tables.length; i++) {
        const table = tables[i];

        console.log(`\nProcessing ${table}`);

        await copyDynamo.copyAsync({
            source: {
                tableName: `${ENV}-${table}`,
                config: dynamoRA
            },
            destination: {
                tableName: table,
                config: dynamoDMS
            },
            log: true,
            create: false,

        });
    }
}

func();
