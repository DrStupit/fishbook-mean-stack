import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Registration from './models/Register';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:4000/fishbook');

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB connection on Fishbook Server established!');
});

app.use('/', router);

//Begin routes for user registration:

// Get all users:
router.route('/users').get((req, res) => {
  Registration.find((err, users) => {
    if (err)
      console.log(err);
    else
      res.json(users);
  });
});

// Get user by ID:
router.route('/users/:id').get((req, res) => {
  Registration.findById(req.params.id,(err, users) => {
    if (err)
      console.log(err);
    else
      res.json(users);
  });
});

app.get('/', (req, res) => res.send('Fishbook Server Live!'));
app.listen(4000, () => console.log(`Express server running on port 4000`));
