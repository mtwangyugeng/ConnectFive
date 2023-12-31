export function rand() {
    return Math.random().toString(36).substring(2); // remove `0.`
}

export function generateToken() {
    return rand() + rand(); // to make it longer
}

export function isRegisterValid(username: string, password: string, password2: string) {
    return username.length > 4 && password === password2;
}