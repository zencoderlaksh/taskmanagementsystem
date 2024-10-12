const Joi = require("joi");

// Task Validation Schema
const validateTask = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    dueDate: Joi.date().optional(),
    completed: Joi.boolean().optional(),
  });
  return schema.validate(data);
};

module.exports = { validateTask };
