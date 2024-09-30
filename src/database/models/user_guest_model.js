import { Schema, model } from "mongoose"

const user_guestSchema = new Schema({
    
});

const User_guest = model("User_guest", user_guestSchema);

export default User_guest;

