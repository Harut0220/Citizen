const allowedOrigins=require("./allowedOrigins.js");
const corsOptions = {
  origin: allowedOrigins,
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  credentials: true,
};

module.exports ={corsOptions};
