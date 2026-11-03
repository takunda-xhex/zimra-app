"use client";
import { useMemo, useRef, useState } from "react";

const sample = [
  ["Mavambo Wholesale","2026-09",184000,121000,118500],
  ["Nyika Energy","2026-09",96000,90500,90500],
  ["Matobo Auto Traders","2026-09",72000,71200,69000],
  ["Great Dyke Manufacturing","2026-09",240000,150000,149000],
  ["Save Valley Foods","2026-09",58000,55800,55800],
];
const template = "business,period,fiscal_sales,declared_sales,payments_received\n" + sample.map(r=>r.join(",")).join("\n");
function parseCSV(text){
  const rows=[];let row=[],cell="",quoted=false;
  for(let i=0;i<text.length;i++){
    const c=text[i],n=text[i+1];
    if(c==='"'&&quoted&&n==='"'){cell+='"';i++;}
    else if(c==='"') quoted=!quoted;
    else if(c===","&&!quoted){row.push(cell.trim());cell="";}
    else if((c==="\n"||c==="\r")&&!quoted){if(c==="\r"&&n==="\n")i++;row.push(cell.trim());if(row.some(v=>v!==""))rows.push(row);row=[];cell="";}
    else cell+=c;
  }
  if(cell.length||row.length){row.push(cell.trim());if(row.some(v=>v!==""))rows.push(row);}
  if(rows.length<2) throw new Error("The CSV needs a header row and at least one data row.");
  const headers=rows[0].map(h=>h.toLowerCase().replace(/[\s-]+/g,"_"));
  const find=(...names)=>headers.findIndex(h=>names.includes(h));
  const ix={business:find("business","taxpayer","entity","company"),period:find("period","tax_period","month"),fiscal:find("fiscal_sales","fiscalised_sales","fdms_sales","sales_fiscal"),declared:find("declared_sales","sales_declared","declared_turnover"),payments:find("payments_received","payments","amount_paid")};
  if(["business","period","fiscal","declared"].some(k=>ix[k]<0)) throw new Error("Required columns: business, period, fiscal_sales, declared_sales. payments_received is optional.");
  return rows.slice(1).map((r,i)=>{
    const num=v=>{const x=Number(String(v??"").replace(/[$,\s]/g,""));return Number.isFinite(x)?x:NaN;};
    const fiscal=num(r[ix.fiscal]),declared=num(r[ix.declared]),paid=ix.payments<0||String(r[ix.payments]??"").trim()===""?null:num(r[ix.payments]);
    if(!r[ix.business]||!r[ix.period]||!Number.isFinite(fiscal)||!Number.isFinite(declared)||fiscal<0||declared<0||(paid!==null&&(!Number.isFinite(paid)||paid<0))) throw new Error("Invalid business, period or amount on CSV data row "+(i+2)+". Amounts must be non-negative numbers.");
    return {id:i+1,business:r[ix.business],period:r[ix.period],fiscal,declared,paid};
  });
}
function assess(rows){
  const seen=new Map();
  return rows.map(r=>{
    const key=(r.business+"|"+r.period).toLowerCase();
    const duplicate=seen.has(key);seen.set(key,true);
    const variance=r.fiscal-r.declared;
    const pct=r.fiscal>0?variance/r.fiscal*100:0;
    const paymentGap=r.paid===null?null:r.declared-r.paid;
    const flags=[];
    if(pct>=10)flags.push("Sales variance ≥10%");
    else if(pct>=3)flags.push("Sales variance ≥3%");
    if(paymentGap!==null&&paymentGap>1)flags.push("Declared vs paid difference");
    if(duplicate)flags.push("Duplicate business-period row");
    return {...r,variance,pct,paymentGap,flags,band:flags.length>=2||pct>=10?"Priority":flags.length?"Review":"No flag"};
  });
}
const fmt=n=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(n);
export default function Reconciliation(){
  const [rows,setRows]=useState(sample.map((r,i)=>({id:i+1,business:r[0],period:r[1],fiscal:r[2],declared:r[3],paid:r[4]})));
  const [fileName,setFileName]=useState("Built-in synthetic sample");
  const [error,setError]=useState("");
  const [filter,setFilter]=useState("All");
  const input=useRef(null);
  const results=useMemo(()=>assess(rows),[rows]);
  const visible=results.filter(r=>filter==="All"||r.band===filter);
  const totalVariance=results.reduce((a,r)=>a+Math.max(0,r.variance),0);
  const priority=results.filter(r=>r.band==="Priority").length;
  function resetSample(){
    setRows(sample.map((r,i)=>({id:i+1,business:r[0],period:r[1],fiscal:r[2],declared:r[3],paid:r[4]})));
    setFileName("Built-in synthetic sample");setFilter("All");setError("");
    if(input.current)input.current.value="";
  }
  function clearUploadedFile(){
    resetSample();
  }
  function upload(file){
    if(!file)return;
    setError("");
    if(file.size>2*1024*1024){setError("Maximum CSV size is 2 MB.");return;}
    const reader=new FileReader();
    reader.onload=()=>{try{const parsed=parseCSV(String(reader.result||""));setRows(parsed);setFileName(file.name);setFilter("All");}catch(e){setError(e.message);}};
    reader.onerror=()=>setError("Could not read this file.");
    reader.readAsText(file);
  }
  function exportReport(){
    const header=["Business","Period","Fiscal sales","Declared sales","Variance","Variance %","Payments received","Payment difference","Review band","Signals"];
    const csv=[header,...results.map(r=>[r.business,r.period,r.fiscal,r.declared,r.variance,r.pct.toFixed(2),r.paid??"",r.paymentGap??"",r.band,r.flags.join("; ")])].map(row=>row.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(",")).join("\n");
    const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));const a=document.createElement("a");a.href=url;a.download="reconciliation-review-report.csv";a.click();URL.revokeObjectURL(url);
  }
  function downloadTemplate(){const url=URL.createObjectURL(new Blob([template],{type:"text/csv"}));const a=document.createElement("a");a.href=url;a.download="reconciliation-template.csv";a.click();URL.revokeObjectURL(url);}
  return <main style={{minHeight:"100vh",background:"#f4f7f8",color:"#1c2d40",fontFamily:"Inter,Arial,sans-serif",padding:"28px clamp(16px,4vw,54px)"}}>
    <div style={{maxWidth:1200,margin:"0 auto"}}>
      <a href="/" style={{color:"#08785e",fontSize:13,textDecoration:"none",fontWeight:700}}>← Back to platform</a>
      <div style={{display:"flex",justifyContent:"space-between",gap:20,alignItems:"flex-end",flexWrap:"wrap",marginTop:24}}>
        <div><div style={{fontSize:11,letterSpacing:2,color:"#078264",fontWeight:800}}>REVENUE OPERATIONS · ANALYTICS WORKBENCH</div><h1 style={{fontSize:"clamp(28px,4vw,42px)",margin:"9px 0"}}>Reconciliation Lab</h1><p style={{color:"#66768a",maxWidth:680,lineHeight:1.6}}>Compare fiscalised sales, declared sales and payments. Surface explainable differences for authorised human review.</p></div>
        <span style={{background:"#fff2d9",color:"#8a5a12",padding:"8px 12px",borderRadius:30,fontSize:11,fontWeight:800}}>SYNTHETIC / LOCAL ANALYSIS</span>
      </div>
      <div style={{background:"#fff8e9",border:"1px solid #f0dfbc",borderRadius:10,padding:14,margin:"22px 0",fontSize:13,lineHeight:1.6}}><b>Data handling:</b> Files are processed in this browser session and are not uploaded to a server by this page. Use synthetic or properly authorised, minimised data only. This is a prototype, not a tax assessment or official ZIMRA tool.</div>
      <section style={{background:"white",border:"1px solid #e1e7ec",borderRadius:12,padding:20,display:"flex",justifyContent:"space-between",alignItems:"center",gap:18,flexWrap:"wrap"}}>
        <div><h2 style={{fontSize:17,margin:"0 0 6px"}}>Bring a reconciliation file</h2><p style={{fontSize:12,color:"#758398",margin:0}}>CSV columns: business, period, fiscal_sales, declared_sales, payments_received (optional)</p><p style={{fontSize:11,color:"#8793a2",margin:"7px 0 0"}}>Current file: <b>{fileName}</b></p></div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}><button type="button" onClick={downloadTemplate} style={secondary}>Download CSV template</button><button type="button" onClick={()=>input.current?.click()} style={primary}>Upload CSV ↑</button><button type="button" onClick={clearUploadedFile} style={secondary}>Reset to sample</button><input ref={input} type="file" accept=".csv,text/csv" hidden onChange={e=>upload(e.target.files?.[0])}/></div>
      </section>
      {error&&<p role="alert" style={{color:"#b42332",fontSize:13}}>{error}</p>}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12,margin:"17px 0"}}>
        {[["Rows analysed",results.length],["Priority review leads",priority],["Positive sales variance",fmt(totalVariance)],["Payment differences",results.filter(r=>r.paymentGap!==null&&r.paymentGap>1).length]].map(([k,v])=><div key={k} style={metric}><span style={{fontSize:12,color:"#718096"}}>{k}</span><strong style={{display:"block",fontSize:26,marginTop:8}}>{v}</strong></div>)}
      </div>
      <section style={{background:"white",border:"1px solid #e1e7ec",borderRadius:12,padding:20}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,flexWrap:"wrap",marginBottom:15}}><div><h2 style={{fontSize:17,margin:0}}>Exception review queue</h2><p style={{fontSize:12,color:"#7b8796",margin:"5px 0 0"}}>A variance is a review lead, not proof of undeclared tax or wrongdoing.</p></div><div style={{display:"flex",gap:8}}><select value={filter} onChange={e=>setFilter(e.target.value)} style={secondary}><option>All</option><option>Priority</option><option>Review</option><option>No flag</option></select><button type="button" onClick={exportReport} style={primary}>Export report ↓</button></div></div>
        <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",minWidth:850,textAlign:"left"}}><thead><tr>{["Business / period","Fiscal sales","Declared sales","Variance","Variance %","Paid","Review"].map(h=><th key={h} style={th}>{h}</th>)}</tr></thead><tbody>{visible.map(r=><tr key={r.id}><td style={td}><b>{r.business}</b><small style={{display:"block",color:"#8994a2",marginTop:4}}>{r.period}</small>{r.flags.map(f=><small key={f} style={{display:"block",color:"#986016",marginTop:3}}>• {f}</small>)}</td><td style={td}>{fmt(r.fiscal)}</td><td style={td}>{fmt(r.declared)}</td><td style={td}>{fmt(r.variance)}</td><td style={td}>{r.pct.toFixed(1)}%</td><td style={td}>{r.paid===null?"Not supplied":fmt(r.paid)}</td><td style={td}><span style={{...badge,background:r.band==="Priority"?"#fdebed":r.band==="Review"?"#fff3dc":"#e9f6f0",color:r.band==="Priority"?"#a52d3a":r.band==="Review"?"#8a5a12":"#08785e"}}>{r.band}</span></td></tr>)}</tbody></table></div>
        {visible.length===0&&<p style={{color:"#718096",fontSize:13}}>No rows in this filter.</p>}
      </section>
      <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:12,marginTop:15}}>
        <div style={metric}><b>What this feature does</b><p style={small}>Calculates differences, highlights duplicate business-period entries, checks declared sales against payments and exports a reviewable CSV.</p></div>
        <div style={metric}><b>What it does not do</b><p style={small}>It does not connect to FDMS, TaRMS, banking or government databases, determine tax liability, or initiate enforcement.</p></div>
        <div style={metric}><b>Next institutional step</b><p style={small}>Agree the source data dictionary, reporting-period rules, adjustment handling and thresholds with authorised revenue specialists before a controlled pilot.</p></div>
      </section>
      <footer style={{fontSize:11,color:"#98a2af",padding:"22px 2px"}}>Independent concept prototype · Browser-only CSV analysis · No live government connection</footer>
    </div>
  </main>;
}
const primary={background:"#08785e",color:"white",border:0,borderRadius:7,padding:"11px 15px",fontWeight:700,fontSize:12,cursor:"pointer"};
const secondary={background:"#fff",color:"#33465a",border:"1px solid #dce3e9",borderRadius:7,padding:"10px 12px",fontSize:12,cursor:"pointer"};
const metric={background:"white",border:"1px solid #e1e7ec",borderRadius:10,padding:17};
const th={padding:"12px 10px",fontSize:10,color:"#7c8999",borderBottom:"1px solid #e8edf1",whiteSpace:"nowrap"};
const td={padding:"13px 10px",fontSize:12,borderBottom:"1px solid #edf0f3",whiteSpace:"nowrap"};
const badge={padding:"5px 8px",borderRadius:30,fontSize:10,fontWeight:800};
const small={fontSize:12,lineHeight:1.6,color:"#748195",marginBottom:0};
