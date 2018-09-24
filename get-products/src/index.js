const AWS = require('aws-sdk');

const {
    PRODUCTS_TABLE,
} = process.env;

const DynamoDB = new AWS.DynamoDB();

async function handler() {
    try {
        const { Items: productItems } = await DynamoDB.scan({
            TableName: PRODUCTS_TABLE,
            ProjectionExpression: 'id,title',
        }).promise();

        return buildResponse(200, productItems
            .map(({ id: { S: id }, title: { S: title } }) =>
                ({
                    id,
                    title
                })));
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