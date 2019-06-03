import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Registration = new Schema ({
  name: { type: String },
  surname: { type: String },
  email: { type: String },
  password: { type: String },
  isActivated: { type: Boolean },
  cellNo: { type: String }
});

export default mongoose.model('Registration', Registration)
