// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// Replace if using a different env file or config
// require('dotenv').config({ path: './.env' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const handler = async (req, res) => {
    const prices = await stripe.prices.list({
        lookup_keys: [ 'starter', 'premium'],
        expand: ['data.product']
      });
    
      res.send({
        publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        prices: prices.data,
      });
}

export default handler;