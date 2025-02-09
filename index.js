import{i as a,a as y,S as v}from"./assets/vendor-D0cagnvz.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function t(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=t(o);fetch(o.href,s)}})();const E="48661000-87492d5612d6e41eb1a42ef3d",w="https://pixabay.com/api/";async function c(r){if(!r||typeof r!="string"||r.trim()==="")return a.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"}),null;try{const e=await y.get(w,{params:{key:E,q:encodeURIComponent(r),image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40}});if(console.log("API Response:",e.data),e.status!==200)throw new Error(`API error: ${e.status}`);return e.data}catch(e){return console.error("Error fetching images:",e),a.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"}),null}}const m=document.querySelector(".gallery"),$=new v(".gallery a",{captionsData:"alt",captionDelay:250});async function g(r){try{if(!Array.isArray(r)||r.length===0){console.error("Expected an array of images, but received:",r),i();return}m.innerHTML=r.map(({webformatURL:e,largeImageURL:t,tags:n,likes:o,views:s,comments:l,downloads:p})=>`
      <div class="gallery-item">
        <a href="${t}">
          <img src="${e}" alt="${n}" loading="lazy" />
        </a>
        <div class="image-info">
          <div class="item"><span class="label">Likes</span><span class="count">${o}</span></div>
          <div class="item"><span class="label">Views</span><span class="count">${s}</span></div>
          <div class="item"><span class="label">Comments</span><span class="count">${l}</span></div>
          <div class="item"><span class="label">Downloads</span><span class="count">${p}</span></div>
        </div>
      </div>`).join(""),$.refresh()}catch(e){console.error("Error rendering images:",e),i()}}function i(){m.innerHTML=`
    <p class="error-message">
      Sorry, no images match your search. Please try again!
    </p>
  `}const d=document.querySelector(".search-form"),u=document.querySelector('input[name="searchQuery"]');d&&u?d.addEventListener("submit",async r=>{var n;r.preventDefault();const e=(n=u.value)==null?void 0:n.trim();if(!e){console.error("Invalid search input:",e),i();return}const t=await c(e);t&&t.hits?g(t.hits):i()}):console.error("Search form or input not found in DOM");async function I(){try{const r=["nature","technology","art","food","travel"],e=r[Math.floor(Math.random()*r.length)];console.log(`Fetching images for: ${e}`);const t=await c(e);t&&t.hits?g(t.hits):i()}catch(r){console.error("Error fetching random images:",r),i()}}I();document.querySelector(".gallery");const b=document.querySelector(".search-form");function f(){document.getElementById("loading-overlay").style.display="flex"}function h(){document.getElementById("loading-overlay").style.display="none"}async function L(){f();try{const r=["nature","technology","art","food","travel"],e=r[Math.floor(Math.random()*r.length)];console.log(`Fetching images for: ${e}`);const t=await c(e);if(!t||!t.hits||t.hits.length===0){a.warning({title:"Info",message:`No images found for query: ${e}. Try another one.`,position:"topRight"});return}console.log(`Fetched ${t.hits.length} images for query: ${e}`),g(t.hits)}catch(r){a.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"}),console.error("Error fetching random images:",r)}finally{h()}}L();b.addEventListener("submit",async r=>{r.preventDefault();const e=r.target.elements.searchQuery.value.trim();if(!e){a.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"});return}f();try{const t=await c(e);if(!t||!t.hits||t.hits.length===0){a.info({title:"Info",message:"No images found for your query.",position:"topRight"});return}console.log(`Fetched ${t.hits.length} images for query: ${e}`),g(t.hits)}catch(t){a.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"}),console.error("Error fetching search images:",t)}finally{h()}});
//# sourceMappingURL=index.js.map
