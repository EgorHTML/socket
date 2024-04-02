export function setCookies(req, res) {
    res.setHeader('Set-Cookie', 'isCookie=true');
    res.end('cookie-set')
}

export function getCookies(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" })
    console.log(parseCookies(req), 'cookie');
    res.end('cookie-get')
}

export function parseCookies(request) {
    const list = {};
    const cookieHeader = request.headers?.cookie;
    if (!cookieHeader) return list;

    cookieHeader.split(`;`).forEach(function (cookie) {
        let [name, ...rest] = cookie.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        list[name] = decodeURIComponent(value);
    });

    return list;
}