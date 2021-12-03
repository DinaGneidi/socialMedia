const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jsonWebToken = require("jsonwebtoken")

class User {

    //Register new user => (Admin or User)
    static register = async(req, res) => {
        try {
            const newUser = new userModel({...req.body, role: "User" })
            await newUser.save()
            res.status(200).send({ APIstatus: true, message: "User Added Successfully" })
        } catch (e) {
            res.status(500).send({ APIstatus: false, message: e.message })
        }
    }
    static adminRegister = async(req, res) => {
            try {
                if (!req.body.role || req.body.role === "User") throw new Error("Pleas Enter Admin Type")
                const newAdmin = new userModel(req.body)
                await newAdmin.save()
                res.status(200).send({
                    APIstatus: true,
                    data: newAdmin,
                    message: "Added Successfuly"
                })
            } catch (e) {
                res.status(500).send({ APIstatus: false, message: e.message })
            }
        }
        //Login
    static login = async(req, res) => { //Login Authentication
        try {
            const userData = await userModel.findOne({ email: req.body.email })
            if (!userData) throw new Error("User not found..!")
            const passwordValidation = await bcrypt.compare(req.body.password, userData.password)
            if (!passwordValidation) throw new Error("Invalid Password..!")
            const token = jsonWebToken.sign({ _id: userData._id }, "TokenDecPass")
            userData.tokens.push({ token })
            userData.save()
            res.status(200).send({
                APIstatus: true,
                data: { userData, token },
                message: "Login Successfully"
            })
        } catch (e) {
            res.status(500).send({
                APIstatus: false,
                message: e.message
            })
        }
    }

    //Option for only (Admin) to show all registered users
    static showAllUsers = async(req, res) => { //Display All Users
        try {
            const userData = await userModel.find()
            if (userData.length > 0) {
                res.status(200).send({
                    APIstatus: true,
                    data: userData
                })
            } else {
                res.status(200).send({
                    APIstatus: false,
                    data: "No Data To Show"
                })
            }
        } catch (e) {
            res.status(500).send({
                APIstatus: false,
                message: e.message
            })
        }
    }

    //Option for only (Users) to view account profile
    static profile = async(req, res) => {
        res.send(req.user)
    }
    static updateProfileSettings = async(req, res) => {
        try {
            const userData = await userModel.findByIdAndUpdate(req.params.id, {
                $set: {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    birthDate: req.body.birthDate,
                    password: req.body.password
                }
            })
            await userData.save()
            res.status(200).send({
                APIstatus: true,
                message: "Data Updated Successfully"
            })
        } catch (e) {
            res.status(500).send({
                APIstatus: false,
                message: e.message
            })
        }

    }

    static addProfilePic = async(req, res) => {
        try {
            await userModel.updateOne({
                profilePic: req.file.path
            })
            res.status(200).send({
                APIstatus: true,
                message: "Uploaded Successfully"
            })
        } catch (e) {
            res.status(500).send({
                APIstatus: false,
                message: e.message
            })
        }

    }

    //Option for all (Admin & Users) => logout from all devices
    static logOutAllDev = async(req, res) => {
        try {
            req.user.tokens = []
            await req.user.save()
            res.send({ 'Status': "done" })
        } catch (e) {
            res.send({ 'Status': "Failed... :c" })
        }
    }

    //Option for all (Admin & Users) => logout from one device
    static logOut = async(req, res) => {
        req.user.tokens = req.user.tokens.filter(t => {
            return t.token != req.token
        })
        req.user.save()
        res.send({ "Status": 'Logout Successfully..:)' })
    }
}
module.exports = User