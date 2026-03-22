import React from "react";
import { TRIAL_PLANS, HEALTH } from "./subsData";
import { SIX } from "./subsHelpers";

export default function SubTrials(){
  const fn=[{l:"Installed",c:120,co:"#90CAF9"},{l:"Trial Started",c:48,co:"#42A5F5"},{l:"Trial Active",c:12,co:"#1E88E5"},{l:"Converted",c:6,co:"#1565C0"}];
  return(<div>
    <div className="pg-hd"><div className="pg-title">{SIX.Fu()} Trial Tracking</div></div>
    <div className="metrics" style={{gridTemplateColumns:"repeat(5,1fr)"}}>
      {[{v:"40%",l:"Install-to-Trial",d:"Target: >50%"},{v:"10%",l:"Trial-to-Paid",d:"Target: >15%"},{v:"12.3d",l:"Avg Duration",d:"of 14d trial"},{v:"72%",l:"Expiration Rate",d:"Target: <65%"},{v:"56.2%",l:"1st-Hour Survival",d:"Target: >70%"}].map(m=>(<div key={m.l} className="mc"><div className="mc-v">{m.v}</div><div className="mc-l">{m.l}</div><div style={{fontSize:10,color:"var(--t3)",marginTop:3}}>{m.d}</div></div>))}
    </div>
    <div className="card"><h3>Trial Funnel (90 Days)</h3>
      {fn.map((s,i)=>(<div key={s.l} style={{marginBottom:6}}><div style={{display:"flex",alignItems:"center"}}><div style={{height:40,width:`${Math.max(8,(s.c/120)*100)}%`,borderRadius:"var(--r)",display:"flex",alignItems:"center",padding:"0 12px",color:"#fff",fontWeight:600,fontSize:13,background:s.co}}>{s.c}</div><span style={{fontSize:11,color:"var(--t2)",marginLeft:10}}>{s.l}{i>0?` — ${Math.round((s.c/fn[i-1].c)*100)}%`:""}</span></div></div>))}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
      <div className="card" style={{padding:0}}><div style={{padding:"14px 16px",borderBottom:"1px solid var(--bd)"}}><h3 style={{margin:0}}>Trial by Plan</h3></div>
        <table className="table" style={{border:"none"}}><thead><tr><th>Plan</th><th>Started</th><th>Conv</th><th>Rate</th><th>Days</th></tr></thead>
          <tbody>{TRIAL_PLANS.map(t=>(<tr key={t.plan} style={{cursor:"default"}}><td style={{fontWeight:600}}>{t.plan}</td><td>{t.started}</td><td style={{fontWeight:600}}>{t.converted}</td><td style={{fontWeight:700,color:parseFloat(t.rate)>=15?"#43A047":parseFloat(t.rate)>=8?"#FF9800":t.rate==="—"?"var(--t3)":"#E53935"}}>{t.rate}</td><td style={{fontFamily:"var(--m)"}}>{t.days||"—"}</td></tr>))}</tbody></table></div>
      <div className="card"><h3>Health Indicators</h3>
        {HEALTH.map(h=>(<div key={h.name} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid var(--bd)"}}><div style={{width:10,height:10,borderRadius:"50%",flexShrink:0,background:h.status==="green"?"#43A047":h.status==="yellow"?"#FFC107":"#E53935"}}/><div style={{fontSize:13,fontWeight:500,flex:1}}>{h.name}</div><div style={{fontSize:13,fontWeight:700,width:50,textAlign:"right"}}>{h.val}</div><div style={{fontSize:10,color:"var(--t3)",width:100,textAlign:"right"}}>G:{h.green} R:{h.red}</div></div>))}
      </div></div>
  </div>);
}
