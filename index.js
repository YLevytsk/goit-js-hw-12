import{i as y,a as F,S as x}from"./assets/vendor-Fd3mU3Z4.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const T="48661000-87492d5612d6e41eb1a42ef3d",k="https://pixabay.com/api/";async function m(t,e=1,n=40){if(!t||typeof t!="string"||t.trim()==="")return y.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"}),null;try{const o=await F.get(k,{params:{key:T,q:encodeURIComponent(t),image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:n,page:e}});if(console.log("API Response:",o.data),o.status!==200)throw new Error(`API error: ${o.status}`);return!o.data.hits||o.data.hits.length===0?(y.info({title:"Info",message:"No images found for your search!",position:"topRight"}),null):{hits:o.data.hits,totalHits:Math.min(o.data.totalHits,500)}}catch(o){return console.error("Error fetching images:",o),y.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"}),null}}const l=document.querySelector(".gallery"),C=new x(".gallery a",{captionsData:"alt",captionDelay:250}),i=document.querySelector(".load-more"),q=document.getElementById("loading-overlay");let f="",L=1;const R=40;let b=0,v=new Set,d=!1;i.style.display="none";l.innerHTML="";async function p(t,e=!1){if(!Array.isArray(t)||t.length===0)return;e||(l.innerHTML="",i.style.display="none",v.clear());const o=t.filter(({id:r})=>v.has(r)?!1:(v.add(r),!0)).map(({webformatURL:r,largeImageURL:s,tags:u,likes:O,views:A,comments:B,downloads:D})=>`
    <div class="gallery-item">
      <a href="${s}">
        <img src="${r}" alt="${u}" loading="lazy" />
      </a>
      <div class="image-info">
        <div class="item"><span class="label">Likes</span><span class="count">${O}</span></div>
        <div class="item"><span class="label">Views</span><span class="count">${A}</span></div>
        <div class="item"><span class="label">Comments</span><span class="count">${B}</span></div>
        <div class="item"><span class="label">Downloads</span><span class="count">${D}</span></div>
      </div>
    </div>`).join("");if(l.insertAdjacentHTML("beforeend",o),C.refresh(),e){const r=document.querySelector(".gallery-item");if(r){const s=r.getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}}l.children.length>=b?i.style.display="none":i.style.display="block"}const S=document.querySelector(".search-form"),H=document.querySelector('input[name="searchQuery"]');S&&H?S.addEventListener("submit",async t=>{var e;if(!d){if(t.preventDefault(),f=(e=H.value)==null?void 0:e.trim(),!f){console.error("Invalid search input:",f);return}d=!0,L=1,v.clear(),i.style.display="none",l.innerHTML="";try{const n=await m(f,L,R);n&&n.hits.length>0&&(b=Math.min(n.totalHits,500),await p(n.hits),l.children.length<b&&(i.style.display="block"))}catch(n){console.error("Error fetching images:",n)}finally{d=!1}}}):console.error("Search form or input not found in DOM");i.addEventListener("click",async t=>{if(!(d||l.children.length>=b)){t.preventDefault(),d=!0,L+=1,N();try{const e=await m(f,L,R);e&&e.hits.length>0?await p(e.hits,!0):i.style.display="none"}catch(e){console.error("Error loading more images:",e)}finally{Q(),d=!1}}});function N(){q.style.display="block"}function Q(){q.style.display="none"}const w=document.querySelector(".gallery"),_=document.querySelector(".search-form"),g=document.querySelector(".load-more"),c=document.createElement("p");c.classList.add("end-message");c.textContent="We're sorry, but you've reached the end of search results.";c.style.display="none";w.after(c);let h="",$=1;const E=40;let I=0,a=!1;g.style.display="none";c.style.display="none";function M(){document.getElementById("loading-overlay").style.display="flex"}function P(){document.getElementById("loading-overlay").style.display="none"}async function z(){if(!a){a=!0,M();try{const t=["nature","technology","art","food","travel"],e=t[Math.floor(Math.random()*t.length)];console.log(`Fetching random images for: ${e}`);const n=await m(e,1,E);if(!n||!n.hits||n.hits.length===0)return;console.log(`Fetched ${n.hits.length} random images`),p(n.hits)}catch(t){console.error("Error fetching random images:",t)}finally{P(),a=!1}}}document.addEventListener("DOMContentLoaded",z);_.addEventListener("submit",async t=>{if(t.preventDefault(),!a){if(h=t.target.elements.searchQuery.value.trim(),!h){y.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"});return}a=!0,M(),$=1,w.innerHTML="",g.style.display="none",c.style.display="none";try{const e=await m(h,$,E);if(!e||!e.hits||e.hits.length===0){y.info({title:"Info",message:"No images found for your query.",position:"topRight"});return}I=Math.min(e.totalHits,500),console.log(`Fetched ${e.hits.length} images for query: ${h}`),p(e.hits),I>E&&(g.style.display="block")}catch(e){console.error("Error fetching search images:",e)}finally{P(),a=!1}}});g.addEventListener("click",async()=>{if(!(a||w.children.length>=I)){a=!0,M();try{$+=1;const t=await m(h,$,E);t&&t.hits.length>0&&p(t.hits,!0),w.children.length>=I&&(g.style.display="none",c.style.display="block")}catch(t){console.error("Error loading more images:",t)}finally{P(),a=!1}}});
//# sourceMappingURL=index.js.map
