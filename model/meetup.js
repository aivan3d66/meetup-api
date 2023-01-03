const path = require('path')
const db = require("../db");

class Meetup {
  static async update(course) {
    const courses = await Course.getAll()
    const idx = courses.findIndex(c => c.id === course.id)
    courses[idx] = course

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'courses.json'),
        JSON.stringify(courses),
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
      )
    })
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM meetup", (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(results.rows))
      });
    })
  }

  static async getById(id) {
    const meetups = await Meetup.getAll()
    return meetups.find(c => c.id === id)
  }
}

module.exports = Meetup
