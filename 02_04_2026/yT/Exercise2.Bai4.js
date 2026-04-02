function findMissingElement(arr1, arr2) {
    var result = [];
    for(var i = 0; i < arr2.length; i++)
        if(!arr1.includes(arr2[i])) 
            result.push(arr2[i]);
    
   return result; 
}
console.log(findMissingElement([1,2,3,4], [2,3,4,5,6]));