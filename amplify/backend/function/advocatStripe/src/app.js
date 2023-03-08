/* Amplify Params - DO NOT EDIT
	API_ADVOCAT_GRAPHQLAPIENDPOINTOUTPUT
	API_ADVOCAT_GRAPHQLAPIIDOUTPUT
	API_ADVOCAT_GRAPHQLAPIKEYOUTPUT
	API_ADVOCAT_UPDATEDPROVIDERLISTINGTABLE_ARN
	API_ADVOCAT_UPDATEDPROVIDERLISTINGTABLE_NAME
	AUTH_ADVOCAT_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT *//*

        API_ADVOCAT_GRAPHQLAPIENDPOINTOUTPUT
        API_ADVOCAT_GRAPHQLAPIIDOUTPUT
        API_ADVOCAT_GRAPHQLAPIKEYOUTPUT
        API_ADVOCAT_PROVIDERPROFILETABLE_ARN
        API_ADVOCAT_PROVIDERPROFILETABLE_NAME
        AUTH_ADVOCAT_USERPOOLID

*/



var aws = require('aws-sdk');

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
// app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())



// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
  if (req.originalUrl === '/stripe-webhook') {
    next();
  } else {
    // express.json()(req, res, next);
    bodyParser.json()(req, res, next);
    // awsServerlessExpressMiddleware.eventContext()(req, res, next);
  }
});

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

if (
  !process.env.STRIPE_SECRET_KEY ||
  !process.env.STRIPE_PUBLISHABLE_KEY
) {
  console.log(
    'The .env file is not configured. Follow the instructions in the readme to configure the .env file. https://github.com/stripe-samples/subscription-use-cases'
  );
  process.exit();
}
// console.log("STRIPE_WEBHOOK_SECRET",process.env.STRIPE_WEBHOOK_SECRET)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const sendEmail = async (email, type) => {  
          // send email
          var lambda = new aws.Lambda({
            region: 'ap-southeast-2' //change to your region
        });
        var payload = {queryStringParameters: {
            type: type,
            toEmail: email
        }};
        var params = {
            FunctionName: 'sendEmail', // the lambda function we are going to invoke
            InvocationType: 'Event',
            Payload: JSON.stringify(payload)
        };
        try {
            var data = await lambda.invoke(params).promise();
            console.log("EMAIL DATA",data);
            return true;
        } catch (err) {
            console.log("EMAIL ERROR",err);
            return false;
        }
  };

// Use JSON parser for parsing payloads as JSON on all non-webhook routes.
// app.use((req, res, next) => {
//   if (req.originalUrl === '/webhook') {
//     next();
//   } else {
//     bodyParser.json()(req, res, next);
//   }
// });

app.get('/', async (req, res) => {
  const prices = await stripe.prices.list({
    lookup_keys: ['premium100'],
    expand: ['data.product']
  });
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    prices: prices.data,
  });
});

app.get('/stripe-config', async (req, res) => {
  const prices = await stripe.prices.list({
    lookup_keys: ['premium100'],
    expand: ['data.product']
  });
 console.log(prices);
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    prices: prices.data,
  });
});

app.post('/stripe-create-customer', async (req, res) => {
  // Create a new customer object
  const customer = await stripe.customers.create({
    email: req.body.email,
    name: req.body.name,
    description: req.body.description,
  });

  //TODO update cognito user with customer id

  res.send({ customer: customer });
});

