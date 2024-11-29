const express = require('express');
const stripe = require('stripe')('your-secret-key-here'); // Replace with your secret key
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/charge', async (req, res) => {
    const token = req.body.stripeToken; // Using Express

    try {
        const charge = await stripe.charges.create({
            amount: 5000, // Amount in cents (5000 = $50.00)
            currency: 'usd',
            source: token,
            description: 'Example Charge',
        });
        res.send('Payment successful');
    } catch (error) {
        res.status(500).send('Payment failed: ' + error.message);
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
