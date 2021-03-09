let Client = require('ssh2-sftp-client');
const cliProgress = require('cli-progress');
const utils = require("./deployUtils")
let sftp = new Client();
const path = require('path');
const src = path.join(__dirname, '..', 'build/');
let remote = '/var/www/slotmaster/website';
const total = utils.getTotalSize(`${src}`);

const progress = new cliProgress.Bar({
    format: 'progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total} | Speed: {speed} kbit',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: false
});

sftp.connect({
  host: 'shalamberidze.com',
  port: 22,
  username: "kapana",
  password: "123456"
}).then(() => {
  //console.log('\x1b[32m',"connect",'\x1b[37m')
  //console.log('\x1b[32m',"start upload",'\x1b[37m')

  return sftp.uploadDir(src, remote);
}).then(data => {
    sftp.end().then(r => {
        console.log('\x1b[32m', "\nupload successful", '\x1b[37m')
        progress.stop();
    });
}).catch(err => {
  console.log(err, 'catch error');
})
let sum=0;
sftp.on('upload', info => {
    sum+=utils.getFileSize(info.source);
    progress.update(Math.round(parseFloat(((utils.getMb(sum)/total)*100))), {
        speed: '125'
    });
});

progress.start(100, 0, {
    speed: "N/A"
});
