function randomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
console.log(randomElement([1,2,3,4]));