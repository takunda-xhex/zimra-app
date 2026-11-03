"use client";

import { useMemo, useState } from "react";

const demoItems = [
  {id:"OPS-1042",title:"Payment-to-ledger reconciliation break",area:"Revenue operations",unit:"Domestic Taxes",priority:"High",age:19,owner:"Revenue Operations Team",control:"Daily payment reconciliation",source:"Synthetic settlement and ledger events",impact:"A payment may remain unmatched until reviewed",status:"Open",evidence:["Settlement batch reference","Ledger posting timestamp","Exception reason code"],next:"Compare settlement reference and posting window. Escalate only if the mismatch persists beyond the approved tolerance window."},
  {id:"OPS-1038",title:"Customs release evidence sequence incomplete",area:"Border operations",unit:"Customs & Excise",priority:"High",age:11,owner:"Border Process Supervisor",control:"Release authorisation completeness",source:"Synthetic declaration and release events",impact:"Release workflow may be delayed or lack a complete evidence chain",status:"In review",evidence:["Declaration event","Inspection outcome reference","Release authorisation event"],next:"Confirm event ordering and whether an authorised exception path was used. Missing telemetry is not proof of misconduct."},
  {id:"OPS-1031",title:"Refund control evidence awaiting second check",area:"Financial controls",unit:"Revenue Assurance",priority:"Medium",age:8,owner:"Independent Control Reviewer",control:"Maker-checker approval evidence",source:"Synthetic workflow audit events",impact:"A control step is not yet evidenced as complete",status:"Awaiting evidence",evidence:["Initiator event","Supporting document checklist","Independent reviewer event"],next:"Request missing review evidence from the control owner. Do not approve or reject the refund."},
  {id:"OPS-1027",title:"Repeated data-feed retry pattern",area:"Data operations",unit:"ICT / Data",priority:"Medium",age:5,owner:"Integration Operations",control:"Connector delivery and replay protection",source:"Synthetic connector telemetry",impact:"Delayed analytics and possible duplicate processing if replay controls fail",status:"Assigned",evidence:["Connector run IDs","Retry timestamps","Idempotency-key result"],next:"Check connector health, replay protection and dead-letter queue; reconcile source and destination counts."},
  {id:"OPS-1019",title:"Audit action closure evidence not attached",area:"Internal assurance",unit:"Internal Audit",priority:"High",age:27,owner:"Action Owner: Operations",control:"Audit recommendation follow-up",source:"Synthetic audit action register",impact:"Management cannot independently verify that agreed remediation is complete",status:"Overdue",evidence:["Approved action plan","Implementation artefact","Independent closure validation"],next:"Obtain implementation evidence and independent validation. Keep the finding open until closure criteria are met."},
  {id:"OPS-1011",title:"Service turnaround approaching target",area:"Service delivery",unit:"Client Operations",priority:"Low",age:2,owner:"Service Centre Lead",control:"Service charter turnaround monitoring",source:"Synthetic case timestamps",impact:"Potential service delay if the current queue is not rebalanced",status:"Monitoring",evidence:["Received timestamp","Current queue stage","Assigned workgroup"],next:"Review queue age and rebalance capacity where appropriate. Do not change statutory priority rules."}
];
const controls = [
  ["Maker-checker evidence","Two-person control is evidenced for configured high-risk steps.","Design example"],
  ["Event lineage","Each exception links back to source event IDs and timestamps.","Demonstration"],
  ["Overdue action follow-up","Open actions are surfaced by age and agreed due date.","Demonstration"],
  ["Cross-system replay protection","Connector retries are checked for duplicate event handling.","Design example"]
];
function Badge({children,tone="neutral"}){return <span className={"ops-badge "+tone}>{children}</span>}

