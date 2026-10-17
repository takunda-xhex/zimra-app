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
