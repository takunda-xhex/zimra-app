"use client";

import { useState } from "react";

const modules = [
  { n:"01", title:"Audit Action Management", tag:"Flagship workflow", desc:"Follow an audit finding from recommendation and management response through evidence submission, independent validation and closure.", href:"/audit-actions", status:"Interactive demo", detail:"Try switching the demonstration role to Management action owner, then Independent reviewer. The role switch is not real authentication." },
  { n:"02", title:"Operational Assurance Workbench", tag:"Control-to-outcome", desc:"Explore how operational signals become owned exceptions, evidence tasks and verified outcomes.", href:"/assurance", status:"Interactive demo", detail:"Uses synthetic operational examples and browser-only state." },
  { n:"03", title:"Revenue Intelligence", tag:"Decision support", desc:"Review illustrative revenue-risk signals, explainable rule scoring, case triage and CSV export.", href:"/", status:"Interactive demo", detail:"No live taxpayer data or government integrations." },
  { n:"04", title:"Reconciliation Lab", tag:"CSV analysis", desc:"Try the browser-based reconciliation workflow with a sample file and inspect the exception report.", href:"/reconciliation", status:"Browser-only tool", detail:"Use synthetic or authorised, minimised sample data only." },
  { n:"05", title:"Payroll Integrity", tag:"Separate module", desc:"Inspect the synthetic payroll integrity demonstration and its review concepts.", href:"/payroll", status:"Interactive demo", detail:"Not connected to employer or government payroll systems." },
];

