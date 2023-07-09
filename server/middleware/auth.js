// Checking if the user is authenticated
function auth(req, res, next) {
    console.log(req.user);

    if (req.user?.id) {
        next();
    } else {
        return res.sendStatus(401);
    }
}

module.exports = auth;

