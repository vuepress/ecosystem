import{B as e,G as t,K as n,L as r,R as i,V as a,W as o,j as s,z as c}from"./app-Bi7MbPbM.js";var l=JSON.parse(`{"path":"/plugins/markdown/markdown-chart/plantuml.html","title":"PlantUML","lang":"en-US","frontmatter":{"icon":"chart-column-stacked","description":"PlantUML Add PlantUML support to the Markdown files in your VuePress site. Installation You can enable this feature via: .vuepress/config.ts Syntax You can insert the same conte...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"PlantUML\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-06-07T08:43:56.000Z\\",\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://ecosystem.vuejs.press/plugins/markdown/markdown-chart/plantuml.html"}],["meta",{"property":"og:site_name","content":"VuePress Ecosystem"}],["meta",{"property":"og:title","content":"PlantUML"}],["meta",{"property":"og:description","content":"PlantUML Add PlantUML support to the Markdown files in your VuePress site. Installation You can enable this feature via: .vuepress/config.ts Syntax You can insert the same conte..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:locale:alternate","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-06-07T08:43:56.000Z"}],["meta",{"property":"article:modified_time","content":"2025-06-07T08:43:56.000Z"}],["link",{"rel":"alternate","hreflang":"zh-cn","href":"https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-chart/plantuml.html"}],["link",{"rel":"alternate","type":"application/atom+xml","href":"https://ecosystem.vuejs.press/atom.xml","title":"VuePress Ecosystem Atom Feed"}],["link",{"rel":"alternate","type":"application/json","href":"https://ecosystem.vuejs.press/feed.json","title":"VuePress Ecosystem JSON Feed"}],["link",{"rel":"alternate","type":"application/rss+xml","href":"https://ecosystem.vuejs.press/rss.xml","title":"VuePress Ecosystem RSS Feed"}]]},"git":{"updatedTime":1749285836000,"contributors":[{"name":"Mister-Hope","username":"Mister-Hope","email":"mister-hope@outlook.com","commits":1,"avatar":"https://avatars.githubusercontent.com/Mister-Hope?v=4","url":"https://github.com/Mister-Hope"}],"changelog":[{"hash":"7f5fdff8c26f865b21697b3c6d29bb49d9b20ba4","time":1749285836000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat: add plugin-markdown-chart (#249)"}]},"autoDesc":true,"filePathRelative":"plugins/markdown/markdown-chart/plantuml.md"}`),u={name:`plantuml.md`};function d(s,l,u,d,f,p){let m=t(`VPPreview`);return o(),i(`div`,null,[l[36]||=c(`<h1 id="plantuml" tabindex="-1"><a class="header-anchor" href="#plantuml"><span>PlantUML</span></a></h1><p>Add <a href="https://plantuml.com/" target="_blank" rel="noopener noreferrer">PlantUML</a> support to the Markdown files in your VuePress site.</p><h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation"><span>Installation</span></a></h2><p>You can enable this feature via:</p><div class="code-block-with-title"><div class="code-block-title-bar" data-title=".vuepress/config.ts"><span>.vuepress/config.ts</span></div><div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-ts"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">markdownChartPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;@vuepress/plugin-markdown-chart&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">export</span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD;"> default</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  plugins</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    markdownChartPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">({</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">      // Enable PlantUML</span></span>
<span class="line highlighted"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      plantuml</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  ],</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h2 id="syntax" tabindex="-1"><a class="header-anchor" href="#syntax"><span>Syntax</span></a></h2><p>You can insert the same content that <a href="https://plantuml.com/" target="_blank" rel="noopener noreferrer">plantuml</a> supports, for example:</p><div class="language-md" data-highlighter="shiki" data-ext="md" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-md"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">@startuml</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">content</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">@enduml</span></span></code></pre></div><h2 id="demo" tabindex="-1"><a class="header-anchor" href="#demo"><span>Demo</span></a></h2>`,9),a(m,{title:`Sequence Diagram`},{content:n(()=>[...l[0]||=[r(`img`,{src:`https://www.plantuml.com/plantuml/svg/ZP11IWGn44NtESM_WD1kPo4J4LSgWvuWa_uz4wOwYPqAChUNH6reN6WM2HJl_-9bNzGjMcSnLe8dRkvmduuxsAfdHWtUQKWHhtolB6gC4qMfthEKgGgyApG6G4krS6_v5RVUCoj7OoY5A6acBY6EI1Cc5wGk_sbv_2ORU5fIpNY-8dr4Y3jI-dYLU4edxFhjL9s_e7jsfXr9AUDs60Pec5dM-QQZVyJ3onjihrWXnl6FPJz4Ux-KRKnwvWAzPcwijyO7eIl4maodnhJydd6iitm2`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[1]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,`@startuml`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Alice -> Bob: Authentication Request`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`alt successful case`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    Bob -> Alice: Authentication Accepted`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`else some kind of failure`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    Bob -> Alice: Authentication Failure`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    group My own label`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    Alice -> Log : Log attack start`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        loop 1000 times`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`            Alice -> Bob: DNS Attack`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`        end`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    Alice -> Log : Log attack end`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    end`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`else Another type of failure`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Bob -> Alice: Please repeat`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`end`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@enduml`)])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(m,{title:`Use Case`},{content:n(()=>[...l[2]||=[r(`img`,{src:`https://www.plantuml.com/plantuml/svg/NK-xRiCm3Dpr5OTCyH0F6JqKoGSqIvkj2oEpDGkPCamcoESNaeoYw7Ol7icJEQr-drCONaaKvt4M7K3MKDXVZU4JWvObIIINh5snYz65S3LUSNZ1_gtqT1ilGlDh2mv_5CtEMELhSkJFjWK3tYSnY84K_AHvITp_ZxRvCweQIK79ShWniiBumIib956sm3hMrDQmg-KLYY5cLOxEuuTw_XtCjs-ERlsk_7OvXkqVz7rXbsC1xO0JwtYVqmy0`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[3]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,`@startuml`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`:Main Admin: as Admin`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`(Use the application) as (Use)`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`User -> (Start)`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`User --> (Use)`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Admin ---> (Use)`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`note right of Admin : This is an example.`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`note right of (Use)`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`A note can also`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`be on several lines`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`end note`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`note "This note is connected\\nto several objects." as N2`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`(Start) .. N2`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`N2 .. (Use)`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@enduml`)])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(m,{title:`Class`},{content:n(()=>[...l[4]||=[r(`img`,{src:`https://www.plantuml.com/plantuml/svg/POzDJWCn38NtFeMNxQ8tOD4HHG89gCHqX11YuGbk2KgSAl48yNTtDEbKcOYL_VmzlpZhf1Hry0weJnh9A1f7AM4poLkRjB3pz38unqPj4B2Y7FTa6BEro9a7HeGNFwjLdLiiDPolrfxJ8_zzcLNPSp6bnqYVcS7qn_C0lm5nsx-pqUSNPCUUHJUa18Z9Vl5Y2Ry0B8F7dVNSYJsjR9gd5X2ljzt3MEzkxhlTLJjwIIGevSlQuNYCdD8ZHR5oI1LiIZi6piY7rJVqx7kE2H1RZLOEk0zXiIoofvXlMxEy3jxz0G00`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[5]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,`@startuml`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`abstract class AbstractList`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`abstract AbstractCollection`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`interface List`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`interface Collection`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`List <|-- AbstractList`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Collection <|-- AbstractCollection`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Collection <|- List`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`AbstractCollection <|- AbstractList`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`AbstractList <|-- ArrayList`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`class ArrayList {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  Object[] elementData`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  size()`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`enum TimeUnit {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  DAYS`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  HOURS`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  MINUTES`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`annotation SuppressWarnings`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`annotation Annotation {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  annotation with members`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  String foo()`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  String bar()`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@enduml`)])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(m,{title:`Activity`},{content:n(()=>[...l[6]||=[r(`img`,{src:`https://www.plantuml.com/plantuml/svg/PP5BRiCW48Rtd6AMyIO7m8j6YjIgkoWv0OBVDWe6bqUZtBu2ZEisEyJ_q3Spfn25Zsash3mOFnijxpVuRuDud8HL1bTy9OHuw7h6BHwqY14zqmCTBcB4qTaRPF8wFiyJvBsZEC7I8Vg4ZX7nrVHfTQaWoaaTtfr_2A_Ucj-wxCv-xoH28EbizCw4ldpdKFxHDe6MQj5sV8aJXUYMyeHLUc1RMeUB2t4BF15QeY5clI8ImGJiMvld0x-MqhyNhx0AlkfLhJM3C04TMu4oZ7BaeRI7V27YJMXZzgLbNPnoDFpRt3O9NtTAlbwiOFoPWrV2SaAAc1SZ8dQq5R1iy0Ihqcn-0000`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[7]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,`@startuml`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`start`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`:ClickServlet.handleRequest();`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`:new page;`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`if (Page.onSecurityCheck) then (true)`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  :Page.onInit();`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  if (isForward?) then (no)`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    :Process controls;`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    if (continue processing?) then (no)`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      stop`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    endif`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    if (isPost?) then (yes)`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      :Page.onPost();`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    else (no)`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      :Page.onGet();`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    endif`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    :Page.onRender();`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  endif`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`else (false)`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`endif`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`if (do redirect?) then (yes)`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  :redirect process;`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`else`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  if (do forward?) then (yes)`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    :Forward request;`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  else (no)`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    :Render page template;`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  endif`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`endif`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`stop`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@enduml`)])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(m,{title:`Component`},{content:n(()=>[...l[8]||=[r(`img`,{src:`https://www.plantuml.com/plantuml/svg/RO_1QiCm44Jl-ef1TnzAUouf9MulfGNxPd9Gh6rZ8caTIOQ4udyFab9iGc_BpEoRtKs8oiV96Z6g_gX-2B9XItZpF8qIlm9uRzilLEZgmOU8LxOZEt9n9u3knN4ya5-hin2EDK5-PYU3GY7L1THGpqxVaUxfgAhdj91ulU59PqAtFIix6i93Bj8gghqA1FbnQKwcj7opqUGXsyCGC0JOoqqgTkegYSTKFASDhon1rinB94jF9J4ByS-d-SBrGQkvU4lFCjwSF_o6d9wikG80`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[9]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,`@startuml`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`package "Some Group" {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  HTTP - [First Component]`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  [Another Component]`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`node "Other Groups" {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  FTP - [Second Component]`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  [First Component] --> FTP`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`cloud {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  [Example 1]`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`database "MySql" {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  folder "This is my folder" {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    [Folder 3]`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  frame "Foo" {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    [Frame 4]`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`[Another Component] --> [Example 1]`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`[Example 1] --> [Folder 3]`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`[Folder 3] --> [Frame 4]`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@enduml`)])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(m,{title:`State`},{content:n(()=>[...l[10]||=[r(`img`,{src:`https://www.plantuml.com/plantuml/svg/TP2n3eCm34HtVuNdIWpGhK8H_z2nxO28KMaXaI3yVsKJfo1WS-xUuSFL5Eenp4CFKwW3eJnpnBAKoPYeDs_VDPHZMIvJCbe_VdFa04z9_lZE5IBpb6HozeeYaxF603mkBtvZbfcquuRjw8UbojC57mtGRcSiJe56yki8ACSPhHepYoKqEnjKw-zHTZQe_j8U9MTZ9G3TdN7aphT8tTaINawq8YDOu0a9QXyq5k9VE6uKKa--8ybP0FtE0SbM0YjoTXxw7m00`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[11]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,`@startuml`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`state start1  <<start>>`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`state choice1 <<choice>>`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`state fork1   <<fork>>`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`state join2   <<join>>`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`state end3    <<end>>`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`[*]     --> choice1 : from start\\nto choice`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`start1  --> choice1 : from start stereo\\nto choice`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`choice1 --> fork1   : from choice\\nto fork`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`choice1 --> join2   : from choice\\nto join`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`choice1 --> end3    : from choice\\nto end stereo`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`fork1   ---> State1 : from fork\\nto state`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`fork1   --> State2  : from fork\\nto state`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`State2  --> join2   : from state\\nto join`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`State1  --> [*]     : from state\\nto end`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`join2   --> [*]     : from join\\nto end`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@enduml`)])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(m,{title:`Object`},{content:n(()=>[...l[12]||=[r(`img`,{src:`https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuSfFoafDBb7moSzBoS-3yS8JYpCoyz9B429EgKKvcN2UNsfvP7vHDXTNRcA1WdDYGMP9OevpPacbGZMNGgYtWfQk7Sn0XT1WHmKjNLqxP3CLt5EBSXFpAa4IkdOmiskvkA3cAe14aOoriWeDTkHoICrBAStD0G00`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[13]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,`@startuml`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`object London`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`object Washington`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`object Berlin`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`object NewYork`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`map CapitalCity {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,` UK *-> London`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,` USA *--> Washington`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,` Germany *---> Berlin`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`NewYork --> CapitalCity::USA`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@enduml`)])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(m,{title:`Deployment`},{content:n(()=>[...l[14]||=[r(`img`,{src:`https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuShBJqbL01662AOHWccCO9eWcAPWfg62hYv4lOALGavYKcgE8LHSJm-Y6IPk11MlguEO11CtXehRsaADTKZDIodDpG40`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[15]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,`@startuml`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`node node1`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`node node2`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`node node3`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`node node4`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`node node5`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`node1 -- node2 : label1`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`node1 .. node3 : label2`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`node1 ~~ node4 : label3`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`node1 == node5`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@enduml`)])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(m,{title:`Timing`},{content:n(()=>[...l[16]||=[r(`img`,{src:`https://www.plantuml.com/plantuml/svg/RLBBReCm4BplLwp8iOgAGQbKL4KqIkWzX-PO6RmDLXo8R1FIlwyC14oRs-xCUFRbr5YkRNDMO0gk25V83R9LY1Tv8sK02bKN9opK2LjfIxoGbhL01hcikFx1W2gUAmhSCwf6TFzyw23TZf3WbkCdLr9qZBX2KLU5DDHJcyRqU3xXN0XDnc0-S2u7I5zSdBHQMlhAwGWf2ps4AW6GicwGH1CNW-Pr0df925IXDAZg5aJkeY2yXG6uAlSi_Wv0jwFgwg8G89sgBsF0tgUKntB6H82ZxtRtljtiTbamKx31aldeKB2p6t7Nyjz6NEJnJynNF1ueYWEtd6Xmw5jcCKxwBCiofubcwvdgHGndvk0yb3oMrZi9sjex1ou-QYMIWyjz-VqudVf-65nqx4OrbEo92m2HprQ6RyirUcDZWePiSq4hp_HFl5ntlsQs9aomh9M0b2hHdDKl`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[17]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,`@startuml`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`scale 5 as 150 pixels`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`clock clk with period 1`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`binary "enable" as en`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`binary "R/W" as rw`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`binary "data Valid" as dv`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`concise "dataBus" as db`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`concise "address bus" as addr`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@6 as :write_beg`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@10 as :write_end`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@15 as :read_beg`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@19 as :read_end`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@0`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`en is low`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`db is "0x0"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`addr is "0x03f"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`rw is low`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`dv is 0`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@:write_beg-3`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,` en is high`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@:write_beg-2`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,` db is "0xDEADBEEF"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@:write_beg-1`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`dv is 1`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@:write_beg`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`rw is high`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@:write_end`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`rw is low`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`dv is low`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@:write_end+1`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`rw is low`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`db is "0x0"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`addr is "0x23"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@12`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`dv is high`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@13 `)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`db is "0xFFFF"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@20`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`en is low`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`dv is low`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@21 `)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`db is "0x0"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`highlight :write_beg to :write_end #Gold:Write`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`highlight :read_beg to :read_end #lightBlue:Read`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`db@:write_beg-1 <-> @:write_end : setup time`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`db@:write_beg-1 -> addr@:write_end+1 : hold`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@enduml`)])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(m,{title:`RegExp`},{content:n(()=>[...l[18]||=[r(`img`,{src:`https://www.plantuml.com/plantuml/svg/SoWkIImgAKfDJwtWqhSfBgdCITM8ATRAISnBjzM8LbUArTJGqxBNZ37Ij8yfrjAmjofEpYz8JT6qjzE8ZYcE2OxLrhI9qGVhi-DoICrB0Hi50000`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[19]||=[r(`div`,{class:`language-`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,`@startregex`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`/<style(\\s*lang=(['"])(.*?)\\2)?\\s*(?:scoped)?>([\\s\\S]+)<\\/style>`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@endregex`)])])])],-1)]]),_:1}),a(m,{title:`Network`},{content:n(()=>[...l[20]||=[r(`img`,{src:`https://www.plantuml.com/plantuml/svg/ZP1DQiCm48NtEiNWGXSXf9PmwSAjYJSvGBT95eurE2Qs94OoxW--Ux6mcpHLQD5cqBpvvhrPMrUGwzg6gLxMHGMV3A0YtHbGTNLqpRl_0IXrembU8BhRRF8ypwFKVqkq9TN6rLgDpUVxij7bAODNz62KtvYvDGtsU8Z5n3Z4VAm61g3GzPfE8DkFQJ508IMXjIDVy7ZrDhu7aKHiwdSM2RQ_d1WagzKYMJrcE-L5FDgdqyoudiCsWEPBc4iHHyjGH5qjacodF2FQNn15a2Z-f8ZHsDK5QkMGLD64pi2VnFaCARkPQTPT1HT1aJYBv4rG73w9DOI5j4T4vqDvmW-UkC7Z_-PT-3EE8CpZON-6QZMHZAFPsi06jaObkxRv0W00`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[21]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,`@startuml`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`nwdiag {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  group nightly {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    color = "#FFAAAA";`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    description = "<&clock> Restarted nightly <&clock>";`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    web02;`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    db01;`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  network dmz {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      address = "210.x.x.x/24"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      user [description = "<&person*4.5>\\n user1"];`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      web01 [address = "210.x.x.1, 210.x.x.20",  description = "<&cog*4>\\nweb01"]`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      web02 [address = "210.x.x.2",  description = "<&cog*4>\\nweb02"];`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  network internal {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      address = "172.x.x.x/24";`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      web01 [address = "172.x.x.1"];`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      web02 [address = "172.x.x.2"];`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      db01 [address = "172.x.x.100",  description = "<&spreadsheet*4>\\n db01"];`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      db02 [address = "172.x.x.101",  description = "<&spreadsheet*4>\\n db02"];`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      ptr  [address = "172.x.x.110",  description = "<&print*4>\\n ptr01"];`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@enduml`)])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(m,{title:`Salt`},{content:n(()=>[...l[22]||=[r(`img`,{src:`https://www.plantuml.com/plantuml/svg/DOuz2y8m54Ntzolkxk0k8iM2JkBGHIWjHFCqWUGzIQA2RV-x-3NVmpctoiMaaaqeDCnec6DvN6rPE9c04PjR2FcKc0KZrkpCtMl2YCRSlLmmqK03zbSM-6Wk32yBZEYRQ5B1JYttcAWzT6YYQd5VAkFXMF1KZMm_QwrozYd-99O35wz2BJeqJXzmtjf_8zD4RHqqSqSJLIpsVVu5`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[23]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,`@startsalt`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`{+`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`{/ <b>General | Fullscreen | Behavior | Saving }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`{`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`{ Open image in: | ^Smart Mode^ }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`[X] Smooth images when zoomed`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`[X] Confirm image deletion`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`[ ] Show hidden images`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`[Close]`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@endsalt`)])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(m,{title:`Archimate`},{content:n(()=>[...l[24]||=[r(`img`,{src:`https://www.plantuml.com/plantuml/svg/fLN1Rjim33rFNq5amx0DS0SCsAL8Z7hkskIGpgY1d79XRIRHQb669BSBjlxx82UExImDckvcYezFV2HbNbY7nbMg4FPUSea65HZA7FAoeE7mZbRu8BK9G_WjtXXTSHvhmsJWorVn96nff2DuTvSOdP6ry1FDEPfi9HKw-dnNMSbaRL1kt3iyfcGUP4PxU2pBGcRefER0RX1jIAnLgPdO7GdA6emGEn4m62Fd1K5Me5G30BGmZc4ut6KTXZsXRxzjq-von5YwoX1CUA6Dgc_RKCMJKwbkj9EBzPoZF9UU1mj87TxJIXSv6Jlmh3THUYhj30kPewCwVdPgz8GVo3gvR0XELfNWkWvCNXGenZ5y2dBzo074awvr4wLTSzOrUi14Y7W2WP7BbGl2i0xqPMjFPcBMiIQYYqvw4v9co2nvMIkmMyCBQGPrNqZK3brlIYhhj283c2kMrfdjeA25REkASYLRrslky6Di3zrGE_wNFp6ItQlK9xXM_dc-C53iwXnKPH3wCNYcHXt08OaRhs__4VVic7CYcjmtTYB4hWnD-Dv1VtukTLRv-3bFaN59c-zqRHsfkZUNq_ezjp-n8ms-9YQ3nPpZsscF9BwT_aFoBCjOAuBt43tYUiw9BcHM_tAwwclISPH4BqwjHteb6JcJFjD3l5S7UFScm5Vbh2hF_eIxHzSzQqeklF3jsU4H4RMA1dAWqQ9Ef-7TD5k8WfR4EHIqSEBxBrHbGR0mMe5R4GmYls9iPP0pWWmjWNLLlXx0XnybyRNHLVdnJAH4OZGQZKJdhmVdpUQ3PlDj8Rk70UVGMLpGRBi6rXPj3zXkEF9BpUSlBeZpIXL_0G00`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[25]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,`@startuml`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`skinparam rectangle<<behavior>> {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`	roundCorner 25`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`sprite $bProcess jar:archimate/business-process`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`sprite $aService jar:archimate/application-service`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`sprite $aComponent jar:archimate/application-component`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`rectangle "Handle claim"  as HC <<$bProcess>><<behavior>> #Business`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`rectangle "Capture Information"  as CI <<$bProcess>><<behavior>> #Business`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`rectangle "Notify\\nAdditional Stakeholders" as NAS <<$bProcess>><<behavior>> #Business`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`rectangle "Validate" as V <<$bProcess>><<behavior>> #Business`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`rectangle "Investigate" as I <<$bProcess>><<behavior>> #Business`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`rectangle "Pay" as P <<$bProcess>><<behavior>> #Business`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`HC *-down- CI`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`HC *-down- NAS`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`HC *-down- V`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`HC *-down- I`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`HC *-down- P`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`CI -right->> NAS`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`NAS -right->> V`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`V -right->> I`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`I -right->> P`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`rectangle "Scanning" as scanning <<$aService>><<behavior>> #Application`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`rectangle "Customer admnistration" as customerAdministration <<$aService>><<behavior>> #Application`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`rectangle "Claims admnistration" as claimsAdministration <<$aService>><<behavior>> #Application`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`rectangle Printing <<$aService>><<behavior>> #Application`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`rectangle Payment <<$aService>><<behavior>> #Application`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`scanning -up-> CI`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`customerAdministration  -up-> CI`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`claimsAdministration -up-> NAS`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`claimsAdministration -up-> V`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`claimsAdministration -up-> I`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Payment -up-> P`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Printing -up-> V`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Printing -up-> P`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`rectangle "Document\\nManagement\\nSystem" as DMS <<$aComponent>> #Application`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`rectangle "General\\nCRM\\nSystem" as CRM <<$aComponent>>  #Application`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`rectangle "Home & Away\\nPolicy\\nAdministration" as HAPA <<$aComponent>> #Application`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`rectangle "Home & Away\\nFinancial\\nAdministration" as HFPA <<$aComponent>>  #Application`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`DMS .up.|> scanning`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`DMS .up.|> Printing`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`CRM .up.|> customerAdministration`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`HAPA .up.|> claimsAdministration`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`HFPA .up.|> Payment`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`legend left`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Example from the "Archisurance case study" (OpenGroup).`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`See`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`====`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`<$bProcess> :business process`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`====`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`<$aService> : application service`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`====`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`<$aComponent> : application component`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`endlegend`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@enduml`)])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(m,{title:`Gantt`},{content:n(()=>[...l[26]||=[r(`img`,{src:`https://www.plantuml.com/plantuml/svg/nPJ1Jjmm48RFyLFChQUaIIegfA8AKLHwA2qgN2h4OJQUPjquTh0dfTjgtnt5yMuIMCwSOe_j-R_VC_6fPtHSes4M9vutcZwAC3jNM3jiuRz867qpV9FFrl0tR0c-aFv3h2gCmKzMMmUEP9nVgty4nV5kDgI5bTN3yXbMpOMplP7ZeGj7P7wIrlP19CbNPMYChtHF8jcAf5MQF5j3UuJvXackF5h8AKQjgWE2c-TQ0Nmh4cFvgSevkYOWBfpbY-FV7PgQViGaw9nzUANh2e7n_76MVoZUPJlIcxMg6aFUGuXjHUAfGuTiNM0TTEgPZbRrcdV6brcdf7CVIv4Yx9cylJ_aRRgAhdUT7lWlqTNAm53AAvHIcHhA4PTLIrgDNG00y1JuJFdxs36LjfxaGLkTCitp8cp5LfoyZTr_vUnlgXZ2Z-61rmHbNkPfKQPv8SJj3Vgck0D7zxrovA78GUB62zyRYHj0Hp02217wQMMPRIi0Mcfj0LcMnN4Pn_ItqsYGbJM-E10Rzv6HCEIB1EMCe8m4kuL87i40Vp4vYDnlF92H8atXUbz_Lgm9qbJSNXPtiCQk8-F16ZXwES7-iLZsqL2PULDYrKnLpMTL3KNTt_d0CnXCKt5AHeO7w140`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[27]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,`@startgantt`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`<style>`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`ganttDiagram {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`	task {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		FontName Helvetica`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		FontColor red`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		FontSize 18`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		FontStyle bold`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		BackGroundColor GreenYellow`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		LineColor blue`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`	}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`	milestone {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		FontColor blue`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		FontSize 25`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		FontStyle italic`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		BackGroundColor yellow`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		LineColor red`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`	}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`	note {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		FontColor DarkGreen`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		FontSize 10`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		LineColor OrangeRed`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`	}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`	arrow {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		FontName Helvetica`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		FontColor red`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		FontSize 18`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		FontStyle bold`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		BackGroundColor GreenYellow`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		LineColor blue`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		LineStyle 8.0;13.0`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		LineThickness 3.0`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`	}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`	separator {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		BackgroundColor lightGreen`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		LineStyle 8.0;3.0`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		LineColor red`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		LineThickness 1.0`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		FontSize 16`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		FontStyle bold`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		FontColor purple`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		Margin 5`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		Padding 20`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`	}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`	timeline {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`	    BackgroundColor Bisque`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`	}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`	closed {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		BackgroundColor pink`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		FontColor red`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`	}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`</style>`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`Project starts the 2020-12-01`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`[Task1] requires 10 days`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`sunday are closed`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`note bottom`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  memo1 ...`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  memo2 ...`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  explanations1 ...`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  explanations2 ...`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`end note`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`[Task2] requires 20 days`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`[Task2] starts 10 days after [Task1]'s end`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`-- Separator title --`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`[M1] happens on 5 days after [Task1]'s end`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`<style>`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`	separator {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`	    LineColor black`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		Margin 0`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		Padding 0`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`	}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`</style>`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`-- end --`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@endgantt`)])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(m,{title:`Mindmap`},{content:n(()=>[...l[28]||=[r(`img`,{src:`https://www.plantuml.com/plantuml/svg/JP6xRiCm34LtVWMd3bwAxgaGeCxak05gjEWgMxGjGA84FThwxmlPJk29zznBa7gSOv8XMStAIW-3z4axnb5FEH2-GDB94BOBnkmfu8e05PwUHYCdKLEl9KDLZCcudiHddpbbgAeAhvhp7xQQqufDFaG7tTGNV2TtdnAadyMrhIyR-smYYSwPHNqtkqNE6n9T8cbltUQLMuWF6Nqv3_xgDAF47meB6iSJihIqBZl5jSlsm-av2dmLUElQjsEqZFeUVJcJhNO0Cqb50HxFi3EnsXKCn8a2ZiwLycZS6C3GHAmmw6bEWDZDBfIwsMNEhix4Ql-BVm00`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[29]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,`@startmindmap`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`caption figure 1`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`title My super title`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`* <&flag>Debian`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`** <&globe>Ubuntu`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`*** Linux Mint`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`*** Kubuntu`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`*** Lubuntu`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`*** KDE Neon`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`** <&graph>LMDE`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`** <&pulse>SolydXK`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`** <&people>SteamOS`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`** <&star>Raspbian with a very long name`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`*** <s>Raspmbc</s> => OSMC`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`*** <s>Raspyfi</s> => Volumio`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`header`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`My super header`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`endheader`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`center footer My super footer`)]),e(`
`),r(`span`,{class:`line`},[r(`span`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`legend right`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  Short`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  legend`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`endlegend`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@endmindmap`)])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(m,{title:`WBS`},{content:n(()=>[...l[30]||=[r(`img`,{src:`https://www.plantuml.com/plantuml/svg/DK-xRiCm3Dpr5Pow2Fg7034Gj2WwE4XsMM8T8ZBfYdID_7qXsntlXRixgSLgww3EmnUky263ynuwJ9GHX1i1FVuiL752DdNUUtZFo4RsWZ7EEzFZBxLujq4FLnevt6RubWf9bgfu27Sf2njYtM6FCHEFpli0vmUcPo6r9WNeKMTXfO4A6Utv09-Ief5mMtc-msqk4ZDqmhZjsAWS3VEnOyPIY4TuWqkDqnIFtgqBcb5T2270zKcb_7z9TI5hTq79K24zH97T2JclW_u1`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[31]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,`@startwbs`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`+ New Job`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`++ Decide on Job Requirements`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`+++ Identity gaps`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`+++ Review JDs`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`++++ Sign-Up for courses`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`++++ Volunteer`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`++++ Reading`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`++- Checklist`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`+++- Responsibilities`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`+++- Location`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`++ CV Upload Done`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`+++ CV Updated`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`++++ Spelling & Grammar`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`++++ Check dates`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`---- Skills`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`+++ Recruitment sites chosen`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@endwbs`)])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(m,{title:`JSON`},{content:n(()=>[...l[32]||=[r(`img`,{src:`https://www.plantuml.com/plantuml/svg/RP6nRi8m48PtFyNfkeAQX8IYJA1k7R8meQg3ImnswzYHVMc5AjwzyYL4GcAnTD_vFl-sjv5aeA_edNZIvgojEMi2j39I8pk5TrIsRL0n8Zm37WrTxhkzzaurG_UfmhWbuzKnGV4d0F1amYIk0T-yThX8U3wk1jntXlI8JTnPyvCeXK4nakTK5fkncFBKaEG062aeHRiPOv53uLhOCsSfJD5hm4Rzmi67xnkF98aZD8SRwdqaQLzzoppFiY9Vhl8iGm5mvGntjwxXdUV6E018bvudjU_Kv8JvIJXV0LLLBVDYLIAthul71dywcUD3nxfSiwEirY-JGm1ySBgZDhODogLa8ucz7s8oki5QSHLRvThq_Vy0`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[33]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,`@startjson`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`#highlight "lastName"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`#highlight "address" / "city"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`#highlight "phoneNumbers" / "0" / "number"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`{`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  "firstName": "John",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  "lastName": "Smith",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  "isAlive": true,`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  "age": 28,`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  "address": {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    "streetAddress": "21 2nd Street",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    "city": "New York",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    "state": "NY",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    "postalCode": "10021-3100"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  },`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  "phoneNumbers": [`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      "type": "home",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      "number": "212 555-1234"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    },`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    {`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      "type": "office",`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`      "number": "646 555-4567"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`    }`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  ],`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  "children": [],`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`  "spouse": null`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`}`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@endjson`)])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1}),a(m,{title:`YAML`},{content:n(()=>[...l[34]||=[r(`img`,{src:`https://www.plantuml.com/plantuml/svg/NP11ZiCm24NNvXGewtgagErYlEfLc1WdbXmJOJoTt7wKPDSL7o7--_1gHcexhGMYSC21C3Bh3GaJhrJuR0TGsg-XoeQIS9OIkMBhTO0j1xn_ZO_n-Gr_AxM0ffqXATTfyGlN5l0E4vMIw-n_iiOM49p7fVD-rCZlInJfcG-HbEFfvLDEjlXuuC5zU2Jf2kw3uwveNdETMy0dk8tKDCUPJwoRf5SBE89pHIQoBFKyRMDID6KUm5bNA-oZ_1vBzXPuSOt7c_u1`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[35]||=[r(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[r(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[r(`code`,{class:`language-`},[r(`span`,{class:`line`},[r(`span`,null,`@startyaml`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`doe: "a deer, a female deer"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`ray: "a drop of golden sun"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`pi: 3.14159`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`xmas: true`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`french-hens: 3`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`calling-birds: `)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`	- huey`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`	- dewey`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`	- louie`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`	- fred`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`xmas-fifth-day: `)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`	calling-birds: four`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`	french-hens: 3`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`	golden-rings: 5`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`	partridges: `)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		count: 1`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`		location: "a pear tree"`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`	turtle-doves: two`)]),e(`
`),r(`span`,{class:`line`},[r(`span`,null,`@endyaml`)])])]),r(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`}),r(`div`,{class:`line-number`})])],-1)]]),_:1})])}var f=s(u,[[`render`,d]]);export{l as _pageData,f as default};