export default function ReviewHub() {
  const [expanded, setExpanded] = useState("01");
  return (
    <main className="review-shell">
      <style jsx global>{`
        .review-shell{min-height:100vh;background:#f3f6f8;color:#172b40;font-family:Arial,sans-serif;padding:26px}
        .review-wrap{max-width:1180px;margin:auto}
        .review-top{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:25px}
        .review-brand{display:flex;align-items:center;gap:11px;color:inherit;text-decoration:none}
        .review-mark{width:42px;height:42px;border-radius:12px;background:#10283f;color:#fff;display:grid;place-items:center;font-weight:800;font-size:21px}
        .review-brand b,.review-brand small{display:block}.review-brand b{font-size:12px;letter-spacing:1.2px}.review-brand small{font-size:9px;color:#8090a0;margin-top:4px;letter-spacing:1px}
        .review-links{display:flex;gap:8px;flex-wrap:wrap}.review-links a{border:1px solid #dce5eb;border-radius:8px;padding:9px 12px;background:white;color:#31475d;text-decoration:none;font-size:11px}
        .review-hero{background:linear-gradient(120deg,#10283f,#174b55);color:#fff;border-radius:17px;padding:34px;margin-bottom:17px;display:grid;grid-template-columns:1fr auto;gap:20px;align-items:center}
        .review-kicker{font-size:9px;letter-spacing:1.8px;color:#85e0bd;font-weight:800}.review-hero h1{font-size:34px;line-height:1.13;margin:12px 0}.review-hero p{font-size:13px;line-height:1.7;color:#cfdae2;max-width:720px;margin:0}
        .review-status{border:1px solid #55717b;background:#ffffff0c;border-radius:12px;padding:17px;min-width:185px}.review-status b{display:block;font-size:12px}.review-status span{display:block;color:#9be4c8;font-size:10px;margin-top:8px}
        .review-warning{display:flex;gap:12px;align-items:flex-start;padding:14px 16px;border:1px solid #efdcb9;background:#fff6e8;border-radius:10px;color:#805b20;font-size:11px;line-height:1.6;margin-bottom:23px}.review-warning strong{white-space:nowrap}
        .review-section-head{display:flex;justify-content:space-between;align-items:end;gap:12px;margin:24px 0 13px}.review-section-head h2{font-size:18px;margin:0}.review-section-head p{font-size:11px;color:#778799;margin:5px 0 0}
        .review-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
        .review-card{background:#fff;border:1px solid #e1e8ed;border-radius:12px;padding:17px;box-shadow:0 5px 18px #132b3b08}
        .review-card-top{display:flex;justify-content:space-between;align-items:center;gap:10px}.review-num{font-size:10px;font-weight:800;color:#08765e;letter-spacing:1px}.review-pill{font-size:9px;background:#edf6f2;color:#08765e;border-radius:20px;padding:5px 8px;font-weight:700}
        .review-card h3{font-size:16px;margin:11px 0 7px}.review-card p{font-size:11px;line-height:1.65;color:#697b8e;margin:0}.review-detail{margin-top:11px;padding:10px;background:#f6f9fa;border-radius:8px;font-size:10px;line-height:1.6;color:#52677a}
        .review-card-actions{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:14px}.review-card-actions button,.review-card-actions a{border:1px solid #dce5eb;background:white;color:#30485e;border-radius:7px;padding:8px 11px;text-decoration:none;font-size:10px;cursor:pointer}.review-card-actions a{background:#08765e;color:#fff;border-color:#08765e}
        .review-status-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:12px}.review-status-card{background:#fff;border:1px solid #e1e8ed;border-radius:10px;padding:15px}.review-status-card b{font-size:11px;display:block}.review-status-card span{font-size:10px;line-height:1.6;color:#778799;display:block;margin-top:6px}
        .review-footer{font-size:9px;color:#8997a5;display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;margin:25px 2px 4px}
        @media(max-width:700px){.review-shell{padding:13px}.review-top{align-items:flex-start;flex-direction:column}.review-hero{grid-template-columns:1fr;padding:23px}.review-hero h1{font-size:27px}.review-status{min-width:0}.review-grid,.review-status-grid{grid-template-columns:1fr}.review-warning{display:block}.review-warning strong{display:block;margin-bottom:4px}}
      `}</style>
      <div className="review-wrap">
        <header className="review-top">
          <a href="/" className="review-brand"><span className="review-mark">Z</span><span><b>OPERATIONAL ASSURANCE</b><small>INDEPENDENT TECHNOLOGY CONCEPT</small></span></a>
          <nav className="review-links"><a href="/">Platform overview</a><a href="/audit-actions">Audit Action Management ↗</a><a href="/login">Sign in ↗</a></nav>
        </header>
        <section className="review-hero">
          <div><div className="review-kicker">PRIVATE PRODUCT REVIEW · ZIMBABWE-FIRST</div><h1>Review the working experience.</h1><p>A guided entry point to the current ZIMRA operational technology concept. Open each module, try the available workflows and review what is implemented versus what still needs institutional approval and engineering.</p></div>
          <div className="review-status"><b>Review environment</b><span>● Available for exploration</span><small style={{color:"#c4d1d9",display:"block",marginTop:8,fontSize:9}}>Synthetic demonstration data only</small></div>
        </section>
        <div className="review-warning"><strong>Important boundary</strong><span>This is an independent concept prototype, not an official ZIMRA product and not endorsed or operated by ZIMRA. The modules below use synthetic examples. A dedicated Supabase project and preview-only connection foundation are now configured. Sign-in is available for invited accounts, but the Audit Action screen still uses synthetic browser-only records and is not yet connected to persistent database records. Do not enter real taxpayer, employee, customs or confidential institutional information.</span></div>
        <div className="review-section-head"><div><h2>Explore the application</h2><p>Choose a module to open its interactive demonstration.</p></div></div>
        <div className="review-grid">
          {modules.map(m=><article className="review-card" key={m.n}>
            <div className="review-card-top"><span className="review-num">MODULE {m.n}</span><span className="review-pill">{m.status}</span></div>
            <h3>{m.title}</h3><p>{m.desc}</p>
            {expanded===m.n&&<div className="review-detail">{m.detail}</div>}
            <div className="review-card-actions"><button onClick={()=>setExpanded(expanded===m.n?"":m.n)}>{expanded===m.n?"Hide review note":"What to review"}</button><a href={m.href}>Open module ↗</a></div>
          </article>)}
        </div>
        <div className="review-section-head"><div><h2>New database foundation</h2><p>What has been prepared for the next secure build stage.</p></div></div>
        <div className="review-status-grid">
          <div className="review-status-card"><b>Separate project created</b><span>Dedicated Supabase project. ZimDeals remains separate and untouched.</span></div>
          <div className="review-status-card"><b>Database structure installed</b><span>Profiles, findings, action plans, evidence metadata and audit events, with initial row-level security policies.</span></div>
          <div className="review-status-card"><b>Connection foundation configured</b><span>Supabase SSR clients, session refresh and invitation-only sign-in page are in the review branch. Database-backed records, server-side role enforcement, account provisioning and evidence upload testing remain to be completed.</span></div>
        </div>
        <footer className="review-footer"><span>Independent concept prototype · Not an official government system</span><span>Hybrid integration · Guarded AI · Human accountability</span></footer>
      </div>
    </main>
  );
}
