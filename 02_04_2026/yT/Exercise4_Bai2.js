function readUnderthousand(num) {
    if(num === 0) return "không";
    const ones = [
        '',
        'một', 
        'hai',
        'ba',
        'bốn',
        'năm',
        'sáu',
        'bảy',
        'tám',
        'chín',
    ];
    var hundred = Math.floor(num/100);
    var chuc = Math.floor((num%100) / 10);
    var donvi = num % 10;
    var result = '';
    //Hàng trăm
    if (hundred > 0) result = result + ones[hundred] + ' trăm';
    //Hàng chục và đơn vị
    if (chuc > 1) {
        result += (result ? " " : "") + ones[chuc] + " mươi";
        if (donvi === 1) result+= " mốt";
        else if (donvi === 4) result+= " tư";
        else if (donvi === 5) result+= " lăm";
        else if (donvi > 0) result += " " + ones[donvi];
    } else if (chuc === 1){
        result += (result ? " ": "") + "mười";
        if (donvi === 5 ) result += " lăm";
        else if (donvi > 0) result += " " + ones[donvi];
    } else if (chuc === 0) {
        if (donvi > 0){
            if (hundred > 0) result += " linh " + ones[donvi];
            else result += ones[donvi];
        }
    }
    return result.trim();
}
function readUndermilion(num){
    if (num === 0) return "không";
    var result = "";
    var van = Math.floor(num / 10000);
    var ngan = num % 10000;
    //Phần xử lý vạn
    if (van > 0) 
        result += readUnderthousand(van) + " vạn ";
    var thousand = Math.floor(ngan / 1000);
    var underThousand = ngan % 1000;
    //Phần xử lý còn lại
    if (thousand > 0)
        result += readUnderthousand(thousand) + " ngàn ";
    if (underThousand > 0)
        if (underThousand < 100 && thousand > 0){ 
            result += "không trăm ";
        }
        result += readUnderthousand(underThousand);
    return result.trim();
}
console.log(readUndermilion(726503));
console.log(readUndermilion(6052));
console.log(readUndermilion(120021));
//console.log(readUnderthousand(985));
//console.log(readUnderthousand(14));
//console.log(readUnderthousand(44));