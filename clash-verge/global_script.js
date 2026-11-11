/***
 * Clash Verge Rev 全局扩展脚本（懒人配置）/ Mihomo Party 覆写脚本
 * URL: https://github.com/dahaha-365/YaNet/
 * Modified by Gemini: 集成所有优化（Bug修复、结构重构、正则增强、DNS优化）
 */

// =======================
// 1. 全局配置区域
// =======================

/**
 * 脚本总开关
 * true = 启用 (脚本生效)
 * false = 禁用 (脚本完全不生效，使用订阅原配置)
 */
const enable = true

/**
 * 功能开关：设置 true 启用对应服务的自动分流
 */
const ruleOptions = {
  pt: true,          // PT/BT站点 (独立逻辑)
  openai: true,      // OpenAI/ChatGPT (独立逻辑)
  // --- 以下为通用应用 ---
  apple: true,       // 苹果服务
  google: true,      // Google服务
  microsoft: true,   // 微软服务
  github: true,      // Github
  youtube: true,     // YouTube
  netflix: true,     // Netflix
  disney: true,      // Disney+
  spotify: true,     // Spotify
  tiktok: true,      // TikTok
  telegram: true,    // Telegram
  whatsapp: true,    // WhatsApp
  line: true,        // Line
  bahamut: true,     // 巴哈姆特
  pixiv: true,       // Pixiv
  hbo: true,         // HBO
  tvb: true,         // TVB
  hulu: true,        // Hulu
  primevideo: true,  // Prime Video
  games: true,       // 游戏专用
}

const iconPrefix = 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/';

/**
 * 应用配置列表 (配置驱动核心)
 * 添加新APP只需在这里加一行，不用写复杂的 if 代码
 */
const appConfig = [
  { key: 'youtube', name: 'YouTube', icon: 'YouTube.png', rules: ['GEOSITE,youtube,YouTube'], url: 'https://www.youtube.com/s/desktop/494dd881/img/favicon.ico' },
  { key: 'netflix', name: 'NETFLIX', icon: 'Netflix.png', rules: ['GEOSITE,netflix,NETFLIX'], url: 'https://api.fast.com/netflix/speedtest/v2?https=true' },
  { key: 'disney', name: 'Disney+', icon: 'Disney+.png', rules: ['GEOSITE,disney,Disney+'], url: 'https://disney.api.edge.bamgrid.com/devices' },
  { key: 'tiktok', name: 'Tiktok', icon: 'TikTok.png', rules: ['GEOSITE,tiktok,Tiktok'], url: 'https://www.tiktok.com/' },
  { key: 'spotify', name: 'Spotify', icon: 'Spotify.png', rules: ['GEOSITE,spotify,Spotify'], url: 'http://spclient.wg.spotify.com/signup/public/v1/account' },
  { key: 'bahamut', name: '巴哈姆特', icon: 'Bahamut.png', rules: ['GEOSITE,bahamut,巴哈姆特'], url: 'https://ani.gamer.com.tw/ajax/getdeviceid.php' },
  { key: 'pixiv', name: 'Pixiv', icon: 'https://pixiv.moe/favicon.ico', rules: ['GEOSITE,pixiv,Pixiv'], url: 'https://play-lh.googleusercontent.com/8pFuLOHF62ADcN0ISUAyEueA5G8IF49mX_6Az6pQNtokNVHxIVbS1L2NM62H-k02rLM=w240-h480-rw' },
  { key: 'hbo', name: 'HBO', icon: 'HBO.png', rules: ['GEOSITE,hbo,HBO'], url: 'https://www.hbo.com/favicon.ico' },
  { key: 'tvb', name: 'TVB', icon: 'TVB.png', rules: ['GEOSITE,tvb,TVB'], url: 'https://www.tvb.com/logo_b.svg' },
  { key: 'primevideo', name: 'Prime Video', icon: 'Prime_Video.png', rules: ['GEOSITE,primevideo,Prime Video'], url: 'https://m.media-amazon.com/images/G/01/digital/video/web/logo-min-remaster.png' },
  { key: 'hulu', name: 'Hulu', icon: 'Hulu.png', rules: ['GEOSITE,hulu,Hulu'], url: 'https://auth.hulu.com/v4/web/password/authenticate' },
  { key: 'telegram', name: 'Telegram', icon: 'Telegram.png', rules: ['GEOIP,telegram,Telegram'], url: 'http://www.telegram.org/img/website_icon.svg' },
  { key: 'whatsapp', name: 'WhatsApp', icon: 'WhatsApp.png', rules: ['GEOSITE,whatsapp,WhatsApp'], url: 'https://web.whatsapp.com/data/manifest.json', iconUrl: 'https://static.whatsapp.net/rsrc.php/v3/yP/r/rYZqPCBaG70.png' },
  { key: 'line', name: 'Line', icon: 'Line.png', rules: ['GEOSITE,line,Line'], url: 'https://line.me/page-data/app-data.json' },
  { key: 'games', name: '游戏专用', icon: 'Game.png', rules: ['GEOSITE,category-games@cn,国内网站', 'GEOSITE,category-games,游戏专用'], url: '' },
  { key: 'google', name: '谷歌服务', icon: 'Google_Search.png', rules: ['GEOSITE,google,谷歌服务'], url: 'http://www.google.com/generate_204' },
  { key: 'microsoft', name: '微软服务', icon: 'Microsoft.png', rules: ['GEOSITE,microsoft@cn,国内网站', 'GEOSITE,microsoft,微软服务'], url: 'http://www.msftconnecttest.com/connecttest.txt' },
  { key: 'github', name: 'Github', icon: 'GitHub.png', rules: ['GEOSITE,github,Github'], url: 'https://github.com/robots.txt' },
  // Apple 优化：国内服务直连(AppStore)，国际服务走代理
  { key: 'apple', name: '苹果服务', icon: 'Apple_2.png', rules: ['GEOSITE,apple-cn,直连', 'GEOSITE,apple,苹果服务'], url: 'http://www.apple.com/library/test/success.html' }
]

