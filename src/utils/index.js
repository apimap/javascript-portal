export function createRef(refName) {
    refName = refName.toLocaleLowerCase();
    refName = refName.split(' ').join('-');
    return refName;
}
