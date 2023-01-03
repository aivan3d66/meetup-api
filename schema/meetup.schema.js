const Joi = require("joi");

const meetup = Joi.object().keys({
  id: Joi.number(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  tags: Joi.string().required(),
  date: Joi.string().required()
});

const meetups = Joi.array().items(Joi.object({
  id: Joi.number(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  tags: Joi.string().required(),
  date: Joi.string().required()
}));

module.exports = {
  meetups,
  meetup
};
