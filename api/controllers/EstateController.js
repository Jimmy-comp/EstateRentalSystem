/**
 * EstateController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // action - create
    create: async function (req, res) {

        if (req.method == "GET")
            return res.view('estate/create');

        if (!req.body.Estate)
            return res.badRequest("Form-data not received.");

        await Estate.create(req.body.Estate);

        var models = await Estate.find();

        // return res.view('estate/create'), { estates: models };
        if (req.wantsJSON) {
            return res.json({ message: "Estate created.", url: '/' });    // for ajax request
        } else {
            return res.redirect('/');           // for normal request
        }

    },

    // json function
    json: async function (req, res) {

        var estates = await Estate.find();

        return res.json(estates);
    },

    // action - homepage
    homepage: async function (req, res) {
        var models = await Estate.find({
            where: { highlightprop: "true" },
            sort: 'createdAt desc',
            limit: 4
        });
        return res.view('pages/homepage', { estates: models });
    },

    // action - view
    view: async function (req, res) {

        var model = await Estate.findOne(req.params.id);

        const thatEstate = await Estate.findOne(req.params.id).populate("viewFrom", { id: req.session.userid });

        if (!thatEstate) return res.notFound();

        if (req.wantsJSON) {
            if (!thatEstate.viewFrom.length) {
                return res.json({ estate: model, button: 0 });
            } else {
                return res.json({ estate: model, button: 1 });
            }
        } else {
            if (!thatEstate.viewFrom.length) {
                return res.view('estate/view', { estate: model, button: 0 });
            } else {
                return res.view('estate/view', { estate: model, button: 1 });
            }
        }

    },

    // action - admin
    admin: async function (req, res) {
        var models = await Estate.find();
        return res.view('estate/admin', { estates: models });
    },

    // action - update
    update: async function (req, res) {
        if (req.method == "GET") {

            var model = await Estate.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('estate/update', { estate: model });

        } else {
            if (!req.body.Estate)
                return res.badRequest("Form-data not received.");

            var models = await Estate.update(req.params.id).set({
                title: req.body.Estate.title,
                estatename: req.body.Estate.estatename,
                district: req.body.Estate.district,
                area: req.body.Estate.area,
                rent: req.body.Estate.rent,
                url: req.body.Estate.url,
                roomnum: req.body.Estate.roomnum,
                tenants: req.body.Estate.tenants,
                highlightprop: req.body.Estate.highlightprop || "",
            }).fetch();

            if (models.length == 0) return res.notFound();

            return res.redirect('/estate/admin');
        }
    },

    // action - delete 
    delete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var models = await Estate.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        // return res.redirect("'/estate/admin'");
        if (req.wantsJSON) {
            return res.json({ message: "Estate deleted.", url: '/' });    // for ajax request
        } else {
            return res.redirect('/');           // for normal request
        }

    },

    // search function 
    search: async function (req, res) {
        const qPage = Math.max(req.query.page - 1, 0) || 0;
        const numOfItemsPerPage = 2;

        const qDistrict = req.query.district || "";
        const qRoomnum = parseInt(req.query.roomnum);
        const qMaxArea = parseInt(req.query.maxarea) || 2000;
        const qMinArea = parseInt(req.query.minarea) || 0;
        const qMinRent = parseInt(req.query.minrent) || 0;
        const qMaxRent = parseInt(req.query.maxrent) || 30000;

        var range = { district: { contains: qDistrict }, area: { ">=": qMinArea, "<=": qMaxArea }, rent: { ">=": qMinRent, "<=": qMaxRent } };

        if (isNaN(qRoomnum)) {
            var model = await Estate.find({
                where: range,
                limit: numOfItemsPerPage,
                skip: numOfItemsPerPage * qPage,
                sort: 'createdAt desc'
            });
        } else {
            range.roomnum = qRoomnum;

            model = await Estate.find({
                where: range,
                limit: numOfItemsPerPage,
                skip: numOfItemsPerPage * qPage,
                sort: 'createdAt desc'
            });
        }

        var numOfPage = Math.ceil(await Estate.count({ where: range }) / numOfItemsPerPage);

        if (req.wantsJSON) {
            return res.json({ model: model, count: numOfPage });
        } else {


            return res.view('estate/search', { estate: model, count: numOfPage });
        }

    },

    populate: async function (req, res) {
        var model = await Estate.findOne(req.params.id).populate("viewFrom");

        if (!model) return res.notFound();

        return res.json(model.username);

    },
};

