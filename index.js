import{i as c,a as B,S as O}from"./assets/vendor-D0cagnvz.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const y of a.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&n(y)}).observe(document,{childList:!0,subtree:!0});function i(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=i(s);fetch(s.href,a)}})();const k="48661000-87492d5612d6e41eb1a42ef3d",x="https://pixabay.com/api/";async function v(e,t=1,i=40){if(!e||typeof e!="string"||e.trim()==="")return c.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"}),null;try{const n=await B.get(x,{params:{key:k,q:encodeURIComponent(e),image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:i,page:t}});if(console.log("API Response:",n.data),n.status!==200)throw new Error(`API error: ${n.status}`);return!n.data.hits||n.data.hits.length===0?(c.info({title:"Info",message:"No images found for your search!",position:"topRight"}),null):{hits:n.data.hits,totalHits:Math.min(n.data.totalHits,500)}}catch(n){return console.error("Error fetching images:",n),c.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"}),null}}const l=document.querySelector(".gallery"),D=new O(".gallery a",{captionsData:"alt",captionDelay:250}),r=document.querySelector(".load-more"),I=document.getElementById("loading-overlay"),o=document.createElement("p");o.classList.add("end-message");o.textContent="We're sorry, but you've reached the end of search results.";o.style.display="none";l.after(o);let p="",h=1;const P=40;let g=0,S=new Set;r.style.display="none";o.style.display="none";l.innerHTML="";r.style.display="none";o.style.display="none";o.style.display="none";r.style.display="none";async function b(e,t=!1){if(!Array.isArray(e)||e.length===0)return;t||(l.innerHTML="",r.style.display="none",o.style.display="none",o.style.display="none",r.style.display="none",S.clear());const i=e.map(({webformatURL:n,largeImageURL:s,tags:a,likes:y,views:R,comments:q,downloads:A})=>`
    <div class="gallery-item">
      <a href="${s}">
        <img src="${n}" alt="${a}" loading="lazy" />
      </a>
      <div class="image-info">
        <div class="item"><span class="label">Likes</span><span class="count">${y}</span></div>
        <div class="item"><span class="label">Views</span><span class="count">${R}</span></div>
        <div class="item"><span class="label">Comments</span><span class="count">${q}</span></div>
        <div class="item"><span class="label">Downloads</span><span class="count">${A}</span></div>
      </div>
    </div>`).join("");if(l.insertAdjacentHTML("beforeend",i),D.refresh(),t){const n=document.querySelector(".gallery-item");if(n){const s=n.getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}}l.children.length>=g?(r.style.display="none",l.children.length>0&&(o.style.display="block")):(r.style.display="block",o.style.display="none")}const $=document.querySelector(".search-form"),E=document.querySelector('input[name="searchQuery"]');$&&E?$.addEventListener("submit",async e=>{var i;if(e.preventDefault(),p=(i=E.value)==null?void 0:i.trim(),!p){console.error("Invalid search input:",p);return}h=1,S.clear(),r.style.display="none",o.style.display="none",l.innerHTML="",r.style.display="none",o.style.display="none",o.style.display="none",r.style.display="none";const t=await v(p,h,P);t&&t.hits.length>0&&(g=Math.min(t.totalHits,500),await b(t.hits),l.children.length<g&&(r.style.display="block"))}):console.error("Search form or input not found in DOM");r.addEventListener("click",async()=>{if(l.children.length>=g){r.style.display="none",l.children.length>0&&(o.style.display="block");return}h+=1,T();const e=await v(p,h,P);e&&e.hits.length>0?await b(e.hits,!0):(r.style.display="none",l.children.length>0&&(o.style.display="block")),F()});function T(){I.style.display="block"}function F(){I.style.display="none"}const L=document.querySelector(".gallery"),N=document.querySelector(".search-form"),d=document.querySelector(".load-more");let u="",f=1;const w=40;let m=0;function H(){document.getElementById("loading-overlay").style.display="flex"}function M(){document.getElementById("loading-overlay").style.display="none"}N.addEventListener("submit",async e=>{if(e.preventDefault(),u=e.target.elements.searchQuery.value.trim(),!u){c.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"});return}H(),f=1,L.innerHTML="";try{const t=await v(u,f,w);if(!t||!t.hits||t.hits.length===0){c.info({title:"Info",message:"No images found for your query.",position:"topRight"}),d.style.display="none";return}m=t.totalHits,console.log(`Fetched ${t.hits.length} images for query: ${u}`),b(t.hits),m>w?d.style.display="block":d.style.display="none"}catch(t){c.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"}),console.error("Error fetching search images:",t)}finally{M()}});d.addEventListener("click",async()=>{if(L.children.length>=m){d.style.display="none";return}f+=1,H();try{const e=await v(u,f,w);e&&e.hits.length>0&&b(e.hits,!0),L.children.length>=m&&(d.style.display="none")}catch(e){console.error("Error loading more images:",e)}finally{M()}});
//# sourceMappingURL=index.js.map
