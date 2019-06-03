import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose, { mongo } from 'mongoose';
import User from './models/User';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/fishbook_dev');

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB connection on Fishbook Server established!');
});

app.use('/', router);

//Begin routes for user:

// Get all users:
router.route('/users').get((req, res) => {
  User.find((err, users) => {
    if (err)
      console.log(err);
    else
      res.json(users);
  });
});

// Get user by ID:
router.route('/users/:id').get((req, res) => {
  User.findById(req.params.id,(err, users) => {
    if (err)
      console.log(err);
    else
      res.json(users);
  });
});

// Add new user
router.route('/users/add').post((req, res) => {
  let user = new User(req.body);
  user.save()
    .then(user => {
      res.status(200).json({'users': 'Added successfully!'});
    })
    .catch(err => {
      res.status(400).send('Failed to add new user.')
    })
});

// Update a user:
router.route('/users/updates/:id').post((req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (!user)
      return next (new Error ('Could not load document'));
    else {
      user.name = req.body.name;
      user.surname = req.body.surname;
      user.email = req.body.email;
      user.password = req.body.password;
      user.isActivated = req.body.isActivated;
      user.cellNo = req.body.cellNo;

      user.save().then( user => {
        res.json('Update done')
      }).catch(err => {
        res.status(400).send('Update failed');
      });
    }
  });
});

// Delete a user:
router.route('/users/delete/:id').get((req, res) => {
  User.findByIdAndRemove({_id: req.params.id}, (err, user) => {
    if(err)
      res.json(err);
    else
      res.json('Removed user successfully')
  });
});

app.get('/', (req, res) => res.send('Fishbook Server Live!'));
app.listen(4000, () => console.log(`Express server running on port 4000`));
