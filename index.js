import{i as o,a as b,S as w}from"./assets/vendor-D0cagnvz.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))c(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function s(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function c(r){if(r.ep)return;r.ep=!0;const a=s(r);fetch(r.href,a)}})();const E="48661000-87492d5612d6e41eb1a42ef3d",P="https://pixabay.com/api/";async function m(t){if(!t||t.trim()==="")return o.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"}),[];try{const e=await b.get(P,{params:{key:E,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0}});return e.data.totalHits>0?e.data.hits:(o.warning({title:"Info",message:"No images found. Please try another search term.",position:"topRight"}),[])}catch{return o.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"}),[]}}const l=document.querySelector(".gallery"),I=new w(".gallery a",{captionsData:"alt",captionDelay:250});async function d(t){try{if(typeof t!="string"){console.error("Expected a string, but received:",t),i();return}const e=t.trim();if(e===""){i();return}l.innerHTML="";const s=await m(e);if(!Array.isArray(s)||s.length===0){console.error("Unexpected response from fetchImages:",s),i();return}const c=s.map(({webformatURL:r,largeImageURL:a,tags:n,likes:y,views:h,comments:v,downloads:L})=>`
      <div class="gallery-item">
        <a href="${a}">
          <img src="${r}" alt="${n}" loading="lazy" />
        </a>
        <div class="image-info">
          <div class="item"><span class="label">Likes</span><span class="count">${y}</span></div>
          <div class="item"><span class="label">Views</span><span class="count">${h}</span></div>
          <div class="item"><span class="label">Comments</span><span class="count">${v}</span></div>
          <div class="item"><span class="label">Downloads</span><span class="count">${L}</span></div>
        </div>
      </div>`).join("");l.innerHTML=c,I.refresh()}catch(e){console.error("Error fetching images:",e),i()}}function i(){l.innerHTML=`
    <p class="error-message">
      Sorry, no images match your search. Please try again!
    </p>
  `}const u=document.querySelector(".search-form"),p=document.querySelector('input[name="searchQuery"]');u&&p?u.addEventListener("submit",t=>{t.preventDefault();const e=p.value;if(typeof e!="string"||e.trim()===""){console.error("Invalid search input:",e),i();return}d(e)}):console.error("Search form or input not found in DOM");document.querySelector(".gallery");const S=document.querySelector(".search-form");function g(){document.getElementById("loading-overlay").style.display="flex"}function f(){document.getElementById("loading-overlay").style.display="none"}async function R(){g();try{const e=await m("nature,technology,art,food,travel");d(e)}catch{o.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"})}finally{f()}}R();S.addEventListener("submit",async t=>{t.preventDefault();const e=t.target.elements.searchQuery.value.trim();if(!e||e.trim()===""){o.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"});return}g();try{const s=await m(e);d(s)}catch{o.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"})}finally{f()}});
//# sourceMappingURL=index.js.map
