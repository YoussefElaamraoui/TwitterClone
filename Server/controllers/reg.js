require("dotenv").config();
const User = require("../models/utenti");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = class UtentiApi {
    static async createUser(req, res) {
        let {
            email,
            username,
            password,
            confirm_password
        } = req.body;

        if (password != confirm_password) {
            return res.status(400).json({
                message: 'le due password non sono uguali'
            });
        }



        let newUser = new User({
            email,
            username,
            password
        });


        console.log(newUser.password)
        User.findOne({
                username: username
            })
            .then(user => {
                if (user) {
                    return res.status(400).json({
                        message: 'lo username è stato già usato'
                    });
                } else {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;

                            newUser.save().then(user => {
                                return res.status(200).json({
                                    message: 'abbiamo registrato il nuovo utente'
                                });
                            });
                        });
                    })
                }
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'Si è verificato un errore durante la ricerca dell\'utente'
                });
            });
    }




    static async login(req, res) {
        try {
            const user = await User.findOne({
                username: req.body.username,
            });


            if (!user) {
                return res.status(400).json({
                    message: 'l utente non è stato trovato'
                });
            }

            const compare = await bcrypt.compare(req.body.password, user.password);

            if (!compare) {
                return res.status(400).json({
                    message: 'le due password non coincidono'
                });
            }

            // Errori qua sotto :
            console.log("arrivo qui");
            console.log(req.body.username);
            
            console.log(process.env.ACCES_SECRET_TOKEN)

            const accessToken = jwt.sign({
                    username: req.body.username
                },
                process.env.ACCES_SECRET_TOKEN, {
                    expiresIn: '18000s'
                }
            );


            console.log(accessToken);

            const refreshToken = jwt.sign({
                    username: req.body.username
                },
                process.env.REFRESH_SECRET_TOKEN, {
                    expiresIn: '1d'
                }
            );

            user.refreshToken = refreshToken;
            await user.save();

            //Ci sono errori qua sopra :-> console.log("supero il user save if")

            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
                sameSite: 'None',
                secure: true
            });
            res.json({
                'access_token': accessToken
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Si è verificato un errore durante il login'
            });
        }
    }




    static async logout(req, res) {
        const cookies = req.cookies;

        console.log("ecco cosa contengono i cookie ")
        console.log(cookies);


        if (!cookies.refresh_token) return res.sendStatus(204);

        const refreshToken = cookies.refresh_token;
        const user = await User.finOne({ refresh_token: refreshToken })

        if (!user) {
            res.clearCookie('refresh_token', { http: true, sameSite: 'None', secure: true });

            return res.sendStatus(204);
        }

        user.refreshToken = null
        await user.save();

        res.clearCookie('refresh_token',{httpOnly:true,sameSite: 'None',secure:true})
        res.sendStatus(204);
    }
};