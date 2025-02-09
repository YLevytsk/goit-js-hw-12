import{i as o,a as h,S as v}from"./assets/vendor-D0cagnvz.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(t){if(t.ep)return;t.ep=!0;const a=s(t);fetch(t.href,a)}})();const L="48661000-87492d5612d6e41eb1a42ef3d",w="https://pixabay.com/api/";async function c(r){if(!r||r.trim()==="")return o.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"}),[];try{const e=await h.get(w,{params:{key:L,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0}});return e.data.totalHits>0?e.data.hits:(o.warning({title:"Info",message:"No images found. Please try another search term.",position:"topRight"}),[])}catch{return o.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"}),[]}}const l=document.querySelector(".gallery"),b=new v(".gallery a",{captionsData:"alt",captionDelay:250});async function m(r){try{l.innerHTML="";const e=await c(r);if(!e||e.length===0){d();return}const s=e.map(({webformatURL:i,largeImageURL:t,tags:a,likes:n,views:u,comments:f,downloads:y})=>`
        <div class="gallery-item">
          <a href="${t}">
            <img src="${i}" alt="${a}" loading="lazy" />
          </a>
          <div class="image-info">
            <div class="item">
              <span class="label">Likes</span>
              <span class="count">${n}</span>
            </div>
            <div class="item">
              <span class="label">Views</span>
              <span class="count">${u}</span>
            </div>
            <div class="item">
              <span class="label">Comments</span>
              <span class="count">${f}</span>
            </div>
            <div class="item">
              <span class="label">Downloads</span>
              <span class="count">${y}</span>
            </div>
          </div>
        </div>`).join("");l.innerHTML=s,b.refresh()}catch(e){console.error("Error fetching images:",e),d()}}function d(){l.innerHTML=`
    <p class="error-message">
      Sorry, no images match your search. Please try again!
    </p>
  `}document.querySelector(".gallery");const P=document.querySelector(".search-form");function g(){document.getElementById("loading-overlay").style.display="flex"}function p(){document.getElementById("loading-overlay").style.display="none"}async function E(){g();try{const e=await c("nature,technology,art,food,travel");m(e)}catch{o.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"})}finally{p()}}E();P.addEventListener("submit",async r=>{r.preventDefault();const e=r.target.elements.searchQuery.value.trim();if(!e||e.trim()===""){o.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"});return}g();try{const s=await c(e);m(s)}catch{o.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"})}finally{p()}});
//# sourceMappingURL=index.js.map
