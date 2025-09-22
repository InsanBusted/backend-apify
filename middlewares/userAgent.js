export function injectUserAgent(req, res, next) {
  req.shopeeUserAgent =
    req.headers["user-agent"] ||
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";
  next();
}
