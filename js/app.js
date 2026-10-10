// ── font map ──
const FM = {
  kalam:    "'Kalam', cursive",
  caveat:   "'Caveat', cursive",
  shadows:  "'Shadows Into Light', cursive",
  patrick:  "'Patrick Hand', cursive",
  indie:    "'Indie Flower', cursive",
  dancing:  "'Dancing Script', cursive",
  nothing:  "'Nothing You Could Do', cursive",
  rock:     "'Rock Salt', cursive",
  architect:"'Architects Daughter', cursive",
  personal: "'AhmedHandwriting', cursive"
};

// ── label updates ──
const wbL=['None','Subtle','Low','Medium'];
const cvL=['None','Low','Medium','High'];
const tyL=['None','Low','Medium','High'];
const slL={'-5':'Strong','-4':'Medium','-3':'Slight','-2':'Subtle','-1':'Minimal','0':'None'};
const soL=['Hairline','Soft','Medium','Bold'];
const shL=['None','Light','Medium','Heavy'];
const fiL=['','Light','Medium','Strong','Blinding'];

const irL=['None','Low','Medium','High'];
document.getElementById('mp').oninput  = e=>document.getElementById('mpv').textContent=(e.target.value>0?'+':'')+e.target.value+'px';
document.getElementById('iw').oninput  = e=>document.getElementById('iwv').textContent=e.target.value+'%';
document.getElementById('iv').oninput  = e=>document.getElementById('ivv').textContent=irL[e.target.value];
document.getElementById('ld').oninput  = e=>document.getElementById('ldv').textContent=irL[e.target.value];
document.getElementById('ls').oninput  = e=>document.getElementById('lsv').textContent=e.target.value+'px · '+Math.floor(PAGE_USABLE/e.target.value)+' lines/page';
document.getElementById('lo').oninput  = e=>document.getElementById('lov').textContent=(e.target.value>0?'+':'')+e.target.value+'px';
document.getElementById('fz').oninput  = e=>document.getElementById('szv').textContent=e.target.value+'px';
document.getElementById('wb').oninput  = e=>document.getElementById('wbv').textContent=wbL[e.target.value];
document.getElementById('cv').oninput  = e=>document.getElementById('cvv').textContent=cvL[e.target.value];
document.getElementById('ty').oninput  = e=>document.getElementById('tyv').textContent=tyL[e.target.value];
document.getElementById('sl2').oninput = e=>document.getElementById('slv').textContent=slL[e.target.value]||'None';
document.getElementById('fso').oninput = e=>document.getElementById('fsv').textContent=soL[e.target.value];
document.getElementById('sh2').oninput = e=>document.getElementById('shv').textContent=shL[e.target.value];
document.getElementById('fi').oninput  = e=>document.getElementById('fiv').textContent=fiL[e.target.value];
document.getElementById('fcp').oninput = e=>document.getElementById('fcv').textContent=e.target.value+'%';
document.getElementById('fch').oninput = e=>document.getElementById('fchv').textContent=e.target.value+'%';

// ── mode ──
let mode='single';
function setMode(m){
  mode=m;
  document.getElementById('sm').style.display=m==='single'?'':'none';
  document.getElementById('mm').style.display=m==='multi'?'':'none';
  document.getElementById('ts').classList.toggle('on',m==='single');
  document.getElementById('tm').classList.toggle('on',m==='multi');
}

// ── Q&A editor ──
let qc=0;
function addQ(){
  qc++;
  const id='q'+qc;
  const d=document.createElement('div');
  d.className='qb'; d.id='qb-'+id;
  d.innerHTML=`<div class="qn">Question ${qc}</div>
    <button class="qd" onclick="rmQ('qb-${id}')">✕</button>
    <input type="text" id="qh-${id}" placeholder="Q${qc}) Heading / question text">
    <textarea id="qc-${id}" spellcheck="false" placeholder="Paste C++ code here..."></textarea>`;
  document.getElementById('ql').appendChild(d);
}
function rmQ(id){ const e=document.getElementById(id); if(e)e.remove(); }
addQ(); addQ();

