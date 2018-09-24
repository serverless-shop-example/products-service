const AWS = require('aws-sdk');

const {
    PRODUCTS_TABLE,
} = process.env;

const DynamoDB = new AWS.DynamoDB();

async function handler() {
    try {
        const { Items: productItems } = await DynamoDB.scan({
            TableName: PRODUCTS_TABLE,
            ProjectionExpression: '#i,#n',
            ExpressionAttributeNames: {
                '#i': 'id',
                '#n': 'name',
            }
        }).promise();

        return buildResponse(200, productItems
            .map(({ id: { S: id }, name: { S: name } }) =>
                ({
                    id,
                    name
                })));
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