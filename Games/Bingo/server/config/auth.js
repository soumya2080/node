module.exports = {
    'facebookAuth': {
        'clientId': '1578892575748982',
        'clientSecret': process.env.CLIENT_SECRET,
        'callbackURL': 'http://localhost:4000/auth/facebook/callback',
        'profileFields': ['id', 'displayName', 'photos', 'email', 'name']
    }
}
