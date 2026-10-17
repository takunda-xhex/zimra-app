"use client";
import {useState} from "react";
// Synthetic civil-service payroll records: [name, dept, nationalId, bankAcct, status, lastBiometric, monthsSinceBio, salaryUSD]
const E=[
  ["Tendai Moyo","Education","63-112233A47","ACC-558231","Active",1,620],
  ["Farai Chikwava","Health","63-445566B12","ACC-558231","Active",14,540],
  ["Memory Dube","Education","63-112233A47","ACC-991022","Active",2,610],
  ["Blessing Ncube","Public Works","63-778899C03","ACC-220114","Retired 2024",22,480],
  ["Tatenda Moyo","Education","63-998877D55","ACC-330987","Active",1,620],
  ["Rutendo Chaka","Health","63-224466E21","ACC-776655"," Deceased 2025",19,540],
  ["Nyasha Gwenzi","Public Works","63-556677F09","ACC-220114","Active",1,480],
  ["Kudzai Shumba","Education","63-334455G88","ACC-118822","Active",3,610],
  ["Tapiwa Marufu","Health","63-667788H16","ACC-442211","Active",1,540],
  ["Simba Madziva","Public Works","63-889900J44","ACC-330987","Active",15,480],
];
function calc(e){
  const dupId=E.filter(x=>x[2]===e[2]).length>1;
  const dupAcct=E.filter(x=>x[3]===e[3]).length>1;
  const terminated=/Retired|Deceased/.test(e[4]);
  const noBio=e[6]>=6;
  let s=0; const p=[];
  if(dupId){s+=35;p.push(["Duplicate national ID",35]);}
  if(dupAcct){s+=25;p.push(["Shared bank account",25]);}
  if(terminated){s+=40;p.push(["Salary still active after termination",40]);}
  if(noBio){s+=20;p.push(["No biometric check-in for "+e[6]+" months",20]);}
  s=Math.min(100,s);
  return{s,p,l:s>=60?"H":s>=30?"M":"L",terminated,dupId,dupAcct,noBio};
}
const N={H:"High",M:"Medium",L:"Low"};
function Bar({label,pct,max,text,color}){
  return <div style={{display:"flex",alignItems:"center",gap:8,margin:"7px 0",fontFamily:"system-ui",fontSize:".85rem"}}>
    <span style={{flex:"0 0 170px",color:"var(--mut)"}}>{label}</span>
    <div style={{flex:1}}><div style={{height:18,width:Math.max(2,pct/max*100)+"%",background:color||"var(--acc)",borderRadius:3}}></div></div>
    <b style={{flex:"0 0 40px",textAlign:"right"}}>{text}</b>
  </div>;
}
export default function Payroll(){
  const [sel,setSel]=useState(null);
  const rows=E.map((e,i)=>({e,i,c:calc(e)})).sort((a,b)=>b.c.s-a.c.s);
  const flagged=rows.filter(x=>x.c.s>=30);
  const monthlyAtRisk=flagged.reduce((a,x)=>a+x.e[7],0);
  const o=sel!==null?rows.find(x=>x.i===sel):null;
  return <main>
    <p className="s" style={{margin:"0 0 4px"}}><a href="/" style={{color:"var(--acc)"}}>Revenue Intelligence</a> · <b style={{color:"var(--ink)"}}>Payroll Integrity</b></p>
    <h1>Payroll Integrity</h1>
    <p className="s">Prototype AI module: cross-checks civil-service payroll against national ID, bank account and biometric attendance records to flag likely ghost-worker patterns. Second module of the same platform as the Revenue Intelligence tool.</p>

    <h2>Why this matters <span className="tag real">Published precedent</span></h2>
    <p className="s">Nigeria's Biometric Verification Number payroll audit uncovered tens of thousands of fake or duplicate federal workers. Kenya and Zambia ran similar payroll audits with major recurring savings. No equivalent public system is known to exist yet in Zimbabwe.</p>

    <h2>Risk engine <span className="tag syn">Synthetic civil servants</span></h2>
    <div className="grid">
      <div className="k"><b style={{color:"var(--bad)"}}>${monthlyAtRisk.toLocaleString()}</b><span>Monthly salary tied to flagged records in this demo sample</span></div>
      <div className="k"><b>{flagged.length} of {E.length}</b><span>Records flagged for review</span></div>
    </div>
    <p className="s" style={{marginTop:10}}>Select a record to see why it was flagged.</p>
    <div className="wrap"><table><thead><tr><th>Name</th><th>Dept</th><th>Status</th><th>Monthly salary</th><th>Score</th></tr></thead><tbody>
      {rows.map(x=><tr key={x.i} className={"r"+(sel===x.i?" sel":"")} onClick={()=>setSel(x.i)}>
        <td>{x.e[0]}</td><td>{x.e[1]}</td><td>{x.e[4]}</td><td>${x.e[7].toLocaleString()}</td><td className={"sc "+x.c.l}>{x.c.s} {N[x.c.l]}</td></tr>)}
    </tbody></table></div>

    <div className="case">{o?<>
      <b>{o.e[0]}: {N[o.c.l]} risk ({o.c.s}/100)</b>
      <div className="s">Why this score:</div>
      {o.c.p.length?o.c.p.map(p=><Bar key={p[0]} label={p[0]} pct={p[1]} max={40} text={"+"+p[1]} color="var(--bad)"/>):<div className="s">No risk signals found.</div>}
      {o.c.dupId&&<div className="s">National ID {o.e[2]} appears on more than one record, a classic duplicate-identity pattern.</div>}
      {o.c.dupAcct&&<div className="s">Bank account {o.e[3]} receives more than one salary, consistent with a mule account collecting multiple pays.</div>}
      {o.c.terminated&&<div className="s">Status shows {o.e[4].trim()}, but salary records remain active.</div>}
      <p className="s" style={{marginTop:10}}>This is a lead for HR and payroll verification, not proof of fraud. An officer should confirm identity in person before any action.</p>
    </>:<span className="s">Select a record above.</span>}</div>

    <h2>Data protection <span className="tag real">Pilot design principles</span></h2>
    <div className="k s" style={{margin:0}}>All records on this page are synthetic. A real pilot would require Public Service Commission approval, an anonymised or access-controlled data sample, officer logins, and an audit log of every lookup. National ID numbers would never be displayed in full in a production system; this demo shows masked-style examples only.</div>

    <footer>Precedent sources: public reporting on Nigeria's BVN payroll verification exercise, and Kenya and Zambia payroll audit programmes. Employee records on this page are entirely synthetic and do not represent real people.</footer>
  </main>}
