const express = require('express');
const { db, Page, User } = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');
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

app.use('/wiki', wikiRouter);
app.use('/user', userRouter);
// app.use('/', (req, res, next) => {
//   res.redirect('/wiki')
// })

app.listen(PORT, () => {
  console.log(`Server is lstening on port ${PORT}!`);
});