// ── typo ──
const AK={a:'sq',b:'vg',c:'xv',d:'sf',e:'wr',f:'dg',g:'fh',h:'gj',i:'uo',j:'hk',k:'jl',l:'k',m:'n',n:'bm',o:'ip',p:'o',q:'wa',r:'et',s:'ad',t:'ry',u:'yi',v:'cb',w:'qe',x:'zc',y:'ut',z:'x','1':'2','2':'13','3':'24','4':'35','5':'46','6':'57','7':'68','8':'79','9':'80','0':'9',';':':','=':'+'};
function typo(ch,freq){
  if(!freq)return ch;
  const r=[0,.01,.025,.055][freq];
  if(Math.random()>r)return ch;
  const lo=ch.toLowerCase();
  if(AK[lo]){const o=AK[lo];return o[Math.floor(Math.random()*o.length)]+ch;}
  return ch+ch;
}

// ── hex→rgb ──
function h2r(h){return[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];}

// ── per-char style (REALISTIC — subtle wobble, stays near baseline) ──
function cStyle(wobble, charVar, slant, baseColor, baselineNudge){
  baselineNudge = baselineNudge || 0;
  const wb=parseInt(wobble), cv=parseInt(charVar);
  const sl=parseInt(slant);

  // Baseline wobble: VERY subtle Y offset only — 0.5 to 1.5px max
  const tyOff = wb===0 ? 0 : (Math.random()-.5)*2*[0,.8,1.5,2.5][wb];
  // Size variation: very small — 0.97 to 1.03
  const sc = cv===0 ? 1 : 1+(Math.random()-.5)*2*[0,.018,.035,.06][cv];
  // Rotation: very small — like real pen tilt
  const rot = sl + (Math.random()-.5)*2*[0,.8,1.5,2.8][cv];
  // X offset per char for natural spacing irregularity
  const txOff = cv===0 ? 0 : (Math.random()-.5)*2*[0,.3,.6,1][cv];

  // ink color variation — subtle
  const [r,g,b]=h2r(baseColor);
  const v=(Math.random()-.5)*22;
  const cr=Math.max(0,Math.min(255,r+v));
  const cg=Math.max(0,Math.min(255,g+v));
  const cb=Math.max(0,Math.min(255,b+v));
  // Ink opacity variation — simulates pressure
  const op=0.82+Math.random()*.18;

  const totalY = (tyOff + baselineNudge).toFixed(1);
  return {
    s:`transform:rotate(${rot.toFixed(1)}deg) scale(${sc.toFixed(3)}) translate(${txOff.toFixed(1)}px,${totalY}px);display:inline-block;`,
    c:`rgba(${Math.round(cr)},${Math.round(cg)},${Math.round(cb)},${op.toFixed(2)})`
  };
}

// ── page geometry (matches .pg in style.css: 1123px tall, 56px top/bottom padding) ──
const PAGE_TOP    = 56;
const PAGE_USABLE = 1011;   // 1123 - 56 - 56

// Measure where the text baseline sits inside a line box for a given font, so the
// ruled lines can be placed right under the handwriting no matter which font is used.
function measureBaseline(fontCss, size, lineH){
  const d=document.createElement('div');
  d.style.cssText=`position:absolute;left:-9999px;top:0;visibility:hidden;white-space:pre;font-family:${fontCss};font-size:${size}px;line-height:${lineH}px;`;
  d.innerHTML='Hxgy<span style="display:inline-block;width:0;height:0;vertical-align:baseline"></span>';
  document.body.appendChild(d);
  const b=d.lastChild.offsetTop;
  document.body.removeChild(d);
  return (b>0&&b<lineH*2)?b:Math.round(lineH*0.7);
}

// Width of one space in the given font (used to build uneven indentation)
function measureSpace(fontCss, size){
  const d=document.createElement('div');
  d.style.cssText=`position:absolute;left:-9999px;top:0;visibility:hidden;white-space:pre;font-family:${fontCss};font-size:${size}px;`;
  d.innerHTML='<span>'+'&nbsp;'.repeat(20)+'</span>';
  document.body.appendChild(d);
  const w=d.firstChild.getBoundingClientRect().width/20;
  document.body.removeChild(d);
  return (w>1&&w<size*2)?w:size*0.3;
}

