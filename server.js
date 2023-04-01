const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost/emails', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const subscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', async (req, res) => {
  const email = req.body.email;

  try {
    const subscription = new Subscription({ email });
    
    await subscription.save();

    res.send('Subscription successful!');
  } catch (error) {
    console.error(error);

    res.status(500).send('Subscription failed. Please try again later.');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
