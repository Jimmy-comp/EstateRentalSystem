/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {
  sails.bcrypt = require('bcryptjs');
  const saltRounds = 10;
  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)

  if (await Estate.count() == 0) {
    await Estate.createEach([
      { title: "Luxury & Power", estatename: "Gothan City", area: 30, rent: 14000, url: "https://www.ikea.com/images/step-into-living-room-turned-haven-made-just-for-you-with-a--0f78c0738a9904f9ddbbc81dd5af2ffa.jpg?f=s", roomnum: 3, tenants: 3, highlightprop: "true" },
      { title: "DC 最強", estatename: "Metropolis", area: 150, rent: 20000, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdJZEynmnQjySyRJcKgbXLAVZ-M8MY-Vtvwmfh-EPyxfWORsfQ2g", roomnum: 5, tenants: 8, highlightprop: "true" },
      { title: "鄰近正義聯盟", estatename: "Central City", area: 100, rent: 17000, url: "http://images.unsplash.com/photo-1550581190-9c1c48d21d6c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9", roomnum: 3, tenants: 4, highlightprop: "true" },
      // etc.
    ]);
  }

  const hash = await sails.bcrypt.hash('123456', saltRounds);

  const match = await sails.bcrypt.compare(req.body.password, user.password);

  if (!match) return res.status(401).send("Wrong Password");

  await User.createEach([
    { username: "admin", password: hash },
    { username: "Doramon", password: "comp3047" },
    { username: "Jimmy", password: "a12345"}
    // etc.
  ]);

  return;
};
