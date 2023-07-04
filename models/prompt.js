const { Schema, model, models } = require("mongoose");

const PromptSchema = new Schema({
  creator: { // User who create
    type: Schema.Types.ObjectId, // creator is going to be a document in the db, more specifically the user
    ref: "User", // the user model, 1-to-many relationship
  },
  prompt: {
    type: String,
    required: [true, "Prompt content is required!"],
  },
  tag: {
    type: String,
    required: [true, "Prompt tag is required!"],
  },
});

// const Prompt = new model("Prompt", PromptSchema);
// In nextjs, the route is only created and running when it's get called. So check exists before creating a new one
// The "models" object is provided by the Mongoose library and stores all the registered models.
// If a model named "Prompt" is already exists, it assigns that existing model to the "Prompt" variable.
// This prevents redefining the model and ensures that the existing model is reused.

// If a model named "Prompt" is not exists in the "models" object, the "model" function from Mongoose is
// called to create a new model.
// The newly created model is then assigned to the "Prompt" variable.
const Prompt = models.Prompt || model("Prompt", PromptSchema);
export default Prompt;
