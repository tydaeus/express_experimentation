/**
 * routes module
 *
 * finds files within its directory (routes/index) and subdirectories thereof,
 * has router use them
 */

var router = require('express').Router();
var fs = require("fs");

//router.use(require("./main"));

function processDir(dirName) {
    var dirContents = fs.readdirSync(dirName);

    for (var i = 0; i < dirContents.length; i++) {
        var curFile = dirName + "/" + dirContents[i];
        var curStats = fs.statSync(curFile);

        // process directories recursively
        if (curStats.isDirectory()) {
            processDir(curFile);
        }
        // use .js files only
        else if (/^.*\.js$/i.test(dirContents[i])) {
            // ignore this module
            if (__filename !== curFile) {
                console.info("Adding routes in '%s' ", curFile);
                router.use(require(curFile));
            }
        }
    }
}

// convert naming to forward-slash only (in case of windows backslash dir separators)
__filename = __filename.replace(/\\/g, "/");
__dirname = __dirname.replace(/\\/g, "/");

processDir(__dirname);

module.exports = router;