const db = require("../db");
const Schema = require("../schema/meetup.schema");

const getMeetups = (request, response) => {
  db.query("SELECT * FROM meetup", (err, results) => {
    if (err) {
      throw err;
    }
    const meetups = results.rows;
    const result = Schema.meetups.validate(meetups);
    const { error } = result;

    const valid = error == null;

    if (!valid) {
      response.status(422).json({
        message: "Invalid request",
        data: meetups
      });
    } else {
      response.status(200).render("meetups", {
        title: "Meetups",
        isMeetups: true,
        meetups: meetups
      });
    }
  });
};

const getMeetupById = (request, response) => {
  const id = request.params.id;

  db.query("SELECT * FROM meetup WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }

    const meetup = results.rows[0];

    response.render("meetup", {
      layouts: "empty",
      title: `Meetup ${meetup.title}`,
      meetup: meetup
    });
  });
};

const createMeetup = (request, response) => {
  const { title, description, tags, date } = request.body;

  db.query("INSERT INTO meetup (title, description, tags, date) VALUES ($1, $2, $3, $4) RETURNING *", [title, description, tags, date], (error) => {
    if (error) {
      throw error;
    }
    response.status(200).redirect("/meetup");
  });
};

const editMeetup = (request, response) => {
  const id = request.params.id;

  db.query("SELECT * FROM meetup WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }

    const meetup = results.rows[0];

    response.render("meetup-edit", {
      title: `Meetup edit ${meetup.title}`,
      meetup
    });
  });
};

const updateMeetup = (request, response) => {
  const { title, description, tags, date, id } = request.body;

  db.query(
    "UPDATE meetup SET title = $1, description = $2, tags = $3, date = $4 WHERE id = $5",
    [title, description, tags, date, id],
    (error) => {
      if (error) {
        throw error;
      }
      response.status(200).redirect("/meetup");
    }
  );
};

const deleteMeetup = (request, response) => {
  const id = parseInt(request.params.id);

  db.query("DELETE FROM meetup WHERE id = $1", [id], (error) => {
    if (error) {
      throw error;
    }
    response.status(200).redirect("/meetup");
  });
};

module.exports = {
  getMeetups,
  getMeetupById,
  createMeetup,
  editMeetup,
  updateMeetup,
  deleteMeetup
};
