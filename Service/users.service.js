const db = require("mongodb");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { registerSchema, loginSchema } = require("../share/schema");

const service = {
  //register data service
  async register(req, res) {
    try {
      //validation using joi schema
      const { value, error } = await registerSchema.validate(req.body);
      console.log(value);
      console.log(error);
      if (error)
        return res.status(400).send({ Error: error.details[0].message });

      //check email exist or not
      const FindEmail = await db.register.findOne({
        email: req.body.email,
      });
      console.log(FindEmail);

      //if email Exist throw error msg
      if (FindEmail)
        return res.status(400).send({ alert: "user already exist" });

      //gen salt using bcrpt
      const salt = await bcrypt.genSalt(10);
      console.log("random string", salt);

      req.body.password = await bcrypt.hash(req.body.password, salt); //encrypted the password
      console.log("encrypted password", req.body.password);

      //post the data to db
      const insertdata = await db.reg.insertOne(req.body);
      console.log(insertdata); //inserted data
      res.status(200).send("user register successfully");
    } catch (err) {
      console.log("error in registeration", err);
    }
  },

  //login service

  async login(req, res) {
    try {
      const { value, error } = await loginSchema.validate(req.body);

      if (error)
        return res.status(400).send({ Error: error.details[0].message });
      //email exist or not
      const emailExist = await db.reg.findOne({
        email: req.body.email,
      });
      //not exist
      if (!emailExist)
        return res
          .status(404)
          .send({ alert: "user doen't exist,pls register" });

      //check password valid or not
      const passValid = await bcrypt.compare(
        req.body.password,
        emailExist.password
      );

      if (!passValid)
        return res
          .status(400)
          .send({ alert: "password wrong pls enter valid password" });

      //gen token using jwt

      const token = jwt.sign(
        {
          userId: emailExist._id,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "5h" }
      );
      console.log(token);
      res.status(200).send({ Alert: "login sucessfully", token: token });
    } catch (err) {
      console.log("error in login", err);
    }
  },
};

module.exports = service;
