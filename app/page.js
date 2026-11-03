"use client";
import { useMemo, useState } from "react";

const demoCases = [
  { id:"ZM-26041", entity:"Mavambo Wholesale (Demo)", sector:"Wholesale", fdms:184000, declared:121000, customs:false, hs:true, linked:false, rate:true, source:"FDMS + TaRMS", updated:"09:42" },
  { id:"ZM-26038", entity:"Nyika Energy Group (Demo)", sector:"Energy", fdms:96000, declared:90500, customs:true, hs:false, linked:false, rate:false, source:"FDMS + TaRMS", updated:"09:18" },
  { id:"ZM-26035", entity:"Matobo Auto Traders (Demo)", sector:"Retail", fdms:72000, declared:71200, customs:false, hs:false, linked:false, rate:true, source:"FDMS + TaRMS", updated:"Yesterday" },
  { id:"ZM-26029", entity:"Great Dyke Manufacturing (Demo)", sector:"Manufacturing", fdms:240000, declared:150000, customs:true, hs:true, linked:true, rate:false, source:"Synthetic multi-source", updated:"Yesterday" },
  { id:"ZM-26021", entity:"Save Valley Foods (Demo)", sector:"Food", fdms:58000, declared:55800, customs:false, hs:false, linked:false, rate:false, source:"FDMS + TaRMS", updated:"2 days ago" },
  { id:"ZM-26016", entity:"Bulawayo Digital Imports (Demo)", sector:"Electronics", fdms:133000, declared:88000, customs:true, hs:true, linked:false, rate:true, source:"FDMS + ASYCUDA concept", updated:"2 days ago" }
];
const modules = [
  {name:"Revenue intelligence",desc:"Reconciliation, risk triage and explainable case review",state:"Prototype",icon:"◈"},
  {name:"Customs intelligence",desc:"Import valuation, HS-code patterns and border analytics",state:"Concept module",icon:"⌁"},
  {name:"Payroll integrity",desc:"Separately authorised public-sector payroll checks",state:"Demo module",icon:"▦"},
  {name:"Integration gateway",desc:"Controlled connectors to approved source systems",state:"Architecture design",icon:"⇄"}
];
const connectors = [
  {name:"FDMS",full:"Fiscalisation Data Management System",purpose:"Sales and fiscal-device reconciliation",status:"Planned adapter",code:"01"},
  {name:"TaRMS",full:"Tax and Revenue Management System",purpose:"Returns, taxpayer and payment references",status:"Planned adapter",code:"02"},
  {name:"ASYCUDA",full:"Customs declaration environment",purpose:"Import declarations and customs valuation",status:"Planned adapter",code:"03"},
  {name:"Approved data feeds",full:"Institution-owned datasets and APIs",purpose:"Scoped, documented data exchange",status:"Requires agreement",code:"04"}
];
const money = n => "US$" + Math.round(n).toLocaleString("en-US");
function score(c){
  const gap = c.fdms > 0 ? Math.max(0,(c.fdms-c.declared)/c.fdms*100) : 0;
  const signals = [
    ["Reconciliation variance",Math.min(60,gap*1.6)],
    ["Import mismatch",c.customs?20:0],
    ["HS-code indicator",c.hs?15:0],
    ["Related-entity indicator",c.linked?20:0],
    ["Tax-rate check",c.rate?10:0]
  ].filter(x=>x[1]>0);
  const value=Math.min(100,Math.round(signals.reduce((a,x)=>a+x[1],0)));
  return {gap,signals,value,level:value>=60?"High":value>=30?"Medium":"Low"};
}
function Pill({children,tone="neutral"}){return <span className={"pill "+tone}>{children}</span>}
function Metric({label,value,detail,icon}){return <div className="metric"><div className="metric-top"><span>{label}</span><span className="metric-icon">{icon}</span></div><strong>{value}</strong><small>{detail}</small></div>}
export default function Dashboard(){
  const [section,setSection]=useState("Overview");
  const [selected,setSelected]=useState(demoCases[0].id);
  const [filter,setFilter]=useState("All cases");
  const [summary,setSummary]=useState("");
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState("");
  const [notice,setNotice]=useState("");
  const [statuses,setStatuses]=useState({});
  const [query,setQuery]=useState("");
  const [exported,setExported]=useState(false);
  const cases=useMemo(()=>demoCases.map(c=>({...c,...score(c)})),[]);
  const current=cases.find(c=>c.id===selected)||cases[0];
  const filtered=cases.filter(c=>{
    const match=(c.entity+" "+c.id+" "+c.sector).toLowerCase().includes(query.toLowerCase());
    return match && (filter==="All cases" || c.level===filter);
  });
  const flagged=cases.filter(c=>c.level!=="Low");
  const riskExposure=flagged.reduce((n,c)=>n+Math.max(0,c.fdms-c.declared),0);
  function setCaseStatus(id,status){setStatuses(s=>({...s,[id]:status}));setNotice("Demo case status updated locally. It is not saved to a government system.");}
  async function explain(){
    setBusy(true);setError("");setSummary("");
    try{
      const response=await fetch("/api/case",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({
        taxpayer:current.entity,sector:current.sector,fdmsVatUSD:current.fdms,declaredVatUSD:current.declared,
        vatGapPercent:Number(current.gap.toFixed(1)),importMismatch:current.customs,hsCodeIssue:current.hs,
        linkedFirms:current.linked,wrongVatRate:current.rate,riskScore:current.value
      })});
      const data=await response.json();
      if(!response.ok) throw new Error(data.error||"Could not generate explanation.");
      setSummary(data.text);
    }catch(e){setError(e.message||"Something went wrong.");}
    finally{setBusy(false);}
  }
  function exportCases(){
    const rows=[["Case ID","Entity","Sector","FDMS VAT (demo)","Declared VAT (demo)","Variance %","Score","Risk band","Status"]];
    filtered.forEach(c=>rows.push([c.id,c.entity,c.sector,c.fdms,c.declared,c.gap.toFixed(1),c.value,c.level,statuses[c.id]||"Needs review"]));
    const csv=rows.map(row=>row.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(",")).join("\n");
    const blob=new Blob([csv],{type:"text/csv;charset=utf-8"});
    const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="zimra-intelligence-demo-cases.csv";a.click();URL.revokeObjectURL(url);
    setExported(true);
  }
  const nav=[["Overview","⌂"],["Revenue risk","◈"],["Customs","⌁"],["Integrations","⇄"],["Governance","▤"]];
  return <div className="app-shell">
    <aside className="sidebar">
      <a className="brand" href="/"><span className="brand-mark">Z</span><span><b>ZIMRA</b><small>INTELLIGENCE PLATFORM</small></span></a>
      <div className="workspace-label">WORKSPACE</div>
      <div className="workspace"><span className="workspace-dot"/> Zimbabwe · Demonstration <span className="chevron">⌄</span></div>
      <div className="nav-label">PLATFORM</div>
      <nav className="side-nav">{nav.map(([name,icon])=><button key={name} className={section===name?"active":""} onClick={()=>{setSection(name);setNotice("");}}><span>{icon}</span>{name}{name==="Revenue risk"&&<i>{flagged.length}</i>}</button>)}</nav>
      <div className="side-spacer"/>
      <div className="sidebar-card"><div className="shield">✓</div><b>Controlled by design</b><p>Demo data only. No live government systems are connected.</p><Pill tone="warning">Prototype environment</Pill></div>
      <a className="side-link" href="/reconciliation">Reconciliation Lab <span>↗</span></a>
      <a className="side-link" href="/payroll">Payroll integrity module <span>↗</span></a>
      <div className="user-mini"><div className="avatar">ZT</div><span><b>Project team</b><small>Prototype workspace</small></span><span className="dots">•••</span></div>
    </aside>
    <main className="main-area">
      <header className="topbar"><div className="breadcrumbs">Platform <span>/</span> <b>{section}</b></div><div className="top-actions"><Pill tone="warning">DEMO DATA</Pill><span className="top-date">Zimbabwe · UTC+2</span><button className="help-button" onClick={()=>setSection("Governance")}>Documentation ↗</button></div></header>
      <div className="content">
        <div className="hero-row"><div><div className="eyebrow">ZIMBABWE-FIRST · GLOBALLY EXTENSIBLE</div><h1>{section==="Overview"?"Revenue intelligence, with accountability.":section}</h1><p className="intro">{section==="Overview"?"A decision-support layer designed to connect approved data sources, surface explainable signals and keep authorised people in control.":section==="Revenue risk"?"Prioritise reconciliation exceptions with transparent signals and human review.":section==="Customs"?"Explore how customs analytics could help identify valuation and declaration anomalies.":section==="Integrations"?"A governed integration layer for institution-approved systems and data feeds.":"Security, privacy and operational governance are foundational product requirements."}</p></div><div className="hero-actions"><button className="btn-secondary" onClick={()=>setSection("Integrations")}>View architecture</button><button className="btn-primary" onClick={()=>setSection("Revenue risk")}>Open case queue <span>→</span></button></div></div>
        <div className="notice-banner"><span className="notice-icon">i</span><div><b>Independent concept prototype</b><span>Not an official ZIMRA system. All dashboard records and metrics shown here are synthetic demonstrations, not taxpayer records or verified national statistics.</span></div><Pill tone="warning">Synthetic</Pill></div>
        {section==="Overview"&&<>
          <div className="section-heading"><div><h2>Operational snapshot</h2><p>Illustrative metrics from the local demonstration dataset</p></div><span className="updated">● Demo environment active</span></div>
          <div className="metrics-grid"><Metric label="Cases in demo queue" value={cases.length} detail="Synthetic case records" icon="▤"/><Metric label="Require human review" value={flagged.length} detail="Rule-based triage only" icon="◎"/><Metric label="Illustrative variance" value={money(riskExposure)} detail="Not a confirmed tax liability" icon="↗"/><Metric label="Connected source systems" value="0" detail="No live connectors configured" icon="⇄"/></div>
          <div className="dashboard-grid">
            <section className="panel span-two"><div className="panel-heading"><div><h3>Revenue risk overview</h3><p>Risk distribution across synthetic cases</p></div><Pill tone="info">Rule-based demo</Pill></div><div className="risk-visual"><div className="donut"><div><b>{flagged.length}</b><small>review leads</small></div></div><div className="legend"><div><i className="dot high"/>High priority <b>{cases.filter(c=>c.level==="High").length}</b></div><div><i className="dot medium"/>Medium priority <b>{cases.filter(c=>c.level==="Medium").length}</b></div><div><i className="dot low"/>Low priority <b>{cases.filter(c=>c.level==="Low").length}</b></div><p>Priority bands are illustrative thresholds. They require validation with domain experts before any pilot.</p></div></div></section>
            <section className="panel"><div className="panel-heading"><div><h3>Data connectivity</h3><p>Integration readiness</p></div><span className="panel-icon">⇄</span></div>{connectors.slice(0,3).map(c=><div className="connector-row" key={c.code}><span className="connector-code">{c.code}</span><span><b>{c.name}</b><small>{c.purpose}</small></span><Pill tone="neutral">Planned</Pill></div>)}<button className="text-button" onClick={()=>setSection("Integrations")}>Explore integration gateway →</button></section>
            <section className="panel span-two"><div className="panel-heading"><div><h3>Priority review queue</h3><p>Sample records that illustrate explainable case triage</p></div><button className="text-button" onClick={()=>setSection("Revenue risk")}>View all cases →</button></div><div className="table-wrap"><table><thead><tr><th>CASE / ENTITY</th><th>SECTOR</th><th>VARIANCE</th><th>RISK</th><th>STATUS</th></tr></thead><tbody>{cases.slice(0,4).map(c=><tr key={c.id} onClick={()=>{setSelected(c.id);setSection("Revenue risk");}}><td><b>{c.id}</b><small>{c.entity}</small></td><td>{c.sector}</td><td>{c.gap.toFixed(1)}%</td><td><Pill tone={c.level==="High"?"danger":c.level==="Medium"?"warning":"success"}>{c.level}</Pill></td><td>{statuses[c.id]||"Needs review"}</td></tr>)}</tbody></table></div></section>
            <section className="panel"><div className="panel-heading"><div><h3>Platform modules</h3><p>Product roadmap</p></div></div>{modules.map(m=><div className="module-row" key={m.name}><span className="module-icon">{m.icon}</span><span><b>{m.name}</b><small>{m.desc}</small></span></div>)}</section>
          </div>
        </>}
        {section==="Revenue risk"&&<section className="panel queue-panel"><div className="panel-heading"><div><h3>Revenue review queue</h3><p>Transparent, rule-based signals. Every case requires authorised human verification.</p></div><button className="btn-secondary" onClick={exportCases}>Export CSV ↓</button></div><div className="filters"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search case ID, entity or sector..."/><select value={filter} onChange={e=>setFilter(e.target.value)}><option>All cases</option><option>High</option><option>Medium</option><option>Low</option></select></div><div className="table-wrap"><table><thead><tr><th>CASE / ENTITY</th><th>SECTOR</th><th>FDMS / DECLARED</th><th>VARIANCE</th><th>SCORE</th><th>STATUS</th></tr></thead><tbody>{filtered.map(c=><tr className={selected===c.id?"selected-row":""} key={c.id} onClick={()=>{setSelected(c.id);setSummary("");setError("");}}><td><b>{c.id}</b><small>{c.entity}</small></td><td>{c.sector}</td><td>{money(c.fdms)} / {money(c.declared)}</td><td>{c.gap.toFixed(1)}%</td><td><Pill tone={c.level==="High"?"danger":c.level==="Medium"?"warning":"success"}>{c.value} · {c.level}</Pill></td><td>{statuses[c.id]||"Needs review"}</td></tr>)}</tbody></table></div>{filtered.length===0&&<p className="empty">No matching demonstration cases.</p>}<div className="case-detail"><div className="case-title"><div><div className="eyebrow">SELECTED CASE · {current.id}</div><h3>{current.entity}</h3><p>{current.sector} · Source labels: {current.source}</p></div><Pill tone={current.level==="High"?"danger":current.level==="Medium"?"warning":"success"}>{current.level} · {current.value}/100</Pill></div><div className="detail-grid"><div><small>Reconciliation variance</small><b>{current.gap.toFixed(1)}%</b></div><div><small>Illustrative FDMS amount</small><b>{money(current.fdms)}</b></div><div><small>Illustrative declared amount</small><b>{money(current.declared)}</b></div></div><h4>Explainable signals</h4>{current.signals.length?current.signals.map(s=><div className="signal-row" key={s[0]}><span>{s[0]}</span><b>+{Math.round(s[1])} points</b></div>):<p className="muted">No active signals in this demonstration case.</p>}<div className="case-actions"><button className="btn-primary" onClick={explain} disabled={busy}>{busy?"Preparing explanation...":"Generate case explanation"}</button><button className="btn-secondary" onClick={()=>setCaseStatus(current.id,"Assigned")}>Assign for review</button><button className="btn-secondary" onClick={()=>setCaseStatus(current.id,"Cleared in demo")}>Mark cleared in demo</button></div>{error&&<p className="error-text">{error}</p>}{summary&&<pre className="summary-output">{summary}</pre>}{notice&&<p className="muted">{notice}</p>}</div></section>}
        {section==="Customs"&&<div className="dashboard-grid"><section className="panel span-two"><div className="panel-heading"><div><h3>Customs intelligence workspace</h3><p>Illustrative import valuation and declaration review concepts</p></div><Pill tone="warning">Concept module</Pill></div><div className="metrics-grid compact"><Metric label="Sample declarations" value="5" detail="Synthetic examples" icon="▤"/><Metric label="Potential review leads" value="3" detail="Not confirmed anomalies" icon="◎"/><Metric label="Live customs feeds" value="0" detail="No ASYCUDA connection" icon="⇄"/></div><div className="table-wrap"><table><thead><tr><th>HS HEADING</th><th>DEMO COMMODITY</th><th>DECLARED UNIT VALUE</th><th>REFERENCE VALUE</th><th>REVIEW</th></tr></thead><tbody>{[["8703","Passenger vehicles","$2,800","$7,400","Review"],["8517","Mobile phones","$45","$140","Review"],["2710","Diesel / litre","$0.62","$0.98","Review"],["5407","Woven fabric","$0.90","$1.10","Compare"],["1006","Rice / kg","$0.48","$0.50","No flag"]].map(r=><tr key={r[0]}>{r.map((v,i)=><td key={i}>{v}</td>)}</tr>)}</tbody></table></div><p className="footnote">All unit values are invented solely to demonstrate the workflow. Real valuation requires lawful access to verified transaction data, tariff rules, currency, origin, freight, insurance and comparable goods.</p></section><section className="panel"><h3>Future workflow</h3><ol className="steps"><li>Receive approved declaration feed</li><li>Normalise HS code and currency</li><li>Compare against verified reference data</li><li>Explain variance and source provenance</li><li>Route to authorised customs officer</li></ol></section></div>}
        {section==="Integrations"&&<div className="dashboard-grid"><section className="panel span-two"><div className="panel-heading"><div><h3>Integration gateway</h3><p>Connect to existing systems through approved, auditable interfaces.</p></div><Pill tone="warning">Architecture stage</Pill></div><div className="integration-list">{connectors.map(c=><div className="integration-card" key={c.code}><span className="connector-code large">{c.code}</span><div className="integration-info"><h3>{c.name}</h3><b>{c.full}</b><p>{c.purpose}</p></div><Pill tone="neutral">{c.status}</Pill></div>)}</div><div className="callout"><b>Important: no live integrations are configured.</b><p>Each connector requires written authorisation from the relevant system owner, approved interface documentation, a data-sharing agreement, security review, and a controlled test environment. Do not enter production credentials into this prototype.</p></div></section><section className="panel"><h3>Proposed connection pattern</h3><div className="architecture"><div className="arch-box">Institution-owned systems</div><span>↓ Approved API / secure file exchange</span><div className="arch-box accent">ZIMRA integration gateway</div><span>↓ Validation · minimisation · audit</span><div className="arch-box">Analytics and case services</div><span>↓ Role-based access</span><div className="arch-box accent">Authorised human review</div></div></section></div>}
        {section==="Governance"&&<div className="dashboard-grid"><section className="panel span-two"><div className="panel-heading"><div><h3>Trust, security and governance</h3><p>Controls required before any real-data pilot or commercial deployment.</p></div><Pill tone="danger">Not production-ready</Pill></div><div className="governance-grid">{[["Data ownership","Written authority and accountable data owner for every source"],["Privacy impact","Purpose limitation, lawful basis, minimisation and retention controls"],["Identity & access","MFA, least privilege, role separation and secure session management"],["Auditability","Tamper-evident logs for access, exports, changes and decisions"],["Model governance","Validation, false-positive analysis, versioning and human oversight"],["Operational resilience","Backups, incident response, recovery testing and security monitoring"],["Procurement readiness","Scope, service levels, support model, pricing and exit arrangements"],["Independent assurance","Penetration testing, code review and documented remediation"]].map(([a,b],i)=><div className="governance-item" key={a}><span>0{i+1}</span><div><b>{a}</b><p>{b}</p></div></div>)}</div><div className="callout"><b>Institutional engagement is not product approval.</b><p>Each relevant institution and data owner must separately approve access, use cases and any operational pilot. Obtain qualified Zimbabwean legal advice before processing personal or confidential government data.</p></div></section><section className="panel"><h3>Readiness gates</h3>{[["Synthetic demonstration","Available"],["Validated requirements","In progress"],["Approved data access","Not started"],["Security assessment","Not started"],["Controlled pilot","Not authorised"],["Production operation","Not authorised"]].map(([a,b])=><div className="gate-row" key={a}><span>{a}</span><Pill tone={b==="Available"?"success":b==="In progress"?"warning":"neutral"}>{b}</Pill></div>)}</section></div>}
        <footer className="app-footer"><span>© {new Date().getFullYear()} ZIMRA Intelligence concept · Independent prototype</span><span>Human-led decisions · Explainable signals · Governed data</span></footer>
      </div>
    </main>
  </div>;
}
