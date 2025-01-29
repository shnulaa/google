const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (req, res) => {
    let target = "https://api.groq.com/"; // 默认的代理目标
    let proxyUrl = null;

    // 尝试解析请求 URL，查找是否有类似 "https://www.example.com" 这样的模式
    try {
        const urlMatch = req.url.match(/^(https?:\/\/[^\/]+)/);
        if(urlMatch) {
            proxyUrl = urlMatch[0]; // 提取匹配到的 URL (例如 "https://www.example.com")
            target = proxyUrl; // 更新代理目标
            // 将请求路径从包含 URL 的部分开始移除
             req.url = req.url.substring(proxyUrl.length);

        }

    } catch (error) {
      console.error("Failed to parse URL:", error);

    }


    createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: {

        },
    })(req, res);
};