/**
 * 基础规则
 */
const rules = [
  'RULE-SET,applications,下载软件',
  'PROCESS-NAME,SunloginClient,DIRECT',
  'PROCESS-NAME,SunloginClient.exe,DIRECT',
  'PROCESS-NAME,AnyDesk,DIRECT',
  'PROCESS-NAME,AnyDesk.exe,DIRECT',
  'DOMAIN-SUFFIX,torrentleech.org,PT站',
  'DOMAIN-SUFFIX,dmm.co.jp,JP日本',
  'GEOSITE,category-ads-all,REJECT', // 广告拦截
  'DOMAIN-SUFFIX,vt.hwangzhun.com,DIRECT',
  'DOMAIN-SUFFIX,hf-mirror.com,DIRECT',
  'DOMAIN-SUFFIX,high-logic.com,REJECT'
]

/**
 * 地区节点配置
 */
const regionOptions = {
  excludeHighPercentage: true,
  regions: [
    { name: '🇭🇰香港', regex: /港|🇭🇰|hk|hongkong|hong kong/i, ratioLimit: 2, icon: iconPrefix + 'Hong_Kong.png' },
    { name: 'US美国', regex: /美|🇺🇸|us|united state|america/i, ratioLimit: 2, icon: iconPrefix + 'United_States.png' },
    { name: 'JP日本', regex: /日本|🇯🇵|jp|japan/i, ratioLimit: 2, icon: iconPrefix + 'Japan.png' },
    { name: 'KR韩国', regex: /韩|🇰🇷|kr|korea/i, ratioLimit: 2, icon: iconPrefix + 'Korea.png' },
    { name: 'SG新加坡', regex: /新加坡|🇸🇬|sg|singapore/i, ratioLimit: 2, icon: iconPrefix + 'Singapore.png' },
    { name: 'CN中国大陆', regex: /中国|🇨🇳|cn|china/i, ratioLimit: 2, icon: iconPrefix + 'China_Map.png' },
    { name: 'TW台湾', regex: /台湾|🇹🇼|tw|taiwan|tai wan/i, ratioLimit: 2, icon: iconPrefix + 'China.png' },
    { name: 'GB英国', regex: /英|🇬🇧|uk|united kingdom|great britain/i, ratioLimit: 2, icon: iconPrefix + 'United_Kingdom.png' },
    { name: 'DE德国', regex: /德国|🇩🇪|de|germany/i, ratioLimit: 2, icon: iconPrefix + 'Germany.png' },
    { name: 'MY马来西亚', regex: /马来|my|my|malaysia/i, ratioLimit: 2, icon: iconPrefix + 'Malaysia.png' },
    { name: 'TK土耳其', regex: /土耳其|🇹🇷|tk|turkey/i, ratioLimit: 2, icon: iconPrefix + 'Turkey.png' },
    { name: 'AU澳大利亚', regex: /澳大利亚|澳洲|🇦🇺|au|australia/i, ratioLimit: 2, icon: iconPrefix + 'Australia.png' },
    { name: 'PH菲律宾', regex: /菲律宾|菲|🇵🇭|ph|pilipinas/i, ratioLimit: 2, icon: iconPrefix + 'Philippines.png' },
    { name: 'CA加拿大', regex: /加拿大|加|🇨🇦|ca|canada/i, ratioLimit: 2, icon: iconPrefix + 'Canada.png' },
    { name: 'BR巴西', regex: /巴西|🇧🇷|br|brasil|brazil/i, ratioLimit: 2, icon: iconPrefix + 'Brazil.png' },
    { name: 'TH泰国', regex: /泰国|泰|🇹🇭|th|thailand/i, ratioLimit: 2, icon: iconPrefix + 'Thailand.png' },
    { name: 'RU俄罗斯', regex: /俄罗斯|俄|🇷🇺|ru|russia/i, ratioLimit: 2, icon: iconPrefix + 'Russia.png' },
    { name: 'AR阿根廷', regex: /阿根廷|🇦🇷|ar|argentina/i, ratioLimit: 2, icon: iconPrefix + 'Argentina.png' },
  ],
}

