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
  '/': 'EstateController.homepage',

  //createform
  'GET /estate/create': 'EstateController.create',

  //view item
  'GET /estate/view/:id': 'EstateController.view',

  //delete item
  // 'POST /estate/delete/:id': 'EstateController.delete',
  'DELETE /estate/:id': 'EstateController.delete',

  //update item
  'GET /estate/update/:id': 'EstateController.update',
  'POST /estate/update/:id': 'EstateController.update',

  //adminpage
  'GET /estate/admin': 'EstateController.admin',

  //search item
  'GET /estate/search': 'EstateController.search',

  //login
  'GET /user/login': 'UserController.login',
  'POST /user/login': 'UserController.login',
  'POST /user/logout': 'UserController.logout',

  //rental relationship
  'GET /estate/:id/viewFrom': 'EstateController.populate',
  'GET /user/:id/supervises': 'UserController.populate',

  //co-rent
  'POST /user/:id/supervises': 'UserController.add',

  //move out
  'DELETE /user/:id/supervises': 'UserController.remove',

  //who rent estate
  'GET /user/:id/occupant': 'UserController.occupants',

  //show my rental
  'GET /user/myrental': 'UserController.myrental',
};
