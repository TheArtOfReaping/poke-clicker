export function dateAsRng() {
    const date = new Date().getDay();
    return date / 366;
}