const userModel = require("../model/usermodel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { isValid, isValidEmail, isValidPassword} = require("../validator/validator")



// -----------------------------------create user api-------------------------------------------------------------------------
const createuser = async function (req, res) {
  try {
    let body = req.body;

    let { name ,email, password } = body;

    if (Object.keys(body).length == 0 ) return res.status(400).send({ status: false, message: "plss put some data in body" })

    if (!isValid(name)) return res.status(400).send({ status: false, message: "Name is required!!" })

    if (!isValid(email)) return res.status(400).send({ status: false, message: "Email is required!!" })

    const newemail = await userModel.findOne({ email });
    if (newemail) return res.status(400).send({ status: false, message: "Email is already present" })

    if (!isValidEmail(email)) return res.status(400).send({ status: false, message: "Email is invalid" })

    if (!isValid(password)) return res.status(400).send({ status: false, message: "Password is required!!" })

    if (!isValidPassword(password)) return res.status(400).send({ status: false, message: "Password must be contain of 8 to 15 character with special charcter and one lowercase ,one uppercase and numbers" })
  

    //applying bcrypt
    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);

    let usercreate = await userModel.create(body);
    return res.status(201).send({ status: true, message: "user create succesfully", data: usercreate })

  }
  catch (err) {
    return res.status(500).send({ message: err.message })
  }

}

// --------------------------------------login api----------------------------------------------------------------------
const userLogin = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length == 0) return res.status(400).send({ statua: false, message: "Please provide login details!!" })

    const { email, password } = data

    if (!isValid(email) || !isValidEmail(email)) return res.status(400).send({ status: false, message: "Email is required or its invalid" })

    if (!isValid(password) || !isValidPassword(password)) return res.status(400).send({ status: false, message: "Password is required or its invalid" })


    let userid = await userModel.findOne({ email: email })
    if (!userid) return res.status(400).send({ status: false, message: "Email is not registered plss register first" });

    // ---------------------------decoding hash password---------------------------------------------------------
    let encryptPwd = userid.password;

    await bcrypt.compare(password, encryptPwd, function (err, result) {
      if (result) {
        let token = jwt.sign(
          { _id: userid._id.toString() , iat: Math.floor(Date.now() / 1000) - 30 },
          process.env.SECRET_TOKEN,
          {
            expiresIn: "24hr",
          }
        );

        return res.status(200).send({status: true, message: "User login successfull", data: { userId:userid._id, token: token }});
      } 
      else return res.status(401).send({ status: false, message: "Invalid password!" });
    });
  } catch (err) {
    res.status(500).send({ staus: false, msg: err.message });
  }
};


module.exports = {createuser ,userLogin }