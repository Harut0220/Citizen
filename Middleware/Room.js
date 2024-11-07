const {validator}=require("../Helper/Validator");



  
  
  const CreateRoom = async (req, res, next) => {
    const validationRule = {
        "mobile_user_id": "required|string",
        "mobile_user_name": "required|string",
        "operator_id": "required|string",
        "message_category_id": "required|string",
        "governing_body_id": "required|string"
    };
    try {

    
        await new Promise((resolve, reject) => {
          validator(req.body, validationRule, {}, (err, status) => {
            if (!status) {
              return reject(err);
            }
            resolve();
          });
        });
    
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


  const ActiveRoom = async (req, res, next) => {
    const validationRule = {
        "id": "required|string",
    };
    try {

    
        await new Promise((resolve, reject) => {
          validator(req.body, validationRule, {}, (err, status) => {
            if (!status) {
              return reject(err);
            }
            resolve();
          });
        });
    
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


const getRoom = async (req, res, next) => {
    const validationRule = {
        "id": "required|string",
    };
    try {
        // const { id } = req.params;
    
        await new Promise((resolve, reject) => {
          validator({ id: req.params.id }, validationRule, {}, (err, status) => {
            if (!status) {
              return reject(err);
            }
            resolve();
          });
        });
    
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
    CreateRoom,
    ActiveRoom,
    getRoom
  }