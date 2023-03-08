import Stripe from  'stripe';
import { Auth } from 'aws-amplify';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const createCustomer = async (user) => {

    const customer = await stripe.customers.create({
      email: user.email,
    }).then( async customer => {
      await Auth.updateUserAttributes(user, {
        'custom:stripeCustomerId': customer.id
      }).catch(err => console.log("didn't update cognito", err));
    }).catch(error => {
      console.log(error);
    });
    return customer.id;
};



const handler = async (req, res) => {
  // Simulate authenticated user. In practice this will be the
  // Stripe Customer ID related to the authenticated user.
  if (req.method === 'POST') {
    // const customerId = 1//req.cookies['customer'];
    const customerId = req.body.customerId;
    const priceId = req.body.priceId;
    // const cognitoUser = req.body.cognitoUser;
    // console.log(cognitoUser) ;
    // if stripe customer id exists use it otherwise create it
    // const customerId = user.stripeCustomerId ? user.stripeCustomerId : await createCustomer(cognitoUser).then( async customerId => 
   // { 
      try {
        const subscription = await stripe.subscriptions.create({
          customer: customerId,
          items: [{
            price: priceId,
          }],
          payment_behavior: 'default_incomplete',
          expand: ['latest_invoice.payment_intent'],
        });
        console.log(subscription);
        res.send({
          subscriptionId: subscription.id,
          clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        });
      } catch (error) {
        console.log(error);
        return res.status(400).send({ error: { message: error.message } });
      }
      
    //   } 
    // }).catch(error => {
    //   console.log(error);
    // } );
    // // Create the subscription
    
  
    
  } else {
    // return error
    return res.status(400).send({ error: { message: 'Invalid request method' } });
  }
};

export default handler;