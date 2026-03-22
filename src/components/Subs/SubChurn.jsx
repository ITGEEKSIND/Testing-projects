import React from "react";
import { CHURN_TENURE, CHURN_PLAN, CHURNED_LIST } from "./subsData";
import { SIX } from "./subsHelpers";

export default function SubChurn(){
  const mx=Math.max(...CHURN_TENURE.map(b=>b.churned||1));
  return(<div>
    <div className="pg-hd"><div className="pg-title">{SIX.Dn(18)} Subscription Churn</div></div>
    <div className="metrics" style={{gridTemplateColumns:"repeat(3,1fr)"}}>
      <div className="mc"><div className="mc-v">5.3%</div><div className="mc-l">Current Month Churn</div><div className="mc-d dn">{SIX.Up()} +1.0pp vs last</div></div>
      <div className="mc"><div className="mc-v">3 / 1</div><div className="mc-l">Voluntary / Involuntary</div><div style={{fontSize:10,color:"var(--t3)",marginTop:3}}>75% voluntary</div></div>
      <div className="mc"><div className="mc-v">4</div><div className="mc-l">Cancelled (Mar)</div><div className="mc-d up">{SIX.Dn()} -1 vs Feb</div></div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
      <div className="card" style={{padding:0}}><div style={{padding:"14px 16px",borderBottom:"1px solid var(--bd)"}}><h3 style={{margin:0}}>Churn by Plan</h3></div>
        <table className="table" style={{border:"none"}}><thead><tr><th>Plan</th><th>Active</th><th>Churned</th><th>Rate</th><th>Tenure</th></tr></thead>
          <tbody>{CHURN_PLAN.map(p=>(<tr key={p.plan} style={{cursor:"default"}}><td style={{fontWeight:600}}>{p.plan}</td><td>{p.active}</td><td style={{fontWeight:600,color:p.churned>0?"#E53935":"var(--t3)"}}>{p.churned}</td><td style={{fontWeight:700,color:parseFloat(p.rate)>5?"#E53935":parseFloat(p.rate)>0?"#FF9800":"#43A047"}}>{p.rate}</td><td style={{color:"var(--t2)"}}>{p.tenure}</td></tr>))}</tbody></table></div>
      <div className="card"><h3>Churn by Tenure</h3>
        {CHURN_TENURE.map(b=>(<div key={b.bucket} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><span style={{width:80,fontSize:11,fontWeight:600,flexShrink:0}}>{b.bucket}</span><div style={{flex:1,height:8,background:"var(--bd)",borderRadius:4,overflow:"hidden"}}><div style={{width:`${(b.churned/mx)*100}%`,height:"100%",background:b.color,borderRadius:4}}/></div><span style={{fontFamily:"var(--m)",fontSize:11,width:40,textAlign:"right",fontWeight:700,color:b.color}}>{b.rate}</span><span style={{fontSize:10,color:"var(--t3)",width:90,textAlign:"right"}}>{b.insight}</span></div>))}
      </div></div>
    <div className="card" style={{padding:0}}><div style={{padding:"14px 16px",borderBottom:"1px solid var(--bd)"}}><h3 style={{margin:0}}>Churned Merchants</h3></div>
      <table className="table" style={{border:"none"}}><thead><tr><th>Merchant</th><th>Plan</th><th>Tenure</th><th>Type</th><th>Date</th><th>Reason</th></tr></thead>
        <tbody>{CHURNED_LIST.map((m,i)=>(<tr key={i} style={{cursor:"default"}}><td style={{fontWeight:600}}>{m.name}</td><td>{m.plan}</td><td>{m.tenure}</td><td><span className="tag-chip" style={{background:m.type.includes("Involuntary")?"#FFF3E0":"#FDECEA",color:m.type.includes("Involuntary")?"#FF9800":"#E53935",border:"none"}}>{m.type}</span></td><td style={{fontSize:12}}>{m.date}</td><td style={{color:"var(--t2)",fontSize:12}}>{m.reason}</td></tr>))}</tbody></table></div>
  </div>);
}
