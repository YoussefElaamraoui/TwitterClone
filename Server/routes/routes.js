const express = require('express');
const router = express.Router();
const API = require('../controllers/api')
const UtentiApi = require('../controllers/reg')
const multer = require('multer');
const authentication = require("../middleware/authentication")


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

router.use(authentication);

// Devo anche mettere che non si può andare nel sito se non si è fatto il login


// Posts routers
router.get("/Messaggi", API.fetchAllPost);
router.get("/Messaggi/:id", API.fetchPostById);
router.post("/Messaggi",upload, API.createPost);
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
router.get("/User/:id", UtentiApi.user);
// Viene usato comunemente con tipologia post e non get
router.post("/Logout", UtentiApi.logout);





module.exports = router;