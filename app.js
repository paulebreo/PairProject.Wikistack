const express = require('express');
const { db, Page, User } = require('./models');
const wikirouter = require('./routes/wiki')
const app = express();
const PORT = 3000;

async function sync() {
  try {
    db.authenticate().then(() => {
      console.log('connected to the database');
    });
    await db.sync();
    // await Page.sync();
    // await User.sync();



  } catch (error) {
    console.log(error);
  }
}

sync();
app.use('/wiki', wikirouter)

app.listen(PORT, () => {
  console.log(`Server is lstening on port ${PORT}!`);

});

