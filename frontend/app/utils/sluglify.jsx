export default function sluglify(text) {
    return text.replace(/\s+/g, "-");
}

export function unsluglify(text) {
    return text.replace(/-/g, " ");
}
