import React from "react";
import { PLANS, MOVEMENTS, EVENTS, TREND } from "./subsData";
import { SIX, subMC, subEC } from "./subsHelpers";

export default function SubOverview(){
  const mx=Math.max(...TREND.map(d=>d.a));
  return(<div>
    <div className="pg-hd"><div className="pg-title">{SIX.CC()} Subscription Overview</div><select className="fsel" defaultValue="12m"><option value="3m">3 mo</option><option value="6m">6 mo</option><option value="12m">12 mo</option></select></div>
    <div className="metrics" style={{gridTemplateColumns:"repeat(6,1fr)"}}>
      {[{v:"75",l:"Active Subs",c:"#43A047",d:"+5 this month",u:1},{v:"12",l:"On Trial",c:"#2196F3",d:"8 Starter, 3 Growth, 1 Pro"},{v:"2",l:"Past Due",c:"#E53935",d:"In dunning"},{v:"3",l:"Frozen",c:"#9E9E9E",d:"Store paused"},{v:"8",l:"New This Month",c:"#4CAF50",d:"+3 vs last",u:1},{v:"3",l:"Cancelled",c:"#FF9800",d:"-2 vs last",u:1}].map(m=>(
        <div key={m.l} className="mc"><div className="mc-v" style={{color:m.c}}>{m.v}</div><div className="mc-l">{m.l}</div>
          {m.u ? <div className="mc-d up">{SIX.Up()} {m.d}</div> : <div style={{fontSize:10,color:"var(--t3)",marginTop:3}}>{m.d}</div>}
        </div>))}
    </div>
    <div className="card"><h3>Subscription Trend</h3>
      <div style={{display:"flex",alignItems:"flex-end",gap:3,height:160}}>
        {TREND.map((d,i)=>(<div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{fontSize:11,fontWeight:700,marginBottom:3}}>{d.a}</div>
          <div style={{width:"100%",display:"flex",flexDirection:"column-reverse",height:(d.a/mx)*130}}>
            <div style={{height:`${(d.st/d.a)*100}%`,background:"#90CAF9",borderRadius:i===0?"3px 3px 0 0":0}}/><div style={{height:`${(d.gr/d.a)*100}%`,background:"#42A5F5"}}/><div style={{height:`${(d.pr/d.a)*100}%`,background:"#1E88E5"}}/><div style={{height:`${(d.sc/d.a)*100}%`,background:"#1565C0",borderRadius:"3px 3px 0 0"}}/>
          </div><div style={{fontSize:9,color:"var(--t3)",marginTop:4}}>{d.m}</div></div>))}
      </div>
      <div style={{display:"flex",gap:16,marginTop:10,fontSize:10,color:"var(--t2)"}}>
        {[["Scale","#1565C0"],["Pro","#1E88E5"],["Growth","#42A5F5"],["Starter","#90CAF9"]].map(([l,c])=>(<div key={l} style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:8,height:8,borderRadius:2,background:c}}/>{l}</div>))}
      </div></div>
    <div className="card" style={{padding:0}}><div style={{padding:"14px 16px",borderBottom:"1px solid var(--bd)"}}><h3 style={{margin:0}}>Plan Distribution</h3></div>
      <table className="table" style={{border:"none"}}><thead><tr><th>Plan</th><th>Subs</th><th>Trials</th><th>MRR</th><th>% MRR</th><th>LTV</th><th>Growth</th><th>Churn</th><th>Conv</th></tr></thead>
        <tbody>{PLANS.map(p=>(<tr key={p.slug} style={{cursor:"default"}}><td style={{fontWeight:600}}>{p.name} <span style={{fontSize:10,color:"var(--t3)"}}>${p.monthly}/mo</span></td><td style={{fontWeight:700}}>{p.subs}</td><td>{p.trials}</td><td style={{fontFamily:"var(--m)"}}>${p.mrr.toLocaleString()}</td><td>{p.pctMrr}%</td><td style={{fontFamily:"var(--m)"}}>${p.avgLtv}</td><td style={{color:p.growth>0?"#43A047":"var(--t3)",fontWeight:600}}>{p.growth>0?"+":""}{p.growth}</td><td style={{color:p.churn>5?"#E53935":p.churn>0?"#FF9800":"#43A047"}}>{p.churn}%</td><td>{p.conv!==null?`${p.conv}%`:"—"}</td></tr>))}</tbody></table></div>
    <div className="card" style={{padding:0}}><div style={{padding:"14px 16px",borderBottom:"1px solid var(--bd)"}}><h3 style={{margin:0}}>Plan Movements (30d)</h3></div>
      <table className="table" style={{border:"none"}}><thead><tr><th>Type</th><th>From</th><th></th><th>To</th><th>Count</th><th>Impact</th></tr></thead>
        <tbody>{MOVEMENTS.map((m,i)=>{const mc=subMC(m.type);return(<tr key={i} style={{cursor:"default"}}><td><span className="tag-chip" style={{background:mc.b,color:mc.c,border:"none"}}>{m.type}</span></td><td>{m.from}</td><td style={{color:"var(--t3)"}}>{SIX.Ar()}</td><td>{m.to}</td><td style={{fontWeight:600}}>{m.count}</td><td style={{fontFamily:"var(--m)",fontWeight:600,color:m.impact.startsWith("+")?"#43A047":"#E53935"}}>{m.impact}/mo</td></tr>)})}</tbody></table></div>
    <div className="card" style={{padding:0}}><div style={{padding:"14px 16px",borderBottom:"1px solid var(--bd)"}}><h3 style={{margin:0}}>Recent Events</h3></div>
      <table className="table" style={{border:"none"}}><thead><tr><th>Date</th><th>Merchant</th><th>Event</th><th>Plan</th><th>Price</th><th>Prev</th></tr></thead>
        <tbody>{EVENTS.map((e,i)=>{const ec=subEC(e.event);return(<tr key={i} style={{cursor:"default"}}><td style={{fontSize:12}}>{e.date}</td><td style={{fontWeight:600}}>{e.merchant}</td><td><span className="tag-chip" style={{background:ec.b,color:ec.c,border:"none"}}>{e.event}</span></td><td>{e.plan}</td><td style={{fontFamily:"var(--m)"}}>{e.price}</td><td style={{color:"var(--t3)"}}>{e.prev}</td></tr>)})}</tbody></table></div>
  </div>);
}
