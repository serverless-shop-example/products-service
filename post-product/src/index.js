const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');

const {
    PRODUCTS_TABLE,
} = process.env;

const DynamoDB = new AWS.DynamoDB();

async function handler({ body }) {
    try {
        const id = uuidv4();
        const payload = JSON.parse(body);

        await DynamoDB.putItem({
            TableName: PRODUCTS_TABLE,
            Item: {
                'id': { S: id},
                'name': { S: payload.name },
            },
        }).promise();

        return buildResponse(201, {id, name: payload.name});
    } catch (e) {
        console.log(JSON.stringify(e.message));
        return buildResponse(500, e.message);
    }

}

function buildResponse(statusCode, body) {
    return {
        statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(body),
    };
}

module.exports.handler = handler;