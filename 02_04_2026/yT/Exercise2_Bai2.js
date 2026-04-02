function RandomInt(minn, maxx) {
    return Math.floor(Math.random() * (maxx - minn + 1)) + minn;
}
console.log(RandomInt(1,10));