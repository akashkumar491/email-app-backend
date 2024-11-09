const express = require("express");
const router = express.Router();
const Email = require("../models/Email");

router.get("/", async (req, res) => {
  try {
    const emails = await Email.find(
      {},
      "subject sender body isRead isFavourite receivedAt"
    );
    res.json(emails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const email = await Email.findById(req.params.id);
    res.json(email);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/create", async (req, res) => {
  const { subject, sender, receiver, body } = req.body;

  try {
    // Create a new email document
    const newEmail = new Email({
      subject,
      sender,
      body,
      receivedAt: new Date(),
    });

    // Save the email to the database
    const savedEmail = await newEmail.save();
    res.status(201).json(savedEmail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update email by ID
router.put("/update/:id", async (req, res) => {
  try {
    const emailId = req.params.id;
    const updatedData = req.body;

    // Find the email by ID and update it with the new data
    const updatedEmail = await Email.findByIdAndUpdate(
      emailId,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!updatedEmail) {
      return res.status(404).json({ message: "Email not found" });
    }

    res.json(updatedEmail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
