import Payment from "../models/payment.models.js";
import { Product } from "../models/products.models.js";
import { errorHandler } from "../utils/errorHandler.js";
import stripe from "../utils/stripe.js";

export const createPayment = async (request, response, next) => {
  try {
    const { user_id, product_id, amount } = request.body;

    // Get the product price
    const product = await Product.findById(product_id);
    if (!product) return next(errorHandler(404, "Product not found"));

    // Check if user already has an active payment plan
    let payment = await Payment.findOne({ user_id, product_id });

    if (!payment) {
      // If no existing plan, create a new one
      payment = new Payment({
        user_id,
        product_id,
        total_price: product.price,
        remaining_balance: product.price, // Initially, full price is due
        payments: [],
      });
    }

    // Check if the amount is valid
    if (amount > payment.remaining_balance) {
      return next(errorHandler(400, "Payment exceeds remaining balance"));
    }

    // Convert payment amount to cents
    const amountInCents = Math.round(payment_amount * 100);

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents, // Stripe works in cents
      currency: "kes",
      metadata: { user_id, product_id },
    });

    response
      .status(201)
      .json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    next(errorHandler(500, "Error creating payment intent."));
  }
};

export const stripeWebhook = async (request, response, next) => {
  try {
    const sig = request.headers["stripe-signature"];

    let event;
    try {
      // Verify the Stripe event
      event = stripe.webhooks.constructEvent(
        request.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res
        .status(400)
        .json({ success: false, message: "Webhook error: Invalid signature" });
    }

    // Handle successful payment
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      const { user_id, product_id } = paymentIntent.metadata;
      const amountPaid = paymentIntent.amount / 100; // Convert from cents to KES

      // Find the existing payment record
      let payment = await Payment.findOne({ user_id, product_id });

      if (!payment) {
        return next(errorHandler(404, "Payment record not found"));
      }

      // Add the payment entry to the history
      payment.payments.push({
        amount: amountPaid,
        date: new Date(),
        status: "completed",
        transaction_id: paymentIntent.id,
      });

      // Deduct from the remaining balance
      payment.remaining_balance -= amountPaid;

      // Check if fully paid
      if (payment.remaining_balance <= 0) {
        payment.payment_status = "paid"; // Mark as fully paid
      }

      // Save updated payment record
      await payment.save();

      console.log(
        `✅ Payment of ${amountPaid} KES recorded for User ${user_id}`
      );

      return res
        .status(200)
        .json({ success: true, message: "Payment recorded successfully" });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Webhook handling error:", error);
    next(errorHandler(500, "Error handling webhook"));
  }
};
