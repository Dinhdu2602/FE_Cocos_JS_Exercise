function createIdGenerator() {
    var currentId = 0;

    return function() {
        currentId = currentId + 1;
        return currentId;
    };
}
module.exports = createIdGenerator;