/**
 * DNS 配置
 * 优化：使用纯净国际DNS，并设置 Fake-IP 过滤
 */
const foreignDNS = ['https://1.1.1.1/dns-query', 'https://8.8.8.8/dns-query']
const chinaDNS = ['223.5.5.5', '119.29.29.29']

const dnsConfig = {
  enable: true,
  listen: ':1053',
  ipv6: true,
  'prefer-h3': true,
  'use-hosts': true,
  'use-system-hosts': true,
  'respect-rules': true,
  'enhanced-mode': 'fake-ip',
  'fake-ip-range': '198.18.0.1/16',
  // 修正1：去掉了数组开头的 '*'
  'fake-ip-filter': ['+.lan', '+.local', '+.market.xiaomi.com', 'geosite:cn'],
  // 修正2：nameserver 加入 chinaDNS，保证能解析即便是国外DNS挂了也能解析一些基础连接
  nameserver: [...chinaDNS, ...foreignDNS],
  'proxy-server-nameserver': [...chinaDNS, ...foreignDNS],
  'nameserver-policy': {
    'geosite:private': 'system',
    'rule-set:applications': chinaDNS,
    'geosite:cn,steam@cn,category-games@cn,microsoft@cn,apple@cn': chinaDNS,
  },
}

// 规则集与策略组通用配置
const ruleProviderCommon = { type: 'http', format: 'yaml', interval: 86400 }
const groupBaseOption = {
  interval: 300, timeout: 3000, url: 'http://cp.cloudflare.com/generate_204',
  lazy: true, 'max-failed-times': 3, hidden: false,
}

const ruleProviders = new Map()
ruleProviders.set('applications', {
  ...ruleProviderCommon, behavior: 'classical', format: 'text',
  url: 'https://fastly.jsdelivr.net/gh/DustinWin/ruleset_geodata@clash-ruleset/applications.list',
  path: './ruleset/DustinWin/applications.list',
})

