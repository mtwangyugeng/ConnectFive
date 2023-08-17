export function rand() {
    return Math.random().toString(36).substring(2); // remove `0.`
}

export function generateToken() {
    return rand() + rand(); // to make it longer
}
