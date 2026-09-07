import{A as e,I as t,W as n,h as r,l as i,m as a,o,p as s}from"./runtime-core.esm-bundler-vf-dv2ij.js";import{n as c}from"./app-BMBvQ1IK.js";var l=JSON.parse(`{"path":"/plugins/markdown/markdown-chart/plantuml.html","title":"PlantUML","lang":"en-US","frontmatter":{"icon":"chart-column-stacked","description":"PlantUML Add PlantUML support to the Markdown files in your VuePress site. Installation You can enable this feature via: .vuepress/config.ts Syntax You can insert the same conte...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"PlantUML\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-06-07T08:43:56.000Z\\",\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://ecosystem.vuejs.press/ecosystem/plugins/markdown/markdown-chart/plantuml.html"}],["meta",{"property":"og:site_name","content":"VuePress Ecosystem"}],["meta",{"property":"og:title","content":"PlantUML"}],["meta",{"property":"og:description","content":"PlantUML Add PlantUML support to the Markdown files in your VuePress site. Installation You can enable this feature via: .vuepress/config.ts Syntax You can insert the same conte..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:locale:alternate","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-06-07T08:43:56.000Z"}],["meta",{"property":"article:modified_time","content":"2025-06-07T08:43:56.000Z"}],["link",{"rel":"alternate","hreflang":"zh-cn","href":"https://ecosystem.vuejs.press/ecosystem/zh/plugins/markdown/markdown-chart/plantuml.html"}],["link",{"rel":"alternate","type":"application/atom+xml","href":"https://ecosystem.vuejs.press/ecosystem/atom.xml","title":"VuePress Ecosystem Atom Feed"}],["link",{"rel":"alternate","type":"application/json","href":"https://ecosystem.vuejs.press/ecosystem/feed.json","title":"VuePress Ecosystem JSON Feed"}],["link",{"rel":"alternate","type":"application/rss+xml","href":"https://ecosystem.vuejs.press/ecosystem/rss.xml","title":"VuePress Ecosystem RSS Feed"}]]},"git":{"updatedTime":1749285836000,"contributors":[{"name":"Mister-Hope","username":"Mister-Hope","email":"mister-hope@outlook.com","commits":1,"avatar":"https://avatars.githubusercontent.com/Mister-Hope?v=4","url":"https://github.com/Mister-Hope"}],"changelog":[{"hash":"7f5fdff8c26f865b21697b3c6d29bb49d9b20ba4","time":1749285836000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat: add plugin-markdown-chart (#249)"}]},"autoDesc":true,"filePathRelative":"plugins/markdown/markdown-chart/plantuml.md"}`),u={name:`plantuml.md`};function d(c,l,u,d,f,p){let m=t(`VPPreview`);return e(),i(`div`,null,[l[36]||=s(`<h1 id="plantuml" tabindex="-1"><a class="header-anchor" href="#plantuml"><span>PlantUML</span></a></h1><p>Add <a href="https://plantuml.com/" target="_blank" rel="noopener noreferrer">PlantUML</a> support to the Markdown files in your VuePress site.</p><h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation"><span>Installation</span></a></h2><p>You can enable this feature via:</p><div class="code-block-with-title"><div class="code-block-title-bar" data-title=".vuepress/config.ts"><span>.vuepress/config.ts</span></div><div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-ts"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">markdownChartPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;@vuepress/plugin-markdown-chart&#39;</span></span>
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
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">@enduml</span></span></code></pre></div><h2 id="demo" tabindex="-1"><a class="header-anchor" href="#demo"><span>Demo</span></a></h2>`,9),r(m,{title:`Sequence Diagram`},{content:n(()=>[...l[0]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/ZP11IWGn44NtESM_WD1kPo4J4LSgWvuWa_uz4wOwYPqAChUNH6reN6WM2HJl_-9bNzGjMcSnLe8dRkvmduuxsAfdHWtUQKWHhtolB6gC4qMfthEKgGgyApG6G4krS6_v5RVUCoj7OoY5A6acBY6EI1Cc5wGk_sbv_2ORU5fIpNY-8dr4Y3jI-dYLU4edxFhjL9s_e7jsfXr9AUDs60Pec5dM-QQZVyJ3onjihrWXnl6FPJz4Ux-KRKnwvWAzPcwijyO7eIl4maodnhJydd6iitm2`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[1]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startuml`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`Alice -> Bob: Authentication Request`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`alt successful case`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    Bob -> Alice: Authentication Accepted`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`else some kind of failure`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    Bob -> Alice: Authentication Failure`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    group My own label`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    Alice -> Log : Log attack start`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        loop 1000 times`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`            Alice -> Bob: DNS Attack`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`        end`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    Alice -> Log : Log attack end`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    end`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`else Another type of failure`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`Bob -> Alice: Please repeat`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`end`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@enduml`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),r(m,{title:`Use Case`},{content:n(()=>[...l[2]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/NK-xRiCm3Dpr5OTCyH0F6JqKoGSqIvkj2oEpDGkPCamcoESNaeoYw7Ol7icJEQr-drCONaaKvt4M7K3MKDXVZU4JWvObIIINh5snYz65S3LUSNZ1_gtqT1ilGlDh2mv_5CtEMELhSkJFjWK3tYSnY84K_AHvITp_ZxRvCweQIK79ShWniiBumIib956sm3hMrDQmg-KLYY5cLOxEuuTw_XtCjs-ERlsk_7OvXkqVz7rXbsC1xO0JwtYVqmy0`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[3]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startuml`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`:Main Admin: as Admin`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`(Use the application) as (Use)`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`User -> (Start)`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`User --> (Use)`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`Admin ---> (Use)`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`note right of Admin : This is an example.`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`note right of (Use)`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`A note can also`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`be on several lines`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`end note`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`note "This note is connected\\nto several objects." as N2`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`(Start) .. N2`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`N2 .. (Use)`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@enduml`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),r(m,{title:`Class`},{content:n(()=>[...l[4]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/POzDJWCn38NtFeMNxQ8tOD4HHG89gCHqX11YuGbk2KgSAl48yNTtDEbKcOYL_VmzlpZhf1Hry0weJnh9A1f7AM4poLkRjB3pz38unqPj4B2Y7FTa6BEro9a7HeGNFwjLdLiiDPolrfxJ8_zzcLNPSp6bnqYVcS7qn_C0lm5nsx-pqUSNPCUUHJUa18Z9Vl5Y2Ry0B8F7dVNSYJsjR9gd5X2ljzt3MEzkxhlTLJjwIIGevSlQuNYCdD8ZHR5oI1LiIZi6piY7rJVqx7kE2H1RZLOEk0zXiIoofvXlMxEy3jxz0G00`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[5]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startuml`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`abstract class AbstractList`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`abstract AbstractCollection`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`interface List`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`interface Collection`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`List <|-- AbstractList`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`Collection <|-- AbstractCollection`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`Collection <|- List`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`AbstractCollection <|- AbstractList`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`AbstractList <|-- ArrayList`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`class ArrayList {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  Object[] elementData`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  size()`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`enum TimeUnit {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  DAYS`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  HOURS`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  MINUTES`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`annotation SuppressWarnings`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`annotation Annotation {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  annotation with members`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  String foo()`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  String bar()`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@enduml`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),r(m,{title:`Activity`},{content:n(()=>[...l[6]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/PP5BRiCW48Rtd6AMyIO7m8j6YjIgkoWv0OBVDWe6bqUZtBu2ZEisEyJ_q3Spfn25Zsash3mOFnijxpVuRuDud8HL1bTy9OHuw7h6BHwqY14zqmCTBcB4qTaRPF8wFiyJvBsZEC7I8Vg4ZX7nrVHfTQaWoaaTtfr_2A_Ucj-wxCv-xoH28EbizCw4ldpdKFxHDe6MQj5sV8aJXUYMyeHLUc1RMeUB2t4BF15QeY5clI8ImGJiMvld0x-MqhyNhx0AlkfLhJM3C04TMu4oZ7BaeRI7V27YJMXZzgLbNPnoDFpRt3O9NtTAlbwiOFoPWrV2SaAAc1SZ8dQq5R1iy0Ihqcn-0000`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[7]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startuml`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`start`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`:ClickServlet.handleRequest();`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`:new page;`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`if (Page.onSecurityCheck) then (true)`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  :Page.onInit();`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  if (isForward?) then (no)`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    :Process controls;`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    if (continue processing?) then (no)`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      stop`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    endif`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    if (isPost?) then (yes)`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      :Page.onPost();`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    else (no)`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      :Page.onGet();`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    endif`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    :Page.onRender();`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  endif`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`else (false)`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`endif`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`if (do redirect?) then (yes)`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  :redirect process;`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`else`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  if (do forward?) then (yes)`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    :Forward request;`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  else (no)`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    :Render page template;`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  endif`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`endif`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`stop`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@enduml`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),r(m,{title:`Component`},{content:n(()=>[...l[8]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/RO_1QiCm44Jl-ef1TnzAUouf9MulfGNxPd9Gh6rZ8caTIOQ4udyFab9iGc_BpEoRtKs8oiV96Z6g_gX-2B9XItZpF8qIlm9uRzilLEZgmOU8LxOZEt9n9u3knN4ya5-hin2EDK5-PYU3GY7L1THGpqxVaUxfgAhdj91ulU59PqAtFIix6i93Bj8gghqA1FbnQKwcj7opqUGXsyCGC0JOoqqgTkegYSTKFASDhon1rinB94jF9J4ByS-d-SBrGQkvU4lFCjwSF_o6d9wikG80`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[9]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startuml`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`package "Some Group" {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  HTTP - [First Component]`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  [Another Component]`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`node "Other Groups" {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  FTP - [Second Component]`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  [First Component] --> FTP`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`cloud {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  [Example 1]`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`database "MySql" {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  folder "This is my folder" {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    [Folder 3]`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  }`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  frame "Foo" {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    [Frame 4]`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  }`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`[Another Component] --> [Example 1]`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`[Example 1] --> [Folder 3]`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`[Folder 3] --> [Frame 4]`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@enduml`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),r(m,{title:`State`},{content:n(()=>[...l[10]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/TP2n3eCm34HtVuNdIWpGhK8H_z2nxO28KMaXaI3yVsKJfo1WS-xUuSFL5Eenp4CFKwW3eJnpnBAKoPYeDs_VDPHZMIvJCbe_VdFa04z9_lZE5IBpb6HozeeYaxF603mkBtvZbfcquuRjw8UbojC57mtGRcSiJe56yki8ACSPhHepYoKqEnjKw-zHTZQe_j8U9MTZ9G3TdN7aphT8tTaINawq8YDOu0a9QXyq5k9VE6uKKa--8ybP0FtE0SbM0YjoTXxw7m00`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[11]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startuml`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`state start1  <<start>>`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`state choice1 <<choice>>`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`state fork1   <<fork>>`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`state join2   <<join>>`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`state end3    <<end>>`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`[*]     --> choice1 : from start\\nto choice`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`start1  --> choice1 : from start stereo\\nto choice`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`choice1 --> fork1   : from choice\\nto fork`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`choice1 --> join2   : from choice\\nto join`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`choice1 --> end3    : from choice\\nto end stereo`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`fork1   ---> State1 : from fork\\nto state`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`fork1   --> State2  : from fork\\nto state`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`State2  --> join2   : from state\\nto join`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`State1  --> [*]     : from state\\nto end`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`join2   --> [*]     : from join\\nto end`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@enduml`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),r(m,{title:`Object`},{content:n(()=>[...l[12]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuSfFoafDBb7moSzBoS-3yS8JYpCoyz9B429EgKKvcN2UNsfvP7vHDXTNRcA1WdDYGMP9OevpPacbGZMNGgYtWfQk7Sn0XT1WHmKjNLqxP3CLt5EBSXFpAa4IkdOmiskvkA3cAe14aOoriWeDTkHoICrBAStD0G00`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[13]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startuml`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`object London`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`object Washington`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`object Berlin`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`object NewYork`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`map CapitalCity {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,` UK *-> London`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,` USA *--> Washington`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,` Germany *---> Berlin`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`NewYork --> CapitalCity::USA`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@enduml`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),r(m,{title:`Deployment`},{content:n(()=>[...l[14]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuShBJqbL01662AOHWccCO9eWcAPWfg62hYv4lOALGavYKcgE8LHSJm-Y6IPk11MlguEO11CtXehRsaADTKZDIodDpG40`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[15]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startuml`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`node node1`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`node node2`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`node node3`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`node node4`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`node node5`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`node1 -- node2 : label1`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`node1 .. node3 : label2`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`node1 ~~ node4 : label3`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`node1 == node5`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@enduml`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),r(m,{title:`Timing`},{content:n(()=>[...l[16]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/RLBBReCm4BplLwp8iOgAGQbKL4KqIkWzX-PO6RmDLXo8R1FIlwyC14oRs-xCUFRbr5YkRNDMO0gk25V83R9LY1Tv8sK02bKN9opK2LjfIxoGbhL01hcikFx1W2gUAmhSCwf6TFzyw23TZf3WbkCdLr9qZBX2KLU5DDHJcyRqU3xXN0XDnc0-S2u7I5zSdBHQMlhAwGWf2ps4AW6GicwGH1CNW-Pr0df925IXDAZg5aJkeY2yXG6uAlSi_Wv0jwFgwg8G89sgBsF0tgUKntB6H82ZxtRtljtiTbamKx31aldeKB2p6t7Nyjz6NEJnJynNF1ueYWEtd6Xmw5jcCKxwBCiofubcwvdgHGndvk0yb3oMrZi9sjex1ou-QYMIWyjz-VqudVf-65nqx4OrbEo92m2HprQ6RyirUcDZWePiSq4hp_HFl5ntlsQs9aomh9M0b2hHdDKl`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[17]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startuml`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`scale 5 as 150 pixels`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`clock clk with period 1`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`binary "enable" as en`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`binary "R/W" as rw`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`binary "data Valid" as dv`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`concise "dataBus" as db`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`concise "address bus" as addr`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@6 as :write_beg`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@10 as :write_end`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@15 as :read_beg`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@19 as :read_end`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@0`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`en is low`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`db is "0x0"`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`addr is "0x03f"`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`rw is low`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`dv is 0`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@:write_beg-3`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,` en is high`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@:write_beg-2`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,` db is "0xDEADBEEF"`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@:write_beg-1`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`dv is 1`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@:write_beg`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`rw is high`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@:write_end`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`rw is low`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`dv is low`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@:write_end+1`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`rw is low`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`db is "0x0"`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`addr is "0x23"`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@12`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`dv is high`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@13 `)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`db is "0xFFFF"`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@20`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`en is low`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`dv is low`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@21 `)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`db is "0x0"`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`highlight :write_beg to :write_end #Gold:Write`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`highlight :read_beg to :read_end #lightBlue:Read`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`db@:write_beg-1 <-> @:write_end : setup time`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`db@:write_beg-1 -> addr@:write_end+1 : hold`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@enduml`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),r(m,{title:`RegExp`},{content:n(()=>[...l[18]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/SoWkIImgAKfDJwtWqhSfBgdCITM8ATRAISnBjzM8LbUArTJGqxBNZ37Ij8yfrjAmjofEpYz8JT6qjzE8ZYcE2OxLrhI9qGVhi-DoICrB0Hi50000`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[19]||=[o(`div`,{class:`language-`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startregex`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`/<style(\\s*lang=(['"])(.*?)\\2)?\\s*(?:scoped)?>([\\s\\S]+)<\\/style>`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@endregex`)])])])],-1)]]),_:1}),r(m,{title:`Network`},{content:n(()=>[...l[20]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/ZP1DQiCm48NtEiNWGXSXf9PmwSAjYJSvGBT95eurE2Qs94OoxW--Ux6mcpHLQD5cqBpvvhrPMrUGwzg6gLxMHGMV3A0YtHbGTNLqpRl_0IXrembU8BhRRF8ypwFKVqkq9TN6rLgDpUVxij7bAODNz62KtvYvDGtsU8Z5n3Z4VAm61g3GzPfE8DkFQJ508IMXjIDVy7ZrDhu7aKHiwdSM2RQ_d1WagzKYMJrcE-L5FDgdqyoudiCsWEPBc4iHHyjGH5qjacodF2FQNn15a2Z-f8ZHsDK5QkMGLD64pi2VnFaCARkPQTPT1HT1aJYBv4rG73w9DOI5j4T4vqDvmW-UkC7Z_-PT-3EE8CpZON-6QZMHZAFPsi06jaObkxRv0W00`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[21]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startuml`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`nwdiag {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  group nightly {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    color = "#FFAAAA";`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    description = "<&clock> Restarted nightly <&clock>";`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    web02;`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    db01;`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  }`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  network dmz {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      address = "210.x.x.x/24"`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      user [description = "<&person*4.5>\\n user1"];`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      web01 [address = "210.x.x.1, 210.x.x.20",  description = "<&cog*4>\\nweb01"]`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      web02 [address = "210.x.x.2",  description = "<&cog*4>\\nweb02"];`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  }`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  network internal {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      address = "172.x.x.x/24";`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      web01 [address = "172.x.x.1"];`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      web02 [address = "172.x.x.2"];`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      db01 [address = "172.x.x.100",  description = "<&spreadsheet*4>\\n db01"];`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      db02 [address = "172.x.x.101",  description = "<&spreadsheet*4>\\n db02"];`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      ptr  [address = "172.x.x.110",  description = "<&print*4>\\n ptr01"];`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  }`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@enduml`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),r(m,{title:`Salt`},{content:n(()=>[...l[22]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/DOuz2y8m54Ntzolkxk0k8iM2JkBGHIWjHFCqWUGzIQA2RV-x-3NVmpctoiMaaaqeDCnec6DvN6rPE9c04PjR2FcKc0KZrkpCtMl2YCRSlLmmqK03zbSM-6Wk32yBZEYRQ5B1JYttcAWzT6YYQd5VAkFXMF1KZMm_QwrozYd-99O35wz2BJeqJXzmtjf_8zD4RHqqSqSJLIpsVVu5`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[23]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startsalt`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`{+`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`{/ <b>General | Fullscreen | Behavior | Saving }`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`{`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`{ Open image in: | ^Smart Mode^ }`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`[X] Smooth images when zoomed`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`[X] Confirm image deletion`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`[ ] Show hidden images`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`[Close]`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@endsalt`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),r(m,{title:`Archimate`},{content:n(()=>[...l[24]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/fLN1Rjim33rFNq5amx0DS0SCsAL8Z7hkskIGpgY1d79XRIRHQb669BSBjlxx82UExImDckvcYezFV2HbNbY7nbMg4FPUSea65HZA7FAoeE7mZbRu8BK9G_WjtXXTSHvhmsJWorVn96nff2DuTvSOdP6ry1FDEPfi9HKw-dnNMSbaRL1kt3iyfcGUP4PxU2pBGcRefER0RX1jIAnLgPdO7GdA6emGEn4m62Fd1K5Me5G30BGmZc4ut6KTXZsXRxzjq-von5YwoX1CUA6Dgc_RKCMJKwbkj9EBzPoZF9UU1mj87TxJIXSv6Jlmh3THUYhj30kPewCwVdPgz8GVo3gvR0XELfNWkWvCNXGenZ5y2dBzo074awvr4wLTSzOrUi14Y7W2WP7BbGl2i0xqPMjFPcBMiIQYYqvw4v9co2nvMIkmMyCBQGPrNqZK3brlIYhhj283c2kMrfdjeA25REkASYLRrslky6Di3zrGE_wNFp6ItQlK9xXM_dc-C53iwXnKPH3wCNYcHXt08OaRhs__4VVic7CYcjmtTYB4hWnD-Dv1VtukTLRv-3bFaN59c-zqRHsfkZUNq_ezjp-n8ms-9YQ3nPpZsscF9BwT_aFoBCjOAuBt43tYUiw9BcHM_tAwwclISPH4BqwjHteb6JcJFjD3l5S7UFScm5Vbh2hF_eIxHzSzQqeklF3jsU4H4RMA1dAWqQ9Ef-7TD5k8WfR4EHIqSEBxBrHbGR0mMe5R4GmYls9iPP0pWWmjWNLLlXx0XnybyRNHLVdnJAH4OZGQZKJdhmVdpUQ3PlDj8Rk70UVGMLpGRBi6rXPj3zXkEF9BpUSlBeZpIXL_0G00`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[25]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startuml`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`skinparam rectangle<<behavior>> {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`	roundCorner 25`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`sprite $bProcess jar:archimate/business-process`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`sprite $aService jar:archimate/application-service`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`sprite $aComponent jar:archimate/application-component`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`rectangle "Handle claim"  as HC <<$bProcess>><<behavior>> #Business`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`rectangle "Capture Information"  as CI <<$bProcess>><<behavior>> #Business`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`rectangle "Notify\\nAdditional Stakeholders" as NAS <<$bProcess>><<behavior>> #Business`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`rectangle "Validate" as V <<$bProcess>><<behavior>> #Business`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`rectangle "Investigate" as I <<$bProcess>><<behavior>> #Business`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`rectangle "Pay" as P <<$bProcess>><<behavior>> #Business`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`HC *-down- CI`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`HC *-down- NAS`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`HC *-down- V`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`HC *-down- I`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`HC *-down- P`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`CI -right->> NAS`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`NAS -right->> V`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`V -right->> I`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`I -right->> P`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`rectangle "Scanning" as scanning <<$aService>><<behavior>> #Application`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`rectangle "Customer admnistration" as customerAdministration <<$aService>><<behavior>> #Application`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`rectangle "Claims admnistration" as claimsAdministration <<$aService>><<behavior>> #Application`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`rectangle Printing <<$aService>><<behavior>> #Application`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`rectangle Payment <<$aService>><<behavior>> #Application`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`scanning -up-> CI`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`customerAdministration  -up-> CI`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`claimsAdministration -up-> NAS`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`claimsAdministration -up-> V`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`claimsAdministration -up-> I`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`Payment -up-> P`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`Printing -up-> V`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`Printing -up-> P`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`rectangle "Document\\nManagement\\nSystem" as DMS <<$aComponent>> #Application`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`rectangle "General\\nCRM\\nSystem" as CRM <<$aComponent>>  #Application`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`rectangle "Home & Away\\nPolicy\\nAdministration" as HAPA <<$aComponent>> #Application`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`rectangle "Home & Away\\nFinancial\\nAdministration" as HFPA <<$aComponent>>  #Application`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`DMS .up.|> scanning`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`DMS .up.|> Printing`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`CRM .up.|> customerAdministration`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`HAPA .up.|> claimsAdministration`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`HFPA .up.|> Payment`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`legend left`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`Example from the "Archisurance case study" (OpenGroup).`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`See`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`====`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`<$bProcess> :business process`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`====`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`<$aService> : application service`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`====`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`<$aComponent> : application component`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`endlegend`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@enduml`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),r(m,{title:`Gantt`},{content:n(()=>[...l[26]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/nPJ1Jjmm48RFyLFChQUaIIegfA8AKLHwA2qgN2h4OJQUPjquTh0dfTjgtnt5yMuIMCwSOe_j-R_VC_6fPtHSes4M9vutcZwAC3jNM3jiuRz867qpV9FFrl0tR0c-aFv3h2gCmKzMMmUEP9nVgty4nV5kDgI5bTN3yXbMpOMplP7ZeGj7P7wIrlP19CbNPMYChtHF8jcAf5MQF5j3UuJvXackF5h8AKQjgWE2c-TQ0Nmh4cFvgSevkYOWBfpbY-FV7PgQViGaw9nzUANh2e7n_76MVoZUPJlIcxMg6aFUGuXjHUAfGuTiNM0TTEgPZbRrcdV6brcdf7CVIv4Yx9cylJ_aRRgAhdUT7lWlqTNAm53AAvHIcHhA4PTLIrgDNG00y1JuJFdxs36LjfxaGLkTCitp8cp5LfoyZTr_vUnlgXZ2Z-61rmHbNkPfKQPv8SJj3Vgck0D7zxrovA78GUB62zyRYHj0Hp02217wQMMPRIi0Mcfj0LcMnN4Pn_ItqsYGbJM-E10Rzv6HCEIB1EMCe8m4kuL87i40Vp4vYDnlF92H8atXUbz_Lgm9qbJSNXPtiCQk8-F16ZXwES7-iLZsqL2PULDYrKnLpMTL3KNTt_d0CnXCKt5AHeO7w140`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[27]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startgantt`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`<style>`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`ganttDiagram {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`	task {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontName Helvetica`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontColor red`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontSize 18`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontStyle bold`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		BackGroundColor GreenYellow`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		LineColor blue`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`	}`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`	milestone {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontColor blue`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontSize 25`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontStyle italic`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		BackGroundColor yellow`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		LineColor red`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`	}`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`	note {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontColor DarkGreen`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontSize 10`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		LineColor OrangeRed`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`	}`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`	arrow {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontName Helvetica`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontColor red`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontSize 18`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontStyle bold`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		BackGroundColor GreenYellow`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		LineColor blue`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		LineStyle 8.0;13.0`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		LineThickness 3.0`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`	}`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`	separator {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		BackgroundColor lightGreen`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		LineStyle 8.0;3.0`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		LineColor red`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		LineThickness 1.0`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontSize 16`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontStyle bold`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontColor purple`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		Margin 5`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		Padding 20`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`	}`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`	timeline {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`	    BackgroundColor Bisque`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`	}`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`	closed {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		BackgroundColor pink`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		FontColor red`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`	}`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`</style>`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`Project starts the 2020-12-01`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`[Task1] requires 10 days`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`sunday are closed`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`note bottom`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  memo1 ...`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  memo2 ...`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  explanations1 ...`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  explanations2 ...`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`end note`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`[Task2] requires 20 days`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`[Task2] starts 10 days after [Task1]'s end`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`-- Separator title --`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`[M1] happens on 5 days after [Task1]'s end`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`<style>`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`	separator {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`	    LineColor black`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		Margin 0`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		Padding 0`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`	}`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`</style>`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`-- end --`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@endgantt`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),r(m,{title:`Mindmap`},{content:n(()=>[...l[28]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/JP6xRiCm34LtVWMd3bwAxgaGeCxak05gjEWgMxGjGA84FThwxmlPJk29zznBa7gSOv8XMStAIW-3z4axnb5FEH2-GDB94BOBnkmfu8e05PwUHYCdKLEl9KDLZCcudiHddpbbgAeAhvhp7xQQqufDFaG7tTGNV2TtdnAadyMrhIyR-smYYSwPHNqtkqNE6n9T8cbltUQLMuWF6Nqv3_xgDAF47meB6iSJihIqBZl5jSlsm-av2dmLUElQjsEqZFeUVJcJhNO0Cqb50HxFi3EnsXKCn8a2ZiwLycZS6C3GHAmmw6bEWDZDBfIwsMNEhix4Ql-BVm00`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[29]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startmindmap`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`caption figure 1`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`title My super title`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`* <&flag>Debian`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`** <&globe>Ubuntu`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`*** Linux Mint`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`*** Kubuntu`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`*** Lubuntu`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`*** KDE Neon`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`** <&graph>LMDE`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`** <&pulse>SolydXK`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`** <&people>SteamOS`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`** <&star>Raspbian with a very long name`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`*** <s>Raspmbc</s> => OSMC`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`*** <s>Raspyfi</s> => Volumio`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`header`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`My super header`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`endheader`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`center footer My super footer`)]),a(`
`),o(`span`,{class:`line`},[o(`span`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`legend right`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  Short`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  legend`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`endlegend`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@endmindmap`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),r(m,{title:`WBS`},{content:n(()=>[...l[30]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/DK-xRiCm3Dpr5Pow2Fg7034Gj2WwE4XsMM8T8ZBfYdID_7qXsntlXRixgSLgww3EmnUky263ynuwJ9GHX1i1FVuiL752DdNUUtZFo4RsWZ7EEzFZBxLujq4FLnevt6RubWf9bgfu27Sf2njYtM6FCHEFpli0vmUcPo6r9WNeKMTXfO4A6Utv09-Ief5mMtc-msqk4ZDqmhZjsAWS3VEnOyPIY4TuWqkDqnIFtgqBcb5T2270zKcb_7z9TI5hTq79K24zH97T2JclW_u1`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[31]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startwbs`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`+ New Job`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`++ Decide on Job Requirements`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`+++ Identity gaps`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`+++ Review JDs`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`++++ Sign-Up for courses`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`++++ Volunteer`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`++++ Reading`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`++- Checklist`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`+++- Responsibilities`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`+++- Location`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`++ CV Upload Done`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`+++ CV Updated`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`++++ Spelling & Grammar`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`++++ Check dates`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`---- Skills`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`+++ Recruitment sites chosen`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@endwbs`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),r(m,{title:`JSON`},{content:n(()=>[...l[32]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/RP6nRi8m48PtFyNfkeAQX8IYJA1k7R8meQg3ImnswzYHVMc5AjwzyYL4GcAnTD_vFl-sjv5aeA_edNZIvgojEMi2j39I8pk5TrIsRL0n8Zm37WrTxhkzzaurG_UfmhWbuzKnGV4d0F1amYIk0T-yThX8U3wk1jntXlI8JTnPyvCeXK4nakTK5fkncFBKaEG062aeHRiPOv53uLhOCsSfJD5hm4Rzmi67xnkF98aZD8SRwdqaQLzzoppFiY9Vhl8iGm5mvGntjwxXdUV6E018bvudjU_Kv8JvIJXV0LLLBVDYLIAthul71dywcUD3nxfSiwEirY-JGm1ySBgZDhODogLa8ucz7s8oki5QSHLRvThq_Vy0`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[33]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startjson`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`#highlight "lastName"`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`#highlight "address" / "city"`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`#highlight "phoneNumbers" / "0" / "number"`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`{`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "firstName": "John",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "lastName": "Smith",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "isAlive": true,`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "age": 28,`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "address": {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    "streetAddress": "21 2nd Street",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    "city": "New York",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    "state": "NY",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    "postalCode": "10021-3100"`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  },`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "phoneNumbers": [`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "type": "home",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "number": "212 555-1234"`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    },`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    {`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "type": "office",`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`      "number": "646 555-4567"`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`    }`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  ],`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "children": [],`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`  "spouse": null`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`}`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@endjson`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1}),r(m,{title:`YAML`},{content:n(()=>[...l[34]||=[o(`img`,{src:`https://www.plantuml.com/plantuml/svg/NP11ZiCm24NNvXGewtgagErYlEfLc1WdbXmJOJoTt7wKPDSL7o7--_1gHcexhGMYSC21C3Bh3GaJhrJuR0TGsg-XoeQIS9OIkMBhTO0j1xn_ZO_n-Gr_AxM0ffqXATTfyGlN5l0E4vMIw-n_iiOM49p7fVD-rCZlInJfcG-HbEFfvLDEjlXuuC5zU2Jf2kw3uwveNdETMy0dk8tKDCUPJwoRf5SBE89pHIQoBFKyRMDID6KUm5bNA-oZ_1vBzXPuSOt7c_u1`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[35]||=[o(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[o(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[o(`code`,{class:`language-`},[o(`span`,{class:`line`},[o(`span`,null,`@startyaml`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`doe: "a deer, a female deer"`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`ray: "a drop of golden sun"`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`pi: 3.14159`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`xmas: true`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`french-hens: 3`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`calling-birds: `)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`	- huey`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`	- dewey`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`	- louie`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`	- fred`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`xmas-fifth-day: `)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`	calling-birds: four`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`	french-hens: 3`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`	golden-rings: 5`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`	partridges: `)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		count: 1`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`		location: "a pear tree"`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`	turtle-doves: two`)]),a(`
`),o(`span`,{class:`line`},[o(`span`,null,`@endyaml`)])])]),o(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`}),o(`div`,{class:`line-number`})])],-1)]]),_:1})])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};