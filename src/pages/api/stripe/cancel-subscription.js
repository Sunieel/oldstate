// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// Replace if using a different env file or config
// require('dotenv').config({ path: './.env' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const handler = async (req, res) => {
  // Cancel the subscription
  try {
    const deletedSubscription = await stripe.subscriptions.del(
      req.body.subscriptionId
    );

    res.send({ subscription: deletedSubscription });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  } 

}

export default handler;