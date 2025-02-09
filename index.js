import{i as a,a as v,S as w}from"./assets/vendor-D0cagnvz.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();const E="48661000-87492d5612d6e41eb1a42ef3d",I="https://pixabay.com/api/";async function c(t){if(!t||typeof t!="string"||t.trim()==="")return a.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"}),null;try{const e=await v.get(I,{params:{key:E,q:encodeURIComponent(t),image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40}});if(console.log("API Response:",e.data),e.status!==200)throw new Error(`API error: ${e.status}`);return e.data}catch(e){return console.error("Error fetching images:",e),a.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"}),null}}const g=document.querySelector(".gallery");let l;const L=()=>{l&&l.destroy(),l=new w(".gallery a",{captionsData:"alt",captionDelay:250})},m=async t=>{try{if(g.innerHTML="",!t||typeof t!="string")throw new Error("Invalid search query");const e=await c(t);if(!e||!e.hits||e.hits.length===0){d();return}await b(e.hits),L()}catch(e){console.error("Render error:",e),d()}},b=async t=>new Promise(e=>{const r=t.map(({webformatURL:i,largeImageURL:o,tags:s,likes:n,views:f,comments:h,downloads:y})=>`
      <div class="gallery-item">
        <a href="${o}">
          <img src="${i}" alt="${s}" loading="lazy" />
        </a>
        <div class="image-info">
          <div class="item">
            <span class="label">Likes</span>
            <span class="count">${n}</span>
          </div>
          <div class="item">
            <span class="label">Views</span>
            <span class="count">${f}</span>
          </div>
          <div class="item">
            <span class="label">Comments</span>
            <span class="count">${h}</span>
          </div>
          <div class="item">
            <span class="label">Downloads</span>
            <span class="count">${y}</span>
          </div>
        </div>
      </div>
    `).join("");g.insertAdjacentHTML("beforeend",r),e()}),d=()=>{g.innerHTML=`
    <p class="error-message">
      Sorry, no images match your search. Please try again!
    </p>
  `};loadInitialImages();document.querySelector(".gallery");const P=document.querySelector(".search-form");function p(){document.getElementById("loading-overlay").style.display="flex"}function u(){document.getElementById("loading-overlay").style.display="none"}async function $(){p();try{const t=["nature","technology","art","food","travel"],e=t[Math.floor(Math.random()*t.length)];console.log(`Fetching images for: ${e}`);const r=await c(e);if(!r||!r.hits||r.hits.length===0){a.warning({title:"Info",message:`No images found for query: ${e}. Try another one.`,position:"topRight"});return}console.log(`Fetched ${r.hits.length} images for query: ${e}`),m(r.hits)}catch(t){a.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"}),console.error("Error fetching random images:",t)}finally{u()}}$();P.addEventListener("submit",async t=>{t.preventDefault();const e=t.target.elements.searchQuery.value.trim();if(!e){a.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"});return}p();try{const r=await c(e);if(!r||!r.hits||r.hits.length===0){a.info({title:"Info",message:"No images found for your query.",position:"topRight"});return}console.log(`Fetched ${r.hits.length} images for query: ${e}`),m(r.hits)}catch(r){a.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"}),console.error("Error fetching search images:",r)}finally{u()}});
//# sourceMappingURL=index.js.map
