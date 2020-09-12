import Joi from 'joi';


const AddUserRequest = Joi.object({

    name: Joi.string()
        .min(4)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(5)
        .required()
})

export default AddUserRequest;