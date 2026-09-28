"use client";
import {useState} from "react";
const D=[["Zambezi Traders","Wholesale",184000,121000,0,1,0,1],["Kariba Fuel Supplies","Fuel",96000,90500,1,0,0,0],["Mbare Auto Spares","Retail",72000,71200,0,0,0,1],["Highveld Steel & Co","Manufacturing",240000,150000,1,1,1,0],["Save Valley Foods","Food",58000,55800,0,0,0,0],["Bulawayo Tech Imports","Electronics",133000,88000,1,1,0,1],["Gweru Building Supplies","Construction",64000,61000,0,0,0,0],["Eastern Cross Logistics","Transport",110000,84000,1,0,1,0]];
const HEADS=[["VAT",28],["PAYE",17],["Corporate income tax",14],["Excise duty",9],["Customs duty",7],["IMTT",6]];
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
  const [sel,setSel]=useState(null),[txt,setTxt]=useState(""),[busy,setBusy]=useState(false),[err,setErr]=useState("");
  const [w,setW]=useState(W0),[st,setSt]=useState({}),[msg,setMsg]=useState("");
  const rows=D.map((r,i)=>({r,i,c:calc(r,w)})).sort((a,b)=>b.c.s-a.c.s);
  const flagged=rows.filter(x=>x.c.s>=30);
  const atRisk=flagged.reduce((a,x)=>a+x.r[2]-x.r[3],0);
  const o=sel!==null?rows.find(x=>x.i===sel):null;
  const status=x=>st[x.i]||(x.c.s>=30?"Flagged":"Monitor");
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
  const chip=(active)=>({padding:"6px 10px",fontSize:".8rem",background:active?"var(--acc)":"transparent",color:active?"var(--bg)":"var(--ink)",border:"1px solid var(--line)"});
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

    <p className="s" style={{marginTop:14}}><button style={{background:"transparent",color:"var(--ink)",border:"1px solid var(--line)",padding:"6px 10px",fontSize:".8rem"}} onClick={()=>{setW(W0);setSt({});setMsg("")}}>Reset model and cases</button></p>
    <footer>Sources: NewsDay (30 Jun 2026); Zimbabwe Situation, 2026 Mid-term Budget Review (30 Jul 2026); M&amp;J Consultants and RegisterCompany.co.zw (2026 VAT rate of 15.5%). Taxpayer records are synthetic. Flags are leads for review, not proof of wrongdoing.</footer>
  </main>}
