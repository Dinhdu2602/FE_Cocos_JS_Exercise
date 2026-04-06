export function createIdGenerator(): () => number {
    let currentId = 0;

    return function(): number {
        currentId = currentId +1;
        return currentId;
    }
}