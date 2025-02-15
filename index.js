import{S,i as l}from"./assets/vendor-Dg3uDB0e.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=o(s);fetch(s.href,r)}})();const u=document.querySelector(".gallery"),P=new S(".gallery a",{captionsData:"alt",captionDelay:250});function p(e,t=!1){if(t||(u.innerHTML=""),e.length===0){M();return}const o=e.map(({webformatURL:i,largeImageURL:s,tags:r,likes:a,views:b,comments:w,downloads:E})=>`
    <div class="gallery-item">
      <a href="${s}">
        <img src="${i}" alt="${r}" loading="lazy" />
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
  `}function y(){const e=document.createElement("p");e.classList.add("end-message"),e.textContent="We're sorry, but you've reached the end of search results.",u.after(e)}function h(){const e=document.querySelector(".load-more");e&&(e.style.display="none")}const B=document.querySelector(".search-form"),v=document.querySelector(".load-more");let c="",n=1;const m=40;let d=0,f=new Set;function L(){document.getElementById("loading-overlay").style.display="flex"}function g(){document.getElementById("loading-overlay").style.display="none"}B.addEventListener("submit",async e=>{if(e.preventDefault(),c=e.target.elements.searchQuery.value.trim(),!c){l.warning({title:"Warning",message:"Please enter a valid search term!",position:"topRight"});return}n=1,d=0,f.clear(),h(),L();try{const t=await fetchImages(c,n,m);if(!t||!t.hits||t.hits.length===0){l.error({title:"Error",message:"Sorry, no images match your search. Please try again!",position:"topRight"}),g();return}p(t.hits),d=t.totalHits,d>m?v.style.display="block":y()}catch{l.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"})}finally{g()}});v.addEventListener("click",async()=>{n+=1,L();try{const e=await fetchImages(c,n,m);if(e&&e.hits.length>0){const t=e.hits.filter(o=>!f.has(o.id));p(t,!0),t.forEach(o=>f.add(o.id)),n*m>=d&&(h(),y())}}catch{l.error({title:"Error",message:"Failed to load more images. Please try again.",position:"topRight"})}finally{g()}});
//# sourceMappingURL=index.js.map
