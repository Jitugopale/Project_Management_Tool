const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const JWT_SECRET ='Romanisagood$boy';
const MY_EMAIL ="jiteshgopale26@gmail.com";
const MY_PASSWORD ="gaxohvmyinvnieoi";

// Email-sending function using Nodemailer
function sendEmail({ recipient_email, OTP }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: MY_EMAIL, // Gmail email address
        pass: MY_PASSWORD, // App password (if 2FA is enabled)
      },
    });

    const mail_configs = {
      from: MY_EMAIL,
      to: recipient_email,
      subject: "KODING 101 PASSWORD RECOVERY",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Password Recovery</title>
        </head>
        <body>
          <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Koding 101</a>
              </div>
              <p style="font-size:1.1em">Hi,</p>
              <p>Thank you for choosing Koding 101. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
              <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
              <p style="font-size:0.9em;">Regards,<br />Koding 101</p>
            </div>
          </div>
        </body>
        </html>`
    };

    transporter.sendMail(mail_configs, (error, info) => {
      if (error) {
        console.error(error);
        return reject({ message: `An error occurred: ${error.message}` });
      }
      return resolve({ message: "Email sent successfully" });
    });
  });
}

// Route 1: Create a User using POST "/api/auth/createUser"
router.post(
  '/createUser',
  [
    body('fname', 'Enter a valid fname').isLength({ min: 3 }),
    body('Lname', 'Enter a valid Lname').isLength({ min: 3 }),
    body('Address', 'Enter a valid Address').isLength({ min: 3 }),
    body('PhoneNo', 'Enter a valid PhoneNo').isLength({ min: 10, max: 10 }).matches(/^[0-9]{10}$/),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
    body('City', 'Enter a City').isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        fname: req.body.fname,
        Lname: req.body.Lname,
        Address: req.body.Address,
        PhoneNo: req.body.PhoneNo,
        email: req.body.email,
        password: secPass,
        City: req.body.City,
      });

      const data = { id: user.id };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.status(201).json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 2: Login a User using POST "/api/auth/login"
router.post(
  '/login',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const data = { id: user.id };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 3: Send OTP for password recovery
// Example route for sending OTP to the user's email
// Route for sending recovery email
router.post('/send_recovery_email', async (req, res) => {
  const { email } = req.body;
  
  // Generate a random OTP (for example, a 6-digit number)
  const otp = Math.floor(100000 + Math.random() * 900000);
  
  // OTP expires in 10 minutes
  const otpExpiration = Date.now() + 10 * 60 * 1000;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }

    // Log the user document before updating
    console.log("User before OTP update:", user);

    // Update the OTP and OTP expiration in the user document
    user.otp = otp;
    user.otpExpiration = otpExpiration;

    // Log the OTP and expiration time before saving
    console.log("Updating OTP:", otp);
    console.log("OTP Expiration:", otpExpiration);

    // Save the updated user document
    await user.save(); // Save the updated user document

    // Send OTP via email (using nodemailer, for example)
    sendEmail({ recipient_email: email, OTP: otp })
      .then(() => {
        res.status(200).json({ message: 'OTP sent to your email.' });
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ message: 'Failed to send OTP.' });
      });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route for verifying OTP and changing password
router.post('/verify_otp', async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }

    // Log OTP and expiration time for debugging
    console.log('Stored OTP:', user.otp);
    console.log('OTP Expiration:', user.otpExpiration);
    console.log('Current Time:', Date.now());

    // Check if OTP matches and is still valid
    if (user.otp === otp && user.otpExpiration > Date.now()) {
      // Update the password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await User.updateOne(
        { email },
        { password: hashedPassword, otp: null, otpExpiration: null }
      );

      res.status(200).json({ message: 'Password successfully updated.' });
    } else {
      res.status(400).json({ message: 'Invalid OTP or OTP expired.' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// Route 4: Get Logged-in User Details using GET "/api/auth/getuser" - Login required
router.get('/getuser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
