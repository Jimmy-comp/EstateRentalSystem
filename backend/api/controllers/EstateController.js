/**
 * EstateController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // action - create
    create: async function (req, res) {
        if (req.method === "GET")
            
            return res.json({
                message: "Use POST to create an estate",
                fields: ["title", "estatename", "district", "area", "rent", "url", "roomnum", "tenants", "highlightprop"],
            });

        if (!req.body.Estate)
            return res.badRequest("Form-data not received.");

        const newEstate = await Estate.create(req.body.Estate).fetch();

        var models = await Estate.find();

        return res.json({
            message: "Estate created successfully",
            estate: newEstate,
        });
    },

    // json function
    json: async function (req, res) {
        let estates = await Estate.find();

        return res.json(estates);
    },

    // action - homepage
    homepage: async function (req, res) {
        let models = await Estate.find({
            where: { highlightprop: true },
            sort: 'createdAt desc',
            limit: 4
        });
        //return res.view('pages/homepage', { estates: models });
        return res.json(models);
    },

    // action - view
    view: async function (req, res) {
        let model = await Estate.findOne({ id: req.params.id });

        const thatEstate = await Estate.findOne({ id: req.params.id }).populate("viewFrom", { id: req.session.userid });

        if (!thatEstate) return res.notFound({ message: "Estate not found" });

        if (!thatEstate.viewFrom.length) {
            return res.json({ estate: model, button: 0 });
        } else {
            return res.json({ estate: model, button: 1 });
        }
    },

    // action - admin
    admin: async function (req, res) {
        let models = await Estate.find();
        //return res.view('estate/admin', { estates: models });
        return res.json(models);
    },

    // action - update
    update: async function (req, res) {
        if (req.method === "GET") {
            let model = await Estate.findOne(req.params.id);

            if (!model) return res.notFound();

            //return res.view('estate/update', { estate: model });
            return res.json(model);
        } else {
            if (!req.body.Estate)
                return res.badRequest("Form-data not received.");

            let models = await Estate.update(req.params.id).set({
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

            if (models.length === 0) return res.notFound();

            return res.json({
                message: "Estate updated successfully",
                estate: models[0], // return the updated estate
            });
        }
    },

    // action - delete 
    delete: async function (req, res) {

        if (req.method === "GET") return res.forbidden();

        let models = await Estate.destroy(req.params.id).fetch();

        if (models.length === 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "Estate deleted.", url: '/' });    // for ajax request
        } else {
            return res.redirect('/');           // for normal request
        }

    },

    // search function 
    search: async function (req, res) {
        //const qPage = Math.max(req.query.page - 1, 0) || 0;
        //const numOfItemsPerPage = 2;
        try{
            console.log("(EstateController.search): Started Searching...");

            const qDistrict = req.query.district || "";
            const qRoomnum = parseInt(req.query.roomnum);
            const qMaxArea = parseInt(req.query.maxarea) || 5000;
            const qMinArea = parseInt(req.query.minarea) || 0;
            const qMinRent = parseInt(req.query.minrent) || 0;
            const qMaxRent = parseInt(req.query.maxrent) || 30000;

            // Build filter condition
            let range = { 
                district: { contains: qDistrict }, 
                area: { ">=": qMinArea, "<=": qMaxArea }, 
                rent: { ">=": qMinRent, "<=": qMaxRent } 
            };

            // Add room filter only if provided
            if (!isNaN(qRoomnum)) {
                range.roomnum = qRoomnum;
            }

            // Find all matching estates
            const estates = await Estate.find({
                where: range,
                sort: "createdAt desc",
                limit: 200
            });

            console.log("(EstateController.search): Matching Estates Found!");

            const count = await Estate.count({ where: range });

            return res.json(estates);
            //return res.json({ model: estates, count: count });
        } catch (err){
            console.log("(EstateController.search) Error: ", err);
            return res.serverError({ message: "Search failed", error: err });
        }
        
        /*if (isNaN(qRoomnum)) {
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

        var numOfPage = Math.ceil(await Estate.count({ where: range }) / numOfItemsPerPage);*/
    },

    populate: async function (req, res) {
        var model = await Estate.findOne(req.params.id).populate("viewFrom");

        if (!model) return res.notFound();

        return res.json(model.username);

    },
};

