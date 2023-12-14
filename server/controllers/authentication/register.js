"use strict";

const Joi = require('joi');

const AuthUser = require('../../models/authUser');

const registerUser = async (req, response) => {
    const payload = req.body;
    console.log("here",payload)

    try {
        const schema = Joi.object({
            
            email: Joi.string().email().required(),

            password: Joi.string().pattern(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/).required(),
        });

        const { error, value } = schema.validate(payload);

        if (error) {
            response.status(403).json({ message: error.details[0].message });
            return;
        }

        const { email, password } = value;

        const user = await AuthUser.findOne({ email: email });

        if (user) return response.status(401).send({message:"user already exists",success:false});

        const userRes = new AuthUser({ email, password })

        await userRes.save()

        if (!userRes) return response.status(401).send({message:"failed operation",success:false})


        return response.status(200).send({message:"user registered",success:true})

    } catch (err) {
        console.log("error inter",err)
        return response.status(501).json({ message: "Internal server error", success: false });
    }
}

module.exports = registerUser;