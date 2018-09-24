const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');

const {
    PRODUCTS_TABLE,
} = process.env;

const DynamoDB = new AWS.DynamoDB();

async function handler({ body }) {
    try {
        const id = uuidv4();

        await DynamoDB.putItem({
            TableName: PRODUCTS_TABLE,
            Item: {
                'id': { S: id},
                'name': { S: body.name },
            },
        }).promise();

        return buildResponse(201, {id, name: body.name});
    } catch (e) {
        console.log(JSON.stringify(e.message));
        return buildResponse(500, JSON.stringify(e.message));
    }

}

function buildResponse(statusCode, body) {
    return {
        statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body,
    };
}

module.exports.handler = handler;