// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// // Replace if using a different env file or config
// require('dotenv').config({ path: './.env' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const handler = async (req, res) => {
  // Simulate authenticated user. In practice this will be the
  // Stripe Customer ID related to the authenticated user.
  const customerId = req.cookies['customer'];

  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'all',
    expand: ['data.default_payment_method'],
  });

  res.json({subscriptions}); 

}

export default handler;