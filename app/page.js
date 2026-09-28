"use client";
import {useState} from "react";
const D=[["Zambezi Traders","Wholesale",184000,121000,0,1,0,1],["Kariba Fuel Supplies","Fuel",96000,90500,1,0,0,0],["Mbare Auto Spares","Retail",72000,71200,0,0,0,1],["Highveld Steel & Co","Manufacturing",240000,150000,1,1,1,0],["Save Valley Foods","Food",58000,55800,0,0,0,0],["Bulawayo Tech Imports","Electronics",133000,88000,1,1,0,1],["Gweru Building Supplies","Construction",64000,61000,0,0,0,0],["Eastern Cross Logistics","Transport",110000,84000,1,0,1,0]];
const HEADS=[["VAT",28],["PAYE",17],["Corporate income tax",14],["Excise duty",9],["Customs duty",7],["IMTT",6]];
const BORDERS=[["Beitbridge",412,71,1.9],["Forbes",188,29,0.62],["Chirundu",233,38,0.84],["Plumtree",141,17,0.31],["Victoria Falls",96,9,0.18]];
const ITEMS=[["8703","Used passenger vehicles (each)",2800,7400],["8517","Mobile phones (each)",45,140],["2710","Diesel (per litre)",0.62,0.98],["5407","Woven fabric (per metre)",0.9,1.1],["1006","Rice (per kg)",0.48,0.5]];
const TABS=[["risk","Risk engine"],["border","Border posts"],["value","Import valuation"],["net","Company network"]];
const STAGES=["Flagged","Assigned","Under audit","Recovered"];
const N={H:"High",M:"Medium",L:"Low"};
const COL={H:"var(--bad)",M:"var(--warn)",L:"var(--ok)"};
const W0={gap:1.6,imp:20,hs:15,link:20,rate:10};
function calc(r,w){
  const g=(r[2]-r[3])/r[2]*100;
  const p=[["VAT gap",Math.min(60,g*w.gap)],["Import mismatch",r[4]*w.imp],["HS code issue",r[5]*w.hs],["Linked firms",r[6]*w.link],["Wrong VAT rate",r[7]*w.rate]];
  const s=Math.round(Math.min(100,p.reduce((a,x)=>a+x[1],0)));
  return {g,p,s,l:s>=60?"H":s>=30?"M":"L"};
}
function Bar({label,pct,max,text,color}){
  return <div style={{display:"flex",alignItems:"center",gap:8,margin:"7px 0",fontFamily:"system-ui",fontSize:".85rem"}}>
    <span style={{flex:"0 0 118px",color:"var(--mut)"}}>{label}</span>
    <div style={{flex:1}}><div style={{height:18,width:Math.max(2,pct/max*100)+"%",background:color||"var(--acc)",borderRadius:3}}></div></div>
    <b style={{flex:"0 0 46px",textAlign:"right"}}>{text}</b>
  </div>;
}
export default function Page(){
  const [tab,setTab]=useState("risk");
  const [sel,setSel]=useState(null),[txt,setTxt]=useState(""),[busy,setBusy]=useState(false),[err,setErr]=useState("");
  const [w,setW]=useState(W0),[st,setSt]=useState({}),[msg,setMsg]=useState("");
  const rows=D.map((r,i)=>({r,i,c:calc(r,w)})).sort((a,b)=>b.c.s-a.c.s);
  const flagged=rows.filter(x=>x.c.s>=30);
  const atRisk=flagged.reduce((a,x)=>a+x.r[2]-x.r[3],0);
  const o=sel!==null?rows.find(x=>x.i===sel):null;
  const status=x=>st[x.i]||(x.c.s>=30?"Flagged":"Monitor");
  const bDecl=BORDERS.reduce((a,b)=>a+b[1],0),bFlag=BORDERS.reduce((a,b)=>a+b[2],0),bUsd=BORDERS.reduce((a,b)=>a+b[3],0);
  async function ask(o){
    setBusy(true);setErr("");setTxt("");
    try{
      const res=await fetch("/api/case",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({taxpayer:o.r[0],sector:o.r[1],fdmsVatUSD:o.r[2],declaredVatUSD:o.r[3],vatGapPercent:+o.c.g.toFixed(1),importMismatch:!!o.r[4],hsCodeIssue:!!o.r[5],linkedFirms:!!o.r[6],wrongVatRate:!!o.r[7],riskScore:o.c.s})});
      const d=await res.json();
      if(!res.ok)throw new Error(d.error);
      setTxt(d.text);
    }catch(e){setErr(e.message)}
    setBusy(false);
  }
  function feedback(o,yes){
    const f=yes?1.08:0.92,r=o.r;
    setW(p=>({gap:p.gap*f,imp:r[4]?p.imp*f:p.imp,hs:r[5]?p.hs*f:p.hs,link:r[6]?p.link*f:p.link,rate:r[7]?p.rate*f:p.rate}));
    setSt(s=>({...s,[o.i]:yes?"Under audit":"Cleared"}));
    setMsg(yes?"Officer confirmed the risk. Scoring weights for the signals on this case were raised 8%.":"Officer cleared the case. Scoring weights for the signals on this case were lowered 8%.");
  }
  function exportCsv(){
    const lines=["Taxpayer,Sector,FDMS VAT,Declared VAT,Gap %,Score,Risk,Status"].concat(flagged.map(x=>['"'+x.r[0]+'"',x.r[1],x.r[2],x.r[3],x.c.g.toFixed(1),x.c.s,N[x.c.l],status(x)].join(",")));
    const b=new Blob([lines.join("\n")],{type:"text/csv"});
    const u=URL.createObjectURL(b),a=document.createElement("a");
    a.href=u;a.download="flagged-cases-synthetic.csv";a.click();URL.revokeObjectURL(u);
  }
  const chip=(active)=>({padding:"6px 10px",fontSize:".8rem",background:active?"var(--acc)":"transparent",color:active?"var(--bg)":"var(--ink)",border:"1px solid var(--line)"});
  const money=n=>"$"+n.toLocaleString(undefined,{maximumFractionDigits:2});
  return <main>
    <h1>ZIMRA Revenue Intelligence</h1>
    <p className="s">Prototype AI risk layer across fiscal-device sales (FDMS), VAT returns (TaRMS) and customs data (ASYCUDA).</p>

    <h2>National picture <span className="tag real">Published figures</span></h2>
    <div className="grid">
      <div className="k"><b>US$9.2bn</b><span>2026 collection target</span></div>
      <div className="k"><b>US$4.34bn</b><span>Net collections Jan to May 2026 (+47%)</span></div>
      <div className="k"><b>US$7.65bn</b><span>2025 collections (US$4.56bn in 2021)</span></div>
      <div className="k"><b>16% to 22%</b><span>Tax revenue as share of GDP: 2026 course vs 2030 ambition</span></div>
    </div>

    <h2>Where revenue comes from <span className="tag real">Published figures</span></h2>
    <p className="s">Share of total revenue by tax head, 2026 Mid-term Budget Review. VAT is the largest head, so VAT fraud matters most.</p>
    <div className="k">{HEADS.map(h=><Bar key={h[0]} label={h[0]} pct={h[1]} max={30} text={h[1]+"%"}/>)}</div>

    <div style={{display:"flex",gap:6,flexWrap:"wrap",margin:"26px 0 4px"}}>{TABS.map(t=><button key={t[0]} style={chip(tab===t[0])} onClick={()=>setTab(t[0])}>{t[1]}</button>)}</div>

    {tab==="risk"&&<section>
      <h2>Risk engine <span className="tag syn">Synthetic taxpayers</span></h2>
      <div className="grid">
        <div className="k"><b style={{color:"var(--bad)"}}>${atRisk.toLocaleString()}</b><span>Unreconciled VAT in this demo sample</span></div>
        <div className="k"><b>{flagged.length} of {D.length}</b><span>Taxpayers flagged for review</span></div>
      </div>
      <p className="s" style={{marginTop:10}}>Select a taxpayer to see why it was flagged, generate a case summary, and give officer feedback.</p>
      <div className="wrap"><table><thead><tr><th>Taxpayer</th><th>Sector</th><th>FDMS VAT</th><th>Declared</th><th>Gap</th><th>Score</th><th>Status</th></tr></thead><tbody>
        {rows.map(x=><tr key={x.i} className={"r"+(sel===x.i?" sel":"")} onClick={()=>{setSel(x.i);setTxt("");setErr("");setMsg("")}}>
          <td>{x.r[0]}</td><td>{x.r[1]}</td><td>${x.r[2].toLocaleString()}</td><td>${x.r[3].toLocaleString()}</td><td>{x.c.g.toFixed(1)}%</td><td className={"sc "+x.c.l}>{x.c.s} {N[x.c.l]}</td><td>{status(x)}</td></tr>)}
      </tbody></table></div>
      <div className="case">{o?<>
        <b>{o.r[0]}: {N[o.c.l]} risk ({o.c.s}/100)</b>
        <div className="s">Why this score (points from each signal):</div>
        {o.c.p.map(p=><Bar key={p[0]} label={p[0]} pct={p[1]} max={100} text={"+"+Math.round(p[1])} color={COL[o.c.l]}/>)}
        {o.r[7]?<div className="s">VAT rate check: some receipts appear calculated at the old 15% instead of the 2026 rate of 15.5%.</div>:null}
        <div style={{display:"flex",gap:8,flexWrap:"wrap",margin:"12px 0"}}>
          <button disabled={busy} onClick={()=>ask(o)}>{busy?"Generating...":"Generate AI case summary"}</button>
          <button onClick={()=>feedback(o,true)}>Confirm risk</button>
          <button onClick={()=>feedback(o,false)}>Clear case</button>
        </div>
        <div className="s" style={{marginBottom:6}}>Case status:</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{STAGES.map(s=><button key={s} style={chip(status(o)===s)} onClick={()=>setSt({...st,[o.i]:s})}>{s}</button>)}</div>
        {msg&&<p className="s" style={{marginTop:10}}>{msg} Demo only: the model resets when the page reloads.</p>}
        {err&&<p className="out H">{err}</p>}{txt&&<div className="out">{txt}</div>}</>:<span className="s">Select a taxpayer above.</span>}</div>
      <p className="s" style={{marginTop:14,display:"flex",gap:8,flexWrap:"wrap"}}>
        <button style={chip(false)} onClick={exportCsv}>Export flagged cases (CSV)</button>
        <button style={chip(false)} onClick={()=>{setW(W0);setSt({});setMsg("")}}>Reset model and cases</button>
      </p>
    </section>}

    {tab==="border"&&<section>
      <h2>Border post risk <span className="tag syn">Synthetic declarations</span></h2>
      <p className="s">Customs declarations flagged at each post, and the estimated duty and VAT under-declared. Numbers are illustrative.</p>
      <div className="grid">
        <div className="k"><b>{bDecl.toLocaleString()}</b><span>Declarations screened</span></div>
        <div className="k"><b>{bFlag}</b><span>Flagged for review</span></div>
        <div className="k"><b style={{color:"var(--bad)"}}>US${bUsd.toFixed(2)}m</b><span>Estimated under-declared</span></div>
      </div>
      <div className="k" style={{marginTop:10}}>
        <div className="s" style={{margin:0}}>Share of declarations flagged</div>
        {BORDERS.map(b=><Bar key={b[0]} label={b[0]} pct={b[2]/b[1]*100} max={20} text={Math.round(b[2]/b[1]*100)+"%"} color="var(--warn)"/>)}
      </div>
      <div className="wrap" style={{marginTop:10}}><table><thead><tr><th>Post</th><th>Declarations</th><th>Flagged</th><th>Under-declared (US$m)</th></tr></thead><tbody>
        {BORDERS.map(b=><tr key={b[0]}><td>{b[0]}</td><td>{b[1]}</td><td>{b[2]}</td><td>{b[3].toFixed(2)}</td></tr>)}
      </tbody></table></div>
    </section>}

    {tab==="value"&&<section>
      <h2>Import valuation check <span className="tag syn">Illustrative benchmarks</span></h2>
      <p className="s">Compares declared unit values with a benchmark for the same goods. A declared value far below the benchmark can mean under-valuation to cut duty. A live system would use ZIMRA valuation data and full 8-digit HS codes.</p>
      <div className="wrap"><table><thead><tr><th>HS heading</th><th>Goods</th><th>Declared</th><th>Benchmark</th><th>Gap</th><th>Flag</th></tr></thead><tbody>
        {ITEMS.map(it=>{const g=(it[3]-it[2])/it[3]*100,l=g>=30?"H":g>=15?"M":"L";return <tr key={it[0]}>
          <td>{it[0]}</td><td>{it[1]}</td><td>{money(it[2])}</td><td>{money(it[3])}</td><td>{g.toFixed(0)}%</td><td className={"sc "+l}>{l==="L"?"OK":N[l]}</td></tr>})}
      </tbody></table></div>
    </section>}

    {tab==="net"&&<section>
      <h2>Company network <span className="tag syn">Synthetic</span></h2>
      <p className="s">Firms linked by shared directors or addresses. Two flagged firms share a director, and a third firm registered later shares that director and an address, a pattern officers look for in fake-invoice rings.</p>
      <div className="k">
        <svg viewBox="0 0 460 230" width="100%" role="img" aria-label="Network of three firms linked by a shared director and a shared address">
          <g stroke="var(--mut)" strokeWidth="1.5">
            <line x1="90" y1="50" x2="230" y2="115"/><line x1="370" y1="50" x2="230" y2="115"/><line x1="230" y1="195" x2="230" y2="115"/>
            <line x1="90" y1="50" x2="90" y2="190"/><line x1="230" y1="195" x2="90" y2="190"/>
          </g>
          <g fill="var(--bad)"><circle cx="90" cy="50" r="10"/><circle cx="370" cy="50" r="10"/></g>
          <circle cx="230" cy="195" r="10" fill="var(--warn)"/>
          <g fill="var(--acc)"><circle cx="230" cy="115" r="8"/><circle cx="90" cy="190" r="8"/></g>
          <g fill="var(--ink)" fontSize="11" fontFamily="system-ui" textAnchor="middle">
            <text x="90" y="30">{"Highveld Steel & Co"}</text>
            <text x="370" y="30">Eastern Cross Logistics</text>
            <text x="230" y="222">Msasa Holdings (new)</text>
            <text x="230" y="100">Shared director</text>
            <text x="90" y="212">Shared address</text>
          </g>
        </svg>
        <div className="s" style={{margin:"6px 0 0"}}>Red: flagged firm. Amber: new linked firm. Green: shared director or address.</div>
      </div>
    </section>}

    <h2>Data protection <span className="tag real">Pilot design principles</span></h2>
    <div className="k s" style={{margin:0}}>
      Demo uses synthetic data only. For a pilot the design is: officer logins with roles, a log of who viewed which case, data kept inside ZIMRA-approved systems, and every flag shown with its reasons so an officer decides. Flags are leads for review, not proof of wrongdoing.
    </div>

    <footer>Sources: NewsDay (30 Jun 2026); Zimbabwe Situation, 2026 Mid-term Budget Review (30 Jul 2026); M&amp;J Consultants and RegisterCompany.co.zw (2026 VAT rate of 15.5%). Taxpayer, border and valuation figures are synthetic.</footer>
  </main>} 
