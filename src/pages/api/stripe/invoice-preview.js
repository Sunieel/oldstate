// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// // Replace if using a different env file or config
// require('dotenv').config({ path: './.env' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const handler = async (req, res) => {
    const customerId = req.cookies['customer'];
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
}

export default handler;