app.post('/stripe-create-subscription', async (req, res) => {
  // Simulate authenticated user. In practice this will be the
  // Stripe Customer ID related to the authenticated user.
  const customerId = req.body.customerId;
  
  // Create the subscription
  const priceId = req.body.priceId;

  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{
        price: priceId,
      }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    res.send({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
});

app.get('/stripe-invoice-preview', async (req, res) => {
  const customerId = req.query.customerId;
  const priceId = process.env[req.query.newPriceLookupKey.toUpperCase()];

  const subscription = await stripe.subscriptions.retrieve(
    req.query.subscriptionId
  );

  const invoice = await stripe.invoices.retrieveUpcoming({
    customer: customerId,
    subscription: req.query.subscriptionId,
    subscription_items: [ {
      id: subscription.items.data[0].id,
      price: priceId,
    }],
  });

  res.send({ invoice });
});

app.post('/stripe-cancel-subscription', async (req, res) => {
  // Cancel the subscription
  try {
    const deletedSubscription = await stripe.subscriptions.del(
      req.body.subscriptionId
    );

    res.send({ subscription: deletedSubscription });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
});

app.post('/stripe-update-subscription', async (req, res) => {
  try {
    const subscription = await stripe.subscriptions.retrieve(
      req.body.subscriptionId
    );
    const updatedSubscription = await stripe.subscriptions.update(
      req.body.subscriptionId, {
        items: [{
          id: subscription.items.data[0].id,
          price: process.env[req.body.newPriceLookupKey.toUpperCase()],
        }],
      }
    );

    res.send({ subscription: updatedSubscription });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
});

app.get('/subscriptions', async (req, res) => {
  // Simulate authenticated user. In practice this will be the
  // Stripe Customer ID related to the authenticated user.
  
  const customerId = req.query.customerId;
  const status = req.query.status;

  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: status,
    expand: ['data.default_payment_method'],
  });

  res.json({subscriptions});
});

// app.post('/some/special/route', bodyParser.json({verify:function(req,res,buf){req.rawBody=buf}}))
// app.use(bodyParser.json())


app.post(
  '/stripe-webhook',
  
  // bodyParser.json({verify:function(req,res,buf){req.rawBody=buf}}),
  express.raw({type: 'application/json'}),
  
     
     
  // ),
   // bodyParser.raw({ type: 'application/json' }
  // bodyParser.raw({type: "*/*"}),
  async (req, res) => {
    
    try{
    // Retrieve the event by verifying the signature using the raw body and secret.
    console.log("req TOTAL",req);
    
    let event;
    console.log("req",req.body);
    console.log("req raw", req.rawBody)
    try {
      const sig = req.headers['stripe-signature'];
      
      console.log({
        BODY: req.body,
        SIG: sig,
        SECRET: process.env.STRIPE_WEBHOOK_SECRET
      });
      
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(err);
      console.log(`⚠️  Webhook signature verification failed.`);
      console.log(
        `⚠️  Check the env file and enter the correct webhook secret.`
      );
      return res.sendStatus(400);
    }
    
    console.log(event)

    // Extract the object from the event.
    const dataObject = event.data.object;

    // Handle the event
    // Review important events for Billing webhooks
    // https://stripe.com/docs/billing/webhooks
    // Remove comment to see the various objects sent for this sample
    switch (event.type) {
      case 'invoice.payment_succeeded':
        if(dataObject['billing_reason'] == 'subscription_create') {
          // The subscription automatically activates after successful payment
          // Set the payment method used to pay the first invoice
          // as the default payment method for that subscription
          const subscription_id = dataObject['subscription']
          const payment_intent_id = dataObject['payment_intent']

          // Retrieve the payment intent used to pay the subscription
          const payment_intent = await stripe.paymentIntents.retrieve(payment_intent_id);

          try {
            const subscription = await stripe.subscriptions.update(
              subscription_id,
              {
                default_payment_method: payment_intent.payment_method,
              },
            );

            console.log("Default payment method set for subscription:" + payment_intent.payment_method);
          } catch (err) {
            console.log(err);
            console.log(`⚠️  Falied to update the default payment method for subscription: ${subscription_id}`);
          }
          // notify the customer that the subscription is active
          await sendEmail(dataObject.customer_email, 'premium-upgrade');
        } 
        // send them an invoice
          await sendEmail(dataObject.customer_email, 'monthly-invoice');


        break;
      case 'invoice.payment_failed':
        // If the payment fails or the customer does not have a valid payment method,
        //  an invoice.payment_failed event is sent, the subscription becomes past_due.
        // Use this webhook to notify your user that their payment has
        // failed and to retrieve new card details.
        await sendEmail(dataObject.customer_email, 'payment-failure');
        break;
      case 'invoice.finalized':
        // If you want to manually send out invoices to your customers
        // or store them locally to reference to avoid hitting Stripe rate limits.
        break;
      case 'customer.subscription.deleted':
        if (event.request != null) {
          // handle a subscription cancelled by your request
          // from above.
          await sendEmail(dataObject.customer_email, 'account-closed');
        } else {
          // handle subscription cancelled automatically based
          // upon your subscription settings.
          await sendEmail(dataObject.customer_email, 'account-closed');
          // TODO deactivate the account

        }
        break;
      case 'customer.subscription.trial_will_end':
        // Send notification to your user that the trial will end
        break;
      default:
      // Unexpected event type
      console.error("NO EVENT TYPE FOUND")
    }
    res.sendStatus(200);
    }catch (error) {
      console.error("UNKNOWN ERROR", error);
      return res.sendStatus(500);
    }
  }
);
// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
