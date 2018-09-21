const express = require('express');
const { db, Page, User } = require('./models');

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

    app.listen(PORT, () => {
      console.log(`Server is lstening on port ${PORT}!`);
    });
  } catch (error) {
    console.log(error);
  }
}

sync();
