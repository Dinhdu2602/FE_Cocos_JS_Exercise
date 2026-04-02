function formatmoney(num) {
    return num.toLocaleString("en-US");   
}
 console.log(formatmoney(10000000));
 console.log(formatmoney(123456));
 console.log(formatmoney(12000.02));