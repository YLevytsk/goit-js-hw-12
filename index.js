import{S,i as l}from"./assets/vendor-Dg3uDB0e.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))c(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}})();const m=document.querySelector(".gallery");let I=new S(".gallery a",{captionsData:"alt",captionDelay:250});function f(e,t=!1){if(!e||e.length===0){q("Sorry, there are no images matching your search query. Please try again!");return}const o=e.map(({webformatURL:c,largeImageURL:r,tags:s,likes:i,views:b,comments:w,downloads:E,id:P})=>`
    <div class="gallery-item" data-id="${P}">
      <a href="${r}">
        <img src="${c}" alt="${s}" loading="lazy" />
      </a>
      <div class="image-info">
        <div class="item"><span class="label">Likes</span><span class="count">${i}</span></div>
        <div class="item"><span class="label">Views</span><span class="count">${b}</span></div>
        <div class="item"><span class="label">Comments</span><span class="count">${w}</span></div>
        <div class="item"><span class="label">Downloads</span><span class="count">${E}</span></div>
      </div>
    </div>
  `).join("");t||(m.innerHTML=""),m.insertAdjacentHTML("beforeend",o),I.refresh(),$()}function $(){const e=document.querySelector(".gallery-item");if(e){const t=e.getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}}function q(e){l.error({title:"Error",message:e,position:"topRight"})}function p(){const e=document.createElement("p");e.classList.add("end-message"),e.textContent="We're sorry, but you've reached the end of search results.",m.after(e)}function y(){const e=document.querySelector(".load-more");e&&(e.style.display="none")}const M=document.querySelector(".search-form"),h=document.querySelector(".load-more");let a="",n=1;const u=40;let d=0,g=new Set;function v(){document.getElementById("loading-overlay").style.display="flex"}function L(){document.getElementById("loading-overlay").style.display="none"}M.addEventListener("submit",async e=>{if(e.preventDefault(),a=e.target.elements.searchQuery.value.trim(),!a||a.trim()===""){l.warning({title:"Warning",message:"Please enter a valid search term!",position:"topRight"});return}n=1,d=0,g.clear(),y(),v();try{console.log(`Search request: ${a}, Page: ${n}`);const t=await fetchImages(a,n,u);if(console.log("API Response:",t),!t||!t.hits||t.hits.length===0){l.error({title:"Error",message:"Sorry, no images match your search. Please try again!",position:"topRight"});return}f(t.hits),d=t.totalHits,d>u?h.style.display="block":p()}catch{l.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"})}finally{L()}});h.addEventListener("click",async()=>{n+=1,v();try{const e=await fetchImages(a,n,u);if(e&&e.hits.length>0){const t=e.hits.filter(o=>!g.has(o.id));f(t,!0),t.forEach(o=>g.add(o.id)),n*u>=d&&(y(),p())}}catch{l.error({title:"Error",message:"Failed to load more images. Please try again.",position:"topRight"})}finally{L()}});
//# sourceMappingURL=index.js.map
