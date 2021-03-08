let fs = require('fs');
const path = require('path');

function getFileSize(filename) {
    const stats = fs.statSync(filename);
    const {size} = stats;
    /* const i = Math.floor(Math.log(size) / Math.log(1024));
     return (size / Math.pow(1024, i)).toFixed(3) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];*/
    return (size / Math.pow(1024, 1)).toFixed(2) * 1
}
function getMb(total){
    return  (total / Math.pow(1024, 1)).toFixed(3)
}
const getAllFiles = function(dirPath, arrayOfFiles) {
    files = fs.readdirSync(dirPath)

    arrayOfFiles = arrayOfFiles || []

    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
        } else {
            arrayOfFiles.push(path.join( dirPath, file))
        }
    })

    return arrayOfFiles
}
const convertBytes = function(bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]

    if (bytes === 0) {
        return "n/a"
    }

    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))

    if (i === 0) {
        return bytes + " " + sizes[i]
    }

    return parseFloat((bytes / Math.pow(1024, 2)).toFixed(2));
}
const getTotalSize = function(directoryPath) {
    const arrayOfFiles = getAllFiles(directoryPath)
    let totalSize = 0

    arrayOfFiles.forEach(function(filePath) {
        totalSize += fs.statSync(filePath).size
    })

    return convertBytes(totalSize)
}

module.exports={
    getFileSize,
    getTotalSize,
    getMb
}