// =======================
// 2. 主逻辑入口
// =======================
function main(config) {
  // [关键修复] 禁用时直接返回，防止报错
  if (!enable) return config

  const proxyCount = config?.proxies?.length ?? 0
  const proxyProviderCount = typeof config?.['proxy-providers'] === 'object' ? Object.keys(config['proxy-providers']).length : 0
  if (proxyCount === 0 && proxyProviderCount === 0) throw new Error('配置文件中未找到任何代理')

  let regionProxyGroups = []
  let otherProxyGroups = config.proxies.map((b) => b.name)

  // 基础设置
  config['allow-lan'] = true
  config['bind-address'] = '*'
  config['mode'] = 'rule'
  config['dns'] = dnsConfig // 应用优化后的DNS
  config['profile'] = { 'store-selected': true, 'store-fake-ip': true }
  config['unified-delay'] = true
  config['tcp-concurrent'] = true
  config['keep-alive-interval'] = 1800
  config['find-process-mode'] = 'strict'
  config['geodata-mode'] = true
  config['geodata-loader'] = 'memconservative'
  config['geo-auto-update'] = true
  config['geo-update-interval'] = 24

  config['ntp'] = { enable: true, 'write-to-system': false, server: 'cn.ntp.org.cn' }
  config['geox-url'] = {
    geoip: 'https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip-lite.dat',
    geosite: 'https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat',
    mmdb: 'https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/country-lite.mmdb',
    asn: 'https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/GeoLite2-ASN.mmdb',
  }

  // Sniffer 配置 (优化：关闭 override-destination 以提高网银/游戏兼容性)
  config['sniffer'] = {
    enable: true, 'force-dns-mapping': true, 'parse-pure-ip': false,
    'override-destination': false,
    sniff: { TLS: { ports: [443, 8443] }, HTTP: { ports: [80, '8080-8880'] }, QUIC: { ports: [443, 8443] } },
    'skip-src-address': ['127.0.0.0/8', '192.168.0.0/16', '10.0.0.0/8', '172.16.0.0/12'],
    'force-domain': ['+.google.com', '+.googleapis.com', '+.googleusercontent.com', '+.youtube.com', '+.facebook.com', '+.messenger.com', '+.fbcdn.net', 'fbcdn-a.akamaihd.net'],
    'skip-domain': ['Mijia Cloud', '+.oray.com'],
  }

  // 处理地区分组 (优化：增强倍率提取正则)
  regionOptions.regions.forEach((region) => {
    let proxies = config.proxies.filter((a) => {
      const regExp = /[xX✕✖⨉倍]\s*(\d+(?:\.\d+)?)|(\d+(?:\.\d+)?)\s*[xX✕✖⨉倍]/i;
      const match = regExp.exec(a.name);
      let multiplier = 1;
      if (match) multiplier = parseFloat(match[1] || match[2]);

      return a.name.match(region.regex) && multiplier <= region.ratioLimit
    }).map(b => b.name)

    if (proxies.length > 0) {
      regionProxyGroups.push({
        ...groupBaseOption, name: region.name, type: 'url-test', tolerance: 50, icon: region.icon, proxies: proxies,
      })
    }
    otherProxyGroups = otherProxyGroups.filter((x) => !proxies.includes(x))
  })

  const proxyGroupsRegionNames = regionProxyGroups.map((value) => value.name)
  if (otherProxyGroups.length > 0) proxyGroupsRegionNames.push('其他节点')

  // 默认节点
  config['proxy-groups'] = [{
    ...groupBaseOption, name: '默认节点', type: 'select',
    proxies: [...proxyGroupsRegionNames, '直连'],
    icon: iconPrefix + 'Proxy.png',
  }]

  config.proxies = config?.proxies || []
  config.proxies.push({ name: '直连', type: 'direct', udp: true })

  // =======================
  // 3. 策略组生成逻辑
  // =======================

  // 特殊策略: PT (需 Rule Provider)
  if (ruleOptions.pt) {
    rules.push('RULE-SET,pt,PT站')
    ruleProviders.set('pt', {
      ...ruleProviderCommon, behavior: 'classical', format: 'text',
      url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-pt.list',
      path: './ruleset/MetaCubeX/category-pt.list',
    })
    config['proxy-groups'].push({
      ...groupBaseOption, name: 'PT站', type: 'select',
      proxies: ['默认节点', ...proxyGroupsRegionNames, '直连'],
      url: 'https://cdn.jsdelivr.net/gh/hwangzhun/Proxy-Config@main/clash-verge/P2P.png',
      icon: 'https://cdn.jsdelivr.net/gh/hwangzhun/Proxy-Config@main/clash-verge/P2P.png',
    })
  }

  // 特殊策略: 国外 AI（含 Apple Intelligence，需 Rule Provider）
  if (ruleOptions.openai) {
    // Apple Intelligence
    rules.push(
      'DOMAIN-SUFFIX,gateway.icloud.com,国外AI',
      'DOMAIN-SUFFIX,apple-relay.apple.com,国外AI',
      'DOMAIN-SUFFIX,apple-relay.fastly-edge.com,国外AI',
      'DOMAIN-SUFFIX,apple-relay.cloudflare.com,国外AI',
      'DOMAIN-SUFFIX,guzzoni.apple.com,国外AI',
      'DOMAIN-SUFFIX,cp4.cloudflare.com,国外AI',
      'DOMAIN-SUFFIX,gspe1-ssl.ls.apple.com,国外AI',
      'DOMAIN-SUFFIX,smoot.apple.com,国外AI',
      'DOMAIN-SUFFIX,apple-relay.akamaized.net,国外AI',
      'DOMAIN-SUFFIX,apple-relay.mask.apple-dns.net,国外AI',
      'DOMAIN-SUFFIX,aapps.mzstatic.com,国外AI',
    )
    rules.push('DOMAIN-SUFFIX,grazie.ai,国外AI', 'DOMAIN-SUFFIX,grazie.aws.intellij.net,国外AI', 'RULE-SET,ai,国外AI')
    ruleProviders.set('ai', {
      ...ruleProviderCommon, behavior: 'classical', format: 'text',
      url: 'https://github.com/dahaha-365/YaNet/raw/refs/heads/dist/rulesets/mihomo/ai.list',
      path: './ruleset/YaNet/ai.list',
    })
    config['proxy-groups'].push({
      ...groupBaseOption, name: '国外AI', type: 'select',
      proxies: ['默认节点', ...proxyGroupsRegionNames, '直连'],
      url: 'https://chat.openai.com/cdn-cgi/trace',
      icon: iconPrefix + 'ChatGPT.png',
    })
  }

  // 通用策略: 配置驱动生成
  appConfig.forEach(app => {
    if (ruleOptions[app.key]) {
      rules.push(...app.rules)
      let iconUrl = app.iconUrl || (app.icon.startsWith('http') ? app.icon : iconPrefix + app.icon)
      config['proxy-groups'].push({
        ...groupBaseOption, name: app.name, type: 'select',
        proxies: ['默认节点', ...proxyGroupsRegionNames, '直连'],
        url: app.url, icon: iconUrl
      })
    }
  })

  // 兜底规则
  rules.push(
    'GEOSITE,private,DIRECT', 'GEOIP,private,DIRECT,no-resolve',
    'GEOSITE,cn,国内网站', 'GEOIP,cn,国内网站,no-resolve',
    'MATCH,其他外网'
  )

  // 兜底策略组
  config['proxy-groups'].push(
    {
      ...groupBaseOption, name: '下载软件', type: 'select',
      proxies: ['直连', 'REJECT', '默认节点', '国内网站', ...proxyGroupsRegionNames],
      icon: iconPrefix + 'Download.png',
    },
    {
      ...groupBaseOption, name: '其他外网', type: 'select',
      proxies: ['默认节点', '国内网站', ...proxyGroupsRegionNames],
      icon: iconPrefix + 'Streaming!CN.png',
    },
    {
      ...groupBaseOption, name: '国内网站', type: 'select',
      proxies: ['直连', '默认节点', ...proxyGroupsRegionNames],
      url: 'http://wifi.vivo.com.cn/generate_204',
      icon: iconPrefix + 'StreamingCN.png',
    }
  )

  config['proxy-groups'] = config['proxy-groups'].concat(regionProxyGroups)
  if (otherProxyGroups.length > 0) {
    config['proxy-groups'].push({
      ...groupBaseOption, name: '其他节点', type: 'select',
      proxies: otherProxyGroups, icon: iconPrefix + 'World_Map.png',
    })
  }

  config['rules'] = rules
  config['rule-providers'] = Object.fromEntries(ruleProviders)

  return config
}
