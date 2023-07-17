const express = require('express');
const router = express.Router();
const API = require('../controllers/api')
const UtentiApi = require('../controllers/reg')
const multer = require('multer');
const auth = require("../middleware/auth");


// Saving data in the folder
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, '../client/src/assets');

    },
    filename: function (req, file, callback) {
        callback(null,file.originalname);
    }
})
   
//Uploading data with multer
const upload = multer({
    storage: storage,
}).single("image");


// Posts routers
router.get("/Messaggi", API.fetchAllPost);
router.get("/Messaggi/:id", API.fetchPostById);
router.post("/Messaggi/",upload, API.createPost);
router.patch("/Messaggi/:id",upload, API.updatePost);
router.delete("/Messaggi/:id", API.deletePost);
router.post("/Messaggi/comment/:id", API.comment);

// Thread routers
router.post("/thread", API.threadCreation)
router.post("/thread/:id", API.threadAdd)
router.get("/thread/", API.threadGetAll)
router.get("/thread/:id", API.fetchThreadById)


// User routers
router.post("/Registrazione", UtentiApi.createUser);
router.post("/Login", UtentiApi.login);
router.get("/User", UtentiApi.user);
router.get("/Logout", UtentiApi.logout);





module.exports = router;