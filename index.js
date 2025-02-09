import{i as c,a as $,S}from"./assets/vendor-D0cagnvz.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&l(d)}).observe(document,{childList:!0,subtree:!0});function s(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(n){if(n.ep)return;n.ep=!0;const a=s(n);fetch(n.href,a)}})();const P="48661000-87492d5612d6e41eb1a42ef3d",R="https://pixabay.com/api/";async function u(t){if(!t||typeof t!="string"||t.trim()==="")return c.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"}),null;try{const e=await $.get(R,{params:{key:P,q:encodeURIComponent(t),image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40}});if(console.log("API Response:",e.data),e.status!==200)throw new Error(`API error: ${e.status}`);return e.data}catch(e){return console.error("Error fetching images:",e),c.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"}),null}}const i=document.querySelector(".gallery"),q=new S(".gallery a",{captionsData:"alt",captionDelay:250}),r=document.querySelector(".load-more"),m=document.getElementById("loading-overlay"),o=document.createElement("p");o.classList.add("end-message");o.textContent="We're sorry, but you've reached the end of search results.";o.style.display="none";i.after(o);let y="",p=0,v=new Set;r.style.display="none";o.style.display="none";i.innerHTML="";r.style.display="none";o.style.display="none";o.style.display="none";r.style.display="none";async function g(t,e=!1){if(!Array.isArray(t)||t.length===0)return;e||(i.innerHTML="",r.style.display="none",o.style.display="none",o.style.display="none",r.style.display="none",v.clear());const s=t.map(({webformatURL:l,largeImageURL:n,tags:a,likes:d,views:L,comments:I,downloads:E})=>`
    <div class="gallery-item">
      <a href="${n}">
        <img src="${l}" alt="${a}" loading="lazy" />
      </a>
      <div class="image-info">
        <div class="item"><span class="label">Likes</span><span class="count">${d}</span></div>
        <div class="item"><span class="label">Views</span><span class="count">${L}</span></div>
        <div class="item"><span class="label">Comments</span><span class="count">${I}</span></div>
        <div class="item"><span class="label">Downloads</span><span class="count">${E}</span></div>
      </div>
    </div>`).join("");if(i.insertAdjacentHTML("beforeend",s),q.refresh(),e){const l=document.querySelector(".gallery-item");if(l){const n=l.getBoundingClientRect().height;window.scrollBy({top:n*2,behavior:"smooth"})}}i.children.length>=p?(r.style.display="none",i.children.length>0&&(o.style.display="block")):(r.style.display="block",o.style.display="none")}const h=document.querySelector(".search-form"),f=document.querySelector('input[name="searchQuery"]');h&&f?h.addEventListener("submit",async t=>{var s;if(t.preventDefault(),y=(s=f.value)==null?void 0:s.trim(),!y){console.error("Invalid search input:",y);return}v.clear(),r.style.display="none",o.style.display="none",i.innerHTML="",r.style.display="none",o.style.display="none",o.style.display="none",r.style.display="none";const e=await u(y);e&&e.hits.length>0&&(p=Math.min(e.totalHits,500),await g(e.hits),i.children.length<p&&(r.style.display="block"))}):console.error("Search form or input not found in DOM");r.addEventListener("click",async()=>{if(i.children.length>=p){r.style.display="none",i.children.length>0&&(o.style.display="block");return}M();const t=await u(y);t&&t.hits.length>0?await g(t.hits,!0):(r.style.display="none",i.children.length>0&&(o.style.display="block")),A()});function M(){m.style.display="block"}function A(){m.style.display="none"}document.querySelector(".gallery");const F=document.querySelector(".search-form");function b(){document.getElementById("loading-overlay").style.display="flex"}function w(){document.getElementById("loading-overlay").style.display="none"}async function O(){b();try{const t=["nature","technology","art","food","travel"],e=t[Math.floor(Math.random()*t.length)];console.log(`Fetching images for: ${e}`);const s=await u(e);if(!s||!s.hits||s.hits.length===0){c.warning({title:"Info",message:`No images found for query: ${e}. Try another one.`,position:"topRight"});return}console.log(`Fetched ${s.hits.length} images for query: ${e}`),g(s.hits)}catch(t){c.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"}),console.error("Error fetching random images:",t)}finally{w()}}O();F.addEventListener("submit",async t=>{t.preventDefault();const e=t.target.elements.searchQuery.value.trim();if(!e){c.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"});return}b();try{const s=await u(e);if(!s||!s.hits||s.hits.length===0){c.info({title:"Info",message:"No images found for your query.",position:"topRight"});return}console.log(`Fetched ${s.hits.length} images for query: ${e}`),g(s.hits)}catch(s){c.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"}),console.error("Error fetching search images:",s)}finally{w()}});
//# sourceMappingURL=index.js.map
