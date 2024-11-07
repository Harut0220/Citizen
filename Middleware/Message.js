const {validator}=require("../Helper/Validator");

// room_id, writer_id, content, writer 
const createMessage = async (req, res, next) => {
    const validationRule = {
        "room_id": "required|string",
        "writer_id": "required|string",
        "content": "required|string",
        "writer": "required|string",
    };
    try {
        // const { id } = req.params;
    
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

module.exports = {
    createMessage
}