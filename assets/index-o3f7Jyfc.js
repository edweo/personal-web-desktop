(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=t(i);fetch(i.href,n)}})();const C=document.createElement("template");C.innerHTML=`
<div draggable="false" class="item w-full h-full items-center flex justify-center rounded"></div>
`;class T extends HTMLElement{#e;#t;constructor(e,t,s,i){super(),this.appendChild(C.content.cloneNode(!0)),this.#e=this.querySelector(".item"),this.#t=e,this.style.height=s+"px",this.style.width=s+"px",this.querySelector(".item").appendChild(this.#s(t,s)),this.#i(),this.#n(i)}get name(){return this.#t}#s(e,t){const s=document.createElement("img");return s.src=e,s.width=t-10,s.heigth=t-10,s}#n(e){this.#e.addEventListener("click",t=>{t.preventDefault();const s=new Event("run-program",{bubbles:!0});s.program=e,this.dispatchEvent(s)})}#i(){this.addEventListener("mouseover",e=>{const t=setTimeout(()=>{e.preventDefault(),e.stopPropagation();const i=new Event("display-taskbar-tooltip",{bubbles:!0});i.name=this.#t;const n=this.getBoundingClientRect(),o=window.innerWidth,r={bottom:5};if(o/2>n.x){const c=n.right-n.width*1.5;r.left=c<=0?5:c}else{const c=o-n.x-n.width*1.5;r.right=c<=0?5:c}i.absoluteParams=r,this.dispatchEvent(i);const a=c=>{const p=new Event("hide-taskbar-tooltip",{bubbles:!0});this.dispatchEvent(p),this.removeEventListener("mouseout",a)};this.addEventListener("mouseout",a)},300),s=i=>{clearTimeout(t),this.removeEventListener("mouseout",s)};this.addEventListener("mouseout",s)})}}customElements.define("taskbar-item",T);const q=document.createElement("template");q.innerHTML=`

`;class M extends HTMLElement{#e;#t=[];constructor(e){super(),this.appendChild(q.content.cloneNode(!0)),this.#e=e}addTaskbarItem(e){if(this.#s(e.name))return;const t=new T(e.name,e.iconPath,this.#e-8,e);this.appendChild(t),this.#t.push(t)}#s(e){for(const t in this.#t)if(t.name===e)return!0;return!1}}customElements.define("taskbar-pwd",M);class se{#e;#t;#s;constructor(){this.#e=new Set,this.#s=[],this.#t=1}generateUniqueProcessID(){return this.#e.size===0?1:this.#s.length===0?++this.#t:this.#s.pop()}generateUniqueProcessIDAndAddActive(){const e=this.generateUniqueProcessID();return this.addActiveProcessId(e),e}isProcessIdActive(e){return this.#e.has(e)}addActiveProcessId(e){this.#e.add(e)}removeActiveProcessId(e){this.#e.delete(e),this.#s.push(e),this.#e.size===0&&(this.#s=[],this.#t=1)}}const ie="assets/default_icon-dvcLcXvW.png",P=document.createElement("template");P.innerHTML=`
<div class="window rounded overflow-hidden">
    <div class="window-top flex flex-col">
        <div class="flex justify-between">
          <div class="window-info w-full flex gap-1 items-center">
              <img src="" alt="icon" class="icon ml-1" draggable="false">
              <p class="title text-white leading-none">Program</p>
          </div>
          
          <div class="buttons flex">
              <button class="window-btn minimise-btn hover:bg-white/10">                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 
                  0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </button>
          
              <button class="window-btn default-size-btn hover:bg-white/10">                
                <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" stroke-width="1.5" 
                    stroke="#fff" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                </svg>
              </button>
              
              <button class="window-btn maximize-btn hover:bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 px-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </button>
              
              <button class="window-btn close-btn hover:bg-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="#fff" class="w-6 h-6 px-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
          </div>
        </div>
        
        <div class="window-options bg-white">OPTIONS</div>
    </div>
    
    <div class="window-content flex justify-center items-center"></div>
    
    <div class="window-bottom bg-white">BOTTOM</div>
    
    <div class="resize-arrow bg-white bg-opacity-50 cursor-nwse-resize absolute bottom-0 right-0 z-50">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
      stroke="currentColor" class="w-2 h-2">
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25" />
      </svg>
    </div>
</div>
`;class I extends HTMLElement{#e;#t;#s;#n;#i;#o;#r;#a;#l;#u;#p;#w;#y;#m;#h;#d;constructor(e,t,s,i,n){super(),this.appendChild(P.content.cloneNode(!0)),this.#e=e,this.#t=n,this.#m=this.querySelector(".window-top"),this.#l=this.querySelector(".window-info"),this.#u=this.querySelector(".icon"),this.#p=this.querySelector(".title"),this.#w=this.querySelector(".window-options"),this.#y=this.querySelector(".window-content"),this.#h=this.querySelector(".window-bottom"),this.#d=this.querySelector(".resize-arrow"),this.#p.textContent=s,this.#n=i,t?this.#u.src=t:this.#u.src=ie,i&&(i.window_padding&&(this.querySelector(".window-content").style.padding="10px"),i.window_options_bar?console.log("not implemented window option bar top"):this.querySelector(".window-options").classList.add("hidden"),i.window_bottom_bar?console.log("not implemented window option bar bottom"):this.querySelector(".window-bottom").classList.add("hidden")),this.#y.appendChild(n),this.#s=t}connectedCallback(){const e=this.#t.getBoundingClientRect();this.#i={width:e.width,height:e.height},this.#o=e.width,this.#r=e.height,this.#a=this.#l.getBoundingClientRect().height,this.#x(),this.#E(),this.#f(),this.#v(),this.#b(),this.#g()}get iconPath(){return this.#s}#c(e,t){if(this.#t.childNodes[1])this.#t.childNodes[1].style.width=e+"px",this.#t.childNodes[1].style.height=t+"px",this.#r=t,this.#o=e;else throw this.#d.style.display="none",new Error("ERROR Re-sizing: application does not have a wrapper")}#E(){if(!this.#t.childNodes[1]){this.#d.style.display="none";return}if(this.#n.resizable!==!0){this.#d.style.display="none";return}const e=({movementX:s,movementY:i})=>{this.#c(this.#o+s,this.#r+i)};this.#d.addEventListener("mousedown",s=>{s.stopPropagation(),document.addEventListener("mousemove",e),document.addEventListener("mouseup",t)});const t=s=>{s.stopPropagation(),document.removeEventListener("mousemove",e),document.removeEventListener("mouseup",t)}}#x(){const e=({movementX:s,movementY:i})=>{const n=this.getBoundingClientRect(),o=n.x,r=n.y;this.style.transform=`translate(${o+s}px, ${r+i}px)`};this.#l.addEventListener("mousedown",()=>{this.dispatchEvent(new Event("window-selected",{bubbles:!0})),document.addEventListener("mousemove",e),document.addEventListener("mouseup",t)});const t=s=>{document.removeEventListener("mousemove",e),document.removeEventListener("mouseup",t)}}#b(){this.querySelector(".minimise-btn").addEventListener("click",()=>{const e=new Event("minimise-process",{bubbles:!0});e.pID=this.#e,this.dispatchEvent(e)})}#f(){this.querySelector(".close-btn").addEventListener("click",()=>{this.#t.close&&this.#t.close().then(e=>{if(e===!0){const t=new Event("close-process",{bubbles:!0});t.pID=this.#e,this.dispatchEvent(t)}})})}#v(){if(this.#n.resizable!==!0){this.querySelector(".maximize-btn").style.display="none";return}this.querySelector(".maximize-btn").addEventListener("click",e=>{e.stopPropagation();const t=this.parentElement.getBoundingClientRect();this.#o=t.width,this.#r=t.height-this.#a,this.#c(this.#o,this.#r),this.style.transform="translate(0px, 0px)"})}#g(){if(this.#n.resizable!==!0){this.querySelector(".default-size-btn").style.display="none";return}this.querySelector(".default-size-btn").addEventListener("click",e=>{e.stopPropagation(),this.#o=this.#i.width,this.#r=this.#i.height,this.#c(this.#o,this.#r)})}unfocusWindow(){this.querySelectorAll(".window-btn").forEach(e=>{const t=e.firstElementChild;t.setAttribute("fill","#aaa"),t.setAttribute("stroke","#aaa")}),this.#m.style.backgroundColor="rgb(96, 120, 196)"}focusWindow(){this.querySelectorAll(".window-btn").forEach(e=>{const t=e.firstElementChild;t.setAttribute("fill","#fff"),t.setAttribute("stroke","#fff")}),this.#m.style.backgroundColor="rgb(40, 50, 98)"}}customElements.define("process-window",I);class ne{#e;#t;#s;#n;constructor(e,t,s,i){this.#e=e,this.#t=t,this.#s=s,this.#n=i}get name(){return this.#e}get pID(){return this.#t}get processWindow(){return this.#s}get app(){return this.#n}getPositionOnScreen(){return this.#s.getBoundingClientRect()}}class oe{#e=new Map;#t=new Map;#s=new Map;#n=new Map;#i;#o;constructor(e,t){this.#i=e,this.#o=t}get running_processes_by_program_name(){return this.#e}#r(e){const t=this.#i.generateUniqueProcessIDAndAddActive(),s=e.createProgramInstance();return new ne(e.name,t,new I(t,e.iconPath,e.name,e.options,s),s)}async runProgram(e){return new Promise((t,s)=>{setTimeout(()=>{const i=this.#s.get(e.name);if(i){const o=i.get(i.keys().next().value);this.#o.openMinimisedWindow(o.processWindow,o.pID),t(null);return}if(e.options.multiple_windows===!1&&this.processGroupNameIsRunning(e.name))return;const n=this.#r(e);if(this.#o.addProcessWindowToDesktop(n.processWindow,n.pID),this.#e.has(e.name))this.#e.get(e.name).set(n.pID,n);else{const o=new Map;o.set(n.pID,n),this.#e.set(e.name,o)}this.#t.set(n.pID,n),t(n)},0)})}runProgramSystem(e){setTimeout(()=>{const t=e.name;if(this.#s.has(t))return;const s=this.#r(e);this.#o.addProcessWindowToDesktop(s.processWindow,s.pID),this.#o.minimiseWindow(s.processWindow,s.pID);const i=new Map;i.set(s.pID,s),this.#s.set(t,i),this.#n.set(s.pID,s)},0)}#a(e){setTimeout(()=>{this.#t.delete(e.pID),this.#e.get(e.name).delete(e.pID),this.#e.get(e.name).size===0&&this.#e.delete(e.name),this.#o.closeWindow(e.processWindow,e.pID),this.#i.removeActiveProcessId(e.pID)},0)}findProcessById(e){const t=this.#t.get(e),s=this.#n.get(e);if(t)return t;if(s)return s}findSystemProcess(e){const t=this.#s.get(e);return t.get(t.keys().next().value)}isProcessSystemApp(e){return this.#n.has(e)}processGroupNameIsRunning(e){return this.#e.get(e)!==void 0}processInstancesInGroupNameAreRunning(e){const t=this.#e.get(e);return t!==void 0?t.size:0}async closeProcess(e){return new Promise((t,s)=>{const i=this.#n.get(e);if(i){this.#o.minimiseWindow(i.processWindow,i.pID),t(!1);return}if(this.#i.isProcessIdActive(e)){const n=this.findProcessById(e);this.#a(n),n.app.close().then(o=>{t(!!o)})}else t(!1)})}}const H=document.createElement("template");H.innerHTML=`
<div class="wrapper-tooltip flex bg-white rounded pl-2 pr-2 pt-1 pb-1">
    <h1 class="text text-xs leading-none"></h1>
</div>
`;class A extends HTMLElement{#e;#t;constructor(e){super(),this.appendChild(H.content.cloneNode(!0)),this.#e=e,this.#t=this.querySelector(".wrapper-tooltip"),this.querySelector(".text").textContent=e}setAbsolute(e){"top"in e&&(this.#t.style.top=e.top+"px"),"left"in e&&(this.#t.style.left=e.left+"px"),"bottom"in e&&(this.#t.style.bottom=e.bottom+"px"),"right"in e&&(this.#t.style.right=e.right+"px")}}customElements.define("taskbar-tooltip",A);class re{#e;#t;#s=new Map;#n=new Map;#i;#o;#r;constructor(e,t){this.#e=e,this.#t=t,this.#o=0}addProcessWindowToDesktop(e,t){this.makeWindowHighestInDesktop(e),this.#e.prepend(e),e.getBoundingClientRect(),this.#s.set(t,e)}closeWindow(e,t){this.#s.delete(t),this.#n.delete(t),e.remove(),this.#s.size===0&&this.#n.size===0&&(this.#o=0)}minimiseWindow(e,t){this.#s.delete(t),this.#n.set(t,e),e.classList.add("hidden")}openMinimisedWindow(e,t){this.#n.delete(t),this.#s.set(t,e),e.classList.remove("hidden"),e.style.zIndex=++this.#o}makeWindowHighestInDesktop(e){e&&(this.#i&&(e!==this.#i&&this.#a(this.#i),this.#i.unfocusWindow()),e.focusWindow(),e.style.zIndex=++this.#o,this.#i=e)}#a(e){e.addEventListener("click",()=>{e.dispatchEvent(new Event("window-selected",{bubbles:!0}))},{once:!0})}setBackgroundImage(e){this.#t.style.backgroundImage=`url(${e})`}displayTooltip(e,t){const s=new A(e);s.style.zIndex=this.#o+1,s.setAbsolute(t),this.#r=s,this.#e.append(s)}hideTooltip(){this.#r&&(this.#r.remove(),this.#r=void 0)}}class ae{#e;#t;#s;constructor(e,t,s){this.#e=e,this.#t=t,this.#s=s}start(){this.#e.addEventListener("run-program",async e=>{e.stopPropagation();const t=e.program;this.#t.runProgram(t).then(s=>{s!==null&&this.#t.findSystemProcess("Task Manager").app.addProcess(s)})}),this.#e.addEventListener("close-process",async e=>{e.stopPropagation(),this.#t.closeProcess(e.pID).then(t=>{if(!t)return;this.#t.findSystemProcess("Task Manager").app.removeProcess(e.pID)})}),this.#e.addEventListener("minimise-process",async e=>{e.stopPropagation();const t=this.#t.findProcessById(e.pID);if(this.#s.minimiseWindow(t.processWindow,e.pID),!this.#t.isProcessSystemApp(e.pID)){const s=this.#t.findSystemProcess("Task Manager").app;s.markProcessIsMinimised(e.pID),s.unselectEverythingInTaskManager()}}),this.#e.addEventListener("show-minimised-process",async e=>{e.stopPropagation();const t=this.#t.findProcessById(e.pID);if(this.#s.openMinimisedWindow(t.processWindow,e.pID),!this.#t.isProcessSystemApp(e.pID)){const s=this.#t.findSystemProcess("Task Manager").app;s.unmarkProcessIsMinimised(e.pID),s.unselectEverythingInTaskManager()}}),this.#e.addEventListener("window-selected",async e=>{e.stopPropagation(),this.#s.makeWindowHighestInDesktop(e.target)}),this.#e.addEventListener("display-taskbar-tooltip",e=>{this.#s.displayTooltip(e.name,e.absoluteParams)}),this.#e.addEventListener("hide-taskbar-tooltip",e=>{this.#s.hideTooltip()})}}class y{#e;#t;#s;#n;constructor(e,t){this.#e=e.name,this.#t=e.icon,t?this.#s=()=>e.exe(...t):this.#s=()=>e.exe(),this.#n=e}get name(){return this.#e}get iconPath(){return this.#t}get options(){return this.#n}createProgramInstance(){return this.#s()}}const N=document.createElement("template");N.innerHTML=`
<div class="task-manager-content">
    <div class="top-bar">
        <div class="top-bar-column column-left"><p class="pl-2">APP</p></div>  
        <div class="top-bar-column column-right"><p class="pr-2">PID</p></div>
    </div>
    
    <div class="process-display"></div>
    
    <div class="actions flex p-1 justify-end gap-1">
        <button class="btn-show-task bg-blue-300 pl-1 pr-1 rounded text-white text-m hover:bg-blue-500 font-bold flex flex-row gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 
            .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 
            .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
          </svg>
          SHOW
        </button>
        <button class="btn-hide-task bg-blue-300 pl-1 pr-1 rounded text-white text-m hover:bg-blue-500 font-bold flex flex-row gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244
            19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 
            10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 
            0-4.243-4.243m4.242 4.242L9.88 9.88" />
          </svg>
          HIDE
        </button>
        <button class="btn-end-task bg-blue-300 pl-1 pr-1 rounded text-white text-m hover:bg-blue-500 font-bold flex flex-row gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 
            12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          END
        </button>
    </div>
</div>
`;class R extends HTMLElement{#e=new Map;#t;#s=null;#n=null;#i=null;#o;#r;#a;#l;constructor(e){super(),this.appendChild(N.content.cloneNode(!0)),this.#o=this.querySelector(".process-display"),this.#r=this.querySelector(".btn-end-task"),this.#a=this.querySelector(".btn-show-task"),this.#l=this.querySelector(".btn-hide-task"),this.#t=e,this.#r.addEventListener("click",t=>{if(t.stopPropagation(),this.#s!==null&&this.#n!==null){const s=new Event("close-process",{bubbles:!0});s.pID=Number(this.#s.querySelector(".id").textContent),this.dispatchEvent(s),this.#s=null,this.#n=null}else if(this.#i!==null){const s=this.#g(this.#i.parentElement);this.#w(s)}}),this.#a.addEventListener("click",t=>{if(t.stopPropagation(),this.#s!==null&&this.#n!==null){const s=Number(this.#s.querySelector(".id").textContent);if(this.#f(s)){const n=new Event("show-minimised-process",{bubbles:!0});n.pID=s,this.dispatchEvent(n),this.#h(),this.unmarkProcessIsMinimised(s)}}else if(this.#i!==null){const s=this.#g(this.#i.parentElement);this.#u(s)}}),this.#l.addEventListener("click",t=>{if(t.stopPropagation(),this.#s!==null&&this.#n!==null){const s=Number(this.#s.querySelector(".id").textContent);if(!this.#f(s)){const n=new Event("minimise-process",{bubbles:!0});n.pID=s,this.dispatchEvent(n),this.#h()}}else if(this.#i!==null){const s=this.#g(this.#i.parentElement);this.#p(s)}})}#u(e){this.#y(e,"show-minimised-process")}#p(e){const t=this.#e.get(e);if(!t)return;const s=t.querySelectorAll(".process-row");for(const i of s)if(!(i.querySelector(".svg-hidden")!==null)){const o=new Event("minimise-process",{bubbles:!0});o.pID=Number(i.querySelector(".id").textContent),this.dispatchEvent(o)}}#w(e){this.#y(e,"close-process")}#y(e,t){const s=this.#e.get(e);if(!s)return;const i=s.querySelectorAll(".process-row");for(const n of i){const o=new Event(t,{bubbles:!0});o.pID=Number(n.querySelector(".id").textContent),this.dispatchEvent(o)}}#m(e,t){const s=document.createElement("div");s.classList.add("task-manager-process-group");const i=document.createElement("div");i.classList.add("process-group-top-bar"),i.addEventListener("click",m=>{m.stopPropagation(),this.#i===null?(i.classList.add("selected-process-group"),this.#i=i,this.#h()):this.#i===i?(this.#i.classList.remove("selected-process-group"),this.#h(),this.#d()):(this.#i.classList.remove("selected-process-group"),this.#i=i,i.classList.add("selected-process-group"),this.#h())});const n=document.createElement("div");n.classList.add("process-top-bar-title");const o=document.createElement("img");o.src=t,o.classList.add("icon");const r=document.createElement("label");r.classList.add("process-group-name-label"),r.textContent=e,n.append(o,r);const a=this.#E(),c=m=>{m.stopPropagation(),f.style.display="flex",a.removeEventListener("click",c),a.addEventListener("click",p),a.style.transform="rotate(180deg)"},p=m=>{m.stopPropagation(),f.style.display="none",a.removeEventListener("click",p),a.addEventListener("click",c),a.style.transform="rotate(0deg)"};a.addEventListener("click",c),i.append(n,a);const f=document.createElement("div");return f.classList.add("task-manager-process-list"),f.style.display="none",s.append(i,f),this.#e.set(e,s),s}#h(){this.#s!==null&&(this.#s.classList.remove("selected-row"),this.#s=null,this.#n=null)}#d(){this.#i!==null&&(this.#i.classList.remove("selected-process-group"),this.#i=null)}unselectEverythingInTaskManager(){this.#d(),this.#h()}#c(){const e=document.createElement("div");return e.classList.add("svg-hidden"),e.innerHTML=`
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244
    19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 
    10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 
    0-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
    `,e}#E(){const e=document.createElement("button");return e.classList.add("task-manager-process-group-button"),e.innerHTML=`
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
    stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
    `,e}addProcess(e){const t=this.#x(e.name);let s,i=!1;if(t===1)s=this.#m(e.name,e.processWindow.iconPath),i=!0;else if(t>1)s=this.#e.get(e.name);else throw new Error("ERROR: Something happened while adding process in task manager");const n=document.createElement("div");n.classList.add("process-row",`id-${e.pID}`);const o=document.createElement("div");o.classList.add("column-left","process-name"),o.textContent=e.name;const r=document.createElement("img");r.src=e.processWindow.iconPath,r.classList.add("icon"),o.prepend(r);const a=document.createElement("div");a.classList.add("column","id"),a.textContent=e.pID,n.append(o,a),n.addEventListener("click",c=>{n.classList.add("selected-row"),this.#s===null&&this.#n===null?(this.#s=n,this.#n=n,this.#d()):(this.#s.classList.remove("selected-row"),this.#s===n?(this.#s=null,this.#n=null):(this.#n=this.#s,this.#s=n),this.#d())}),s.querySelector(".task-manager-process-list").appendChild(n),this.#b(e.name,t),i&&this.#o.append(s)}#x(e){return this.#t.processInstancesInGroupNameAreRunning(e)}#b(e,t){const s=this.#e.get(e);s&&(s.querySelector(".process-group-name-label").innerText=`${e} (${t})`.toString())}#f(e){return this.#v(e).classList.contains("process-minimised")}markProcessIsMinimised(e){const t=this.#v(e);t.querySelector(".process-name").append(this.#c()),t.classList.add("process-minimised")}unmarkProcessIsMinimised(e){const t=this.#v(e),s=t.querySelector(".svg-hidden");s&&(s.remove(),t.classList.remove("process-minimised"))}removeProcess(e){const t=this.#v(e),s=t.parentElement,i=s.parentElement;t.remove(),this.#s=null,this.#n=null;const n=s.childElementCount;if(n===0){const o=this.#g(i);if(o!==null)this.#e.delete(o),i.remove();else throw new Error("ERROR: Something happened when removing process group in task manager")}else{const o=this.#g(i);if(o!==null)this.#b(o,n);else throw new Error("ERROR: Something happened and group process was not found")}}#v(e){return this.#o.querySelector(`.id-${e}`)}#g(e){for(const[t,s]of this.#e.entries())if(s===e)return t;return null}#I(e){this.#o.textContent="";for(const[,t]of e.running_processes_by_program_name)for(const[,s]of t)this.addProcess(s)}async close(){return!0}}customElements.define("task-manager",R);const le="assets/icon--wivDSOx.png",ce={name:"Task Manager",icon:le,exe:l=>new R(l),multiple_windows:!1,resizable:!0},he=(...l)=>new y(ce,l);class B{#e;isCorrectAnswer;#t;constructor(e,t,s,i){this.id=e,this.question=t,this.nextURL=s,this.message=i}get limit(){return this.#t}set limit(e){this.#t=e}setAnswer(e){this.#e=e}getAnswer(){return this.#e}setIsAnswerCorrect(e){this.isCorrectAnswer=e}getIsAnswerCorrect(){return this.isCorrectAnswer}}class de extends B{#e;constructor(e,t,s,i,n){super(e,t,s,i),this.#e=n}}class L{seconds;#e;#t;constructor(){this.seconds=0,this.#e=null,this.#t=!0}startTimerIncrementing(e){this.#t=!1,this.#s(e)}#s(e){this.#e=setTimeout(()=>{this.#i(),e(),this.#s(e)},1e3)}startTimerDecreasing(e,t,s){this.#t=!1,this.seconds=e,this.#n(this.seconds,t,s)}#n(e,t,s){this.#e=setTimeout(()=>{if(this.#o(),t(),this.seconds<1){s(),this.stopTimer();return}this.#n(this.seconds,t,s)},1e3)}#i(){this.seconds++}#o(){this.seconds--}stopTimer(){this.#e!==null&&clearTimeout(this.#e)}resetTimer(){this.#e!==null&&(this.seconds=0)}toString(){const e=this.seconds<3600?0:Math.floor(this.seconds/3600),t=this.seconds<60?0:Math.floor(this.seconds%3600/60),s=this.seconds%60;return e<1?`${t<10?`0${t}`:t}:${s<10?`0${s}`:s}`:`${e<10?`0${e}`:e}:${t<10?`0${t}`:t}:${s<10?`0${s}`:s}`}}class ue{#e;#t;constructor(e,t){this.#e=t,this.#t=e}get sessionScore(){return this.#e}get username(){return this.#t}toJSON(){return JSON.stringify(this.toObject())}toObject(){return{username:this.#t,score:this.#e}}}class w{static#e=5;static HIGH_SCORE_LOCAL_STORAGE="highScores";isNewHighScore(e,t){const s=new ue(e,t),i=this.getHighScoresLocalStorageJSON();if(!i)return this._updateHighScoreLocalStorage([s.toObject()]),!0;const n=Object.values(i);return this.#s(n,s)?(this._updateHighScoreLocalStorage(n),!0):!1}#t(e,t){return e.score-t.score}getHighScoresLocalStorageJSON(){return JSON.parse(localStorage.getItem(w.HIGH_SCORE_LOCAL_STORAGE))}_updateHighScoreLocalStorage(e){localStorage.setItem(w.HIGH_SCORE_LOCAL_STORAGE,JSON.stringify(e))}#s(e,t){if(e.length<w.#e)return e.push(t.toObject()),e.sort(this.#t),!0;{const s=e.find(i=>t.sessionScore<i.score);if(s){const i=e.indexOf(s);return e.splice(i,0,t.toObject()),e.pop(),!0}}return!1}}function pe(l){const e=l<0;e&&(l*=-1);const t=l%1e3,s=(l-t)/1e3,i=t<100?t<10?`00${t}`:`0${t}`:`${t}`;return e?`-${s}.${i}s`:`${s}.${i}s`}const D=document.createElement("template");D.innerHTML=`
  <style>
    
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        color: white;
        font-family: sans-serif !important;
    }
  
    :host {
        width: 100%;
    }
  
    #root {
      display: grid;
      grid-template-columns: auto auto;
      /*gap: 10px;*/
      width: 80%;
      margin: 0 auto;
      justify-content: center;
    }
    
    .game-panel {
      /*background-color: #000;*/
      background-color: #62a1fa;
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;
      border-radius: 10px;
      padding: 20px;
      gap: 20px;
      width: 100%;
    }
    
    #questions-panel {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        /*background-color: #000;*/
        background-color: #62a1fa;
        border-radius: 10px;
        padding: 20px;
        gap: 10px;
        width: 500px;
    }
    
    .questions-panel-row {
        display: flex;
        justify-content: start;
        align-items: start;
        gap: 10px;
        border-radius: 10px;
        width: 100%;
        background-color: rgba(98,98,98,0.5);
        padding: 5px 5px;
    }
   
    .question-answer-section {
      display: flex;
      flex-direction: column;
      word-break: break-word;
    }
    
    .question-answer {
        color: #f0d025;
    }
    
    .status {
        background-color: rgba(255, 255, 255, 0.7);
        border-radius: 10px;
        padding: 2px 10px;
        color: transparent;
        text-shadow: 0 0 0 white;
        user-select: none;
        width: 35px;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    #input-section {
      display: flex;
      flex-direction: column;
      border-radius: 10px;
      width: 100%;
    }
    
    #input-div {
        display: flex;
        column-gap: 10px;
    }
    
    #input {
        background-color: #f5c216;
        border: none;
        width: 100%;
        color: black;
    }
    
    #input::placeholder {
        color: black;
    }
    
    #title {
        text-align: start;
        margin-bottom: 10px;
    }
    
    #input-section label {
      display: flex;
      font-size: 18px;
      font-weight: 600;
      color: #fff;
      user-select: none;
    }

    #input-section input {
      border-radius: 10px;
      font-size: 25px;
      padding: 2px 10px;
      font-weight: 600;
    }

    #input-section input:focus {
      outline: none;
    }
    
    #submit-btn {
        padding: 0 10px;
        background-color: #f5c216;
        border: none;
        border-radius: 10px;
        font-size: 18px;
        cursor: pointer;
        width: 40px;
        height: 40px;
    }
    
    #submit-btn:hover {
        background-color: #ffde6f;
    }
    
    #message {
        font-size: 13px;
        background-color: red;
        border-radius: 10px;
        padding: 2px 5px;
        width: 100%;
    }
    
    .message-success::before {
        content: '✔️';
        color: transparent;
        text-shadow: 0 0 0 white;
        margin-right: 10px;
    }
    
    .message-fail::before {
        content: '❌';
        color: transparent;
        text-shadow: 0 0 0 white;
        margin-right: 10px;
    }
    
    .message-completed-quiz::before {
        content: '🏆';
        color: transparent;
        text-shadow: 0 0 0 white;
        margin-right: 10px;
    }
    
    #alternatives-section {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    #alternatives {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
    }
    
    #alternatives input {
        opacity: 0;
        pointer-events: none;
        position: fixed;
    }
    
    .alternative-label {
        background-color: #3c3c3c26;
        border-radius: 10px;
        padding: 2px 10px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 5px;
        user-select: none;
        word-wrap: anywhere;
        font-size: 18px;
    }
    
    .btn {
       width: 100%;
       background-color: #f5c216;
       padding: 0 10px;
       border: none;
       border-radius: 10px;
       font-size: 18px;
       cursor: pointer;
       height: 40px;
       font-weight: 600;
       color: black;
    }
    
    .btn:hover {
        background-color: #ffde6f;
    }
    
    #questions-panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    
    .timer {
        background-color: #6262621f;
        padding: 2px 5px;
        border-radius: 10px;
        display: flex;
    }
    
    .timer::before {
        content: "📝";
        margin-right: 5px;
    }
    
    .question-timer {
        
    }
    
    .question-timer::before {
        content: '❔';
        color: transparent;
        text-shadow: 0 0 0 #f5c216;
    }
    
    .game-panel-top {
        display: flex;
        justify-content: space-between;
        align-items: start;
        gap: 10px;
        width: 100%;
    }
    
    .username-timer-section {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
    
    .username {
        color: #f5c216;
        font-weight: 600;
    }
    
    .username::before {
        content: '👤';
        color: transparent;
        text-shadow: 0 0 0 white;
    }
    
    .alternative-checked {
        background-color: #1b4382;
    }
    
    .high-score-panel {
      /*background-color: #000;*/
      background-color: #62a1fa;
      width: 100%;
      border-radius: 10px;
      padding: 20px;
      gap: 20px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
    }
    
    .high-score-main {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    .scores {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    .score {
        background-color: #6262621f;
        width: 100%;
        border-radius: 10px;
        padding: 2px 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .score-first-place {
        background-color: #d2b12c;
    }
    
    .score-second-place {
        background-color: silver;
    }
    
    .score-third-place {
        background-color: #f76208;
    }
    
    .high-score-title {
        text-align: center;
    }
    
    .first-place::before {
        content: '🥇';
    }
    
    .second-place::before {
        content: '🥈';
    }
    
    .third-place::before {
        content: '🥉';
    }
    
    .other-place::before {
       content: '🎗️';
    }
    
    .card-rotatable {
        transform-style: preserve-3d;
        transition: all 0.5s ease;
        width: 450px;
        height: fit-content;
        display: flex;
    }
    
    .card-front {
        backface-visibility: hidden;
        height: 100%;
    }
    
    .card-back {
        position: absolute;
        backface-visibility: hidden;
        transform: rotateY(180deg);
        top: 0;
        left: 0;
        min-height: 100%;
    }
    
    .answer-panel {
        display: flex;
        flex-direction: column;
        width: inherit;
        gap: 10px;
    }
    
    .questions-in-panel {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
    }
    
  </style>
  
  <div id="root">  
    <div id="questions-panel">
      <div id="questions-panel-header">
        <h2 id="questions-panel-title">Questions</h2>
        <div class="username-timer-section">
            <h3 class="username"></h3>
            <h2 class="timer total-time">00:00</h2>
        </div>
      </div>
      <div class="questions-in-panel"></div>
    </div>
  
    <div class="card-rotatable">
      <div class="game-panel card-front">
        <div class="answer-panel">
          <div class="game-panel-top">
            <h2 id="title">Welcome to the <br> Quiz Game 💡</h2>
            <h2 class="timer question-timer">00:00</h2>
          </div>
          
          <section id="input-section">
            <label id="label" for="input">Please provide a username</label>
            <div id="input-div">
              <input type="text" name="cardholder-name" id="input" placeholder="name">
              <button id="submit-btn">✏️</button>
            </div>
          </section>
          
          <section id="alternatives-section">
              <form id="alternatives"></form>
              <button class="btn">✏️ ANSWER</button>
          </section>
        </div>
        
        <h3 id="message"></h3>
        
        <button class="btn-restart btn">🏁 RESTART QUIZ</button>
        <button class="btn-to-score btn">🏆 HIGH SCORES</button>
      </div>
    
      <div class="high-score-panel card-back">
        <div class="high-score-main">
          <h2 class="high-score-title">High Scores 🏆</h2>
          <div class="scores"></div>
        </div>
        <button class="btn-to-quiz btn">BACK</button>
      </div>
    </div>
  </div>
`;class b extends HTMLElement{static#e="https://courselab.lnu.se/quiz/question/1";#t=[];#s;#n;#i;#o;#r;#a;#l;#u;#p;#w;#y;#m;#h;#d;#c;#E;#x;#b;#f;#v;#g;#I;#L;#S;#k;#D;#T;#M;#H;#A;#O;#q;#P;#C;#j;#_;constructor(){super(),this.attachShadow({mode:"open"}).appendChild(D.content.cloneNode(!0)),this.#i=b.#e,this.#n=!1,this.#o=!1,this.#p=new w,this.#w=!1,this.#q=new L,this.#C=new L,this.#y=this.shadowRoot.querySelector("#title"),this.#m=this.shadowRoot.querySelector("#label"),this.#h=this.shadowRoot.querySelector("#input"),this.#d=this.shadowRoot.querySelector("#submit-btn"),this.#c=this.shadowRoot.querySelector("#message"),this.#x=this.shadowRoot.querySelector("#questions-panel"),this.#k=this.#x.querySelector(".questions-in-panel"),this.#D=this.shadowRoot.querySelector("#input-section"),this.#T=this.shadowRoot.querySelector("#alternatives-section"),this.#M=this.shadowRoot.querySelector("#alternatives"),this.#H=this.#T.querySelector(".btn"),this.#O=this.shadowRoot.querySelector(".total-time"),this.#P=this.shadowRoot.querySelector(".question-timer"),this.#b=this.shadowRoot.querySelector(".username"),this.#v=this.shadowRoot.querySelector(".card-rotatable"),this.#E=this.shadowRoot.querySelector(".game-panel"),this.#f=this.shadowRoot.querySelector(".high-score-panel"),this.#I=this.#f.querySelector(".btn-to-quiz"),this.#L=this.#f.querySelector(".scores"),this.#g=this.#E.querySelector(".btn-to-score"),this.#S=this.shadowRoot.querySelector(".btn-restart"),this.#g.addEventListener("click",e=>{e.stopPropagation(),this.#v.style.transform="rotateY(180deg)";const t=this.#E.getBoundingClientRect().height,s=this.#f.getBoundingClientRect().height;s>t&&(this.#v.style.height=s+"px")}),this.#I.addEventListener("click",e=>{e.stopPropagation(),this.#v.style.transform="unset",this.#v.style.height="fit-content"}),this.#S.addEventListener("click",()=>{this.#ee()}),this.#x.style.display="none",this.#c.style.display="none",this.#T.style.display="none",this.#P.style.display="none",this.#S.style.display="none",this.#oe(this.#p.getHighScoresLocalStorageJSON())}connectedCallback(){this.#h.focus(),this.#U(),this.#h.addEventListener("keydown",e=>{e.keyCode===13&&(e.preventDefault(),e.stopPropagation(),this.#d.click())})}#U(){this.#d.addEventListener("click",e=>{e.stopPropagation(),this.#X(this.#h)},{once:!0})}#X(e){const t=e.value;if(t.length<1){this.#U();return}this.shadowRoot.querySelector("#root").style.gap="10px",this.#g.style.display="none",this.#h.placeholder="Answer...",this.#s=t,this.#b.textContent=t,this.#x.style.display="flex",this.#m.textContent="Provide your answer",this.#Q()}#Q(){this.#z(this.#i).then(e=>{e&&(this.#r=performance.now(),this.#q.startTimerIncrementing(()=>{this.#O.textContent=this.#q.toString()}),e())})}#ee(){this.#g.style.display="none",this.#S.style.display="none",this.#O.textContent="00:00",this.#c.style.display="none",this.#q.resetTimer(),this.#r=void 0,this.#a=void 0,this.#w=!1,this.#n=!1,this.#k.textContent="",this.#i=b.#e,this.#Q()}#N(e){if(!e)return[];this.#M.textContent="";const t=[];for(const[i,n]of Object.entries(e)){const o=this.#$(n,i),r=o.firstChild;r.addEventListener("keydown",a=>{a.keyCode===13&&(a.preventDefault(),a.stopPropagation(),this.#H.click())}),r.addEventListener("change",a=>{this.#A.classList.remove("alternative-checked");const c=a.target.parentElement;c.classList.add("alternative-checked"),this.#A=c}),this.#M.appendChild(o),t.push(o)}const s=this.#M.firstChild.firstChild;return s.checked=!0,s.focus(),this.#A=s.parentElement,this.#A.classList.add("alternative-checked"),t}#$(e,t){const s=document.createElement("label");s.className="alternative-label";const i=document.createElement("input");return i.type="radio",i.name="alternative",i.value=t,s.append(i,e),s}async#z(e){if(!this.#n)return await this.#K(e).then(t=>{const s=t.limit!==void 0,i=t.alternatives!==void 0;if(t){const n=this.#ae(t.question);let o;return i?i&&(o=new de(t.id,t.question,t.nextURL,t.message,t.alternatives),this.#F(),this.#u=this.#N(t.alternatives),this.#ce(this.#H,o,n)):(o=new B(t.id,t.question,t.nextURL,t.message),this.#ie(),this.#le(this.#d,o,n)),this.#J(o),()=>this.#te(s,o,t,n)}}).catch(t=>(console.log("Error fetching question:"+t),null))}#te(e,t,s,i){e?(t.limit=s.limit,this.#o=!0,this.#W(Number(s.limit),i)):this.#W(10,i)}#W(e,t){this.#P.style.display="flex",this.#C.seconds=e,this.#P.textContent=this.#C.toString(),this.#C.startTimerDecreasing(e,()=>{this.#P.textContent=this.#C.toString()},()=>{this.#pe(),this.#ye(t),this.#d.removeEventListener("click",this.#j),this.#H.removeEventListener("click",this.#j)})}#ie(){this.#T.style.display="none",this.#D.style.display="flex",this.#h.value="",this.#h.focus()}#F(){this.#D.style.display="none",this.#T.style.display="flex"}#J(e){this.#t.push(e),this.#B(this.#t.at(-1).question)}#Y(e){this.#R(e),this.#c.style.backgroundColor="red",this.#c.className="message-fail"}#se(e){this.#R(e),this.#c.style.backgroundColor="green",this.#c.className="message-success"}#V(e,t){t?this.#R(e+". NEW HIGH SCORE! 🎗️"):this.#R(e),this.#c.style.backgroundColor="orange",this.#c.className="message-completed-quiz"}#R(e){this.#c.style.display="block",this.#c.textContent=e}async#K(e){const t=await fetch(e);if(!t.ok)throw new Error("ERROR: Bad Request");return await t.json()}async#Z(e,t){const s={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({answer:t})};return await fetch(e,s)}#B(e){this.#y.textContent=e}#ae(e){const t=document.createElement("div");t.className="questions-panel-row";const s=document.createElement("div");s.className="question-answer-section",t.appendChild(s);const i=document.createElement("h3");i.textContent=e,i.className="question-title",s.appendChild(i);const n=document.createElement("h3");return n.textContent="⌛",n.className="status",t.prepend(n),this.#k.appendChild(t),t}#le(e,t,s){const i=n=>{n.stopPropagation();const o=this.#h.value;o.length>0&&(e.removeEventListener("click",i),this.#ne(e,s,t,o,o))};this.#j=i,e.addEventListener("click",i)}#ce(e,t,s){const i=n=>{n.stopPropagation();const o=this.#M.querySelectorAll(".alternative-label"),r=Array.from(o).filter(p=>p.firstChild.checked===!0)[0],a=r.firstChild.value,c=r.textContent;a.length>0&&(e.removeEventListener("click",i),this.#ne(e,s,t,a,c))};this.#_=i,e.addEventListener("click",i)}#ne(e,t,s,i,n){this.#o&&this.#C.stopTimer(),s.setAnswer(i),this.#Z(s.nextURL,i).then(o=>{o.json().then(r=>{this.#he(o,r,t,n)}).catch(r=>{console.log("Error receiving response: "+r),this.#G()})}).catch(o=>{console.log("Error sending answer: "+o),this.#G()})}#he(e,t,s,i){e.ok?this.#fe(t,s,i):this.#we(t,s,i)}#de(e){e.nextURL!==void 0?(this.#se(e.message),this.#i=e.nextURL,this.#z(e.nextURL).then(t=>{t&&t()})):this.#ue()}#ue(){this.#w=!0,this.#G()}#pe(){this.#Y("Question timer ran out... 🕑"),this.#G()}#me(){this.#a=performance.now(),this.#l=this.#a-this.#r}#G(){if(this.#me(),this.#q.stopTimer(),this.#n=!0,this.#i=null,this.#u)for(const e of this.#u)e.replaceWith(e.cloneNode(!0));if(this.#g.style.display="block",this.#S.style.display="block",this.#w){const e=this.#p.isNewHighScore(this.#s,this.#l);this.#V("Nice work, you completed the quiz",e),e&&this.#oe(this.#p.getHighScoresLocalStorageJSON())}}#oe(e){if(this.#L.textContent="",!e){this.#L.append("High-scores is empty. Be the first one to complete the game and get a high-score.");return}const t=Object.values(e);for(let s=0;s<t.length;s++){const i=t[s].username,n=t[s].score;this.#ge(i,n,s+1)}}#ge(e,t,s){const i=document.createElement("div");i.className="score";const n=document.createElement("h3");n.className="score-name",n.textContent=e,i.append(n);const o=document.createElement("h3");switch(o.className="score-time",o.textContent=pe(t),i.append(o),s){case 1:{i.classList.add("score-first-place"),n.classList.add("first-place");break}case 2:{i.classList.add("score-second-place"),n.classList.add("second-place");break}case 3:{i.classList.add("score-third-place"),n.classList.add("third-place");break}default:{n.classList.add("other-place");break}}this.#L.appendChild(i)}#fe(e,t,s){this.#de(e),this.#be(t,s)}#we(e,t,s){this.#G(),this.#Y(e.message),this.#ve(t,s)}#be(e,t){const s=e.querySelector(".status");s.style.backgroundColor="green",s.textContent="✔️",this.#re(e,t)}#ve(e,t){const s=e.querySelector(".status");s.style.backgroundColor="red",s.textContent="❌",this.#re(e,t)}#ye(e){const t=e.querySelector(".status");t.style.backgroundColor="red",t.textContent="⌛"}#re(e,t,s){const i=document.createElement("h4");i.className="question-answer",i.textContent=t,s&&(i.style.color=s),e.querySelector(".question-answer-section").appendChild(i)}async close(){return new Promise((e,t)=>e(!0))}}customElements.define("quiz-game",b);const me="assets/icon-kIMVZTdk.png",ge={name:"Quiz Game",icon:me,exe:()=>new b,multiple_windows:!0,window_padding:!0,window_options_bar:!1,window_bottom_bar:!1,resizable:!1},O="assets/icon-pGqxMzru.png",j=document.createElement("template");j.innerHTML=`
<div class="wrapper p-8 bg-gradient-to-r from-blue-300 to-violet-500">
    <img class="memory-icon" src="" alt="Memory Game icon">
    <h1 class="text-2xl font-bold text-white">Welcome to the Memory Game</h1>
    <div class="flex gap-2 w-full">
        <input class="p-2 bg-white rounded w-full outline-none text-xl" type="text" placeholder="username">
        <select class="match rounded bg-white p-2" name="match" id="match"></select>
        <select class="size rounded bg-white p-2" name="size" id="size"></select>
    </div>
    <button class="bg-blue-300 rounded p-2 w-full font-bold border-blue-400 border-2 text-white">START</button>
</div>
`;class E extends HTMLElement{#e;#t;#s;constructor(e){super(),this.appendChild(j.content.cloneNode(!0)),this.#e=this.querySelector("input"),this.#t=this.querySelector(".size"),this.#s=this.querySelector(".match"),this.querySelector(".memory-icon").src=O,this.#n(),this.#i(e,2),this.#s.addEventListener("change",t=>{t.stopPropagation(),this.#i(e,t.target.value)}),this.querySelector("button").addEventListener("click",t=>{if(t.stopPropagation(),this.#e.value.length>0){const s={toMatch:this.#s.value,gridSize:JSON.parse(this.#t.value)},i=new Event("game-start",{bubbles:!0});i.name=this.#e.value,i.options=s,this.dispatchEvent(i)}})}#n(){for(let e=2;e<=4;e++)this.#o(e)}#i(e,t){this.#t.textContent="";const s=e*t;let i=2,n=2,o=n*i;for(;o<=s;){this.#r(i,n);let r=2;for(let a=0;a<1&&o*r<=s;a++)this.#r(i*r,n),this.#r(i,n*r),r*=2;i+=2,n+=2,o=n*i}}#o(e){const t=document.createElement("option");t.value=e,t.textContent=`🎯 ${e}`,this.#s.appendChild(t)}#r(e,t){const s=document.createElement("option");s.value=JSON.stringify({rows:e,columns:t}),s.textContent=`🔲 ${e}x${t}`,this.#t.appendChild(s)}}customElements.define("welcome-screen",E);const z=document.createElement("template");z.innerHTML=`
<div class="wrapper rounded">
    <div class="card-front card-face rounded"></div>
    <div class="card-back card-face rounded"></div>
</div>
`;class W extends HTMLElement{#e;#t;#s;#n;#i;#o;constructor(e,t,s,i){if(super(),this.appendChild(z.content.cloneNode(!0)),this.#e=this.querySelector(".wrapper"),this.#t=this.#e.querySelector(".card-front"),this.#s=this.#e.querySelector(".card-back"),this.#i=s,this.#n=!0,this.#o=!1,e&&this.#t.appendChild(e),t&&this.#s.appendChild(t),i){const{bgFront:n,bgBack:o}=i;this.setBackgroundColorFront(n),this.setBackgroundColorBack(o)}}get id(){return this.#i}rotateCard(){this.#o||(this.#n?this.#e.style.transform="rotateY(180deg)":this.#e.style.transform="",this.#n=!this.#n)}disableRotate(){this.#o=!0,this.#e.style.cursor="unset"}enableRotate(){this.#o=!1,this.#e.style.cursor="pointer"}setBackgroundColorFront(e){this.#t.style.backgroundColor=e}setBackgroundColorBack(e){this.#s.style.backgroundColor=e}setAllFacesBackgroundColor(e){this.setBackgroundColorFront(e),this.setBackgroundColorBack(e)}setAllFacesBackground(e){this.#s.style.background=e,this.#t.style.background=e}}customElements.define("card-rotatable",W);const fe="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALgAAAC4CAYAAABQMybHAAAFHklEQVR4nO3dbdIqNRCAUbBck25B16LL0bXoFnRTWKVFyat8zGSSSXfnnL/3FnBnHppcGML1MtF3P/w08+5HuXW63annpqc/f/912n1/O+2ec+sV8Tuv7qNM+GcQ+DZnBH3ksYj+BYE/FynoLR4fr9gfCPxf2aJ+RewPBF4n7GeWj33lwCuH/cz937tU6KsFvlrUzywV+jcBHsNZxP3VbYVjskLgS5zIA0ofm8pLFFFvV3bZUnWCi7tNuVe7aoFbjvRR5hhWClzYfZU4nlUCF/cY6Y9r9v9kCnu81P8BzTzBxX2ulMc7a+DiniPdcc8YuLjnSnX8swUu7hjSnIdMgYs7lhTnI0vg4qZJhsDFHVf4c7PS5bKMETry6IGb3jmEPU+RAxc3h0UNXNz5hDxn1uD0FC7yiIGb3nQTLXBx5xfqHFqiUFqk68ErTu9P11BXfcW6Rbl+3NZtfe09qc/+vmVaR1ECz3xSe0+q++0JvQNr8HbXwS/Do29/tBBP0AiBZ5xUZ4aXPfSpTPB9ZsYm8gazA880vSMEli3y6efXBN8mUlgm+Q4C/yxiUCLfSODvRQ5J5BsI/DUB9TF1HS7w3DwJPxD4c8IpQuD/ly1uT8Y3BE5pAv8q6zQ0xV8QOKXNDtwnhAxlgv9D3EVFCHx2XOIubPUJLu7iogQ+IzRxLyDSBD8rON+QWUi0Jcro8IS9mIhr8BERmtqLirovSq+tE0S9uOgb/7SGLmz+lmVnK8HSZPX3wauIvDvB1OEkcEoTeH72MHxD4JQm8NyiT+/pbw4IPC9Lkw0EnpO4NxI4o4T47ELg+ZjeO/iNnjxsNd3ABM/B1G4k8PiyxR3quiGBx2ZyH2QNHlPWsMNd9WmCxyPujgQeiyVJZ5YoMWQPO+wXUkzw+cQ9kAk+T4XlSPivEprgc4j7JAI/n7hPZIlynirvkKTa4cAEP4e4JxH4eOKeSOBjiXsygY8j7gAEPoa4g/AuSn/eBgzEBO9L3MGY4NyV3MHXBO8n8/Quuz21Cd6HLykEZYIfJ+7ATPD1LPVrGQI/xmY8wVmirGHZ3zgywdtlmN7L/3iXCV7X8nFfBN7MLyskYYlSi7D/wwSvQ9xPCHy/iMsTcb8g8PzE/YbAKU3g+0RbnpjeHwg8L3FvIHBKE3hOpvdGAt/O5vQJCTwf03sHgVOawClN4LlYnuwkcEoT+DbeQUlK4JQm8DysvxsInNIETmkCpzSBU5rAKU3glCZwShM4pQmc0gROaQKnNIFvM/s6ENehNBI4pQmc0gS+3axlguXJAQKPTdwHCXwfwSUj8P3OityTqQOBtxkdn7g7EXi7URGKuyOBH9Mzxqu4+xP4cT3CFPYgfiezn8dIt2wUJOoTTD3It5sNo1Zwvc7LzBKF0gROaQKnNIFTmsApTeCUJnBKEzil+STzg+9//LnHzdw/0Tr8iccfv/1y/NEsROD9vft49tWf+dh+EIH3cfSag24Tnq+swY/reUHNzS+69SXwdiNjFHknAm9zRoAi70Dg+50ZnsgPEnh8Ij9A4PvMik3kjQS+ncgSEngenmANBL6NuJISeC6eaDsJnNIE/pmpmZjAKU3glCZwShM4pQmc0gROaQKnNIF/5nuSiQmc0gSei1eTnQS+jbCSEjilCXy72VPcq0gDgecg7kYC30doyQh8v7Mj96Q6QOBtzopO3AcJvN3I+PxufScCP2ZEiMLuyP7gfdyjPPL9TWEPIPC+HiPdEruoR7pcLn8BjVePvghyHugAAAAASUVORK5CYII=",G=document.createElement("template");G.innerHTML=`
<div class="board-wrapper bg-gradient-to-r from-blue-300 to-violet-500">
    <!-- Memory Cards will be placed here  -->
</div>
`;class g extends HTMLElement{static#e=500;#t;#s;#n;#i;#o;#r;#a;constructor(e,t,s){super(),this.appendChild(G.content.cloneNode(!0)),this.#s=e,this.#t=t,this.#i=s,this.#n=this.querySelector(".board-wrapper"),this.style.width=g.#e+"px",this.style.height=g.#e+"px",this.#o=[],this.#a=0}connectedCallback(){const e=this.#b(this.#s);this.#r=this.#l(this.#t,e),this.#c(1),this.addEventListener("add-square-click",t=>{t.stopPropagation(),t.preventDefault(),this.#x(t.target)})}#l(e,t){this.#f(e);const s=Math.floor(t/this.#i),i=[];for(let o=1;o<s+1;o++){const r=e[o-1];for(let a=0;a<this.#i;a++){const c=this.#u(r),p=this.#p(fe),f={bgFront:"#5a6e96",bgBack:"#5a6e96"},m=new W(p,c,o,f);this.#x(m),i.push(m)}}this.#f(i);let n=1;return i.forEach(o=>{this.#n.querySelector(`.sq-${n}`).append(o),n++}),i.length}#u(e){const t=document.createElement("img");return t.src=e,t.classList.add("card-image"),t.draggable=!1,t}#p(e){const t=document.createElement("img");return t.src=e,t.classList.add("card-question"),t.draggable=!1,t}#w(e){e.addEventListener("keydown",t=>{t.stopPropagation();const s=Number(t.target.classList[1].split("-")[1]),i=this.#s.columns,n=this.#s.rows;switch(t.key){case"ArrowUp":this.#y(s,i,n);break;case"ArrowDown":this.#m(s,i,n);break;case"ArrowLeft":this.#h(s,i);break;case"ArrowRight":this.#d(s,i);break;case"Enter":t.target.firstChild.click();break}})}#y(e,t,s){const i=e<=t?(s-1)*t+e:e-t;this.#c(i)}#m(e,t,s){const i=t*(s-1),n=e>i?e-i:e+t;this.#c(n)}#h(e,t){const s=e%t===1?e+(t-1):e-1;this.#c(s)}#d(e,t){const s=e%t===0?e-(t-1):e+1;this.#c(s)}#c(e){this.#E(e).focus()}#E(e){return this.#n.querySelector(`.sq-${e}`)}#x(e){const t=s=>{s.stopPropagation(),e.rotateCard(),e.disableRotate(),e.removeEventListener("click",t);const i=this.#o.length;if(i===0)this.#o.push(e);else if(i>0){const n=this.#o[i-1];if(n.id===e.id&&n!==e)this.#o.length===this.#i-1?(this.#o.forEach(o=>{o.setAllFacesBackground("linear-gradient(135deg, rgba(48, 180, 193, 0.35) 0%, rgba(55, 30, 111, 0.72) 50%, rgba(0, 212, 255, 0.31) 100%)"),o.parentElement.classList.add("square-no-pointer"),this.#r--}),this.#o=[],this.#r--,e.setAllFacesBackground("linear-gradient(135deg, rgba(48, 180, 193, 0.35) 0%, rgba(55, 30, 111, 0.72) 50%, rgba(0, 212, 255, 0.31) 100%)"),e.parentElement.classList.add("square-no-pointer"),this.#r===0&&setTimeout(()=>{const o=new Event("game-winner",{bubbles:!0});o.incorrectGuesses=this.#a,this.dispatchEvent(o)},300)):this.#o.push(e);else{this.#a++;const o=[...this.#o];this.#o=[];const r=new Event("add-square-click",{bubbles:!0});setTimeout(()=>{o.forEach(a=>{a.enableRotate(),a.rotateCard(),setTimeout(()=>a.dispatchEvent(r),300)}),e.enableRotate(),e.rotateCard(),setTimeout(()=>e.dispatchEvent(r),300)},300)}}};e.addEventListener("click",t)}#b(e){const{columns:t,rows:s}=e,i=this.querySelector(".board-wrapper");i.style.gridTemplateColumns=`repeat(${t}, auto)`,i.style.gridTemplateRows=`repeat(${s}, auto)`;const n=t*s;for(let o=1;o<n+1;o++){const r=document.createElement("div");r.tabIndex=0,this.#w(r),r.classList.add("square",`sq-${o}`),i.appendChild(r)}return t<s?this.style.width=`${g.#e*(t/s)}px`:s<t&&(this.style.height=`${g.#e*(s/t)}px`),n}#f(e){for(let t=e.length-1;t>0;t--){const s=Math.floor(Math.random()*(t+1));[e[t],e[s]]=[e[s],e[t]]}return e}}customElements.define("memory-board",g);const U=document.createElement("template");U.innerHTML=`
<div class="wrapper bg-gradient-to-r from-blue-300 to-violet-500">
    <h1 class="text-white text-2xl font-bold">WINNER!</h1>
    <h2 class="font-bold text-white"></h2>
    <h3 class="font-bold"></h3>
    <button class="btn-again bg-blue-300 rounded p-2 text-white w-full">PLAY AGAIN</button>
    <button class="btn-options bg-blue-300 rounded p-2 text-white w-full">CHANGE SETTINGS</button>
</div>
`;class Q extends HTMLElement{constructor(e,t){super(),this.appendChild(U.content.cloneNode(!0));const s=this.querySelector("h3");s.textContent=`Incorrect guesses: ${e}`;const i=e<4?"text-green-500":"text-red-500";s.classList.add(i),this.querySelector("h2").textContent=`🏆 ${t}`,this.querySelector(".btn-again").addEventListener("click",()=>{const n=new Event("game-restart",{bubbles:!0});this.dispatchEvent(n)}),this.querySelector(".btn-options").addEventListener("click",()=>{const n=new Event("change-settings",{bubbles:!0});this.dispatchEvent(n)})}}customElements.define("victory-screen",Q);const we="assets/1-ateVOW_m.jpg",be="assets/2-hihF3Uil.jpg",ve="assets/3-t5GwkysM.jpg",ye="assets/4-Rbb2e9Pu.jpg",xe="assets/5-yOCOMBmT.jpg",Ee="assets/6-sWDlsaUO.jpg",Se="assets/7-1gcOTLK-.jpg",ke="assets/8-_M2hH314.jpg",Le="assets/9-1FZoHpUK.jpg",Ce="assets/10-XWwvvw-T.jpg",Te="assets/11-xYdgaqlr.jpg",qe="assets/12-NQkyML2S.jpg",Me="assets/13-U2kR_6kl.jpg",Pe="assets/14-tDlx1LVH.jpg",Ie="assets/15-EKVCfJLc.jpg",He="assets/16-8rYO7Rcp.jpg",Ae="assets/17-ovGl63RL.jpg",Ne="assets/18-cscrudDo.jpg",Re="assets/19-hnmuBRBL.jpg",Be="assets/20-JpuB9teE.jpg",De="assets/21-TDeywHru.jpg",x=[we,be,ve,ye,xe,Ee,Se,ke,Le,Ce,Te,qe,Me,Pe,Ie,He,Ae,Ne,Re,Be,De],$=document.createElement("template");$.innerHTML=`
<div class="memory-game-wrapper bg-gradient-to-r from-blue-400 to-violet-600">
  <!-- Dynamic content will be loaded here such as welcome screen, game board and victory screen -->
</div>
`;class F extends HTMLElement{#e;#t;#s;#n;#i;#o;constructor(){super(),this.appendChild($.content.cloneNode(!0)),this.#e=new E(x.length),this.querySelector(".memory-game-wrapper").appendChild(this.#e),this.#n=x,this.addEventListener("game-start",e=>{e.stopPropagation(),this.#i=e.name,this.#o=e.options,this.#t=new g(this.#o.gridSize,this.#n,this.#o.toMatch),this.querySelector(".memory-game-wrapper").appendChild(this.#t),this.#e.remove()}),this.addEventListener("game-winner",e=>{e.stopPropagation(),this.#s=new Q(e.incorrectGuesses,this.#i),this.querySelector(".memory-game-wrapper").appendChild(this.#s),this.#t.remove()}),this.addEventListener("game-restart",e=>{e.stopPropagation(),this.#t=new g(this.#o.gridSize,this.#n,this.#o.toMatch),this.querySelector(".memory-game-wrapper").appendChild(this.#t),this.#s.remove()}),this.addEventListener("change-settings",e=>{e.stopPropagation(),this.#e=new E(x.length),this.querySelector(".memory-game-wrapper").appendChild(this.#e),this.#s.remove()})}async close(){return new Promise((e,t)=>e(!0))}}customElements.define("memory-game",F);const Oe={name:"Memory Game",icon:O,exe:()=>new F,multiple_windows:!0,resizable:!1},J=document.createElement("template");J.innerHTML=`
<div class="nav-window-wrapper bg-blue-950 p-4">
    <h1 class="title font-bold text-white mb-6"></h1>
    <div class="content w-full flex flex-col justify-center items-center rounded gap-3"></div>
</div>
`;class Y extends HTMLElement{#e;#t;#s;constructor(e,t,s){super(),this.appendChild(J.content.cloneNode(!0)),this.#e=this.querySelector(".nav-window-wrapper"),this.#t=this.querySelector(".title"),this.#s=this.querySelector(".content"),this.#t.textContent=t,s&&this.#s.append(s),e&&(this.style.position="absolute",this.#e.style.position="absolute",this.setTopAbsolute(0),this.setLeftAbsolute(0))}addContent(e){this.#s.appendChild(e)}setLeftAbsolute(e){this.#e.style.left=e+"px"}setTopAbsolute(e){this.#e.style.top=e+"px"}}customElements.define("nav-window",Y);const V=document.createElement("template");V.innerHTML=`
<div class="option-field-wrapper">
    <h1 class="title text-white"></h1>
    <div class="field bg-gradient-to-b from-blue-400 to-violet-500 rounded w-full font-bold px-1 py-0.5 
                flex justify-between items-center gap-2">
        <h2 class="field-name text-white break-normal"></h2>
    </div>
    <div class="dropdown-container overflow-hidden w-full">
      <div class="dropdown-menu w-full flex p-1 gap-1">
        <input type="text" placeholder="new" class="w-full h-6 font-xs p-1 bg-white rounded">
        <button class="edit-btn bg-white text-blue-800 text-xs rounded px-1 py-0.5 font-bold self-start h-full">✏️</button>
      </div>
    </div>
</div>
`;class K extends HTMLElement{#e;#t;#s;#n;#i;#o;#r;constructor(e,t,s){super(),this.appendChild(V.content.cloneNode(!0)),this.#e=this.querySelector(".title"),this.#t=this.querySelector(".field-name"),this.#n=this.querySelector(".dropdown-container"),this.#i=this.querySelector(".dropdown-menu"),this.#o=this.querySelector(".edit-btn"),this.#s=this.querySelector(".field"),this.#r=this.querySelector("input"),this.#e.textContent=e,this.#t.textContent=t,this.#s.addEventListener("click",i=>{i.stopPropagation(),this.#a()}),this.#o.addEventListener("click",i=>{i.stopPropagation(),this.#r.value.length>0&&(s(this.#r.value,!0),this.updateCurrentValue(this.#r.value),this.#r.value="",this.#l())})}updateCurrentValue(e){this.#t.textContent=e}connectedCallback(){this.#i.style.top=`-${this.#n.offsetHeight}px`,this.#l()}#a(){this.#n.style.display="flex",this.#i.style.transform=`translateY(${this.#n.offsetHeight}px)`}#l(){this.#n.style.display="none"}}customElements.define("option-field-editable",K);class v{#e;#t;#s;#n;constructor(e,t,s,i){this.#e=e,this.#t=t,this.#s=s,this.#n=i}static fromJSON(e){return new v(e.author,e.date,e.message,e.isMyMessage)}get author(){return this.#e}get date(){return this.#t}get message(){return this.#s}get isMyMessage(){return this.#n}getJSON(){return{author:this.#e,date:this.#t,message:this.#s,isMyMessage:this.#n}}}const je="eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd",ze="wss://courselab.lnu.se/message-app/socket";class S{static KEY=je;constructor(){this.type="",this.data="",this.username="",this.channel=""}addType(e){return this.type=e,this}addData(e){return this.data=e,this}addUsername(e){return this.username=e,this}addChannel(e){return this.channel=e,this}build(){return{type:this.type,data:this.data,username:this.username,channel:this.channel,key:S.KEY}}}class h{static#e=ze;static#t=null;static#s=null;static#n;static#i=[];#o;#r;#a;#l;constructor(e,t,s){this.#a=e,this.#l=t,this.#r=s,h.#i.push(s),this.#p()}initializeUsername(e){h.#t=e,localStorage.setItem("username",e)}initializeChannel(e){h.#s=e,localStorage.setItem("channel",e)}changeUsername(e){h.#t!==e&&(this.#u()?h.#i.forEach(t=>{t.updateUsername(e,!1)}):this.#r.updateUsername(e,!1),localStorage.setItem("username",e),h.#t=e)}getUsername(){return h.#t}changeChannel(e){h.#s!==e&&(this.#u()?h.#i.forEach(t=>{t.updateChannel(e,!1)}):this.#r.updateChannel(e,!1),localStorage.setItem("channel",e),h.#s=e)}getChannel(){return h.#s}#u(){return h.#i.length>1}#p(){this.#o=new WebSocket(h.#e),this.#o.addEventListener("message",e=>{e.stopPropagation(),this.#w(e.data)}),this.#o.addEventListener("close",e=>{e.stopPropagation(),this.#a("CONNECTION CLOSED","red")}),this.#o.addEventListener("error",e=>{e.stopPropagation(),this.#a("SOCKET ERROR: "+e,"red")})}closeConnection(){this.#o.readyState===1&&(this.#o.close(),h.#i=h.#i.filter(e=>e!==this.#r))}async sendChatMessage(e){return new Promise((t,s)=>this.#o.readyState!==1?t(!1):(h.#n={username:e.username,channel:e.channel,data:e.data},this.#o.send(JSON.stringify(e.build())),t(!0)))}#w(e){const t=JSON.parse(e);switch(t.type){case"message":this.#y(t);break;case"notification":this.#m(t);break}}#y(e){if(!this.#h(e)){const t=new v(e.username,new Date().toLocaleString(),e.data,!1);this.#l(t)}}#m(e){switch(e.data){case`${e.username} has joined the chat`:this.#a(`🔌 ${e.data}`);break;case"You are connected!":this.#a(`🔌 ${e.data}`,"green");break;default:this.#a(e.data);break}}#h(e){let t;if(h.#n===null)t=!1;else{const s=JSON.stringify({username:e.username,channel:e.channel,data:e.data});t=JSON.stringify(h.#n)===s}return t}}const k="assets/icon-EgtDUE_p.png",Z=document.createElement("template");Z.innerHTML=`
<div class="chat-welcome-wrapper bg-gradient-to-br from-blue-200 to-green-300 flex flex-col 
            w-full h-full items-center justify-center">
    <div class="w-6/12 flex flex-col gap-2 bg-gradient-to-br from-blue-500 to-violet-200 bg-opacity-20 p-4 rounded">
      <div class="flex flex-col mb-4">
        <img src="" alt="chat app icon" class="w-5/12 h-5/12 self-center mb-2">
        <h2 class="text-white text-center font-bold">Chatting made easy. Meet new people and exchange ideas!</h2>
      </div>
      <input type="text" name="username" id="username" placeholder="username" class="input-username font-bold px-1 py-0.5 rounded">
      <div>
          <div class="flex items-start gap-2">
            <label for="accept-terms" class="flex items-start gap-1">
              <input type="checkbox" name="accept-terms" id="accept-terms" class="checkbox-terms">
              <p class="text-white text-xs leading-none">I agree to the rules and terms of the chat service. I will not engage in offensive behaviour using the service.</p>
            </label>
          </div>
      </div>
      <button class="btn-start-chat bg-gradient-to-br from-blue-600 to-violet-600 rounded w-full px-1 py-0.5 text-white font-bold mt-4">START CHATTING</button>
      <p class="notification bg-white bg-opacity-30 rounded px-1 py-0.5 text-red-400 text-xs"></p>
    </div>
</div>
`;class _ extends HTMLElement{#e;#t;#s;constructor(){super(),this.appendChild(Z.content.cloneNode(!0));const e=this.querySelector("img");e.src=k,this.#e=this.querySelector(".input-username"),this.#t=this.querySelector(".checkbox-terms"),this.#s=this.querySelector(".notification"),this.#o()}connectedCallback(){this.#i()}#n(e){const t=new Event("enter-chat-app",{bubbles:!0});t.username=e,this.dispatchEvent(t)}#i(){const e=t=>{t.stopPropagation();const s=this.#e.value;s.length>0?this.#t.checked?this.#n(s):this.#r("You must agree to the terms of service","red"):this.#r("You must enter a username","red")};this.querySelector(".btn-start-chat").addEventListener("click",e)}#o(){this.#s.style.display="none"}#r(e,t){this.#s.style.display="unset",this.#s.textContent=e,this.#s.style.color=t}}customElements.define("chat-welcome-screen",_);const X=document.createElement("template");X.innerHTML=`
<div class="chat-wrapper">
    <nav class="bg-gradient-to-b from-blue-400 to-violet-500 p-1 flex flex-col gap-1 justify-end sticky z-40">
      <!-- Nav buttons will appear here -->
    </nav>
    <div class="main-window">
        <div class="chat-window w-full h-full flex justify-start items-center p-2 flex-col gap-1">
            <!-- ChatWindowMessage Bubbles will be added here -->
        </div>
        <div class="msg-window w-full p-2 gap-2 flex auto-cols-auto z-20">
            <textarea name="msg-area" id="msg-area" placeholder="message" class="msg-area rounded p-2 leading-tight col-span-3
                        h-10 font-bold resize-none w-full"></textarea>
            <div class="flex gap-2">
              <button class="btn-send rounded flex items-center justify-center p-2 text-black bg-white bg-opacity-50 hover:bg-opacity-60 w-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 
                                    20.875L5.999 12Zm0 0h7.5" />
                </svg>
              </button>
              <button class="emoji-menu-btn bg-white bg-opacity-50 hover:bg-opacity-60 w-10 rounded flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 
                  0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 
                  .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                </svg>
              </button>
            </div>   
        </div>
        <div class="emoji-menu-wrapper w-full h-fit flex items-center justify-center">
          <div class="emoji-menu px-1 py-1 gap-1 justify-start items-start w-fit h-fit overflow-y-scroll">
            <!-- EMOJIS will be loaded here -->
          </div>
        </div>
    </div>
</div>
`;class d extends HTMLElement{static#e=["😀","😃","😄","😅","😎","🥳","🧐","😇","😍","😘","😐","😴","🙁","😵","😂","🤗","😒","😌","😮","😱","🙃","🤭","😢","🤩","😕","🥰","😊","👋","🤟","🤝","💪","👍","👌","👎","🙌","👀","💯","🎉","🎁","🎓","⌛","🎸","🎧","💻","🎵","📷","🔧","📫","💼","🛒","📌","💳","🌍","🏝️","🎃","🎄","🎆","🎇","🎟️","🏆","✏️","📃","🗑️","📔","🌡️","⚖️","📡","🔑","💡","🗓️"];static#t="ease-in 0.2s";static#s=200;static#n=[];#i=null;#o;#r=!1;#a=!1;#l;#u;#p;#w;#y;#m;#h;#d;#c;#E;#x;#b=null;#f=null;#v=!1;#g;#I;#L;#S;#k;constructor(){super(),this.appendChild(X.content.cloneNode(!0)),this.#l=this.querySelector(".chat-wrapper"),this.#u=this.querySelector("nav"),this.#p=this.querySelector(".main-window"),this.#w=this.querySelector(".chat-window"),this.#m=this.querySelector(".msg-area"),this.#y=this.querySelector(".msg-window"),this.#h=this.querySelector(".btn-send"),this.#d=this.querySelector(".emoji-menu-wrapper"),this.#c=this.querySelector(".emoji-menu"),this.#E=this.querySelector(".emoji-menu-btn"),this.#D()}connectedCallback(){const e=localStorage.getItem("username"),t=localStorage.getItem("channel");!e&&!t?(this.#x=new _,this.#l.append(this.#x),this.addEventListener("enter-chat-app",s=>{s.stopPropagation(),this.#T(s.username,"default")})):this.#T(e,t)}#D(){this.#u.style.display="none",this.#p.style.display="none"}#T(e,t){this.#u.style.display="flex",this.#p.style.display="grid",this.#i=new h((i,n)=>this.#$(i,n),i=>this.#C(i),this),this.#i.initializeUsername(e),this.#i.initializeChannel(t),this.#U(this.#i),this.#ee(),this.#A();const s=localStorage.getItem("cachedMessages");s&&(d.#n=JSON.parse(s),d.#n.forEach(i=>{this.#j(i)})),this.#P(),this.#_()}#M(){this.#d.style.transform=`translateY(${this.#o}px)`,this.#r=!1}#H(){this.#d.style.transform=`translateY(${-this.#o}px)`,this.#r=!0}#A(){document.createElement("div").classList.add("emoji-menu"),d.#e.forEach(t=>{const s=document.createElement("button");s.classList.add("btn-emoji"),s.textContent=t,s.addEventListener("click",i=>{i.stopPropagation(),this.#m.value=this.#m.value+t}),this.#c.appendChild(s)}),this.#d.style.top=this.#p.getBoundingClientRect().height+"px",this.#o=this.#d.getBoundingClientRect().height+this.#y.getBoundingClientRect().height,this.#E.addEventListener("click",t=>{t.stopPropagation(),this.#r?this.#M():this.#H()})}#O(e){const t=new S().addType("message").addData(e).addUsername(this.#i.getUsername()).addChannel(this.#i.getChannel());this.#i.sendChatMessage(t).then(s=>{if(s){const i=new v(this.#i.getUsername(),new Date().toLocaleString(),e,!0);this.#C(i),this.#m.value=""}})}#q(e){e.length>0&&this.#O(e)}#P(){this.#h.addEventListener("click",e=>{e.stopPropagation(),this.#q(this.#m.value)})}#C(e){this.#N(this.#W(e)),d.#n.push(e.getJSON()),localStorage.setItem("cachedMessages",JSON.stringify(d.#n))}#j(e){this.#N(this.#W(v.fromJSON(e)))}#_(){this.#m.addEventListener("keydown",e=>{switch(e.stopPropagation(),e.key){case"Enter":{if(this.#a)return;e.preventDefault(),this.#q(e.target.value);break}case"Shift":{this.#a=!0;const t=s=>{s.stopPropagation(),s.key==="Shift"&&(this.#a=!1,this.removeEventListener("keyup",t))};this.addEventListener("keyup",t);break}}})}#U(e){this.#g=this.#V("Profile",null),this.#L=this.#F("👤 Username",e.getUsername(),(t,s)=>this.updateUsername(t,s)),this.#S=this.#F("📡 Channel",e.getChannel(),(t,s)=>this.updateChannel(t,s)),this.#g.addContent(this.#L),this.#g.addContent(this.#S),this.#g.addContent(this.#Q()),this.#I=this.#V("About",this.#X())}#X(){const e=document.createElement("div");e.className="about-content";const t=document.createElement("img");t.src=k,t.classList.add("about-icon");const s=document.createElement("h1");s.textContent="Chat",s.classList.add("font-bold");const i=document.createElement("p");i.textContent="This is an application made to chat with other students at Linnaeus University.",i.classList.add("text-xs");const n=document.createElement("p");return n.textContent="© 2023-2024 - Linnaeus University - ea224pg",n.className="copyright-text",e.append(t,s,i,n),e}#Q(){return this.#k=document.createElement("button"),this.#k.textContent="Clear Message Cache",this.#k.className="rounded w-full text-white font-bold",this.#k.style.backgroundColor="#26b0b0",this.#k.addEventListener("click",e=>{e.stopPropagation(),localStorage.removeItem("cachedMessages"),this.#$("✉️ Cleared message cache"),d.#n=[]}),this.#k}#ee(){[this.#J("Profile","🙋‍♂️",this.#g),this.#J("About","‍❔",this.#I)].forEach(t=>{this.#u.appendChild(t)})}#N(e){this.#w.appendChild(e),this.#te()}updateUsername(e,t){const s=document.createElement("span");s.textContent="👤 Changed username from ",s.style.color="blue";const i=document.createElement("span");i.textContent=this.#i.getUsername(),i.style.color="violet";const n=document.createElement("span");n.textContent=" to ",n.style.color="blue";const o=document.createElement("span");o.textContent=e,o.style.color="violet",t?this.#i.changeUsername(e):(this.#z(s,i,n,o),this.#L&&this.#L.updateCurrentValue(e))}updateChannel(e,t){const s=document.createElement("span");s.textContent="📡 Changed channel from ",s.style.color="blue";const i=document.createElement("span");i.textContent=this.#i.getChannel(),i.style.color="violet";const n=document.createElement("span");n.textContent=" to ",n.style.color="blue";const o=document.createElement("span");o.textContent=e,o.style.color="violet",t?this.#i.changeChannel(e):(this.#z(s,i,n,o),this.#S&&this.#S.updateCurrentValue(e))}#$(e,t){const s=document.createElement("p");s.textContent=e,s.classList.add("message-event"),t!==null&&(s.style.color=t),this.#N(s)}#z(...e){const t=document.createElement("span");t.classList.add("message-event"),e.forEach(s=>{t.appendChild(s)}),this.#N(t)}#te(){this.#w.scrollTop=this.#w.scrollHeight}#W(e){const t=document.createElement("div");t.classList.add("message-wrapper",e.isMyMessage?"message-right":"message-left");const s=document.createElement("p");s.classList.add("message-username"),s.textContent=e.author;const i=document.createElement("div");i.classList.add("message-bubble",e.isMyMessage?"bubble-right":"bubble-left"),i.textContent=e.message,i.style.backgroundColor=e.isMyMessage?"#26b0b0":"#797bf8";const n=document.createElement("p");return n.classList.add("message-date"),n.textContent=e.date,t.append(s,i,n),t}#ie(e,t){const s=n=>{n.stopPropagation(),t.style.visibility="hidden"},i=n=>{n.stopPropagation(),t.style.visibility="visible",e.addEventListener("mouseleave",s)};e.addEventListener("mouseover",i)}#F(e,t,s){return new K(e,t,s)}#J(e,t,s){const i=document.createElement("button");return i.classList.add("nav-btn"),i.textContent=t,i.value=e,i.addEventListener("click",n=>{n.stopPropagation(),this.#R(s,i);const o=r=>{r.stopPropagation(),this.#B(s),this.#p.removeEventListener("click",o),i.classList.remove("nav-btn-selected"),this.#B(s),this.#b=null,this.#f=null};this.#p.addEventListener("click",o)}),this.#Y(i,e),i}#Y(e,t){const s=this.#se(t);this.#l.appendChild(s);const i=o=>{o.stopPropagation(),s.style.display="block";const r=this.#l.getBoundingClientRect(),a=e.getBoundingClientRect(),c=e.offsetHeight-s.offsetHeight;s.style.top=c/2+(a.top-r.top)+"px",s.style.left=a.right-r.left+8+"px",e.addEventListener("mouseleave",n)},n=o=>{o.stopPropagation(),s.style.display="none",e.removeEventListener("mouseleave",n)};e.addEventListener("mouseover",i)}#se(e){const t=document.createElement("h1");return t.textContent=e,t.classList.add("nav-btn-tooltip"),t}#V(e,t){const s=new Y(!0,e,t);return s.setLeftAbsolute(-200),s.style.transition=d.#t,this.#l.appendChild(s),s}#R(e,t){this.#v||(this.#b===null?(this.#K(e),this.#Z(e,t)):this.#b!==e?(this.#B(this.#b),this.#v=!0,setTimeout(()=>{this.#K(e),this.#v=!1},d.#s),this.#f.classList.remove("nav-btn-selected"),this.#Z(e,t)):(this.#B(e),this.#f.classList.remove("nav-btn-selected"),this.#b=null,this.#f=null))}#K(e){e.style.transform=`translateX(${200+this.#u.offsetWidth}px)`}#Z(e,t){this.#b=e,this.#f=t,t.classList.add("nav-btn-selected")}#B(e){e.style.transform="translateX(0px)"}async close(){return new Promise((e,t)=>{this.#i!==null&&this.#i.closeConnection(),e(!0)})}}customElements.define("chat-app",d);const We={name:"Chat",icon:k,exe:()=>new d,multiple_windows:!0,window_padding:!1,window_options_bar:!1,window_bottom_bar:!1,resizable:!1},ee=document.createElement("template");ee.innerHTML=`
<div class="quotes-wrapper bg-gradient-to-br from-blue-200 to-violet-500 flex flex-col justify-center items-center gap-2 p-4">
    <div class="mb-6">
        <h1 class="text-2xl text-white font-bold text">⏳ Quotes</h1>
    </div>
    <div class="bg-white bg-opacity-20 p-2 rounded w-full">
        <div class="text-white">
          <span class="font-bold">"<span class="quote break-words"><--- Quote will be displayed here ---></span>"</span>
        </div>
        <div>
            <span class="text-white text-xs">-</span>
            <span class="quote-by text-white text-xs"><--- Quote by will be displayed here ---></span>
        </div>
    </div>
    <p class="quote-number text-xs font-thin text-white self-start mb-4"></p>
    <button class="btn-quote bg-white p-1 rounded text-black font-bold w-full">🎲 QUOTE</button>
</div>
`;class u extends HTMLElement{static QUOTES=[{quote:"We are what we repeatedly do. Excellence, then, is not an act, but a habit.",by:"Aristotle"},{quote:"Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world, stimulating progress, giving birth to evolution",by:"Albert Einstein"},{quote:"I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times",by:"Bruce Lee"},{quote:"The future belongs to those who believe in the beauty of their dreams.",by:"Eleanor Roosevelt"},{quote:"Every strike brings me closer to the next home run",by:"Babe Ruth"},{quote:"There is nothing permanent except change",by:"Heraclitus"},{quote:"Learning never exhausts the mind",by:"Leonardo da Vinci"},{quote:"The only journey is the one within",by:"Rainer Maria Rilke"},{quote:"It is far better to be alone, than to be in bad company",by:"George Washington"},{quote:"Music is a moral law. It gives soul to the universe, wings to the mind, flight to the imagination, and charm and gaiety to life and to everything",by:"Plato"},{quote:"If you cannot do great things, do small things in a great way",by:"Napoleon Hill"},{quote:"Happiness can exist only in acceptance",by:"George Orwell"},{quote:"Knowledge will give you power, but character respect",by:"Bruce Lee"},{quote:"A good decision is based on knowledge and not on numbers",by:"Plato"},{quote:"Be yourself; everyone else is already taken",by:"Oscar Wilde"},{quote:"It is during our darkest moments that we must focus to see the light",by:"Aristotle"},{quote:"The way to get started is to quit talking and begin doing",by:"Walt Disney"},{quote:"Two things are infinite: the universe and human stupidity; and I'm not sure about the universe",by:"Albert Einstein"},{quote:"Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking",by:"Steve jobs"},{quote:"Never memorise something that you can look up",by:"Albert Einstein"},{quote:"You must be the change you wish to see in the world",by:"Mahatma Gandhi"},{quote:"Let the future tell the truth, and evaluate each one according to his work and accomplishments. The present is theirs; the future, for which I have really worked, is mine",by:"Nikola Tesla"},{quote:"Thinking – the talking of the soul with itself",by:"Plato"},{quote:"Only a life lived for others is a life worthwhile",by:"Albert Einstein"},{quote:"An unexamined life is not worth living",by:"Socrates"},{quote:"It does not matter how slowly you go as long as you do not stop",by:"Confucius"},{quote:"Don't worry when you are not recognized, but strive to be worthy of recognition",by:"Abraham Lincoln"},{quote:"Life is really simple, but we insist on making it complicated",by:"Confucius"},{quote:"With great power comes great responsibility",by:"Stan Lee"},{quote:"Showing off is the fool s idea of glory.",by:"Bruce Lee"},{quote:"Without music, life would be a mistake",by:"Friedrich Nietzsche"},{quote:"If you want to live a happy life, tie it to a goal, not to people or things",by:"Albert Einstein"},{quote:"You only live once, but if you do it right, once is enough",by:"Mae West"},{quote:"A friend is someone who knows all about you and still loves you",by:"Elbert Hubbard"},{quote:"So many books, so little time",by:"Frank Zappa"},{quote:"You miss 100% of the shots you don't take",by:"Wayne Gretzky"},{quote:"Whether you think you can or you think you can't, you're right",by:"Henry Ford"},{quote:"Design is not just what it looks like and feels like. Design is how it works",by:"Steve Jobs"},{quote:"Intelligence is the ability to adapt to change",by:"Stephen Hawking"},{quote:"The only person you are destined to become is the person you decide to be",by:"Ralph Waldo Emerson"},{quote:"Dreaming, after all, is a form of planning",by:"Gloria Steinem"},{quote:"My mama always said, life is like a box of chocolates. You never know what you're gonna get",by:"Forrest Gump"},{quote:"The more man meditates upon good thoughts, the better will be his world and the world at large",by:"Confucius"},{quote:"Keep calm and carry on",by:"Winston Churchill"},{quote:"The greatest pleasure of life is love",by:"Euripides"},{quote:"A room without books is like a body without a soul",by:"Marcus Tullius Cicero"}];#e;#t;#s;#n;#i;constructor(){super(),this.append(ee.content.cloneNode(!0)),this.#s=this.querySelector(".quote"),this.#n=this.querySelector(".quote-by"),this.#i=this.querySelector(".quote-number"),this.#e=u.QUOTES[0],this.#r(),this.querySelector(".btn-quote").addEventListener("click",e=>{e.stopPropagation(),this.#r()})}#o(e){this.#t=e,this.#e=u.QUOTES[e],this.#a()}#r(){if(!(u.QUOTES.length<3))for(;;){const e=Math.floor(Math.random()*u.QUOTES.length);if(this.#t!==e){this.#e=u.QUOTES[e],this.#t=e,this.#a();break}}}#a(){this.#s.textContent=this.#e.quote,this.#n.textContent=this.#e.by,this.#i.textContent=`📜 ${this.#t+1}/${u.QUOTES.length}`}async close(){return!0}}customElements.define("quotes-app",u);const Ge="assets/icon-l5ML6xYz.png",Ue={name:"Quotes",icon:Ge,exe:()=>new u,multiple_windows:!0,resizable:!0},Qe=()=>new y(ge,void 0),$e=()=>new y(Oe,void 0),Fe=()=>new y(We,void 0),Je=()=>new y(Ue,void 0),Ye="assets/background-5soFWGHd.png",Ve={taskbarHeight:44},te=document.createElement("template");te.innerHTML=`
<div class="pwd flex justify-center items-center">
    <div class="desktop flex justify-start items-start h-full relative">
        <!-- Content inside desktop -->
    </div>
    <!-- taskbar-pwd is placed here -->
</div>
`;class Ke extends HTMLElement{#e;#t;#s;#n;#i;#o;#r;#a;#l;constructor(){super(),this.appendChild(te.content.cloneNode(!0)),this.#r=this.querySelector(".pwd"),this.#a=this.querySelector(".desktop"),this.#l=new M(Ve.taskbarHeight),this.#r.appendChild(this.#l),this.#l.classList.add("backdrop-blur-md"),this.#n=new se,this.#i=new re(this.#a,this.#r),this.#s=new oe(this.#n,this.#i),this.#o=new ae(this,this.#s,this.#i),this.#t=[he(this.#s)],this.#e=[Qe(),$e(),Fe(),Je()],this.#t.forEach(e=>{this.#l.addTaskbarItem(e),this.#s.runProgramSystem(e)}),this.#e.forEach(e=>{this.#l.addTaskbarItem(e)})}connectedCallback(){this.#o.start(),this.#i.setBackgroundImage(Ye)}}customElements.define("personal-web-desktop",Ke);
