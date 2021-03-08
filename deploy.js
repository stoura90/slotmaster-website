let Client = require('ssh2-sftp-client');
let sftp = new Client();
const path = require('path');

const src = path.join(__dirname,  'build/');
let remote = '/var/www/prod.lider-bet.com/templates/reactive/registration';

sftp.connect({
    host: '10.0.22.188',
    port: 22,
    username: 'root',
    password: "16241624"
}).then(() => {
    console.log('\x1b[32m',"connect",'\x1b[37m')
    console.log('\x1b[32m',"start upload",'\x1b[37m')

    return sftp.uploadDir(src, remote);
}).then(data => {
    console.log(data)
    sftp.end().then(r => console.log('\x1b[32m',"upload successful",'\x1b[37m'));
}).catch(err => {
    console.log(err, 'catch error');
})
