const express = require("express");
const homeRoutes = require("./routes/home.routes");
const meetupRoutes = require("./routes/meetup.routes");
const addMeetupRoutes = require("./routes/addMeetup.routes");
const expressHbs = require("express-handlebars");
const path = require("path");

const PORT = process.env.PORT || 8080;

const app = express();

const hbs = expressHbs.create({
  defaultLayout: "main",
  extname: "hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({
  extended: true
}));

app.use("/", homeRoutes);
app.use("/meetup", meetupRoutes);
app.use("/addMeetup", addMeetupRoutes);

app.listen(PORT, () => {
  console.log(`Server is started on port: ${PORT}`);
});
