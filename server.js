const app = require("./app");
const passport = require("passport");

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});

app.use(passport.initialize());
