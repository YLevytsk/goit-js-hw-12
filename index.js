import{i as o,a as f,S as y}from"./assets/vendor-D0cagnvz.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(e){if(e.ep)return;e.ep=!0;const a=s(e);fetch(e.href,a)}})();const h="48661000-87492d5612d6e41eb1a42ef3d",v="https://pixabay.com/api/";async function c(r){if(!r||r.trim()==="")return o.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"}),[];try{const t=await f.get(v,{params:{key:h,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0}});return t.data.totalHits>0?t.data.hits:(o.warning({title:"Info",message:"No images found. Please try another search term.",position:"topRight"}),[])}catch{return o.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"}),[]}}const l=document.querySelector(".gallery"),L=new y(".gallery a",{captionsData:"alt",captionDelay:250});function d(r){if(l.innerHTML="",r.length===0){b();return}const t=r.map(({webformatURL:s,largeImageURL:i,tags:e,likes:a,views:n,comments:u,downloads:g})=>`
  <div class="gallery-item">
    <a href="${i}">
      <img src="${s}" alt="${e}" loading="lazy" />
    </a>
    <div class="image-info">
      <div class="item">
        <span class="label">Likes</span>
        <span class="count">${a}</span>
      </div>
      <div class="item">
        <span class="label">Views</span>
        <span class="count">${n}</span>
      </div>
      <div class="item">
        <span class="label">Comments</span>
        <span class="count">${u}</span>
      </div>
      <div class="item">
        <span class="label">Downloads</span>
        <span class="count">${g}</span>
      </div>
    </div>
  </div>
`).join("");l.innerHTML=t,L.refresh()}function b(){l.innerHTML=`
    <p class="error-message">
      Sorry, no images match your search. Please try again!
    </p>
  `}document.querySelector(".gallery");const w=document.querySelector(".search-form");function m(){document.getElementById("loading-overlay").style.display="flex"}function p(){document.getElementById("loading-overlay").style.display="none"}async function P(){m();try{const t=await c("nature,technology,art,food,travel");d(t)}catch{o.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"})}finally{p()}}P();w.addEventListener("submit",async r=>{r.preventDefault();const t=r.target.elements.searchQuery.value.trim();if(!t||t.trim()===""){o.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"});return}m();try{const s=await c(t);d(s)}catch{o.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"})}finally{p()}});
//# sourceMappingURL=index.js.map
