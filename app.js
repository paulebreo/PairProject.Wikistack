const { db, Page, User } = require("./models");

async function sync() {
    db.authenticate().then(() => {
        console.log("connected to the database");
    });
    await Page.sync();
    await User.sync();
}

sync();
