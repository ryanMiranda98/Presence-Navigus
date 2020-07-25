const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const Pusher = require("pusher");

// PUSHER
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

router.route("/pusher/auth").post(authController.protect, (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;

  const user_id = req.user.id;

  const presenceData = {
    user_id: user_id,
    user_info: {
      name: req.user.name,
      email: req.user.email,
    },
  };
  const auth = pusher.authenticate(socketId, channel, presenceData);
  res.send(auth);
});

module.exports = router;
