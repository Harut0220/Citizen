const { getUser } = require("../DB/controller");
const {validator}=require("../Helper/Validator");



const UserAuth = async (req, res, next) => {
    // user_device,name,phone_number,email,message_category_id,governing_body,socket_id,type
    const validationRule = {
        user_device: "required|string",
        name: "required|string",
        phone_number: "required|string",
        email: "required|string",
        message_category_id: "required|string",
        governing_body: "required|string",
        socket_id: "required|string",
        type: "required|string",
      };
    
      // Fetch admin user by ID and update socket_id
      try {
        const user = await getUser(req.body.id);
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

const UserUpdateSocketId = async (req, res, next) => {
    const validationRule = {
      id: "required|integer",
      socket_id: "required|string",
    };
  
    // Fetch admin user by ID and update socket_id
    try {
      const user = await getUser(req.body.id);
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
    UserUpdateSocketId,
    UserAuth
  }