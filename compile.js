const path = require('path'); //directory path, cross validity
const fs = require('fs');  //file system for reading file
const solc = require('solc');

const inboxPath = path.resolve(__dirname,'contracts','Inbox.sol');

const source = fs.readFileSync(inboxPath,'utf8' );

module.exports = solc.compile(source,1).contracts[':Inbox'];