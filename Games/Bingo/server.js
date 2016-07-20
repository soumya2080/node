(function() {

    'use strict';

    var express = require('express'),
        app = express(),
        path = require('path'),
        bodyParser = require('body-parser'),
        PORT = process.env.PORT || 3000;

    app.use(bodyParser.json());

    // Used for production build
    //app.use(express.static(path.join(__dirname, 'public')));

    app.get('/*', function(req, res) {
        res.send('\
            <!DOCTYPE html>\
            <html>\
            <head>\
                <title>Bingo</title>\
                <base href="/">\
            </head>\
            <body>\
                <div ui-view></div>\
                <script src="bundle.js"></script>\
            </body>\
            </html>\
        ');
    })

    app.listen(PORT, function() {
        console.log('Server running on ' + PORT);
    });

})();