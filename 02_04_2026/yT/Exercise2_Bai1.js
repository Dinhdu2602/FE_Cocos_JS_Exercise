function factorial(num){
    if (num <= 1) return 1
    else return num * factorial(num-1);
}
function combination(n,k) {
    return factorial(n)/(factorial(k)*factorial(n-k));
}
console.log(combination(5,2));
console.log(combination(5,3));