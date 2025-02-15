import{S,i as c}from"./assets/vendor-Dg3uDB0e.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))l(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function o(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(s){if(s.ep)return;s.ep=!0;const r=o(s);fetch(s.href,r)}})();const u=document.querySelector(".gallery"),P=new S(".gallery a",{captionsData:"alt",captionDelay:250});function g(e,t=!1){if(t||(u.innerHTML=""),e.length===0){M();return}const o=e.map(({webformatURL:l,largeImageURL:s,tags:r,likes:a,views:b,comments:w,downloads:E})=>`
    <div class="gallery-item">
      <a href="${s}">
        <img src="${l}" alt="${r}" loading="lazy" />
      </a>
      <div class="image-info">
        <div class="item">
          <span class="label">Likes</span>
          <span class="count">${a}</span>
        </div>
        <div class="item">
          <span class="label">Views</span>
          <span class="count">${b}</span>
        </div>
        <div class="item">
          <span class="label">Comments</span>
          <span class="count">${w}</span>
        </div>
        <div class="item">
          <span class="label">Downloads</span>
          <span class="count">${E}</span>
        </div>
      </div>
    </div>
  `).join("");u.insertAdjacentHTML("beforeend",o),P.refresh(),I()}function I(){const e=document.querySelector(".gallery-item");if(e){const t=e.getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}}function M(){u.innerHTML=`
    <p class="error-message">
      Sorry, no images match your search. Please try again!
    </p>
  `}function p(){const e=document.createElement("p");e.classList.add("end-message"),e.textContent="We're sorry, but you've reached the end of search results.",u.after(e)}function y(){const e=document.querySelector(".load-more");e&&(e.style.display="none")}const B=document.querySelector(".search-form"),h=document.querySelector(".load-more");let n="",i=1;const m=40;let d=0,f=new Set;function v(){document.getElementById("loading-overlay").style.display="flex"}function L(){document.getElementById("loading-overlay").style.display="none"}B.addEventListener("submit",async e=>{if(e.preventDefault(),n=e.target.elements.searchQuery.value.trim(),!n||n.trim()===""){c.warning({title:"Warning",message:"Please enter a valid search term!",position:"topRight"});return}i=1,d=0,f.clear(),y(),v();try{const t=await fetchImages(n,i,m);if(!t||!t.hits||t.hits.length===0){c.error({title:"Error",message:"Sorry, no images match your search. Please try again!",position:"topRight"});return}g(t.hits),d=t.totalHits,d>m?h.style.display="block":p()}catch{c.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"})}finally{L()}});h.addEventListener("click",async()=>{i+=1,v();try{const e=await fetchImages(n,i,m);if(e&&e.hits.length>0){const t=e.hits.filter(o=>!f.has(o.id));g(t,!0),t.forEach(o=>f.add(o.id)),i*m>=d&&(y(),p())}}catch{c.error({title:"Error",message:"Failed to load more images. Please try again.",position:"topRight"})}finally{L()}});
//# sourceMappingURL=index.js.map
