const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const Pusher = require("pusher");
const config = require("config");

// PUSHER
const pusher = new Pusher({
  appId: config.get("PUSHER_APP_ID"),
  key: config.get("PUSHER_KEY"),
  secret: config.get("PUSHER_SECRET"),
  cluster: config.get("PUSHER_CLUSTER"),
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
