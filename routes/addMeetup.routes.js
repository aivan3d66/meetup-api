const Router = require("express");
const router = new Router();
const meetupController = require("../controllers/meetup.controller");

router.get("/", (req, res) => {
  res.render("addMeetup", {
    title: "Add meetup",
    isAddMeetup: true
  });
});

router.post("/", meetupController.createMeetup);

module.exports = router;
