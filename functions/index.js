const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_guPDZUbT9WTP4myE08eoPuoR00u7IPf9QT");

// API

// - App config
const app = express()

// - Middlewares
app.use(cors())
app.use(express.json())

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"))

app.post("/payments/create", async (req, res) => {
    const total = req.query.total;
    const id = req.query.id;

    console.log("Payment Request Recieved BOOM!!! for this amount >>>", total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
        payment_method: id
    })

    // OK - Created
    res.status(201).send(paymentIntent)
});

// - Listen command
exports.api = functions.https.onRequest(app)