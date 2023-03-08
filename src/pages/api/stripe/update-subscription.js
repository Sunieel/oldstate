// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// // Replace if using a different env file or config
// require('dotenv').config({ path: './.env' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const handler = async (req, res) => {
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

}

export default handler;