import{i as a,a as u,S as f}from"./assets/vendor-D0cagnvz.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();const h="48661000-87492d5612d6e41eb1a42ef3d",y="https://pixabay.com/api/";async function l(t){if(!t||typeof t!="string"||t.trim()==="")return a.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"}),null;try{const e=await u.get(y,{params:{key:h,q:encodeURIComponent(t),image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40}});if(console.log("API Response:",e.data),e.status!==200)throw new Error(`API error: ${e.status}`);return e.data}catch(e){return console.error("Error fetching images:",e),a.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"}),null}}const c=document.querySelector(".gallery"),v=new f(".gallery a",{captionsData:"alt",captionDelay:250});function g(t){if(!Array.isArray(t)||t.length===0){w();return}c.innerHTML=t.map(({webformatURL:e,largeImageURL:r,tags:i,likes:o,views:s,comments:n,downloads:p})=>`
    <div class="gallery-item">
      <a href="${r}">
        <img src="${e}" alt="${i}" loading="lazy" />
      </a>
      <div class="image-info">
        <div class="item"><span class="label">Likes</span><span class="count">${o}</span></div>
        <div class="item"><span class="label">Views</span><span class="count">${s}</span></div>
        <div class="item"><span class="label">Comments</span><span class="count">${n}</span></div>
        <div class="item"><span class="label">Downloads</span><span class="count">${p}</span></div>
      </div>
    </div>`).join(""),v.refresh()}function w(){c.innerHTML=`
    <p class="error-message">
      Sorry, no images match your search. Please try again!
    </p>
  `}document.querySelector(".gallery");const E=document.querySelector(".search-form");function d(){document.getElementById("loading-overlay").style.display="flex"}function m(){document.getElementById("loading-overlay").style.display="none"}async function $(){d();try{const t=["nature","technology","art","food","travel"],e=t[Math.floor(Math.random()*t.length)];console.log(`Fetching images for: ${e}`);const r=await l(e);if(!r||!r.hits||r.hits.length===0){a.warning({title:"Info",message:`No images found for query: ${e}. Try another one.`,position:"topRight"});return}console.log(`Fetched ${r.hits.length} images for query: ${e}`),g(r.hits)}catch(t){a.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"}),console.error("Error fetching random images:",t)}finally{m()}}$();E.addEventListener("submit",async t=>{t.preventDefault();const e=t.target.elements.searchQuery.value.trim();if(!e){a.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"});return}d();try{const r=await l(e);if(!r||!r.hits||r.hits.length===0){a.info({title:"Info",message:"No images found for your query.",position:"topRight"});return}console.log(`Fetched ${r.hits.length} images for query: ${e}`),g(r.hits)}catch(r){a.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"}),console.error("Error fetching search images:",r)}finally{m()}});
//# sourceMappingURL=index.js.map
