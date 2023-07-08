const express = require('express');
const router = express.Router();
const API = require('../controllers/api')
const UtentiApi = require('../controllers/reg')
const multer = require('multer');




// Per il salvataggio dei file nella cartella, in client 
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, '../client copia/src/assets');

    },
    filename: function (req, file, callback) {
        callback(null,file.originalname);
    }
})
   
//con multer faccio l'upload
const upload = multer({
    storage: storage,
}).single("image");


// Per la parte dei messaggi/post 
router.get("/Messaggi", API.fetchAllPost);
router.get("/Messaggi/:id", API.fetchPostById);
router.post("/Messaggi/",upload, API.createPost);

//Patch permette di fare l'update
router.patch("/Messaggi/:id",upload, API.updatePost);

router.delete("/Messaggi/:id", API.deletePost);


// Funziona ora

router.post("/Registrazione", UtentiApi.createUser);
router.post("/Login", UtentiApi.login);
router.get("/Logout", UtentiApi.logout);



module.exports = router;