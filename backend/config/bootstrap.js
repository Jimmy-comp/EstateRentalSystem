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
  // Clear old data (optional for dev only)
  //await User.destroy({});
  //await Estate.destroy({});

  sails.bcrypt = require('bcryptjs');
  const saltRounds = 10;
  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)

  if (await Estate.count() === 0) {
    await Estate.createEach([
      { title: "Modern Downtown Loft", estatename: "SkyView Residences", district: "Calgary DT", area: 750, rent: 1850, url: "https://assets.rentsync.com/mayfield/images/gallery/768/1738789496946_da30d950062b49844af9f3fab3a3f75a-uncropped_scaled_within_1536_1152.webp", roomnum: 2, tenants: 1, highlighted: true },
      { title: "Family-Friendly Home", estatename: "Maplewood Heights", district: "Brentwood", area: 1200, rent: 2200, url: "https://ap.rdcpix.com/5b1f18d02ed54cd92548bf1ffa3c0ce4l-m1143901444rd-w480_h360.jpg", roomnum: 5, tenants: 4, highlighted: false },
      { title: "Luxury Penthouse", estatename: "The Royal Suites", district: "Mission", area: 1500, rent: 3500, url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/21/97/c0/the-royal-suites-at-lifestyle.jpg?w=900&h=500&s=1", roomnum: 4, tenants: 3, highlighted: true },
      { title: "Cozy Suburban Condo", estatename: "Willow Creek Villas", district: "Varsity", area: 850, rent: 1600, url: "https://www.kromerinvestments.com/wp-content/uploads/Willow-Creek-Villas-Apartments-Sparks-NV-Three-Bedroom-Two-Bathroom-3D-Floor-Plan.jpg", roomnum: 3, tenants: 2, highlighted: true },
      { title: "Student Apartment", estatename: "Campus Living Towers", district: "University", area: 600, rent: 1200, url: "https://image-tc.galaxy.tf/wijpeg-a8r1d6l4tbub3m9zgft3h4l8e/campus-tower-suite-hotel-one-bedroom-suite-full-kitchenette.jpg?width=2000", roomnum: 2, tenants: 3, highlighted: false },
      // etc.
    ]);  

    console.log("Estate Created...");
  }

  const hash1 = await sails.bcrypt.hash('Admin@123', saltRounds);
  const hash2 = await sails.bcrypt.hash('RentMe2025', saltRounds);
  const hash3 = await sails.bcrypt.hash('PassAmy99', saltRounds);
  const hash4 = await sails.bcrypt.hash('SecureLee88', saltRounds);
  const hash5 = await sails.bcrypt.hash('Staff@2025', saltRounds);
  
  if (await User.count() === 0) {
    await User.createEach([
      { username: "admin1", password: hash1, role: "admin" },
      { username: "Jim", password: hash2, role: "landlord" },
      { username: "Jimmy", password: hash3, role: "tenant" },
      { username: "Lee", password: hash4, role: "tenant" },
      { username: "admin2", password: hash5, role: "admin" }
      // etc.
    ]);

    console.log("User Created.......");
  }

  const estate1 = await Estate.findOne({ title: "Modern Downtown Loft", estatename: "SkyView Residences" });
  const estate2 = await Estate.findOne({ title: "Family-Friendly Home", estatename: "Maplewood Heights" });
  const estate3 = await Estate.findOne({ title: "Cozy Suburban Condo", estatename: "Willow Creek Villas" });
  const estate4 = await Estate.findOne({ title: "Student Apartment", estatename: "Campus Living Towers" });
  const user3 = await User.findOne({ username: "Jim" });
  const user1 = await User.findOne({ username: "Jimmy" });
  const user2 = await User.findOne({ username: "Lee" });

  await User.addToCollection(user1.id, 'supervises').members([estate1.id, estate3.id]);
  await User.addToCollection(user2.id, 'supervises').members([estate2.id]); 
  await User.addToCollection(user3.id, 'supervises').members(estate4.id);
  
};