// ── paper bg ──
function paperBg(type, lineCol, margin, lineSp, ruleTop){
  const BG={'ruled-cream':'#fdf8ee','ruled-white':'#fafafa','ruled-blue':'#f0f4ff','ruled-yellow':'#fffde0',grid:'#fefefe',plain:'#ffffff'};
  const bg=BG[type]||'#fdf8ee';
  // NOTE: lines are drawn as real 1px elements (see addLines in buildPage), NOT as CSS
  // gradients, because html2canvas (used for the PDF export) can't render repeating gradients.
  let rules=null;
  if(type!=='plain' && type!=='grid'){
    const S=lineSp;
    const first=((((ruleTop)%S)+S)%S);            // y of the first ruled line (>= 0)
    rules={first,step:S};
  }
  return{bg,bi:'none',grid:type==='grid',rules,margin:!!(margin && type!=='plain' && type!=='grid')};
}

// ── SCAN + FLASH + FOLD canvas ──
function drawFX(canvas, opts, pageIndex){
  const w=canvas.width=canvas.offsetWidth||794;
  const h=canvas.height=canvas.offsetHeight||1123;
  const ctx=canvas.getContext('2d');
  ctx.clearRect(0,0,w,h);

  const {scanStyle,shadow,curl,grain,fold,foldPat,foldSoft,foldCPct,foldCHPct,flash,flashPos,flashInt}=opts;
  const si=parseInt(shadow), fsi=parseInt(flashInt), fsft=parseInt(foldSoft);

  // 1. Grain
  if(grain){
    const id=ctx.createImageData(w,h); const d=id.data;
    for(let i=0;i<d.length;i+=4){const n=(Math.random()-.5)*14;d[i]=d[i+1]=d[i+2]=128+n;d[i+3]=Math.random()*8;}
    ctx.putImageData(id,0,0);
  }

  // 2. Scan tint + vignette
  const SC={none:{t:null,v:0},light:{t:'rgba(255,255,240,.06)',v:.14},camscanner:{t:'rgba(245,238,210,.15)',v:.28},dark:{t:'rgba(30,25,10,.18)',v:.4},warm:{t:'rgba(255,220,140,.12)',v:.24}};
  const sc=SC[scanStyle]||SC.camscanner;
  if(sc.t){ctx.fillStyle=sc.t;ctx.fillRect(0,0,w,h);}
  const vs=sc.v*([0,.35,.65,.95][si]||.65);
  if(vs>0){
    const g=ctx.createRadialGradient(w*.5,h*.4,h*.1,w*.5,h*.4,h*.88);
    g.addColorStop(0,`rgba(255,255,200,${vs*.06})`);
    g.addColorStop(.5,'rgba(0,0,0,0)');
    g.addColorStop(1,`rgba(0,0,0,${vs*.52})`);
    ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
    [[0,0],[w,0],[0,h],[w,h]].forEach(([cx,cy])=>{
      const cg=ctx.createRadialGradient(cx,cy,0,cx,cy,w*.5);
      cg.addColorStop(0,`rgba(0,0,0,${vs*.32})`);cg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=cg;ctx.fillRect(0,0,w,h);
    });
    if(scanStyle!=='none'){
      const le=ctx.createLinearGradient(0,0,w*.06,0);
      le.addColorStop(0,`rgba(0,0,0,${vs*.2})`);le.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=le;ctx.fillRect(0,0,w*.06,h);
      const te=ctx.createLinearGradient(0,0,0,h*.04);
      te.addColorStop(0,`rgba(0,0,0,${vs*.16})`);te.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=te;ctx.fillRect(0,0,w,h*.04);
    }
  }

  // 3. Flash
  if(flash){
    const PM={tl:[w*.2,h*.16],tr2:[w*.8,h*.16],tc:[w*.5,h*.15],c:[w*.5,h*.44]};
    const [fx,fy]=PM[flashPos]||PM.tl;
    const fr=w*(.28+fsi*.11), fstr=[0,.12,.25,.42,.6][fsi];
    const fg=ctx.createRadialGradient(fx,fy,0,fx,fy,fr);
    fg.addColorStop(0,`rgba(255,255,255,${fstr})`);
    fg.addColorStop(.18,`rgba(255,253,240,${fstr*.65})`);
    fg.addColorStop(.45,`rgba(255,248,220,${fstr*.25})`);
    fg.addColorStop(.75,`rgba(255,245,200,${fstr*.07})`);
    fg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=fg;ctx.fillRect(0,0,w,h);
    if(fsi>=2){
      const hs=ctx.createRadialGradient(fx,fy,0,fx,fy,fr*.13);
      hs.addColorStop(0,`rgba(255,255,255,${fstr*.85})`);hs.addColorStop(1,'rgba(255,255,255,0)');
      ctx.fillStyle=hs;ctx.fillRect(0,0,w,h);
    }
    if(fsi>=3){
      const sw=w*.65;
      const sg=ctx.createLinearGradient(fx-sw/2,fy,fx+sw/2,fy);
      sg.addColorStop(0,'rgba(255,255,255,0)');sg.addColorStop(.45,`rgba(255,255,255,${fstr*.22})`);
      sg.addColorStop(.5,`rgba(255,255,255,${fstr*.45})`);sg.addColorStop(.55,`rgba(255,255,255,${fstr*.22})`);
      sg.addColorStop(1,'rgba(255,255,255,0)');
      ctx.fillStyle=sg;ctx.fillRect(0,fy-3,w,6);
    }
  }

  // 4. SMOOTH FOLD CREASES ──────────────────────────────────────────────
  // Alternating bevel: odd pages inward, even pages outward
  if(fold && fsft>0){
    const cpY=h*(parseInt(foldCPct)/100);   // vertical crease pos
    const cpX=w*(parseInt(foldCHPct)/100);  // horizontal crease pos
    // softness controls blur spread and alpha
    const spread=[0,6,14,28][fsft];
    const alpha =[0,.08,.14,.22][fsft];
    const isOdd=(pageIndex%2===0); // page 0 = first page

    function smoothCrease(x1,y1,x2,y2, inward){
      const dx=x2-x1, dy=y2-y1;
      const len=Math.sqrt(dx*dx+dy*dy);
      const nx=-dy/len, ny=dx/len; // normal direction

      // Which side gets shadow vs highlight depends on inward/outward
      const shadowSide  = inward ? 1 : -1;
      const lightSide   = inward ? -1 : 1;

      // Draw as series of gradient strips to simulate GaussBlur
      for(let step=0;step<spread;step++){
        const t=step/spread;
        const a=alpha*(1-t)*(1-t); // quadratic falloff = smooth
        // Shadow on one side
        ctx.save();
        ctx.strokeStyle=`rgba(0,0,0,${a})`;
        ctx.lineWidth=1;
        ctx.beginPath();
        ctx.moveTo(x1+nx*shadowSide*(step+.5), y1+ny*shadowSide*(step+.5));
        ctx.lineTo(x2+nx*shadowSide*(step+.5), y2+ny*shadowSide*(step+.5));
        ctx.stroke();
        // Highlight on other side
        ctx.strokeStyle=`rgba(255,250,240,${a*.6})`;
        ctx.beginPath();
        ctx.moveTo(x1+nx*lightSide*(step+.5), y1+ny*lightSide*(step+.5));
        ctx.lineTo(x2+nx*lightSide*(step+.5), y2+ny*lightSide*(step+.5));
        ctx.stroke();
        ctx.restore();
      }

      // Center crease line — very subtle
      ctx.save();
      ctx.strokeStyle=`rgba(80,70,50,${alpha*.55})`;
      ctx.lineWidth=.6;
      ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
      ctx.restore();

      // Slight tonal shift on one half (paper bends away from light)
      const halfGrad = ctx.createLinearGradient(
        x1+ny*shadowSide*.5, y1+ny*shadowSide*.5,
        x1+ny*shadowSide*(spread+5), y1+ny*shadowSide*(spread+5)
      );
      halfGrad.addColorStop(0,`rgba(0,0,0,${alpha*.35})`);
      halfGrad.addColorStop(1,'rgba(0,0,0,0)');
    }

    if(foldPat==='horizontal' || foldPat==='cross' || foldPat==='thirds'){
      if(foldPat==='thirds'){
        smoothCrease(0,h/3,w,h/3,isOdd);
        smoothCrease(0,h*2/3,w,h*2/3,!isOdd);
      } else if(foldPat==='cross'){
        smoothCrease(0,cpY,w,cpY,isOdd);
        smoothCrease(cpX,0,cpX,h,!isOdd);
        // quad tone shift
        const qg=ctx.createRadialGradient(cpX,cpY,0,cpX,cpY,Math.max(w,h)*.5);
        qg.addColorStop(0,`rgba(0,0,0,${alpha*.1})`);qg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=qg;ctx.fillRect(0,0,w,h);
      } else {
        smoothCrease(0,cpY,w,cpY,isOdd);
        // Tonal shift below crease
        const tg=ctx.createLinearGradient(0,cpY,0,cpY+spread*1.5);
        tg.addColorStop(0,`rgba(0,0,0,${alpha*.4})`);tg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=tg;ctx.fillRect(0,cpY,w,spread*2);
      }
    } else if(foldPat==='diagonal'){
      smoothCrease(w*.02,h*.04,w*.98,h*.96,isOdd);
    }
  }

  // 5. Page curl
  if(curl&&si>0){
    const cg=ctx.createRadialGradient(w,h,0,w,h,w*.26);
    cg.addColorStop(0,`rgba(0,0,0,${si*.1})`);cg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=cg;ctx.fillRect(0,0,w,h);
  }
}

