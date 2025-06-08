const express = require("express");
const Subscriber = require("../models/subscriberModel");
const subscriberRouter = express.Router();

//POST /api/subscribe
//handle newletter subscription
//public access

subscriberRouter.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: "Email is required" });
  }
  try {
    let subscriber = await Subscriber.findOne({ email });
    if (subscriber) {
      return res.status(400).json({ message: "You are already subscribed" });
    }
    //no email found, create a new subscriber
    subscriber = new Subscriber({ email });
    await subscriber.save();
    res.status(201).json({ message: "Subscription successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = subscriberRouter;
