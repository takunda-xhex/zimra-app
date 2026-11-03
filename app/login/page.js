"use client";

import { useState } from "react";
import { createClient } from "../../lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function signIn(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;
      window.location.assign("/audit-actions");
    } catch (err) {
      setError(err.message || "Sign in failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main style={{minHeight:"100vh",display:"grid",placeItems:"center",padding:24,background:"#f4f6f8",color:"#152333"}}>
      <section style={{width:"100%",maxWidth:440,background:"#fff",border:"1px solid #dfe5eb",borderRadius:18,padding:32,boxShadow:"0 18px 50px rgba(20,40,60,.08)"}}>
        <a href="/review" style={{color:"#526579",fontSize:13,textDecoration:"none"}}>← Back to review hub</a>
        <p style={{marginTop:28,fontSize:11,letterSpacing:2,fontWeight:700,color:"#60788e"}}>OPERATIONAL ASSURANCE</p>
        <h1 style={{fontSize:30,margin:"8px 0"}}>Sign in</h1>
        <p style={{color:"#5d6c7a",lineHeight:1.6}}>Access is invitation-controlled. New accounts are not created from this page, and every new profile requires approval before it can access protected work.</p>
        <form onSubmit={signIn} style={{display:"grid",gap:14,marginTop:24}}>
          <label style={{display:"grid",gap:6,fontSize:13,fontWeight:600}}>Email address
            <input required type="email" autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)} style={{padding:12,border:"1px solid #cbd5df",borderRadius:9,fontSize:15}} />
          </label>
          <label style={{display:"grid",gap:6,fontSize:13,fontWeight:600}}>Password
            <input required type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} style={{padding:12,border:"1px solid #cbd5df",borderRadius:9,fontSize:15}} />
          </label>
          <button disabled={busy} type="submit" style={{padding:13,border:0,borderRadius:9,background:"#173d59",color:"#fff",fontWeight:700,cursor:"pointer",opacity:busy ? 0.65 : 1}}>{busy?"Signing in…":"Sign in securely"}</button>
        </form>
        {error&&<p role="alert" style={{color:"#a22b2b",fontSize:13,marginTop:16}}>{error}</p>}
        <p style={{fontSize:12,color:"#718090",lineHeight:1.5,marginTop:24}}>Independent concept prototype. Not an official ZIMRA service. Do not submit real institutional or taxpayer information.</p>
      </section>
    </main>
  );
}