// ── build page ──
function buildPage(blocks, cfg, pageIdx, lpp){
  const font=FM[cfg.font]||FM.kalam;
  // Line spacing comes from the "Line spacing" slider and is used for BOTH the ruled
  // lines and the text, so every text line sits on exactly one ruled line.
  const lineH = cfg.lineSp;

  const wrap=document.createElement('div'); wrap.className='pw';
  const pg=document.createElement('div'); pg.className='pg';
  pg.style.paddingLeft=(104+cfg.marginX)+'px';   // text start moves with the margin slider

  // Auto-align: put each ruled line just under the baseline of the chosen font,
  // then apply the user's "Move lines up / down" offset.
  const baseline = measureBaseline(font, cfg.size, lineH);
  const ruleTop  = PAGE_TOP + baseline + 2 + cfg.lineOff;
  const pb=paperBg(cfg.paper, cfg.lineCol, cfg.margin, lineH, ruleTop);
  pg.style.backgroundColor=pb.bg; pg.style.backgroundImage=pb.bi;
  const PAGE_H=1123;
  function addLines(){
    const box=document.createElement('div');
    box.style.cssText='position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none;z-index:0;overflow:hidden;';
    const mk=(css)=>{const d=document.createElement('div');d.style.cssText='position:absolute;background:'+cfg.lineCol+';'+css;box.appendChild(d);};
    if(pb.rules){
      for(let y=pb.rules.first; y<PAGE_H; y+=pb.rules.step) mk(`left:0;right:0;top:${y}px;height:1px;`);
    }
    if(pb.grid){
      for(let y=31; y<PAGE_H; y+=32) mk(`left:0;right:0;top:${y}px;height:1px;`);
      for(let x=31; x<794;    x+=32) mk(`top:0;bottom:0;left:${x}px;width:1px;`);
    }
    pg.appendChild(box);
  }
  addLines();
  if(pb.margin){
    const mg=document.createElement('div');
    mg.style.cssText=`position:absolute;left:${82+cfg.marginX}px;width:2px;top:0;bottom:0;background:rgba(210,70,70,.5);pointer-events:none;z-index:1;`;
    pg.appendChild(mg);
  }

  // Collect all lines with metadata
  const ALL=[];
  for(const blk of blocks){
    if(blk.h&&blk.h.trim()){ALL.push({t:blk.h.trim(),head:true});ALL.push({t:'',empty:true});}
    blk.c.replace(/\t/g,'    ').split('\n').forEach(l=>ALL.push({t:l,head:false}));
    ALL.push({t:'',empty:true});ALL.push({t:'',empty:true});
  }

  const slice=ALL.slice(pageIdx*lpp,(pageIdx+1)*lpp);

  const cont=document.createElement('div');
  cont.className='hwc';
  cont.style.cssText=`font-family:${font};font-size:${cfg.size}px;line-height:${lineH}px;`;

  // No manual nudge needed any more: the lines are aligned to the font's baseline.
  const nudge = 0;

  // Tokenize by word/symbol instead of char — cuts DOM nodes 5-8x, prevents print freeze
  function tokenize(str){ return str.match(/\s+|[^\s]+/g)||[]; }

  // Imperfect indentation / left edge, like real handwriting
  const sw=measureSpace(font,cfg.size);                 // width of one space
  const dMax=[0,2,4,7][cfg.drift]||0;                   // max line-start drift (px)
  const vAmt=[0,0.08,0.18,0.3][cfg.indentVar]||0;       // indent-level unevenness
  const rnd=()=>Math.random()*2-1;
  let prevD=0;

  let html='';
  for(const row of slice){
    if(row.empty){html+='\n';continue;}
    const hSz=cfg.size*1.1;
    const hStyle=row.head?`font-size:${hSz}px;font-weight:700;display:inline-block;`:'';

    // leading spaces -> one spacer whose width we control; drift shifts the whole line
    const lead=(row.t.match(/^ */)||[''])[0].length;
    const text=row.t.slice(lead);
    prevD=prevD*0.5+rnd()*dMax;
    const drift=Math.round(prevD*10)/10;
    let indentPx=0;
    if(lead>0){
      const full=Math.floor(lead/4), rem=lead%4, unit=sw*cfg.indentW;
      indentPx=rem*unit;
      for(let i=0;i<full;i++) indentPx+=4*unit*(1+rnd()*vAmt);
    }
    if(lead>0||drift!==0)
      html+=`<span style="display:inline-block;width:${indentPx.toFixed(1)}px;margin-left:${drift}px"></span>`;

    if(row.head)html+=`<span style="${hStyle}">`;
    const tokens=tokenize(text);
    for(const tok of tokens){
      if(/^\s+$/.test(tok)){ html+=tok.replace(/ /g,'&nbsp;'); continue; }
      const safe=tok.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      const {s,c}=cStyle(cfg.wobble,cfg.charVar,cfg.slant,cfg.ink,nudge);
      html+=`<span class="ch" style="${s}color:${c};">${safe}</span>`;
    }
    if(row.head)html+='</span>';
    html+='\n';
  }
  cont.innerHTML=html;
  pg.appendChild(cont);

  const pn=document.createElement('div'); pn.className='pn';
  pn.style.cssText=`font-family:${font};color:${cfg.ink};`;
  pn.textContent=pageIdx+1; pg.appendChild(pn);

  const cv=document.createElement('canvas');
  cv.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:10;';
  pg.appendChild(cv); wrap.appendChild(pg);

  const fxOpts={
    scanStyle:cfg.scan, shadow:cfg.shadow, curl:cfg.curl, grain:cfg.grain,
    fold:cfg.fold, foldPat:cfg.foldPat, foldSoft:cfg.foldSoft,
    foldCPct:cfg.foldCPct, foldCHPct:cfg.foldCHPct,
    flash:cfg.flash, flashPos:cfg.flashPos, flashInt:cfg.flashInt
  };
  setTimeout(()=>{
    cv.width=pg.offsetWidth; cv.height=pg.offsetHeight;
    drawFX(cv,fxOpts,pageIdx);
  },55);

  return wrap;
}

