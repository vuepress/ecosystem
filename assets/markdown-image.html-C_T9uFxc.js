import{_ as h,a as l,b as i}from"./favicon-HNjzjc5a.js";import{c as p,a,b as e,d as t,r as k,o as r,j as d}from"./app-Hy3CkDjp.js";const A={__name:"markdown-image.html",setup(o){return(g,s)=>{const n=k("NpmBadge");return r(),p("div",null,[s[0]||(s[0]=a("h1",{id:"markdown-image",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#markdown-image"},[a("span",null,"markdown-image")])],-1)),e(n,{package:"@vuepress/plugin-markdown-image"}),s[1]||(s[1]=t(`<p>Add additional features to your markdown images.</p><h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage"><span>Usage</span></a></h2><div class="language-bash" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">npm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> i</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -D</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> @vuepress/plugin-markdown-image@next</span></span></code></pre></div><div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">markdownImagePlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;@vuepress/plugin-markdown-image&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">export</span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD;"> default</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  plugins</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    markdownImagePlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">({</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">      // Enable figure</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      figure</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">      // Enable image lazyload</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      lazyload</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">      // Enable image mark</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      mark</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">      // Enable image size</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      size</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  ],</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="guide" tabindex="-1"><a class="header-anchor" href="#guide"><span>Guide</span></a></h2><h3 id="image-lazyload" tabindex="-1"><a class="header-anchor" href="#image-lazyload"><span>Image Lazyload</span></a></h3><p>The plugin will enable image lazyload using native HTML5 features, so only it&#39;s only working on browsers which <a href="https://caniuse.com/loading-lazy-attr" target="_blank" rel="noopener noreferrer">support loading=lazy attribute</a>.</p><h3 id="image-mark" tabindex="-1"><a class="header-anchor" href="#image-mark"><span>Image Mark</span></a></h3><p>When you set <code>mark: true</code> in plugin options, you can mark pictures by <code>#light</code> and <code>#dark</code> suffix to let them be displayed under certain color mode.</p>`,9)),e(d),s[2]||(s[2]=t(' (Try to toggle theme mode)<p><img src="'+h+'" alt="GitHub Light" data-mode="darkmode-only"><br><img src="'+l+`" alt="GitHub Dark" data-mode="lightmode-only"></p><div class="language-md" data-highlighter="shiki" data-ext="md" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">![</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">GitHub Light</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">]</span><span style="--shiki-light:#A626A4;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#A626A4;--shiki-light-text-decoration:inherit;--shiki-dark:#C678DD;--shiki-dark-text-decoration:underline;">/images/icon/github-light.svg#dark</span><span style="--shiki-light:#A626A4;--shiki-dark:#E06C75;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">![</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">GitHub Dark</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">]</span><span style="--shiki-light:#A626A4;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#A626A4;--shiki-light-text-decoration:inherit;--shiki-dark:#C678DD;--shiki-dark-text-decoration:underline;">/images/icon/github-dark.svg#light</span><span style="--shiki-light:#A626A4;--shiki-dark:#E06C75;">)</span></span></code></pre></div><h4 id="advanced" tabindex="-1"><a class="header-anchor" href="#advanced"><span>Advanced</span></a></h4><p>You can pass an object to <code>mark</code> to config ID marks, available options are:</p><div class="language-ts" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">interface</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> ImageMarkOptions</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  /** lightmode only IDs */</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">  light</span><span style="--shiki-light:#0184BC;--shiki-dark:#C678DD;">?</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#0184BC;--shiki-dark:#E5C07B;"> string</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[]</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  /** darkmode only IDs */</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">  dark</span><span style="--shiki-light:#0184BC;--shiki-dark:#C678DD;">?</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#0184BC;--shiki-dark:#E5C07B;"> string</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre></div><h3 id="image-size" tabindex="-1"><a class="header-anchor" href="#image-size"><span>Image Size</span></a></h3><p>You can use <code>=widthxheight</code> to specify the image size when setting <code>size: true</code> in plugin options.</p><div class="language-md" data-highlighter="shiki" data-ext="md" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">!</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Alt</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF;">]</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(/example.png =200x300)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">!</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Alt</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF;">]</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(/example.jpg &quot;Image title&quot; =200x)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">!</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Alt</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF;">]</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(/example.bmp =x300)</span></span></code></pre></div><p>The above Markdown will be parsed as:</p><div class="language-html" data-highlighter="shiki" data-ext="html" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">img</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> src</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;/example.png&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> width</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;200&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> height</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;300&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> /&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">img</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> src</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;/example.jpg&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> title</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;Image title&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> width</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;200&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> /&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">img</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> src</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;/example.bmp&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> height</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;300&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> /&gt;</span></span></code></pre></div><h3 id="figure-display" tabindex="-1"><a class="header-anchor" href="#figure-display"><span>Figure Display</span></a></h3><p>Sometimes, you may want to add a description with image and place it between contents, in this case you should set <code>figure: true</code> in plugin options.</p><p>If the image is standalone in a line, wrapped or not wrapped by link, it will be displayed as <code>&lt;figure&gt;</code> and title (or alt) will be displayed as <code>&lt;figcaption&gt;</code>.</p><figure><img src="`+i+'" alt="VuePress Logo" tabindex="0"><figcaption>VuePress Logo</figcaption></figure><figure><a href="https://vuejs.press/" target="_blank" rel="noopener noreferrer"><img src="'+i+'" alt="VuePress Logo" tabindex="0"></a><figcaption>VuePress Logo</figcaption></figure><figure><img src="'+i+'" alt="VuePress Logo" tabindex="0"><figcaption>VuePress Logo</figcaption></figure><figure><a href="https://vuejs.press/" target="_blank" rel="noopener noreferrer"><img src="'+i+`" alt="VuePress Logo" tabindex="0"></a><figcaption>VuePress Logo</figcaption></figure><figure><img src="https://vuejs.press/images/hero.png" alt="VuePress Logo" width="300" height="300" tabindex="0"><figcaption>VuePress Logo</figcaption></figure><div class="language-md" data-highlighter="shiki" data-ext="md" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">![</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">VuePress Logo</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">]</span><span style="--shiki-light:#A626A4;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#A626A4;--shiki-light-text-decoration:inherit;--shiki-dark:#C678DD;--shiki-dark-text-decoration:underline;">/favicon.ico</span><span style="--shiki-light:#A626A4;--shiki-dark:#E06C75;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">![VuePress Logo]</span><span style="--shiki-light:#A626A4;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#A626A4;--shiki-light-text-decoration:inherit;--shiki-dark:#C678DD;--shiki-dark-text-decoration:underline;">/favicon.ico</span><span style="--shiki-light:#A626A4;--shiki-dark:#E06C75;">)</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF;">]</span><span style="--shiki-light:#A626A4;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#A626A4;--shiki-light-text-decoration:inherit;--shiki-dark:#C678DD;--shiki-dark-text-decoration:underline;">https://vuejs.press/</span><span style="--shiki-light:#A626A4;--shiki-dark:#E06C75;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">![</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">VuePress Logo</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">]</span><span style="--shiki-light:#A626A4;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#A626A4;--shiki-light-text-decoration:inherit;--shiki-dark:#C678DD;--shiki-dark-text-decoration:underline;">/favicon.ico</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> &#39;</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379;">VuePress Logo</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">&#39;</span><span style="--shiki-light:#A626A4;--shiki-dark:#E06C75;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">![VuePress Logo]</span><span style="--shiki-light:#A626A4;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#A626A4;--shiki-light-text-decoration:inherit;--shiki-dark:#C678DD;--shiki-dark-text-decoration:underline;">/favicon.ico</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> &#39;</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379;">VuePress Logo</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">&#39;</span><span style="--shiki-light:#A626A4;--shiki-dark:#E06C75;">)</span><span style="--shiki-light:#986801;--shiki-dark:#ABB2BF;">]</span><span style="--shiki-light:#A626A4;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#A626A4;--shiki-light-text-decoration:inherit;--shiki-dark:#C678DD;--shiki-dark-text-decoration:underline;">https://vuejs.press/</span><span style="--shiki-light:#A626A4;--shiki-dark:#E06C75;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">![VuePress Logo](https://vuejs.press/images/hero.png &quot;VuePress Logo&quot; =300x300)</span></span></code></pre></div><h2 id="options" tabindex="-1"><a class="header-anchor" href="#options"><span>Options</span></a></h2><h3 id="figure" tabindex="-1"><a class="header-anchor" href="#figure"><span>figure</span></a></h3><ul><li>Type: <code>boolean</code></li><li>Details: Whether enable figure support.</li></ul><h3 id="lazyload" tabindex="-1"><a class="header-anchor" href="#lazyload"><span>lazyload</span></a></h3><ul><li>Type: <code>boolean</code></li><li>Details: Whether to lazy load every image in page in native way.</li></ul><h3 id="mark" tabindex="-1"><a class="header-anchor" href="#mark"><span>mark</span></a></h3><ul><li><p>Type: <code>ImageMarkOptions | boolean</code></p><div class="language-ts" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">interface</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> ImageMarkOptions</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  /** lightmode only IDs */</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">  light</span><span style="--shiki-light:#0184BC;--shiki-dark:#C678DD;">?</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#0184BC;--shiki-dark:#E5C07B;"> string</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[]</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  /** darkmode only IDs */</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">  dark</span><span style="--shiki-light:#0184BC;--shiki-dark:#C678DD;">?</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#0184BC;--shiki-dark:#E5C07B;"> string</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre></div></li><li><p>Details: Whether enable image mark support.</p></li></ul><h3 id="size" tabindex="-1"><a class="header-anchor" href="#size"><span>size</span></a></h3><ul><li>Type: <code>boolean</code></li><li>Details:<br> Whether enable image size support.</li></ul><h3 id="obsidiansize" tabindex="-1"><a class="header-anchor" href="#obsidiansize"><span>obsidianSize</span></a></h3><ul><li>Type: <code>boolean</code></li><li>Details: Whether enable Obsidian image size support.</li></ul>`,31))])}}},y=JSON.parse(`{"path":"/plugins/markdown/markdown-image.html","title":"markdown-image","lang":"en-US","frontmatter":{"icon":"image","description":"markdown-image","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"markdown-image\\",\\"image\\":[\\"https://ecosystem.vuejs.press/images/icon/github-light.svg#dark\\",\\"https://ecosystem.vuejs.press/images/icon/github-dark.svg#light\\",\\"https://ecosystem.vuejs.press/images/icon/github-light.svg#dark\\",\\"https://ecosystem.vuejs.press/images/icon/github-dark.svg#light\\",\\"https://ecosystem.vuejs.press/example.png =200x300\\",\\"https://ecosystem.vuejs.press/example.jpg \\\\\\"Image title\\\\\\" =200x\\",\\"https://ecosystem.vuejs.press/example.bmp =x300\\",\\"https://ecosystem.vuejs.press/favicon.ico\\",\\"https://ecosystem.vuejs.press/favicon.ico\\",\\"https://ecosystem.vuejs.press/favicon.ico 'VuePress Logo'\\",\\"https://ecosystem.vuejs.press/favicon.ico 'VuePress Logo'\\",\\"https://vuejs.press/images/hero.png \\\\\\"VuePress Logo\\\\\\" =300x300\\",\\"https://ecosystem.vuejs.press/favicon.ico\\",\\"https://ecosystem.vuejs.press/favicon.ico\\",\\"https://ecosystem.vuejs.press/favicon.ico 'VuePress Logo'\\",\\"https://ecosystem.vuejs.press/favicon.ico 'VuePress Logo'\\",\\"https://vuejs.press/images/hero.png \\\\\\"VuePress Logo\\\\\\" =300x300\\"],\\"dateModified\\":\\"2025-01-10T18:07:54.000Z\\",\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://ecosystem.vuejs.press/plugins/markdown/markdown-image.html"}],["meta",{"property":"og:site_name","content":"VuePress Ecosystem"}],["meta",{"property":"og:title","content":"markdown-image"}],["meta",{"property":"og:description","content":"markdown-image"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://ecosystem.vuejs.press/images/icon/github-light.svg#dark"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:locale:alternate","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-01-10T18:07:54.000Z"}],["meta",{"property":"article:modified_time","content":"2025-01-10T18:07:54.000Z"}],["link",{"rel":"alternate","hreflang":"zh-cn","href":"https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-image.html"}],["link",{"rel":"alternate","type":"application/atom+xml","href":"https://ecosystem.vuejs.press/atom.xml","title":"VuePress Ecosystem Atom Feed"}],["link",{"rel":"alternate","type":"application/json","href":"https://ecosystem.vuejs.press/feed.json","title":"VuePress Ecosystem JSON Feed"}],["link",{"rel":"alternate","type":"application/rss+xml","href":"https://ecosystem.vuejs.press/rss.xml","title":"VuePress Ecosystem RSS Feed"}]]},"git":{"updatedTime":1736532474000,"contributors":[{"name":"张怀文","username":"","email":"mister-hope@outlook.com","commits":1,"avatar":"https://gravatar.com/avatar/d92a8c6a31f27b708fae0e278bece19c6290f09e49e37bf3aa13da9a5252649f?d=retro"},{"name":"Mister-Hope","username":"Mister-Hope","email":"mister-hope@outlook.com","commits":6,"avatar":"https://avatars.githubusercontent.com/Mister-Hope?v=4","url":"https://github.com/Mister-Hope"}],"changelog":[{"hash":"ae96c427eeb664c8d361963d1815a68386856bbe","time":1736532474000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"docs: add icons to docs (#332)"},{"hash":"d6790068c34d8ff71017ba606cf71cb295e33a94","time":1726829239000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"docs: update docs"},{"hash":"16dfaa2fbb7fbc0e4728434267e427a87bf54b7a","time":1724311567000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat(plugin-markdown-image): remove lightmodeSelector and darkmodeSelector"},{"hash":"e8258c1b663ad218b1607a2619c02fccaf7d9831","time":1724305751000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat: init guidelines (#198)"},{"hash":"7080aa3079f4198ad0d124ad4bd2361fc75b8672","time":1717309547000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"feat(theme-default)!: update theme structure and class names (#188)"},{"hash":"abd787c6f128028703d28a7bc8128bb1d4ab92f4","time":1716961207000,"email":"mister-hope@outlook.com","author":"Mister-Hope","message":"chore: update repo structure (#159)"},{"hash":"9bdf83cd20eb76025e86e71d34f199951feac89c","time":1715672744000,"email":"mister-hope@outlook.com","author":"张怀文","message":"feat: add plugin-markdown-image (#132)"}]},"autoDesc":true,"filePathRelative":"plugins/markdown/markdown-image.md"}`);export{A as comp,y as data};
