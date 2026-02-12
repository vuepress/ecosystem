import{_ as p,c,d as r,b as i,w as a,r as u,o as t,a as n,e as s}from"./app-Jc7SvwFk.js";const d={};function m(b,l){const e=u("VPPreview");return t(),c("div",null,[l[36]||(l[36]=r(`<h1 id="plantuml" tabindex="-1"><a class="header-anchor" href="#plantuml"><span>PlantUML</span></a></h1><p>为你站点中的 Markdown 文件添加 <a href="https://plantuml.com/zh/" target="_blank" rel="noopener noreferrer">PlantUML</a> 支持。</p><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2><p>你可以通过以下方式启用此功能：</p><div class="code-block-with-title"><div class="code-block-title-bar" data-title=".vuepress/config.ts"><span>.vuepress/config.ts</span></div><div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-ts"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">markdownChartPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;@vuepress/plugin-markdown-chart&#39;</span></span>
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
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">@enduml</span></span></code></pre></div><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2>`,9)),i(e,{title:"序列图"},{content:a(()=>[...l[0]||(l[0]=[n("img",{src:"https://www.plantuml.com/plantuml/svg/ZP11IWGn44NtESM_WD1kPo4J4LSgWvuWa_uz4wOwYPqAChUNH6reN6WM2HJl_-9bNzGjMcSnLe8dRkvmduuxsAfdHWtUQKWHhtolB6gC4qMfthEKgGgyApG6G4krS6_v5RVUCoj7OoY5A6acBY6EI1Cc5wGk_sbv_2ORU5fIpNY-8dr4Y3jI-dYLU4edxFhjL9s_e7jsfXr9AUDs60Pec5dM-QQZVyJ3onjihrWXnl6FPJz4Ux-KRKnwvWAzPcwijyO7eIl4maodnhJydd6iitm2",alt:"PlantUML Diagram"},null,-1)])]),code:a(()=>[...l[1]||(l[1]=[n("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-"},[n("span",{class:"line"},[n("span",null,"@startuml")]),s(`
`),n("span",{class:"line"},[n("span",null,"Alice -> Bob: Authentication Request")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"alt successful case")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    Bob -> Alice: Authentication Accepted")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"else some kind of failure")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    Bob -> Alice: Authentication Failure")]),s(`
`),n("span",{class:"line"},[n("span",null,"    group My own label")]),s(`
`),n("span",{class:"line"},[n("span",null,"    Alice -> Log : Log attack start")]),s(`
`),n("span",{class:"line"},[n("span",null,"        loop 1000 times")]),s(`
`),n("span",{class:"line"},[n("span",null,"            Alice -> Bob: DNS Attack")]),s(`
`),n("span",{class:"line"},[n("span",null,"        end")]),s(`
`),n("span",{class:"line"},[n("span",null,"    Alice -> Log : Log attack end")]),s(`
`),n("span",{class:"line"},[n("span",null,"    end")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"else Another type of failure")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"Bob -> Alice: Please repeat")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"end")]),s(`
`),n("span",{class:"line"},[n("span",null,"@enduml")])])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])]),_:1}),i(e,{title:"用例图"},{content:a(()=>[...l[2]||(l[2]=[n("img",{src:"https://www.plantuml.com/plantuml/svg/NK-xRiCm3Dpr5OTCyH0F6JqKoGSqIvkj2oEpDGkPCamcoESNaeoYw7Ol7icJEQr-drCONaaKvt4M7K3MKDXVZU4JWvObIIINh5snYz65S3LUSNZ1_gtqT1ilGlDh2mv_5CtEMELhSkJFjWK3tYSnY84K_AHvITp_ZxRvCweQIK79ShWniiBumIib956sm3hMrDQmg-KLYY5cLOxEuuTw_XtCjs-ERlsk_7OvXkqVz7rXbsC1xO0JwtYVqmy0",alt:"PlantUML Diagram"},null,-1)])]),code:a(()=>[...l[3]||(l[3]=[n("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-"},[n("span",{class:"line"},[n("span",null,"@startuml")]),s(`
`),n("span",{class:"line"},[n("span",null,":Main Admin: as Admin")]),s(`
`),n("span",{class:"line"},[n("span",null,"(Use the application) as (Use)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"User -> (Start)")]),s(`
`),n("span",{class:"line"},[n("span",null,"User --> (Use)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"Admin ---> (Use)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"note right of Admin : This is an example.")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"note right of (Use)")]),s(`
`),n("span",{class:"line"},[n("span",null,"A note can also")]),s(`
`),n("span",{class:"line"},[n("span",null,"be on several lines")]),s(`
`),n("span",{class:"line"},[n("span",null,"end note")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,'note "This note is connected\\nto several objects." as N2')]),s(`
`),n("span",{class:"line"},[n("span",null,"(Start) .. N2")]),s(`
`),n("span",{class:"line"},[n("span",null,"N2 .. (Use)")]),s(`
`),n("span",{class:"line"},[n("span",null,"@enduml")])])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])]),_:1}),i(e,{title:"类图"},{content:a(()=>[...l[4]||(l[4]=[n("img",{src:"https://www.plantuml.com/plantuml/svg/POzDJWCn38NtFeMNxQ8tOD4HHG89gCHqX11YuGbk2KgSAl48yNTtDEbKcOYL_VmzlpZhf1Hry0weJnh9A1f7AM4poLkRjB3pz38unqPj4B2Y7FTa6BEro9a7HeGNFwjLdLiiDPolrfxJ8_zzcLNPSp6bnqYVcS7qn_C0lm5nsx-pqUSNPCUUHJUa18Z9Vl5Y2Ry0B8F7dVNSYJsjR9gd5X2ljzt3MEzkxhlTLJjwIIGevSlQuNYCdD8ZHR5oI1LiIZi6piY7rJVqx7kE2H1RZLOEk0zXiIoofvXlMxEy3jxz0G00",alt:"PlantUML Diagram"},null,-1)])]),code:a(()=>[...l[5]||(l[5]=[n("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-"},[n("span",{class:"line"},[n("span",null,"@startuml")]),s(`
`),n("span",{class:"line"},[n("span",null,"abstract class AbstractList")]),s(`
`),n("span",{class:"line"},[n("span",null,"abstract AbstractCollection")]),s(`
`),n("span",{class:"line"},[n("span",null,"interface List")]),s(`
`),n("span",{class:"line"},[n("span",null,"interface Collection")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"List <|-- AbstractList")]),s(`
`),n("span",{class:"line"},[n("span",null,"Collection <|-- AbstractCollection")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"Collection <|- List")]),s(`
`),n("span",{class:"line"},[n("span",null,"AbstractCollection <|- AbstractList")]),s(`
`),n("span",{class:"line"},[n("span",null,"AbstractList <|-- ArrayList")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"class ArrayList {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  Object[] elementData")]),s(`
`),n("span",{class:"line"},[n("span",null,"  size()")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"enum TimeUnit {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  DAYS")]),s(`
`),n("span",{class:"line"},[n("span",null,"  HOURS")]),s(`
`),n("span",{class:"line"},[n("span",null,"  MINUTES")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"annotation SuppressWarnings")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"annotation Annotation {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  annotation with members")]),s(`
`),n("span",{class:"line"},[n("span",null,"  String foo()")]),s(`
`),n("span",{class:"line"},[n("span",null,"  String bar()")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"@enduml")])])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])]),_:1}),i(e,{title:"活动图"},{content:a(()=>[...l[6]||(l[6]=[n("img",{src:"https://www.plantuml.com/plantuml/svg/PP5BRiCW48Rtd6AMyIO7m8j6YjIgkoWv0OBVDWe6bqUZtBu2ZEisEyJ_q3Spfn25Zsash3mOFnijxpVuRuDud8HL1bTy9OHuw7h6BHwqY14zqmCTBcB4qTaRPF8wFiyJvBsZEC7I8Vg4ZX7nrVHfTQaWoaaTtfr_2A_Ucj-wxCv-xoH28EbizCw4ldpdKFxHDe6MQj5sV8aJXUYMyeHLUc1RMeUB2t4BF15QeY5clI8ImGJiMvld0x-MqhyNhx0AlkfLhJM3C04TMu4oZ7BaeRI7V27YJMXZzgLbNPnoDFpRt3O9NtTAlbwiOFoPWrV2SaAAc1SZ8dQq5R1iy0Ihqcn-0000",alt:"PlantUML Diagram"},null,-1)])]),code:a(()=>[...l[7]||(l[7]=[n("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-"},[n("span",{class:"line"},[n("span",null,"@startuml")]),s(`
`),n("span",{class:"line"},[n("span",null,"start")]),s(`
`),n("span",{class:"line"},[n("span",null,":ClickServlet.handleRequest();")]),s(`
`),n("span",{class:"line"},[n("span",null,":new page;")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (Page.onSecurityCheck) then (true)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  :Page.onInit();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (isForward?) then (no)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    :Process controls;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (continue processing?) then (no)")]),s(`
`),n("span",{class:"line"},[n("span",null,"      stop")]),s(`
`),n("span",{class:"line"},[n("span",null,"    endif")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (isPost?) then (yes)")]),s(`
`),n("span",{class:"line"},[n("span",null,"      :Page.onPost();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    else (no)")]),s(`
`),n("span",{class:"line"},[n("span",null,"      :Page.onGet();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    endif")]),s(`
`),n("span",{class:"line"},[n("span",null,"    :Page.onRender();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  endif")]),s(`
`),n("span",{class:"line"},[n("span",null,"else (false)")]),s(`
`),n("span",{class:"line"},[n("span",null,"endif")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (do redirect?) then (yes)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  :redirect process;")]),s(`
`),n("span",{class:"line"},[n("span",null,"else")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (do forward?) then (yes)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    :Forward request;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  else (no)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    :Render page template;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  endif")]),s(`
`),n("span",{class:"line"},[n("span",null,"endif")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"stop")]),s(`
`),n("span",{class:"line"},[n("span",null,"@enduml")])])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])]),_:1}),i(e,{title:"组件图"},{content:a(()=>[...l[8]||(l[8]=[n("img",{src:"https://www.plantuml.com/plantuml/svg/RO_1QiCm44Jl-ef1TnzAUouf9MulfGNxPd9Gh6rZ8caTIOQ4udyFab9iGc_BpEoRtKs8oiV96Z6g_gX-2B9XItZpF8qIlm9uRzilLEZgmOU8LxOZEt9n9u3knN4ya5-hin2EDK5-PYU3GY7L1THGpqxVaUxfgAhdj91ulU59PqAtFIix6i93Bj8gghqA1FbnQKwcj7opqUGXsyCGC0JOoqqgTkegYSTKFASDhon1rinB94jF9J4ByS-d-SBrGQkvU4lFCjwSF_o6d9wikG80",alt:"PlantUML Diagram"},null,-1)])]),code:a(()=>[...l[9]||(l[9]=[n("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-"},[n("span",{class:"line"},[n("span",null,"@startuml")]),s(`
`),n("span",{class:"line"},[n("span",null,'package "Some Group" {')]),s(`
`),n("span",{class:"line"},[n("span",null,"  HTTP - [First Component]")]),s(`
`),n("span",{class:"line"},[n("span",null,"  [Another Component]")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,'node "Other Groups" {')]),s(`
`),n("span",{class:"line"},[n("span",null,"  FTP - [Second Component]")]),s(`
`),n("span",{class:"line"},[n("span",null,"  [First Component] --> FTP")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"cloud {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  [Example 1]")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,'database "MySql" {')]),s(`
`),n("span",{class:"line"},[n("span",null,'  folder "This is my folder" {')]),s(`
`),n("span",{class:"line"},[n("span",null,"    [Folder 3]")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,'  frame "Foo" {')]),s(`
`),n("span",{class:"line"},[n("span",null,"    [Frame 4]")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"[Another Component] --> [Example 1]")]),s(`
`),n("span",{class:"line"},[n("span",null,"[Example 1] --> [Folder 3]")]),s(`
`),n("span",{class:"line"},[n("span",null,"[Folder 3] --> [Frame 4]")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"@enduml")])])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])]),_:1}),i(e,{title:"状态图"},{content:a(()=>[...l[10]||(l[10]=[n("img",{src:"https://www.plantuml.com/plantuml/svg/TP2n3eCm34HtVuNdIWpGhK8H_z2nxO28KMaXaI3yVsKJfo1WS-xUuSFL5Eenp4CFKwW3eJnpnBAKoPYeDs_VDPHZMIvJCbe_VdFa04z9_lZE5IBpb6HozeeYaxF603mkBtvZbfcquuRjw8UbojC57mtGRcSiJe56yki8ACSPhHepYoKqEnjKw-zHTZQe_j8U9MTZ9G3TdN7aphT8tTaINawq8YDOu0a9QXyq5k9VE6uKKa--8ybP0FtE0SbM0YjoTXxw7m00",alt:"PlantUML Diagram"},null,-1)])]),code:a(()=>[...l[11]||(l[11]=[n("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-"},[n("span",{class:"line"},[n("span",null,"@startuml")]),s(`
`),n("span",{class:"line"},[n("span",null,"state start1  <<start>>")]),s(`
`),n("span",{class:"line"},[n("span",null,"state choice1 <<choice>>")]),s(`
`),n("span",{class:"line"},[n("span",null,"state fork1   <<fork>>")]),s(`
`),n("span",{class:"line"},[n("span",null,"state join2   <<join>>")]),s(`
`),n("span",{class:"line"},[n("span",null,"state end3    <<end>>")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"[*]     --> choice1 : from start\\nto choice")]),s(`
`),n("span",{class:"line"},[n("span",null,"start1  --> choice1 : from start stereo\\nto choice")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"choice1 --> fork1   : from choice\\nto fork")]),s(`
`),n("span",{class:"line"},[n("span",null,"choice1 --> join2   : from choice\\nto join")]),s(`
`),n("span",{class:"line"},[n("span",null,"choice1 --> end3    : from choice\\nto end stereo")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"fork1   ---> State1 : from fork\\nto state")]),s(`
`),n("span",{class:"line"},[n("span",null,"fork1   --> State2  : from fork\\nto state")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"State2  --> join2   : from state\\nto join")]),s(`
`),n("span",{class:"line"},[n("span",null,"State1  --> [*]     : from state\\nto end")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"join2   --> [*]     : from join\\nto end")]),s(`
`),n("span",{class:"line"},[n("span",null,"@enduml")])])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])]),_:1}),i(e,{title:"对象图"},{content:a(()=>[...l[12]||(l[12]=[n("img",{src:"https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuSfFoafDBb7moSzBoS-3yS8JYpCoyz9B429EgKKvcN2UNsfvP7vHDXTNRcA1WdDYGMP9OevpPacbGZMNGgYtWfQk7Sn0XT1WHmKjNLqxP3CLt5EBSXFpAa4IkdOmiskvkA3cAe14aOoriWeDTkHoICrBAStD0G00",alt:"PlantUML Diagram"},null,-1)])]),code:a(()=>[...l[13]||(l[13]=[n("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-"},[n("span",{class:"line"},[n("span",null,"@startuml")]),s(`
`),n("span",{class:"line"},[n("span",null,"object London")]),s(`
`),n("span",{class:"line"},[n("span",null,"object Washington")]),s(`
`),n("span",{class:"line"},[n("span",null,"object Berlin")]),s(`
`),n("span",{class:"line"},[n("span",null,"object NewYork")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"map CapitalCity {")]),s(`
`),n("span",{class:"line"},[n("span",null," UK *-> London")]),s(`
`),n("span",{class:"line"},[n("span",null," USA *--> Washington")]),s(`
`),n("span",{class:"line"},[n("span",null," Germany *---> Berlin")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"NewYork --> CapitalCity::USA")]),s(`
`),n("span",{class:"line"},[n("span",null,"@enduml")])])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])]),_:1}),i(e,{title:"部署图"},{content:a(()=>[...l[14]||(l[14]=[n("img",{src:"https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuShBJqbL01662AOHWccCO9eWcAPWfg62hYv4lOALGavYKcgE8LHSJm-Y6IPk11MlguEO11CtXehRsaADTKZDIodDpG40",alt:"PlantUML Diagram"},null,-1)])]),code:a(()=>[...l[15]||(l[15]=[n("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-"},[n("span",{class:"line"},[n("span",null,"@startuml")]),s(`
`),n("span",{class:"line"},[n("span",null,"node node1")]),s(`
`),n("span",{class:"line"},[n("span",null,"node node2")]),s(`
`),n("span",{class:"line"},[n("span",null,"node node3")]),s(`
`),n("span",{class:"line"},[n("span",null,"node node4")]),s(`
`),n("span",{class:"line"},[n("span",null,"node node5")]),s(`
`),n("span",{class:"line"},[n("span",null,"node1 -- node2 : label1")]),s(`
`),n("span",{class:"line"},[n("span",null,"node1 .. node3 : label2")]),s(`
`),n("span",{class:"line"},[n("span",null,"node1 ~~ node4 : label3")]),s(`
`),n("span",{class:"line"},[n("span",null,"node1 == node5")]),s(`
`),n("span",{class:"line"},[n("span",null,"@enduml")])])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])]),_:1}),i(e,{title:"时序图"},{content:a(()=>[...l[16]||(l[16]=[n("img",{src:"https://www.plantuml.com/plantuml/svg/RLBBReCm4BplLwp8iOgAGQbKL4KqIkWzX-PO6RmDLXo8R1FIlwyC14oRs-xCUFRbr5YkRNDMO0gk25V83R9LY1Tv8sK02bKN9opK2LjfIxoGbhL01hcikFx1W2gUAmhSCwf6TFzyw23TZf3WbkCdLr9qZBX2KLU5DDHJcyRqU3xXN0XDnc0-S2u7I5zSdBHQMlhAwGWf2ps4AW6GicwGH1CNW-Pr0df925IXDAZg5aJkeY2yXG6uAlSi_Wv0jwFgwg8G89sgBsF0tgUKntB6H82ZxtRtljtiTbamKx31aldeKB2p6t7Nyjz6NEJnJynNF1ueYWEtd6Xmw5jcCKxwBCiofubcwvdgHGndvk0yb3oMrZi9sjex1ou-QYMIWyjz-VqudVf-65nqx4OrbEo92m2HprQ6RyirUcDZWePiSq4hp_HFl5ntlsQs9aomh9M0b2hHdDKl",alt:"PlantUML Diagram"},null,-1)])]),code:a(()=>[...l[17]||(l[17]=[n("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-"},[n("span",{class:"line"},[n("span",null,"@startuml")]),s(`
`),n("span",{class:"line"},[n("span",null,"scale 5 as 150 pixels")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"clock clk with period 1")]),s(`
`),n("span",{class:"line"},[n("span",null,'binary "enable" as en')]),s(`
`),n("span",{class:"line"},[n("span",null,'binary "R/W" as rw')]),s(`
`),n("span",{class:"line"},[n("span",null,'binary "data Valid" as dv')]),s(`
`),n("span",{class:"line"},[n("span",null,'concise "dataBus" as db')]),s(`
`),n("span",{class:"line"},[n("span",null,'concise "address bus" as addr')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"@6 as :write_beg")]),s(`
`),n("span",{class:"line"},[n("span",null,"@10 as :write_end")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"@15 as :read_beg")]),s(`
`),n("span",{class:"line"},[n("span",null,"@19 as :read_end")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"@0")]),s(`
`),n("span",{class:"line"},[n("span",null,"en is low")]),s(`
`),n("span",{class:"line"},[n("span",null,'db is "0x0"')]),s(`
`),n("span",{class:"line"},[n("span",null,'addr is "0x03f"')]),s(`
`),n("span",{class:"line"},[n("span",null,"rw is low")]),s(`
`),n("span",{class:"line"},[n("span",null,"dv is 0")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"@:write_beg-3")]),s(`
`),n("span",{class:"line"},[n("span",null," en is high")]),s(`
`),n("span",{class:"line"},[n("span",null,"@:write_beg-2")]),s(`
`),n("span",{class:"line"},[n("span",null,' db is "0xDEADBEEF"')]),s(`
`),n("span",{class:"line"},[n("span",null,"@:write_beg-1")]),s(`
`),n("span",{class:"line"},[n("span",null,"dv is 1")]),s(`
`),n("span",{class:"line"},[n("span",null,"@:write_beg")]),s(`
`),n("span",{class:"line"},[n("span",null,"rw is high")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"@:write_end")]),s(`
`),n("span",{class:"line"},[n("span",null,"rw is low")]),s(`
`),n("span",{class:"line"},[n("span",null,"dv is low")]),s(`
`),n("span",{class:"line"},[n("span",null,"@:write_end+1")]),s(`
`),n("span",{class:"line"},[n("span",null,"rw is low")]),s(`
`),n("span",{class:"line"},[n("span",null,'db is "0x0"')]),s(`
`),n("span",{class:"line"},[n("span",null,'addr is "0x23"')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"@12")]),s(`
`),n("span",{class:"line"},[n("span",null,"dv is high")]),s(`
`),n("span",{class:"line"},[n("span",null,"@13 ")]),s(`
`),n("span",{class:"line"},[n("span",null,'db is "0xFFFF"')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"@20")]),s(`
`),n("span",{class:"line"},[n("span",null,"en is low")]),s(`
`),n("span",{class:"line"},[n("span",null,"dv is low")]),s(`
`),n("span",{class:"line"},[n("span",null,"@21 ")]),s(`
`),n("span",{class:"line"},[n("span",null,'db is "0x0"')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"highlight :write_beg to :write_end #Gold:Write")]),s(`
`),n("span",{class:"line"},[n("span",null,"highlight :read_beg to :read_end #lightBlue:Read")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"db@:write_beg-1 <-> @:write_end : setup time")]),s(`
`),n("span",{class:"line"},[n("span",null,"db@:write_beg-1 -> addr@:write_end+1 : hold")]),s(`
`),n("span",{class:"line"},[n("span",null,"@enduml")])])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])]),_:1}),i(e,{title:"正则图"},{content:a(()=>[...l[18]||(l[18]=[n("img",{src:"https://www.plantuml.com/plantuml/svg/SoWkIImgAKfDJwtWqhSfBgdCITM8ATRAISnBjzM8LbUArTJGqxBNZ37Ij8yfrjAmjofEpYz8JT6qjzE8ZYcE2OxLrhI9qGVhi-DoICrB0Hi50000",alt:"PlantUML Diagram"},null,-1)])]),code:a(()=>[...l[19]||(l[19]=[n("div",{class:"language-","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-"},[n("span",{class:"line"},[n("span",null,"@startregex")]),s(`
`),n("span",{class:"line"},[n("span",null,`/<style(\\s*lang=(['"])(.*?)\\2)?\\s*(?:scoped)?>([\\s\\S]+)<\\/style>`)]),s(`
`),n("span",{class:"line"},[n("span",null,"@endregex")])])])],-1)])]),_:1}),i(e,{title:"网络图"},{content:a(()=>[...l[20]||(l[20]=[n("img",{src:"https://www.plantuml.com/plantuml/svg/ZP1DQiCm48NtEiNWGXSXf9PmwSAjYJSvGBT95eurE2Qs94OoxW--Ux6mcpHLQD5cqBpvvhrPMrUGwzg6gLxMHGMV3A0YtHbGTNLqpRl_0IXrembU8BhRRF8ypwFKVqkq9TN6rLgDpUVxij7bAODNz62KtvYvDGtsU8Z5n3Z4VAm61g3GzPfE8DkFQJ508IMXjIDVy7ZrDhu7aKHiwdSM2RQ_d1WagzKYMJrcE-L5FDgdqyoudiCsWEPBc4iHHyjGH5qjacodF2FQNn15a2Z-f8ZHsDK5QkMGLD64pi2VnFaCARkPQTPT1HT1aJYBv4rG73w9DOI5j4T4vqDvmW-UkC7Z_-PT-3EE8CpZON-6QZMHZAFPsi06jaObkxRv0W00",alt:"PlantUML Diagram"},null,-1)])]),code:a(()=>[...l[21]||(l[21]=[n("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-"},[n("span",{class:"line"},[n("span",null,"@startuml")]),s(`
`),n("span",{class:"line"},[n("span",null,"nwdiag {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  group nightly {")]),s(`
`),n("span",{class:"line"},[n("span",null,'    color = "#FFAAAA";')]),s(`
`),n("span",{class:"line"},[n("span",null,'    description = "<&clock> Restarted nightly <&clock>";')]),s(`
`),n("span",{class:"line"},[n("span",null,"    web02;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    db01;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  network dmz {")]),s(`
`),n("span",{class:"line"},[n("span",null,'      address = "210.x.x.x/24"')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,'      user [description = "<&person*4.5>\\n user1"];')]),s(`
`),n("span",{class:"line"},[n("span",null,'      web01 [address = "210.x.x.1, 210.x.x.20",  description = "<&cog*4>\\nweb01"]')]),s(`
`),n("span",{class:"line"},[n("span",null,'      web02 [address = "210.x.x.2",  description = "<&cog*4>\\nweb02"];')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  network internal {")]),s(`
`),n("span",{class:"line"},[n("span",null,'      address = "172.x.x.x/24";')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,'      web01 [address = "172.x.x.1"];')]),s(`
`),n("span",{class:"line"},[n("span",null,'      web02 [address = "172.x.x.2"];')]),s(`
`),n("span",{class:"line"},[n("span",null,'      db01 [address = "172.x.x.100",  description = "<&spreadsheet*4>\\n db01"];')]),s(`
`),n("span",{class:"line"},[n("span",null,'      db02 [address = "172.x.x.101",  description = "<&spreadsheet*4>\\n db02"];')]),s(`
`),n("span",{class:"line"},[n("span",null,'      ptr  [address = "172.x.x.110",  description = "<&print*4>\\n ptr01"];')]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"@enduml")])])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])]),_:1}),i(e,{title:"图形界面"},{content:a(()=>[...l[22]||(l[22]=[n("img",{src:"https://www.plantuml.com/plantuml/svg/DOuz2y8m54Ntzolkxk0k8iM2JkBGHIWjHFCqWUGzIQA2RV-x-3NVmpctoiMaaaqeDCnec6DvN6rPE9c04PjR2FcKc0KZrkpCtMl2YCRSlLmmqK03zbSM-6Wk32yBZEYRQ5B1JYttcAWzT6YYQd5VAkFXMF1KZMm_QwrozYd-99O35wz2BJeqJXzmtjf_8zD4RHqqSqSJLIpsVVu5",alt:"PlantUML Diagram"},null,-1)])]),code:a(()=>[...l[23]||(l[23]=[n("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-"},[n("span",{class:"line"},[n("span",null,"@startsalt")]),s(`
`),n("span",{class:"line"},[n("span",null,"{+")]),s(`
`),n("span",{class:"line"},[n("span",null,"{/ <b>General | Fullscreen | Behavior | Saving }")]),s(`
`),n("span",{class:"line"},[n("span",null,"{")]),s(`
`),n("span",{class:"line"},[n("span",null,"{ Open image in: | ^Smart Mode^ }")]),s(`
`),n("span",{class:"line"},[n("span",null,"[X] Smooth images when zoomed")]),s(`
`),n("span",{class:"line"},[n("span",null,"[X] Confirm image deletion")]),s(`
`),n("span",{class:"line"},[n("span",null,"[ ] Show hidden images")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"[Close]")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"@endsalt")])])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])]),_:1}),i(e,{title:"架构图"},{content:a(()=>[...l[24]||(l[24]=[n("img",{src:"https://www.plantuml.com/plantuml/svg/fLN1Rjim33rFNq5amx0DS0SCsAL8Z7hkskIGpgY1d79XRIRHQb669BSBjlxx82UExImDckvcYezFV2HbNbY7nbMg4FPUSea65HZA7FAoeE7mZbRu8BK9G_WjtXXTSHvhmsJWorVn96nff2DuTvSOdP6ry1FDEPfi9HKw-dnNMSbaRL1kt3iyfcGUP4PxU2pBGcRefER0RX1jIAnLgPdO7GdA6emGEn4m62Fd1K5Me5G30BGmZc4ut6KTXZsXRxzjq-von5YwoX1CUA6Dgc_RKCMJKwbkj9EBzPoZF9UU1mj87TxJIXSv6Jlmh3THUYhj30kPewCwVdPgz8GVo3gvR0XELfNWkWvCNXGenZ5y2dBzo074awvr4wLTSzOrUi14Y7W2WP7BbGl2i0xqPMjFPcBMiIQYYqvw4v9co2nvMIkmMyCBQGPrNqZK3brlIYhhj283c2kMrfdjeA25REkASYLRrslky6Di3zrGE_wNFp6ItQlK9xXM_dc-C53iwXnKPH3wCNYcHXt08OaRhs__4VVic7CYcjmtTYB4hWnD-Dv1VtukTLRv-3bFaN59c-zqRHsfkZUNq_ezjp-n8ms-9YQ3nPpZsscF9BwT_aFoBCjOAuBt43tYUiw9BcHM_tAwwclISPH4BqwjHteb6JcJFjD3l5S7UFScm5Vbh2hF_eIxHzSzQqeklF3jsU4H4RMA1dAWqQ9Ef-7TD5k8WfR4EHIqSEBxBrHbGR0mMe5R4GmYls9iPP0pWWmjWNLLlXx0XnybyRNHLVdnJAH4OZGQZKJdhmVdpUQ3PlDj8Rk70UVGMLpGRBi6rXPj3zXkEF9BpUSlBeZpIXL_0G00",alt:"PlantUML Diagram"},null,-1)])]),code:a(()=>[...l[25]||(l[25]=[n("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-"},[n("span",{class:"line"},[n("span",null,"@startuml")]),s(`
`),n("span",{class:"line"},[n("span",null,"skinparam rectangle<<behavior>> {")]),s(`
`),n("span",{class:"line"},[n("span",null,"	roundCorner 25")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"sprite $bProcess jar:archimate/business-process")]),s(`
`),n("span",{class:"line"},[n("span",null,"sprite $aService jar:archimate/application-service")]),s(`
`),n("span",{class:"line"},[n("span",null,"sprite $aComponent jar:archimate/application-component")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,'rectangle "Handle claim"  as HC <<$bProcess>><<behavior>> #Business')]),s(`
`),n("span",{class:"line"},[n("span",null,'rectangle "Capture Information"  as CI <<$bProcess>><<behavior>> #Business')]),s(`
`),n("span",{class:"line"},[n("span",null,'rectangle "Notify\\nAdditional Stakeholders" as NAS <<$bProcess>><<behavior>> #Business')]),s(`
`),n("span",{class:"line"},[n("span",null,'rectangle "Validate" as V <<$bProcess>><<behavior>> #Business')]),s(`
`),n("span",{class:"line"},[n("span",null,'rectangle "Investigate" as I <<$bProcess>><<behavior>> #Business')]),s(`
`),n("span",{class:"line"},[n("span",null,'rectangle "Pay" as P <<$bProcess>><<behavior>> #Business')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"HC *-down- CI")]),s(`
`),n("span",{class:"line"},[n("span",null,"HC *-down- NAS")]),s(`
`),n("span",{class:"line"},[n("span",null,"HC *-down- V")]),s(`
`),n("span",{class:"line"},[n("span",null,"HC *-down- I")]),s(`
`),n("span",{class:"line"},[n("span",null,"HC *-down- P")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"CI -right->> NAS")]),s(`
`),n("span",{class:"line"},[n("span",null,"NAS -right->> V")]),s(`
`),n("span",{class:"line"},[n("span",null,"V -right->> I")]),s(`
`),n("span",{class:"line"},[n("span",null,"I -right->> P")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,'rectangle "Scanning" as scanning <<$aService>><<behavior>> #Application')]),s(`
`),n("span",{class:"line"},[n("span",null,'rectangle "Customer admnistration" as customerAdministration <<$aService>><<behavior>> #Application')]),s(`
`),n("span",{class:"line"},[n("span",null,'rectangle "Claims admnistration" as claimsAdministration <<$aService>><<behavior>> #Application')]),s(`
`),n("span",{class:"line"},[n("span",null,"rectangle Printing <<$aService>><<behavior>> #Application")]),s(`
`),n("span",{class:"line"},[n("span",null,"rectangle Payment <<$aService>><<behavior>> #Application")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"scanning -up-> CI")]),s(`
`),n("span",{class:"line"},[n("span",null,"customerAdministration  -up-> CI")]),s(`
`),n("span",{class:"line"},[n("span",null,"claimsAdministration -up-> NAS")]),s(`
`),n("span",{class:"line"},[n("span",null,"claimsAdministration -up-> V")]),s(`
`),n("span",{class:"line"},[n("span",null,"claimsAdministration -up-> I")]),s(`
`),n("span",{class:"line"},[n("span",null,"Payment -up-> P")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"Printing -up-> V")]),s(`
`),n("span",{class:"line"},[n("span",null,"Printing -up-> P")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,'rectangle "Document\\nManagement\\nSystem" as DMS <<$aComponent>> #Application')]),s(`
`),n("span",{class:"line"},[n("span",null,'rectangle "General\\nCRM\\nSystem" as CRM <<$aComponent>>  #Application')]),s(`
`),n("span",{class:"line"},[n("span",null,'rectangle "Home & Away\\nPolicy\\nAdministration" as HAPA <<$aComponent>> #Application')]),s(`
`),n("span",{class:"line"},[n("span",null,'rectangle "Home & Away\\nFinancial\\nAdministration" as HFPA <<$aComponent>>  #Application')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"DMS .up.|> scanning")]),s(`
`),n("span",{class:"line"},[n("span",null,"DMS .up.|> Printing")]),s(`
`),n("span",{class:"line"},[n("span",null,"CRM .up.|> customerAdministration")]),s(`
`),n("span",{class:"line"},[n("span",null,"HAPA .up.|> claimsAdministration")]),s(`
`),n("span",{class:"line"},[n("span",null,"HFPA .up.|> Payment")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"legend left")]),s(`
`),n("span",{class:"line"},[n("span",null,'Example from the "Archisurance case study" (OpenGroup).')]),s(`
`),n("span",{class:"line"},[n("span",null,"See")]),s(`
`),n("span",{class:"line"},[n("span",null,"====")]),s(`
`),n("span",{class:"line"},[n("span",null,"<$bProcess> :business process")]),s(`
`),n("span",{class:"line"},[n("span",null,"====")]),s(`
`),n("span",{class:"line"},[n("span",null,"<$aService> : application service")]),s(`
`),n("span",{class:"line"},[n("span",null,"====")]),s(`
`),n("span",{class:"line"},[n("span",null,"<$aComponent> : application component")]),s(`
`),n("span",{class:"line"},[n("span",null,"endlegend")]),s(`
`),n("span",{class:"line"},[n("span",null,"@enduml")])])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])]),_:1}),i(e,{title:"甘特图"},{content:a(()=>[...l[26]||(l[26]=[n("img",{src:"https://www.plantuml.com/plantuml/svg/nPJ1Jjmm48RFyLFChQUaIIegfA8AKLHwA2qgN2h4OJQUPjquTh0dfTjgtnt5yMuIMCwSOe_j-R_VC_6fPtHSes4M9vutcZwAC3jNM3jiuRz867qpV9FFrl0tR0c-aFv3h2gCmKzMMmUEP9nVgty4nV5kDgI5bTN3yXbMpOMplP7ZeGj7P7wIrlP19CbNPMYChtHF8jcAf5MQF5j3UuJvXackF5h8AKQjgWE2c-TQ0Nmh4cFvgSevkYOWBfpbY-FV7PgQViGaw9nzUANh2e7n_76MVoZUPJlIcxMg6aFUGuXjHUAfGuTiNM0TTEgPZbRrcdV6brcdf7CVIv4Yx9cylJ_aRRgAhdUT7lWlqTNAm53AAvHIcHhA4PTLIrgDNG00y1JuJFdxs36LjfxaGLkTCitp8cp5LfoyZTr_vUnlgXZ2Z-61rmHbNkPfKQPv8SJj3Vgck0D7zxrovA78GUB62zyRYHj0Hp02217wQMMPRIi0Mcfj0LcMnN4Pn_ItqsYGbJM-E10Rzv6HCEIB1EMCe8m4kuL87i40Vp4vYDnlF92H8atXUbz_Lgm9qbJSNXPtiCQk8-F16ZXwES7-iLZsqL2PULDYrKnLpMTL3KNTt_d0CnXCKt5AHeO7w140",alt:"PlantUML Diagram"},null,-1)])]),code:a(()=>[...l[27]||(l[27]=[n("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-"},[n("span",{class:"line"},[n("span",null,"@startgantt")]),s(`
`),n("span",{class:"line"},[n("span",null,"<style>")]),s(`
`),n("span",{class:"line"},[n("span",null,"ganttDiagram {")]),s(`
`),n("span",{class:"line"},[n("span",null,"	task {")]),s(`
`),n("span",{class:"line"},[n("span",null,"		FontName Helvetica")]),s(`
`),n("span",{class:"line"},[n("span",null,"		FontColor red")]),s(`
`),n("span",{class:"line"},[n("span",null,"		FontSize 18")]),s(`
`),n("span",{class:"line"},[n("span",null,"		FontStyle bold")]),s(`
`),n("span",{class:"line"},[n("span",null,"		BackGroundColor GreenYellow")]),s(`
`),n("span",{class:"line"},[n("span",null,"		LineColor blue")]),s(`
`),n("span",{class:"line"},[n("span",null,"	}")]),s(`
`),n("span",{class:"line"},[n("span",null,"	milestone {")]),s(`
`),n("span",{class:"line"},[n("span",null,"		FontColor blue")]),s(`
`),n("span",{class:"line"},[n("span",null,"		FontSize 25")]),s(`
`),n("span",{class:"line"},[n("span",null,"		FontStyle italic")]),s(`
`),n("span",{class:"line"},[n("span",null,"		BackGroundColor yellow")]),s(`
`),n("span",{class:"line"},[n("span",null,"		LineColor red")]),s(`
`),n("span",{class:"line"},[n("span",null,"	}")]),s(`
`),n("span",{class:"line"},[n("span",null,"	note {")]),s(`
`),n("span",{class:"line"},[n("span",null,"		FontColor DarkGreen")]),s(`
`),n("span",{class:"line"},[n("span",null,"		FontSize 10")]),s(`
`),n("span",{class:"line"},[n("span",null,"		LineColor OrangeRed")]),s(`
`),n("span",{class:"line"},[n("span",null,"	}")]),s(`
`),n("span",{class:"line"},[n("span",null,"	arrow {")]),s(`
`),n("span",{class:"line"},[n("span",null,"		FontName Helvetica")]),s(`
`),n("span",{class:"line"},[n("span",null,"		FontColor red")]),s(`
`),n("span",{class:"line"},[n("span",null,"		FontSize 18")]),s(`
`),n("span",{class:"line"},[n("span",null,"		FontStyle bold")]),s(`
`),n("span",{class:"line"},[n("span",null,"		BackGroundColor GreenYellow")]),s(`
`),n("span",{class:"line"},[n("span",null,"		LineColor blue")]),s(`
`),n("span",{class:"line"},[n("span",null,"		LineStyle 8.0;13.0")]),s(`
`),n("span",{class:"line"},[n("span",null,"		LineThickness 3.0")]),s(`
`),n("span",{class:"line"},[n("span",null,"	}")]),s(`
`),n("span",{class:"line"},[n("span",null,"	separator {")]),s(`
`),n("span",{class:"line"},[n("span",null,"		BackgroundColor lightGreen")]),s(`
`),n("span",{class:"line"},[n("span",null,"		LineStyle 8.0;3.0")]),s(`
`),n("span",{class:"line"},[n("span",null,"		LineColor red")]),s(`
`),n("span",{class:"line"},[n("span",null,"		LineThickness 1.0")]),s(`
`),n("span",{class:"line"},[n("span",null,"		FontSize 16")]),s(`
`),n("span",{class:"line"},[n("span",null,"		FontStyle bold")]),s(`
`),n("span",{class:"line"},[n("span",null,"		FontColor purple")]),s(`
`),n("span",{class:"line"},[n("span",null,"		Margin 5")]),s(`
`),n("span",{class:"line"},[n("span",null,"		Padding 20")]),s(`
`),n("span",{class:"line"},[n("span",null,"	}")]),s(`
`),n("span",{class:"line"},[n("span",null,"	timeline {")]),s(`
`),n("span",{class:"line"},[n("span",null,"	    BackgroundColor Bisque")]),s(`
`),n("span",{class:"line"},[n("span",null,"	}")]),s(`
`),n("span",{class:"line"},[n("span",null,"	closed {")]),s(`
`),n("span",{class:"line"},[n("span",null,"		BackgroundColor pink")]),s(`
`),n("span",{class:"line"},[n("span",null,"		FontColor red")]),s(`
`),n("span",{class:"line"},[n("span",null,"	}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"</style>")]),s(`
`),n("span",{class:"line"},[n("span",null,"Project starts the 2020-12-01")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"[Task1] requires 10 days")]),s(`
`),n("span",{class:"line"},[n("span",null,"sunday are closed")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"note bottom")]),s(`
`),n("span",{class:"line"},[n("span",null,"  memo1 ...")]),s(`
`),n("span",{class:"line"},[n("span",null,"  memo2 ...")]),s(`
`),n("span",{class:"line"},[n("span",null,"  explanations1 ...")]),s(`
`),n("span",{class:"line"},[n("span",null,"  explanations2 ...")]),s(`
`),n("span",{class:"line"},[n("span",null,"end note")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"[Task2] requires 20 days")]),s(`
`),n("span",{class:"line"},[n("span",null,"[Task2] starts 10 days after [Task1]'s end")]),s(`
`),n("span",{class:"line"},[n("span",null,"-- Separator title --")]),s(`
`),n("span",{class:"line"},[n("span",null,"[M1] happens on 5 days after [Task1]'s end")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"<style>")]),s(`
`),n("span",{class:"line"},[n("span",null,"	separator {")]),s(`
`),n("span",{class:"line"},[n("span",null,"	    LineColor black")]),s(`
`),n("span",{class:"line"},[n("span",null,"		Margin 0")]),s(`
`),n("span",{class:"line"},[n("span",null,"		Padding 0")]),s(`
`),n("span",{class:"line"},[n("span",null,"	}")]),s(`
`),n("span",{class:"line"},[n("span",null,"</style>")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"-- end --")]),s(`
`),n("span",{class:"line"},[n("span",null,"@endgantt")])])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])]),_:1}),i(e,{title:"思维导图"},{content:a(()=>[...l[28]||(l[28]=[n("img",{src:"https://www.plantuml.com/plantuml/svg/JP6xRiCm34LtVWMd3bwAxgaGeCxak05gjEWgMxGjGA84FThwxmlPJk29zznBa7gSOv8XMStAIW-3z4axnb5FEH2-GDB94BOBnkmfu8e05PwUHYCdKLEl9KDLZCcudiHddpbbgAeAhvhp7xQQqufDFaG7tTGNV2TtdnAadyMrhIyR-smYYSwPHNqtkqNE6n9T8cbltUQLMuWF6Nqv3_xgDAF47meB6iSJihIqBZl5jSlsm-av2dmLUElQjsEqZFeUVJcJhNO0Cqb50HxFi3EnsXKCn8a2ZiwLycZS6C3GHAmmw6bEWDZDBfIwsMNEhix4Ql-BVm00",alt:"PlantUML Diagram"},null,-1)])]),code:a(()=>[...l[29]||(l[29]=[n("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-"},[n("span",{class:"line"},[n("span",null,"@startmindmap")]),s(`
`),n("span",{class:"line"},[n("span",null,"caption figure 1")]),s(`
`),n("span",{class:"line"},[n("span",null,"title My super title")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"* <&flag>Debian")]),s(`
`),n("span",{class:"line"},[n("span",null,"** <&globe>Ubuntu")]),s(`
`),n("span",{class:"line"},[n("span",null,"*** Linux Mint")]),s(`
`),n("span",{class:"line"},[n("span",null,"*** Kubuntu")]),s(`
`),n("span",{class:"line"},[n("span",null,"*** Lubuntu")]),s(`
`),n("span",{class:"line"},[n("span",null,"*** KDE Neon")]),s(`
`),n("span",{class:"line"},[n("span",null,"** <&graph>LMDE")]),s(`
`),n("span",{class:"line"},[n("span",null,"** <&pulse>SolydXK")]),s(`
`),n("span",{class:"line"},[n("span",null,"** <&people>SteamOS")]),s(`
`),n("span",{class:"line"},[n("span",null,"** <&star>Raspbian with a very long name")]),s(`
`),n("span",{class:"line"},[n("span",null,"*** <s>Raspmbc</s> => OSMC")]),s(`
`),n("span",{class:"line"},[n("span",null,"*** <s>Raspyfi</s> => Volumio")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"header")]),s(`
`),n("span",{class:"line"},[n("span",null,"My super header")]),s(`
`),n("span",{class:"line"},[n("span",null,"endheader")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"center footer My super footer")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"legend right")]),s(`
`),n("span",{class:"line"},[n("span",null,"  Short")]),s(`
`),n("span",{class:"line"},[n("span",null,"  legend")]),s(`
`),n("span",{class:"line"},[n("span",null,"endlegend")]),s(`
`),n("span",{class:"line"},[n("span",null,"@endmindmap")])])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])]),_:1}),i(e,{title:"工作分解结构图"},{content:a(()=>[...l[30]||(l[30]=[n("img",{src:"https://www.plantuml.com/plantuml/svg/DK-xRiCm3Dpr5Pow2Fg7034Gj2WwE4XsMM8T8ZBfYdID_7qXsntlXRixgSLgww3EmnUky263ynuwJ9GHX1i1FVuiL752DdNUUtZFo4RsWZ7EEzFZBxLujq4FLnevt6RubWf9bgfu27Sf2njYtM6FCHEFpli0vmUcPo6r9WNeKMTXfO4A6Utv09-Ief5mMtc-msqk4ZDqmhZjsAWS3VEnOyPIY4TuWqkDqnIFtgqBcb5T2270zKcb_7z9TI5hTq79K24zH97T2JclW_u1",alt:"PlantUML Diagram"},null,-1)])]),code:a(()=>[...l[31]||(l[31]=[n("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-"},[n("span",{class:"line"},[n("span",null,"@startwbs")]),s(`
`),n("span",{class:"line"},[n("span",null,"+ New Job")]),s(`
`),n("span",{class:"line"},[n("span",null,"++ Decide on Job Requirements")]),s(`
`),n("span",{class:"line"},[n("span",null,"+++ Identity gaps")]),s(`
`),n("span",{class:"line"},[n("span",null,"+++ Review JDs")]),s(`
`),n("span",{class:"line"},[n("span",null,"++++ Sign-Up for courses")]),s(`
`),n("span",{class:"line"},[n("span",null,"++++ Volunteer")]),s(`
`),n("span",{class:"line"},[n("span",null,"++++ Reading")]),s(`
`),n("span",{class:"line"},[n("span",null,"++- Checklist")]),s(`
`),n("span",{class:"line"},[n("span",null,"+++- Responsibilities")]),s(`
`),n("span",{class:"line"},[n("span",null,"+++- Location")]),s(`
`),n("span",{class:"line"},[n("span",null,"++ CV Upload Done")]),s(`
`),n("span",{class:"line"},[n("span",null,"+++ CV Updated")]),s(`
`),n("span",{class:"line"},[n("span",null,"++++ Spelling & Grammar")]),s(`
`),n("span",{class:"line"},[n("span",null,"++++ Check dates")]),s(`
`),n("span",{class:"line"},[n("span",null,"---- Skills")]),s(`
`),n("span",{class:"line"},[n("span",null,"+++ Recruitment sites chosen")]),s(`
`),n("span",{class:"line"},[n("span",null,"@endwbs")])])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])]),_:1}),i(e,{title:"JSON"},{content:a(()=>[...l[32]||(l[32]=[n("img",{src:"https://www.plantuml.com/plantuml/svg/RP6nRi8m48PtFyNfkeAQX8IYJA1k7R8meQg3ImnswzYHVMc5AjwzyYL4GcAnTD_vFl-sjv5aeA_edNZIvgojEMi2j39I8pk5TrIsRL0n8Zm37WrTxhkzzaurG_UfmhWbuzKnGV4d0F1amYIk0T-yThX8U3wk1jntXlI8JTnPyvCeXK4nakTK5fkncFBKaEG062aeHRiPOv53uLhOCsSfJD5hm4Rzmi67xnkF98aZD8SRwdqaQLzzoppFiY9Vhl8iGm5mvGntjwxXdUV6E018bvudjU_Kv8JvIJXV0LLLBVDYLIAthul71dywcUD3nxfSiwEirY-JGm1ySBgZDhODogLa8ucz7s8oki5QSHLRvThq_Vy0",alt:"PlantUML Diagram"},null,-1)])]),code:a(()=>[...l[33]||(l[33]=[n("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-"},[n("span",{class:"line"},[n("span",null,"@startjson")]),s(`
`),n("span",{class:"line"},[n("span",null,'#highlight "lastName"')]),s(`
`),n("span",{class:"line"},[n("span",null,'#highlight "address" / "city"')]),s(`
`),n("span",{class:"line"},[n("span",null,'#highlight "phoneNumbers" / "0" / "number"')]),s(`
`),n("span",{class:"line"},[n("span",null,"{")]),s(`
`),n("span",{class:"line"},[n("span",null,'  "firstName": "John",')]),s(`
`),n("span",{class:"line"},[n("span",null,'  "lastName": "Smith",')]),s(`
`),n("span",{class:"line"},[n("span",null,'  "isAlive": true,')]),s(`
`),n("span",{class:"line"},[n("span",null,'  "age": 28,')]),s(`
`),n("span",{class:"line"},[n("span",null,'  "address": {')]),s(`
`),n("span",{class:"line"},[n("span",null,'    "streetAddress": "21 2nd Street",')]),s(`
`),n("span",{class:"line"},[n("span",null,'    "city": "New York",')]),s(`
`),n("span",{class:"line"},[n("span",null,'    "state": "NY",')]),s(`
`),n("span",{class:"line"},[n("span",null,'    "postalCode": "10021-3100"')]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,'  "phoneNumbers": [')]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,'      "type": "home",')]),s(`
`),n("span",{class:"line"},[n("span",null,'      "number": "212 555-1234"')]),s(`
`),n("span",{class:"line"},[n("span",null,"    },")]),s(`
`),n("span",{class:"line"},[n("span",null,"    {")]),s(`
`),n("span",{class:"line"},[n("span",null,'      "type": "office",')]),s(`
`),n("span",{class:"line"},[n("span",null,'      "number": "646 555-4567"')]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  ],")]),s(`
`),n("span",{class:"line"},[n("span",null,'  "children": [],')]),s(`
`),n("span",{class:"line"},[n("span",null,'  "spouse": null')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"@endjson")])])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])]),_:1}),i(e,{title:"YAML"},{content:a(()=>[...l[34]||(l[34]=[n("img",{src:"https://www.plantuml.com/plantuml/svg/NP11ZiCm24NNvXGewtgagErYlEfLc1WdbXmJOJoTt7wKPDSL7o7--_1gHcexhGMYSC21C3Bh3GaJhrJuR0TGsg-XoeQIS9OIkMBhTO0j1xn_ZO_n-Gr_AxM0ffqXATTfyGlN5l0E4vMIw-n_iiOM49p7fVD-rCZlInJfcG-HbEFfvLDEjlXuuC5zU2Jf2kw3uwveNdETMy0dk8tKDCUPJwoRf5SBE89pHIQoBFKyRMDID6KUm5bNA-oZ_1vBzXPuSOt7c_u1",alt:"PlantUML Diagram"},null,-1)])]),code:a(()=>[...l[35]||(l[35]=[n("div",{class:"language- line-numbers-mode","data-highlighter":"shiki","data-ext":"",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[n("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[n("code",{class:"language-"},[n("span",{class:"line"},[n("span",null,"@startyaml")]),s(`
`),n("span",{class:"line"},[n("span",null,'doe: "a deer, a female deer"')]),s(`
`),n("span",{class:"line"},[n("span",null,'ray: "a drop of golden sun"')]),s(`
`),n("span",{class:"line"},[n("span",null,"pi: 3.14159")]),s(`
`),n("span",{class:"line"},[n("span",null,"xmas: true")]),s(`
`),n("span",{class:"line"},[n("span",null,"french-hens: 3")]),s(`
`),n("span",{class:"line"},[n("span",null,"calling-birds: ")]),s(`
`),n("span",{class:"line"},[n("span",null,"	- huey")]),s(`
`),n("span",{class:"line"},[n("span",null,"	- dewey")]),s(`
`),n("span",{class:"line"},[n("span",null,"	- louie")]),s(`
`),n("span",{class:"line"},[n("span",null,"	- fred")]),s(`
`),n("span",{class:"line"},[n("span",null,"xmas-fifth-day: ")]),s(`
`),n("span",{class:"line"},[n("span",null,"	calling-birds: four")]),s(`
`),n("span",{class:"line"},[n("span",null,"	french-hens: 3")]),s(`
`),n("span",{class:"line"},[n("span",null,"	golden-rings: 5")]),s(`
`),n("span",{class:"line"},[n("span",null,"	partridges: ")]),s(`
`),n("span",{class:"line"},[n("span",null,"		count: 1")]),s(`
`),n("span",{class:"line"},[n("span",null,'		location: "a pear tree"')]),s(`
`),n("span",{class:"line"},[n("span",null,"	turtle-doves: two")]),s(`
`),n("span",{class:"line"},[n("span",null,"@endyaml")])])]),n("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1)])]),_:1})])}const v=p(d,[["render",m]]),h=JSON.parse('{"path":"/zh/plugins/markdown/markdown-chart/plantuml.html","title":"PlantUML","lang":"zh-CN","frontmatter":{"icon":"chart-column-stacked","description":"PlantUML 为你站点中的 Markdown 文件添加 PlantUML 支持。 安装 你可以通过以下方式启用此功能： .vuepress/config.ts 语法 你可以插入 PlantUML 支持的相同内容，例如： 示例","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"PlantUML\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-06-07T08:43:56.000Z\\",\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-chart/plantuml.html"}],["meta",{"property":"og:site_name","content":"VuePress 生态系统"}],["meta",{"property":"og:title","content":"PlantUML"}],["meta",{"property":"og:description","content":"PlantUML 为你站点中的 Markdown 文件添加 PlantUML 支持。 安装 你可以通过以下方式启用此功能： .vuepress/config.ts 语法 你可以插入 PlantUML 支持的相同内容，例如： 示例"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:locale:alternate","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2025-06-07T08:43:56.000Z"}],["meta",{"property":"article:modified_time","content":"2025-06-07T08:43:56.000Z"}],["link",{"rel":"alternate","hreflang":"en-us","href":"https://ecosystem.vuejs.press/plugins/markdown/markdown-chart/plantuml.html"}],["link",{"rel":"alternate","type":"application/atom+xml","href":"https://ecosystem.vuejs.press/zh/atom.xml","title":"VuePress 生态系统 Atom Feed"}],["link",{"rel":"alternate","type":"application/json","href":"https://ecosystem.vuejs.press/zh/feed.json","title":"VuePress 生态系统 JSON Feed"}],["link",{"rel":"alternate","type":"application/rss+xml","href":"https://ecosystem.vuejs.press/zh/rss.xml","title":"VuePress 生态系统 RSS Feed"}]]},"git":{"updatedTime":1749285836000,"contributors":[{"name":"Mister-Hope","username":"Mister-Hope","email":"mister-hope@outlook.com","commits":1,"avatar":"https://avatars.githubusercontent.com/Mister-Hope?v=4","url":"https://github.com/Mister-Hope"}],"changelog":[{"hash":"7f5fdff8c26f865b21697b3c6d29bb49d9b20ba4","time":1749285836000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat: add plugin-markdown-chart (#249)"}]},"autoDesc":true,"filePathRelative":"zh/plugins/markdown/markdown-chart/plantuml.md"}');export{v as comp,h as data};
