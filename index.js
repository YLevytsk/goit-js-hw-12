import{i as c,a as P,S as w}from"./assets/vendor-Fd3mU3Z4.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function i(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(t){if(t.ep)return;t.ep=!0;const n=i(t);fetch(t.href,n)}})();const E="48661000-87492d5612d6e41eb1a42ef3d",S="https://pixabay.com/api/";async function h(e,r=1,i=40){if(!e||typeof e!="string"||e.trim()==="")return c.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"}),null;try{const s=await P.get(S,{params:{key:E,q:encodeURIComponent(e),image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:i,page:r}});if(console.log("API Response:",s.data),s.status!==200)throw new Error(`API error: ${s.status}`);return!s.data.hits||s.data.hits.length===0?(c.info({title:"Info",message:"No images found for your search!",position:"topRight"}),null):{hits:s.data.hits,totalHits:Math.min(s.data.totalHits,500)}}catch(s){return console.error("Error fetching images:",s),c.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"}),null}}const g=document.querySelector(".gallery"),I=new w(".gallery a",{captionsData:"alt",captionDelay:250});document.querySelector(".load-more");let a=document.querySelector(".end-message");a||(a=document.createElement("p"),a.classList.add("end-message"),a.textContent="We're sorry, but you've reached the end of search results.",a.style.display="none",g.after(a));function M(){g.innerHTML=""}function y(e,r=!1){if(!Array.isArray(e)||e.length===0)return;r||M();const i=e.map(({webformatURL:s,largeImageURL:t,tags:n,likes:l,views:v,comments:b,downloads:L})=>`
    <div class="gallery-item">
      <a href="${t}">
        <img src="${s}" alt="${n}" loading="lazy" />
      </a>
      <div class="image-info">
        <div class="item"><span class="label">Likes</span><span class="count">${l}</span></div>
        <div class="item"><span class="label">Views</span><span class="count">${v}</span></div>
        <div class="item"><span class="label">Comments</span><span class="count">${b}</span></div>
        <div class="item"><span class="label">Downloads</span><span class="count">${L}</span></div>
      </div>
    </div>`).join("");g.insertAdjacentHTML("beforeend",i),I.refresh()}const u=document.querySelector(".gallery"),$=document.querySelector(".search-form"),o=document.querySelector(".load-more");let d="",p=1;const m=40;let f=0;o.style.display="none";u.innerHTML="";$.addEventListener("submit",async e=>{if(e.preventDefault(),d=e.target.elements.searchQuery.value.trim(),!d){c.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"});return}p=1,u.innerHTML="",o.style.display="none";try{const r=await h(d,p,m);if(!r||!r.hits||r.hits.length===0){c.info({title:"Info",message:"No images found for your query.",position:"topRight"});return}f=Math.min(r.totalHits,500),y(r.hits),f>m&&(o.style.display="block")}catch(r){console.error("Error fetching search images:",r)}});o.addEventListener("click",async()=>{if(u.children.length>=f){o.style.display="none";return}p+=1;try{const e=await h(d,p,m);e&&e.hits.length>0&&y(e.hits,!0),u.children.length>=f&&(o.style.display="none")}catch(e){console.error("Error loading more images:",e)}});
//# sourceMappingURL=index.js.map
