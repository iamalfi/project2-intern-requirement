const collegeModel = require("../model/collegeModel");
const internModel = require("../model/InternModel");

//validator and regex====================================================//

// this regex takes only lowercase and no spaces.
const isValidName = function (name) {
    return /^[a-z]*$/.test(name);
};
//this regex will take single spaces between words.
const isValidfname = function (fullName) {
    return /^[a-zA-Z,'.\s]{0,150}$/.test(fullName);
};
//this regex pattern check the format of http it is the format of simple URL.
let urlregex =
    /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i;

//Create-College============================================//
const createCollege = async function (req, res) {
    try {
        let data = req.body;

        //checking for the empty data
        if (Object.keys(data).length == 0)
            return res
                .status(400)
                .send({ status: false, message: "Please provide some values" });

        //cheking the credentials to be true
        let { name, fullName, logoLink } = data;

        if (!name) {
            return res
                .status(400)
                .send({ status: false, message: "Please provide the name " });
        }
        if (!fullName) {
            return res.status(400).send({
                status: false,
                message: "Please provide the fullName ",
            });
        }
        if (!logoLink) {
            return res.status(400).send({
                status: false,
                message: "Please provide the logoLink",
            });
        }

        //checking for the name
        if (!isValidName(name))
            return res.status(400).send({
                status: false,
                message:
                    "Please provide the name in LOWERCASE and don't give spaces and don't give number also.",
            });
        let uniqueName = await collegeModel.findOne({ name });
        if (uniqueName)
            return res
                .status(400)
                .send({ status: false, messege: "This College already exist" });

        //checking for the fullname
        if (!isValidfname(fullName))
            return res.status(400).send({
                status: false,
                message:
                    "Please provide valid fullname, only single space allowed ",
            });

        //checking for the logolink
        if (!urlregex.test(logoLink))
            return res.status(400).send({
                status: false,
                message: "Please provide logolink in a correct format",
            });

        //creating college
        let collegeData = await collegeModel.create(data);
        return res.status(201).send({ status: true, data: collegeData });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

// get interns data and college data
const getDetails = async function (req, res) {
    try {
        let data = req.query["collegeName"];
        if (!data) return res.status(400).send({ msg: "Enter a collgeName" });

        let collegeDetails = await collegeModel.findOne({
            name: { $eq: data },
        });
        if (!collegeDetails) {
            return res.status(404).send({
                status: false,
                msg: `sorry no college data found with this collegeName `,
            });
        } else {
            let intern = await internModel
                .find({ collegeId: { $eq: collegeDetails["_id"] } })
                .select({
                    name: 1,
                    email: 1,
                    mobile: 1,
                    _id: 1,
                });
            collegeDetails["_id"] = undefined;
            if (intern.length == 0) {
                collegeDetails["interns"] = "This College has no interns";
            } else {
                collegeDetails["interns"] = intern;
            }
            let { name, fullName, logoLink, interns } = collegeDetails; //we are destruction the required key
            let collegeAndinternDetails = { name, fullName, logoLink, interns };
            res.status(200).send({
                status: 200,
                msg: "here is your filtered data",
                data: collegeAndinternDetails,
            });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

module.exports.getDetails = getDetails;
module.exports.createCollege = createCollege;

exports.getDetails = async (req, res) => {
    let data = req.query["collegeName"];
    const collegedetails = await collegeModel.findOne({ name: { $eq: data } });
    let interndetails = await internModel.find({
        collegeId: { $eq: collegedetails._id },
    });
    collegedetails["collegeName"] = undefined;
    collegedetails["intern"] = interndetails;
    let { name, fullName, logoLink, intern } = collegedetails;
    let result = { name, fullName, logoLink, intern };
    res.status(200).json({ status: true, data: result });
};
