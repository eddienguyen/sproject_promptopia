const { Schema, model, models } = require("mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: [true, "Email is already exists!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

// const User = new model("User", UserSchema); // this is used on regular backend server (always on, always running)

// In nextjs, the route is only created and running when it's get called. So check exists before creating a new one
// The "models" object is provided by the Mongoose library and stores all the registered models.
// If a model named "User" is already exists, it assigns that existing model to the "User" variable.
// This prevents redefining the model and ensures that the existing model is reused.

// If a model named "User" is not exists in the "models" object, the "model" function from Mongoose is
// called to create a new model.
// The newly created model is then assigned to the "User" variable.
const User = models.User || model("User", UserSchema);
export default User;
