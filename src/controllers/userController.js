const userModel = require("../models/userModel");

class userClass {
    signUp = async (req, res) => {
        try {
            let { name, email, phone, password, address } = req.body;
            let emailExists = await userModel.findOne({ email: email });
            if (emailExists) return res.status(409).json({
                status: "fail",
                msg: "User email already exists"
            });
            let reqBody = {
                name: name,
                email: email,
                phone: phone,
                password: password,
                address: address
            };
            let data = await userModel.create(reqBody);
            return res.status(201).json({
                status: "success",
                msg: "user sign successfully",
                data: data
            });
        } catch (error) {
            return res.status(500).json({
                status: "fail",
                msg: error.toString()
            });
        }
    };

    userProfile = async (req, res) => {
        try {
            let id = req.headers.id;
            let user = await userModel.findById({ _id: id });
            if (!user) return res.status(404).json({
                status: "fail",
                msg: "User not found"
            });
            return res.status(200).json({
                status: "success",
                msg: "User profile",
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                status: "fail",
                msg: error.toString()
            });
        }
    };

    userProfileUpdate = async (req, res) => {
        try {
            let id = req.headers.id;
            console.log(id);
            let { name, img, phone, address } = req.body;
            const update = { name, img, phone, address}
            let user = await userModel.findByIdAndUpdate({_id : id},update,{new:true});
            console.log(user)
            if (!user) return res.status(404).json({
                status: "fail",
                msg: "User not found"
            });
            return res.status(200).json({
                status: "success",
                msg: "User profile updated successfully",
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                status: "fail",
                msg: error.toString()
            });
        }
    };

    userRoleUpdate = async (req,res)=>{
        try {
            let id = req.params.userId;
            let filter = {_id : id};
            let update = {role : "admin"};
            let user = await userModel.findOneAndUpdate(filter,update,{new:true});
            if (!user) return res.status(404).json({
                status: "fail",
                msg: "User not found"
            });
            res.status(200).json({
                status: "success",
                msg: "User role updated successfully",
                data: user
            })
        } catch (error) {
            return res.status(500).json({
                status: "fail",
                msg: error.toString()
            })
        }
    }
}

const userController = new userClass();

module.exports = userController;