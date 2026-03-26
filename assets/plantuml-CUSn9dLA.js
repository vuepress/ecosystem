import{G as e,L as t,g as n,h as r,j as i,m as a,s as o,u as s}from"./runtime-core.esm-bundler-DCWUs8Ij.js";import{n as c}from"./app-DlZXEEOA.js";var l=JSON.parse(`{"path":"/zh/plugins/markdown/markdown-chart/plantuml.html","title":"PlantUML","lang":"zh-CN","frontmatter":{"icon":"chart-column-stacked","description":"PlantUML 为你站点中的 Markdown 文件添加 PlantUML 支持。 安装 你可以通过以下方式启用此功能： .vuepress/config.ts 语法 你可以插入 PlantUML 支持的相同内容，例如： 示例","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"PlantUML\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-06-07T08:43:56.000Z\\",\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-chart/plantuml.html"}],["meta",{"property":"og:site_name","content":"VuePress 生态系统"}],["meta",{"property":"og:title","content":"PlantUML"}],["meta",{"property":"og:description","content":"PlantUML 为你站点中的 Markdown 文件添加 PlantUML 支持。 安装 你可以通过以下方式启用此功能： .vuepress/config.ts 语法 你可以插入 PlantUML 支持的相同内容，例如： 示例"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:locale:alternate","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2025-06-07T08:43:56.000Z"}],["meta",{"property":"article:modified_time","content":"2025-06-07T08:43:56.000Z"}],["link",{"rel":"alternate","hreflang":"en-us","href":"https://ecosystem.vuejs.press/plugins/markdown/markdown-chart/plantuml.html"}],["link",{"rel":"alternate","type":"application/atom+xml","href":"https://ecosystem.vuejs.press/zh/atom.xml","title":"VuePress 生态系统 Atom Feed"}],["link",{"rel":"alternate","type":"application/json","href":"https://ecosystem.vuejs.press/zh/feed.json","title":"VuePress 生态系统 JSON Feed"}],["link",{"rel":"alternate","type":"application/rss+xml","href":"https://ecosystem.vuejs.press/zh/rss.xml","title":"VuePress 生态系统 RSS Feed"}]]},"git":{"updatedTime":1749285836000,"contributors":[{"name":"Mister-Hope","username":"Mister-Hope","email":"mister-hope@outlook.com","commits":1,"avatar":"https://avatars.githubusercontent.com/Mister-Hope?v=4","url":"https://github.com/Mister-Hope"}],"changelog":[{"hash":"7f5fdff8c26f865b21697b3c6d29bb49d9b20ba4","time":1749285836000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat: add plugin-markdown-chart (#249)"}]},"autoDesc":true,"filePathRelative":"zh/plugins/markdown/markdown-chart/plantuml.md"}`),u={name:`plantuml.md`};function d(c,l,u,d,f,p){let m=t(`VPPreview`);return i(),s(`div`,null,[l[36]||=a(`<h1 id="plantuml" tabindex="-1"><a class="header-anchor" href="#plantuml"><span>PlantUML</span></a></h1><p>为你站点中的 Markdown 文件添加 <a href="https://plantuml.com/zh/" target="_blank" rel="noopener noreferrer">PlantUML</a> 支持。</p><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2><p>你可以通过以下方式启用此功能：</p><div class="code-block-with-title"><div class="code-block-title-bar" data-title=".vuepress/config.ts"><span>.vuepress/config.ts</span></div><div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-ts"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">markdownChartPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;@vuepress/plugin-markdown-chart&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">export</span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD;"> default</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  plugins</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    markdownChartPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">({</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">      // 启用 PlantUML</span></span>
<span class="line highlighted"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      plantuml</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  ],</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h2 id="语法" tabindex="-1"><a class="header-anchor" href="#语法"><span>语法</span></a></h2><p>你可以插入 <a href="https://plantuml.com/zh/" target="_blank" rel="noopener noreferrer">PlantUML</a> 支持的相同内容，例如：</p><div class="language-md" data-highlighter="shiki" data-ext="md" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-md"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">@startuml</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">内容</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">@enduml</span></span></code></pre></div><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2>`,9),n(m,{title:`序列图`},{content:e(()=>[...l[0]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/ZP11IWGn44NtESM_WD1kPo4J4LSgWvuWa_uz4wOwYPqAChUNH6reN6WM2HJl_-9bNzGjMcSnLe8dRkvmduuxsAfdHWtUQKWHhtolB6gC4qMfthEKgGgyApG6G4krS6_v5RVUCoj7OoY5A6acBY6EI1Cc5wGk_sbv_2ORU5fIpNY-8dr4Y3jI-dYLU4edxFhjL9s_e7jsfXr9AUDs60Pec5dM-QQZVyJ3onjihrWXnl6FPJz4Ux-KRKnwvWAzPcwijyO7eIl4maodnhJydd6iitm2`,alt:`PlantUML Diagram`},null,-1)]]),code:e(()=>[...l[1]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startuml`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`Alice -> Bob: Authentication Request`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`alt successful case`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    Bob -> Alice: Authentication Accepted`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`else some kind of failure`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    Bob -> Alice: Authentication Failure`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    group My own label`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    Alice -> Log : Log attack start`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        loop 1000 times`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`            Alice -> Bob: DNS Attack`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`        end`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    Alice -> Log : Log attack end`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    end`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`else Another type of failure`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`Bob -> Alice: Please repeat`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`end`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@enduml`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),n(m,{title:`用例图`},{content:e(()=>[...l[2]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/NK-xRiCm3Dpr5OTCyH0F6JqKoGSqIvkj2oEpDGkPCamcoESNaeoYw7Ol7icJEQr-drCONaaKvt4M7K3MKDXVZU4JWvObIIINh5snYz65S3LUSNZ1_gtqT1ilGlDh2mv_5CtEMELhSkJFjWK3tYSnY84K_AHvITp_ZxRvCweQIK79ShWniiBumIib956sm3hMrDQmg-KLYY5cLOxEuuTw_XtCjs-ERlsk_7OvXkqVz7rXbsC1xO0JwtYVqmy0`,alt:`PlantUML Diagram`},null,-1)]]),code:e(()=>[...l[3]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startuml`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`:Main Admin: as Admin`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`(Use the application) as (Use)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`User -> (Start)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`User --> (Use)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`Admin ---> (Use)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`note right of Admin : This is an example.`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`note right of (Use)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`A note can also`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`be on several lines`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`end note`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`note "This note is connected\\nto several objects." as N2`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`(Start) .. N2`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`N2 .. (Use)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@enduml`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),n(m,{title:`类图`},{content:e(()=>[...l[4]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/POzDJWCn38NtFeMNxQ8tOD4HHG89gCHqX11YuGbk2KgSAl48yNTtDEbKcOYL_VmzlpZhf1Hry0weJnh9A1f7AM4poLkRjB3pz38unqPj4B2Y7FTa6BEro9a7HeGNFwjLdLiiDPolrfxJ8_zzcLNPSp6bnqYVcS7qn_C0lm5nsx-pqUSNPCUUHJUa18Z9Vl5Y2Ry0B8F7dVNSYJsjR9gd5X2ljzt3MEzkxhlTLJjwIIGevSlQuNYCdD8ZHR5oI1LiIZi6piY7rJVqx7kE2H1RZLOEk0zXiIoofvXlMxEy3jxz0G00`,alt:`PlantUML Diagram`},null,-1)]]),code:e(()=>[...l[5]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startuml`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`abstract class AbstractList`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`abstract AbstractCollection`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`interface List`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`interface Collection`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`List <|-- AbstractList`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`Collection <|-- AbstractCollection`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`Collection <|- List`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`AbstractCollection <|- AbstractList`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`AbstractList <|-- ArrayList`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`class ArrayList {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  Object[] elementData`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  size()`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`enum TimeUnit {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  DAYS`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  HOURS`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  MINUTES`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`annotation SuppressWarnings`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`annotation Annotation {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  annotation with members`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  String foo()`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  String bar()`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@enduml`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),n(m,{title:`活动图`},{content:e(()=>[...l[6]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/PP5BRiCW48Rtd6AMyIO7m8j6YjIgkoWv0OBVDWe6bqUZtBu2ZEisEyJ_q3Spfn25Zsash3mOFnijxpVuRuDud8HL1bTy9OHuw7h6BHwqY14zqmCTBcB4qTaRPF8wFiyJvBsZEC7I8Vg4ZX7nrVHfTQaWoaaTtfr_2A_Ucj-wxCv-xoH28EbizCw4ldpdKFxHDe6MQj5sV8aJXUYMyeHLUc1RMeUB2t4BF15QeY5clI8ImGJiMvld0x-MqhyNhx0AlkfLhJM3C04TMu4oZ7BaeRI7V27YJMXZzgLbNPnoDFpRt3O9NtTAlbwiOFoPWrV2SaAAc1SZ8dQq5R1iy0Ihqcn-0000`,alt:`PlantUML Diagram`},null,-1)]]),code:e(()=>[...l[7]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startuml`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`start`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`:ClickServlet.handleRequest();`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`:new page;`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`if (Page.onSecurityCheck) then (true)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  :Page.onInit();`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  if (isForward?) then (no)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    :Process controls;`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    if (continue processing?) then (no)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      stop`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    endif`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    if (isPost?) then (yes)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      :Page.onPost();`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    else (no)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      :Page.onGet();`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    endif`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    :Page.onRender();`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  endif`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`else (false)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`endif`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`if (do redirect?) then (yes)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  :redirect process;`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`else`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  if (do forward?) then (yes)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    :Forward request;`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  else (no)`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    :Render page template;`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  endif`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`endif`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`stop`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@enduml`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),n(m,{title:`组件图`},{content:e(()=>[...l[8]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/RO_1QiCm44Jl-ef1TnzAUouf9MulfGNxPd9Gh6rZ8caTIOQ4udyFab9iGc_BpEoRtKs8oiV96Z6g_gX-2B9XItZpF8qIlm9uRzilLEZgmOU8LxOZEt9n9u3knN4ya5-hin2EDK5-PYU3GY7L1THGpqxVaUxfgAhdj91ulU59PqAtFIix6i93Bj8gghqA1FbnQKwcj7opqUGXsyCGC0JOoqqgTkegYSTKFASDhon1rinB94jF9J4ByS-d-SBrGQkvU4lFCjwSF_o6d9wikG80`,alt:`PlantUML Diagram`},null,-1)]]),code:e(()=>[...l[9]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startuml`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`package "Some Group" {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  HTTP - [First Component]`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  [Another Component]`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`node "Other Groups" {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  FTP - [Second Component]`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  [First Component] --> FTP`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`cloud {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  [Example 1]`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`database "MySql" {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  folder "This is my folder" {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    [Folder 3]`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  frame "Foo" {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    [Frame 4]`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`[Another Component] --> [Example 1]`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`[Example 1] --> [Folder 3]`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`[Folder 3] --> [Frame 4]`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@enduml`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),n(m,{title:`状态图`},{content:e(()=>[...l[10]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/TP2n3eCm34HtVuNdIWpGhK8H_z2nxO28KMaXaI3yVsKJfo1WS-xUuSFL5Eenp4CFKwW3eJnpnBAKoPYeDs_VDPHZMIvJCbe_VdFa04z9_lZE5IBpb6HozeeYaxF603mkBtvZbfcquuRjw8UbojC57mtGRcSiJe56yki8ACSPhHepYoKqEnjKw-zHTZQe_j8U9MTZ9G3TdN7aphT8tTaINawq8YDOu0a9QXyq5k9VE6uKKa--8ybP0FtE0SbM0YjoTXxw7m00`,alt:`PlantUML Diagram`},null,-1)]]),code:e(()=>[...l[11]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startuml`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`state start1  <<start>>`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`state choice1 <<choice>>`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`state fork1   <<fork>>`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`state join2   <<join>>`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`state end3    <<end>>`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`[*]     --> choice1 : from start\\nto choice`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`start1  --> choice1 : from start stereo\\nto choice`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`choice1 --> fork1   : from choice\\nto fork`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`choice1 --> join2   : from choice\\nto join`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`choice1 --> end3    : from choice\\nto end stereo`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`fork1   ---> State1 : from fork\\nto state`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`fork1   --> State2  : from fork\\nto state`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`State2  --> join2   : from state\\nto join`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`State1  --> [*]     : from state\\nto end`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`join2   --> [*]     : from join\\nto end`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@enduml`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),n(m,{title:`对象图`},{content:e(()=>[...l[12]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuSfFoafDBb7moSzBoS-3yS8JYpCoyz9B429EgKKvcN2UNsfvP7vHDXTNRcA1WdDYGMP9OevpPacbGZMNGgYtWfQk7Sn0XT1WHmKjNLqxP3CLt5EBSXFpAa4IkdOmiskvkA3cAe14aOoriWeDTkHoICrBAStD0G00`,alt:`PlantUML Diagram`},null,-1)]]),code:e(()=>[...l[13]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startuml`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`object London`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`object Washington`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`object Berlin`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`object NewYork`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`map CapitalCity {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,` UK *-> London`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,` USA *--> Washington`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,` Germany *---> Berlin`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`NewYork --> CapitalCity::USA`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@enduml`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),n(m,{title:`部署图`},{content:e(()=>[...l[14]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuShBJqbL01662AOHWccCO9eWcAPWfg62hYv4lOALGavYKcgE8LHSJm-Y6IPk11MlguEO11CtXehRsaADTKZDIodDpG40`,alt:`PlantUML Diagram`},null,-1)]]),code:e(()=>[...l[15]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startuml`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`node node1`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`node node2`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`node node3`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`node node4`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`node node5`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`node1 -- node2 : label1`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`node1 .. node3 : label2`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`node1 ~~ node4 : label3`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`node1 == node5`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@enduml`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),n(m,{title:`时序图`},{content:e(()=>[...l[16]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/RLBBReCm4BplLwp8iOgAGQbKL4KqIkWzX-PO6RmDLXo8R1FIlwyC14oRs-xCUFRbr5YkRNDMO0gk25V83R9LY1Tv8sK02bKN9opK2LjfIxoGbhL01hcikFx1W2gUAmhSCwf6TFzyw23TZf3WbkCdLr9qZBX2KLU5DDHJcyRqU3xXN0XDnc0-S2u7I5zSdBHQMlhAwGWf2ps4AW6GicwGH1CNW-Pr0df925IXDAZg5aJkeY2yXG6uAlSi_Wv0jwFgwg8G89sgBsF0tgUKntB6H82ZxtRtljtiTbamKx31aldeKB2p6t7Nyjz6NEJnJynNF1ueYWEtd6Xmw5jcCKxwBCiofubcwvdgHGndvk0yb3oMrZi9sjex1ou-QYMIWyjz-VqudVf-65nqx4OrbEo92m2HprQ6RyirUcDZWePiSq4hp_HFl5ntlsQs9aomh9M0b2hHdDKl`,alt:`PlantUML Diagram`},null,-1)]]),code:e(()=>[...l[17]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startuml`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`scale 5 as 150 pixels`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`clock clk with period 1`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`binary "enable" as en`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`binary "R/W" as rw`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`binary "data Valid" as dv`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`concise "dataBus" as db`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`concise "address bus" as addr`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@6 as :write_beg`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@10 as :write_end`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@15 as :read_beg`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@19 as :read_end`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@0`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`en is low`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`db is "0x0"`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`addr is "0x03f"`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`rw is low`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`dv is 0`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@:write_beg-3`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,` en is high`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@:write_beg-2`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,` db is "0xDEADBEEF"`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@:write_beg-1`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`dv is 1`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@:write_beg`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`rw is high`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@:write_end`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`rw is low`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`dv is low`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@:write_end+1`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`rw is low`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`db is "0x0"`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`addr is "0x23"`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@12`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`dv is high`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@13 `)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`db is "0xFFFF"`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@20`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`en is low`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`dv is low`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@21 `)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`db is "0x0"`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`highlight :write_beg to :write_end #Gold:Write`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`highlight :read_beg to :read_end #lightBlue:Read`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`db@:write_beg-1 <-> @:write_end : setup time`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`db@:write_beg-1 -> addr@:write_end+1 : hold`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@enduml`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),n(m,{title:`正则图`},{content:e(()=>[...l[18]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/SoWkIImgAKfDJwtWqhSfBgdCITM8ATRAISnBjzM8LbUArTJGqxBNZ37Ij8yfrjAmjofEpYz8JT6qjzE8ZYcE2OxLrhI9qGVhi-DoICrB0Hi50000`,alt:`PlantUML Diagram`},null,-1)]]),code:e(()=>[...l[19]||=[o(`div`,{class:`language-`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startregex`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`/<style(\\s*lang=(['"])(.*?)\\2)?\\s*(?:scoped)?>([\\s\\S]+)<\\/style>`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@endregex`)])])])],-1)]]),_:1}),n(m,{title:`网络图`},{content:e(()=>[...l[20]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/ZP1DQiCm48NtEiNWGXSXf9PmwSAjYJSvGBT95eurE2Qs94OoxW--Ux6mcpHLQD5cqBpvvhrPMrUGwzg6gLxMHGMV3A0YtHbGTNLqpRl_0IXrembU8BhRRF8ypwFKVqkq9TN6rLgDpUVxij7bAODNz62KtvYvDGtsU8Z5n3Z4VAm61g3GzPfE8DkFQJ508IMXjIDVy7ZrDhu7aKHiwdSM2RQ_d1WagzKYMJrcE-L5FDgdqyoudiCsWEPBc4iHHyjGH5qjacodF2FQNn15a2Z-f8ZHsDK5QkMGLD64pi2VnFaCARkPQTPT1HT1aJYBv4rG73w9DOI5j4T4vqDvmW-UkC7Z_-PT-3EE8CpZON-6QZMHZAFPsi06jaObkxRv0W00`,alt:`PlantUML Diagram`},null,-1)]]),code:e(()=>[...l[21]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startuml`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`nwdiag {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  group nightly {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    color = "#FFAAAA";`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    description = "<&clock> Restarted nightly <&clock>";`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    web02;`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    db01;`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  network dmz {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      address = "210.x.x.x/24"`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      user [description = "<&person*4.5>\\n user1"];`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      web01 [address = "210.x.x.1, 210.x.x.20",  description = "<&cog*4>\\nweb01"]`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      web02 [address = "210.x.x.2",  description = "<&cog*4>\\nweb02"];`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  network internal {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      address = "172.x.x.x/24";`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      web01 [address = "172.x.x.1"];`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      web02 [address = "172.x.x.2"];`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      db01 [address = "172.x.x.100",  description = "<&spreadsheet*4>\\n db01"];`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      db02 [address = "172.x.x.101",  description = "<&spreadsheet*4>\\n db02"];`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      ptr  [address = "172.x.x.110",  description = "<&print*4>\\n ptr01"];`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@enduml`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),n(m,{title:`图形界面`},{content:e(()=>[...l[22]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/DOuz2y8m54Ntzolkxk0k8iM2JkBGHIWjHFCqWUGzIQA2RV-x-3NVmpctoiMaaaqeDCnec6DvN6rPE9c04PjR2FcKc0KZrkpCtMl2YCRSlLmmqK03zbSM-6Wk32yBZEYRQ5B1JYttcAWzT6YYQd5VAkFXMF1KZMm_QwrozYd-99O35wz2BJeqJXzmtjf_8zD4RHqqSqSJLIpsVVu5`,alt:`PlantUML Diagram`},null,-1)]]),code:e(()=>[...l[23]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startsalt`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`{+`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`{/ <b>General | Fullscreen | Behavior | Saving }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`{`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`{ Open image in: | ^Smart Mode^ }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`[X] Smooth images when zoomed`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`[X] Confirm image deletion`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`[ ] Show hidden images`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`[Close]`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@endsalt`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),n(m,{title:`架构图`},{content:e(()=>[...l[24]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/fLN1Rjim33rFNq5amx0DS0SCsAL8Z7hkskIGpgY1d79XRIRHQb669BSBjlxx82UExImDckvcYezFV2HbNbY7nbMg4FPUSea65HZA7FAoeE7mZbRu8BK9G_WjtXXTSHvhmsJWorVn96nff2DuTvSOdP6ry1FDEPfi9HKw-dnNMSbaRL1kt3iyfcGUP4PxU2pBGcRefER0RX1jIAnLgPdO7GdA6emGEn4m62Fd1K5Me5G30BGmZc4ut6KTXZsXRxzjq-von5YwoX1CUA6Dgc_RKCMJKwbkj9EBzPoZF9UU1mj87TxJIXSv6Jlmh3THUYhj30kPewCwVdPgz8GVo3gvR0XELfNWkWvCNXGenZ5y2dBzo074awvr4wLTSzOrUi14Y7W2WP7BbGl2i0xqPMjFPcBMiIQYYqvw4v9co2nvMIkmMyCBQGPrNqZK3brlIYhhj283c2kMrfdjeA25REkASYLRrslky6Di3zrGE_wNFp6ItQlK9xXM_dc-C53iwXnKPH3wCNYcHXt08OaRhs__4VVic7CYcjmtTYB4hWnD-Dv1VtukTLRv-3bFaN59c-zqRHsfkZUNq_ezjp-n8ms-9YQ3nPpZsscF9BwT_aFoBCjOAuBt43tYUiw9BcHM_tAwwclISPH4BqwjHteb6JcJFjD3l5S7UFScm5Vbh2hF_eIxHzSzQqeklF3jsU4H4RMA1dAWqQ9Ef-7TD5k8WfR4EHIqSEBxBrHbGR0mMe5R4GmYls9iPP0pWWmjWNLLlXx0XnybyRNHLVdnJAH4OZGQZKJdhmVdpUQ3PlDj8Rk70UVGMLpGRBi6rXPj3zXkEF9BpUSlBeZpIXL_0G00`,alt:`PlantUML Diagram`},null,-1)]]),code:e(()=>[...l[25]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startuml`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`skinparam rectangle<<behavior>> {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`	roundCorner 25`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`sprite $bProcess jar:archimate/business-process`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`sprite $aService jar:archimate/application-service`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`sprite $aComponent jar:archimate/application-component`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`rectangle "Handle claim"  as HC <<$bProcess>><<behavior>> #Business`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`rectangle "Capture Information"  as CI <<$bProcess>><<behavior>> #Business`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`rectangle "Notify\\nAdditional Stakeholders" as NAS <<$bProcess>><<behavior>> #Business`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`rectangle "Validate" as V <<$bProcess>><<behavior>> #Business`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`rectangle "Investigate" as I <<$bProcess>><<behavior>> #Business`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`rectangle "Pay" as P <<$bProcess>><<behavior>> #Business`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`HC *-down- CI`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`HC *-down- NAS`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`HC *-down- V`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`HC *-down- I`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`HC *-down- P`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`CI -right->> NAS`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`NAS -right->> V`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`V -right->> I`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`I -right->> P`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`rectangle "Scanning" as scanning <<$aService>><<behavior>> #Application`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`rectangle "Customer admnistration" as customerAdministration <<$aService>><<behavior>> #Application`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`rectangle "Claims admnistration" as claimsAdministration <<$aService>><<behavior>> #Application`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`rectangle Printing <<$aService>><<behavior>> #Application`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`rectangle Payment <<$aService>><<behavior>> #Application`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`scanning -up-> CI`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`customerAdministration  -up-> CI`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`claimsAdministration -up-> NAS`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`claimsAdministration -up-> V`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`claimsAdministration -up-> I`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`Payment -up-> P`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`Printing -up-> V`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`Printing -up-> P`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`rectangle "Document\\nManagement\\nSystem" as DMS <<$aComponent>> #Application`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`rectangle "General\\nCRM\\nSystem" as CRM <<$aComponent>>  #Application`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`rectangle "Home & Away\\nPolicy\\nAdministration" as HAPA <<$aComponent>> #Application`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`rectangle "Home & Away\\nFinancial\\nAdministration" as HFPA <<$aComponent>>  #Application`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`DMS .up.|> scanning`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`DMS .up.|> Printing`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`CRM .up.|> customerAdministration`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`HAPA .up.|> claimsAdministration`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`HFPA .up.|> Payment`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`legend left`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`Example from the "Archisurance case study" (OpenGroup).`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`See`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`====`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`<$bProcess> :business process`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`====`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`<$aService> : application service`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`====`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`<$aComponent> : application component`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`endlegend`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@enduml`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),n(m,{title:`甘特图`},{content:e(()=>[...l[26]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/nPJ1Jjmm48RFyLFChQUaIIegfA8AKLHwA2qgN2h4OJQUPjquTh0dfTjgtnt5yMuIMCwSOe_j-R_VC_6fPtHSes4M9vutcZwAC3jNM3jiuRz867qpV9FFrl0tR0c-aFv3h2gCmKzMMmUEP9nVgty4nV5kDgI5bTN3yXbMpOMplP7ZeGj7P7wIrlP19CbNPMYChtHF8jcAf5MQF5j3UuJvXackF5h8AKQjgWE2c-TQ0Nmh4cFvgSevkYOWBfpbY-FV7PgQViGaw9nzUANh2e7n_76MVoZUPJlIcxMg6aFUGuXjHUAfGuTiNM0TTEgPZbRrcdV6brcdf7CVIv4Yx9cylJ_aRRgAhdUT7lWlqTNAm53AAvHIcHhA4PTLIrgDNG00y1JuJFdxs36LjfxaGLkTCitp8cp5LfoyZTr_vUnlgXZ2Z-61rmHbNkPfKQPv8SJj3Vgck0D7zxrovA78GUB62zyRYHj0Hp02217wQMMPRIi0Mcfj0LcMnN4Pn_ItqsYGbJM-E10Rzv6HCEIB1EMCe8m4kuL87i40Vp4vYDnlF92H8atXUbz_Lgm9qbJSNXPtiCQk8-F16ZXwES7-iLZsqL2PULDYrKnLpMTL3KNTt_d0CnXCKt5AHeO7w140`,alt:`PlantUML Diagram`},null,-1)]]),code:e(()=>[...l[27]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startgantt`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`<style>`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`ganttDiagram {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`	task {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontName Helvetica`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontColor red`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontSize 18`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontStyle bold`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		BackGroundColor GreenYellow`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		LineColor blue`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`	}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`	milestone {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontColor blue`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontSize 25`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontStyle italic`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		BackGroundColor yellow`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		LineColor red`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`	}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`	note {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontColor DarkGreen`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontSize 10`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		LineColor OrangeRed`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`	}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`	arrow {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontName Helvetica`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontColor red`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontSize 18`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontStyle bold`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		BackGroundColor GreenYellow`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		LineColor blue`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		LineStyle 8.0;13.0`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		LineThickness 3.0`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`	}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`	separator {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		BackgroundColor lightGreen`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		LineStyle 8.0;3.0`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		LineColor red`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		LineThickness 1.0`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontSize 16`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontStyle bold`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontColor purple`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		Margin 5`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		Padding 20`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`	}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`	timeline {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`	    BackgroundColor Bisque`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`	}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`	closed {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		BackgroundColor pink`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontColor red`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`	}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`</style>`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`Project starts the 2020-12-01`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`[Task1] requires 10 days`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`sunday are closed`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`note bottom`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  memo1 ...`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  memo2 ...`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  explanations1 ...`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  explanations2 ...`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`end note`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`[Task2] requires 20 days`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`[Task2] starts 10 days after [Task1]'s end`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`-- Separator title --`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`[M1] happens on 5 days after [Task1]'s end`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`<style>`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`	separator {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`	    LineColor black`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		Margin 0`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		Padding 0`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`	}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`</style>`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`-- end --`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@endgantt`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),n(m,{title:`思维导图`},{content:e(()=>[...l[28]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/JP6xRiCm34LtVWMd3bwAxgaGeCxak05gjEWgMxGjGA84FThwxmlPJk29zznBa7gSOv8XMStAIW-3z4axnb5FEH2-GDB94BOBnkmfu8e05PwUHYCdKLEl9KDLZCcudiHddpbbgAeAhvhp7xQQqufDFaG7tTGNV2TtdnAadyMrhIyR-smYYSwPHNqtkqNE6n9T8cbltUQLMuWF6Nqv3_xgDAF47meB6iSJihIqBZl5jSlsm-av2dmLUElQjsEqZFeUVJcJhNO0Cqb50HxFi3EnsXKCn8a2ZiwLycZS6C3GHAmmw6bEWDZDBfIwsMNEhix4Ql-BVm00`,alt:`PlantUML Diagram`},null,-1)]]),code:e(()=>[...l[29]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startmindmap`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`caption figure 1`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`title My super title`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`* <&flag>Debian`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`** <&globe>Ubuntu`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`*** Linux Mint`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`*** Kubuntu`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`*** Lubuntu`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`*** KDE Neon`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`** <&graph>LMDE`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`** <&pulse>SolydXK`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`** <&people>SteamOS`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`** <&star>Raspbian with a very long name`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`*** <s>Raspmbc</s> => OSMC`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`*** <s>Raspyfi</s> => Volumio`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`header`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`My super header`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`endheader`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`center footer My super footer`)]),r(`
`),o(`span`,{class:`line`},[o(`span`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`legend right`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  Short`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  legend`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`endlegend`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@endmindmap`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),n(m,{title:`工作分解结构图`},{content:e(()=>[...l[30]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/DK-xRiCm3Dpr5Pow2Fg7034Gj2WwE4XsMM8T8ZBfYdID_7qXsntlXRixgSLgww3EmnUky263ynuwJ9GHX1i1FVuiL752DdNUUtZFo4RsWZ7EEzFZBxLujq4FLnevt6RubWf9bgfu27Sf2njYtM6FCHEFpli0vmUcPo6r9WNeKMTXfO4A6Utv09-Ief5mMtc-msqk4ZDqmhZjsAWS3VEnOyPIY4TuWqkDqnIFtgqBcb5T2270zKcb_7z9TI5hTq79K24zH97T2JclW_u1`,alt:`PlantUML Diagram`},null,-1)]]),code:e(()=>[...l[31]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startwbs`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`+ New Job`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`++ Decide on Job Requirements`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`+++ Identity gaps`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`+++ Review JDs`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`++++ Sign-Up for courses`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`++++ Volunteer`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`++++ Reading`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`++- Checklist`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`+++- Responsibilities`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`+++- Location`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`++ CV Upload Done`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`+++ CV Updated`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`++++ Spelling & Grammar`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`++++ Check dates`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`---- Skills`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`+++ Recruitment sites chosen`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@endwbs`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),n(m,{title:`JSON`},{content:e(()=>[...l[32]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/RP6nRi8m48PtFyNfkeAQX8IYJA1k7R8meQg3ImnswzYHVMc5AjwzyYL4GcAnTD_vFl-sjv5aeA_edNZIvgojEMi2j39I8pk5TrIsRL0n8Zm37WrTxhkzzaurG_UfmhWbuzKnGV4d0F1amYIk0T-yThX8U3wk1jntXlI8JTnPyvCeXK4nakTK5fkncFBKaEG062aeHRiPOv53uLhOCsSfJD5hm4Rzmi67xnkF98aZD8SRwdqaQLzzoppFiY9Vhl8iGm5mvGntjwxXdUV6E018bvudjU_Kv8JvIJXV0LLLBVDYLIAthul71dywcUD3nxfSiwEirY-JGm1ySBgZDhODogLa8ucz7s8oki5QSHLRvThq_Vy0`,alt:`PlantUML Diagram`},null,-1)]]),code:e(()=>[...l[33]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startjson`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`#highlight "lastName"`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`#highlight "address" / "city"`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`#highlight "phoneNumbers" / "0" / "number"`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`{`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "firstName": "John",`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "lastName": "Smith",`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "isAlive": true,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "age": 28,`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "address": {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    "streetAddress": "21 2nd Street",`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    "city": "New York",`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    "state": "NY",`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    "postalCode": "10021-3100"`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "phoneNumbers": [`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "type": "home",`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "number": "212 555-1234"`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    },`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    {`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "type": "office",`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "number": "646 555-4567"`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`    }`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "children": [],`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "spouse": null`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@endjson`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),n(m,{title:`YAML`},{content:e(()=>[...l[34]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/NP11ZiCm24NNvXGewtgagErYlEfLc1WdbXmJOJoTt7wKPDSL7o7--_1gHcexhGMYSC21C3Bh3GaJhrJuR0TGsg-XoeQIS9OIkMBhTO0j1xn_ZO_n-Gr_AxM0ffqXATTfyGlN5l0E4vMIw-n_iiOM49p7fVD-rCZlInJfcG-HbEFfvLDEjlXuuC5zU2Jf2kw3uwveNdETMy0dk8tKDCUPJwoRf5SBE89pHIQoBFKyRMDID6KUm5bNA-oZ_1vBzXPuSOt7c_u1`,alt:`PlantUML Diagram`},null,-1)]]),code:e(()=>[...l[35]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startyaml`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`doe: "a deer, a female deer"`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`ray: "a drop of golden sun"`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`pi: 3.14159`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`xmas: true`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`french-hens: 3`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`calling-birds: `)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`	- huey`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`	- dewey`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`	- louie`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`	- fred`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`xmas-fifth-day: `)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`	calling-birds: four`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`	french-hens: 3`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`	golden-rings: 5`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`	partridges: `)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		count: 1`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`		location: "a pear tree"`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`	turtle-doves: two`)]),r(`
`),o(`span`,{class:`line`},[o(`span`,null,`@endyaml`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1})])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};