export default function AssuranceWorkbench(){
  const [selected,setSelected]=useState(demoItems[0].id);
  const [filter,setFilter]=useState("All work");
  const [search,setSearch]=useState("");
  const [statuses,setStatuses]=useState({});
  const [notice,setNotice]=useState("");
  const [tab,setTab]=useState("Work queue");
  const rows=useMemo(()=>demoItems.map(x=>({...x,status:statuses[x.id]||x.status})),[statuses]);
  const visible=rows.filter(x=>(filter==="All work"||x.priority===filter||x.status===filter)&&[x.id,x.title,x.unit,x.area].join(" ").toLowerCase().includes(search.toLowerCase()));
  const current=rows.find(x=>x.id===selected)||rows[0];
  const open=rows.filter(x=>!["Verified in demo","Closed in demo"].includes(x.status));
  function updateStatus(id,status){setStatuses(s=>({...s,[id]:status}));setNotice("Local demonstration state only. No institutional record has been changed.");}
  function exportQueue(){
    const data=[["Reference","Work item","Area","Unit","Priority","Age days","Owner","Control","Status"],...visible.map(x=>[x.id,x.title,x.area,x.unit,x.priority,x.age,x.owner,x.control,x.status])];
    const csv=data.map(row=>row.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(",")).join("\n");
    const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));
    const a=document.createElement("a");a.href=url;a.download="operational-assurance-demo.csv";a.click();URL.revokeObjectURL(url);
    setNotice("Synthetic work queue exported.");
  }
  return <main className="ops-shell"><div className="ops-wrap">
    <header className="ops-top"><div className="ops-brand"><div className="ops-mark">A</div><div><strong>OPERATIONAL ASSURANCE WORKBENCH</strong><small>INDEPENDENT CONCEPT · ZIMBABWE FIRST</small></div></div><div className="ops-links"><a href="/">← Main platform</a><a href="/reconciliation">Reconciliation Lab ↗</a></div></header>
    <section className="ops-hero"><div><div className="ops-kicker">INTERNAL OPERATIONS · CONTROL EVIDENCE · EXCEPTION RESOLUTION</div><h1>Turn operational signals into verified outcomes.</h1><p>A proposed internal workbench connecting exceptions, control requirements, accountable owners, supporting evidence and independent closure checks. It complements existing systems rather than becoming another system of record.</p></div><aside><b>{open.length}</b><small>open work items in this synthetic dataset</small></aside></section>
    <div className="ops-demo"><b>DEMONSTRATION DATA ONLY.</b> Every work item, owner, age and event shown here is invented. This is not a view into ZIMRA operations, staff, taxpayers or internal audit findings. No institutional systems are connected; status changes remain in this browser session.</div>
    <section className="ops-metrics">
      <div><span>Illustrative work items</span><b>{rows.length}</b><small>Synthetic workflow records</small></div>
      <div><span>High-priority examples</span><b>{rows.filter(x=>x.priority==="High").length}</b><small>Not a real risk rating</small></div>
      <div><span>Overdue examples</span><b>{rows.filter(x=>x.status==="Overdue").length}</b><small>Age is illustrative, not SLA breach</small></div>
      <div><span>Verified closures</span><b>{rows.filter(x=>x.status==="Verified in demo").length}</b><small>Local demonstration actions only</small></div>
    </section>
    <nav className="ops-tabs">{["Work queue","Control coverage"].map(t=><button key={t} className={tab===t?"active":""} onClick={()=>setTab(t)}>{t}</button>)}</nav>
    {tab==="Work queue"?<div className="ops-grid">
      <section className="ops-panel"><h2>Exception-to-outcome queue</h2><p className="ops-sub">One work item links the signal, the control that should have operated, the accountable owner and the evidence required to close it.</p>
        <div className="ops-controls"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search reference, work item or unit"/><select value={filter} onChange={e=>setFilter(e.target.value)}><option>All work</option><option>High</option><option>Medium</option><option>Low</option><option>Overdue</option><option>Open</option><option>In review</option></select><button onClick={exportQueue}>Export CSV</button></div>
        <div className="ops-table-wrap"><table className="ops-table"><thead><tr><th>REFERENCE / WORK ITEM</th><th>UNIT</th><th>PRIORITY</th><th>AGE</th><th>STATUS</th></tr></thead><tbody>{visible.map(x=><tr key={x.id} className={selected===x.id?"selected":""} onClick={()=>setSelected(x.id)}><td><b>{x.id}</b><small>{x.title}</small></td><td>{x.unit}</td><td><Badge tone={x.priority==="High"?"red":x.priority==="Medium"?"amber":"green"}>{x.priority}</Badge></td><td>{x.age}d</td><td><Badge tone={x.status==="Overdue"?"red":x.status==="Verified in demo"?"green":"neutral"}>{x.status}</Badge></td></tr>)}</tbody></table></div>{visible.length===0&&<p className="ops-sub">No matching synthetic work items.</p>}
      </section>
      <aside className="ops-panel ops-detail"><div className="ops-detail-head"><div><Badge>{current.id}</Badge><h2>{current.title}</h2></div><Badge tone={current.priority==="High"?"red":current.priority==="Medium"?"amber":"green"}>{current.priority}</Badge></div>
        <div className="ops-meta"><div><small>Accountable owner (demo)</small><b>{current.owner}</b></div><div><small>Workflow area</small><b>{current.area}</b></div><div><small>Control to evidence</small><b>{current.control}</b></div><div><small>Source event family</small><b>{current.source}</b></div></div>
        <h3>Evidence checklist</h3><ul className="ops-evidence">{current.evidence.map(x=><li key={x}>{x}</li>)}</ul>
        <div className="ops-next"><b>Suggested next verification step</b><br/>{current.next}</div>
        <div className="ops-actions"><button className="primary" onClick={()=>updateStatus(current.id,"Verified in demo")}>Mark evidence verified</button><button onClick={()=>updateStatus(current.id,"Assigned")}>Assign / retain ownership</button><button onClick={()=>updateStatus(current.id,"Open")}>Reopen in demo</button></div>{notice&&<p className="ops-sub ops-notice">{notice}</p>}
      </aside>
    </div>:<section className="ops-panel"><h2>Control coverage map</h2><p className="ops-sub">Illustrative control catalogue. A real deployment would map approved control objectives to actual system events, workflow stages and evidence owners.</p><div className="ops-controls-grid">{controls.map(c=><div key={c[0]}><Badge tone="amber">{c[2]}</Badge><b>{c[0]}</b><p>{c[1]}</p></div>)}</div><div className="ops-callout"><b>The differentiator: a control graph, not another dashboard.</b><p>Each control connects to the event that should trigger it, the evidence that proves it operated, the person responsible for resolving exceptions and the independent check that confirms closure. Missing evidence becomes a review task, not an accusation.</p></div></section>}
    <footer className="ops-footer"><span>Independent concept prototype · Synthetic data only · No live integrations</span><span>Hybrid architecture · Guarded automation · Human accountability</span></footer>
  </div></main>;
}