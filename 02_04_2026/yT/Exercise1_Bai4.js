function ExtensionofFile(file) {
    var parts = file.split(".");
    var extension = parts[parts.length - 1];
    return extension;
}
console.log(ExtensionofFile("image.png"));
console.log(ExtensionofFile("Sound.mp3"));
console.log(ExtensionofFile(".env"));
console.log(ExtensionofFile("info.4.js"));