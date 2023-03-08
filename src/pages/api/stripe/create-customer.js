// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// // Replace if using a different env file or config
// require('dotenv').config({ path: './.env' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const handler = async (req, res) => {
    // Create a new customer object
    const customer = await stripe.customers.create({
        email: req.body.email,
        name: req.body.name,
        description: req.body.description,
    });

    // Save the customer.id in your database alongside your user.
    // We're simulating authentication with a cookie.
    // res.cookie('customer', customer.id, { maxAge: 900000, httpOnly: true });
    console.log(customer);
    res.send({ customer: customer });

}

export default handler;