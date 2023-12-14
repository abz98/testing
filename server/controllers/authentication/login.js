const Joi = require("joi");

const jwt = require("jsonwebtoken");
const authUser = require("../../models/authUser");

const loginUser = async (req, res) => {
      try {
            const payload = req.body;

            const schema = Joi.object({
                  email: Joi.string().email().required(),
                  password: Joi.string().required(),
            });

            const { error, value } = schema.validate(payload);

            if (error) {
                  res.status(403).json({ error: error.details[0].message });
                  return;
            }

            const { email, password } = value;

            const user = await authUser.findOne({ email: email });

            if (!user) return res.status(401).send({ success: false, message: "Register first" });


            user.comparePassword(password, async function (error, isMatch) {

                  if (isMatch && !error) {

                        var token = jwt.sign(
                              { id: user._id, email },
                              "adsadsdfsfaf",
                              {
                                    expiresIn: 64000,
                              }
                        );

                        const userData = {
                              email: user.email,
                        };


                        return res.json({
                              success: true,
                              token: token,
                              userData,
                        });

                  } else {
                        return res.json({
                              success: false,
                              message: "Username or password wrong"
                        });
                  }
            })


      } catch (err) {
            return res.status(501).json({ message: "Internal server error", success: false });
      }
}
module.exports = loginUser