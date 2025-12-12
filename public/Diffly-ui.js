
export function mountDiffly(root, env){
  function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));}
  function tokenize(s){return s.trim().split(/\s+/).filter(Boolean);}
  function fingerprint(a,b){
    const A=tokenize(a), B=tokenize(b);
    const max=Math.max(A.length,B.length,1);
    return Array.from({length:max},(_,i)=>A[i]===B[i]?0:(A[i]&&B[i]?1:2));
  }
  function draw(segs){
    const cv=root.querySelector("#cv"),ctx=cv.getContext("2d");
    const w=cv.clientWidth,h=cv.clientHeight;
    cv.width=Math.floor(w*devicePixelRatio);cv.height=Math.floor(h*devicePixelRatio);
    ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
    ctx.clearRect(0,0,w,h);
    const pad=12,bh=18,bw=(w-pad*2)/segs.length;
    segs.forEach((v,i)=>{
      ctx.fillStyle=v===0?"#22c55e":v===1?"#eab308":"#f43f5e";
      ctx.fillRect(pad+i*bw,h/2-bh/2,Math.max(1,bw-1),bh);
    });
  }
  function render(){
    root.innerHTML=\`
      <div class="wrap">
        <header class="top"><div class="logo">DIFFLY</div><div class="sub">\${env.isMini?"Mini App":"Web"} • semantic fingerprint</div></header>
        <div class="cols"><textarea id="a" placeholder="Paste A…"></textarea><textarea id="b" placeholder="Paste B…"></textarea></div>
        <canvas id="cv"></canvas><div class="hint">Green=same · Yellow=changed · Red=added/removed</div>
      </div>\`;
    const a=root.querySelector("#a"),b=root.querySelector("#b"),cv=root.querySelector("#cv");
    cv.style.width="100%";cv.style.height="120px";
    const upd=()=>draw(fingerprint(a.value,b.value));
    a.addEventListener("input",upd);b.addEventListener("input",upd);upd();
  }
  render();
}
