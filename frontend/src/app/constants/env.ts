function isPrivateIP(ip: string): boolean {
    if (ip === 'localhost') {
        return true;
    }

    const parts = ip.split('.');

    if (parts.length !== 4) {
        return false;
    }

    return parts[0] === '10' ||
        (parts[0] === '172' && (parseInt(parts[1], 10) >= 16 && parseInt(parts[1], 10) <= 31)) ||
        (parts[0] === '192' && parts[1] === '168');
}

const BACKEND_HOST_REMOTE = process.env.REACT_APP_BACKEND_HOST_REMOTE;
const BACKEND_HOST_LOCAL = process.env.REACT_APP_BACKEND_HOST_LOCAL;

export const BACKEND_HOST = isPrivateIP(window.location.hostname) ? BACKEND_HOST_LOCAL : BACKEND_HOST_REMOTE;

console.log({
    BACKEND_HOST_REMOTE,
    BACKEND_HOST_LOCAL,
    BACKEND_HOST
})
