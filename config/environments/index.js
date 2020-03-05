'use strict';
const fs = require('fs');
const files = fs.readdirSync(`${__dirname}/`).filter(dir => !dir.match(/(^\.)|index/i));
let CONFIG = {development: {}, production: {}};
for (let file of files) {
    CONFIG[file.split('.')[0]] = require(`./${file}`);
}
export default CONFIG;
