/* Amplify Params - DO NOT EDIT
	AUTH_ADVOCAT_USERPOOLID
	ENV
	FUNCTION_ADVOCATSENDEMAIL_NAME
	REGION
Amplify Params - DO NOT EDIT */
var aws = require('aws-sdk');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    var lambda = new aws.Lambda({
        region: 'ap-southeast-2' //change to your region
    });
    var payload = {queryStringParameters: {
        type: "account-creation",
        toEmail: event.request.userAttributes.email
    }};
    var params = {
        FunctionName: 'sendEmail', // the lambda function we are going to invoke
        InvocationType: 'Event',
        Payload: JSON.stringify(payload)
    };
    try {
        var data = await lambda.invoke(params).promise();
        console.log(data);
    } catch (err) {
        console.log(err);
    }
    context.done(null, event);
};

//     lambda.invoke({
//         FunctionName: 'sendEmail',
//         Payload: JSON.stringify(payload, null, 2) // pass params
//     }, function (error, data) {
//         if (error) {
//             console.log("ERROR", error);
//             // context.done('error', error);
//         }
//         if (data.Payload) {
//             context.succeed(data.Payload)
//         }
//     });
 

//     return {
//         statusCode: 200,
//         //  Uncomment below to enable CORS requests
//         //  headers: {
//         //      "Access-Control-Allow-Origin": "*",
//         //      "Access-Control-Allow-Headers": "*"
//         //  }, 
//         body: JSON.stringify('Hello from Lambda!'),
//     };
// };
