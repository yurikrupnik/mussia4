const yaml = require('js-yaml'); // eslint-disable-line
const fs = require('fs');

const isMaster = process.env.BITBUCKET_BRANCH === 'master';

try {
    const doc = yaml.safeLoad(fs.readFileSync('app.yml', 'utf8'));
    if (!isMaster) {
        doc.service = 'dev';
    }

    const DATABASE_URL = !isMaster
        ? `${process.env.DATABASE_URL}${
              process.env.BITBUCKET_BRANCH.includes('snyk-fix')
                  ? 'snyk-fix'
                  : (process.env.BITBUCKET_BRANCH && process.env.BITBUCKET_BRANCH.toLowerCase()) || ''
          }`
        : process.env.DATABASE_URL_PROD;

    doc.env_variables = {
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: isMaster ? process.env.DB_PASSWORD_PROD : process.env.DB_PASSWORD,
        DATABASE_URL
    };
    console.log(doc);
    const yamlStr = yaml.safeDump(doc);
    fs.writeFileSync('app.yml', yamlStr, 'utf8');
} catch (e) {
    console.lsog('Error', e);
}
