import{i as l,a as I}from"./assets/vendor-DdYF2qEG.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=a(t);fetch(t.href,s)}})();const R="48661000-87492d5612d6e41eb1a42ef3d",q="https://pixabay.com/api/";async function y(e,r=1,a=40){if(!e||typeof e!="string"||e.trim()==="")return l.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"}),null;try{const o=await I.get(q,{params:{key:R,q:encodeURIComponent(e),image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:a,page:r}});if(console.log("API Response:",o.data),o.status!==200)throw new Error(`API error: ${o.status}`);return!o.data.hits||o.data.hits.length===0?(l.info({title:"Info",message:"No images found for your search!",position:"topRight"}),null):{hits:o.data.hits,totalHits:Math.min(o.data.totalHits,500)}}catch(o){return console.error("Error fetching images:",o),l.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"}),null}}const d=document.getElementById("loading-overlay"),n=document.querySelector(".load-more");function h(){d&&(d.style.display="flex"),n&&(n.style.display="none")}function m(){d&&(d.style.display="none"),n&&(n.style.display="block")}function v(){document.querySelector(".gallery").innerHTML=""}function L(e,r=!1){const a=document.querySelector(".gallery");if(!Array.isArray(e)||e.length===0)return;r||v();const o=e.map(({webformatURL:t,largeImageURL:s,tags:i,likes:b,views:w,comments:P,downloads:E})=>`
    <div class="gallery-item">
      <a href="${s}">
        <img src="${t}" alt="${i}" loading="lazy" />
      </a>
      <div class="image-info">
        <div class="item"><span class="label">Likes</span><span class="count">${b}</span></div>
        <div class="item"><span class="label">Views</span><span class="count">${w}</span></div>
        <div class="item"><span class="label">Comments</span><span class="count">${P}</span></div>
        <div class="item"><span class="label">Downloads</span><span class="count">${E}</span></div>
      </div>
    </div>`).join("");a.insertAdjacentHTML("beforeend",o)}function A(){n&&(n.style.display="block")}function u(){n&&(n.style.display="none")}const M=document.querySelector(".search-form"),S=document.querySelector(".load-more");let c="",f=1;const g=40;let p=0;u();M.addEventListener("submit",async e=>{if(e.preventDefault(),c=e.target.elements.searchQuery.value.trim(),!c){l.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"});return}f=1,v(),u(),h();try{const r=await y(c,f,g);if(!r||!r.hits.length){l.info({title:"Info",message:"No images found for your query.",position:"topRight"}),m();return}p=Math.min(r.totalHits,500),L(r.hits),p>g&&A()}catch(r){console.error("Error fetching images:",r)}finally{m()}});S.addEventListener("click",async()=>{if(document.querySelector(".gallery").children.length>=p){u();return}f+=1,h();try{const e=await y(c,f,g);e&&e.hits.length>0&&L(e.hits,!0),document.querySelector(".gallery").children.length>=p&&u()}catch(e){console.error("Error loading more images:",e)}finally{m()}});
//# sourceMappingURL=index.js.map
