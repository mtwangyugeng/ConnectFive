export function stringIsAllNumbers(s: string) {
    const re = /^[0-9]*$/;
    return re.test(s);
}