// ── PDF EXPORT via html2canvas + jsPDF ──
// Each .pw page div is screenshotted at full resolution and added to a PDF.
// This avoids all browser print re-rendering issues and gaps.
async function safePrint(){
  const pages = document.querySelectorAll('#prev .pw');
  if(!pages.length){ alert('Generate handwriting first!'); return; }

  const btn = document.querySelector('.btn.bs');
  btn.textContent = '⏳ Building PDF…';
  btn.disabled = true;

  try{
    if(document.fonts&&document.fonts.ready) await document.fonts.ready;
    // Load html2canvas if not already loaded
    if(typeof html2canvas === 'undefined'){
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
    }
    // Load jsPDF if not already loaded
    if(typeof window.jspdf === 'undefined'){
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
    }

    const { jsPDF } = window.jspdf;
    // A4 in mm: 210 x 297
    const pdf = new jsPDF({ orientation:'portrait', unit:'mm', format:'a4' });

    for(let i=0; i<pages.length; i++){
      btn.textContent = `⏳ Page ${i+1} / ${pages.length}…`;
      const pg = pages[i];

      const canvas = await html2canvas(pg, {
        scale: 2,            // 2x = crisp on high-DPI
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.92);
      if(i > 0) pdf.addPage();
      // Fill the full A4 page (210mm x 297mm)
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
    }

    pdf.save('handwriting.pdf');
  } catch(err){
    console.error(err);
    alert('PDF generation failed: ' + err.message);
  }

  btn.textContent = '🖨️ Print / Save as PDF';
  btn.disabled = false;
}

function loadScript(src){
  return new Promise((resolve, reject)=>{
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = ()=> reject(new Error('Failed to load: ' + src));
    document.head.appendChild(s);
  });
}


// ── make sure a font is loaded before we lay out text ──
async function ensureFont(key, size){
  if(!document.fonts||!document.fonts.load) return;
  const fam=(FM[key]||FM.kalam).split(',')[0];   // e.g. 'AhmedHandwriting'
  try{
    await document.fonts.load(`${size||19}px ${fam}`, 'AaBbCc123');
    await document.fonts.load(`700 ${size||19}px ${fam}`, 'AaBbCc123');
  }catch(e){ console.warn('Font load failed:', fam, e); }
}

// Warm up the personal font as soon as the page opens
if(document.fonts&&document.fonts.load){ document.fonts.load("19px 'AhmedHandwriting'").catch(()=>{}); }

// ── GENERATE ──
async function gen(){
  const cfg={
    font:   document.getElementById('fs').value,
    ink:    document.getElementById('ic').value,
    size:   parseInt(document.getElementById('fz').value),
    wobble: document.getElementById('wb').value,
    charVar:document.getElementById('cv').value,
    typo:   parseInt(document.getElementById('ty').value),
    slant:  document.getElementById('sl2').value,
    paper:  document.getElementById('pt').value,
    lineCol:document.getElementById('lc2').value,
    margin: document.getElementById('mg').checked,
    fold:   document.getElementById('fl').checked,
    foldPat:document.getElementById('fp').value,
    foldSoft:document.getElementById('fso').value,
    foldCPct:document.getElementById('fcp').value,
    foldCHPct:document.getElementById('fch').value,
    scan:   document.getElementById('ss').value,
    shadow: document.getElementById('sh2').value,
    curl:   document.getElementById('pc').checked,
    grain:  document.getElementById('pg2').checked,
    flash:  document.getElementById('fg').checked,
    flashPos:document.getElementById('fpos').value,
    flashInt:document.getElementById('fi').value,
    lineSp: parseInt(document.getElementById('ls').value),
    lineOff:parseInt(document.getElementById('lo').value),
    marginX:parseInt(document.getElementById('mp').value),
    indentW:parseInt(document.getElementById('iw').value)/100,
    indentVar:parseInt(document.getElementById('iv').value),
    drift:  parseInt(document.getElementById('ld').value)
  };

  let blocks=[];
  if(mode==='single'){
    const h=document.getElementById('sh').value;
    const c=document.getElementById('ci').value;
    if(!c.trim()&&!h.trim()){alert('Add heading or code first!');return;}
    blocks.push({h,c});
  } else {
    document.querySelectorAll('.qb').forEach(qb=>{
      const he=qb.querySelector('input[type=text]');
      const ce=qb.querySelector('textarea');
      if(he&&ce)blocks.push({h:he.value||'',c:ce.value||''});
    });
    if(!blocks.length){alert('Add at least one question!');return;}
  }

  // Count total lines
  let total=0;
  for(const b of blocks){
    if(b.h&&b.h.trim())total+=2;
    total+=b.c.replace(/\t/g,'    ').split('\n').length+2;
  }
  const lpp=Math.floor(PAGE_USABLE/cfg.lineSp);
  const pages=Math.ceil(total/lpp);

  // Make sure the chosen font is actually loaded before drawing (matters for the
  // personal font, which is a real file now instead of inlined base64).
  await ensureFont(cfg.font, cfg.size);

  const prev=document.getElementById('prev');
  prev.innerHTML='';
  for(let p=0;p<pages;p++) prev.appendChild(buildPage(blocks,cfg,p,lpp));
}
