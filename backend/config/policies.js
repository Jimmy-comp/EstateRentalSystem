/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/
  EstateController:{
    // Protect create, update, delete → only admins can do these
    create: 'isAdmin',
    update: 'isAdmin',
    delete: 'isAdmin',

    // Publicly accessible
    homepage: true,
    view: true,
    search: true,
    admin: true
  },

  UserController: {
    //create: 'isAdmin'
    populate: 'isAdmin',   // only admins can view full user data
    login: true,
    logout: true
  }
};
