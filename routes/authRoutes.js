const passport = require('passport')

module.exports = app => {
    app.get('/', (req, res) => {
        console.log(res);
    })

    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        }) 
    )

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/api/current_user')
        })
    
    app.get(
        '/api/current_user', 
        (req, res) => {
            res.send(req.user)
    })
}