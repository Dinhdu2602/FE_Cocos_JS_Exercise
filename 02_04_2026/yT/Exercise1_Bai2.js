function formatmoneyShort(num) {
    if (num >= 1e9) return ( num / 1e9).toFixed(2).replace(/\.00$/,'') + "B";
    if (num >= 1e6) return ( num / 1e6).toFixed(2).replace(/\.00$/,'') + "M";
    if (num >= 1e3) return ( num / 1e3).toFixed(2).replace(/\.00$/,'') + "K"; 
    return num.toString();
}
console.log(formatmoneyShort(1000));
console.log(formatmoneyShort(1123400000));
console.log(formatmoneyShort(1342222));