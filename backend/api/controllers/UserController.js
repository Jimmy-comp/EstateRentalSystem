/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    login: async function (req, res) {
        if (!req.body.username || !req.body.password) return res.badRequest({ message: "Missing username or password" });

        let user = await User.findOne({ username: req.body.username });

        const match = await sails.bcrypt.compare(req.body.password, user.password);

        if (!user || !match) return res.status(401).json({ message: "Invalid credentials" });

        req.session.regenerate(function (err) {
            if (err) return res.serverError(err);

            req.session.username = user.username;
            req.session.role = user.role;
            req.session.userid = user.id;

            return res.json({
                message: "Login successful",
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role
                }
            });
        });
    },

    logout: async function (req, res) {
        req.session.destroy(function (err) {
            if (err) return res.serverError(err);
            
            return res.json({ message: "Logged out successfully" });
        });
    },

    populate: async function (req, res) {
        var model = await User.findOne(req.params.id).populate("supervises");

        if (!model) return res.notFound({ message: "User not found" });

        return res.json(model);
    },

    // action - add the estate to co-rents' list
    add: async function (req, res) {
        if (!await User.findOne(req.session.userid)) return res.notFound();

        const thatEstate = await Estate.findOne(req.params.id).populate("viewFrom", { id: req.session.userid });

        const count = await Estate.findOne(req.params.id).populate("viewFrom");

        if (!thatEstate) return res.notFound();

        if (thatEstate.viewFrom.length)
            return res.status(409).json({message: "Already added.", url: '/'});   // conflict

        if (count.viewFrom.length >= thatEstate.tenants) {
            return res.status(409).json({message: "The estate has full!!!", url: '/'}); // conflict
        }

        await User.addToCollection(req.session.userid, "supervises").members(req.params.id);

        if (req.wantsJSON) {
            return res.json({ message: "Add Co-rent Successfully.", url: '/' });    // for ajax request
        } else {
            return res.redirect('/');           // for normal request
        }

    },

    // action - remove estate
    remove: async function (req, res) {
        if (!await User.findOne(req.session.userid)) return res.notFound();

        const thatEstate = await Estate.findOne(req.params.id).populate("viewFrom", { id: req.session.userid });

        if (!thatEstate) return res.notFound();

        if (!thatEstate.viewFrom.length)
            return res.status(409).send("Nothing to delete.");    // conflict

        await User.removeFromCollection(req.session.userid, "supervises").members(req.params.id);

        return res.json({ message: "Remove Successfully.", url: '/' });
    },

    // action - find occupant's estate
    occupants: async function (req, res) {
        var model = await Estate.findOne(req.params.id).populate("viewFrom");

        if (!model) return res.notFound();

        return res.json(model);
    },

    // action - supervise the rental
    myrental: async function (req, res) {
        var model = await User.findOne(req.session.userid).populate("supervises");

        if (!model) return res.notFound();

        if(req.wantsJSON){
            return res.json(model.supervises);
        } else {
            return res.view('user/myrental', { estate: model.supervises });
        }
        
    },

    json: async function (req, res) {
        var users = await User.find();
    
        return res.json(users);
    },
};

