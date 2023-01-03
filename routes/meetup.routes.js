const Router = require("express");
const router = new Router();
const meetupController = require("../controllers/meetup.controller");

router.get("/", meetupController.getMeetups);
router.get("/:id", meetupController.getMeetupById);
router.get("/:id/edit", meetupController.editMeetup);
router.post("/edit", meetupController.updateMeetup);
router.delete("/remove/:id", meetupController.deleteMeetup);

module.exports = router;
