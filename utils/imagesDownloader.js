let fs = require('fs'),
    request = require('request'),
    productsImages = require('../static/mock/products-images.json');

let download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

productsImages.forEach(images => {
    let imgXL = images.urls.imgXL;
    let imgL = images.urls.imgL;
    download(imgXL, getDownloadPath(imgXL), function () {
        console.log('done');
    });
    download(imgL, getDownloadPath(imgL), function () {
        console.log('done');
    });
})

function getDownloadPath(url) {
    let path = url.split('/');
    return './static/images/' + path.pop();
}

function replaceImagesUrls() {
    let file = './static/mock/products-images.json';

    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        var search = new RegExp('https://pixabay.com/get/', 'g');
        let result = data.replace(search, '/images/');

        fs.writeFile(file, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
}

replaceImagesUrls();
