import{c as e,d as t,g as n,h as r,l as i,m as a,n as o,s,u as c}from"./app-Ca9vn5Te.js";var l=JSON.parse(`{"path":"/plugins/markdown/markdown-chart/plantuml.html","title":"PlantUML","lang":"en-US","frontmatter":{"icon":"chart-column-stacked","description":"PlantUML Add PlantUML support to the Markdown files in your VuePress site. Installation You can enable this feature via: .vuepress/config.ts Syntax You can insert the same conte...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"PlantUML\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-06-07T08:43:56.000Z\\",\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://ecosystem.vuejs.press/ecosystem/plugins/markdown/markdown-chart/plantuml.html"}],["meta",{"property":"og:site_name","content":"VuePress Ecosystem"}],["meta",{"property":"og:title","content":"PlantUML"}],["meta",{"property":"og:description","content":"PlantUML Add PlantUML support to the Markdown files in your VuePress site. Installation You can enable this feature via: .vuepress/config.ts Syntax You can insert the same conte..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:locale:alternate","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-06-07T08:43:56.000Z"}],["meta",{"property":"article:modified_time","content":"2025-06-07T08:43:56.000Z"}],["link",{"rel":"alternate","hreflang":"zh-cn","href":"https://ecosystem.vuejs.press/ecosystem/zh/plugins/markdown/markdown-chart/plantuml.html"}],["link",{"rel":"alternate","type":"application/atom+xml","href":"https://ecosystem.vuejs.press/ecosystem/atom.xml","title":"VuePress Ecosystem Atom Feed"}],["link",{"rel":"alternate","type":"application/json","href":"https://ecosystem.vuejs.press/ecosystem/feed.json","title":"VuePress Ecosystem JSON Feed"}],["link",{"rel":"alternate","type":"application/rss+xml","href":"https://ecosystem.vuejs.press/ecosystem/rss.xml","title":"VuePress Ecosystem RSS Feed"}]]},"git":{"updatedTime":1749285836000,"contributors":[{"name":"Mister-Hope","username":"Mister-Hope","email":"mister-hope@outlook.com","commits":1,"avatar":"https://avatars.githubusercontent.com/Mister-Hope?v=4","url":"https://github.com/Mister-Hope"}],"changelog":[{"hash":"7f5fdff8c26f865b21697b3c6d29bb49d9b20ba4","time":1749285836000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat: add plugin-markdown-chart (#249)"}]},"autoDesc":true,"filePathRelative":"plugins/markdown/markdown-chart/plantuml.md"}`),u={name:`plantuml.md`};function d(o,l,u,d,f,p){let m=r(`VPPreview`);return a(),e(`div`,null,[l[36]||=i(`<h1 id="plantuml" tabindex="-1"><a class="header-anchor" href="#plantuml"><span>PlantUML</span></a></h1><p>Add <a href="https://plantuml.com/" target="_blank" rel="noopener noreferrer">PlantUML</a> support to the Markdown files in your VuePress site.</p><h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation"><span>Installation</span></a></h2><p>You can enable this feature via:</p><div class="code-block-with-title"><div class="code-block-title-bar" data-title=".vuepress/config.ts"><span>.vuepress/config.ts</span></div><div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-ts"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">markdownChartPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;@vuepress/plugin-markdown-chart&#39;</span></span>
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
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">@enduml</span></span></code></pre></div><h2 id="demo" tabindex="-1"><a class="header-anchor" href="#demo"><span>Demo</span></a></h2>`,9),t(m,{title:`Sequence Diagram`},{content:n(()=>[...l[0]||=[s(`img`,{src:`https://www.plantuml.com/plantuml/svg/ZP11IWGn44NtESM_WD1kPo4J4LSgWvuWa_uz4wOwYPqAChUNH6reN6WM2HJl_-9bNzGjMcSnLe8dRkvmduuxsAfdHWtUQKWHhtolB6gC4qMfthEKgGgyApG6G4krS6_v5RVUCoj7OoY5A6acBY6EI1Cc5wGk_sbv_2ORU5fIpNY-8dr4Y3jI-dYLU4edxFhjL9s_e7jsfXr9AUDs60Pec5dM-QQZVyJ3onjihrWXnl6FPJz4Ux-KRKnwvWAzPcwijyO7eIl4maodnhJydd6iitm2`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[1]||=[s(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[s(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[s(`code`,{class:`language-`},[s(`span`,{class:`line`},[s(`span`,null,`@startuml`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`Alice -> Bob: Authentication Request`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`alt successful case`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`    Bob -> Alice: Authentication Accepted`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`else some kind of failure`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`    Bob -> Alice: Authentication Failure`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`    group My own label`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`    Alice -> Log : Log attack start`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`        loop 1000 times`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`            Alice -> Bob: DNS Attack`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`        end`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`    Alice -> Log : Log attack end`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`    end`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`else Another type of failure`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`Bob -> Alice: Please repeat`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`end`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@enduml`)])])]),s(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`})])],-1)]]),_:1}),t(m,{title:`Use Case`},{content:n(()=>[...l[2]||=[s(`img`,{src:`https://www.plantuml.com/plantuml/svg/NK-xRiCm3Dpr5OTCyH0F6JqKoGSqIvkj2oEpDGkPCamcoESNaeoYw7Ol7icJEQr-drCONaaKvt4M7K3MKDXVZU4JWvObIIINh5snYz65S3LUSNZ1_gtqT1ilGlDh2mv_5CtEMELhSkJFjWK3tYSnY84K_AHvITp_ZxRvCweQIK79ShWniiBumIib956sm3hMrDQmg-KLYY5cLOxEuuTw_XtCjs-ERlsk_7OvXkqVz7rXbsC1xO0JwtYVqmy0`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[3]||=[s(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[s(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[s(`code`,{class:`language-`},[s(`span`,{class:`line`},[s(`span`,null,`@startuml`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`:Main Admin: as Admin`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`(Use the application) as (Use)`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`User -> (Start)`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`User --> (Use)`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`Admin ---> (Use)`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`note right of Admin : This is an example.`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`note right of (Use)`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`A note can also`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`be on several lines`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`end note`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`note "This note is connected\\nto several objects." as N2`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`(Start) .. N2`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`N2 .. (Use)`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@enduml`)])])]),s(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`})])],-1)]]),_:1}),t(m,{title:`Class`},{content:n(()=>[...l[4]||=[s(`img`,{src:`https://www.plantuml.com/plantuml/svg/POzDJWCn38NtFeMNxQ8tOD4HHG89gCHqX11YuGbk2KgSAl48yNTtDEbKcOYL_VmzlpZhf1Hry0weJnh9A1f7AM4poLkRjB3pz38unqPj4B2Y7FTa6BEro9a7HeGNFwjLdLiiDPolrfxJ8_zzcLNPSp6bnqYVcS7qn_C0lm5nsx-pqUSNPCUUHJUa18Z9Vl5Y2Ry0B8F7dVNSYJsjR9gd5X2ljzt3MEzkxhlTLJjwIIGevSlQuNYCdD8ZHR5oI1LiIZi6piY7rJVqx7kE2H1RZLOEk0zXiIoofvXlMxEy3jxz0G00`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[5]||=[s(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[s(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[s(`code`,{class:`language-`},[s(`span`,{class:`line`},[s(`span`,null,`@startuml`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`abstract class AbstractList`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`abstract AbstractCollection`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`interface List`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`interface Collection`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`List <|-- AbstractList`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`Collection <|-- AbstractCollection`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`Collection <|- List`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`AbstractCollection <|- AbstractList`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`AbstractList <|-- ArrayList`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`class ArrayList {`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  Object[] elementData`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  size()`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`}`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`enum TimeUnit {`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  DAYS`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  HOURS`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  MINUTES`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`}`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`annotation SuppressWarnings`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`annotation Annotation {`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  annotation with members`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  String foo()`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  String bar()`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`}`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@enduml`)])])]),s(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`})])],-1)]]),_:1}),t(m,{title:`Activity`},{content:n(()=>[...l[6]||=[s(`img`,{src:`https://www.plantuml.com/plantuml/svg/PP5BRiCW48Rtd6AMyIO7m8j6YjIgkoWv0OBVDWe6bqUZtBu2ZEisEyJ_q3Spfn25Zsash3mOFnijxpVuRuDud8HL1bTy9OHuw7h6BHwqY14zqmCTBcB4qTaRPF8wFiyJvBsZEC7I8Vg4ZX7nrVHfTQaWoaaTtfr_2A_Ucj-wxCv-xoH28EbizCw4ldpdKFxHDe6MQj5sV8aJXUYMyeHLUc1RMeUB2t4BF15QeY5clI8ImGJiMvld0x-MqhyNhx0AlkfLhJM3C04TMu4oZ7BaeRI7V27YJMXZzgLbNPnoDFpRt3O9NtTAlbwiOFoPWrV2SaAAc1SZ8dQq5R1iy0Ihqcn-0000`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[7]||=[s(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[s(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[s(`code`,{class:`language-`},[s(`span`,{class:`line`},[s(`span`,null,`@startuml`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`start`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`:ClickServlet.handleRequest();`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`:new page;`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`if (Page.onSecurityCheck) then (true)`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  :Page.onInit();`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  if (isForward?) then (no)`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`    :Process controls;`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`    if (continue processing?) then (no)`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`      stop`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`    endif`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`    if (isPost?) then (yes)`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`      :Page.onPost();`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`    else (no)`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`      :Page.onGet();`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`    endif`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`    :Page.onRender();`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  endif`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`else (false)`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`endif`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`if (do redirect?) then (yes)`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  :redirect process;`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`else`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  if (do forward?) then (yes)`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`    :Forward request;`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  else (no)`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`    :Render page template;`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  endif`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`endif`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`stop`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@enduml`)])])]),s(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`})])],-1)]]),_:1}),t(m,{title:`Component`},{content:n(()=>[...l[8]||=[s(`img`,{src:`https://www.plantuml.com/plantuml/svg/RO_1QiCm44Jl-ef1TnzAUouf9MulfGNxPd9Gh6rZ8caTIOQ4udyFab9iGc_BpEoRtKs8oiV96Z6g_gX-2B9XItZpF8qIlm9uRzilLEZgmOU8LxOZEt9n9u3knN4ya5-hin2EDK5-PYU3GY7L1THGpqxVaUxfgAhdj91ulU59PqAtFIix6i93Bj8gghqA1FbnQKwcj7opqUGXsyCGC0JOoqqgTkegYSTKFASDhon1rinB94jF9J4ByS-d-SBrGQkvU4lFCjwSF_o6d9wikG80`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[9]||=[s(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[s(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[s(`code`,{class:`language-`},[s(`span`,{class:`line`},[s(`span`,null,`@startuml`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`package "Some Group" {`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  HTTP - [First Component]`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  [Another Component]`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`}`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`node "Other Groups" {`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  FTP - [Second Component]`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  [First Component] --> FTP`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`}`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`cloud {`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  [Example 1]`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`}`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`database "MySql" {`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  folder "This is my folder" {`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`    [Folder 3]`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  }`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  frame "Foo" {`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`    [Frame 4]`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  }`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`}`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`[Another Component] --> [Example 1]`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`[Example 1] --> [Folder 3]`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`[Folder 3] --> [Frame 4]`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@enduml`)])])]),s(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`})])],-1)]]),_:1}),t(m,{title:`State`},{content:n(()=>[...l[10]||=[s(`img`,{src:`https://www.plantuml.com/plantuml/svg/TP2n3eCm34HtVuNdIWpGhK8H_z2nxO28KMaXaI3yVsKJfo1WS-xUuSFL5Eenp4CFKwW3eJnpnBAKoPYeDs_VDPHZMIvJCbe_VdFa04z9_lZE5IBpb6HozeeYaxF603mkBtvZbfcquuRjw8UbojC57mtGRcSiJe56yki8ACSPhHepYoKqEnjKw-zHTZQe_j8U9MTZ9G3TdN7aphT8tTaINawq8YDOu0a9QXyq5k9VE6uKKa--8ybP0FtE0SbM0YjoTXxw7m00`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[11]||=[s(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[s(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[s(`code`,{class:`language-`},[s(`span`,{class:`line`},[s(`span`,null,`@startuml`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`state start1  <<start>>`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`state choice1 <<choice>>`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`state fork1   <<fork>>`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`state join2   <<join>>`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`state end3    <<end>>`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`[*]     --> choice1 : from start\\nto choice`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`start1  --> choice1 : from start stereo\\nto choice`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`choice1 --> fork1   : from choice\\nto fork`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`choice1 --> join2   : from choice\\nto join`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`choice1 --> end3    : from choice\\nto end stereo`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`fork1   ---> State1 : from fork\\nto state`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`fork1   --> State2  : from fork\\nto state`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`State2  --> join2   : from state\\nto join`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`State1  --> [*]     : from state\\nto end`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`join2   --> [*]     : from join\\nto end`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@enduml`)])])]),s(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`})])],-1)]]),_:1}),t(m,{title:`Object`},{content:n(()=>[...l[12]||=[s(`img`,{src:`https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuSfFoafDBb7moSzBoS-3yS8JYpCoyz9B429EgKKvcN2UNsfvP7vHDXTNRcA1WdDYGMP9OevpPacbGZMNGgYtWfQk7Sn0XT1WHmKjNLqxP3CLt5EBSXFpAa4IkdOmiskvkA3cAe14aOoriWeDTkHoICrBAStD0G00`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[13]||=[s(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[s(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[s(`code`,{class:`language-`},[s(`span`,{class:`line`},[s(`span`,null,`@startuml`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`object London`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`object Washington`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`object Berlin`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`object NewYork`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`map CapitalCity {`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,` UK *-> London`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,` USA *--> Washington`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,` Germany *---> Berlin`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`}`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`NewYork --> CapitalCity::USA`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@enduml`)])])]),s(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`})])],-1)]]),_:1}),t(m,{title:`Deployment`},{content:n(()=>[...l[14]||=[s(`img`,{src:`https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuShBJqbL01662AOHWccCO9eWcAPWfg62hYv4lOALGavYKcgE8LHSJm-Y6IPk11MlguEO11CtXehRsaADTKZDIodDpG40`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[15]||=[s(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[s(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[s(`code`,{class:`language-`},[s(`span`,{class:`line`},[s(`span`,null,`@startuml`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`node node1`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`node node2`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`node node3`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`node node4`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`node node5`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`node1 -- node2 : label1`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`node1 .. node3 : label2`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`node1 ~~ node4 : label3`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`node1 == node5`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@enduml`)])])]),s(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`})])],-1)]]),_:1}),t(m,{title:`Timing`},{content:n(()=>[...l[16]||=[s(`img`,{src:`https://www.plantuml.com/plantuml/svg/RLBBReCm4BplLwp8iOgAGQbKL4KqIkWzX-PO6RmDLXo8R1FIlwyC14oRs-xCUFRbr5YkRNDMO0gk25V83R9LY1Tv8sK02bKN9opK2LjfIxoGbhL01hcikFx1W2gUAmhSCwf6TFzyw23TZf3WbkCdLr9qZBX2KLU5DDHJcyRqU3xXN0XDnc0-S2u7I5zSdBHQMlhAwGWf2ps4AW6GicwGH1CNW-Pr0df925IXDAZg5aJkeY2yXG6uAlSi_Wv0jwFgwg8G89sgBsF0tgUKntB6H82ZxtRtljtiTbamKx31aldeKB2p6t7Nyjz6NEJnJynNF1ueYWEtd6Xmw5jcCKxwBCiofubcwvdgHGndvk0yb3oMrZi9sjex1ou-QYMIWyjz-VqudVf-65nqx4OrbEo92m2HprQ6RyirUcDZWePiSq4hp_HFl5ntlsQs9aomh9M0b2hHdDKl`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[17]||=[s(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[s(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[s(`code`,{class:`language-`},[s(`span`,{class:`line`},[s(`span`,null,`@startuml`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`scale 5 as 150 pixels`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`clock clk with period 1`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`binary "enable" as en`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`binary "R/W" as rw`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`binary "data Valid" as dv`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`concise "dataBus" as db`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`concise "address bus" as addr`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@6 as :write_beg`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@10 as :write_end`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@15 as :read_beg`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@19 as :read_end`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@0`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`en is low`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`db is "0x0"`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`addr is "0x03f"`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`rw is low`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`dv is 0`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@:write_beg-3`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,` en is high`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@:write_beg-2`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,` db is "0xDEADBEEF"`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@:write_beg-1`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`dv is 1`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@:write_beg`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`rw is high`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@:write_end`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`rw is low`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`dv is low`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@:write_end+1`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`rw is low`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`db is "0x0"`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`addr is "0x23"`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@12`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`dv is high`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@13 `)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`db is "0xFFFF"`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@20`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`en is low`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`dv is low`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@21 `)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`db is "0x0"`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`highlight :write_beg to :write_end #Gold:Write`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`highlight :read_beg to :read_end #lightBlue:Read`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`db@:write_beg-1 <-> @:write_end : setup time`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`db@:write_beg-1 -> addr@:write_end+1 : hold`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@enduml`)])])]),s(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`})])],-1)]]),_:1}),t(m,{title:`RegExp`},{content:n(()=>[...l[18]||=[s(`img`,{src:`https://www.plantuml.com/plantuml/svg/SoWkIImgAKfDJwtWqhSfBgdCITM8ATRAISnBjzM8LbUArTJGqxBNZ37Ij8yfrjAmjofEpYz8JT6qjzE8ZYcE2OxLrhI9qGVhi-DoICrB0Hi50000`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[19]||=[s(`div`,{class:`language-`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[s(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[s(`code`,{class:`language-`},[s(`span`,{class:`line`},[s(`span`,null,`@startregex`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`/<style(\\s*lang=(['"])(.*?)\\2)?\\s*(?:scoped)?>([\\s\\S]+)<\\/style>`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@endregex`)])])])],-1)]]),_:1}),t(m,{title:`Network`},{content:n(()=>[...l[20]||=[s(`img`,{src:`https://www.plantuml.com/plantuml/svg/ZP1DQiCm48NtEiNWGXSXf9PmwSAjYJSvGBT95eurE2Qs94OoxW--Ux6mcpHLQD5cqBpvvhrPMrUGwzg6gLxMHGMV3A0YtHbGTNLqpRl_0IXrembU8BhRRF8ypwFKVqkq9TN6rLgDpUVxij7bAODNz62KtvYvDGtsU8Z5n3Z4VAm61g3GzPfE8DkFQJ508IMXjIDVy7ZrDhu7aKHiwdSM2RQ_d1WagzKYMJrcE-L5FDgdqyoudiCsWEPBc4iHHyjGH5qjacodF2FQNn15a2Z-f8ZHsDK5QkMGLD64pi2VnFaCARkPQTPT1HT1aJYBv4rG73w9DOI5j4T4vqDvmW-UkC7Z_-PT-3EE8CpZON-6QZMHZAFPsi06jaObkxRv0W00`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[21]||=[s(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[s(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[s(`code`,{class:`language-`},[s(`span`,{class:`line`},[s(`span`,null,`@startuml`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`nwdiag {`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  group nightly {`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`    color = "#FFAAAA";`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`    description = "<&clock> Restarted nightly <&clock>";`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`    web02;`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`    db01;`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  }`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  network dmz {`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`      address = "210.x.x.x/24"`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`      user [description = "<&person*4.5>\\n user1"];`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`      web01 [address = "210.x.x.1, 210.x.x.20",  description = "<&cog*4>\\nweb01"]`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`      web02 [address = "210.x.x.2",  description = "<&cog*4>\\nweb02"];`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  }`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  network internal {`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`      address = "172.x.x.x/24";`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`      web01 [address = "172.x.x.1"];`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`      web02 [address = "172.x.x.2"];`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`      db01 [address = "172.x.x.100",  description = "<&spreadsheet*4>\\n db01"];`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`      db02 [address = "172.x.x.101",  description = "<&spreadsheet*4>\\n db02"];`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`      ptr  [address = "172.x.x.110",  description = "<&print*4>\\n ptr01"];`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  }`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`}`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@enduml`)])])]),s(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`})])],-1)]]),_:1}),t(m,{title:`Salt`},{content:n(()=>[...l[22]||=[s(`img`,{src:`https://www.plantuml.com/plantuml/svg/DOuz2y8m54Ntzolkxk0k8iM2JkBGHIWjHFCqWUGzIQA2RV-x-3NVmpctoiMaaaqeDCnec6DvN6rPE9c04PjR2FcKc0KZrkpCtMl2YCRSlLmmqK03zbSM-6Wk32yBZEYRQ5B1JYttcAWzT6YYQd5VAkFXMF1KZMm_QwrozYd-99O35wz2BJeqJXzmtjf_8zD4RHqqSqSJLIpsVVu5`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[23]||=[s(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[s(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[s(`code`,{class:`language-`},[s(`span`,{class:`line`},[s(`span`,null,`@startsalt`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`{+`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`{/ <b>General | Fullscreen | Behavior | Saving }`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`{`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`{ Open image in: | ^Smart Mode^ }`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`[X] Smooth images when zoomed`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`[X] Confirm image deletion`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`[ ] Show hidden images`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`}`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`[Close]`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`}`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@endsalt`)])])]),s(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`})])],-1)]]),_:1}),t(m,{title:`Archimate`},{content:n(()=>[...l[24]||=[s(`img`,{src:`https://www.plantuml.com/plantuml/svg/fLN1Rjim33rFNq5amx0DS0SCsAL8Z7hkskIGpgY1d79XRIRHQb669BSBjlxx82UExImDckvcYezFV2HbNbY7nbMg4FPUSea65HZA7FAoeE7mZbRu8BK9G_WjtXXTSHvhmsJWorVn96nff2DuTvSOdP6ry1FDEPfi9HKw-dnNMSbaRL1kt3iyfcGUP4PxU2pBGcRefER0RX1jIAnLgPdO7GdA6emGEn4m62Fd1K5Me5G30BGmZc4ut6KTXZsXRxzjq-von5YwoX1CUA6Dgc_RKCMJKwbkj9EBzPoZF9UU1mj87TxJIXSv6Jlmh3THUYhj30kPewCwVdPgz8GVo3gvR0XELfNWkWvCNXGenZ5y2dBzo074awvr4wLTSzOrUi14Y7W2WP7BbGl2i0xqPMjFPcBMiIQYYqvw4v9co2nvMIkmMyCBQGPrNqZK3brlIYhhj283c2kMrfdjeA25REkASYLRrslky6Di3zrGE_wNFp6ItQlK9xXM_dc-C53iwXnKPH3wCNYcHXt08OaRhs__4VVic7CYcjmtTYB4hWnD-Dv1VtukTLRv-3bFaN59c-zqRHsfkZUNq_ezjp-n8ms-9YQ3nPpZsscF9BwT_aFoBCjOAuBt43tYUiw9BcHM_tAwwclISPH4BqwjHteb6JcJFjD3l5S7UFScm5Vbh2hF_eIxHzSzQqeklF3jsU4H4RMA1dAWqQ9Ef-7TD5k8WfR4EHIqSEBxBrHbGR0mMe5R4GmYls9iPP0pWWmjWNLLlXx0XnybyRNHLVdnJAH4OZGQZKJdhmVdpUQ3PlDj8Rk70UVGMLpGRBi6rXPj3zXkEF9BpUSlBeZpIXL_0G00`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[25]||=[s(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[s(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[s(`code`,{class:`language-`},[s(`span`,{class:`line`},[s(`span`,null,`@startuml`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`skinparam rectangle<<behavior>> {`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`	roundCorner 25`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`}`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`sprite $bProcess jar:archimate/business-process`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`sprite $aService jar:archimate/application-service`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`sprite $aComponent jar:archimate/application-component`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`rectangle "Handle claim"  as HC <<$bProcess>><<behavior>> #Business`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`rectangle "Capture Information"  as CI <<$bProcess>><<behavior>> #Business`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`rectangle "Notify\\nAdditional Stakeholders" as NAS <<$bProcess>><<behavior>> #Business`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`rectangle "Validate" as V <<$bProcess>><<behavior>> #Business`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`rectangle "Investigate" as I <<$bProcess>><<behavior>> #Business`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`rectangle "Pay" as P <<$bProcess>><<behavior>> #Business`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`HC *-down- CI`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`HC *-down- NAS`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`HC *-down- V`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`HC *-down- I`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`HC *-down- P`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`CI -right->> NAS`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`NAS -right->> V`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`V -right->> I`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`I -right->> P`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`rectangle "Scanning" as scanning <<$aService>><<behavior>> #Application`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`rectangle "Customer admnistration" as customerAdministration <<$aService>><<behavior>> #Application`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`rectangle "Claims admnistration" as claimsAdministration <<$aService>><<behavior>> #Application`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`rectangle Printing <<$aService>><<behavior>> #Application`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`rectangle Payment <<$aService>><<behavior>> #Application`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`scanning -up-> CI`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`customerAdministration  -up-> CI`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`claimsAdministration -up-> NAS`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`claimsAdministration -up-> V`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`claimsAdministration -up-> I`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`Payment -up-> P`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`Printing -up-> V`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`Printing -up-> P`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`rectangle "Document\\nManagement\\nSystem" as DMS <<$aComponent>> #Application`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`rectangle "General\\nCRM\\nSystem" as CRM <<$aComponent>>  #Application`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`rectangle "Home & Away\\nPolicy\\nAdministration" as HAPA <<$aComponent>> #Application`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`rectangle "Home & Away\\nFinancial\\nAdministration" as HFPA <<$aComponent>>  #Application`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`DMS .up.|> scanning`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`DMS .up.|> Printing`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`CRM .up.|> customerAdministration`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`HAPA .up.|> claimsAdministration`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`HFPA .up.|> Payment`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`legend left`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`Example from the "Archisurance case study" (OpenGroup).`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`See`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`====`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`<$bProcess> :business process`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`====`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`<$aService> : application service`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`====`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`<$aComponent> : application component`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`endlegend`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@enduml`)])])]),s(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`})])],-1)]]),_:1}),t(m,{title:`Gantt`},{content:n(()=>[...l[26]||=[s(`img`,{src:`https://www.plantuml.com/plantuml/svg/nPJ1Jjmm48RFyLFChQUaIIegfA8AKLHwA2qgN2h4OJQUPjquTh0dfTjgtnt5yMuIMCwSOe_j-R_VC_6fPtHSes4M9vutcZwAC3jNM3jiuRz867qpV9FFrl0tR0c-aFv3h2gCmKzMMmUEP9nVgty4nV5kDgI5bTN3yXbMpOMplP7ZeGj7P7wIrlP19CbNPMYChtHF8jcAf5MQF5j3UuJvXackF5h8AKQjgWE2c-TQ0Nmh4cFvgSevkYOWBfpbY-FV7PgQViGaw9nzUANh2e7n_76MVoZUPJlIcxMg6aFUGuXjHUAfGuTiNM0TTEgPZbRrcdV6brcdf7CVIv4Yx9cylJ_aRRgAhdUT7lWlqTNAm53AAvHIcHhA4PTLIrgDNG00y1JuJFdxs36LjfxaGLkTCitp8cp5LfoyZTr_vUnlgXZ2Z-61rmHbNkPfKQPv8SJj3Vgck0D7zxrovA78GUB62zyRYHj0Hp02217wQMMPRIi0Mcfj0LcMnN4Pn_ItqsYGbJM-E10Rzv6HCEIB1EMCe8m4kuL87i40Vp4vYDnlF92H8atXUbz_Lgm9qbJSNXPtiCQk8-F16ZXwES7-iLZsqL2PULDYrKnLpMTL3KNTt_d0CnXCKt5AHeO7w140`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[27]||=[s(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[s(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[s(`code`,{class:`language-`},[s(`span`,{class:`line`},[s(`span`,null,`@startgantt`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`<style>`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`ganttDiagram {`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`	task {`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		FontName Helvetica`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		FontColor red`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		FontSize 18`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		FontStyle bold`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		BackGroundColor GreenYellow`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		LineColor blue`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`	}`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`	milestone {`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		FontColor blue`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		FontSize 25`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		FontStyle italic`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		BackGroundColor yellow`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		LineColor red`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`	}`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`	note {`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		FontColor DarkGreen`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		FontSize 10`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		LineColor OrangeRed`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`	}`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`	arrow {`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		FontName Helvetica`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		FontColor red`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		FontSize 18`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		FontStyle bold`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		BackGroundColor GreenYellow`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		LineColor blue`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		LineStyle 8.0;13.0`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		LineThickness 3.0`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`	}`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`	separator {`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		BackgroundColor lightGreen`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		LineStyle 8.0;3.0`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		LineColor red`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		LineThickness 1.0`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		FontSize 16`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		FontStyle bold`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		FontColor purple`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		Margin 5`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		Padding 20`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`	}`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`	timeline {`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`	    BackgroundColor Bisque`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`	}`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`	closed {`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		BackgroundColor pink`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		FontColor red`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`	}`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`}`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`</style>`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`Project starts the 2020-12-01`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`[Task1] requires 10 days`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`sunday are closed`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`note bottom`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  memo1 ...`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  memo2 ...`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  explanations1 ...`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  explanations2 ...`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`end note`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`[Task2] requires 20 days`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`[Task2] starts 10 days after [Task1]'s end`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`-- Separator title --`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`[M1] happens on 5 days after [Task1]'s end`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`<style>`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`	separator {`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`	    LineColor black`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		Margin 0`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		Padding 0`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`	}`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`</style>`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`-- end --`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@endgantt`)])])]),s(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`})])],-1)]]),_:1}),t(m,{title:`Mindmap`},{content:n(()=>[...l[28]||=[s(`img`,{src:`https://www.plantuml.com/plantuml/svg/JP6xRiCm34LtVWMd3bwAxgaGeCxak05gjEWgMxGjGA84FThwxmlPJk29zznBa7gSOv8XMStAIW-3z4axnb5FEH2-GDB94BOBnkmfu8e05PwUHYCdKLEl9KDLZCcudiHddpbbgAeAhvhp7xQQqufDFaG7tTGNV2TtdnAadyMrhIyR-smYYSwPHNqtkqNE6n9T8cbltUQLMuWF6Nqv3_xgDAF47meB6iSJihIqBZl5jSlsm-av2dmLUElQjsEqZFeUVJcJhNO0Cqb50HxFi3EnsXKCn8a2ZiwLycZS6C3GHAmmw6bEWDZDBfIwsMNEhix4Ql-BVm00`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[29]||=[s(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[s(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[s(`code`,{class:`language-`},[s(`span`,{class:`line`},[s(`span`,null,`@startmindmap`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`caption figure 1`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`title My super title`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`* <&flag>Debian`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`** <&globe>Ubuntu`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`*** Linux Mint`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`*** Kubuntu`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`*** Lubuntu`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`*** KDE Neon`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`** <&graph>LMDE`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`** <&pulse>SolydXK`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`** <&people>SteamOS`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`** <&star>Raspbian with a very long name`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`*** <s>Raspmbc</s> => OSMC`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`*** <s>Raspyfi</s> => Volumio`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`header`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`My super header`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`endheader`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`center footer My super footer`)]),c(`
`),s(`span`,{class:`line`},[s(`span`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`legend right`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  Short`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  legend`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`endlegend`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@endmindmap`)])])]),s(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`})])],-1)]]),_:1}),t(m,{title:`WBS`},{content:n(()=>[...l[30]||=[s(`img`,{src:`https://www.plantuml.com/plantuml/svg/DK-xRiCm3Dpr5Pow2Fg7034Gj2WwE4XsMM8T8ZBfYdID_7qXsntlXRixgSLgww3EmnUky263ynuwJ9GHX1i1FVuiL752DdNUUtZFo4RsWZ7EEzFZBxLujq4FLnevt6RubWf9bgfu27Sf2njYtM6FCHEFpli0vmUcPo6r9WNeKMTXfO4A6Utv09-Ief5mMtc-msqk4ZDqmhZjsAWS3VEnOyPIY4TuWqkDqnIFtgqBcb5T2270zKcb_7z9TI5hTq79K24zH97T2JclW_u1`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[31]||=[s(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[s(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[s(`code`,{class:`language-`},[s(`span`,{class:`line`},[s(`span`,null,`@startwbs`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`+ New Job`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`++ Decide on Job Requirements`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`+++ Identity gaps`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`+++ Review JDs`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`++++ Sign-Up for courses`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`++++ Volunteer`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`++++ Reading`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`++- Checklist`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`+++- Responsibilities`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`+++- Location`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`++ CV Upload Done`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`+++ CV Updated`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`++++ Spelling & Grammar`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`++++ Check dates`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`---- Skills`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`+++ Recruitment sites chosen`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@endwbs`)])])]),s(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`})])],-1)]]),_:1}),t(m,{title:`JSON`},{content:n(()=>[...l[32]||=[s(`img`,{src:`https://www.plantuml.com/plantuml/svg/RP6nRi8m48PtFyNfkeAQX8IYJA1k7R8meQg3ImnswzYHVMc5AjwzyYL4GcAnTD_vFl-sjv5aeA_edNZIvgojEMi2j39I8pk5TrIsRL0n8Zm37WrTxhkzzaurG_UfmhWbuzKnGV4d0F1amYIk0T-yThX8U3wk1jntXlI8JTnPyvCeXK4nakTK5fkncFBKaEG062aeHRiPOv53uLhOCsSfJD5hm4Rzmi67xnkF98aZD8SRwdqaQLzzoppFiY9Vhl8iGm5mvGntjwxXdUV6E018bvudjU_Kv8JvIJXV0LLLBVDYLIAthul71dywcUD3nxfSiwEirY-JGm1ySBgZDhODogLa8ucz7s8oki5QSHLRvThq_Vy0`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[33]||=[s(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[s(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[s(`code`,{class:`language-`},[s(`span`,{class:`line`},[s(`span`,null,`@startjson`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`#highlight "lastName"`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`#highlight "address" / "city"`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`#highlight "phoneNumbers" / "0" / "number"`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`{`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  "firstName": "John",`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  "lastName": "Smith",`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  "isAlive": true,`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  "age": 28,`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  "address": {`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`    "streetAddress": "21 2nd Street",`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`    "city": "New York",`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`    "state": "NY",`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`    "postalCode": "10021-3100"`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  },`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  "phoneNumbers": [`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`    {`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`      "type": "home",`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`      "number": "212 555-1234"`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`    },`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`    {`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`      "type": "office",`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`      "number": "646 555-4567"`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`    }`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  ],`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  "children": [],`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`  "spouse": null`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`}`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@endjson`)])])]),s(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`})])],-1)]]),_:1}),t(m,{title:`YAML`},{content:n(()=>[...l[34]||=[s(`img`,{src:`https://www.plantuml.com/plantuml/svg/NP11ZiCm24NNvXGewtgagErYlEfLc1WdbXmJOJoTt7wKPDSL7o7--_1gHcexhGMYSC21C3Bh3GaJhrJuR0TGsg-XoeQIS9OIkMBhTO0j1xn_ZO_n-Gr_AxM0ffqXATTfyGlN5l0E4vMIw-n_iiOM49p7fVD-rCZlInJfcG-HbEFfvLDEjlXuuC5zU2Jf2kw3uwveNdETMy0dk8tKDCUPJwoRf5SBE89pHIQoBFKyRMDID6KUm5bNA-oZ_1vBzXPuSOt7c_u1`,alt:`PlantUML Diagram`},null,-1)]]),code:n(()=>[...l[35]||=[s(`div`,{class:`language- line-numbers-mode`,"data-highlighter":`shiki`,"data-ext":``,style:{"--shiki-light":`#383A42`,"--shiki-dark":`#abb2bf`,"--shiki-light-bg":`#FAFAFA`,"--shiki-dark-bg":`#282c34`}},[s(`pre`,{class:`shiki shiki-themes one-light one-dark-pro vp-code`},[s(`code`,{class:`language-`},[s(`span`,{class:`line`},[s(`span`,null,`@startyaml`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`doe: "a deer, a female deer"`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`ray: "a drop of golden sun"`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`pi: 3.14159`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`xmas: true`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`french-hens: 3`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`calling-birds: `)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`	- huey`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`	- dewey`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`	- louie`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`	- fred`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`xmas-fifth-day: `)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`	calling-birds: four`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`	french-hens: 3`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`	golden-rings: 5`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`	partridges: `)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		count: 1`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`		location: "a pear tree"`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`	turtle-doves: two`)]),c(`
`),s(`span`,{class:`line`},[s(`span`,null,`@endyaml`)])])]),s(`div`,{class:`line-numbers`,"aria-hidden":`true`,style:{"counter-reset":`line-number 0`}},[s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`}),s(`div`,{class:`line-number`})])],-1)]]),_:1})])}var f=o(u,[[`render`,d]]);export{l as _pageData,f as default};