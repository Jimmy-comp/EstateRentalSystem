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
      { title: "3 rooms", estatename: "Bel-Air Residence", district: "Southern District", area: 30, rent: 14000, url: "https://www.ikea.com/images/step-into-living-room-turned-haven-made-just-for-you-with-a--0f78c0738a9904f9ddbbc81dd5af2ffa.jpg?f=s", roomnum: 3, tenants: 2, highlightprop: "" },
      { title: "The Popular Part", estatename: "City Garden", district: "North Point", area: 150, rent: 20000, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdJZEynmnQjySyRJcKgbXLAVZ-M8MY-Vtvwmfh-EPyxfWORsfQ2g", roomnum: 1, tenants: 1, highlightprop: "true" },
      { title: "全港最貴", estatename: "Heng Fa Chuen", district: "Chai Wan", area: 100, rent: 17000, url: "http://images.unsplash.com/photo-1550581190-9c1c48d21d6c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9", roomnum: 3, tenants: 5, highlightprop: "true" },
      // etc.
    ]);
  }

  // const hash1 = await sails.bcrypt.hash('123456', saltRounds);
  const hash2 = await sails.bcrypt.hash('a12345', saltRounds);
  const hash3 = await sails.bcrypt.hash('comp3047', saltRounds);
  const hash4 = await sails.bcrypt.hash('comp2016', saltRounds);

  await User.createEach([
    // { username: "admin", password: hash1, role: "admin" },
    { username: "Doramon", password: hash3, role: "user" },
    { username: "Jimmy", password: hash2, role: "user" },
    { username: "JJLin", password: hash4, role: "user" }
    // etc.
  ]);

  const estate1 = await Estate.findOne({ title: "The Popular Part", estatename: "City Garden" });
  const estate2 = await Estate.findOne({ title: "全港最貴", estatename: "Heng Fa Chuen" });
  const user3 = await User.findOne({ username: "JJLin" });
  const user1 = await User.findOne({ username: "Doramon" });
  const user2 = await User.findOne({ username: "Jimmy" });


  // // await User.addToCollection(admin.id, 'supervises').members([estate1.id, estate2.id]);
  await User.addToCollection(user1.id, 'supervises').members(estate1.id);
  await User.addToCollection(user2.id, 'supervises').members(estate2.id); 
  await User.addToCollection(user3.id, 'supervises').members(estate2.id);

  
};
