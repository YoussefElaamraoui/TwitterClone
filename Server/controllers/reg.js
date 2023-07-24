require("dotenv").config();
const User = require("../models/utenti");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = class UtentiApi
{

    // Create a new user
    static async createUser(req, res)
    {
        let
        {
            email,
            username,
            password,
            confirm_password
        } = req.body;

        // Validation of password and confirm_password
        if (password != confirm_password)
        {
            return res.status(400).json(
            {
                message: 'le due password non sono uguali'
            });
        }

        let newUser = new User(
        {
            email,
            username,
            password
        });

        // Checking if the username is already used
        User.findOne(
            {
                username: username
            })
            .then(user =>
            {
                if (user)
                {
                    return res.status(400).json(
                    {
                        message: 'lo username è stato già usato'
                    });
                }
                else
                {
                    // Encrypt the password, that will be saved in the database
                    bcrypt.genSalt(10, (err, salt) =>
                    {
                        bcrypt.hash(newUser.password, salt, (err, hash) =>
                        {
                            if (err) throw err;
                            newUser.password = hash;

                            newUser.save().then(user =>
                            {
                                return res.status(200).json(
                                {
                                    message: 'abbiamo registrato il nuovo utente'
                                });
                            });
                        });
                    })
                }
            })
            .catch(err =>
            {
                return res.status(500).json(
                {
                    message: 'Si è verificato un errore durante la ricerca dell\'utente'
                });
            });
    }

    // Do the login of the user 
    static async login(req, res)
    {
        const
        {
            username,
            password
        } = req.body

        if (!username || !password) return res.status(422).json(
        {
            'message': 'Invalid fields'
        })

        const user = await User.findOne({username})
        
        // Questi messaggi potrebbero creare problemi di sicurezza in un progetto reale 

        if (!user) return res.status(401).json(
        {
            message: "username non presente"
        })


        const compare = await bcrypt.compare(password, user.password)

        if (!compare) return res.status(401).json(
            {
                message: "Password non corretta"
            });

        const accessToken = jwt.sign(
            {
                id: user.username
            },
            process.env.ACCES_SECRET_TOKEN,
            {
                expiresIn: '1800s'
            }
        );

        (process.env.ACCES_SECRET_TOKEN);

        const refreshToken = jwt.sign(
            {
                id: user.username
            },
            process.env.REFRESH_SECRET_TOKEN,
            {
                expiresIn: '1d'
            }
        );

        user.refresh_token = refreshToken
        await user.save()

        res.cookie('refresh_token', refreshToken,
        {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.json(
        {
            access_token: accessToken
        })
    }

    //If the user is singed in, show the content
    static async user(req, res)
    {
        const username = req.params.id;
        //cerca tutti i dati dell'utente dato l'username 
        const user = await User.findOne({ username });



        return res.status(200).json(user)
    }

    //Logout of the user, by deleting the tokens 
    static async logout(req, res)
    {
        const cookies = req.cookies;

        if (!cookies.access_token) return res.sendStatus(204);

        const refreshToken = cookies.access_token;
        const user = await User.finOne(
        {
            access_token: refreshToken
        })

        if (!user)
        {
            res.clearCookie('access_token',
            {
                http: true,
                sameSite: 'None',
                secure: true
            });

            return res.sendStatus(204);
        }

        user.access_token = null
        await user.save();

        res.clearCookie('access_token',
        {
            httpOnly: true,
            sameSite: 'None',
            secure: true
        })
        res.sendStatus(204);
    }

    // static async refresh(req, res) {
    //     const cookies = req.cookies;
    //     (cookies);

    //     if (!cookies.refresh_token) return res.sendStatus(400)

    //     const refreshToken = cookies.refresh_token;

    //     const user = await User.findOne({
    //         refresh_token: refreshToken
    //     }).exec();

    //     if (!user) return res.sendStatus(403)

    //     jwt.verify(
    //         refreshToken,
    //         process.env.REFRESH_SECRET_TOKEN,
    //         (err, decoded) => {
    //             // Il mio username è univoco quindi posso fare il compare
    //             if (err || user.username !== decoded.username) return res.sendStatus(403)

    //             const accessToken = jwt.sign({
    //                     username: decoded.username
    //                 },
    //                 process.env.ACCES_SECRET_TOKEN, {
    //                     expiresIn: '1800s'
    //                 }
    //             )

    //             res.json({
    //                 acess_token: accessToken
    //             })

    //         }
    //     )
    // }
};