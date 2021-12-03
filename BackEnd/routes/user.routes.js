const route = require("express").Router()
const userController = require("../controller/user.controller")
const auth = require("../middleware/auth")
const upload = require("../middleware/imgeUpload")

//Link (API Path) and control it with the functions from user-controller

//Get Routes
route.get("/showAllUsers", auth("Admin"), userController.showAllUsers)
route.get("/profile", auth("User"), userController.profile)

//Post Routes
route.post("/register", userController.register)
route.post("/login", userController.login)
route.post("/logOutAllDev", userController.logOutAllDev)
route.post("/logOut", userController.logOut)
route.post("/imgUpload", auth("User"), upload.single('imgProfile'), async(req, res) => {
    res.send("Done")
})
route.post("/uploadProfilePic", auth("User"), upload.single("imgProfile"), userController.addProfilePic)



// const multer = require ('multer')
// const upload = multer ({des: 'uploads/'})
// route.post("/ProfilePic", auth("User"), upload.single('img'), async(req, res)=>{
//     fs.rename('hello.txt', 'world.txt', () =>{

//     });
//     res.send(req.file)
// })

module.exports = route