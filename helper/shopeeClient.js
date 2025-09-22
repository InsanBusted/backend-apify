const SHOPEE_COOKIE = process.env.SHOPEE_COOKIE;

export async function callShopeeAPI(url, body = {}, userAgent = null) {
    const headers = {
        accept: "application/json, text/plain, */*",
        "content-type": "application/json; charset=UTF-8",
        "user-agent": userAgent ||
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
        cookie: SHOPEE_COOKIE,
    };

    const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Shopee API error: ${res.status} - ${text}`);
    }

    return res.json();
}
export async function callShopeeGetAPI(url, userAgent = null) {
    const headers = {
        accept: "application/json, text/plain, */*",
        "content-type": "application/json; charset=UTF-8",
        "user-agent": userAgent ||
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
        cookie: SHOPEE_COOKIE,
    };

    const res = await fetch(url, {
        method: "GET",
        headers,
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Shopee API error: ${res.status} - ${text}`);
    }

    return res.json();
}
