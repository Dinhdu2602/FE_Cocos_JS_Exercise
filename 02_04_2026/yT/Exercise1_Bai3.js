function countWords(str){
    str = str.trim();
    if (str.length === 0) return 0;
    var count = 1;
    for(var i = 0; i < str.length; i++)
    {
        let char = str[i];
        if (char >= "A" && char <= "Z") count ++;
    }
  return count;
}
console.log(countWords('oneTwoThree'));
console.log(countWords('     '));
console.log(countWords(''));
console.log(countWords('a'));
