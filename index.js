import{i as f,a as B,S as D}from"./assets/vendor-Fd3mU3Z4.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}})();const F="48661000-87492d5612d6e41eb1a42ef3d",x="https://pixabay.com/api/";async function g(e,t=1,s=40){if(!e||typeof e!="string"||e.trim()==="")return f.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"}),null;try{const r=await B.get(x,{params:{key:F,q:encodeURIComponent(e),image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:s,page:t}});if(console.log("API Response:",r.data),r.status!==200)throw new Error(`API error: ${r.status}`);return!r.data.hits||r.data.hits.length===0?(f.info({title:"Info",message:"No images found for your search!",position:"topRight"}),null):{hits:r.data.hits,totalHits:Math.min(r.data.totalHits,500)}}catch(r){return console.error("Error fetching images:",r),f.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"}),null}}const l=document.querySelector(".gallery"),T=new D(".gallery a",{captionsData:"alt",captionDelay:250}),a=document.querySelector(".load-more"),S=document.getElementById("loading-overlay");let u="",p=1;const H=40;let v=0,R=new Set;a.style.display="none";l.innerHTML="";async function m(e,t=!1){if(!Array.isArray(e)||e.length===0)return;t||(l.innerHTML="",a.style.display="none",R.clear());const s=e.map(({webformatURL:r,largeImageURL:n,tags:o,likes:d,views:q,comments:O,downloads:A})=>`
    <div class="gallery-item">
      <a href="${n}">
        <img src="${r}" alt="${o}" loading="lazy" />
      </a>
      <div class="image-info">
        <div class="item"><span class="label">Likes</span><span class="count">${d}</span></div>
        <div class="item"><span class="label">Views</span><span class="count">${q}</span></div>
        <div class="item"><span class="label">Comments</span><span class="count">${O}</span></div>
        <div class="item"><span class="label">Downloads</span><span class="count">${A}</span></div>
      </div>
    </div>`).join("");if(l.insertAdjacentHTML("beforeend",s),T.refresh(),t){const r=document.querySelector(".gallery-item");if(r){const n=r.getBoundingClientRect().height;window.scrollBy({top:n*2,behavior:"smooth"})}}l.children.length>=v?a.style.display="none":a.style.display="block"}const M=document.querySelector(".search-form"),P=document.querySelector('input[name="searchQuery"]');M&&P?M.addEventListener("submit",async e=>{var s;if(e.defaultPrevented)return;if(e.preventDefault(),u=(s=P.value)==null?void 0:s.trim(),!u){console.error("Invalid search input:",u);return}p=1,R.clear(),a.style.display="none",l.innerHTML="";const t=await g(u,p,H);t&&t.hits.length>0&&(v=Math.min(t.totalHits,500),await m(t.hits),l.children.length<v&&(a.style.display="block"))}):console.error("Search form or input not found in DOM");a.addEventListener("click",async()=>{if(event.defaultPrevented)return;if(event.preventDefault(),l.children.length>=v){a.style.display="none";return}p+=1,k();const e=await g(u,p,H);e&&e.hits.length>0?await m(e.hits,!0):a.style.display="none",C()});function k(){S.style.display="block"}function C(){S.style.display="none"}const L=document.querySelector(".gallery"),N=document.querySelector(".search-form"),h=document.querySelector(".load-more"),c=document.createElement("p");c.classList.add("end-message");c.textContent="We're sorry, but you've reached the end of search results.";c.style.display="none";L.after(c);let y="",b=1;const w=40;let $=0,i=!1;h.style.display="none";c.style.display="none";function E(){document.getElementById("loading-overlay").style.display="flex"}function I(){document.getElementById("loading-overlay").style.display="none"}async function Q(){if(!i){i=!0,E();try{const e=["nature","technology","art","food","travel"],t=e[Math.floor(Math.random()*e.length)];console.log(`Fetching random images for: ${t}`);const s=await g(t,1,w);if(!s||!s.hits||s.hits.length===0)return;console.log(`Fetched ${s.hits.length} random images`),m(s.hits)}catch(e){console.error("Error fetching random images:",e)}finally{I(),i=!1}}}document.addEventListener("DOMContentLoaded",Q);N.addEventListener("submit",async e=>{if(e.preventDefault(),!i){if(y=e.target.elements.searchQuery.value.trim(),!y){f.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"});return}i=!0,E(),b=1,L.innerHTML="",h.style.display="none",c.style.display="none";try{const t=await g(y,b,w);if(!t||!t.hits||t.hits.length===0){f.info({title:"Info",message:"No images found for your query.",position:"topRight"});return}$=Math.min(t.totalHits,500),console.log(`Fetched ${t.hits.length} images for query: ${y}`),m(t.hits),$>w&&(h.style.display="block")}catch(t){console.error("Error fetching search images:",t)}finally{I(),i=!1}}});h.addEventListener("click",async()=>{if(!(i||L.children.length>=$)){i=!0,E();try{b+=1;const e=await g(y,b,w);e&&e.hits.length>0&&m(e.hits,!0),L.children.length>=$&&(h.style.display="none",c.style.display="block")}catch(e){console.error("Error loading more images:",e)}finally{I(),i=!1}}});
//# sourceMappingURL=index.js.map
