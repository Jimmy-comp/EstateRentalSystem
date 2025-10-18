/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  //homepage
  //'/': 'EstateController.homepage',
  'GET /': {action: 'estate/homepage'},

  //createform
  //'GET /estate/create': 'EstateController.create',
  'POST /estate/create': { action: 'estate/create' },

  //view item by id
  //'GET /estate/view/:id': 'EstateController.view',
  'GET /estate/:id': { action: 'estate/view' },

  //delete item
  // 'POST /estate/delete/:id': 'EstateController.delete',
  //'DELETE /estate/:id': 'EstateController.delete',
  'DELETE /estate/delete/:id': { action: 'estate/delete' },

  //update item
  //'GET /estate/update/:id': 'EstateController.update',
  //'POST /estate/update/:id': 'EstateController.update',
  'PUT /estate/update/:id': { action: 'estate/update' },

  //adminpage
  //'GET /estate/admin': 'EstateController.admin',
  'GET /estate/admin': { action: 'estate/admin' },

  //search item
  //'GET /estate/search': 'EstateController.search',
  'GET /estates/search': { action: 'estate/search' },
  
  //login
  //'GET /user/login': 'UserController.login',
  //'POST /user/login': 'UserController.login',
  //'POST /user/logout': 'UserController.logout',
  'GET /user/login': { action: 'user/login' },
  'POST /user/login': { action: 'user/login' },
  'POST /user/logout': { action: 'user/logout' },

  //rental relationship
  //'GET /estate/:id/viewFrom': 'EstateController.populate',
  //'GET /user/:id/supervises': 'UserController.populate',
  'GET /estate/:id/viewFrom': { action: 'estate/populate' },
  'GET /user/:id/supervises': { action: 'user/populate' },

  // Add estate to myrental list
  //'POST /user/:id/supervises': 'UserController.add',
  'POST /user/:id/supervises': { action: 'user/add'},

  // Remove rental from myrental list
  //'DELETE /user/:id/supervises': 'UserController.remove',
  'DELETE /user/:id/supervises': { action: 'user/remove' },

  //who rent estate
  //'GET /user/:id/occupant': 'UserController.occupants',
  'GET /user/:id/occupant': { action: 'user/occupanta' },

  //show my rental
  //'GET /user/myrental': 'UserController.myrental',
  'GET /user/myrental': { action: 'user/myrental' },

  // Get All Estates
  //'GET /estate/json': 'EstateController.json',
  'GET /estates': { action: 'estate/json' },

  //Get All Users
  //'GET /user/json': 'UserController.json',
  'GET /users': { action: 'user/json' },
};
