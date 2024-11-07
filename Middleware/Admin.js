// import { getAdminsByGoverning } from "../DB/controller";
// import { validator } from "../Helper/Validator";
const getAdminsByGoverning=require("../DB/controller").getAdminsByGoverning;
const { getAdminById } = require("../DB/controller");
const {validator}=require("../Helper/Validator");

const AdminByGoverning = async (req, res, next) => {
  const validationRule = {
    governing: "required|string",
  };

  
  const user = await getAdminsByGoverning(req.params.governing);
  

  if (!user[0]) {
    res.status(412).send({
      success: false,
      message: "Operator not found",
    });
  }else{
    await validator(req.params, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: "Validation failed",
          data: err,
        });
      }
      next();
    }).catch((err) => {
      console.log(err);
      res.status(500).send("Error");
    });
  }


};


const AdminByGoverningByBody = async (req, res, next) => {
  const validationRule = {
    governing: "required|string",
  };

  
  const user = await getAdminsByGoverning(req.body.governing);
  

  if (!user[0]) {
    res.status(412).send({
      success: false,
      message: "Operator not found",
    });
  }else{
    await validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: "Validation failed",
          data: err,
        });
      }
      next();
    }).catch((err) => {
      console.log(err);
      res.status(500).send("Error");
    });
  }


};


const AdminRegister = async (req, res, next) => {
  const validationRule = {
    name: "required|string",
    surname: "required|string",
    email: "required|string",
    password: "required|string",
    phone: "required|string",
    governing: "required|string",
  };

  // name, surname, email, password, phone, governing 

  await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    }
    next();
  }).catch((err) => {
    console.log(err);
    res.status(500).send("Error");
  });
};

const AdminAuth = async (req, res, next) => {
  const validationRule = {
    id: "required|integer",
  };

  // Fetch admin user by ID
  try {
    const user = await getAdminById(req.body.id);
    console.log(user, "user");

    if (!user) {
      return res.status(412).send({
        success: false,
        message: "Operator not found",
      });
    }

    // Perform validation
    await new Promise((resolve, reject) => {
      validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
          return reject(err);
        }
        resolve();
      });
    });

    // Validation passed, move to the next middleware
    next();
  } catch (err) {
    console.error(err);
    return res.status(412).send({
      success: false,
      message: "Validation failed",
      data: err,
    });
  }
};


const AdminUpdateSocketId = async (req, res, next) => {
  const validationRule = {
    id: "required|integer",
    socket_id: "required|string",
  };

  // Fetch admin user by ID and update socket_id
  try {
    const user = await getAdminById(req.body.id);
    console.log(user, "user");

    if (!user) {
      return res.status(412).send({
        success: false,
        message: "Operator not found",
      });
    }

    // Perform validation
    await new Promise((resolve, reject) => {
      validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
          return reject(err);
        }
        resolve();
      });
    });

    // Validation passed, move to the next middleware
    next();
  } catch (err) {
    console.error(err);
    return res.status(412).send({
      success: false,
      message: "Validation failed",
      data: err,
    });
  }
};




module.exports = {
  AdminByGoverning,
  AdminByGoverningByBody,
  AdminRegister,
  AdminAuth,
  AdminUpdateSocketId
};
