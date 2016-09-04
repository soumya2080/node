module.exports = (app, passport, path, express) => {
    var router = express.Router();
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use('/auth', require('./auth')(router, passport));
    app.get('/*', (req, res) => {
        console.log(req.baseUrl)
        res.sendFile(path.join(__dirname + '/../..', '/index.html'));
    });

}