# Quantumult X

自用 Quantumult X 配置。节点订阅和 MITM 证书保存在个人设备，规则直接引用上游维护的列表。

## 导入与使用

1. 导入 [QuantumultX.conf](https://raw.githubusercontent.com/hwangzhun/Proxy-Config/main/quantumult-x/QuantumultX.conf)。
2. 在 Quantumult X 中添加个人节点订阅。本配置不附带可用节点。
3. 检查策略组选择：广告拦截选择 `reject`，苹果服务默认 `direct`，漏网之鱼默认跟随全球加速。App 可能保留旧选择，更新配置后请重新检查。
4. 为国外 AI、Spotify 和流媒体固定可用节点；通用代理可使用“自动选择”测速组。
5. 使用 HTTPS 重写前，在设备内生成、安装并信任个人 MITM 证书。如果曾经信任旧配置附带的共享证书，请先在系统中移除。

证书、密码和个人节点订阅不要提交到公开仓库。此版本已移除共享证书、示例节点及本地 AI 列表更新任务。

## 地区分组

分组依次为美国、香港、日本、韩国、新加坡、台湾、英国、德国、马来西亚、泰国、其他地区。

按节点名称中的国家、旗帜及常见城市自动收录，组内手动选择。其他国家及未识别节点归入“其他地区”，无需为冷门国家单独建组。名称归类不检测真实出口 IP；多地区中转名称可能匹配多个组。

## AI 分流

规则使用 [AI Vendor Rules](https://github.com/TannayeJ/ai-vendor-rules) 的 Quantumult X 原生列表，每天更新，无需自己维护 `AI.list`。

| 规则资源 | 策略 | 用途 |
| --- | --- | --- |
| `all-ai-cn.list` | `direct` | 国产 AI 默认直连 |
| `kimi.list` | `direct` | 补充 Kimi、Moonshot 域名 |
| `minimax.list` | `direct` | 补充 MiniMax、海螺域名 |
| `bytedance-ai-global.list` | `direct` | 补充字节海外 AI 域名，包括 TRAE、Coze 等 |
| `all-ai-global.list` | 国外AI | OpenAI、Gemini、Claude、Grok、Perplexity、Copilot、Cursor 等 |

国产直连资源排在国外 AI 资源之前。以上资源均启用 `inserted-resource=true`，优先于本地分流。

上游覆盖范围会变化，不能保证识别所有新服务、共享接口或自建 AI 地址；未命中的请求继续由其他规则及“漏网之鱼”处理。

## DNS 与其他规则

- DNS 使用阿里和腾讯 DoH，不再固定 `raw.githubusercontent.com` 的 IP。如果当前网络无法访问这两个 DoH，可将 DNS 段改为 `server=223.5.5.5` 和 `server=119.29.29.29`。
- 国内分流使用 blackmatrix7 的 China 列表，保留 `geoip, cn, direct` 补充。
- 机场网站列表仅用于机场相关域名，其余未匹配请求由“漏网之鱼”处理。
- 广告误杀时可临时将“广告拦截”切到 `direct`，根据请求日志排查。

## 重写资源

微博和高德重写已更新到上游现行地址。禁用的重写统一放在 `[rewrite_remote]` 末尾，按 404、403 和待确认分类。

2026-10-10 核验返回 404 的资源暂时禁用；403 仅表示当次环境无法访问。美颜相机脚本直链需要确认导入结果后再启用。更新替代地址或确认内容可用后，可手动恢复对应资源。

## 仓库文件

| 路径 | 内容 |
| --- | --- |
| `QuantumultX.conf` | 导入使用的主配置 |
| `icon/` | 配置图标 |

更新后，在请求日志中检查国外 AI、国产 AI、国内网站和广告的规则命中，并验证登录、AI 语音及流媒体播放。静态检查不能替代设备实测。
