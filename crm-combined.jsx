import { useState, useEffect, useCallback, useRef, useMemo } from "react";

// ╔═══════════════════════════════════════════════════════════════╗
// ║  ACCOUNT EDITOR CRM — COMBINED (6 MODULES)                  ║
// ║  Customer · Email · Revenue · Flows · Subscriptions · Platform║
// ║  Monday.com Vibe Design System                                ║
// ╚═══════════════════════════════════════════════════════════════╝

const CSS = `

@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }
body { margin: 0; }
@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .5; } }
input::placeholder { color: #9699A6; }

@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
:root{--pri:#0073EA;--pri-h:#0060C2;--pri-l:#CCE5FF;--t1:#323338;--t2:#676879;--t3:#9699A6;--bd:#E6E9EF;--bd-h:#C5C7D0;--bg:#FFFFFF;--bg2:#F6F7FB;--bg3:#F0F2F7;--ok:#00CA72;--ok-l:#D6F5E6;--warn:#FDAB3D;--err:#E44258;--err-l:#FDE8EC;--sh:0 1px 3px rgba(0,0,0,.08);--sh2:0 4px 12px rgba(0,0,0,.1);--r:4px;--r2:8px;--f:'Figtree',sans-serif;--m:'JetBrains Mono',monospace}
body{font-family:var(--f);color:var(--t1);background:var(--bg2)}
.app{display:flex;height:100vh;overflow:hidden}
.sb{width:232px;background:var(--bg);border-right:1px solid var(--bd);display:flex;flex-direction:column;flex-shrink:0}
.sb-logo{padding:16px;border-bottom:1px solid var(--bd);display:flex;align-items:center;gap:8px}
.sb-logo b{font-size:14px}.sb-logo small{font-size:9px;text-transform:uppercase;letter-spacing:.5px;color:var(--t3);display:block}
.sb-nav{flex:1;padding:6px;overflow-y:auto}
.sb-item{display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:var(--r);cursor:pointer;font-size:13px;color:var(--t2);transition:all .12s;user-select:none}
.sb-item:hover{background:var(--bg3);color:var(--t1)}.sb-item.on{background:var(--pri-l);color:var(--pri);font-weight:500}
.sb-item.dim{opacity:.45;pointer-events:none}.sb-indent{padding-left:36px;font-size:12.5px}
.sb-hd{padding:8px 10px 3px;font-size:9.5px;font-weight:600;text-transform:uppercase;letter-spacing:.7px;color:var(--t3)}
.main{flex:1;display:flex;flex-direction:column;overflow:hidden}
.topbar{height:48px;background:var(--bg);border-bottom:1px solid var(--bd);display:flex;align-items:center;justify-content:space-between;padding:0 20px;flex-shrink:0}
.content{flex:1;overflow-y:auto;padding:20px}
.pg-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.pg-title{font-size:22px;font-weight:700;display:flex;align-items:center;gap:8px}
.badge{padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600;border:1px solid var(--bd);background:var(--bg2);color:var(--t2)}
.btn{display:inline-flex;align-items:center;gap:5px;padding:7px 14px;border-radius:var(--r);font-size:13px;font-weight:500;font-family:var(--f);cursor:pointer;border:none;transition:all .12s;white-space:nowrap}
.btn-p{background:var(--pri);color:#fff}.btn-p:hover{background:var(--pri-h)}
.btn-s{background:var(--bg);color:var(--t1);border:1px solid var(--bd)}.btn-s:hover{border-color:var(--bd-h);background:var(--bg3)}
.btn-g{background:transparent;color:var(--t2)}.btn-g:hover{background:var(--bg3);color:var(--t1)}
.btn-sm{padding:4px 8px;font-size:11px}.btn-d{background:var(--err);color:#fff}.btn-d:hover{background:#D03048}
.btn-icon{padding:5px;border-radius:var(--r)}
.fbar{display:flex;align-items:center;gap:8px;margin-bottom:16px;flex-wrap:wrap}
.fsel{padding:6px 26px 6px 9px;border:1px solid var(--bd);border-radius:var(--r);font-size:12px;font-family:var(--f);color:var(--t1);background:#fff url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23676879' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 8px center;appearance:none;cursor:pointer;min-width:130px}
.sinp-w{position:relative}.sinp-w .si{position:absolute;left:8px;top:50%;transform:translateY(-50%);color:var(--t3)}
.sinp{padding:6px 9px 6px 28px;border:1px solid var(--bd);border-radius:var(--r);font-size:12px;font-family:var(--f);color:var(--t1);width:200px}
.sinp:focus{outline:none;border-color:var(--pri);box-shadow:0 0 0 2px var(--pri-l)}
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
@media(max-width:1100px){.cards{grid-template-columns:repeat(2,1fr)}}
.tcard{background:var(--bg);border:1px solid var(--bd);border-radius:var(--r2);padding:14px;transition:all .15s;cursor:pointer;position:relative}
.tcard:hover{border-color:var(--pri);box-shadow:var(--sh2)}.tcard:hover .ca{opacity:1}
.ca{position:absolute;top:10px;right:10px;display:flex;gap:3px;opacity:0;transition:opacity .12s}
.ca button{width:26px;height:26px;border:1px solid var(--bd);background:#fff;border-radius:var(--r);cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--t2)}
.ca button:hover{background:var(--bg3);color:var(--t1)}
.tcard-top{display:flex;align-items:center;gap:6px;margin-bottom:8px;flex-wrap:wrap}
.ph-badge{padding:2px 7px;border-radius:3px;font-size:10px;font-weight:600}
.pri-badge{padding:1px 6px;border-radius:3px;font-size:10px;font-weight:700}
.tcard-name{font-size:14px;font-weight:600;color:var(--t1);margin-bottom:3px;line-height:1.3;padding-right:60px}
.tcard-id{font-family:var(--m);font-size:11px;color:var(--t3);margin-bottom:6px}
.tcard-trigger{display:inline-flex;align-items:center;gap:3px;padding:2px 7px;border-radius:3px;font-size:10.5px;font-family:var(--m);background:var(--bg2);color:var(--t2);border:1px solid var(--bd);margin-bottom:8px}
.tcard-foot{display:flex;align-items:center;justify-content:space-between;padding-top:8px;border-top:1px solid var(--bd);font-size:11px;color:var(--t3)}
.sdot{display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:3px;vertical-align:middle}
.sdot.active{background:var(--ok)}.sdot.inactive{background:var(--t3)}.sdot.draft{background:var(--warn)}
.branch-card{background:var(--bg);border:1px solid var(--bd);border-radius:var(--r2);overflow:hidden;cursor:pointer;transition:all .15s}
.branch-card:hover{border-color:var(--pri);box-shadow:var(--sh2)}
.branch-header{padding:12px 14px;border-bottom:1px solid var(--bd);display:flex;align-items:center;justify-content:space-between}
.branch-header-left{display:flex;align-items:center;gap:6px}
.branch-body{display:grid;grid-template-columns:1fr 1fr;gap:0}
.branch-variant{padding:12px 14px;position:relative}
.branch-variant:first-child{border-right:1px solid var(--bd)}
.branch-variant-label{display:inline-flex;align-items:center;gap:4px;padding:2px 7px;border-radius:3px;font-size:10px;font-weight:600;margin-bottom:6px}
.branch-variant-name{font-size:13px;font-weight:600;color:var(--t1);margin-bottom:2px}
.branch-variant-cond{font-size:10.5px;font-family:var(--m);color:var(--t3)}
.branch-variant-stats{font-size:10.5px;color:var(--t3);margin-top:6px}
.branch-foot{padding:8px 14px;border-top:1px solid var(--bd);display:flex;align-items:center;justify-content:space-between;font-size:11px;color:var(--t3)}
.table{width:100%;border-collapse:collapse;background:var(--bg);border:1px solid var(--bd);border-radius:var(--r2);overflow:hidden}
.table th{padding:8px 14px;text-align:left;font-size:11px;font-weight:600;color:var(--t2);text-transform:uppercase;letter-spacing:.4px;background:var(--bg2);border-bottom:1px solid var(--bd)}
.table td{padding:10px 14px;font-size:12.5px;color:var(--t1);border-bottom:1px solid var(--bd)}
.table tr:last-child td{border-bottom:none}.table tr:hover td{background:var(--bg3)}
.schip{display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:500}
.schip.sent{background:var(--ok-l);color:#0A7B3E}.schip.scheduled{background:var(--pri-l);color:var(--pri)}.schip.draft{background:var(--bg2);color:var(--t2);border:1px solid var(--bd)}
.schip.cancelled{background:var(--err-l);color:var(--err)}.schip.queued{background:var(--pri-l);color:var(--pri)}
.schip.suppressed{background:var(--bg2);color:var(--t2)}.schip.failed{background:var(--err-l);color:var(--err)}
.tabs{display:flex;gap:0;border-bottom:1px solid var(--bd);margin-bottom:16px}
.tab{padding:8px 14px;font-size:13px;font-weight:500;color:var(--t2);cursor:pointer;border-bottom:2px solid transparent;transition:all .12s;user-select:none}
.tab:hover{color:var(--t1)}.tab.on{color:var(--pri);border-bottom-color:var(--pri)}
.metrics{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-bottom:20px}
.mc{background:var(--bg);border:1px solid var(--bd);border-radius:var(--r2);padding:14px;text-align:center}
.mc-v{font-size:24px;font-weight:700;color:var(--t1)}.mc-l{font-size:11px;color:var(--t2);font-weight:500}
.mc-d{font-size:10px;margin-top:3px}.mc-d.up{color:var(--ok)}.mc-d.dn{color:var(--err)}
.ed-layout{display:flex;height:calc(100vh - 108px);background:var(--bg);border:1px solid var(--bd);border-radius:var(--r2);overflow:hidden}
.ed-left{width:40%;border-right:1px solid var(--bd);overflow-y:auto;padding:20px}
.ed-right{width:60%;display:flex;flex-direction:column}
.ed-tabs{display:flex;border-bottom:1px solid var(--bd);background:var(--bg2)}
.ed-tab{padding:10px 18px;font-size:13px;font-weight:500;color:var(--t2);cursor:pointer;border-bottom:2px solid transparent}
.ed-tab.on{color:var(--pri);border-bottom-color:var(--pri);background:var(--bg)}
.ed-body{flex:1;overflow:hidden}
.html-ta{width:100%;height:100%;border:none;resize:none;padding:14px;font-family:var(--m);font-size:12.5px;line-height:1.6;outline:none;background:#1E1E2E;color:#CDD6F4}
.fg{margin-bottom:14px}.fl{display:block;font-size:12px;font-weight:600;color:var(--t1);margin-bottom:5px}
.fi{width:100%;padding:7px 10px;border:1px solid var(--bd);border-radius:var(--r);font-size:13px;font-family:var(--f);color:var(--t1)}
.fi:focus{outline:none;border-color:var(--pri);box-shadow:0 0 0 2px var(--pri-l)}
.fi::placeholder{color:var(--t3)}
.chk-row{display:flex;align-items:center;gap:7px;padding:3px 0;cursor:pointer}
.chk-row input[type="checkbox"]{width:15px;height:15px;accent-color:var(--pri);cursor:pointer}
.auto-sec{background:var(--bg);border:1px solid var(--bd);border-radius:var(--r2);padding:16px;margin-bottom:12px}
.auto-title{font-size:13px;font-weight:600;color:var(--t1);margin-bottom:10px;display:flex;align-items:center;gap:6px}
.cchip{display:inline-flex;align-items:center;gap:3px;padding:3px 8px;border-radius:var(--r);font-size:11px;font-family:var(--m);margin:2px 3px 2px 0}
.cchip.g{background:var(--ok-l);color:#0A7B3E}.cchip.r{background:var(--err-l);color:var(--err)}.cchip.b{background:var(--pri-l);color:var(--pri)}
.ed-foot{display:flex;align-items:center;justify-content:space-between;padding:10px 20px;border-top:1px solid var(--bd);background:var(--bg2)}
.ph-sb{width:210px;border-right:1px solid var(--bd);overflow-y:auto;background:var(--bg);flex-shrink:0}
.ph-sb-item{padding:10px 14px;cursor:pointer;border-left:3px solid transparent;transition:all .12s}
.ph-sb-item:hover{background:var(--bg3)}.ph-sb-item.on{border-left-color:var(--pri);background:var(--pri-l)}
.ph-sb-name{font-size:12px;font-weight:600;color:var(--t1)}.ph-sb-sub{font-size:10px;color:var(--t3)}
.supp-tabs{display:flex;gap:0;margin-bottom:16px}
.stab{padding:7px 14px;font-size:12px;font-weight:500;color:var(--t2);cursor:pointer;border:1px solid var(--bd);background:#fff}
.stab:first-child{border-radius:var(--r) 0 0 var(--r)}.stab:last-child{border-radius:0 var(--r) var(--r) 0}.stab:not(:first-child){border-left:none}
.stab.on{background:var(--pri);color:#fff;border-color:var(--pri)}
.env-b{padding:3px 8px;border-radius:var(--r);font-size:10px;font-weight:600;background:#E8F5E8;color:#258750;border:1px solid #C5E8C5}
.modal-ov{position:fixed;inset:0;background:rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;z-index:1000}
.modal{background:#fff;border-radius:var(--r2);box-shadow:0 8px 24px rgba(0,0,0,.12);width:500px;max-height:80vh;overflow:hidden}
.modal-h{padding:16px 20px;border-bottom:1px solid var(--bd);display:flex;align-items:center;justify-content:space-between}
.modal-h h3{font-size:16px;font-weight:700}.modal-b{padding:20px;overflow-y:auto;max-height:60vh}.modal-f{padding:12px 20px;border-top:1px solid var(--bd);display:flex;justify-content:flex-end;gap:6px}
.toast{position:fixed;bottom:20px;right:20px;padding:10px 18px;border-radius:var(--r2);font-size:13px;font-weight:500;z-index:2000;box-shadow:0 8px 24px rgba(0,0,0,.12);display:flex;align-items:center;gap:6px;animation:su .3s ease;color:#fff}
.toast.ok{background:#0A7B3E}.toast.err{background:var(--err)}
@keyframes su{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}
.var-pick{position:absolute;top:100%;left:0;background:#fff;border:1px solid var(--bd);border-radius:var(--r2);box-shadow:var(--sh2);z-index:100;width:300px;max-height:360px;overflow-y:auto}
.var-cat{padding:6px 10px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.4px;color:var(--t3);background:var(--bg2);border-bottom:1px solid var(--bd)}
.var-item{padding:6px 10px;cursor:pointer;font-family:var(--m);font-size:11px;color:var(--pri);border-bottom:1px solid var(--bd)}
.var-item:hover{background:var(--bg3)}
.funnel{display:flex;align-items:flex-end;gap:2px;height:180px;padding:16px 0}
.funnel-s{flex:1;display:flex;flex-direction:column;align-items:center;gap:6px}
.funnel-bar{width:100%;border-radius:4px 4px 0 0;min-height:16px}
.funnel-l{font-size:10px;color:var(--t2);text-align:center;font-weight:500}
.funnel-v{font-size:13px;font-weight:700;color:var(--t1)}.funnel-p{font-size:10px;color:var(--t3)}
.wiz-steps{display:flex;align-items:center;gap:0;margin-bottom:28px;padding:16px 0}
.wiz-s{display:flex;align-items:center;gap:6px;flex:1}
.wiz-n{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;border:2px solid var(--bd);color:var(--t3);background:#fff;flex-shrink:0}
.wiz-s.on .wiz-n{border-color:var(--pri);color:#fff;background:var(--pri)}.wiz-s.done .wiz-n{border-color:var(--ok);color:#fff;background:var(--ok)}
.wiz-label{font-size:12px;font-weight:500;color:var(--t3)}.wiz-s.on .wiz-label{color:var(--pri);font-weight:600}.wiz-s.done .wiz-label{color:var(--ok)}
.wiz-line{flex:1;height:2px;background:var(--bd);margin:0 6px}.wiz-line.done{background:var(--ok)}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--bd-h);border-radius:3px}
.tl-item{display:flex;align-items:center;gap:14px;padding:12px 14px;border-bottom:1px solid var(--bd);cursor:pointer;transition:background .12s}
.tl-item:hover{background:var(--bg3)}
.tl-pos{width:36px;text-align:center;flex-shrink:0}.tl-info{flex:1;min-width:0}.tl-name{font-size:13px;font-weight:600;color:var(--t1)}
.tl-sub{font-size:11px;color:var(--t2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tl-meta{display:flex;align-items:center;gap:6px;flex-shrink:0}
@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
:root{--pri:#0073EA;--pri-h:#0060C2;--pri-l:#CCE5FF;--t1:#323338;--t2:#676879;--t3:#9699A6;--bd:#E6E9EF;--bd-h:#C5C7D0;--bg:#FFFFFF;--bg2:#F6F7FB;--bg3:#F0F2F7;--ok:#00CA72;--ok-l:#D6F5E6;--warn:#FDAB3D;--err:#E44258;--err-l:#FDE8EC;--r:4px;--r2:8px;--f:'Figtree',sans-serif;--m:'JetBrains Mono',monospace}
body{font-family:var(--f);color:var(--t1);background:var(--bg2)}
.app{display:flex;height:100vh;overflow:hidden}
.sb{width:232px;background:var(--bg);border-right:1px solid var(--bd);display:flex;flex-direction:column;flex-shrink:0}
.sb-logo{padding:16px;border-bottom:1px solid var(--bd);display:flex;align-items:center;gap:8px}
.sb-logo b{font-size:14px}.sb-logo small{font-size:9px;text-transform:uppercase;letter-spacing:.5px;color:var(--t3);display:block}
.sb-nav{flex:1;padding:6px;overflow-y:auto}
.sb-item{display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:var(--r);cursor:pointer;font-size:13px;color:var(--t2);transition:all .12s;user-select:none}
.sb-item:hover{background:var(--bg3);color:var(--t1)}.sb-item.on{background:var(--pri-l);color:var(--pri);font-weight:500}
.sb-item.dim{opacity:.45;pointer-events:none}.sb-indent{padding-left:36px;font-size:12.5px}
.sb-hd{padding:8px 10px 3px;font-size:9.5px;font-weight:600;text-transform:uppercase;letter-spacing:.7px;color:var(--t3)}
.main{flex:1;display:flex;flex-direction:column;overflow:hidden}
.topbar{height:48px;background:var(--bg);border-bottom:1px solid var(--bd);display:flex;align-items:center;justify-content:space-between;padding:0 20px;flex-shrink:0}
.content{flex:1;overflow-y:auto;padding:20px}
.pg-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.pg-title{font-size:22px;font-weight:700;display:flex;align-items:center;gap:8px}
.badge{padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600;border:1px solid var(--bd);background:var(--bg2);color:var(--t2)}
.btn{display:inline-flex;align-items:center;gap:5px;padding:7px 14px;border-radius:var(--r);font-size:13px;font-weight:500;font-family:var(--f);cursor:pointer;border:none;transition:all .12s;white-space:nowrap}
.btn-p{background:var(--pri);color:#fff}.btn-p:hover{background:var(--pri-h)}
.btn-s{background:var(--bg);color:var(--t1);border:1px solid var(--bd)}.btn-s:hover{border-color:var(--bd-h);background:var(--bg3)}
.btn-g{background:transparent;color:var(--t2)}.btn-g:hover{background:var(--bg3);color:var(--t1)}
.btn-sm{padding:4px 8px;font-size:11px}
.fbar{display:flex;align-items:center;gap:8px;margin-bottom:16px;flex-wrap:wrap}
.fsel{padding:6px 26px 6px 9px;border:1px solid var(--bd);border-radius:var(--r);font-size:12px;font-family:var(--f);color:var(--t1);background:#fff url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23676879' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 8px center;appearance:none;cursor:pointer;min-width:130px}
.metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px}
.mc{background:var(--bg);border:1px solid var(--bd);border-radius:var(--r2);padding:16px}
.mc-v{font-size:28px;font-weight:700;color:var(--t1)}.mc-l{font-size:11px;color:var(--t2);font-weight:500;margin-top:2px}
.mc-d{font-size:11px;margin-top:4px;display:flex;align-items:center;gap:3px}.mc-d.up{color:#43A047}.mc-d.dn{color:#E53935}
.table{width:100%;border-collapse:collapse;background:var(--bg);border:1px solid var(--bd);border-radius:var(--r2);overflow:hidden}
.table th{padding:8px 12px;text-align:left;font-size:11px;font-weight:600;color:var(--t2);text-transform:uppercase;letter-spacing:.4px;background:var(--bg2);border-bottom:1px solid var(--bd)}
.table td{padding:10px 12px;font-size:12.5px;color:var(--t1);border-bottom:1px solid var(--bd)}
.table tr:last-child td{border-bottom:none}.table tr:hover td{background:var(--bg3)}
.tabs{display:flex;gap:0;border-bottom:1px solid var(--bd);margin-bottom:16px}
.tab{padding:8px 14px;font-size:13px;font-weight:500;color:var(--t2);cursor:pointer;border-bottom:2px solid transparent;transition:all .12s;user-select:none}
.tab:hover{color:var(--t1)}.tab.on{color:var(--pri);border-bottom-color:var(--pri)}
.card{background:var(--bg);border:1px solid var(--bd);border-radius:var(--r2);padding:20px;margin-bottom:16px}
.card h3{font-size:15px;font-weight:700;margin-bottom:14px}
.env-b{padding:3px 8px;border-radius:var(--r);font-size:10px;font-weight:600;background:#E8F5E8;color:#258750;border:1px solid #C5E8C5}
.toggle-grp{display:flex;gap:0}.toggle-btn{padding:5px 12px;font-size:12px;font-weight:500;border:1px solid var(--bd);background:#fff;cursor:pointer;font-family:var(--f);color:var(--t2)}
.toggle-btn:first-child{border-radius:var(--r) 0 0 var(--r)}.toggle-btn:last-child{border-radius:0 var(--r) var(--r) 0}.toggle-btn:not(:first-child){border-left:none}
.toggle-btn.on{background:var(--pri);color:#fff;border-color:var(--pri)}
.goal-widget{background:linear-gradient(135deg,#E3F2FD 0%,#F3E5F5 100%);border:1px solid #C5CAE9;border-radius:var(--r2);padding:20px;margin-bottom:20px;display:flex;align-items:center;gap:24px}
.goal-bar-outer{flex:1;height:10px;background:#fff;border-radius:5px;overflow:hidden;border:1px solid var(--bd)}
.goal-bar-inner{height:100%;border-radius:5px;background:linear-gradient(90deg,#0073EA,#7C4DFF);transition:width .5s}
.chart-area{position:relative;height:220px;background:var(--bg);border:1px solid var(--bd);border-radius:var(--r2);padding:16px;margin-bottom:16px;overflow:hidden}
.chart-bars{display:flex;align-items:flex-end;gap:2px;height:180px;padding:0 4px}
.chart-bar{flex:1;border-radius:3px 3px 0 0;min-width:4px;transition:height .3s}
.chart-label{font-size:9px;color:var(--t3);text-align:center;margin-top:4px}
.cohort-table{width:100%;border-collapse:collapse;font-size:11px}
.cohort-table th{padding:6px 8px;text-align:center;font-size:10px;font-weight:600;color:var(--t2);background:var(--bg2);border:1px solid var(--bd)}
.cohort-table td{padding:6px 8px;text-align:center;border:1px solid var(--bd);font-weight:500;font-family:var(--m);font-size:10.5px}
.cohort-table td.cohort-label{text-align:left;font-family:var(--f);font-weight:600;background:var(--bg2)}
.journal-item{display:flex;gap:12px;padding:12px 0;border-bottom:1px solid var(--bd)}
.journal-item:last-child{border-bottom:none}
.journal-dot{width:10px;height:10px;border-radius:50%;margin-top:4px;flex-shrink:0;background:var(--pri)}
.journal-cat{display:inline-flex;padding:1px 6px;border-radius:3px;font-size:10px;font-weight:500;background:var(--bg2);color:var(--t2);border:1px solid var(--bd)}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--bd-h);border-radius:3px}
@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
:root{--pri:#0073EA;--pri-h:#0060C2;--pri-l:#CCE5FF;--t1:#323338;--t2:#676879;--t3:#9699A6;--bd:#E6E9EF;--bd-h:#C5C7D0;--bg:#FFFFFF;--bg2:#F6F7FB;--bg3:#F0F2F7;--ok:#00CA72;--ok-l:#D6F5E6;--warn:#FDAB3D;--err:#E44258;--err-l:#FDE8EC;--r:4px;--r2:8px;--f:'Figtree',sans-serif;--m:'JetBrains Mono',monospace}
body{font-family:var(--f);color:var(--t1);background:var(--bg2)}
.app{display:flex;height:100vh;overflow:hidden}
.sb{width:232px;background:var(--bg);border-right:1px solid var(--bd);display:flex;flex-direction:column;flex-shrink:0}
.sb-logo{padding:16px;border-bottom:1px solid var(--bd);display:flex;align-items:center;gap:8px}
.sb-logo b{font-size:14px}.sb-logo small{font-size:9px;text-transform:uppercase;letter-spacing:.5px;color:var(--t3);display:block}
.sb-nav{flex:1;padding:6px;overflow-y:auto}
.sb-item{display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:var(--r);cursor:pointer;font-size:13px;color:var(--t2);transition:all .12s;user-select:none}
.sb-item:hover{background:var(--bg3);color:var(--t1)}.sb-item.on{background:var(--pri-l);color:var(--pri);font-weight:500}
.sb-item.dim{opacity:.45;pointer-events:none}.sb-indent{padding-left:36px;font-size:12.5px}
.sb-hd{padding:8px 10px 3px;font-size:9.5px;font-weight:600;text-transform:uppercase;letter-spacing:.7px;color:var(--t3)}
.main{flex:1;display:flex;flex-direction:column;overflow:hidden}
.topbar{height:48px;background:var(--bg);border-bottom:1px solid var(--bd);display:flex;align-items:center;justify-content:space-between;padding:0 20px;flex-shrink:0}
.content{flex:1;overflow-y:auto;padding:20px}
.pg-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.pg-title{font-size:22px;font-weight:700;display:flex;align-items:center;gap:8px}
.badge{padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600;border:1px solid var(--bd);background:var(--bg2);color:var(--t2)}
.btn{display:inline-flex;align-items:center;gap:5px;padding:7px 14px;border-radius:var(--r);font-size:13px;font-weight:500;font-family:var(--f);cursor:pointer;border:none;transition:all .12s;white-space:nowrap}
.btn-p{background:var(--pri);color:#fff}.btn-p:hover{background:var(--pri-h)}
.btn-s{background:var(--bg);color:var(--t1);border:1px solid var(--bd)}.btn-s:hover{border-color:var(--bd-h);background:var(--bg3)}
.btn-g{background:transparent;color:var(--t2)}.btn-g:hover{background:var(--bg3);color:var(--t1)}
.btn-sm{padding:4px 8px;font-size:11px}
.fbar{display:flex;align-items:center;gap:8px;margin-bottom:16px;flex-wrap:wrap}
.fsel{padding:6px 26px 6px 9px;border:1px solid var(--bd);border-radius:var(--r);font-size:12px;font-family:var(--f);color:var(--t1);background:#fff url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23676879' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 8px center;appearance:none;cursor:pointer;min-width:130px}
.sinp-w{position:relative}.sinp-w .si{position:absolute;left:8px;top:50%;transform:translateY(-50%);color:var(--t3)}
.sinp{padding:6px 9px 6px 28px;border:1px solid var(--bd);border-radius:var(--r);font-size:12px;font-family:var(--f);color:var(--t1);width:220px}
.sinp:focus{outline:none;border-color:var(--pri);box-shadow:0 0 0 2px var(--pri-l)}
.table{width:100%;border-collapse:collapse;background:var(--bg);border:1px solid var(--bd);border-radius:var(--r2);overflow:hidden}
.table th{padding:8px 14px;text-align:left;font-size:11px;font-weight:600;color:var(--t2);text-transform:uppercase;letter-spacing:.4px;background:var(--bg2);border-bottom:1px solid var(--bd)}
.table td{padding:10px 14px;font-size:12.5px;color:var(--t1);border-bottom:1px solid var(--bd)}
.table tr:last-child td{border-bottom:none}.table tr:hover td{background:var(--bg3)}
.tabs{display:flex;gap:0;border-bottom:1px solid var(--bd);margin-bottom:16px}
.tab{padding:8px 14px;font-size:13px;font-weight:500;color:var(--t2);cursor:pointer;border-bottom:2px solid transparent;transition:all .12s;user-select:none}
.tab:hover{color:var(--t1)}.tab.on{color:var(--pri);border-bottom-color:var(--pri)}
.card{background:var(--bg);border:1px solid var(--bd);border-radius:var(--r2);padding:20px;margin-bottom:16px}
.card h3{font-size:15px;font-weight:700;margin-bottom:14px}
.schip{display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:500}
.schip.published{background:var(--ok-l);color:#0A7B3E}.schip.draft{background:var(--bg2);color:var(--t2);border:1px solid var(--bd)}
.schip.executed{background:var(--ok-l);color:#0A7B3E}.schip.suppressed{background:var(--bg2);color:var(--t2)}.schip.failed{background:var(--err-l);color:var(--err)}
.tag-chip{display:inline-flex;padding:1px 6px;border-radius:3px;font-size:10px;font-weight:500;background:var(--bg2);color:var(--t2);border:1px solid var(--bd);margin-right:3px}
.trigger-chip{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:3px;font-size:11px;font-weight:500;font-family:var(--m)}
.env-b{padding:3px 8px;border-radius:var(--r);font-size:10px;font-weight:600;background:#E8F5E8;color:#258750;border:1px solid #C5E8C5}
.modal-ov{position:fixed;inset:0;background:rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;z-index:1000}
.modal{background:#fff;border-radius:var(--r2);box-shadow:0 8px 24px rgba(0,0,0,.12);max-height:85vh;overflow:hidden}
.modal-h{padding:16px 20px;border-bottom:1px solid var(--bd);display:flex;align-items:center;justify-content:space-between}
.modal-h h3{font-size:16px;font-weight:700}.modal-b{padding:20px;overflow-y:auto;max-height:70vh}
.tmpl-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.tmpl-card{border:1px solid var(--bd);border-radius:var(--r2);padding:16px;cursor:pointer;transition:all .15s}
.tmpl-card:hover{border-color:var(--pri);box-shadow:0 4px 12px rgba(0,0,0,.1)}
.tmpl-icon{font-size:28px;margin-bottom:10px}
.tmpl-name{font-size:14px;font-weight:600;margin-bottom:4px}
.tmpl-desc{font-size:11.5px;color:var(--t2);line-height:1.4;margin-bottom:10px;min-height:32px}
.fi{width:100%;padding:7px 10px;border:1px solid var(--bd);border-radius:var(--r);font-size:13px;font-family:var(--f);color:var(--t1)}
.fi:focus{outline:none;border-color:var(--pri);box-shadow:0 0 0 2px var(--pri-l)}
.fg{margin-bottom:14px}.fl{display:block;font-size:12px;font-weight:600;color:var(--t1);margin-bottom:5px}
.canvas{flex:1;background:#FAFBFD;border:1px solid var(--bd);border-radius:var(--r2);overflow-y:auto;padding:24px;position:relative}
.node{background:var(--bg);border:1px solid var(--bd);border-radius:var(--r2);padding:12px 16px;margin-bottom:4px;display:flex;align-items:center;gap:10px;cursor:pointer;transition:all .12s;position:relative}
.node:hover{border-color:var(--pri);box-shadow:0 2px 8px rgba(0,0,0,.08)}
.node-icon{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;color:#fff;flex-shrink:0;font-weight:700}
.node-info{flex:1;min-width:0}.node-label{font-size:13px;font-weight:600}.node-sub{font-size:11px;color:var(--t3)}
.node-connector{width:2px;height:16px;background:var(--bd);margin:0 0 0 27px}
.branch-connector{display:flex;align-items:center;gap:8px;margin:0 0 4px 16px;font-size:10px;font-weight:600;color:var(--t3)}
.branch-line{width:16px;height:2px;background:var(--bd)}
.ai-input{background:linear-gradient(135deg,#E8EAF6 0%,#F3E5F5 100%);border:1px solid #C5CAE9;border-radius:var(--r2);padding:16px;margin-bottom:16px}
.ai-textarea{width:100%;min-height:60px;border:1px solid var(--bd);border-radius:var(--r);padding:10px;font-size:13px;font-family:var(--f);resize:vertical}
.ai-textarea:focus{outline:none;border-color:var(--pri);box-shadow:0 0 0 2px var(--pri-l)}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--bd-h);border-radius:3px}
@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
:root{--pri:#0073EA;--pri-h:#0060C2;--pri-l:#CCE5FF;--t1:#323338;--t2:#676879;--t3:#9699A6;--bd:#E6E9EF;--bd-h:#C5C7D0;--bg:#FFF;--bg2:#F6F7FB;--bg3:#F0F2F7;--r:4px;--r2:8px;--f:'Figtree',sans-serif;--m:'JetBrains Mono',monospace}
body{font-family:var(--f);color:var(--t1);background:var(--bg2)}
.app{display:flex;height:100vh;overflow:hidden}
.sb{width:232px;background:var(--bg);border-right:1px solid var(--bd);display:flex;flex-direction:column;flex-shrink:0}
.sb-logo{padding:16px;border-bottom:1px solid var(--bd);display:flex;align-items:center;gap:8px}
.sb-logo b{font-size:14px} .sb-logo small{font-size:9px;text-transform:uppercase;letter-spacing:.5px;color:var(--t3);display:block}
.sb-nav{flex:1;padding:6px;overflow-y:auto}
.sb-item{display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:var(--r);cursor:pointer;font-size:13px;color:var(--t2);transition:all .12s;user-select:none}
.sb-item:hover{background:var(--bg3);color:var(--t1)} .sb-item.on{background:var(--pri-l);color:var(--pri);font-weight:500}
.sb-item.dim{opacity:.45;pointer-events:none} .sb-indent{padding-left:36px;font-size:12.5px}
.sb-hd{padding:8px 10px 3px;font-size:9.5px;font-weight:600;text-transform:uppercase;letter-spacing:.7px;color:var(--t3)}
.main{flex:1;display:flex;flex-direction:column;overflow:hidden}
.topbar{height:48px;background:var(--bg);border-bottom:1px solid var(--bd);display:flex;align-items:center;justify-content:space-between;padding:0 20px;flex-shrink:0}
.content{flex:1;overflow-y:auto;padding:20px}
.pg-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.pg-title{font-size:22px;font-weight:700;display:flex;align-items:center;gap:8px}
.fsel{padding:6px 26px 6px 9px;border:1px solid var(--bd);border-radius:var(--r);font-size:12px;font-family:var(--f);color:var(--t1);background:#fff url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23676879' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 8px center;appearance:none;cursor:pointer;min-width:120px}
.metrics{display:grid;gap:10px;margin-bottom:20px} .mc{background:var(--bg);border:1px solid var(--bd);border-radius:var(--r2);padding:14px}
.mc-v{font-size:26px;font-weight:700} .mc-l{font-size:11px;color:var(--t2);font-weight:500;margin-top:2px}
.mc-d{font-size:11px;margin-top:4px;display:flex;align-items:center;gap:3px} .mc-d.up{color:#43A047} .mc-d.dn{color:#E53935}
.table{width:100%;border-collapse:collapse;background:var(--bg);border:1px solid var(--bd);border-radius:var(--r2);overflow:hidden}
.table th{padding:8px 12px;text-align:left;font-size:11px;font-weight:600;color:var(--t2);text-transform:uppercase;letter-spacing:.4px;background:var(--bg2);border-bottom:1px solid var(--bd)}
.table td{padding:10px 12px;font-size:12.5px;border-bottom:1px solid var(--bd)} .table tr:last-child td{border-bottom:none} .table tr:hover td{background:var(--bg3)}
.card{background:var(--bg);border:1px solid var(--bd);border-radius:var(--r2);padding:20px;margin-bottom:16px} .card h3{font-size:15px;font-weight:700;margin-bottom:14px}
.toggle-grp{display:flex} .toggle-btn{padding:5px 12px;font-size:12px;font-weight:500;border:1px solid var(--bd);background:#fff;cursor:pointer;font-family:var(--f);color:var(--t2)}
.toggle-btn:first-child{border-radius:var(--r) 0 0 var(--r)} .toggle-btn:last-child{border-radius:0 var(--r) var(--r) 0} .toggle-btn:not(:first-child){border-left:none}
.toggle-btn.on{background:var(--pri);color:#fff;border-color:var(--pri)}
.env-b{padding:3px 8px;border-radius:var(--r);font-size:10px;font-weight:600;background:#E8F5E8;color:#258750;border:1px solid #C5E8C5}
.tag-chip{display:inline-flex;padding:1px 6px;border-radius:3px;font-size:10px;font-weight:500;background:var(--bg2);color:var(--t2);border:1px solid var(--bd);margin-right:3px}
.ct{width:100%;border-collapse:collapse;font-size:11px} .ct th{padding:6px 8px;text-align:center;font-size:10px;font-weight:600;color:var(--t2);background:var(--bg2);border:1px solid var(--bd)}
.ct td{padding:6px 8px;text-align:center;border:1px solid var(--bd);font-weight:500;font-family:var(--m);font-size:10.5px} .ct td.cl{text-align:left;font-family:var(--f);font-weight:600;background:var(--bg2)}
::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-thumb{background:var(--bd-h);border-radius:3px}
@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
* { margin: 0; padding: 0; box-sizing: border-box; }
:root { --pri:#0073EA;--pri-l:#CCE5FF;--t1:#323338;--t2:#676879;--t3:#9699A6;--bd:#E6E9EF;--bd-h:#C5C7D0;--bg:#FFF;--bg2:#F6F7FB;--bg3:#F0F2F7;--r:4px;--r2:8px;--f:'Figtree',sans-serif;--m:'JetBrains Mono',monospace; }
body { font-family: var(--f); color: var(--t1); background: var(--bg2); }
.app { display: flex; height: 100vh; overflow: hidden; }
.sb { width: 232px; background: var(--bg); border-right: 1px solid var(--bd); display: flex; flex-direction: column; flex-shrink: 0; }
.sb-logo { padding: 16px; border-bottom: 1px solid var(--bd); display: flex; align-items: center; gap: 8px; }
.sb-logo b { font-size: 14px; } .sb-logo small { font-size: 9px; text-transform: uppercase; letter-spacing: .5px; color: var(--t3); display: block; }
.sb-nav { flex: 1; padding: 6px; overflow-y: auto; }
.sb-item { display: flex; align-items: center; gap: 8px; padding: 7px 10px; border-radius: var(--r); cursor: pointer; font-size: 13px; color: var(--t2); transition: all .12s; user-select: none; }
.sb-item:hover { background: var(--bg3); color: var(--t1); } .sb-item.on { background: var(--pri-l); color: var(--pri); font-weight: 500; }
.sb-item.dim { opacity: .45; pointer-events: none; } .sb-indent { padding-left: 36px; font-size: 12.5px; }
.sb-hd { padding: 8px 10px 3px; font-size: 9.5px; font-weight: 600; text-transform: uppercase; letter-spacing: .7px; color: var(--t3); }
.main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.topbar { height: 48px; background: var(--bg); border-bottom: 1px solid var(--bd); display: flex; align-items: center; justify-content: space-between; padding: 0 20px; flex-shrink: 0; }
.content { flex: 1; overflow-y: auto; padding: 20px; }
.pg-hd { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.pg-title { font-size: 22px; font-weight: 700; display: flex; align-items: center; gap: 8px; }
.metrics { display: grid; gap: 10px; margin-bottom: 20px; }
.mc { background: var(--bg); border: 1px solid var(--bd); border-radius: var(--r2); padding: 14px; }
.mc-v { font-size: 26px; font-weight: 700; } .mc-l { font-size: 11px; color: var(--t2); font-weight: 500; margin-top: 2px; }
.mc-d { font-size: 11px; margin-top: 4px; display: flex; align-items: center; gap: 3px; } .mc-d.up { color: #43A047; } .mc-d.dn { color: #E53935; }
.tabs { display: flex; gap: 0; border-bottom: 1px solid var(--bd); margin-bottom: 16px; }
.tab { padding: 8px 14px; font-size: 13px; font-weight: 500; color: var(--t2); cursor: pointer; border-bottom: 2px solid transparent; transition: all .12s; user-select: none; }
.tab:hover { color: var(--t1); } .tab.on { color: var(--pri); border-bottom-color: var(--pri); }
.card { background: var(--bg); border: 1px solid var(--bd); border-radius: var(--r2); padding: 20px; margin-bottom: 16px; }
.card h3 { font-size: 15px; font-weight: 700; margin-bottom: 14px; }
.table { width: 100%; border-collapse: collapse; background: var(--bg); border: 1px solid var(--bd); border-radius: var(--r2); overflow: hidden; }
.table th { padding: 8px 12px; text-align: left; font-size: 11px; font-weight: 600; color: var(--t2); text-transform: uppercase; letter-spacing: .4px; background: var(--bg2); border-bottom: 1px solid var(--bd); }
.table td { padding: 10px 12px; font-size: 12.5px; border-bottom: 1px solid var(--bd); } .table tr:last-child td { border-bottom: none; } .table tr:hover td { background: var(--bg3); }
.tag-chip { display: inline-flex; padding: 1px 6px; border-radius: 3px; font-size: 10px; font-weight: 500; border: none; margin-right: 3px; }
.env-b { padding: 3px 8px; border-radius: var(--r); font-size: 10px; font-weight: 600; background: #E8F5E8; color: #258750; border: 1px solid #C5E8C5; }
.toggle-grp { display: flex; } .toggle-btn { padding: 5px 12px; font-size: 12px; font-weight: 500; border: 1px solid var(--bd); background: #fff; cursor: pointer; font-family: var(--f); color: var(--t2); }
.toggle-btn:first-child { border-radius: var(--r) 0 0 var(--r); } .toggle-btn:last-child { border-radius: 0 var(--r) var(--r) 0; } .toggle-btn:not(:first-child) { border-left: none; }
.toggle-btn.on { background: var(--pri); color: #fff; border-color: var(--pri); }
.ct { width: 100%; border-collapse: collapse; font-size: 11px; } .ct th { padding: 6px 8px; text-align: center; font-size: 10px; font-weight: 600; color: var(--t2); background: var(--bg2); border: 1px solid var(--bd); }
.ct td { padding: 6px 8px; text-align: center; border: 1px solid var(--bd); font-weight: 500; font-family: var(--m); font-size: 10.5px; } .ct td.cl { text-align: left; font-family: var(--f); font-weight: 600; background: var(--bg2); }
.live-dot { width: 8px; height: 8px; border-radius: 50%; background: #4CAF50; display: inline-block; animation: pulse 2s infinite; margin-right: 4px; }
@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .4; } }
.feed-item { display: flex; align-items: flex-start; gap: 12px; padding: 12px 16px; border-bottom: 1px solid var(--bd); cursor: pointer; transition: background .12s; }
.feed-item:hover { background: var(--bg3); }
.feed-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: #fff; flex-shrink: 0; margin-top: 2px; }
.feed-info { flex: 1; min-width: 0; }
.feed-label { font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 6px; }
.feed-sub { font-size: 11px; color: var(--t3); margin-top: 2px; }
.feed-right { text-align: right; flex-shrink: 0; }
.feed-time { font-size: 11px; color: var(--t3); }
.feed-plan { font-size: 10px; padding: 1px 6px; border-radius: 3px; background: var(--bg2); color: var(--t2); border: 1px solid var(--bd); margin-top: 4px; display: inline-block; }
.feed-detail { padding: 8px 16px 12px 56px; background: var(--bg2); border-bottom: 1px solid var(--bd); font-size: 12px; color: var(--t2); display: grid; grid-template-columns: 1fr 1fr; gap: 4px 16px; }
.feed-detail span { color: var(--t1); font-weight: 500; }
.fbar { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; }
.fsel { padding: 6px 26px 6px 9px; border: 1px solid var(--bd); border-radius: var(--r); font-size: 12px; font-family: var(--f); color: var(--t1); background: #fff url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23676879' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 8px center; appearance: none; cursor: pointer; min-width: 120px; }
.progress-bar { width: 60px; height: 6px; background: var(--bd); border-radius: 3px; overflow: hidden; display: inline-block; vertical-align: middle; margin-right: 4px; }
.progress-fill { height: 100%; border-radius: 3px; }
::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-thumb { background: var(--bd-h); border-radius: 3px; }
`;

// ============================================================
// MODULE 1: CUSTOMER MANAGEMENT
// ============================================================
// ═══════════════════════════════════════════════════════════════
// CUSTOMER MODULE — COMBINED FINAL
// Best of both versions: Rich UI components + Spec-compliant data
// ═══════════════════════════════════════════════════════════════

// ── Design Tokens (from uploaded — enhanced) ──────────────────
const C = {
  pri: "#0073ea", priH: "#0060c2", priL: "#cce5ff",
  ok: "#00c875", okL: "#e6f9f0", okD: "#00a25b",
  warn: "#fdab3d", warnL: "#fff4e5", warnD: "#d48806",
  err: "#e2445c", errL: "#ffe0e6", errD: "#bb2d3b",
  purp: "#a25ddc", purpL: "#f0e5ff",
  teal: "#00d2d2", tealL: "#e0fafa",
  ind: "#5559df", indL: "#eaebff",
  g100: "#f5f6f8", g200: "#e6e9ef", g300: "#c5c7d0",
  g400: "#9699a6", g500: "#676879", g600: "#323338", g700: "#1f2025",
  w: "#fff", bg: "#f6f7fb",
};
const F = `"Figtree",-apple-system,sans-serif`;
const MO = `"JetBrains Mono",monospace`;
const R = { sm: 4, md: 8, lg: 12, f: 999 };

// ── Icon (from uploaded — path-based) ─────────────────────────
const IC = ({ n, s = 18, c = C.g500 }) => {
  const d = {
    search: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
    download: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3",
    upload: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5",
    plus: "M12 4.5v15m7.5-7.5h-15",
    x: "M6 18L18 6M6 6l12 12",
    chevL: "M15.75 19.5L8.25 12l7.5-7.5",
    chevR: "M8.25 4.5l7.5 7.5-7.5 7.5",
    chevD: "M19.5 8.25l-7.5 7.5-7.5-7.5",
    users: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
    chart: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
    mail: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
    shield: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
    tag: "M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z",
    dollar: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    edit: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10",
    bag: "M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z",
    trending: "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941",
    clock: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
    block: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636",
    check: "M4.5 12.75l6 6 9-13.5",
    note: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
    arrowUp: "M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18",
    arrowDown: "M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3",
    activity: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75",
    globe: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
    layers: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    userPlus: "M15 19.128a9.38 9.38 0 002.625.372A4.125 4.125 0 0021.75 15.75M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM19.5 9.75v3m1.5-1.5h-3",
    ext: "M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25",
  };
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d={d[n] || ""} /></svg>;
};

// ── Shared Components (from uploaded — polished) ──────────────

const Badge = ({ label, color, bg, dot, pulse }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: R.f, fontSize: 11, fontWeight: 600, color, backgroundColor: bg, fontFamily: F, letterSpacing: .2, whiteSpace: "nowrap" }}>
    {dot && <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: color, animation: pulse ? "pulse 2s ease-in-out infinite" : "none" }} />}
    {label}
  </span>
);

const tagPalette = [
  { bg: "#e8f5e9", fg: "#2e7d32" }, { bg: "#e3f2fd", fg: "#1565c0" },
  { bg: "#fce4ec", fg: "#c62828" }, { bg: "#fff3e0", fg: "#e65100" },
  { bg: "#f3e5f5", fg: "#7b1fa2" }, { bg: "#e0f2f1", fg: "#00695c" },
  { bg: "#fff8e1", fg: "#f57f17" }, { bg: "#ede7f6", fg: "#4527a0" },
];
const hashClr = (s) => { let h = 0; for (let i = 0; i < s.length; i++) h = s.charCodeAt(i) + ((h << 5) - h); return tagPalette[Math.abs(h) % tagPalette.length]; };
const TagPill = ({ label, onRemove }) => { const tc = hashClr(label); return <span style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "2px 8px", borderRadius: R.f, fontSize: 11, fontWeight: 500, fontFamily: F, backgroundColor: tc.bg, color: tc.fg, whiteSpace: "nowrap" }}>{label}{onRemove && <span onClick={e => { e.stopPropagation(); onRemove(); }} style={{ cursor: "pointer", opacity: .7 }}>×</span>}</span>; };

const Btn = ({ children, v = "primary", icon, danger, onClick, style: sx = {} }) => {
  const vs = { primary: { bg: danger ? C.err : C.pri, c: "#fff", bd: "none" }, secondary: { bg: "transparent", c: danger ? C.err : C.g600, bd: `1px solid ${danger ? C.err : C.g200}` }, ghost: { bg: "transparent", c: C.g600, bd: "none" } }[v];
  return <button onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: R.md, fontSize: 13, fontWeight: 600, fontFamily: F, cursor: "pointer", backgroundColor: vs.bg, color: vs.c, border: vs.bd || "none", transition: "all .15s", whiteSpace: "nowrap", ...sx }}>{icon && <IC n={icon} s={13} c={vs.c} />}{children}</button>;
};

const Chk = ({ checked, onChange, ind }) => (
  <div onClick={e => { e.stopPropagation(); onChange(!checked); }} style={{ width: 16, height: 16, borderRadius: 3, cursor: "pointer", border: `1.5px solid ${checked || ind ? C.pri : C.g300}`, backgroundColor: checked || ind ? C.pri : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    {checked && <IC n="check" s={11} c="#fff" />}
    {ind && !checked && <div style={{ width: 8, height: 2, backgroundColor: "#fff", borderRadius: 1 }} />}
  </div>
);

const KPI = ({ icon, label, value, trend, color = C.pri }) => (
  <div style={{ flex: 1, minWidth: 130, padding: "14px 16px", backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}` }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
      <div style={{ width: 30, height: 30, borderRadius: R.md, backgroundColor: color + "14", display: "flex", alignItems: "center", justifyContent: "center" }}><IC n={icon} s={15} c={color} /></div>
      {trend !== undefined && <span style={{ fontSize: 11, fontWeight: 600, fontFamily: F, color: trend >= 0 ? C.ok : C.err, display: "flex", alignItems: "center", gap: 2 }}><IC n={trend >= 0 ? "arrowUp" : "arrowDown"} s={11} c={trend >= 0 ? C.ok : C.err} />{Math.abs(trend)}%</span>}
    </div>
    <div style={{ fontSize: 20, fontWeight: 700, color: C.g700, fontFamily: F }}>{value}</div>
    <div style={{ fontSize: 11.5, color: C.g400, fontFamily: F }}>{label}</div>
  </div>
);

const HealthMini = ({ score }) => {
  const color = score > 75 ? C.ok : score > 50 ? C.warn : score > 30 ? C.warnD : C.err;
  return <div style={{ width: 28, height: 28, borderRadius: "50%", border: `2.5px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: color + "10" }}><span style={{ fontSize: 10, fontWeight: 800, color, fontFamily: F }}>{score}</span></div>;
};

const HealthGauge = ({ score }) => {
  const color = score > 75 ? C.ok : score > 50 ? C.warn : score > 30 ? C.warnD : C.err;
  const label = score > 75 ? "Excellent" : score > 50 ? "Good" : score > 30 ? "Fair" : "Poor";
  return <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}><div style={{ width: 68, height: 68, borderRadius: "50%", border: `4px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: color + "10" }}><span style={{ fontSize: 20, fontWeight: 800, color, fontFamily: F }}>{score}</span></div><span style={{ fontSize: 11, fontWeight: 600, color, fontFamily: F, textTransform: "uppercase", letterSpacing: .5 }}>{label}</span></div>;
};

const ProgBar = ({ value, max = 100, color = C.pri, h = 6 }) => (
  <div style={{ width: "100%", backgroundColor: C.g200, borderRadius: R.f, height: h, overflow: "hidden" }}><div style={{ width: `${Math.min((value / max) * 100, 100)}%`, height: "100%", backgroundColor: color, borderRadius: R.f, transition: "width .5s" }} /></div>
);

const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,.45)" }}>
    <div style={{ backgroundColor: C.w, borderRadius: R.lg, boxShadow: "0 20px 40px rgba(0,0,0,.12)", width: 520, maxHeight: "90vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "16px 22px", borderBottom: `1px solid ${C.g200}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}><h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, fontFamily: F }}>{title}</h3><div onClick={onClose} style={{ cursor: "pointer" }}><IC n="x" s={18} c={C.g400} /></div></div>
      <div style={{ padding: 22, overflowY: "auto", flex: 1 }}>{children}</div>
    </div>
  </div>;
};

// ── Status badges (from spec — 6 lifecycle + 4 sub-statuses) ──

const LIFECYCLE = {
  lead: { l: "Lead", c: "#616161", b: "#F5F5F5" },
  installed: { l: "Installed", c: "#1565C0", b: "#E3F2FD" },
  subscribed: { l: "Subscribed", c: "#2E7D32", b: "#E8F5E9" },
  cancelled: { l: "Cancelled", c: "#E65100", b: "#FFF3E0" },
  uninstalled: { l: "Uninstalled", c: "#C62828", b: "#FDECEA" },
  lost: { l: "Lost", c: "#424242", b: "#EEEEEE" },
};
const SUB_STATUS = {
  on_trial: { l: "On Trial", c: "#1565C0", b: "#E3F2FD" },
  active: { l: "Active", c: "#2E7D32", b: "#E8F5E9" },
  past_due: { l: "Past Due", c: "#C62828", b: "#FDECEA" },
  frozen: { l: "Frozen", c: "#616161", b: "#F5F5F5" },
};
const RISK = {
  low: { l: "Low Risk", c: "#2E7D32", b: "#E8F5E9" },
  "6_12_weeks": { l: "6-12 Wks", c: "#F57F17", b: "#FFFDE7" },
  "2_6_weeks": { l: "2-6 Wks", c: "#E65100", b: "#FFF3E0" },
  "0_2_weeks": { l: "0-2 Wks", c: "#C62828", b: "#FDECEA" },
};

const LifeBadge = ({ s }) => { const m = LIFECYCLE[s]; return m ? <Badge label={m.l} color={m.c} bg={m.b} dot /> : null; };
const SubBadge = ({ s }) => { const m = SUB_STATUS[s]; return m ? <Badge label={m.l} color={m.c} bg={m.b} /> : null; };
const RiskBadge = ({ s }) => { const m = RISK[s]; return m ? <Badge label={m.l} color={m.c} bg={m.b} dot pulse={s === "0_2_weeks"} /> : null; };

// ── Data (spec-compliant 10 merchants with full fields) ───────

const FLAGS = { US: "🇺🇸", CA: "🇨🇦", GB: "🇬🇧", AU: "🇦🇺", DE: "🇩🇪", BR: "🇧🇷", FR: "🇫🇷", IN: "🇮🇳", NL: "🇳🇱", JP: "🇯🇵" };

const MERCHANTS = [
  { id: 1, shopName: "Blue Sky Apparel", domain: "bluesky-apparel.myshopify.com", contactName: "Sarah Johnson", email: "sarah@bluesky.com", phone: "+1-555-0123", country: "US", shopifyPlan: "shopify_plus", lifecycle: "subscribed", subStatus: "active", plan: "Growth", planPrice: 99, billing: "monthly", ordersUsed: 3842, orderLimit: 5000, ltv: 594, mrr: 99, edits: 247, edits30d: 31, editRate: 2.3, widgetBoth: true, logins7d: 5, churnTier: "low", churnScore: 0.12, churnFactors: [], installedAt: "Sep 15, 2025", lastActive: "2h ago", tags: ["vip", "shopify_plus"], owner: "eric@ae.com", health: 85, onboardingStep: 4 },
  { id: 2, shopName: "Outdoor Gear Co", domain: "outdoor-gear.myshopify.com", contactName: "Mike Chen", email: "mike@outdoors.com", phone: "+1-555-7890", country: "CA", shopifyPlan: "shopify", lifecycle: "subscribed", subStatus: "active", plan: "Pro", planPrice: 179, billing: "annual", ordersUsed: 7823, orderLimit: 10000, ltv: 1432, mrr: 143, edits: 589, edits30d: 67, editRate: 3.4, widgetBoth: true, logins7d: 3, churnTier: "low", churnScore: 0.08, churnFactors: [], installedAt: "Jun 1, 2025", lastActive: "1d ago", tags: ["annual", "high_volume"], owner: "nilesh@ae.com", health: 92, onboardingStep: 4 },
  { id: 3, shopName: "Fashion Hub", domain: "fashion-hub.myshopify.com", contactName: "Anna Park", email: "anna@fashionhub.com", phone: "+1-555-4567", country: "US", shopifyPlan: "basic", lifecycle: "installed", subStatus: "on_trial", plan: "Starter", planPrice: 39, billing: "monthly", ordersUsed: 45, orderLimit: 1200, ltv: 0, mrr: 0, edits: 3, edits30d: 3, editRate: 6.7, widgetBoth: false, logins7d: 2, churnTier: "6_12_weeks", churnScore: 0.35, churnFactors: ["widget_incomplete", "low_usage"], installedAt: "Mar 10, 2026", lastActive: "4h ago", tags: ["new"], owner: null, health: 42, onboardingStep: 2 },
  { id: 4, shopName: "Tech Gadgets Pro", domain: "tech-gadgets.myshopify.com", contactName: "Raj Patel", email: "raj@techgadgets.com", phone: "+91-9876543210", country: "IN", shopifyPlan: "shopify", lifecycle: "subscribed", subStatus: "past_due", plan: "Growth", planPrice: 99, billing: "monthly", ordersUsed: 2100, orderLimit: 5000, ltv: 297, mrr: 99, edits: 156, edits30d: 0, editRate: 1.9, widgetBoth: true, logins7d: 0, churnTier: "0_2_weeks", churnScore: 0.89, churnFactors: ["payment_failed", "zero_edits_30d", "no_login_7d"], installedAt: "Dec 1, 2025", lastActive: "12d ago", tags: ["dunning"], owner: "eric@ae.com", health: 18, onboardingStep: 4 },
  { id: 5, shopName: "Pet Supply World", domain: "pet-supply.myshopify.com", contactName: "Lisa Wong", email: "lisa@petsupply.com", phone: "+61-412345678", country: "AU", shopifyPlan: "shopify", lifecycle: "cancelled", subStatus: null, plan: null, planPrice: 0, billing: null, ordersUsed: 0, orderLimit: 0, ltv: 198, mrr: 0, edits: 89, edits30d: 0, editRate: 0, widgetBoth: false, logins7d: 0, churnTier: "2_6_weeks", churnScore: 0.62, churnFactors: ["cancelled", "widget_removed"], installedAt: "Aug 20, 2025", lastActive: "45d ago", tags: ["churned"], owner: null, health: 12, onboardingStep: 4 },
  { id: 6, shopName: "Home Decor Studio", domain: "home-decor.myshopify.com", contactName: "Jennifer Lee", email: "jen@homedecor.com", phone: "+1-555-8901", country: "US", shopifyPlan: "shopify_plus", lifecycle: "subscribed", subStatus: "active", plan: "Scale", planPrice: 259, billing: "monthly", ordersUsed: 15200, orderLimit: 20000, ltv: 2072, mrr: 259, edits: 1203, edits30d: 142, editRate: 4.1, widgetBoth: true, logins7d: 7, churnTier: "low", churnScore: 0.05, churnFactors: [], installedAt: "Apr 10, 2025", lastActive: "3h ago", tags: ["vip", "enterprise", "shopify_plus"], owner: "eric@ae.com", health: 95, onboardingStep: 4 },
  { id: 7, shopName: "Book Nook Online", domain: "book-nook.myshopify.com", contactName: "Tom Baker", email: "tom@booknook.com", phone: "+44-7700900000", country: "GB", shopifyPlan: "basic", lifecycle: "uninstalled", subStatus: null, plan: null, planPrice: 0, billing: null, ordersUsed: 0, orderLimit: 0, ltv: 78, mrr: 0, edits: 12, edits30d: 0, editRate: 0, widgetBoth: false, logins7d: 0, churnTier: "0_2_weeks", churnScore: 0.91, churnFactors: ["uninstalled", "low_ltv"], installedAt: "Nov 1, 2025", lastActive: "22d ago", tags: [], owner: null, health: 8, onboardingStep: 2 },
  { id: 8, shopName: "Sportswear Direct", domain: "sportswear.myshopify.com", contactName: "Chris Adams", email: "chris@sportswear.com", phone: "+1-555-2345", country: "US", shopifyPlan: "shopify", lifecycle: "subscribed", subStatus: "active", plan: "Starter", planPrice: 39, billing: "monthly", ordersUsed: 890, orderLimit: 1200, ltv: 156, mrr: 39, edits: 67, edits30d: 8, editRate: 1.8, widgetBoth: true, logins7d: 1, churnTier: "2_6_weeks", churnScore: 0.55, churnFactors: ["declining_usage", "near_limit"], installedAt: "Nov 20, 2025", lastActive: "5d ago", tags: [], owner: "nilesh@ae.com", health: 61, onboardingStep: 4 },
  { id: 9, shopName: "Luxury Watches", domain: "luxury-watches.myshopify.com", contactName: "David Kim", email: "david@luxwatch.com", phone: "+81-3-1234-5678", country: "JP", shopifyPlan: "shopify_plus", lifecycle: "subscribed", subStatus: "active", plan: "Enterprise", planPrice: 499, billing: "annual", ordersUsed: 18500, orderLimit: 50000, ltv: 4988, mrr: 416, edits: 2340, edits30d: 210, editRate: 5.2, widgetBoth: true, logins7d: 6, churnTier: "low", churnScore: 0.03, churnFactors: [], installedAt: "Jan 15, 2025", lastActive: "6h ago", tags: ["vip", "enterprise", "annual"], owner: "eric@ae.com", health: 98, onboardingStep: 4 },
  { id: 10, shopName: "Green Garden Supply", domain: "green-garden.myshopify.com", contactName: "Maria Garcia", email: "maria@greengarden.com", phone: "+55-11-98765-4321", country: "BR", shopifyPlan: "basic", lifecycle: "installed", subStatus: "on_trial", plan: "Starter", planPrice: 39, billing: "monthly", ordersUsed: 0, orderLimit: 1200, ltv: 0, mrr: 0, edits: 0, edits30d: 0, editRate: 0, widgetBoth: false, logins7d: 0, churnTier: "0_2_weeks", churnScore: 0.82, churnFactors: ["zero_edits", "no_widget", "no_login_7d"], installedAt: "Mar 18, 2026", lastActive: "3d ago", tags: [], owner: null, health: 5, onboardingStep: 1 },
];

const MILESTONES = [
  { key: "installed", label: "Installed", done: true, desc: "App installed" },
  { key: "trial", label: "Trial Started", done: true, desc: "14-day trial" },
  { key: "widget", label: "Widget Added", done: true, desc: "Both pages" },
  { key: "first_edit", label: "First Edit", done: true, desc: "Order edited" },
  { key: "subscribed", label: "Subscribed", done: true, desc: "Paid plan" },
  { key: "upgrade", label: "Upgraded", done: true, desc: "Plan change" },
  { key: "milestone", label: "100 Edits", done: false, desc: "Edit milestone" },
  { key: "annual", label: "Annual Plan", done: false, desc: "Billing switch" },
  { key: "review", label: "Review", done: false, desc: "App Store" },
  { key: "referral", label: "Referral", done: false, desc: "Referred store" },
];

const TIMELINE = [
  { icon: "mail", color: "#2196F3", text: "Opened: \"Your Growth plan is live\"", time: "2h ago" },
  { icon: "activity", color: "#607D8B", text: "Dashboard login", time: "3h ago" },
  { icon: "trending", color: "#FFD600", text: "Reached 250 order edits", time: "1d ago" },
  { icon: "mail", color: "#9E9E9E", text: "Sent: \"Month 1 Impact Summary\"", time: "2d ago" },
  { icon: "dollar", color: "#FF9800", text: "Upgraded from Starter to Growth", time: "5d ago" },
  { icon: "dollar", color: "#43A047", text: "Payment processed — $99.00", time: "15d ago" },
  { icon: "edit", color: "#00BCD4", text: "Added widget to both pages", time: "20d ago" },
  { icon: "check", color: "#4CAF50", text: "Started 14-day trial on Starter", time: "34d ago" },
  { icon: "download", color: "#2196F3", text: "Installed Account Editor", time: "34d ago" },
];

const ORDERS = [
  { id: "#6258963214587", cust: "Leon Wanner", created: "Feb 15, 2026", status: "UNFULFILLED", edits: 3 },
  { id: "#6258963298546", cust: "Mia Reeves", created: "Feb 16, 2026", status: "PARTIALLY FULFILLED", edits: 1 },
  { id: "#6258963274985", cust: "Aisha Patel", created: "Feb 18, 2026", status: "ON HOLD", edits: 2 },
  { id: "#6258963287594", cust: "Jake Torres", created: "Feb 20, 2026", status: "FULFILLED", edits: 1 },
  { id: "#6258963213265", cust: "Emma Liu", created: "Feb 21, 2026", status: "UNFULFILLED", edits: 5 },
];

const EMAILS = [
  { name: "Welcome to Account Editor", trigger: "T01", status: "Opened", date: "Mar 15" },
  { name: "Plan Fit — Growth looks right", trigger: "T13", status: "Opened", date: "Mar 10" },
  { name: "Day 7: Feature overview", trigger: "T12", status: "Clicked", date: "Mar 8" },
  { name: "Your first edit just happened!", trigger: "T09", status: "Opened", date: "Mar 5" },
  { name: "Day 3: Stores like yours", trigger: "T10A", status: "Opened", date: "Mar 3" },
  { name: "Your 14-day trial is live", trigger: "T05", status: "Opened", date: "Mar 1" },
];

const SEGMENTS = [
  { name: "High-Value At-Risk", count: 2, cond: "mrr ≥ 99 AND risk in [0-2wk, 2-6wk]" },
  { name: "Trial Converting", count: 1, cond: "on_trial AND days ≤ 3 AND onboarding complete" },
  { name: "Expansion Ready", count: 3, cond: "usage ≥ 80% AND cycles ≥ 2 AND risk = low" },
  { name: "Win-Back Candidates", count: 1, cond: "Uninstalled AND ltv ≥ 50 AND days ≤ 30" },
  { name: "Zero-Edit Trial", count: 1, cond: "on_trial AND edits = 0 AND days ≥ 7" },
  { name: "Annual Upgrade Targets", count: 2, cond: "monthly AND cycles ≥ 3 AND risk = low" },
  { name: "New This Week", count: 2, cond: "installedAt in last 7 days" },
  { name: "Frozen Stores", count: 0, cond: "subStatus = frozen" },
];

// ── Filter (from uploaded — multi-select chips) ───────────────

const FilterChip = ({ label, options, sel, onChange }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <div onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: R.md, border: `1px solid ${sel.length > 0 ? C.pri : C.g200}`, backgroundColor: sel.length > 0 ? C.priL : C.w, cursor: "pointer", fontSize: 12, fontFamily: F, fontWeight: 500, color: sel.length > 0 ? C.pri : C.g500 }}>
        {label}{sel.length > 0 && ` (${sel.length})`}<IC n="chevD" s={11} c={sel.length > 0 ? C.pri : C.g400} />
      </div>
      {open && <>
        <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 98 }} />
        <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 99, backgroundColor: C.w, borderRadius: R.md, border: `1px solid ${C.g200}`, boxShadow: "0 10px 24px rgba(0,0,0,.08)", minWidth: 170, padding: "5px 0", maxHeight: 220, overflowY: "auto" }}>
          {options.map(o => (
            <div key={o} onClick={() => onChange(sel.includes(o) ? sel.filter(x => x !== o) : [...sel, o])} style={{ padding: "6px 11px", fontSize: 12, fontFamily: F, display: "flex", alignItems: "center", gap: 7, cursor: "pointer", backgroundColor: sel.includes(o) ? C.g100 : "transparent", color: C.g600 }}>
              <Chk checked={sel.includes(o)} onChange={() => {}} />{o}
            </div>
          ))}
        </div>
      </>}
    </div>
  );
};

// ── Segment Drawer (from this thread — AND/OR logic) ──────────

const SegDrawer = ({ onClose }) => {
  const [groups, setGroups] = useState([[{ dim: "lifecycle", op: "is", val: "" }]]);
  return <>
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.3)", zIndex: 999 }} onClick={onClose} />
    <div style={{ position: "fixed", top: 0, right: 0, width: 460, height: "100vh", background: "#fff", borderLeft: `1px solid ${C.g200}`, boxShadow: "-4px 0 24px rgba(0,0,0,.1)", zIndex: 1000, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.g200}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}><h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: F }}>Segment Builder</h3><div onClick={onClose} style={{ cursor: "pointer" }}><IC n="x" s={18} c={C.g400} /></div></div>
      <div style={{ flex: 1, overflow: "auto", padding: 20 }}>
        <div style={{ marginBottom: 14 }}><label style={{ fontSize: 12, fontWeight: 600, fontFamily: F, display: "block", marginBottom: 5 }}>Name</label><input style={{ width: "100%", padding: "7px 10px", border: `1px solid ${C.g200}`, borderRadius: R.sm, fontSize: 13, fontFamily: F }} placeholder="e.g. High-Value At-Risk" /></div>
        <label style={{ fontSize: 12, fontWeight: 600, fontFamily: F, display: "block", marginBottom: 8 }}>Conditions</label>
        {groups.map((group, gi) => (
          <div key={gi}>
            {gi > 0 && <div style={{ textAlign: "center", padding: "8px 0", fontSize: 11, fontWeight: 600, color: C.pri, textTransform: "uppercase" }}>— OR —</div>}
            <div style={{ border: `1px solid ${C.g200}`, borderRadius: R.md, padding: 14, marginBottom: 12, background: C.g100 }}>
              {group.map((cond, ci) => (
                <div key={ci} style={{ display: "flex", gap: 6, marginBottom: 8, alignItems: "center" }}>
                  <select style={{ padding: "5px 8px", border: `1px solid ${C.g200}`, borderRadius: R.sm, fontSize: 12, fontFamily: F, minWidth: 120 }}>
                    <option>Lifecycle Status</option><option>Sub Status</option><option>Plan</option><option>Plan Price</option><option>Churn Risk</option><option>Country</option><option>Orders Used</option><option>Total Edits</option><option>Tags</option><option>Last Active</option>
                  </select>
                  <select style={{ padding: "5px 8px", border: `1px solid ${C.g200}`, borderRadius: R.sm, fontSize: 12, fontFamily: F }}>
                    <option>is</option><option>is not</option><option>{">"}</option><option>{"<"}</option><option>contains</option><option>in last N days</option>
                  </select>
                  <input style={{ padding: "5px 8px", border: `1px solid ${C.g200}`, borderRadius: R.sm, fontSize: 12, fontFamily: F, width: 100 }} placeholder="Value" />
                </div>
              ))}
              <div onClick={() => { const g = [...groups]; g[gi].push({ dim: "", op: "is", val: "" }); setGroups(g); }} style={{ fontSize: 12, color: C.pri, cursor: "pointer", fontWeight: 500, fontFamily: F }}>+ AND condition</div>
            </div>
          </div>
        ))}
        <div onClick={() => setGroups([...groups, [{ dim: "", op: "is", val: "" }]])} style={{ fontSize: 12, fontFamily: F }}><Btn v="secondary" style={{ padding: "5px 10px", fontSize: 12 }}>+ OR Group</Btn></div>
        <div style={{ marginTop: 24 }}>
          <label style={{ fontSize: 12, fontWeight: 600, fontFamily: F, display: "block", marginBottom: 8 }}>Pre-Built Segments</label>
          {SEGMENTS.map(s => (
            <div key={s.name} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.g200}` }}>
              <div><div style={{ fontSize: 13, fontWeight: 600, fontFamily: F }}>{s.name}</div><div style={{ fontSize: 10.5, color: C.g400, fontFamily: F }}>{s.cond}</div></div>
              <Badge label={String(s.count)} color={C.g500} bg={C.g100} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "12px 20px", borderTop: `1px solid ${C.g200}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: C.pri, fontFamily: F }}>~{MERCHANTS.length} match</span>
        <div style={{ display: "flex", gap: 6 }}><Btn v="secondary" onClick={onClose}>Cancel</Btn><Btn onClick={onClose}>Save Segment</Btn></div>
      </div>
    </div>
  </>;
};

// ── Customer List ─────────────────────────────────────────────

const CustomerList = ({ onSelect }) => {
  const [search, setSearch] = useState("");
  const [selRows, setSelRows] = useState(new Set());
  const [f, setF] = useState({ lifecycle: [], plan: [], risk: [], country: [] });
  const [segOpen, setSegOpen] = useState(false);

  const filtered = MERCHANTS.filter(m => {
    if (search && !m.shopName.toLowerCase().includes(search.toLowerCase()) && !m.domain.toLowerCase().includes(search.toLowerCase()) && !m.contactName.toLowerCase().includes(search.toLowerCase())) return false;
    if (f.lifecycle.length && !f.lifecycle.includes(m.lifecycle)) return false;
    if (f.plan.length && !f.plan.includes(m.plan)) return false;
    if (f.risk.length && !f.risk.includes(m.churnTier)) return false;
    if (f.country.length && !f.country.includes(m.country)) return false;
    return true;
  });

  const allSel = selRows.size === filtered.length && filtered.length > 0;
  const someSel = selRows.size > 0;
  const toggle = id => { const n = new Set(selRows); n.has(id) ? n.delete(id) : n.add(id); setSelRows(n); };
  const toggleAll = () => setSelRows(allSel ? new Set() : new Set(filtered.map(m => m.id)));

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, fontFamily: F, color: C.g700 }}>Customers</h1>
          <Badge label={`${MERCHANTS.length} merchants`} color={C.g500} bg={C.g100} />
        </div>
        <div style={{ display: "flex", gap: 7 }}>
          <Btn v="secondary" icon="layers" onClick={() => setSegOpen(true)}>Segments</Btn>
          <Btn v="secondary" icon="download">Export</Btn>
          {someSel && <Btn v="secondary" icon="tag">Bulk ({selRows.size})</Btn>}
          <Btn icon="plus">Add Lead</Btn>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, flex: 1, maxWidth: 340, padding: "6px 10px", borderRadius: R.md, border: `1px solid ${C.g200}`, backgroundColor: C.w }}>
          <IC n="search" s={14} c={C.g400} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search merchants..." style={{ border: "none", outline: "none", flex: 1, fontSize: 13, fontFamily: F, color: C.g600, background: "transparent" }} />
          {search && <div onClick={() => setSearch("")} style={{ cursor: "pointer" }}><IC n="x" s={13} c={C.g400} /></div>}
        </div>
      </div>
      <div style={{ display: "flex", gap: 7, marginBottom: 14, flexWrap: "wrap" }}>
        <FilterChip label="Status" options={["subscribed", "installed", "cancelled", "uninstalled", "lost", "lead"]} sel={f.lifecycle} onChange={v => setF(p => ({ ...p, lifecycle: v }))} />
        <FilterChip label="Plan" options={["Starter", "Growth", "Pro", "Scale", "Enterprise"]} sel={f.plan} onChange={v => setF(p => ({ ...p, plan: v }))} />
        <FilterChip label="Risk" options={["low", "6_12_weeks", "2_6_weeks", "0_2_weeks"]} sel={f.risk} onChange={v => setF(p => ({ ...p, risk: v }))} />
        <FilterChip label="Country" options={["US", "CA", "GB", "AU", "DE", "BR", "IN", "JP"]} sel={f.country} onChange={v => setF(p => ({ ...p, country: v }))} />
        {Object.values(f).some(x => x.length > 0) && (
          <span onClick={() => setF({ lifecycle: [], plan: [], risk: [], country: [] })} style={{ fontSize: 11, color: C.pri, cursor: "pointer", fontFamily: F, fontWeight: 500, alignSelf: "center" }}>Clear all</span>
        )}
      </div>
      <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.g200}`, backgroundColor: C.g100 }}>
              <th style={{ padding: "9px 10px", width: 36 }}><Chk checked={allSel} ind={someSel && !allSel} onChange={toggleAll} /></th>
              {["Store", "Status", "Plan", "MRR", "Health", "Risk", "Orders", "Last Active", "Country"].map(h => (
                <th key={h} style={{ padding: "9px 10px", textAlign: "left", fontSize: 10.5, fontWeight: 600, color: C.g400, fontFamily: F, textTransform: "uppercase", letterSpacing: .3 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(m => {
              const pct = m.orderLimit > 0 ? Math.round((m.ordersUsed / m.orderLimit) * 100) : 0;
              return (
                <tr key={m.id} onClick={() => onSelect(m)} style={{ borderBottom: `1px solid ${C.g100}`, cursor: "pointer", backgroundColor: selRows.has(m.id) ? C.priL : "transparent", transition: "background .1s" }}
                  onMouseEnter={e => { if (!selRows.has(m.id)) e.currentTarget.style.backgroundColor = C.g100; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = selRows.has(m.id) ? C.priL : "transparent"; }}>
                  <td style={{ padding: "9px 10px" }} onClick={e => e.stopPropagation()}><Chk checked={selRows.has(m.id)} onChange={() => toggle(m.id)} /></td>
                  <td style={{ padding: "9px 10px" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.g700, fontFamily: F }}>{m.shopName}</div>
                    <div style={{ fontSize: 11, color: C.g400, fontFamily: F }}>{FLAGS[m.country] || ""} {m.domain}</div>
                  </td>
                  <td style={{ padding: "9px 10px" }}>
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                      <LifeBadge s={m.lifecycle} />
                      {m.subStatus && <SubBadge s={m.subStatus} />}
                    </div>
                  </td>
                  <td style={{ padding: "9px 10px" }}>
                    {m.plan ? <span style={{ fontSize: 12, fontWeight: 600, fontFamily: F, color: C.g700 }}>{m.plan} <span style={{ color: C.g400, fontWeight: 400 }}>${m.planPrice}/mo</span></span> : <span style={{ fontSize: 12, color: C.g400 }}>—</span>}
                  </td>
                  <td style={{ padding: "9px 10px", fontWeight: 600, fontFamily: MO, fontSize: 12 }}>{m.mrr > 0 ? `$${m.mrr}` : "—"}</td>
                  <td style={{ padding: "9px 10px" }}><HealthMini score={m.health} /></td>
                  <td style={{ padding: "9px 10px" }}><RiskBadge s={m.churnTier} /></td>
                  <td style={{ padding: "9px 10px" }}>
                    {m.orderLimit > 0 && <>
                      <div style={{ width: 60, height: 5, backgroundColor: C.g200, borderRadius: 3, overflow: "hidden", marginBottom: 2 }}><div style={{ width: `${pct}%`, height: "100%", backgroundColor: pct >= 90 ? C.err : pct >= 70 ? C.warn : C.pri, borderRadius: 3 }} /></div>
                      <span style={{ fontSize: 10, color: C.g400, fontFamily: MO }}>{pct}%</span>
                    </>}
                    {m.orderLimit === 0 && <span style={{ fontSize: 12, color: C.g400 }}>—</span>}
                  </td>
                  <td style={{ padding: "9px 10px", fontSize: 12, color: C.g500, fontFamily: F }}>{m.lastActive}</td>
                  <td style={{ padding: "9px 10px", fontSize: 12 }}>{FLAGS[m.country] || ""} {m.country}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ padding: "10px 14px", borderTop: `1px solid ${C.g200}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: C.g400, fontFamily: F }}>Showing {filtered.length} of {MERCHANTS.length}</span>
          <div style={{ display: "flex", gap: 3 }}>
            {[1, 2, 3].map(p => <button key={p} style={{ width: 28, height: 28, border: `1px solid ${p === 1 ? C.pri : C.g200}`, borderRadius: R.sm, cursor: "pointer", fontSize: 12, fontFamily: F, backgroundColor: p === 1 ? C.pri : C.w, color: p === 1 ? "#fff" : C.g500, fontWeight: p === 1 ? 600 : 400 }}>{p}</button>)}
          </div>
        </div>
      </div>
      {segOpen && <SegDrawer onClose={() => setSegOpen(false)} />}
    </div>
  );
};

// ── Customer 360° Detail ──────────────────────────────────────

const Detail = ({ store: m, onBack }) => {
  const [tab, setTab] = useState("overview");
  const [blockModal, setBlockModal] = useState(false);
  const pct = m.orderLimit > 0 ? Math.round((m.ordersUsed / m.orderLimit) * 100) : 0;
  const initials = m.shopName.split(" ").map(w => w[0]).join("").slice(0, 2);
  const lcColor = LIFECYCLE[m.lifecycle]?.c || "#999";

  const tabs = [
    { k: "overview", l: "Overview" },
    { k: "orders", l: "Orders" },
    { k: "emails", l: "Emails" },
    { k: "metrics", l: "Usage" },
    { k: "notes", l: "Notes & Tags" },
  ];

  return (
    <div>
      {/* Back + Quick Actions */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div onClick={onBack} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.g500, fontFamily: F }}><IC n="chevL" s={16} c={C.g500} /> Back to Customers</div>
        <div style={{ display: "flex", gap: 6 }}>
          <Btn v="secondary" icon="note" style={{ padding: "5px 10px", fontSize: 12 }}>Note</Btn>
          <Btn v="secondary" icon="tag" style={{ padding: "5px 10px", fontSize: 12 }}>Tag</Btn>
          <Btn v="secondary" icon="mail" style={{ padding: "5px 10px", fontSize: 12 }}>Email</Btn>
          <Btn v="secondary" icon="userPlus" style={{ padding: "5px 10px", fontSize: 12 }}>Assign</Btn>
          <Btn v="secondary" icon="ext" style={{ padding: "5px 10px", fontSize: 12 }}>Shopify</Btn>
          <Btn v="secondary" icon="block" danger={m.lifecycle !== "uninstalled"} style={{ padding: "5px 10px", fontSize: 12 }} onClick={() => setBlockModal(true)}>Block</Btn>
        </div>
      </div>

      {/* Header Card */}
      <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: "18px 22px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", backgroundColor: lcColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "#fff", fontFamily: F }}>{initials}</div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, fontFamily: F, color: C.g700 }}>{m.shopName}</div>
            <div style={{ fontSize: 12, color: C.g400, fontFamily: MO }}>{m.domain}</div>
            <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
              <LifeBadge s={m.lifecycle} />
              {m.subStatus && <SubBadge s={m.subStatus} />}
              <RiskBadge s={m.churnTier} />
            </div>
          </div>
        </div>
        <HealthGauge score={m.health} />
      </div>

      {/* KPI Strip */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <KPI icon="dollar" label="Lifetime Value" value={`$${m.ltv.toLocaleString()}`} color={C.ok} />
        <KPI icon="trending" label="Current MRR" value={m.mrr > 0 ? `$${m.mrr}` : "—"} color={C.pri} />
        <KPI icon="bag" label="Plan" value={m.plan ? `${m.plan} / $${m.planPrice}` : "—"} color={C.purp} />
        <KPI icon="chart" label="Orders" value={m.orderLimit > 0 ? `${m.ordersUsed.toLocaleString()} / ${m.orderLimit.toLocaleString()} (${pct}%)` : "—"} color={C.ind} />
        <KPI icon="clock" label="First Seen" value={m.installedAt} color={C.g400} />
        <KPI icon="activity" label="Last Active" value={m.lastActive} color={m.logins7d > 0 ? C.ok : C.err} />
      </div>

      {/* Contact + Plan Info */}
      <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: "14px 18px", marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {[
            { l: "Contact", v: m.contactName },
            { l: "Email", v: m.email },
            { l: "Phone", v: m.phone },
            { l: "Country", v: `${FLAGS[m.country] || ""} ${m.country}` },
            { l: "Shopify Plan", v: m.shopifyPlan },
            { l: "Billing", v: m.billing || "—" },
            { l: "Owner", v: m.owner || "Unassigned" },
          ].map(f => (
            <div key={f.l} style={{ minWidth: 100 }}>
              <div style={{ fontSize: 11, color: C.g400, fontFamily: F, marginBottom: 2 }}>{f.l}</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: C.g700, fontFamily: F }}>{f.v}</div>
            </div>
          ))}
        </div>
        {m.tags.length > 0 && <div style={{ display: "flex", gap: 5, marginTop: 10, alignItems: "center" }}><span style={{ fontSize: 11, color: C.g400, fontFamily: F }}>Tags:</span>{m.tags.map(t => <TagPill key={t} label={t} />)}</div>}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, borderBottom: `2px solid ${C.g200}`, marginBottom: 14 }}>
        {tabs.map(t => (
          <div key={t.k} onClick={() => setTab(t.k)} style={{ padding: "9px 18px", fontSize: 13, fontWeight: tab === t.k ? 600 : 400, color: tab === t.k ? C.pri : C.g400, borderBottom: tab === t.k ? `2px solid ${C.pri}` : "2px solid transparent", marginBottom: -2, cursor: "pointer", fontFamily: F, transition: "all .15s" }}>{t.l}</div>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {tab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Customer Journey */}
            <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: "16px" }}>
              <h4 style={{ margin: "0 0 14px 0", fontSize: 13, fontWeight: 600, color: C.g600, fontFamily: F }}>Customer Journey</h4>
              <div style={{ display: "flex", gap: 0, position: "relative", overflowX: "auto", padding: "0 10px" }}>
                <div style={{ position: "absolute", top: 14, left: 10, right: 10, height: 2, background: C.g300, zIndex: 0 }} />
                {MILESTONES.map(ms => (
                  <div key={ms.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 70, position: "relative", zIndex: 1 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: ms.done ? C.g600 : C.w, border: `2.5px solid ${C.g600}`, marginBottom: 8 }} />
                    <div style={{ fontSize: 10, fontWeight: 600, color: ms.done ? C.g600 : C.g400, fontFamily: F, textAlign: "center" }}>{ms.label}</div>
                    <div style={{ fontSize: 9, color: C.g400, fontFamily: F, textAlign: "center", marginTop: 2 }}>{ms.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Activity Timeline */}
            <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: 16 }}>
              <h4 style={{ margin: "0 0 14px 0", fontSize: 13, fontWeight: 600, color: C.g600, fontFamily: F }}>Activity Timeline</h4>
              {TIMELINE.map((ev, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < TIMELINE.length - 1 ? `1px solid ${C.g100}` : "none" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: ev.color, marginTop: 5, flexShrink: 0 }} />
                  <div style={{ flex: 1, fontSize: 13, color: C.g600, fontFamily: F }}>{ev.text}</div>
                  <div style={{ fontSize: 11, color: C.g400, fontFamily: F, flexShrink: 0 }}>{ev.time}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Right sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Subscription Card */}
            <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: 16 }}>
              <h4 style={{ margin: "0 0 12px 0", fontSize: 13, fontWeight: 600, color: C.g600, fontFamily: F }}>Subscription</h4>
              {[["Plan", m.plan ? `${m.plan} — $${m.planPrice}/mo` : "—"], ["Status", m.subStatus || "—"], ["Billing", m.billing || "—"], ["Renewal", "April 15, 2026"], ["Usage", m.orderLimit > 0 ? `${m.ordersUsed.toLocaleString()} / ${m.orderLimit.toLocaleString()} (${pct}%)` : "—"], ["Shopify", m.shopifyPlan], ["Country", `${FLAGS[m.country] || ""} ${m.country}`], ["Installed", m.installedAt], ["Owner", m.owner || "Unassigned"]].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${C.g100}`, fontSize: 12, fontFamily: F }}><span style={{ color: C.g400 }}>{l}</span><span style={{ color: C.g700, fontWeight: 600 }}>{v}</span></div>
              ))}
            </div>
            {/* Churn Risk */}
            {m.churnFactors.length > 0 && (
              <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: 16 }}>
                <h4 style={{ margin: "0 0 10px 0", fontSize: 13, fontWeight: 600, color: C.g600, fontFamily: F }}>Churn Risk</h4>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}><RiskBadge s={m.churnTier} /><span style={{ fontSize: 12, color: C.g400, fontFamily: MO }}>Score: {m.churnScore.toFixed(2)}</span></div>
                {m.churnFactors.map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 0", fontSize: 12, fontFamily: F, color: C.g600 }}><IC n="shield" s={12} c={C.err} /> {f.replace(/_/g, " ")}</div>
                ))}
              </div>
            )}
            {/* Onboarding */}
            <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: 16 }}>
              <h4 style={{ margin: "0 0 10px 0", fontSize: 13, fontWeight: 600, color: C.g600, fontFamily: F }}>Onboarding</h4>
              <ProgBar value={m.onboardingStep} max={4} color={m.onboardingStep === 4 ? C.ok : C.pri} h={8} />
              <div style={{ fontSize: 11, color: C.g400, fontFamily: F, marginTop: 4 }}>{m.onboardingStep}/4 steps complete</div>
            </div>
          </div>
        </div>
      )}

      {/* ORDERS TAB */}
      {tab === "orders" && (
        <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}` }}>
          <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.g200}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h4 style={{ margin: 0, fontSize: 13, fontWeight: 600, color: C.g600, fontFamily: F }}>Orders History</h4>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: `1px solid ${C.g200}` }}>{["Order ID", "Customer", "Created", "Status", "Edits"].map(h => <th key={h} style={{ padding: "9px 14px", textAlign: "left", fontSize: 11, fontWeight: 600, color: C.g400, fontFamily: F, textTransform: "uppercase" }}>{h}</th>)}</tr></thead>
            <tbody>{ORDERS.map((o, i) => {
              const stC = { UNFULFILLED: { c: "#c62828", b: "#ffebee" }, "PARTIALLY FULFILLED": { c: C.g500, b: C.g100 }, "ON HOLD": { c: "#e65100", b: "#fff3e0" }, FULFILLED: { c: "#2e7d32", b: "#e8f5e9" } }[o.status] || { c: C.g500, b: C.g100 };
              return <tr key={i} style={{ borderBottom: `1px solid ${C.g100}` }}>
                <td style={{ padding: "10px 14px", fontSize: 13, fontFamily: MO, color: C.g600 }}>{o.id}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, fontFamily: F, color: C.g600 }}>{o.cust}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, fontFamily: F, color: C.g400 }}>{o.created}</td>
                <td style={{ padding: "10px 14px" }}><Badge label={o.status} color={stC.c} bg={stC.b} /></td>
                <td style={{ padding: "10px 14px", fontSize: 12, fontWeight: 600, fontFamily: F }}>{o.edits}</td>
              </tr>;
            })}</tbody>
          </table>
        </div>
      )}

      {/* EMAILS TAB */}
      {tab === "emails" && (
        <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}` }}>
          <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.g200}` }}>
            <h4 style={{ margin: 0, fontSize: 13, fontWeight: 600, color: C.g600, fontFamily: F }}>Emails Sent</h4>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: `1px solid ${C.g200}` }}>{["Date", "Subject", "Trigger", "Status"].map(h => <th key={h} style={{ padding: "9px 14px", textAlign: "left", fontSize: 11, fontWeight: 600, color: C.g400, fontFamily: F, textTransform: "uppercase" }}>{h}</th>)}</tr></thead>
            <tbody>{EMAILS.map((e, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${C.g100}` }}>
                <td style={{ padding: "9px 14px", fontSize: 12, color: C.g400, fontFamily: F }}>{e.date}</td>
                <td style={{ padding: "9px 14px", fontSize: 13, fontWeight: 500, fontFamily: F, color: C.g600 }}>{e.name}</td>
                <td style={{ padding: "9px 14px" }}><span style={{ fontFamily: MO, fontSize: 11, color: C.g400, padding: "2px 6px", backgroundColor: C.g100, borderRadius: R.sm }}>{e.trigger}</span></td>
                <td style={{ padding: "9px 14px" }}><Badge label={e.status} color={e.status === "Clicked" ? "#1565c0" : e.status === "Opened" ? "#2e7d32" : C.g500} bg={e.status === "Clicked" ? "#e3f2fd" : e.status === "Opened" ? "#e8f5e9" : C.g100} /></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}

      {/* USAGE TAB */}
      {tab === "metrics" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", gap: 10 }}>
            <KPI icon="edit" label="Edits This Month" value={String(m.edits30d)} trend={12} color={C.ind} />
            <KPI icon="bag" label="Orders Used" value={m.ordersUsed.toLocaleString()} color={C.pri} />
            <KPI icon="clock" label="Edit Rate" value={`${m.editRate}%`} color={C.warn} />
            <KPI icon="chart" label="Logins (7d)" value={String(m.logins7d)} color={C.ok} />
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            <div style={{ flex: 1, backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: 18 }}>
              <h4 style={{ margin: "0 0 14px", fontSize: 13, fontWeight: 600, color: C.g600, fontFamily: F }}>Order Volume</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[["Used", m.ordersUsed.toLocaleString()], ["Limit", m.orderLimit.toLocaleString()], ["Usage", `${pct}%`], ["Cycle Resets", "Apr 15"]].map(([l, v]) => (
                  <div key={l}><div style={{ fontSize: 11, color: C.g400, fontFamily: F }}>{l}</div><div style={{ fontSize: 18, fontWeight: 700, fontFamily: F }}>{v}</div></div>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: 18 }}>
              <h4 style={{ margin: "0 0 14px", fontSize: 13, fontWeight: 600, color: C.g600, fontFamily: F }}>Edit Tracking</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[["Total", String(m.edits)], ["Last 30d", String(m.edits30d)], ["Rate", `${m.editRate}%`], ["Widget", m.widgetBoth ? "Both Pages ✓" : "Incomplete ✕"]].map(([l, v]) => (
                  <div key={l}><div style={{ fontSize: 11, color: C.g400, fontFamily: F }}>{l}</div><div style={{ fontSize: 18, fontWeight: 700, fontFamily: F, color: v.includes("✕") ? C.err : C.g700 }}>{v}</div></div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: 18 }}>
            <h4 style={{ margin: "0 0 14px", fontSize: 13, fontWeight: 600, color: C.g600, fontFamily: F }}>Onboarding Progress</h4>
            <div style={{ display: "flex", gap: 16 }}>
              {["Install App", "Approve Trial", "Add Widget", "First Edit"].map((step, i) => {
                const done = i < m.onboardingStep;
                return <div key={step} style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 16, background: done ? C.ok : C.g200, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 6px", fontSize: 14, fontWeight: 600, fontFamily: F }}>{done ? "✓" : i + 1}</div>
                  <div style={{ fontSize: 11, color: done ? C.ok : C.g400, fontWeight: 500, fontFamily: F }}>{step}</div>
                </div>;
              })}
            </div>
          </div>
        </div>
      )}

      {/* NOTES & TAGS TAB */}
      {tab === "notes" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 16 }}>
          <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}><h4 style={{ margin: 0, fontSize: 13, fontWeight: 600, color: C.g600, fontFamily: F }}>Notes</h4><Btn style={{ padding: "4px 10px", fontSize: 12 }} icon="plus">Add Note</Btn></div>
            {[
              { author: "Eric", text: "Discussed upgrade to Growth plan. Interested but wants Month 1 data first.", time: "5d ago" },
              { author: "Nilesh", text: "Helped configure widget on custom theme. Resolved via Crisp.", time: "12d ago" },
            ].map((n, i) => (
              <div key={i} style={{ padding: "12px 0", borderBottom: `1px solid ${C.g100}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ fontSize: 12, fontWeight: 600, color: C.pri, fontFamily: F }}>{n.author}</span><span style={{ fontSize: 11, color: C.g400, fontFamily: F }}>{n.time}</span></div>
                <div style={{ fontSize: 13, color: C.g600, fontFamily: F, lineHeight: 1.5 }}>{n.text}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: 16 }}>
              <h4 style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 600, color: C.g600, fontFamily: F }}>Tags</h4>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 8 }}>{m.tags.map(t => <TagPill key={t} label={t} onRemove={() => {}} />)}</div>
              <input style={{ width: "100%", padding: "6px 10px", border: `1px solid ${C.g200}`, borderRadius: R.sm, fontSize: 12, fontFamily: F }} placeholder="Add tag..." />
            </div>
            <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: 16 }}>
              <h4 style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 600, color: C.g600, fontFamily: F }}>Custom Fields</h4>
              {[["NPS Score", "8"], ["Industry", "Fashion"], ["Account Tier", "Standard"]].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${C.g100}`, fontSize: 12, fontFamily: F }}><span style={{ color: C.g400 }}>{l}</span><span style={{ color: C.g700, fontWeight: 600 }}>{v}</span></div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Modal open={blockModal} onClose={() => setBlockModal(false)} title="Block Store">
        <div style={{ fontFamily: F }}>
          <p style={{ fontSize: 14, color: C.g600, lineHeight: 1.6 }}>Block {m.domain}? The merchant will immediately lose access.</p>
          <label style={{ fontSize: 12, fontWeight: 500, color: C.g500, marginTop: 14, display: "block" }}>Reason (optional)</label>
          <textarea style={{ width: "100%", marginTop: 5, padding: 9, borderRadius: R.md, border: `1px solid ${C.g200}`, fontSize: 13, fontFamily: F, resize: "vertical", minHeight: 55 }} placeholder="Payment dispute" />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 7, marginTop: 18 }}><Btn v="secondary" onClick={() => setBlockModal(false)}>Cancel</Btn><Btn danger>Block Store</Btn></div>
        </div>
      </Modal>
    </div>
  );
};

// ── Churn Risk Dashboard ──────────────────────────────────────

const ChurnDash = ({ onSelect }) => {
  const atRisk = MERCHANTS.filter(m => ["0_2_weeks", "2_6_weeks"].includes(m.churnTier));
  const atRiskMRR = atRisk.reduce((s, m) => s + m.mrr, 0);
  const tiers = [
    { id: "low", ...RISK.low, count: MERCHANTS.filter(m => m.churnTier === "low").length },
    { id: "6_12_weeks", ...RISK["6_12_weeks"], count: MERCHANTS.filter(m => m.churnTier === "6_12_weeks").length },
    { id: "2_6_weeks", ...RISK["2_6_weeks"], count: MERCHANTS.filter(m => m.churnTier === "2_6_weeks").length },
    { id: "0_2_weeks", ...RISK["0_2_weeks"], count: MERCHANTS.filter(m => m.churnTier === "0_2_weeks").length },
  ];
  const sorted = [...MERCHANTS].sort((a, b) => b.churnScore - a.churnScore);

  return (
    <div>
      <h1 style={{ margin: "0 0 18px", fontSize: 20, fontWeight: 700, fontFamily: F, color: C.g700, display: "flex", alignItems: "center", gap: 8 }}><IC n="shield" s={22} c={C.g600} /> Churn Risk Dashboard</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
        <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: 20 }}>
          <h4 style={{ fontSize: 13, fontWeight: 600, color: C.g400, fontFamily: F, marginBottom: 12 }}>Distribution</h4>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <svg width="80" height="80" viewBox="0 0 36 36">
              {(() => { let off = 0; return tiers.map(t => { const p = (t.count / MERCHANTS.length) * 100; const el = <circle key={t.id} cx="18" cy="18" r="14" fill="none" stroke={t.c} strokeWidth="4" strokeDasharray={`${p} ${100 - p}`} strokeDashoffset={-off} />; off += p; return el; }); })()}
            </svg>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {tiers.map(t => <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: C.g500, fontFamily: F }}><div style={{ width: 8, height: 8, borderRadius: 2, background: t.c }} />{t.l}: {t.count}</div>)}
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: 20 }}>
          <h4 style={{ fontSize: 13, fontWeight: 600, color: C.g400, fontFamily: F, marginBottom: 12 }}>At-Risk MRR</h4>
          <div style={{ fontSize: 36, fontWeight: 700, color: C.err, fontFamily: F }}>${atRiskMRR}</div>
          <div style={{ fontSize: 12, color: C.g400, fontFamily: F }}>{atRisk.length} merchants (0-6 weeks)</div>
        </div>
        <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: 20 }}>
          <h4 style={{ fontSize: 13, fontWeight: 600, color: C.g400, fontFamily: F, marginBottom: 12 }}>Trend (90d)</h4>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 60 }}>
            {[65,60,55,58,52,48,50,45,42,40,38,35].map((v,i) => <div key={i} style={{ flex: 1, height: `${v}%`, background: i > 9 ? C.ok : i > 6 ? C.warn : C.err, borderRadius: "2px 2px 0 0", opacity: .7 + i * .025 }} />)}
          </div>
          <div style={{ fontSize: 12, color: C.ok, fontWeight: 600, fontFamily: F, marginTop: 6 }}>↓ 46% improvement</div>
        </div>
      </div>
      <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ borderBottom: `1px solid ${C.g200}`, backgroundColor: C.g100 }}>{["Merchant", "Plan", "MRR", "Risk", "Score", "Top Factor", "Last Active"].map(h => <th key={h} style={{ padding: "9px 12px", textAlign: "left", fontSize: 10.5, fontWeight: 600, color: C.g400, fontFamily: F, textTransform: "uppercase" }}>{h}</th>)}</tr></thead>
          <tbody>{sorted.map(m => (
            <tr key={m.id} onClick={() => onSelect(m)} style={{ borderBottom: `1px solid ${C.g100}`, cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = C.g100} onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}>
              <td style={{ padding: "9px 12px" }}><div style={{ fontSize: 13, fontWeight: 600, fontFamily: F }}>{m.shopName}</div><div style={{ fontSize: 10, color: C.g400, fontFamily: F }}>{m.domain}</div></td>
              <td style={{ padding: "9px 12px", fontSize: 12, fontFamily: F }}>{m.plan || "—"}</td>
              <td style={{ padding: "9px 12px", fontSize: 12, fontWeight: 600, fontFamily: MO }}>{m.mrr > 0 ? `$${m.mrr}` : "—"}</td>
              <td style={{ padding: "9px 12px" }}><RiskBadge s={m.churnTier} /></td>
              <td style={{ padding: "9px 12px", fontFamily: MO, fontSize: 12 }}>{m.churnScore.toFixed(2)}</td>
              <td style={{ padding: "9px 12px", fontSize: 11, color: C.g500, fontFamily: F }}>{m.churnFactors[0]?.replace(/_/g, " ") || "—"}</td>
              <td style={{ padding: "9px 12px", fontSize: 12, color: C.g400, fontFamily: F }}>{m.lastActive}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
};

// ── Sidebar ───────────────────────────────────────────────────

const Sidebar = ({ active, onNav }) => {
  const items = [
    { k: "customers", l: "Customers", i: "users" },
    { k: "churn", l: "Churn Risk", i: "shield" },
    { k: "segments", l: "Segments", i: "layers" },
    { d: true },
    { k: "email", l: "Email", i: "mail" },
    { k: "revenue", l: "Revenue", i: "dollar" },
    { k: "reports", l: "Reports", i: "chart" },
    { d: true },
    { k: "settings", l: "Settings", i: "cog" },
  ];
  return (
    <div style={{ width: 210, height: "100vh", backgroundColor: C.w, borderRight: `1px solid ${C.g200}`, display: "flex", flexDirection: "column", position: "sticky", top: 0, flexShrink: 0 }}>
      <div style={{ padding: "18px 18px 14px", borderBottom: `1px solid ${C.g200}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#323338" /><path d="M7 8h10M7 12h7M7 16h10" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>
          <div><div style={{ fontSize: 14, fontWeight: 800, fontFamily: F }}>account editor</div><div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: .5, color: C.g400 }}>CRM</div></div>
        </div>
      </div>
      <nav style={{ padding: "10px 8px", flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        {items.map((it, idx) => it.d
          ? <div key={idx} style={{ height: 1, background: C.g200, margin: "6px 8px" }} />
          : <div key={it.k} onClick={() => onNav(it.k)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 11px", borderRadius: R.md, cursor: "pointer", backgroundColor: active === it.k ? C.priL : "transparent", color: active === it.k ? C.pri : C.g500, fontWeight: active === it.k ? 600 : 400, fontSize: 13, fontFamily: F, transition: "all .15s" }}>
            <IC n={it.i} s={17} c={active === it.k ? C.pri : C.g400} />{it.l}
          </div>
        )}
      </nav>
    </div>
  );
};

// ── App Root ──────────────────────────────────────────────────

// ============================================================
// MODULE 2: EMAIL TRIGGER SYSTEM V3
// ============================================================
// ============================================================
// CONSTANTS & DATA — v3 FINAL (58 Triggers, 9 Phases)
// ============================================================

const PHASES = [
  { id: 1, name: "Survival", short: "P1", color: "#E53935", bg: "#FDECEA", range: "0–60 min", goalShort: "Approve trial charge" },
  { id: 2, name: "Post-Activation", short: "P2", color: "#FB8C00", bg: "#FFF3E0", range: "Hours 1–24", goalShort: "Widget setup" },
  { id: 3, name: "Engagement", short: "P3", color: "#FDD835", bg: "#FFFDE7", range: "Days 2–7", goalShort: "Maintain engagement" },
  { id: 4, name: "Conversion", short: "P4", color: "#FFB300", bg: "#FFF8E1", range: "Days 8–14", goalShort: "Convert to paid" },
  { id: 5, name: "Retention", short: "P5", color: "#43A047", bg: "#E8F5E9", range: "Post-conversion", goalShort: "Ongoing value" },
  { id: 6, name: "Volume Alerts", short: "P6", color: "#00897B", bg: "#E0F2F1", range: "Ongoing", goalShort: "Manage limits" },
  { id: 7, name: "Add-Ons", short: "P7", color: "#3949AB", bg: "#E8EAF6", range: "Ongoing", goalShort: "Upsell" },
  { id: 8, name: "Recovery", short: "P8", color: "#8E24AA", bg: "#F3E5F5", range: "Post-uninstall", goalShort: "Win back" },
  { id: 9, name: "Dunning", short: "P9", color: "#C62828", bg: "#FFEBEE", range: "Payment recovery", goalShort: "Recover payment" },
];

const PRIORITY_TIERS = [
  { id: "P0", label: "P0 · Critical", color: "#E53935", bg: "#FDECEA", desc: "System/billing. Always sends, overrides suppressions." },
  { id: "P1", label: "P1 · High", color: "#FB8C00", bg: "#FFF3E0", desc: "Activation & onboarding. Time-sensitive." },
  { id: "P2", label: "P2 · Medium-High", color: "#FFB300", bg: "#FFF8E1", desc: "Conversion & upgrade prompts." },
  { id: "P3", label: "P3 · Medium", color: "#43A047", bg: "#E8F5E9", desc: "Engagement & feature discovery." },
  { id: "P4", label: "P4 · Low", color: "#3949AB", bg: "#E8EAF6", desc: "Informational. Suppressed if P0-P3 fired in 24h." },
  { id: "P5", label: "P5 · Lowest", color: "#9E9E9E", bg: "#F5F5F5", desc: "Win-back & seasonal. Most easily suppressed." },
];

const SEND_LIMIT_OPTIONS = [
  { value: "once", label: "Once" },
  { value: "max_2", label: "Max 2" },
  { value: "1_per_cycle", label: "1 per billing cycle" },
  { value: "1_per_30d", label: "1 per 30 days" },
  { value: "1_per_60d", label: "1 per 60 days" },
  { value: "every_90d", label: "Every 90 days" },
];

// Full 58-trigger dataset
const TRIGGERS = [
  // Phase 1: Survival
  { id: "T01", name: "Install Confirmation", event: "app.installed", delay: "0s", delaySeconds: 0, phase: 1, priority: "P0", sendLimit: "once", status: "active", sendCount: 4821, updatedAt: "2d ago", emailRef: "Email 1",
    conditions: ["trial_started=false", "charge_approved=false"], suppressions: ["S01: trial_started=true", "S02: charge_approved=true"],
    branchOf: null, branchPair: null },
  { id: "T02", name: "5-Min Intervention", event: "app.installed", delay: "5 min", delaySeconds: 300, phase: 1, priority: "P0", sendLimit: "once", status: "active", sendCount: 3294, updatedAt: "1d ago", emailRef: "Email 2",
    conditions: ["trial_started=false", "charge_approved=false"], suppressions: ["S01: trial_started=true", "S02: charge_approved=true", "S24: email_1_bounced=true"],
    branchOf: null, branchPair: null },
  { id: "T03", name: "10-Min Rescue", event: "app.installed", delay: "10 min", delaySeconds: 600, phase: 1, priority: "P0", sendLimit: "once", status: "active", sendCount: 2187, updatedAt: "3d ago", emailRef: "Email 3",
    conditions: ["trial_started=false", "charge_approved=false"], suppressions: ["S01: trial_started=true", "S02: charge_approved=true", "S25: merchant_replied=true"],
    branchOf: null, branchPair: null },
  { id: "T04", name: "Charge Abandoned", event: "charge.declined/abandoned", delay: "0s", delaySeconds: 0, phase: 1, priority: "P1", sendLimit: "max_2", status: "active", sendCount: 891, updatedAt: "5d ago", emailRef: "Email 4",
    conditions: ["charge_approved=false", "merchant_clicked_start_trial=true"], suppressions: ["S02: charge_approved=true", "S26: new_charge_attempt_in_progress=true"],
    branchOf: null, branchPair: null },
  { id: "T04B", name: "Widget Added, Trial Not Started", event: "widget.added_to_both", delay: "1 hr", delaySeconds: 3600, phase: 1, priority: "P0", sendLimit: "once", status: "active", sendCount: 134, updatedAt: "1d ago", emailRef: "Email 4B",
    conditions: ["widget_added=true", "trial_started=false", "charge_approved=false"], suppressions: ["S01: trial_started=true", "S02: charge_approved=true"],
    branchOf: null, branchPair: null },

  // Phase 2: Post-Activation
  { id: "T05", name: "Trial Activated — Add Widget", event: "charge.approved", delay: "1 hr", delaySeconds: 3600, phase: 2, priority: "P1", sendLimit: "once", status: "active", sendCount: 2845, updatedAt: "4d ago", emailRef: "Email 5",
    conditions: ["charge_approved=true", "widget_added=false"], suppressions: ["S03: widget_added=true"],
    branchOf: null, branchPair: null },
  { id: "T05B", name: "24h Trial Active, No Widget", event: "charge.approved", delay: "24 hr", delaySeconds: 86400, phase: 2, priority: "P1", sendLimit: "once", status: "active", sendCount: 1105, updatedAt: "2d ago", emailRef: "Email 5B",
    conditions: ["charge_approved=true", "trial_active=true", "widget_added=false"], suppressions: ["S03: widget_added=true"],
    branchOf: null, branchPair: null },
  { id: "T06", name: "Widget Added — You're Live", event: "widget.added_to_both", delay: "2 hr", delaySeconds: 7200, phase: 2, priority: "P2", sendLimit: "once", status: "active", sendCount: 2234, updatedAt: "3d ago", emailRef: "Email 6",
    conditions: ["widget_on_both=true", "charge_approved=true"], suppressions: ["S04: first_edit_completed=true"],
    branchOf: null, branchPair: null },
  { id: "T07", name: "24h Checkpoint", event: "charge.approved", delay: "24 hr", delaySeconds: 86400, phase: 2, priority: "P3", sendLimit: "once", status: "active", sendCount: 1890, updatedAt: "5d ago", emailRef: "Email 7",
    conditions: ["charge_approved=true", "trial_active=true"], suppressions: ["S27: widget_added=false", "S05: total_edits>0", "S08: trial_cancelled=true"],
    branchOf: null, branchPair: null },

  // Phase 3: Engagement (with A/B branching)
  { id: "T08", name: "Low Engagement Day 2", event: "time_based", delay: "Day 2", delaySeconds: 172800, phase: 3, priority: "P2", sendLimit: "once", status: "active", sendCount: 1567, updatedAt: "2d ago", emailRef: "Email 8",
    conditions: ["trial_active=true", "total_edits=0", "dashboard_logins_48h=0"], suppressions: ["S05: total_edits>0", "S35: dashboard_logins_24h>0"],
    branchOf: null, branchPair: null },
  { id: "T09", name: "First Edit Completed", event: "order.edit_completed", delay: "0s", delaySeconds: 0, phase: 3, priority: "P1", sendLimit: "once", status: "active", sendCount: 1678, updatedAt: "6d ago", emailRef: "Email 9",
    conditions: ["total_edits=1", "trial_active=true"], suppressions: [],
    branchOf: null, branchPair: null },
  { id: "T10A", name: "Day 3 — Engaged", event: "time_based", delay: "Day 3", delaySeconds: 259200, phase: 3, priority: "P3", sendLimit: "once", status: "active", sendCount: 845, updatedAt: "3d ago", emailRef: "Email 10A",
    conditions: ["trial_active=true", "total_edits>0"], suppressions: ["S08: trial_cancelled=true"],
    branchOf: "T10", branchPair: "T10B", branchLabel: "A: Engaged", branchCondition: "total_edits > 0" },
  { id: "T10B", name: "Day 3 — Zero Edits", event: "time_based", delay: "Day 3", delaySeconds: 259200, phase: 3, priority: "P3", sendLimit: "once", status: "active", sendCount: 722, updatedAt: "3d ago", emailRef: "Email 10B",
    conditions: ["trial_active=true", "total_edits=0"], suppressions: ["S05: total_edits>0", "S08: trial_cancelled=true"],
    branchOf: "T10", branchPair: "T10A", branchLabel: "B: Zero Edits", branchCondition: "total_edits = 0" },
  { id: "T11A", name: "Day 5 — Engaged", event: "time_based", delay: "Day 5", delaySeconds: 432000, phase: 3, priority: "P3", sendLimit: "once", status: "active", sendCount: 534, updatedAt: "4d ago", emailRef: "Email 11A",
    conditions: ["trial_active=true", "total_edits>=3"], suppressions: ["S08: trial_cancelled=true"],
    branchOf: "T11", branchPair: "T11B", branchLabel: "A: Engaged", branchCondition: "total_edits ≥ 3" },
  { id: "T11B", name: "Day 5 — Zero Edits", event: "time_based", delay: "Day 5", delaySeconds: 432000, phase: 3, priority: "P3", sendLimit: "once", status: "active", sendCount: 489, updatedAt: "4d ago", emailRef: "Email 11B",
    conditions: ["trial_active=true", "total_edits=0"], suppressions: ["S05: total_edits>0", "S08: trial_cancelled=true"],
    branchOf: "T11", branchPair: "T11A", branchLabel: "B: Zero Edits", branchCondition: "total_edits = 0" },
  { id: "T11C", name: "High Edit Rate Detection", event: "usage_pattern.detected", delay: "0s", delaySeconds: 0, phase: 3, priority: "P2", sendLimit: "once", status: "active", sendCount: 67, updatedAt: "8d ago", emailRef: "Email 11C",
    conditions: ["sub_active=true", "days_since_paid>=14", "edit_rate>=7%", "total_edits>=10"], suppressions: ["S33: high_edit_rate_email_sent=true"],
    branchOf: null, branchPair: null },
  { id: "T12", name: "Day 7 Feature Overview", event: "time_based", delay: "Day 7", delaySeconds: 604800, phase: 3, priority: "P3", sendLimit: "once", status: "active", sendCount: 678, updatedAt: "5d ago", emailRef: "Email 12",
    conditions: ["trial_active=true", "total_edits>0"], suppressions: ["S06: total_edits=0", "S08: trial_cancelled=true"],
    branchOf: "T12G", branchPair: "T12B", branchLabel: "A: Engaged", branchCondition: "total_edits > 0" },
  { id: "T12B", name: "Day 7 Zero Edits Reassurance", event: "time_based", delay: "Day 7", delaySeconds: 604800, phase: 3, priority: "P2", sendLimit: "once", status: "active", sendCount: 312, updatedAt: "5d ago", emailRef: "Email 12B",
    conditions: ["trial_active=true", "total_edits=0", "widget_added=true"], suppressions: ["S05: total_edits>0", "S34: zero_edits_reassurance_sent=true"],
    branchOf: "T12G", branchPair: "T12", branchLabel: "B: Zero Edits", branchCondition: "total_edits = 0" },

  // Phase 4: Conversion
  { id: "T13", name: "Plan Fit Day 8", event: "time_based", delay: "Day 8", delaySeconds: 691200, phase: 4, priority: "P2", sendLimit: "once", status: "active", sendCount: 1102, updatedAt: "3d ago", emailRef: "Email 13",
    conditions: ["trial_active=true", "days_until_end=6"], suppressions: ["S09: plan_changed_in_last_7_days=true"],
    branchOf: null, branchPair: null },
  { id: "T14", name: "Trial Conversion Day 10", event: "time_based", delay: "Day 10", delaySeconds: 864000, phase: 4, priority: "P2", sendLimit: "once", status: "active", sendCount: 978, updatedAt: "2d ago", emailRef: "Email 14",
    conditions: ["trial_active=true", "days_until_end=4"], suppressions: ["S30: plan_changed_last_7d=true", "S29: billing_changed_to_annual=true", "S08: trial_cancelled=true"],
    branchOf: null, branchPair: null },
  { id: "T15", name: "Annual Savings Day 11", event: "time_based", delay: "Day 11", delaySeconds: 950400, phase: 4, priority: "P3", sendLimit: "once", status: "active", sendCount: 456, updatedAt: "6d ago", emailRef: "Email 15",
    conditions: ["trial_active=true", "billing=monthly", "days_until_end=3"], suppressions: ["S11: billing=annual", "S10: plan_changed_in_last_24h=true"],
    branchOf: null, branchPair: null },
  { id: "T16", name: "Trial Ends Tomorrow Day 13", event: "time_based", delay: "Day 13", delaySeconds: 1123200, phase: 4, priority: "P1", sendLimit: "once", status: "active", sendCount: 890, updatedAt: "2d ago", emailRef: "Email 16",
    conditions: ["trial_active=true", "days_until_end=1"], suppressions: [],
    branchOf: null, branchPair: null },
  { id: "T17", name: "Converted to Paid (Monthly)", event: "subscription.activated", delay: "0s", delaySeconds: 0, phase: 4, priority: "P1", sendLimit: "once", status: "active", sendCount: 1245, updatedAt: "1d ago", emailRef: "Email 17",
    conditions: ["trial_ended=true", "sub_active=true", "billing=monthly"], suppressions: [],
    branchOf: "T17G", branchPair: "T17B", branchLabel: "A: Monthly", branchCondition: "billing = monthly" },
  { id: "T17B", name: "Converted to Paid (Annual)", event: "subscription.activated", delay: "0s", delaySeconds: 0, phase: 4, priority: "P1", sendLimit: "once", status: "active", sendCount: 234, updatedAt: "1d ago", emailRef: "Email 17B",
    conditions: ["trial_ended=true", "sub_active=true", "billing=annual"], suppressions: [],
    branchOf: "T17G", branchPair: "T17", branchLabel: "B: Annual", branchCondition: "billing = annual" },

  // Phase 5: Retention
  { id: "T18", name: "Month 1 Summary", event: "time_based", delay: "30 days", delaySeconds: 2592000, phase: 5, priority: "P2", sendLimit: "once", status: "active", sendCount: 567, updatedAt: "4d ago", emailRef: "Email 18",
    conditions: ["sub_active=true", "billing_cycles>=1"], suppressions: ["S12: sub_cancelled=true"],
    branchOf: "T18G", branchPair: "T18B", branchLabel: "A: Active", branchCondition: "edits_last_30d > 0" },
  { id: "T18B", name: "Paid Inactivity (30 Days)", event: "time_based", delay: "30 days", delaySeconds: 2592000, phase: 5, priority: "P1", sendLimit: "once", status: "active", sendCount: 89, updatedAt: "4d ago", emailRef: "Email 18B",
    conditions: ["sub_active=true", "total_edits_last_30d=0", "days_since_first_charge>=30"], suppressions: ["S12: sub_cancelled=true", "S13: total_edits_last_30d>0"],
    branchOf: "T18G", branchPair: "T18", branchLabel: "B: Inactive", branchCondition: "edits_last_30d = 0" },
  { id: "T19", name: "60-Day Check-In", event: "time_based", delay: "60 days", delaySeconds: 5184000, phase: 5, priority: "P3", sendLimit: "once", status: "active", sendCount: 345, updatedAt: "7d ago", emailRef: "Email 19",
    conditions: ["sub_active=true"], suppressions: ["S12: sub_cancelled=true"],
    branchOf: null, branchPair: null },
  { id: "T19B", name: "NPS Survey (Day 61)", event: "time_based", delay: "61 days", delaySeconds: 5270400, phase: 5, priority: "P3", sendLimit: "once", status: "active", sendCount: 201, updatedAt: "7d ago", emailRef: "Email 19B",
    conditions: ["sub_active=true", "nps_sent_last_90d=false"], suppressions: ["S12: sub_cancelled=true", "S14: nps_sent_last_90d=true"],
    branchOf: null, branchPair: null },
  { id: "T20", name: "90-Day Quarterly Summary", event: "time_based", delay: "90 days", delaySeconds: 7776000, phase: 5, priority: "P3", sendLimit: "every_90d", status: "active", sendCount: 123, updatedAt: "14d ago", emailRef: "Email 20",
    conditions: ["sub_active=true"], suppressions: ["S12: sub_cancelled=true"],
    branchOf: null, branchPair: null },

  // Phase 6: Volume Alerts
  { id: "T21", name: "60% Volume Used", event: "usage_threshold.reached", delay: "0s", delaySeconds: 0, phase: 6, priority: "P3", sendLimit: "1_per_cycle", status: "active", sendCount: 456, updatedAt: "5d ago", emailRef: "Email 21",
    conditions: ["sub_active=true", "cycle_usage=60%"], suppressions: ["S15: 80%_sent=true", "S16: 100%_sent=true"],
    branchOf: null, branchPair: null },
  { id: "T22", name: "80% Volume Warning", event: "usage_threshold.reached", delay: "0s", delaySeconds: 0, phase: 6, priority: "P2", sendLimit: "1_per_cycle", status: "active", sendCount: 234, updatedAt: "7d ago", emailRef: "Email 22",
    conditions: ["sub_active=true", "cycle_usage=80%"], suppressions: ["S16: 100%_sent=true"],
    branchOf: null, branchPair: null },
  { id: "T23", name: "100-Order Grace", event: "usage_threshold.exceeded", delay: "0s", delaySeconds: 0, phase: 6, priority: "P1", sendLimit: "1_per_cycle", status: "active", sendCount: 145, updatedAt: "8d ago", emailRef: "Email 23",
    conditions: ["sub_active=true", "orders>limit", "orders<=limit+100"], suppressions: ["S17: service_stopped=true", "S32: grace_period_email_sent_this_cycle=true"],
    branchOf: null, branchPair: null },
  { id: "T24", name: "Service Stopped (Monthly)", event: "service.stopped", delay: "0s", delaySeconds: 0, phase: 6, priority: "P0", sendLimit: "1_per_cycle", status: "active", sendCount: 67, updatedAt: "10d ago", emailRef: "Email 24",
    conditions: ["sub_active=true", "billing=monthly", "orders>limit+100"], suppressions: ["S31: service_stopped_email_sent_this_cycle=true"],
    branchOf: "T24G", branchPair: "T24B", branchLabel: "A: Monthly", branchCondition: "billing = monthly" },
  { id: "T24B", name: "Service Stopped (Annual)", event: "service.stopped", delay: "0s", delaySeconds: 0, phase: 6, priority: "P0", sendLimit: "1_per_cycle", status: "active", sendCount: 23, updatedAt: "10d ago", emailRef: "Email 24B",
    conditions: ["sub_active=true", "billing=annual", "orders>limit+100"], suppressions: ["S31: service_stopped_email_sent_this_cycle=true"],
    branchOf: "T24G", branchPair: "T24", branchLabel: "B: Annual", branchCondition: "billing = annual" },
  { id: "T25", name: "Auto Plan Recommendation", event: "usage_pattern.detected", delay: "0s", delaySeconds: 0, phase: 6, priority: "P2", sendLimit: "1_per_60d", status: "active", sendCount: 89, updatedAt: "12d ago", emailRef: "Email 25",
    conditions: ["sub_active=true", "exceeded_2_of_3_cycles"], suppressions: ["S18: plan_upgraded_last_30d=true", "S37: auto_recommendation_sent_last_60d=true"],
    branchOf: null, branchPair: null },
  { id: "T25B", name: "Proactive Growth Upgrade", event: "usage_pattern.detected", delay: "0s", delaySeconds: 0, phase: 6, priority: "P3", sendLimit: "1_per_60d", status: "active", sendCount: 45, updatedAt: "15d ago", emailRef: "Email 25B",
    conditions: ["sub_active=true", "cycles>=2", "growth>30%", "usage<90%"], suppressions: ["S18: plan_upgraded_last_30d=true", "S19: cycle_usage>=90%", "S36: proactive_growth_sent_last_60d=true"],
    branchOf: null, branchPair: null },

  // Phase 7: Add-Ons
  { id: "T26", name: "Address Validation Intro", event: "time_based", delay: "7 days", delaySeconds: 604800, phase: 7, priority: "P3", sendLimit: "once", status: "active", sendCount: 345, updatedAt: "9d ago", emailRef: "Email 26",
    conditions: ["sub_active=true", "addr_valid=false"], suppressions: ["S20: address_validation_enabled=true"],
    branchOf: null, branchPair: null },
  { id: "T27", name: "Wallet Low (Annual)", event: "addr_valid.wallet_low", delay: "0s", delaySeconds: 0, phase: 7, priority: "P2", sendLimit: "1_per_30d", status: "active", sendCount: 78, updatedAt: "11d ago", emailRef: "Email 27",
    conditions: ["sub_active=true", "billing=annual", "addr_valid=true", "balance<$2"], suppressions: ["S21: billing=monthly", "S38: wallet_low_sent_last_30d=true"],
    branchOf: null, branchPair: null },
  { id: "T27B", name: "Wallet Charge Failed (Monthly)", event: "addr_valid.charge_failed", delay: "0s", delaySeconds: 0, phase: 7, priority: "P2", sendLimit: "1_per_30d", status: "active", sendCount: 34, updatedAt: "13d ago", emailRef: "Email 27B",
    conditions: ["sub_active=true", "billing=monthly", "addr_valid=true"], suppressions: ["S38: wallet_low_sent_last_30d=true"],
    branchOf: null, branchPair: null },

  // Phase 8: Recovery
  { id: "T28", name: "Uninstall Survey", event: "app.uninstalled", delay: "1 hr", delaySeconds: 3600, phase: 8, priority: "P1", sendLimit: "once", status: "active", sendCount: 567, updatedAt: "3d ago", emailRef: "Email 28",
    conditions: ["app_installed=false"], suppressions: ["S41: uninstall_survey_sent=true"],
    branchOf: null, branchPair: null },
  { id: "T28B", name: "Non-Responder Recovery", event: "time_based", delay: "Day 2", delaySeconds: 172800, phase: 8, priority: "P2", sendLimit: "once", status: "active", sendCount: 234, updatedAt: "6d ago", emailRef: "Email 28B",
    conditions: ["app_installed=false", "survey_response=null", "days_since_uninstall=2"], suppressions: ["S22: app_reinstalled=true", "S23: survey_response!=null"],
    branchOf: null, branchPair: null },
  { id: "T29", name: "Recovery A — Too Expensive", event: "survey.response", delay: "24 hr", delaySeconds: 86400, phase: 8, priority: "P2", sendLimit: "once", status: "active", sendCount: 123, updatedAt: "6d ago", emailRef: "Email 29",
    conditions: ["app_installed=false", "response=too_expensive"], suppressions: ["S22: app_reinstalled=true", "S42: recovery_email_sent=true"],
    branchOf: null, branchPair: null },
  { id: "T30", name: "Recovery B — No Value", event: "survey.response", delay: "24 hr", delaySeconds: 86400, phase: 8, priority: "P2", sendLimit: "once", status: "active", sendCount: 89, updatedAt: "6d ago", emailRef: "Email 30",
    conditions: ["app_installed=false", "response=no_value"], suppressions: ["S22: app_reinstalled=true", "S42: recovery_email_sent=true"],
    branchOf: null, branchPair: null },
  { id: "T31", name: "Recovery C — Too Complex", event: "survey.response", delay: "24 hr", delaySeconds: 86400, phase: 8, priority: "P2", sendLimit: "once", status: "active", sendCount: 56, updatedAt: "6d ago", emailRef: "Email 31",
    conditions: ["app_installed=false", "response=too_complex"], suppressions: ["S22: app_reinstalled=true", "S42: recovery_email_sent=true"],
    branchOf: null, branchPair: null },
  { id: "T31B", name: "Recovery D — Other Reason", event: "survey.response", delay: "24 hr", delaySeconds: 86400, phase: 8, priority: "P2", sendLimit: "once", status: "active", sendCount: 34, updatedAt: "6d ago", emailRef: "Email 31B",
    conditions: ["app_installed=false", "response=other"], suppressions: ["S22: app_reinstalled=true", "S42: recovery_email_sent=true"],
    branchOf: null, branchPair: null },
  { id: "T32", name: "7-Day FOMO Check-In", event: "time_based", delay: "Day 7", delaySeconds: 604800, phase: 8, priority: "P3", sendLimit: "once", status: "active", sendCount: 345, updatedAt: "9d ago", emailRef: "Email 32",
    conditions: ["app_installed=false", "days_since=7"], suppressions: ["S22: app_reinstalled=true"],
    branchOf: null, branchPair: null },
  { id: "T33", name: "30-Day Final Reactivation", event: "time_based", delay: "Day 30", delaySeconds: 2592000, phase: 8, priority: "P3", sendLimit: "once", status: "active", sendCount: 234, updatedAt: "14d ago", emailRef: "Email 33",
    conditions: ["app_installed=false", "days_since=30"], suppressions: ["S22: app_reinstalled=true"],
    branchOf: null, branchPair: null },
  { id: "T33B", name: "60-Day Extended Win-Back", event: "time_based", delay: "Day 60", delaySeconds: 5184000, phase: 8, priority: "P3", sendLimit: "once", status: "active", sendCount: 67, updatedAt: "20d ago", emailRef: "Email 33B",
    conditions: ["app_installed=false", "days_since=60"], suppressions: ["S22: app_reinstalled=true"],
    branchOf: null, branchPair: null },
  { id: "T33C", name: "90-Day Last Chance Win-Back", event: "time_based", delay: "Day 90", delaySeconds: 7776000, phase: 8, priority: "P3", sendLimit: "once", status: "active", sendCount: 23, updatedAt: "25d ago", emailRef: "Email 33C",
    conditions: ["app_installed=false", "days_since=90"], suppressions: ["S22: app_reinstalled=true"],
    branchOf: null, branchPair: null },

  // Phase 9: Dunning
  { id: "T34", name: "Payment Failed — Day 1", event: "subscription.charge_failed", delay: "0s", delaySeconds: 0, phase: 9, priority: "P0", sendLimit: "once", status: "active", sendCount: 78, updatedAt: "10d ago", emailRef: "Email 34",
    conditions: ["sub_status=expired/past_due", "billing_cycles>=1"], suppressions: ["S28: charge_recovered=true", "S39: dunning_complete=true"],
    branchOf: null, branchPair: null },
  { id: "T35", name: "Payment Failed — Day 3", event: "subscription.charge_failed", delay: "3 days", delaySeconds: 259200, phase: 9, priority: "P0", sendLimit: "once", status: "active", sendCount: 45, updatedAt: "12d ago", emailRef: "Email 35",
    conditions: ["sub_status=expired/past_due", "charge_recovered=false"], suppressions: ["S28: charge_recovered=true", "S39: dunning_complete=true"],
    branchOf: null, branchPair: null },
  { id: "T36", name: "Payment Failed — Day 7 Final", event: "subscription.charge_failed", delay: "7 days", delaySeconds: 604800, phase: 9, priority: "P0", sendLimit: "once", status: "active", sendCount: 23, updatedAt: "15d ago", emailRef: "Email 36",
    conditions: ["sub_status=expired/past_due", "charge_recovered=false"], suppressions: ["S28: charge_recovered=true", "S39: dunning_complete=true"],
    branchOf: null, branchPair: null },
  { id: "T37", name: "Service Expired (Dunning)", event: "subscription.expired", delay: "0s", delaySeconds: 0, phase: 9, priority: "P0", sendLimit: "once", status: "active", sendCount: 12, updatedAt: "18d ago", emailRef: "Email 37",
    conditions: ["sub_active=false", "charge_recovered=false", "dunning_complete=true"], suppressions: ["S28: charge_recovered=true"],
    branchOf: null, branchPair: null },
];

// Build grouped triggers for A/B display
function getGroupedTriggers(triggers) {
  const groups = [];
  const seen = new Set();
  for (const t of triggers) {
    if (seen.has(t.id)) continue;
    if (t.branchOf && t.branchPair) {
      const pair = triggers.find(x => x.id === t.branchPair);
      if (pair && !seen.has(pair.id)) {
        groups.push({ type: "branch", groupName: t.branchOf, triggers: [t, pair] });
        seen.add(t.id);
        seen.add(pair.id);
      } else {
        groups.push({ type: "single", triggers: [t] });
        seen.add(t.id);
      }
    } else {
      groups.push({ type: "single", triggers: [t] });
      seen.add(t.id);
    }
  }
  return groups;
}

const VARIABLES = [
  { category: "Merchant", items: ["{merchant_name}", "{store_name}"] },
  { category: "Plan & Billing", items: ["{plan_name}", "{plan_price}", "{plan_limit}", "{annual_price}", "{annual_total}", "{annual_savings}", "{first_charge_date}", "{billing_url}"] },
  { category: "Trial", items: ["{trial_days_remaining}", "{trial_end_date}"] },
  { category: "Usage", items: ["{order_count}", "{order_limit_pct}", "{orders_remaining}", "{total_edits}", "{edit_rate}", "{cycle_reset_date}", "{headroom_pct}"] },
  { category: "Impact", items: ["{prevented_cancellations}", "{support_hours_saved}", "{protected_revenue}", "{aov}"] },
  { category: "Volume Tiers", items: ["{next_tier_name}", "{next_tier_limit}", "{next_tier_price}", "{upgrade_price_diff}"] },
  { category: "Add-Ons", items: ["{addr_balance}", "{addr_balance_days}", "{booster_price_500}", "{booster_price_1000}"] },
  { category: "Recovery", items: ["{survey_response}", "{days_since_uninstall}", "{uninstall_date}", "{reinstall_url}"] },
  { category: "Dunning", items: ["{payment_method_last4}", "{payment_update_url}", "{days_since_payment_fail}"] },
  { category: "NPS & Retention", items: ["{nps_score}", "{last_edit_date}", "{days_since_last_edit}", "{widget_status}", "{month1_orders}", "{month2_orders}"] },
  { category: "Links", items: ["{dashboard_url}", "{calendly_url}", "{crisp_url}", "{widget_status_url}"] },
];

const AUTOMATION_LOG = [
  { time: "14:23", merchant: "bluesky-apparel.myshopify.com", trigger: "T02", result: "sent", reason: "" },
  { time: "14:18", merchant: "outdoor-gear.myshopify.com", trigger: "T02", result: "suppressed", reason: "S01: trial_started=true" },
  { time: "13:55", merchant: "tech-gadgets.myshopify.com", trigger: "T09", result: "sent", reason: "" },
  { time: "13:41", merchant: "fashion-hub.myshopify.com", trigger: "T34", result: "sent", reason: "" },
  { time: "13:22", merchant: "home-decor.myshopify.com", trigger: "T05", result: "queued", reason: "" },
  { time: "12:58", merchant: "pet-supply.myshopify.com", trigger: "T01", result: "sent", reason: "" },
  { time: "12:34", merchant: "book-nook.myshopify.com", trigger: "T02", result: "suppressed", reason: "S02: charge_approved=true" },
  { time: "12:10", merchant: "sportswear.myshopify.com", trigger: "T16", result: "sent", reason: "" },
];

const CAMPAIGNS = [
  { id: "c1", name: "Q1 Feature Launch", desc: "Announce address validation", audience: "Growth stores", count: 847, status: "sent", date: "Mar 1, 2026", open: 34.2, click: 12.8 },
  { id: "c2", name: "Annual Plan Promo", desc: "20% off annual billing", audience: "All active plans", count: 2341, status: "scheduled", date: "Mar 15, 2026", open: null, click: null },
  { id: "c3", name: "Win-back March", desc: "Monthly win-back blast", audience: "Uninstalled 30d", count: 156, status: "draft", date: null, open: null, click: null },
];

const SUPPRESSION_DATA = {
  bounces: [
    { email: "info@closedshop.com", store: "closedshop.myshopify.com", reason: "Hard bounce", source: "Webhook", date: "Mar 10" },
    { email: "admin@teststore.com", store: "teststore.myshopify.com", reason: "Soft bounce", source: "Webhook", date: "Mar 8" },
  ],
  unsubscribes: [
    { email: "sarah@bluesky.com", store: "bluesky-apparel.myshopify.com", reason: "Unsubscribed", source: "Link click", date: "Mar 11" },
  ],
  manual: [
    { email: "spam@example.com", store: "—", reason: "Manual block", source: "Admin", date: "Mar 7" },
  ],
};

// ============================================================
// INLINE SVG ICONS
// ============================================================
const EI = {
  Mail: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  Send: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4z"/><path d="m22 2-11 11"/></svg>,
  Users: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Chart: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>,
  Settings: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/></svg>,
  Megaphone: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>,
  Shield: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>,
  Zap: (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>,
  Plus: (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>,
  Search: (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  X: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
  ArrowLeft: (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>,
  Edit: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>,
  Copy: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>,
  Trash: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>,
  ChevDown: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>,
  Check: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>,
  AlertTri: (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  GitBranch: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>,
  Download: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Upload: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  Eye: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
};

// ============================================================
// STYLES
// ============================================================


// ============================================================
// COMPONENTS
// ============================================================

function PhaseBadge({ phase }) {
  const p = PHASES.find(x => x.id === phase);
  if (!p) return null;
  return <span className="ph-badge" style={{ background: p.bg, color: p.color }}>{p.short}</span>;
}

function PriorityBadge({ priority }) {
  const t = PRIORITY_TIERS.find(x => x.id === priority);
  if (!t) return null;
  return <span className="pri-badge" style={{ background: t.bg, color: t.color }} title={t.desc}>{t.id}</span>;
}

function StatusChip({ status }) {
  return <span className={`schip ${status}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
}

function Toast({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return <div className={`toast ${type}`}>{type === "ok" ? EI.Check() : EI.AlertTri()} {msg}</div>;
}

function VarPicker({ onSelect, onClose }) {
  return (
    <div className="var-pick" onClick={e => e.stopPropagation()}>
      {VARIABLES.map(cat => (
        <div key={cat.category}>
          <div className="var-cat">{cat.category}</div>
          {cat.items.map(v => (
            <div key={v} className="var-item" onClick={() => { onSelect(v); onClose(); }}>{v}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// EMAIL CENTER — Card Grid with A/B Branch Grouping
// ============================================================

function EmailCenter({ onEdit }) {
  const [phaseF, setPhaseF] = useState("all");
  const [priF, setPriF] = useState("all");
  const [statusF, setStatusF] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = TRIGGERS.filter(t => {
    if (phaseF !== "all" && t.phase !== Number(phaseF)) return false;
    if (priF !== "all" && t.priority !== priF) return false;
    if (statusF !== "all" && t.status !== statusF) return false;
    if (search) { const s = search.toLowerCase(); return t.name.toLowerCase().includes(s) || t.id.toLowerCase().includes(s) || t.event.toLowerCase().includes(s); }
    return true;
  });

  const groups = getGroupedTriggers(filtered);
  const activeCount = TRIGGERS.filter(t => t.status === "active").length;

  return (
    <div>
      <div className="pg-hd">
        <div className="pg-title">Email Center <span className="badge">{activeCount} active · 58 triggers</span></div>
        <button className="btn btn-p" onClick={() => onEdit(null)}>{EI.Plus()} Create Template</button>
      </div>
      <div className="fbar">
        <select className="fsel" value={phaseF} onChange={e => setPhaseF(e.target.value)}>
          <option value="all">All Phases</option>
          {PHASES.map(p => <option key={p.id} value={p.id}>{p.short}: {p.name}</option>)}
        </select>
        <select className="fsel" value={priF} onChange={e => setPriF(e.target.value)}>
          <option value="all">All Priorities</option>
          {PRIORITY_TIERS.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
        </select>
        <select className="fsel" value={statusF} onChange={e => setStatusF(e.target.value)}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="draft">Draft</option>
        </select>
        <div className="sinp-w">
          <span className="si">{EI.Search()}</span>
          <input type="text" className="sinp" placeholder="Search triggers..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="cards">
        {groups.map((g, gi) => {
          if (g.type === "branch") {
            const [a, b] = g.triggers;
            const phase = PHASES.find(p => p.id === a.phase);
            return (
              <div key={gi} className="branch-card">
                <div className="branch-header">
                  <div className="branch-header-left">
                    <PhaseBadge phase={a.phase} />
                    <PriorityBadge priority={a.priority} />
                    <span style={{ fontFamily: "var(--m)", fontSize: 11, color: "var(--t3)" }}>{a.id.replace(/[AB]$/, '')}*</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 3, color: "var(--t2)", fontSize: 11 }}>{EI.GitBranch()} Branched</span>
                  </div>
                  <span className="tcard-trigger">{EI.Zap()} {a.event} · {a.delay}</span>
                </div>
                <div className="branch-body">
                  {[a, b].map((v, vi) => (
                    <div key={v.id} className="branch-variant" onClick={() => onEdit(v)}>
                      <div className="branch-variant-label" style={{ background: vi === 0 ? "#E8F5E9" : "#FFF3E0", color: vi === 0 ? "#43A047" : "#FB8C00" }}>
                        {v.branchLabel}
                      </div>
                      <div className="branch-variant-name">{v.name}</div>
                      <div className="branch-variant-cond">{v.branchCondition}</div>
                      <div className="branch-variant-stats">
                        <span className={`sdot ${v.status}`} /> {v.status} · Sent {v.sendCount.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="branch-foot">
                  <span>Combined: {(a.sendCount + b.sendCount).toLocaleString()} sends</span>
                  <span>{a.updatedAt}</span>
                </div>
              </div>
            );
          }
          const t = g.triggers[0];
          return (
            <div key={gi} className="tcard" onClick={() => onEdit(t)}>
              <div className="ca">
                <button title="Edit" onClick={e => { e.stopPropagation(); onEdit(t); }}>{EI.Edit()}</button>
                <button title="Duplicate">{EI.Copy()}</button>
                <button title="Delete">{EI.Trash()}</button>
              </div>
              <div className="tcard-top">
                <PhaseBadge phase={t.phase} />
                <PriorityBadge priority={t.priority} />
                <span style={{ fontSize: 10, fontFamily: "var(--m)", color: "var(--t3)" }}>{t.id}</span>
              </div>
              <div className="tcard-name">{t.name}</div>
              <div className="tcard-trigger">{EI.Zap()} {t.event} {t.delay !== "0s" ? `· ${t.delay}` : ""}</div>
              <div className="tcard-foot">
                <span><span className={`sdot ${t.status}`} />{t.status} · Sent {t.sendCount.toLocaleString()}</span>
                <span>{t.updatedAt}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// TEMPLATE EDITOR — Full-page with v3 fields
// ============================================================

function TemplateEditor({ trigger, onBack, onSave }) {
  const [edTab, setEdTab] = useState("html");
  const [name, setName] = useState(trigger?.name || "");
  const [subject, setSubject] = useState(trigger ? `Subject for ${trigger.name}` : "");
  const [event, setEvent] = useState(trigger?.event || "");
  const [scheduled, setScheduled] = useState(trigger?.delaySeconds > 0);
  const [sendLimit, setSendLimit] = useState(trigger?.sendLimit || "once");
  const [priority, setPriority] = useState(trigger?.priority || "P3");
  const [status, setStatus] = useState(trigger?.status === "active");
  const [showVP, setShowVP] = useState(false);
  const [html, setHtml] = useState(trigger ? `<!-- ${trigger.id}: ${trigger.name} -->\n<html>\n<body>\n  <h1>Hello {merchant_name},</h1>\n  <p>${trigger.name} email content</p>\n</body>\n</html>` : "");

  const allEvents = [...new Set(TRIGGERS.map(t => t.event))].sort();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", borderBottom: "1px solid var(--bd)", background: "#fff" }}>
        <button className="btn btn-g" onClick={onBack}>{EI.ArrowLeft()} Back to Email Center</button>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {trigger && <span style={{ fontFamily: "var(--m)", fontSize: 12, color: "var(--t3)" }}>{trigger.id}</span>}
          <span style={{ fontSize: 12, color: "var(--t2)" }}>Status:</span>
          <span onClick={() => setStatus(!status)} style={{ cursor: "pointer", display: "flex" }}>
            {status
              ? <svg width="32" height="18" viewBox="0 0 32 18"><rect width="32" height="18" rx="9" fill="#0073EA"/><circle cx="23" cy="9" r="6" fill="white"/></svg>
              : <svg width="32" height="18" viewBox="0 0 32 18"><rect width="32" height="18" rx="9" fill="#C5C7D0"/><circle cx="9" cy="9" r="6" fill="white"/></svg>}
          </span>
        </div>
      </div>

      <div className="ed-layout" style={{ flex: 1, margin: 0, borderRadius: 0, border: "none" }}>
        <div className="ed-left">
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Settings</h3>
          <div className="fg"><label className="fl">Internal Name</label><input className="fi" value={name} onChange={e => setName(e.target.value)} placeholder="Welcome Email" /></div>
          <div className="fg">
            <label className="fl" style={{ display: "flex", justifyContent: "space-between" }}>
              Subject Line
              <span style={{ fontSize: 11, color: "var(--pri)", cursor: "pointer", position: "relative", fontWeight: 500 }} onClick={() => setShowVP(!showVP)}>
                {"{Insert Variable}"}
                {showVP && <VarPicker onSelect={v => setSubject(s => s + v)} onClose={() => setShowVP(false)} />}
              </span>
            </label>
            <input className="fi" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Welcome to {store_name}" />
          </div>
          <div className="fg"><label className="fl">Trigger Event</label>
            <select className="fsel" style={{ width: "100%" }} value={event} onChange={e => setEvent(e.target.value)}>
              <option value="">Select trigger event...</option>
              {allEvents.map(ev => <option key={ev} value={ev}>{ev}</option>)}
            </select>
          </div>
          <div className="fg">
            <label className="chk-row"><input type="checkbox" checked={scheduled} onChange={e => setScheduled(e.target.checked)} /><span style={{ fontSize: 12 }}>Schedule delay</span></label>
            {scheduled && <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
              <input className="fi" type="number" defaultValue={trigger?.delay?.match(/\d+/)?.[0] || 1} style={{ width: 56 }} />
              <select className="fsel" defaultValue="Minute"><option>Minute</option><option>Hour</option><option>Day</option></select>
            </div>}
          </div>
          <div className="fg"><label className="fl">Send Limit</label>
            <select className="fsel" style={{ width: "100%" }} value={sendLimit} onChange={e => setSendLimit(e.target.value)}>
              {SEND_LIMIT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div className="fg"><label className="fl">Priority Tier</label>
            <select className="fsel" style={{ width: "100%" }} value={priority} onChange={e => setPriority(e.target.value)}>
              {PRIORITY_TIERS.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
            <div style={{ fontSize: 10, color: "var(--t3)", marginTop: 3 }}>{PRIORITY_TIERS.find(t => t.id === priority)?.desc}</div>
          </div>
          <div className="fg"><label className="fl">Plan Filter</label>
            {["All Plans", "Starter", "Growth", "Pro", "Scale", "Partner_test"].map(p => (
              <label key={p} className="chk-row"><input type="checkbox" defaultChecked={p === "All Plans"} /><span style={{ fontSize: 12 }}>{p}</span></label>
            ))}
          </div>

          {/* Automation Section */}
          {trigger && <>
            <div style={{ borderTop: "1px solid var(--bd)", margin: "16px 0" }} />
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>{EI.Zap()} Automation</h3>
            <div className="auto-sec">
              <div className="auto-title">Conditions <span style={{ fontSize: 10, color: "var(--t3)", fontWeight: 400 }}>AND — all must be true</span></div>
              {trigger.conditions.length > 0 ? trigger.conditions.map((c, i) => <span key={i} className="cchip g">{EI.Check()} {c}</span>)
                : <span style={{ fontSize: 11, color: "var(--t3)" }}>No conditions</span>}
            </div>
            <div className="auto-sec">
              <div className="auto-title">Suppression Rules <span style={{ fontSize: 10, color: "var(--t3)", fontWeight: 400 }}>OR — any blocks send</span></div>
              {trigger.suppressions.length > 0 ? trigger.suppressions.map((s, i) => <span key={i} className="cchip r">{EI.X()} {s}</span>)
                : <span style={{ fontSize: 11, color: "var(--t3)" }}>No suppression rules</span>}
              <div style={{ marginTop: 8 }}><button className="btn btn-sm btn-s">{EI.Plus()} Add Rule</button></div>
            </div>
            <div className="auto-sec">
              <div className="auto-title">Live Statistics</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {[{ v: 3, l: "In Queue", c: "var(--pri)" }, { v: 47, l: "Sent Today", c: "var(--ok)" }, { v: 12, l: "Suppressed", c: "var(--t3)" }].map(s => (
                  <div key={s.l} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: s.c }}>{s.v}</div>
                    <div style={{ fontSize: 10, color: "var(--t3)" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="auto-sec">
              <div className="auto-title">Recent Log</div>
              <table className="table" style={{ fontSize: 11 }}>
                <thead><tr><th>Time</th><th>Merchant</th><th>Result</th></tr></thead>
                <tbody>
                  {AUTOMATION_LOG.slice(0, 4).map((l, i) => (
                    <tr key={i}><td style={{ fontFamily: "var(--m)", fontSize: 10 }}>{l.time}</td><td style={{ fontSize: 10 }}>{l.merchant.split(".")[0]}</td><td><StatusChip status={l.result} /></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>}
        </div>

        <div className="ed-right">
          <div className="ed-tabs">
            {[["html","HTML"],["preview","Preview"],["test","Test Send"]].map(([k,l]) => (
              <div key={k} className={`ed-tab ${edTab === k ? "on" : ""}`} onClick={() => setEdTab(k)}>{l}</div>
            ))}
          </div>
          <div className="ed-body" style={{ flex: 1 }}>
            {edTab === "html" && <textarea className="html-ta" value={html} onChange={e => setHtml(e.target.value)} placeholder="Write HTML here" spellCheck={false} />}
            {edTab === "preview" && <div style={{ padding: 20 }}><div style={{ background: "#fff", border: "1px solid var(--bd)", borderRadius: 8, padding: 28, maxWidth: 560, margin: "0 auto", minHeight: 260, fontSize: 13, color: "var(--t2)" }}>Preview renders here. Variables like {"{store_name}"} resolve to sample data.</div></div>}
            {edTab === "test" && <div style={{ padding: 20 }}><div className="fg"><label className="fl">Send test to:</label><div style={{ display: "flex", gap: 6 }}><input className="fi" placeholder="eric@accounteditor.com" style={{ flex: 1 }} /><button className="btn btn-p">{EI.Send()} Send</button></div></div></div>}
          </div>
        </div>
      </div>

      <div className="ed-foot">
        <button className="btn btn-g" onClick={onBack}>Cancel</button>
        <div style={{ display: "flex", gap: 6 }}>
          <button className="btn btn-s" onClick={() => onSave("draft")}>Save Draft</button>
          <button className="btn btn-p" onClick={() => onSave("active")}>Save & Activate</button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CUSTOMER TEMPLATE — Phase sidebar + list view
// ============================================================

function CustomerTemplate({ onEdit }) {
  const [activePhase, setActivePhase] = useState(1);
  const phaseData = PHASES.find(p => p.id === activePhase);
  const phaseTriggers = TRIGGERS.filter(t => t.phase === activePhase);
  const groups = getGroupedTriggers(phaseTriggers);

  return (
    <div style={{ display: "flex", height: "calc(100vh - 92px)" }}>
      <div className="ph-sb">
        <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--bd)" }}>
          <div style={{ fontSize: 13, fontWeight: 700 }}>Lifecycle Phases</div>
          <div style={{ fontSize: 11, color: "var(--t3)" }}>58 triggers · 9 phases</div>
        </div>
        {PHASES.map(p => {
          const count = TRIGGERS.filter(t => t.phase === p.id).length;
          return (
            <div key={p.id} className={`ph-sb-item ${activePhase === p.id ? "on" : ""}`} onClick={() => setActivePhase(p.id)}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 5, height: 5, borderRadius: 3, background: p.color, flexShrink: 0 }} />
                <div className="ph-sb-name">{p.short}: {p.name}</div>
              </div>
              <div className="ph-sb-sub">{p.range} · {count} triggers</div>
            </div>
          );
        })}
      </div>
      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--bd)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontSize: 15, fontWeight: 700 }}>{phaseData?.short}: {phaseData?.name}</span>
            <span style={{ fontSize: 12, color: "var(--t3)", marginLeft: 8 }}>{phaseData?.range} — {phaseData?.goalShort}</span>
          </div>
          <span className="ph-badge" style={{ background: phaseData?.bg, color: phaseData?.color }}>{phaseTriggers.length} triggers</span>
        </div>
        {groups.map((g, gi) => {
          if (g.type === "branch") {
            const [a, b] = g.triggers;
            return (
              <div key={gi} style={{ borderBottom: "1px solid var(--bd)" }}>
                <div style={{ padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, background: "var(--bg2)" }}>
                  {EI.GitBranch(12)}
                  <span style={{ fontSize: 12, fontWeight: 600, color: "var(--t1)" }}>Branched: {a.delay}</span>
                  <span className="tcard-trigger" style={{ margin: 0 }}>{a.event}</span>
                  <PriorityBadge priority={a.priority} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                  {[a, b].map((v, vi) => (
                    <div key={v.id} className="tl-item" style={{ borderRight: vi === 0 ? "1px solid var(--bd)" : "none" }} onClick={() => onEdit(v)}>
                      <div>
                        <div className="branch-variant-label" style={{ background: vi === 0 ? "#E8F5E9" : "#FFF3E0", color: vi === 0 ? "#43A047" : "#FB8C00", marginBottom: 4, display: "inline-flex" }}>
                          {v.branchLabel}
                        </div>
                        <div className="tl-name">{v.name}</div>
                        <div className="tl-sub" style={{ fontFamily: "var(--m)", fontSize: 10 }}>{v.branchCondition}</div>
                      </div>
                      <div className="tl-meta"><StatusChip status={v.status} /></div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          const t = g.triggers[0];
          return (
            <div key={gi} className="tl-item" onClick={() => onEdit(t)}>
              <div className="tl-pos">
                <span style={{ fontFamily: "var(--m)", fontSize: 11, fontWeight: 600, color: phaseData?.color }}>{t.id}</span>
              </div>
              <div className="tl-info">
                <div className="tl-name">{t.name}</div>
                <div style={{ display: "flex", gap: 5, marginTop: 4, flexWrap: "wrap", alignItems: "center" }}>
                  <span className="tcard-trigger" style={{ margin: 0 }}>{EI.Zap()} {t.event} {t.delay !== "0s" ? `· ${t.delay}` : ""}</span>
                  <PriorityBadge priority={t.priority} />
                  {t.suppressions.length > 0 && <span style={{ fontSize: 10, color: "var(--t3)" }}>{t.suppressions.length} suppression{t.suppressions.length > 1 ? "s" : ""}</span>}
                </div>
              </div>
              <div className="tl-meta">
                <span style={{ fontSize: 11, color: "var(--t3)" }}>Sent {t.sendCount.toLocaleString()}</span>
                <StatusChip status={t.status} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// EMAIL MARKETING — Campaigns + 4-step wizard
// ============================================================

function EmailMarketing() {
  const [tab, setTab] = useState("all");
  const [wizard, setWizard] = useState(false);
  const [step, setStep] = useState(1);

  const filtered = CAMPAIGNS.filter(c => tab === "all" || c.status === tab);

  if (wizard) {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <button className="btn btn-g" onClick={() => { setWizard(false); setStep(1); }}>{EI.ArrowLeft()} Back</button>
          <div style={{ fontSize: 16, fontWeight: 700 }}>New Campaign</div>
          <div />
        </div>
        <div className="wiz-steps">
          {["Audience", "Content", "Schedule", "Review"].map((l, i) => (
            <div key={l} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div className={`wiz-s ${step === i + 1 ? "on" : step > i + 1 ? "done" : ""}`}>
                <div className="wiz-n">{step > i + 1 ? EI.Check() : i + 1}</div>
                <div className="wiz-label">{l}</div>
              </div>
              {i < 3 && <div className={`wiz-line ${step > i + 1 ? "done" : ""}`} />}
            </div>
          ))}
        </div>
        <div style={{ background: "#fff", border: "1px solid var(--bd)", borderRadius: "var(--r2)", padding: 28, maxWidth: 600 }}>
          {step === 1 && <><h3 style={{ marginBottom: 16 }}>Audience</h3>
            <div className="fg"><label className="fl">Campaign Name *</label><input className="fi" placeholder="Q1 Feature Launch" /></div>
            <div className="fg"><label className="fl">Segment</label><select className="fsel" style={{ width: "100%" }}><option>Choose segment...</option><option>All Active</option><option>Growth Stores</option><option>Uninstalled 30d</option></select></div>
            <div style={{ background: "var(--pri-l)", padding: "10px 14px", borderRadius: "var(--r)", display: "flex", alignItems: "center", gap: 6, marginBottom: 12, fontSize: 12, fontWeight: 500 }}>{EI.Users()} Estimated reach: <strong>847 merchants</strong></div>
          </>}
          {step === 2 && <><h3 style={{ marginBottom: 16 }}>Content</h3>
            <div className="fg"><label className="fl">Template</label><select className="fsel" style={{ width: "100%" }}><option>Browse Email Center...</option></select></div>
            <div className="fg"><label className="fl">Subject Line</label><input className="fi" defaultValue="Exciting new features!" /></div>
            <div className="fg"><label className="fl">Sender</label><input className="fi" defaultValue="Eric Williams" /></div>
          </>}
          {step === 3 && <><h3 style={{ marginBottom: 16 }}>Schedule</h3>
            {["Send now", "Schedule for later", "Merchant timezone"].map(o => <label key={o} className="chk-row" style={{ padding: "6px 0" }}><input type="radio" name="sched" defaultChecked={o === "Send now"} /><span style={{ fontSize: 12 }}>{o}</span></label>)}
          </>}
          {step === 4 && <><h3 style={{ marginBottom: 16 }}>Review & Send</h3>
            <div style={{ background: "var(--bg2)", border: "1px solid var(--bd)", borderRadius: "var(--r2)", padding: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 13 }}>
                <div><span style={{ fontSize: 11, color: "var(--t3)" }}>Audience</span><div style={{ fontWeight: 600 }}>Growth — 847</div></div>
                <div><span style={{ fontSize: 11, color: "var(--t3)" }}>Send</span><div style={{ fontWeight: 600 }}>Immediately</div></div>
              </div>
            </div>
          </>}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
            <button className="btn btn-s" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>Previous</button>
            {step < 4 ? <button className="btn btn-p" onClick={() => setStep(step + 1)}>Next</button>
              : <button className="btn btn-p" onClick={() => { setWizard(false); setStep(1); }}>Confirm & Send</button>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="pg-hd">
        <div className="pg-title">Email Marketing <span className="badge">{CAMPAIGNS.length}</span></div>
        <button className="btn btn-p" onClick={() => setWizard(true)}>{EI.Plus()} New Campaign</button>
      </div>
      <div className="tabs">{["all","sent","scheduled","draft","cancelled"].map(t => <div key={t} className={`tab ${tab === t ? "on" : ""}`} onClick={() => setTab(t)}>{t[0].toUpperCase() + t.slice(1)}</div>)}</div>
      <table className="table">
        <thead><tr><th>Campaign</th><th>Audience</th><th>Status</th><th>Date</th><th>Open</th><th>Click</th><th>Actions</th></tr></thead>
        <tbody>{filtered.map(c => <tr key={c.id}>
          <td><div style={{ fontWeight: 600 }}>{c.name}</div><div style={{ fontSize: 11, color: "var(--t3)" }}>{c.desc}</div></td>
          <td><div>{c.audience}</div><div style={{ fontSize: 10, color: "var(--t3)" }}>{c.count.toLocaleString()}</div></td>
          <td><StatusChip status={c.status} /></td><td style={{ fontSize: 12 }}>{c.date || "—"}</td>
          <td style={{ fontWeight: 600 }}>{c.open != null ? `${c.open}%` : "—"}</td>
          <td style={{ fontWeight: 600 }}>{c.click != null ? `${c.click}%` : "—"}</td>
          <td><button className="btn btn-sm btn-g">{c.status === "sent" ? "Report" : "Edit"}</button></td>
        </tr>)}</tbody>
      </table>
    </div>
  );
}

// ============================================================
// EMAIL ANALYTICS — Metrics + Funnel + Per-template table
// ============================================================

function EmailAnalytics() {
  const [range, setRange] = useState("30");
  const metrics = [
    { l: "Sent", v: "12,847", d: "+18%", up: true },
    { l: "Delivery", v: "97.3%", d: "+0.5%", up: true },
    { l: "Open Rate", v: "34.2%", d: "+2.1%", up: true },
    { l: "Click Rate", v: "12.8%", d: "-0.3%", up: false },
    { l: "Bounce", v: "2.7%", d: "-0.5%", up: true },
    { l: "Unsub", v: "0.4%", d: "+0.1%", up: false },
  ];
  const funnel = [
    { l: "Install", v: 4821, p: "100%", c: PHASES[0].color, h: 100 },
    { l: "Trial", v: 2845, p: "59%", c: PHASES[1].color, h: 59 },
    { l: "Widget", v: 2234, p: "78%", c: PHASES[2].color, h: 46 },
    { l: "1st Edit", v: 1678, p: "75%", c: PHASES[2].color, h: 35 },
    { l: "Day 7", v: 1523, p: "91%", c: PHASES[3].color, h: 32 },
    { l: "Convert", v: 567, p: "37%", c: PHASES[4].color, h: 12 },
    { l: "Retain", v: 456, p: "80%", c: PHASES[4].color, h: 9 },
  ];

  return (
    <div>
      <div className="pg-hd">
        <div className="pg-title">Email Analytics</div>
        <select className="fsel" value={range} onChange={e => setRange(e.target.value)}><option value="7">7 days</option><option value="30">30 days</option><option value="90">90 days</option></select>
      </div>
      <div className="metrics">{metrics.map(m => <div key={m.l} className="mc"><div className="mc-v">{m.v}</div><div className="mc-l">{m.l}</div><div className={`mc-d ${m.up ? "up" : "dn"}`}>{m.d}</div></div>)}</div>
      <div style={{ background: "#fff", border: "1px solid var(--bd)", borderRadius: "var(--r2)", padding: 20, marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Lifecycle Funnel</h3>
        <div className="funnel">{funnel.map((s, i) => <div key={s.l} className="funnel-s"><div className="funnel-v">{s.v.toLocaleString()}</div><div className="funnel-bar" style={{ height: `${s.h}%`, background: s.c }} /><div className="funnel-l">{s.l}</div><div className="funnel-p">{s.p}</div></div>)}</div>
      </div>
      <div style={{ background: "#fff", border: "1px solid var(--bd)", borderRadius: "var(--r2)", overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--bd)" }}><h3 style={{ fontSize: 15, fontWeight: 700 }}>Per-Trigger Performance</h3></div>
        <table className="table" style={{ border: "none" }}>
          <thead><tr><th>Trigger</th><th>Pri</th><th>Sent</th><th>Delivered</th><th>Opened</th><th>Clicked</th><th>Bounced</th></tr></thead>
          <tbody>{TRIGGERS.slice(0, 12).map(t => <tr key={t.id}>
            <td><div style={{ display: "flex", alignItems: "center", gap: 6 }}><PhaseBadge phase={t.phase} /><span style={{ fontWeight: 500 }}>{t.id}: {t.name}</span></div></td>
            <td><PriorityBadge priority={t.priority} /></td>
            <td style={{ fontWeight: 600 }}>{t.sendCount.toLocaleString()}</td>
            <td>{Math.round(t.sendCount * 0.973).toLocaleString()} <span style={{ fontSize: 10, color: "var(--t3)" }}>97.3%</span></td>
            <td>{Math.round(t.sendCount * 0.342).toLocaleString()} <span style={{ fontSize: 10, color: "var(--t3)" }}>34.2%</span></td>
            <td>{Math.round(t.sendCount * 0.128).toLocaleString()} <span style={{ fontSize: 10, color: "var(--t3)" }}>12.8%</span></td>
            <td>{Math.round(t.sendCount * 0.027).toLocaleString()} <span style={{ fontSize: 10, color: "var(--t3)" }}>2.7%</span></td>
          </tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================
// SUPPRESSION MANAGEMENT — Address-level (Feature 8)
// ============================================================

function SuppressionMgmt() {
  const [tab, setTab] = useState("bounces");
  const [showAdd, setShowAdd] = useState(false);
  const data = SUPPRESSION_DATA[tab] || [];
  const counts = { bounces: SUPPRESSION_DATA.bounces.length, unsubscribes: SUPPRESSION_DATA.unsubscribes.length, manual: SUPPRESSION_DATA.manual.length };

  return (
    <div>
      <div className="pg-hd">
        <div className="pg-title">Email Suppression</div>
        <div style={{ display: "flex", gap: 6 }}>
          <button className="btn btn-s" onClick={() => setShowAdd(true)}>{EI.Plus()} Add Manually</button>
          <button className="btn btn-s">{EI.Upload()} Import</button>
          <button className="btn btn-s">{EI.Download()} Export</button>
        </div>
      </div>
      <div style={{ background: "#FFF8E1", border: "1px solid #F5E6B3", borderRadius: "var(--r2)", padding: "8px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
        {EI.Shield()} Superadmin only — every outbound email checks this list. No bypass.
      </div>
      <div className="supp-tabs">
        <div className={`stab ${tab === "bounces" ? "on" : ""}`} onClick={() => setTab("bounces")}>Bounces ({counts.bounces})</div>
        <div className={`stab ${tab === "unsubscribes" ? "on" : ""}`} onClick={() => setTab("unsubscribes")}>Unsubscribes ({counts.unsubscribes})</div>
        <div className={`stab ${tab === "manual" ? "on" : ""}`} onClick={() => setTab("manual")}>Manual ({counts.manual})</div>
      </div>
      <table className="table">
        <thead><tr><th>Email</th><th>Store</th><th>Reason</th><th>Source</th><th>Date</th><th>Actions</th></tr></thead>
        <tbody>{data.length === 0 ? <tr><td colSpan={6} style={{ textAlign: "center", padding: 32, color: "var(--t3)" }}>No records.</td></tr>
          : data.map((r, i) => <tr key={i}><td style={{ fontFamily: "var(--m)", fontSize: 11 }}>{r.email}</td><td style={{ fontSize: 11 }}>{r.store}</td><td><StatusChip status={r.reason.includes("Hard") ? "failed" : "suppressed"} /></td><td style={{ fontSize: 11 }}>{r.source}</td><td style={{ fontSize: 11 }}>{r.date}</td><td><button className="btn btn-sm btn-g" style={{ color: "var(--err)" }}>Remove</button></td></tr>)}</tbody>
      </table>
      {showAdd && <div className="modal-ov" onClick={() => setShowAdd(false)}><div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-h"><h3>Add to Suppression</h3><button className="btn btn-icon btn-g" onClick={() => setShowAdd(false)}>{EI.X()}</button></div>
        <div className="modal-b">
          <div className="fg"><label className="fl">Email</label><input className="fi" placeholder="email@example.com" /></div>
          <div className="fg"><label className="fl">Reason</label><select className="fsel" style={{ width: "100%" }}><option>Manual block</option><option>Hard bounce</option><option>Spam complaint</option></select></div>
        </div>
        <div className="modal-f"><button className="btn btn-s" onClick={() => setShowAdd(false)}>Cancel</button><button className="btn btn-p" onClick={() => setShowAdd(false)}>Add</button></div>
      </div></div>}
    </div>
  );
}

// ============================================================
// ALL SUPPRESSION RULES — Read-only reference (S01-S42)
// ============================================================

function SuppressionRulesRef() {
  const allRules = [];
  for (const t of TRIGGERS) {
    for (const s of t.suppressions) {
      const match = s.match(/^(S\d+):\s*(.+)$/);
      if (match) {
        const existing = allRules.find(r => r.id === match[1]);
        if (existing) { if (!existing.triggers.includes(t.id)) existing.triggers.push(t.id); }
        else allRules.push({ id: match[1], rule: match[2], triggers: [t.id] });
      }
    }
  }
  allRules.sort((a, b) => parseInt(a.id.slice(1)) - parseInt(b.id.slice(1)));

  return (
    <div>
      <div className="pg-hd">
        <div className="pg-title">Suppression Rules Reference <span className="badge">{allRules.length} rules</span></div>
      </div>
      <div style={{ background: "var(--pri-l)", border: "1px solid #9BC3F5", borderRadius: "var(--r2)", padding: "8px 14px", marginBottom: 16, fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
        ℹ Read-only reference. Edit individual rules from each trigger's Automation tab in the template editor.
      </div>
      <table className="table">
        <thead><tr><th>ID</th><th>Suppression Condition</th><th>Affects Triggers</th></tr></thead>
        <tbody>{allRules.map(r => <tr key={r.id}>
          <td style={{ fontFamily: "var(--m)", fontWeight: 600, fontSize: 12 }}>{r.id}</td>
          <td><span className="cchip r" style={{ fontSize: 11 }}>{r.rule}</span></td>
          <td style={{ fontSize: 11 }}>{r.triggers.join(", ")}</td>
        </tr>)}</tbody>
      </table>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================

// ============================================================
// MODULE 3: REVENUE REPORTING
// ============================================================
// ============================================================
// DATA — Revenue Module v1.0
// ============================================================

const MRR_CURRENT = 4993;
const ARR = MRR_CURRENT * 12;
const ACTIVE_SUBS = 75;
const GROWTH_RATE = 6.8;
const MRR_GOAL = 10000;

const MONTHLY_DATA = [
  { month: "Apr 25", start: 2100, newMrr: 156, react: 0, expansion: 39, unfrozen: 0, churn: -78, contraction: 0, frozen: 0 },
  { month: "May 25", start: 2217, newMrr: 198, react: 39, expansion: 0, unfrozen: 0, churn: -39, contraction: 0, frozen: -99 },
  { month: "Jun 25", start: 2316, newMrr: 237, react: 0, expansion: 60, unfrozen: 99, churn: -99, contraction: -60, frozen: 0 },
  { month: "Jul 25", start: 2553, newMrr: 178, react: 99, expansion: 0, unfrozen: 0, churn: -39, contraction: 0, frozen: 0 },
  { month: "Aug 25", start: 2791, newMrr: 297, react: 0, expansion: 99, unfrozen: 0, churn: -78, contraction: -39, frozen: 0 },
  { month: "Sep 25", start: 3070, newMrr: 336, react: 39, expansion: 60, unfrozen: 0, churn: -99, contraction: 0, frozen: -39 },
  { month: "Oct 25", start: 3367, newMrr: 198, react: 0, expansion: 0, unfrozen: 39, churn: -39, contraction: -60, frozen: 0 },
  { month: "Nov 25", start: 3505, newMrr: 277, react: 99, expansion: 80, unfrozen: 0, churn: -78, contraction: 0, frozen: 0 },
  { month: "Dec 25", start: 3883, newMrr: 198, react: 0, expansion: 60, unfrozen: 0, churn: -99, contraction: -39, frozen: -99 },
  { month: "Jan 26", start: 3904, newMrr: 356, react: 99, expansion: 0, unfrozen: 99, churn: -78, contraction: 0, frozen: 0 },
  { month: "Feb 26", start: 4380, newMrr: 293, react: 0, expansion: 80, unfrozen: 0, churn: -39, contraction: -41, frozen: 0 },
  { month: "Mar 26", start: 4673, newMrr: 198, react: 0, expansion: 60, unfrozen: 0, churn: -99, contraction: 0, frozen: 0 },
];
MONTHLY_DATA.forEach(m => {
  m.netNew = m.newMrr + m.react + m.expansion + m.unfrozen + m.churn + m.contraction + m.frozen;
  m.end = m.start + m.netNew;
});

const CHURN_EVENTS = [
  { merchant: "Tech Gadgets Pro", plan: "Growth", mrrLost: 99, type: "Involuntary", date: "Mar 18, 2026", reason: "Payment failed" },
  { merchant: "Pet Supply World", plan: "Starter", mrrLost: 39, type: "Voluntary", date: "Mar 12, 2026", reason: "No value perceived" },
  { merchant: "Craft Corner", plan: "Starter", mrrLost: 39, type: "Voluntary", date: "Mar 5, 2026", reason: "Too complex" },
  { merchant: "Vintage Books", plan: "Growth", mrrLost: 99, type: "Voluntary", date: "Feb 28, 2026", reason: "Too expensive" },
  { merchant: "Yoga Essentials", plan: "Starter", mrrLost: 39, type: "Involuntary", date: "Feb 22, 2026", reason: "Store frozen" },
];

const COHORT_DATA = [
  { cohort: "Sep 2025", m0mrr: 420, months: [100, 92, 88, 85, 82, 80, 78] },
  { cohort: "Oct 2025", m0mrr: 336, months: [100, 89, 85, 81, 78, 75] },
  { cohort: "Nov 2025", m0mrr: 510, months: [100, 95, 90, 87, 84] },
  { cohort: "Dec 2025", m0mrr: 380, months: [100, 91, 86, 82] },
  { cohort: "Jan 2026", m0mrr: 450, months: [100, 94, 89] },
  { cohort: "Feb 2026", m0mrr: 390, months: [100, 93] },
  { cohort: "Mar 2026", m0mrr: 510, months: [100] },
];

const JOURNAL = [
  { date: "Mar 15, 2026", title: "Launched new pricing tiers", cat: "Pricing Change", desc: "Migrated from 3-tier to 5-tier pricing. Starter $39, Growth $99, Pro $179, Scale $259." },
  { date: "Feb 1, 2026", title: "Address Validation launch", cat: "Product Launch", desc: "Launched Google Places address validation as a paid add-on." },
  { date: "Jan 10, 2026", title: "Annual billing introduced", cat: "Pricing Change", desc: "Added 20% annual discount across all tiers." },
];

const PLAN_CHURN = [
  { plan: "Starter", churned: 117, pct: 5.2 },
  { plan: "Growth", churned: 198, pct: 3.1 },
  { plan: "Pro", churned: 0, pct: 0 },
  { plan: "Scale", churned: 0, pct: 0 },
];

const BENCHMARKS = [
  { metric: "Monthly Gross Churn", ae: "2.0%", shopify: "3-5%", saas: "3-7%" },
  { metric: "Monthly Net Churn", ae: "-0.4%", shopify: "1-3%", saas: "-1% to 2%" },
  { metric: "Annual Gross Churn", ae: "21%", shopify: "30-50%", saas: "30-40%" },
];

// ============================================================
// ICONS — same as Email V3 / Customer module
// ============================================================
const RI = {
  DollarSign: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  TrendUp: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  TrendDown: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>,
  BarChart: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>,
  PieChart: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>,
  Target: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Users: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Mail: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  Settings: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/></svg>,
  ChevDown: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>,
  Plus: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>,
  BookOpen: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  Layers: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  Info: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
};

// ============================================================
// CSS — Identical tokens to Email V3 & Customer Module
// ============================================================


function cohortColor(pct) {
  if (pct >= 100) return "#1B5E20";
  if (pct >= 90) return "#4CAF50";
  if (pct >= 80) return "#8BC34A";
  if (pct >= 70) return "#FFC107";
  if (pct >= 60) return "#FF9800";
  return "#E53935";
}

function cohortBg(pct) {
  if (pct >= 100) return "#E8F5E9";
  if (pct >= 90) return "#E8F5E9";
  if (pct >= 80) return "#F1F8E9";
  if (pct >= 70) return "#FFFDE7";
  if (pct >= 60) return "#FFF3E0";
  return "#FDECEA";
}

// ============================================================
// MRR DASHBOARD
// ============================================================

function MRRDashboard() {
  const [range, setRange] = useState("12m");
  const [viewMode, setViewMode] = useState("dates");
  const goalPct = Math.round((MRR_CURRENT / MRR_GOAL) * 100);
  const gap = MRR_GOAL - MRR_CURRENT;
  const maxEnd = Math.max(...MONTHLY_DATA.map(m => m.end));

  return (
    <div>
      <div className="pg-hd">
        <div className="pg-title">{RI.DollarSign()} MRR Dashboard</div>
        <div style={{ display: "flex", gap: 8 }}>
          <select className="fsel" value={range} onChange={e => setRange(e.target.value)}>
            <option value="3m">3 months</option><option value="6m">6 months</option><option value="12m">12 months</option><option value="all">All time</option>
          </select>
          <button className="btn btn-s">{RI.BookOpen()} Journal</button>
        </div>
      </div>

      {/* Headline Metrics */}
      <div className="metrics">
        <div className="mc"><div className="mc-v">${MRR_CURRENT.toLocaleString()}</div><div className="mc-l">Current MRR</div><div className="mc-d up">{RI.TrendUp(12)} +$320 (+6.8%)</div></div>
        <div className="mc"><div className="mc-v">${ARR.toLocaleString()}</div><div className="mc-l">ARR</div><div className="mc-d up">{RI.TrendUp(12)} +$3,840</div></div>
        <div className="mc"><div className="mc-v">+{GROWTH_RATE}%</div><div className="mc-l">MRR Growth Rate</div><div className="mc-d up">vs 5.2% 3mo avg</div></div>
        <div className="mc"><div className="mc-v">{ACTIVE_SUBS}</div><div className="mc-l">Active Subscribers</div><div className="mc-d up">{RI.TrendUp(12)} +5 this month</div></div>
      </div>

      {/* Goal Widget */}
      <div className="goal-widget">
        <div style={{ flexShrink: 0 }}>{RI.Target(24)}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>$10K MRR Goal</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--pri)" }}>{goalPct}%</span>
          </div>
          <div className="goal-bar-outer"><div className="goal-bar-inner" style={{ width: `${goalPct}%` }} /></div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11, color: "var(--t2)" }}>
            <span>${gap.toLocaleString()} remaining</span>
            <span>At +6.8%/mo → Nov 2026</span>
          </div>
        </div>
        <div style={{ flexShrink: 0, textAlign: "right", fontSize: 11, color: "var(--t2)" }}>
          <div>~6 new Growth/mo</div>
          <div>or ~3 upgrades/mo</div>
        </div>
      </div>

      {/* MRR Trend Chart */}
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ margin: 0 }}>MRR Trend</h3>
          <div className="toggle-grp">
            <button className={`toggle-btn ${viewMode === "dates" ? "on" : ""}`} onClick={() => setViewMode("dates")}>By Dates</button>
            <button className={`toggle-btn ${viewMode === "types" ? "on" : ""}`} onClick={() => setViewMode("types")}>By Types</button>
          </div>
        </div>
        <div className="chart-bars">
          {MONTHLY_DATA.map((m, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--t1)", marginBottom: 4 }}>${(m.end / 1000).toFixed(1)}k</div>
              <div style={{ width: "100%", height: `${(m.end / maxEnd) * 160}px`, background: `linear-gradient(180deg, #0073EA 0%, #CCE5FF 100%)`, borderRadius: "3px 3px 0 0", position: "relative" }}>
                {m.netNew > 0 && <div style={{ position: "absolute", top: 0, width: "100%", height: `${(m.netNew / m.end) * 100}%`, background: "#4CAF50", borderRadius: "3px 3px 0 0", opacity: 0.6 }} />}
              </div>
              <div className="chart-label">{m.month.split(" ")[0]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MRR Summary Table */}
      <div className="card" style={{ padding: 0, overflow: "auto" }}>
        <table className="table" style={{ border: "none", fontSize: 12 }}>
          <thead>
            <tr>
              <th style={{ position: "sticky", left: 0, background: "var(--bg2)", zIndex: 1 }}>Movement</th>
              {MONTHLY_DATA.map(m => <th key={m.month} style={{ textAlign: "right", whiteSpace: "nowrap" }}>{m.month}</th>)}
            </tr>
          </thead>
          <tbody>
            {[
              { label: "Starting MRR", key: "start", color: null, bold: false },
              { label: "+ New", key: "newMrr", color: "#4CAF50", bold: false },
              { label: "+ Reactivation", key: "react", color: "#66BB6A", bold: false },
              { label: "+ Expansion", key: "expansion", color: "#81C784", bold: false },
              { label: "+ Unfrozen", key: "unfrozen", color: "#A5D6A7", bold: false },
              { label: "- Churn", key: "churn", color: "#E53935", bold: false },
              { label: "- Contraction", key: "contraction", color: "#EF5350", bold: false },
              { label: "- Frozen", key: "frozen", color: "#E57373", bold: false },
              { label: "= Net New", key: "netNew", color: null, bold: true },
              { label: "= Ending MRR", key: "end", color: null, bold: true },
            ].map(row => (
              <tr key={row.label} style={{ cursor: "default" }}>
                <td style={{ position: "sticky", left: 0, background: "#fff", zIndex: 1, fontWeight: row.bold ? 700 : 500, borderRight: "1px solid var(--bd)" }}>
                  {row.color && <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: row.color, marginRight: 6, verticalAlign: "middle" }} />}
                  {row.label}
                </td>
                {MONTHLY_DATA.map(m => {
                  const val = m[row.key];
                  const isNeg = val < 0;
                  const isPos = val > 0 && row.color && row.color.startsWith("#4") || row.color?.startsWith("#6") || row.color?.startsWith("#8") || row.color?.startsWith("#A");
                  return (
                    <td key={m.month} style={{ textAlign: "right", fontFamily: "var(--m)", fontSize: 11, fontWeight: row.bold ? 700 : 400, color: isNeg ? "#E53935" : (row.key === "netNew" && val > 0) ? "#43A047" : "var(--t1)" }}>
                      {row.key === "start" || row.key === "end" ? `$${val.toLocaleString()}` : val === 0 ? "—" : `${val > 0 ? "+":""}$${val.toLocaleString()}`}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Journal Entries */}
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ margin: 0 }}>Journal Entries</h3>
          <button className="btn btn-sm btn-s">{RI.Plus()} Add Entry</button>
        </div>
        {JOURNAL.map((j, i) => (
          <div key={i} className="journal-item">
            <div className="journal-dot" />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{j.title}</span>
                <span className="journal-cat">{j.cat}</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--t2)" }}>{j.desc}</div>
            </div>
            <div style={{ fontSize: 11, color: "var(--t3)", flexShrink: 0 }}>{j.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// REVENUE CHURN PAGE
// ============================================================

function RevenueChurn() {
  const maxChurn = Math.max(...PLAN_CHURN.map(p => p.churned));
  return (
    <div>
      <div className="pg-hd"><div className="pg-title">{RI.TrendDown(18)} Revenue Churn</div></div>

      <div className="metrics" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        <div className="mc"><div className="mc-v" style={{ color: "#43A047" }}>-0.4%</div><div className="mc-l">Net Churn Rate</div><div className="mc-d up">Net negative = expanding</div></div>
        <div className="mc"><div className="mc-v">2.0%</div><div className="mc-l">Gross Churn Rate</div><div className="mc-d up">Below 3% target</div></div>
        <div className="mc"><div className="mc-v" style={{ color: "#E53935" }}>-$99</div><div className="mc-l">Churned MRR (Mar)</div><div className="mc-d dn">1 cancellation</div></div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div className="card">
          <h3>Churn by Plan</h3>
          {PLAN_CHURN.map(p => (
            <div key={p.plan} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ width: 60, fontSize: 12, fontWeight: 600 }}>{p.plan}</span>
              <div style={{ flex: 1, height: 8, background: "var(--bd)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: `${maxChurn > 0 ? (p.churned / maxChurn) * 100 : 0}%`, height: "100%", background: "#E53935", borderRadius: 4 }} />
              </div>
              <span style={{ fontFamily: "var(--m)", fontSize: 11, width: 50, textAlign: "right" }}>${p.churned}</span>
              <span style={{ fontSize: 11, color: "var(--t3)", width: 40, textAlign: "right" }}>{p.pct}%</span>
            </div>
          ))}
        </div>
        <div className="card">
          <h3>Benchmarks</h3>
          <table className="table" style={{ border: "none", fontSize: 12 }}>
            <thead><tr><th>Metric</th><th>AE</th><th>Shopify Apps</th><th>SaaS</th></tr></thead>
            <tbody>{BENCHMARKS.map(b => (
              <tr key={b.metric} style={{ cursor: "default" }}>
                <td style={{ fontWeight: 500 }}>{b.metric}</td>
                <td style={{ fontWeight: 700, color: "#43A047" }}>{b.ae}</td>
                <td style={{ color: "var(--t2)" }}>{b.shopify}</td>
                <td style={{ color: "var(--t2)" }}>{b.saas}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--bd)" }}><h3 style={{ margin: 0 }}>Churn Events</h3></div>
        <table className="table" style={{ border: "none" }}>
          <thead><tr><th>Merchant</th><th>Plan</th><th>MRR Lost</th><th>Type</th><th>Date</th><th>Reason</th></tr></thead>
          <tbody>{CHURN_EVENTS.map((e, i) => (
            <tr key={i} style={{ cursor: "default" }}>
              <td style={{ fontWeight: 600 }}>{e.merchant}</td>
              <td>{e.plan}</td>
              <td style={{ color: "#E53935", fontWeight: 600, fontFamily: "var(--m)" }}>-${e.mrrLost}</td>
              <td><span style={{ padding: "2px 6px", borderRadius: 3, fontSize: 10.5, fontWeight: 500, background: e.type === "Involuntary" ? "#FFF3E0" : "#FDECEA", color: e.type === "Involuntary" ? "#FF9800" : "#E53935" }}>{e.type}</span></td>
              <td style={{ fontSize: 12 }}>{e.date}</td>
              <td style={{ fontSize: 12, color: "var(--t2)" }}>{e.reason}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================
// REVENUE RETENTION + COHORTS
// ============================================================

function RevenueRetention() {
  const [cohortMode, setCohortMode] = useState("relative");
  const maxMonth = Math.max(...COHORT_DATA.map(c => c.months.length));

  return (
    <div>
      <div className="pg-hd"><div className="pg-title">{RI.Layers()} Revenue Retention</div></div>

      <div className="metrics" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        <div className="mc"><div className="mc-v" style={{ color: "#43A047" }}>97.2%</div><div className="mc-l">NDR (Monthly)</div><div className="mc-d up">Improving +1.4pp</div></div>
        <div className="mc"><div className="mc-v">71.5%</div><div className="mc-l">NDR (Annualized)</div><div className="mc-d up">Target: 95%+</div></div>
        <div className="mc"><div className="mc-v">$4,854</div><div className="mc-l">Retained MRR</div><div className="mc-d up">from 12-month cohorts</div></div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div className="card">
          <h3>NDR by Plan</h3>
          {[
            { plan: "Starter", ndr: 92 },
            { plan: "Growth", ndr: 98 },
            { plan: "Pro", ndr: 105 },
            { plan: "Scale", ndr: 110 },
          ].map(p => (
            <div key={p.plan} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ width: 60, fontSize: 12, fontWeight: 600 }}>{p.plan}</span>
              <div style={{ flex: 1, height: 8, background: "var(--bd)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: `${Math.min(p.ndr, 120)}%`, height: "100%", background: p.ndr >= 100 ? "#1B5E20" : p.ndr >= 90 ? "#4CAF50" : p.ndr >= 80 ? "#8BC34A" : "#FF9800", borderRadius: 4, maxWidth: "100%" }} />
              </div>
              <span style={{ fontFamily: "var(--m)", fontSize: 12, fontWeight: 700, width: 44, textAlign: "right", color: p.ndr >= 100 ? "#1B5E20" : p.ndr >= 90 ? "#4CAF50" : "#FF9800" }}>{p.ndr}%</span>
            </div>
          ))}
        </div>
        <div className="card">
          <h3>NDR by Segment</h3>
          <table className="table" style={{ border: "none", fontSize: 12 }}>
            <thead><tr><th>Segment</th><th>NDR</th><th>Trend</th></tr></thead>
            <tbody>
              {[
                { seg: "Shopify Plus", ndr: "108%", trend: "up" },
                { seg: "Growth Plan", ndr: "98%", trend: "up" },
                { seg: "Annual Billing", ndr: "102%", trend: "up" },
                { seg: "High Volume (>5k)", ndr: "95%", trend: "flat" },
              ].map(s => (
                <tr key={s.seg} style={{ cursor: "default" }}>
                  <td style={{ fontWeight: 500 }}>{s.seg}</td>
                  <td style={{ fontWeight: 700, color: parseFloat(s.ndr) >= 100 ? "#1B5E20" : "#43A047" }}>{s.ndr}</td>
                  <td>{s.trend === "up" ? <span style={{ color: "#43A047" }}>↑</span> : <span style={{ color: "var(--t3)" }}>→</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cohort Retention Table */}
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h3 style={{ margin: 0 }}>Revenue Retention Cohorts</h3>
          <div className="toggle-grp">
            <button className={`toggle-btn ${cohortMode === "relative" ? "on" : ""}`} onClick={() => setCohortMode("relative")}>Relative %</button>
            <button className={`toggle-btn ${cohortMode === "absolute" ? "on" : ""}`} onClick={() => setCohortMode("absolute")}>Absolute $</button>
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="cohort-table">
            <thead>
              <tr>
                <th style={{ textAlign: "left", minWidth: 90 }}>Cohort</th>
                <th>M0 MRR</th>
                {Array.from({ length: maxMonth }, (_, i) => <th key={i}>M{i}</th>)}
              </tr>
            </thead>
            <tbody>
              {COHORT_DATA.map(c => (
                <tr key={c.cohort}>
                  <td className="cohort-label">{c.cohort}</td>
                  <td style={{ fontWeight: 600 }}>${c.m0mrr}</td>
                  {Array.from({ length: maxMonth }, (_, i) => {
                    const val = c.months[i];
                    if (val === undefined) return <td key={i} style={{ background: "#FAFAFA", color: "var(--t3)" }}>—</td>;
                    const displayVal = cohortMode === "relative"
                      ? `${val}%`
                      : `$${Math.round(c.m0mrr * val / 100)}`;
                    return (
                      <td key={i} style={{ background: cohortBg(val), color: cohortColor(val), fontWeight: 600 }}>
                        {displayVal}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 12, fontSize: 10, color: "var(--t3)" }}>
          {[["≥100%", "#1B5E20", "#E8F5E9"], ["90-99%", "#4CAF50", "#E8F5E9"], ["80-89%", "#8BC34A", "#F1F8E9"], ["70-79%", "#FFC107", "#FFFDE7"], ["60-69%", "#FF9800", "#FFF3E0"], ["<60%", "#E53935", "#FDECEA"]].map(([label, color, bg]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: bg, border: `1px solid ${color}` }} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================

// ============================================================
// MODULE 4: FLOWS & AUTOMATION
// ============================================================
// ============================================================
// DATA — Flows Module v1.0
// ============================================================

const TRIGGER_TYPES = [
  { id: "app.installed", label: "App Installed", category: "Event", color: "#2196F3", icon: "↓" },
  { id: "app.uninstalled", label: "App Uninstalled", category: "Event", color: "#E53935", icon: "✕" },
  { id: "charge.approved", label: "Charge Approved", category: "Event", color: "#4CAF50", icon: "✓" },
  { id: "charge.declined", label: "Charge Declined", category: "Event", color: "#FF9800", icon: "!" },
  { id: "subscription.activated", label: "Subscription Activated", category: "Event", color: "#43A047", icon: "$" },
  { id: "subscription.cancelled", label: "Subscription Cancelled", category: "Event", color: "#E53935", icon: "×" },
  { id: "charge.failed", label: "Charge Failed", category: "Event", color: "#C62828", icon: "⚠" },
  { id: "order.edit_completed", label: "Order Edit Completed", category: "Event", color: "#00BCD4", icon: "✎" },
  { id: "widget.added", label: "Widget Added", category: "Event", color: "#009688", icon: "⊞" },
  { id: "usage_threshold.reached", label: "Usage Threshold", category: "Event", color: "#FF9800", icon: "%" },
  { id: "survey.response", label: "Survey Response", category: "Event", color: "#9C27B0", icon: "?" },
  { id: "time_based", label: "Time-Based", category: "Time", color: "#607D8B", icon: "⏱" },
  { id: "manual", label: "Manual Trigger", category: "Manual", color: "#795548", icon: "▶" },
];

const ACTION_TYPES = [
  { id: "send_email", label: "Send Email", icon: "✉", color: "#2196F3" },
  { id: "send_slack", label: "Send Slack", icon: "#", color: "#611F69" },
  { id: "update_field", label: "Update Field", icon: "✎", color: "#FF9800" },
  { id: "add_tag", label: "Add Tag", icon: "🏷", color: "#9C27B0" },
  { id: "remove_tag", label: "Remove Tag", icon: "−", color: "#607D8B" },
  { id: "assign_owner", label: "Assign Owner", icon: "👤", color: "#00BCD4" },
  { id: "apply_discount", label: "Apply Discount", icon: "%", color: "#4CAF50" },
  { id: "create_note", label: "Create Note", icon: "📝", color: "#795548" },
  { id: "webhook", label: "Webhook", icon: "↗", color: "#F44336" },
];

const FLOWS = [
  { id: "f1", name: "Trial Activation Gamification", desc: "Multi-step trial engagement sequence", status: "published", trigger: "charge.approved", actionsCount: 7, executions: 2845, lastTriggered: "3h ago", tags: ["trial", "onboarding"], createdBy: "rahul@itgeeks.com", version: 5,
    nodes: [
      { id: "n1", type: "trigger", label: "Charge Approved", config: "charge.approved" },
      { id: "n2", type: "action", label: "Send Welcome Email", actionType: "send_email" },
      { id: "n3", type: "delay", label: "Wait 24 hours", duration: "24h" },
      { id: "n4", type: "condition", label: "Widget Added?", field: "widgetAdded", op: "is", val: "true" },
      { id: "n5", type: "action", label: "Send Widget Nudge", actionType: "send_email", branch: "false" },
      { id: "n6", type: "action", label: "Send Congrats", actionType: "send_email", branch: "true" },
      { id: "n7", type: "delay", label: "Wait 3 days", duration: "3d" },
      { id: "n8", type: "action", label: "Progress Update", actionType: "send_email" },
    ]},
  { id: "f2", name: "Churn Risk Intervention", desc: "Proactive retention when risk spikes", status: "published", trigger: "churnRisk.changed", actionsCount: 4, executions: 342, lastTriggered: "1d ago", tags: ["retention", "churn"], createdBy: "rahul@itgeeks.com", version: 3,
    nodes: [
      { id: "n1", type: "trigger", label: "Risk → 0-2 Weeks", config: "churnRisk.changed" },
      { id: "n2", type: "action", label: "Assign Owner", actionType: "assign_owner" },
      { id: "n3", type: "action", label: "Slack Alert #retention", actionType: "send_slack" },
      { id: "n4", type: "delay", label: "Wait 2 hours", duration: "2h" },
      { id: "n5", type: "action", label: "Outreach Email", actionType: "send_email" },
    ]},
  { id: "f3", name: "Usage Limit Upgrade Nudge", desc: "Facilitate plan upgrades at 80% usage", status: "published", trigger: "usage_threshold.reached", actionsCount: 4, executions: 456, lastTriggered: "5h ago", tags: ["upsell", "volume"], createdBy: "nilesh@itgeeks.com", version: 2,
    nodes: [
      { id: "n1", type: "trigger", label: "80% Usage Reached", config: "usage_threshold.reached" },
      { id: "n2", type: "action", label: "Email Volume Warning", actionType: "send_email" },
      { id: "n3", type: "action", label: "Set upsell_eligible", actionType: "update_field" },
      { id: "n4", type: "delay", label: "Wait 3 days", duration: "3d" },
      { id: "n5", type: "condition", label: "Upgraded?", field: "planUpgraded", op: "is", val: "false" },
      { id: "n6", type: "action", label: "Slack to Owner", actionType: "send_slack", branch: "true" },
    ]},
  { id: "f4", name: "Win-Back Sequence", desc: "Post-uninstall recovery with survey branching", status: "published", trigger: "app.uninstalled", actionsCount: 6, executions: 567, lastTriggered: "6h ago", tags: ["recovery", "win-back"], createdBy: "rahul@itgeeks.com", version: 4,
    nodes: [
      { id: "n1", type: "trigger", label: "App Uninstalled", config: "app.uninstalled" },
      { id: "n2", type: "delay", label: "Wait 1 hour", duration: "1h" },
      { id: "n3", type: "action", label: "Survey Email", actionType: "send_email" },
      { id: "n4", type: "delay", label: "Wait 24 hours", duration: "24h" },
      { id: "n5", type: "condition", label: "Survey Response?", field: "surveyResponse", op: "is_not_empty", val: "" },
      { id: "n6", type: "action", label: "Recovery Email (Branched)", actionType: "send_email", branch: "true" },
      { id: "n7", type: "action", label: "Generic Recovery", actionType: "send_email", branch: "false" },
    ]},
  { id: "f5", name: "New Install Welcome", desc: "First-hour survival sequence", status: "published", trigger: "app.installed", actionsCount: 3, executions: 4821, lastTriggered: "30m ago", tags: ["onboarding", "trial"], createdBy: "rahul@itgeeks.com", version: 6,
    nodes: [
      { id: "n1", type: "trigger", label: "App Installed", config: "app.installed" },
      { id: "n2", type: "action", label: "Welcome Email", actionType: "send_email" },
      { id: "n3", type: "action", label: "Set onboarding_started", actionType: "update_field" },
      { id: "n4", type: "delay", label: "Wait 5 minutes", duration: "5m" },
      { id: "n5", type: "condition", label: "Trial Started?", field: "trialStarted", op: "is", val: "false" },
      { id: "n6", type: "action", label: "Intervention Email", actionType: "send_email", branch: "true" },
    ]},
  { id: "f6", name: "Dunning Recovery", desc: "Failed payment dunning sequence", status: "draft", trigger: "charge.failed", actionsCount: 5, executions: 0, lastTriggered: "—", tags: ["dunning", "billing"], createdBy: "rahul@itgeeks.com", version: 1,
    nodes: [
      { id: "n1", type: "trigger", label: "Charge Failed", config: "charge.failed" },
      { id: "n2", type: "action", label: "Day 1 Email", actionType: "send_email" },
      { id: "n3", type: "delay", label: "Wait 3 days", duration: "3d" },
      { id: "n4", type: "action", label: "Day 3 Urgent Email", actionType: "send_email" },
      { id: "n5", type: "delay", label: "Wait 4 days", duration: "4d" },
      { id: "n6", type: "action", label: "Day 7 Final Warning", actionType: "send_email" },
      { id: "n7", type: "action", label: "Slack Alert #billing", actionType: "send_slack" },
    ]},
  { id: "f7", name: "Annual Plan Upsell (Draft)", desc: "Monthly → Annual conversion for eligible merchants", status: "draft", trigger: "time_based", actionsCount: 3, executions: 0, lastTriggered: "—", tags: ["upsell"], createdBy: "nilesh@itgeeks.com", version: 1, nodes: [] },
];

const TEMPLATES = [
  { id: "t1", name: "Abandoned Subscription Recovery", desc: "Recovers merchants who decline the trial charge. 3-email sequence over 7 days.", trigger: "charge.declined", actions: 5, icon: "🔄" },
  { id: "t2", name: "Trial Activation Gamification", desc: "Multi-step trial engagement. Mirrors v3 Phase 2-3 email sequence.", trigger: "charge.approved", actions: 7, icon: "🎯" },
  { id: "t3", name: "Churn Risk Intervention", desc: "Proactive retention when risk spikes. Auto-assigns owner + alerts Slack.", trigger: "churnRisk.changed", actions: 4, icon: "🛡" },
  { id: "t4", name: "Usage Limit Upgrade Nudge", desc: "Facilitates plan upgrades before service interruption at 80% usage.", trigger: "usage_threshold", actions: 4, icon: "📈" },
  { id: "t5", name: "Win-Back Sequence", desc: "10-email recovery with survey branching + extended win-back at 60/90 days.", trigger: "app.uninstalled", actions: 6, icon: "💌" },
  { id: "t6", name: "New Install Welcome", desc: "First-hour survival sequence. Mirrors v3 Phase 1.", trigger: "app.installed", actions: 3, icon: "👋" },
];

const EXEC_LOG = [
  { id: "ex1", customer: "Blue Sky Apparel", trigger: "charge.approved", time: "3h ago", result: "executed", duration: "1.2s", actions: ["Send Welcome Email ✓", "Update field ✓"] },
  { id: "ex2", customer: "Outdoor Gear Co", trigger: "usage_threshold.reached", time: "5h ago", result: "executed", duration: "0.8s", actions: ["Email Volume Warning ✓", "Set upsell_eligible ✓"] },
  { id: "ex3", customer: "Fashion Hub", trigger: "charge.approved", time: "6h ago", result: "suppressed", duration: "0.1s", actions: [], suppressedBy: "widgetAdded = false (waiting for widget)" },
  { id: "ex4", customer: "Tech Gadgets Pro", trigger: "charge.failed", time: "12h ago", result: "executed", duration: "2.1s", actions: ["Day 1 Email ✓", "Slack #billing ✓"] },
  { id: "ex5", customer: "Pet Supply World", trigger: "app.uninstalled", time: "1d ago", result: "executed", duration: "1.5s", actions: ["Survey Email ✓"] },
  { id: "ex6", customer: "Sportswear Direct", trigger: "churnRisk.changed", time: "1d ago", result: "executed", duration: "3.2s", actions: ["Assign Owner ✓", "Slack #retention ✓", "Outreach Email ✓"] },
  { id: "ex7", customer: "Green Garden Supply", trigger: "app.installed", time: "2d ago", result: "failed", duration: "0.3s", actions: ["Welcome Email ✗ (bounce)"], error: "Hard bounce — email added to suppression" },
];

// ============================================================
// ICONS
// ============================================================
const FI = {
  Zap: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>,
  Play: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>,
  Plus: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>,
  Search: (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  X: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
  ArrowLeft: (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>,
  ChevDown: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>,
  Copy: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>,
  Trash: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>,
  Clock: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  GitBranch: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>,
  Check: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>,
  Sparkles: (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>,
  Users: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>,
  Mail: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  BarChart: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>,
  Settings: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/></svg>,
  FileText: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>,
};

// ============================================================
// CSS — Identical tokens
// ============================================================


// ============================================================
// FLOW LIST
// ============================================================

function FlowList({ onEdit, onShowTemplates }) {
  const [statusF, setStatusF] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = FLOWS.filter(f => {
    if (statusF !== "all" && f.status !== statusF) return false;
    if (search) return f.name.toLowerCase().includes(search.toLowerCase()) || f.desc.toLowerCase().includes(search.toLowerCase());
    return true;
  });

  const pubCount = FLOWS.filter(f => f.status === "published").length;

  return (
    <div>
      <div className="pg-hd">
        <div className="pg-title">{FI.Zap()} Flows <span className="badge">{pubCount} published · {FLOWS.length} total</span></div>
        <div style={{ display: "flex", gap: 6 }}>
          <button className="btn btn-s" onClick={onShowTemplates}>{FI.FileText()} Templates</button>
          <button className="btn btn-p" onClick={onShowTemplates}>{FI.Plus()} New Flow</button>
        </div>
      </div>
      <div className="fbar">
        <div className="sinp-w"><span className="si">{FI.Search()}</span><input className="sinp" placeholder="Search flows..." value={search} onChange={e => setSearch(e.target.value)} /></div>
        <select className="fsel" value={statusF} onChange={e => setStatusF(e.target.value)}>
          <option value="all">All Status</option><option value="published">Published</option><option value="draft">Draft</option>
        </select>
      </div>
      <table className="table">
        <thead><tr><th>Flow Name</th><th>Status</th><th>Trigger</th><th>Actions</th><th>Executions</th><th>Last Triggered</th><th>Tags</th><th></th></tr></thead>
        <tbody>
          {filtered.map(f => {
            const trig = TRIGGER_TYPES.find(t => t.id === f.trigger) || { label: f.trigger, color: "#607D8B" };
            return (
              <tr key={f.id} onClick={() => onEdit(f)}>
                <td><div style={{ fontWeight: 600 }}>{f.name}</div><div style={{ fontSize: 10.5, color: "var(--t3)" }}>{f.desc}</div></td>
                <td><span className={`schip ${f.status}`}>{f.status === "published" ? "Published" : "Draft"}</span></td>
                <td><span className="trigger-chip" style={{ background: trig.color + "18", color: trig.color }}>{trig.label}</span></td>
                <td style={{ fontWeight: 600 }}>{f.actionsCount}</td>
                <td style={{ fontFamily: "var(--m)", fontSize: 12 }}>{f.executions.toLocaleString()}</td>
                <td style={{ fontSize: 12, color: "var(--t2)" }}>{f.lastTriggered}</td>
                <td>{f.tags.map(t => <span key={t} className="tag-chip">{t}</span>)}</td>
                <td><div style={{ display: "flex", gap: 4 }}><button className="btn btn-sm btn-g" onClick={e => { e.stopPropagation(); onEdit(f); }}>{FI.Play()}</button><button className="btn btn-sm btn-g">{FI.Copy()}</button><button className="btn btn-sm btn-g">{FI.Trash()}</button></div></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================
// TEMPLATE CHOOSER MODAL
// ============================================================

function TemplateChooser({ onClose, onSelect }) {
  return (
    <div className="modal-ov" onClick={onClose}>
      <div className="modal" style={{ width: 720 }} onClick={e => e.stopPropagation()}>
        <div className="modal-h"><h3>Create New Flow</h3><button className="btn btn-g" onClick={onClose}>{FI.X()}</button></div>
        <div className="modal-b">
          <div className="tmpl-grid">
            <div className="tmpl-card" onClick={() => onSelect(null)} style={{ borderStyle: "dashed", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: 32, color: "var(--t3)", marginBottom: 8 }}>{FI.Plus(28)}</div>
              <div className="tmpl-name">Blank Flow</div>
              <div className="tmpl-desc">Start from scratch</div>
            </div>
            {TEMPLATES.map(t => (
              <div key={t.id} className="tmpl-card" onClick={() => onSelect(t)}>
                <div className="tmpl-icon">{t.icon}</div>
                <div className="tmpl-name">{t.name}</div>
                <div className="tmpl-desc">{t.desc}</div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span className="trigger-chip" style={{ background: "#F0F2F7", color: "var(--t2)", fontSize: 10 }}>{t.trigger}</span>
                  <span style={{ fontSize: 10, color: "var(--t3)" }}>{t.actions} actions</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// FLOW EDITOR
// ============================================================

function FlowEditor({ flow, onBack }) {
  const [showLog, setShowLog] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const trig = TRIGGER_TYPES.find(t => t.id === flow.trigger) || { label: flow.trigger, color: "#607D8B" };
  const isPublished = flow.status === "published";

  const nodeTypeConfig = {
    trigger: { bg: trig.color, label: "Trigger" },
    action: { bg: "#0073EA", label: "Action" },
    delay: { bg: "#607D8B", label: "Delay" },
    condition: { bg: "#FF9800", label: "Condition" },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", borderBottom: "1px solid var(--bd)", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button className="btn btn-g" onClick={onBack}>{FI.ArrowLeft()} Back</button>
          <span style={{ fontSize: 16, fontWeight: 700 }}>{flow.name}</span>
          <span className={`schip ${flow.status}`}>{flow.status === "published" ? "Published" : "Draft"}</span>
          <span style={{ fontSize: 11, color: "var(--t3)" }}>v{flow.version}</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button className="btn btn-s btn-sm" onClick={() => setShowLog(!showLog)}>{FI.FileText()} Log</button>
          <button className="btn btn-s btn-sm">{FI.Play()} Test</button>
          {flow.status === "draft"
            ? <button className="btn btn-p btn-sm">{FI.Zap(14)} Publish</button>
            : <button className="btn btn-s btn-sm">Unpublish</button>}
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Left panel — Settings */}
        <div style={{ width: "30%", borderRight: "1px solid var(--bd)", overflow: "auto", padding: 20, background: "#fff" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Flow Settings</h3>
          <div className="fg"><label className="fl">Name</label><input className="fi" defaultValue={flow.name} /></div>
          <div className="fg"><label className="fl">Description</label><textarea className="fi" style={{ minHeight: 50, resize: "vertical" }} defaultValue={flow.desc} /></div>
          <div className="fg"><label className="fl">Trigger</label>
            <select className="fsel" style={{ width: "100%" }} defaultValue={flow.trigger}>
              {TRIGGER_TYPES.map(t => <option key={t.id} value={t.id}>{t.label} ({t.category})</option>)}
            </select>
          </div>
          <div className="fg"><label className="fl">Send Limit</label>
            <select className="fsel" style={{ width: "100%" }} defaultValue="once">
              <option value="once">Once</option><option value="max_2">Max 2</option><option value="1_per_cycle">1 per billing cycle</option><option value="1_per_30d">1 per 30 days</option><option value="1_per_60d">1 per 60 days</option><option value="every_90d">Every 90 days</option>
            </select>
          </div>
          <div className="fg"><label className="fl">Tags</label><input className="fi" defaultValue={flow.tags.join(", ")} placeholder="trial, onboarding" /></div>

          {isPublished && (
            <div style={{ background: "var(--bg2)", border: "1px solid var(--bd)", borderRadius: "var(--r2)", padding: 14, marginTop: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--t2)", marginBottom: 8 }}>Execution Stats</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {[
                  { v: flow.executions, l: "Triggered", c: "var(--t1)" },
                  { v: Math.round(flow.executions * 0.9), l: "Executed", c: "#43A047" },
                  { v: Math.round(flow.executions * 0.1), l: "Suppressed", c: "var(--t3)" },
                ].map(s => <div key={s.l} style={{ textAlign: "center" }}><div style={{ fontSize: 18, fontWeight: 700, color: s.c }}>{s.v.toLocaleString()}</div><div style={{ fontSize: 10, color: "var(--t3)" }}>{s.l}</div></div>)}
              </div>
            </div>
          )}

          {/* AI Builder */}
          <div style={{ marginTop: 20 }}>
            <div className="ai-input">
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                {FI.Sparkles()} <span style={{ fontSize: 13, fontWeight: 600 }}>AI Flow Builder</span>
              </div>
              <textarea className="ai-textarea" placeholder="Describe your automation in plain English..." value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} />
              <button className="btn btn-sm btn-p" style={{ marginTop: 8 }} disabled={!aiPrompt.trim()}>{FI.Sparkles(12)} Generate Flow</button>
            </div>
          </div>
        </div>

        {/* Right panel — Visual Canvas */}
        <div className="canvas">
          <div style={{ fontSize: 11, color: "var(--t3)", marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
            <span>Flow Canvas — drag to reorder, click to edit</span>
            <button className="btn btn-sm btn-s">{FI.Plus()} Add Node</button>
          </div>

          {flow.nodes && flow.nodes.length > 0 ? flow.nodes.map((node, idx) => {
            const conf = nodeTypeConfig[node.type] || { bg: "#9E9E9E", label: "Node" };
            const actionType = node.actionType ? ACTION_TYPES.find(a => a.id === node.actionType) : null;
            const isCondition = node.type === "condition";

            return (
              <div key={node.id}>
                {idx > 0 && !node.branch && <div className="node-connector" />}
                {node.branch && (
                  <div className="branch-connector">
                    <div className="branch-line" />
                    <span style={{ color: node.branch === "true" ? "#43A047" : "#E53935" }}>
                      {node.branch === "true" ? "✓ Yes" : "✕ No"}
                    </span>
                    <div className="branch-line" style={{ flex: 1 }} />
                  </div>
                )}
                <div className="node">
                  <div className="node-icon" style={{ background: isCondition ? "#FF9800" : node.type === "delay" ? "#607D8B" : node.type === "trigger" ? trig.color : actionType?.color || "#0073EA" }}>
                    {isCondition ? <>{FI.GitBranch(16)}</> : node.type === "delay" ? <>{FI.Clock(16)}</> : node.type === "trigger" ? "⚡" : actionType?.icon || "→"}
                  </div>
                  <div className="node-info">
                    <div className="node-label">{node.label}</div>
                    <div className="node-sub">
                      {node.type === "trigger" && <span className="trigger-chip" style={{ background: trig.color + "18", color: trig.color, fontSize: 10 }}>{trig.label}</span>}
                      {node.type === "delay" && <span style={{ fontFamily: "var(--m)" }}>{node.duration}</span>}
                      {node.type === "condition" && <span style={{ fontFamily: "var(--m)" }}>{node.field} {node.op} {node.val}</span>}
                      {node.type === "action" && actionType && <span style={{ fontSize: 10.5 }}>{actionType.label}</span>}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 3 }}>
                    <button className="btn btn-sm btn-g" style={{ padding: 3 }}>{FI.Copy(12)}</button>
                    <button className="btn btn-sm btn-g" style={{ padding: 3 }}>{FI.Trash(12)}</button>
                  </div>
                </div>
              </div>
            );
          }) : (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--t3)" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>⚡</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "var(--t1)", marginBottom: 4 }}>Empty flow</div>
              <div style={{ fontSize: 12 }}>Add a trigger to get started, or use the AI builder</div>
            </div>
          )}

          {/* Action palette */}
          {flow.nodes && flow.nodes.length > 0 && (
            <div style={{ marginTop: 20, padding: 14, background: "#fff", border: "1px dashed var(--bd)", borderRadius: "var(--r2)" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "var(--t3)", marginBottom: 8 }}>ADD ACTION</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {ACTION_TYPES.map(a => (
                  <button key={a.id} className="btn btn-sm btn-s" style={{ gap: 4 }}>
                    <span style={{ color: a.color }}>{a.icon}</span> {a.label}
                  </button>
                ))}
                <button className="btn btn-sm btn-s" style={{ gap: 4 }}><span style={{ color: "#607D8B" }}>{FI.Clock(12)}</span> Wait</button>
                <button className="btn btn-sm btn-s" style={{ gap: 4 }}><span style={{ color: "#FF9800" }}>{FI.GitBranch(12)}</span> Branch</button>
              </div>
            </div>
          )}
        </div>

        {/* Execution Log Drawer */}
        {showLog && (
          <div style={{ width: 400, borderLeft: "1px solid var(--bd)", background: "#fff", overflow: "auto", flexShrink: 0 }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--bd)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>Execution Log</span>
              <button className="btn btn-g btn-sm" onClick={() => setShowLog(false)}>{FI.X()}</button>
            </div>
            {EXEC_LOG.map(log => (
              <div key={log.id} style={{ padding: "10px 16px", borderBottom: "1px solid var(--bd)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>{log.customer}</span>
                  <span className={`schip ${log.result}`}>{log.result}</span>
                </div>
                <div style={{ fontSize: 11, color: "var(--t3)", marginBottom: 4 }}>
                  {log.trigger} · {log.time} · {log.duration}
                </div>
                {log.actions.length > 0 && (
                  <div style={{ fontSize: 11, color: "var(--t2)" }}>
                    {log.actions.map((a, i) => <div key={i}>{a}</div>)}
                  </div>
                )}
                {log.suppressedBy && <div style={{ fontSize: 11, color: "#FF9800", marginTop: 2 }}>Suppressed: {log.suppressedBy}</div>}
                {log.error && <div style={{ fontSize: 11, color: "#E53935", marginTop: 2 }}>{log.error}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div style={{ padding: "10px 20px", borderTop: "1px solid var(--bd)", background: "var(--bg2)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 12, color: "var(--t3)" }}>
          {isPublished && <span>Triggered {flow.executions.toLocaleString()} times · Last: {flow.lastTriggered}</span>}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button className="btn btn-s" onClick={onBack}>Cancel</button>
          <button className="btn btn-p">Save {flow.status === "draft" ? "Draft" : "& Republish"}</button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// EXECUTION LOG PAGE
// ============================================================

function ExecutionLog() {
  return (
    <div>
      <div className="pg-hd"><div className="pg-title">{FI.FileText(14)} Execution Log</div></div>
      <table className="table">
        <thead><tr><th>ID</th><th>Customer</th><th>Trigger</th><th>Time</th><th>Result</th><th>Duration</th><th>Actions</th></tr></thead>
        <tbody>
          {EXEC_LOG.map(log => (
            <tr key={log.id} style={{ cursor: "default" }}>
              <td style={{ fontFamily: "var(--m)", fontSize: 11 }}>{log.id}</td>
              <td style={{ fontWeight: 600 }}>{log.customer}</td>
              <td><span className="trigger-chip" style={{ background: "var(--bg2)", color: "var(--t2)", fontSize: 10 }}>{log.trigger}</span></td>
              <td style={{ fontSize: 12, color: "var(--t2)" }}>{log.time}</td>
              <td><span className={`schip ${log.result}`}>{log.result}</span></td>
              <td style={{ fontFamily: "var(--m)", fontSize: 11 }}>{log.duration}</td>
              <td style={{ fontSize: 11 }}>
                {log.actions.length > 0 ? log.actions.join(", ") : log.suppressedBy ? <span style={{ color: "#FF9800" }}>Suppressed</span> : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================

// ============================================================
// MODULE 5: SUBSCRIPTION REPORTING
// ============================================================
const PLANS = [
  { slug: "starter", name: "Starter", monthly: 39, subs: 45, trials: 8, mrr: 1755, pctMrr: 35.1, avgLtv: 156, growth: 3, churn: 6.7, conv: 11.4 },
  { slug: "growth", name: "Growth", monthly: 99, subs: 22, trials: 3, mrr: 2178, pctMrr: 43.6, avgLtv: 425, growth: 1, churn: 4.5, conv: 10.0 },
  { slug: "pro", name: "Pro", monthly: 179, subs: 6, trials: 1, mrr: 1074, pctMrr: 15.5, avgLtv: 894, growth: 1, churn: 0, conv: 33.3 },
  { slug: "scale", name: "Scale", monthly: 259, subs: 2, trials: 0, mrr: 518, pctMrr: 5.8, avgLtv: 1554, growth: 0, churn: 0, conv: null },
];
const MOVEMENTS = [
  { type: "Upgrade", from: "Starter", to: "Growth", count: 2, impact: "+$120" },
  { type: "Upgrade", from: "Growth", to: "Pro", count: 1, impact: "+$80" },
  { type: "Downgrade", from: "Growth", to: "Starter", count: 1, impact: "-$60" },
  { type: "New", from: "—", to: "Starter", count: 5, impact: "+$195" },
  { type: "New", from: "—", to: "Growth", count: 2, impact: "+$198" },
  { type: "Churned", from: "Starter", to: "—", count: 2, impact: "-$78" },
  { type: "Churned", from: "Growth", to: "—", count: 1, impact: "-$99" },
];
const EVENTS = [
  { date: "Mar 20", merchant: "Green Garden Supply", event: "Trial Started", plan: "Starter", price: "$39/mo", prev: "—" },
  { date: "Mar 18", merchant: "Tech Gadgets Pro", event: "Cancelled", plan: "Growth", price: "$99/mo", prev: "—" },
  { date: "Mar 15", merchant: "Blue Sky Apparel", event: "Upgrade", plan: "Growth", price: "$99/mo", prev: "Starter" },
  { date: "Mar 12", merchant: "Fashion Hub", event: "Trial Started", plan: "Starter", price: "$39/mo", prev: "—" },
  { date: "Mar 10", merchant: "Home Decor Studio", event: "New Subscription", plan: "Scale", price: "$259/mo", prev: "—" },
  { date: "Mar 8", merchant: "Sportswear Direct", event: "Trial Expired", plan: "Starter", price: "$39/mo", prev: "—" },
  { date: "Mar 5", merchant: "Outdoor Gear Co", event: "Upgrade", plan: "Pro", price: "$179/mo", prev: "Growth" },
];
const TREND = [
  { m:"Apr",a:42,st:25,gr:12,pr:4,sc:1 },{ m:"May",a:45,st:27,gr:13,pr:4,sc:1 },
  { m:"Jun",a:49,st:28,gr:15,pr:5,sc:1 },{ m:"Jul",a:52,st:29,gr:16,pr:5,sc:2 },
  { m:"Aug",a:55,st:30,gr:17,pr:6,sc:2 },{ m:"Sep",a:58,st:32,gr:18,pr:6,sc:2 },
  { m:"Oct",a:60,st:33,gr:19,pr:6,sc:2 },{ m:"Nov",a:63,st:35,gr:19,pr:7,sc:2 },
  { m:"Dec",a:66,st:37,gr:20,pr:7,sc:2 },{ m:"Jan",a:68,st:39,gr:20,pr:7,sc:2 },
  { m:"Feb",a:72,st:42,gr:21,pr:7,sc:2 },{ m:"Mar",a:75,st:45,gr:22,pr:6,sc:2 },
];
const TRIAL_PLANS = [
  { plan:"Starter",started:35,converted:4,rate:"11.4%",days:11.8 },
  { plan:"Growth",started:10,converted:1,rate:"10.0%",days:13.2 },
  { plan:"Pro",started:3,converted:1,rate:"33.3%",days:8.5 },
  { plan:"Scale",started:0,converted:0,rate:"—",days:null },
];
const HEALTH = [
  { name:"Install-to-Trial",val:"40%",status:"yellow",green:">50%",red:"<30%" },
  { name:"Trial-to-Paid",val:"10%",status:"yellow",green:">15%",red:"<8%" },
  { name:"First-Hour Survival",val:"56.2%",status:"yellow",green:">70%",red:"<50%" },
  { name:"Widget During Trial",val:"52%",status:"yellow",green:">60%",red:"<40%" },
  { name:"Onboarding Complete",val:"38%",status:"yellow",green:">50%",red:"<25%" },
];
const CHURN_TENURE = [
  { bucket:"0-30 days",active:12,churned:5,rate:"41.7%",color:"#E53935",insight:"First-month critical" },
  { bucket:"31-90 days",active:18,churned:3,rate:"16.7%",color:"#FF9800",insight:"Settling period" },
  { bucket:"91-180 days",active:20,churned:2,rate:"10.0%",color:"#FFC107",insight:"Stabilizing" },
  { bucket:"181-365 days",active:15,churned:1,rate:"6.7%",color:"#8BC34A",insight:"Loyal base" },
  { bucket:"365+ days",active:10,churned:0,rate:"0%",color:"#43A047",insight:"Stickiest" },
];
const CHURN_PLAN = [
  { plan:"Starter",active:45,churned:3,rate:"6.7%",tenure:"2.1 mo" },
  { plan:"Growth",active:22,churned:1,rate:"4.5%",tenure:"4.3 mo" },
  { plan:"Pro",active:6,churned:0,rate:"0%",tenure:"—" },
  { plan:"Scale",active:2,churned:0,rate:"0%",tenure:"—" },
];
const CHURNED_LIST = [
  { name:"Tech Gadgets Pro",plan:"Growth",tenure:"3 mo",type:"Involuntary",date:"Mar 18",reason:"Payment failed" },
  { name:"Pet Supply World",plan:"Starter",tenure:"5 mo",type:"Voluntary",date:"Mar 12",reason:"No value" },
  { name:"Craft Corner",plan:"Starter",tenure:"1 mo",type:"Voluntary",date:"Mar 5",reason:"Too complex" },
  { name:"Book Nook",plan:"Starter",tenure:"2 mo",type:"Uninstall",date:"Feb 28",reason:"—" },
];
const RET_CURVE = [{m:"M0",p:100},{m:"M1",p:85},{m:"M2",p:78},{m:"M3",p:73},{m:"M4",p:68},{m:"M5",p:65},{m:"M6",p:62},{m:"M7",p:60},{m:"M8",p:58},{m:"M9",p:57},{m:"M10",p:56},{m:"M11",p:55},{m:"M12",p:55}];
const RET_PLAN = { Starter:[100,80,72,65,60,56,52], Growth:[100,90,85,82,78,75,72], Pro:[100,95,92,90,88,85,83] };
const COHORTS = [
  { cohort:"Oct 2025",n:8,months:[100,87.5,75,75,62.5,62.5,62.5] },
  { cohort:"Nov 2025",n:10,months:[100,90,80,70,70,60] },
  { cohort:"Dec 2025",n:6,months:[100,83.3,66.7,66.7] },
  { cohort:"Jan 2026",n:12,months:[100,91.7,83.3] },
  { cohort:"Feb 2026",n:9,months:[100,88.9] },
  { cohort:"Mar 2026",n:11,months:[100] },
];

function SubIc({d,s=18}){return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>}
const SIX = {
  CC:s=><SubIc s={s} d={<><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></>}/>,
  Us:s=><SubIc s={s} d={<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></>}/>,
  Up:s=><SubIc s={s||14} d={<><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></>}/>,
  Dn:s=><SubIc s={s||14} d={<><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></>}/>,
  BC:s=><SubIc s={s} d={<><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></>}/>,
  Fu:s=><SubIc s={s} d={<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>}/>,
  La:s=><SubIc s={s} d={<><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>}/>,
  Ma:s=><SubIc s={s} d={<><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></>}/>,
  Za:s=><SubIc s={s} d={<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>}/>,
  Se:s=><SubIc s={s} d={<><circle cx="12" cy="12" r="3"/><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/></>}/>,
  Ch:s=><SubIc s={s||14} d={<path d="m6 9 6 6 6-6"/>}/>,
  Do:s=><SubIc s={s} d={<><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>}/>,
  Ar:s=><SubIc s={s||14} d={<><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>}/>,
};



function subCColor(p){return p>=90?"#4CAF50":p>=80?"#8BC34A":p>=70?"#FFC107":p>=60?"#FF9800":"#E53935"}
function subCBg(p){return p>=90?"#E8F5E9":p>=80?"#F1F8E9":p>=70?"#FFFDE7":p>=60?"#FFF3E0":"#FDECEA"}
function subEC(e){return e.includes("New")||e.includes("Upgrade")?{b:"#E8F5E9",c:"#43A047"}:e.includes("Cancel")||e.includes("Expired")?{b:"#FDECEA",c:"#E53935"}:{b:"#E3F2FD",c:"#2196F3"}}
function subMC(t){return t==="Upgrade"||t==="New"?{b:"#E8F5E9",c:"#43A047"}:{b:"#FDECEA",c:"#E53935"}}

function SubOverview(){
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

function SubTrials(){
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

function SubChurnPage(){
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

function SubRetentionPage(){
  const [mode,setMode] = useState("relative");
  const maxM = Math.max(...COHORTS.map(c => c.months.length));
  const planColors = { Starter:"#90CAF9", Growth:"#42A5F5", Pro:"#1565C0" };

  return (
    <div>
      <div className="pg-hd">
        <div className="pg-title">{SIX.La()} Subscription Retention</div>
      </div>

      <div className="card">
        <h3>Overall Retention Curve</h3>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 140 }}>
          {RET_CURVE.map((r, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${r.p}%`,
                background: r.p >= 80 ? "#4CAF50" : r.p >= 60 ? "#FFC107" : "#FF9800",
                borderRadius: "3px 3px 0 0",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                paddingTop: 4,
                fontSize: 9,
                fontWeight: 600,
                color: "#fff",
              }}
            >
              {r.p < 100 ? `${r.p}%` : ""}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--t3)", marginTop: 4 }}>
          {RET_CURVE.map(r => (
            <span key={r.m}>{r.m}</span>
          ))}
        </div>
        <div style={{ marginTop: 10, fontSize: 12, color: "var(--t2)" }}>
          M1: <strong>85%</strong> · M6: <strong>62%</strong> · M12: <strong>55%</strong>
        </div>
      </div>

      <div className="card">
        <h3>Retention by Plan</h3>
        <div style={{ display: "flex", gap: 20 }}>
          {Object.entries(RET_PLAN).map(([plan, data]) => (
            <div key={plan} style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: planColors[plan] }} />
                {plan}
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 80 }}>
                {data.map((v, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${v}%`,
                      background: planColors[plan],
                      borderRadius: "2px 2px 0 0",
                      opacity: 0.6 + i * 0.05,
                    }}
                  />
                ))}
              </div>
              <div style={{ fontSize: 10, color: "var(--t3)", marginTop: 4 }}>
                M{data.length - 1}: {data[data.length - 1]}%
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, padding: "10px 14px", background: "#E8F5E9", borderRadius: "var(--r)", fontSize: 12, color: "#1B5E20" }}>
          Pro retains at 83% by M6 vs Starter at 52%. Higher tiers produce stickier customers.
        </div>
      </div>

      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h3 style={{ margin: 0 }}>Cohort Retention Matrix</h3>
          <div className="toggle-grp">
            <button className={`toggle-btn ${mode === "relative" ? "on" : ""}`} onClick={() => setMode("relative")}>
              Relative %
            </button>
            <button className={`toggle-btn ${mode === "absolute" ? "on" : ""}`} onClick={() => setMode("absolute")}>
              Absolute #
            </button>
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="ct">
            <thead>
              <tr>
                <th style={{ textAlign: "left", minWidth: 80 }}>Cohort</th>
                <th>New</th>
                {Array.from({ length: maxM }, (_, i) => (
                  <th key={i}>M{i}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COHORTS.map(c => (
                <tr key={c.cohort}>
                  <td className="cl">{c.cohort}</td>
                  <td style={{ fontWeight: 600 }}>{c.n}</td>
                  {Array.from({ length: maxM }, (_, i) => {
                    const val = c.months[i];
                    if (val === undefined) {
                      return <td key={i} style={{ background: "#FAFAFA", color: "var(--t3)" }}>—</td>;
                    }
                    const display = mode === "relative" ? `${val}%` : String(Math.round(c.n * val / 100));
                    return (
                      <td key={i} style={{ background: subCBg(val), color: subCColor(val), fontWeight: 600 }}>
                        {display}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 10, fontSize: 10, color: "var(--t3)" }}>
          {[
            [">=90%", "#4CAF50", "#E8F5E9"],
            ["80-89%", "#8BC34A", "#F1F8E9"],
            ["70-79%", "#FFC107", "#FFFDE7"],
            ["60-69%", "#FF9800", "#FFF3E0"],
            ["<60%", "#E53935", "#FDECEA"],
          ].map(([label, bc, bg]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: bg, border: `1px solid ${bc}` }} />
              {label}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, padding: "10px 14px", background: "#E3F2FD", borderRadius: "var(--r)", fontSize: 12, color: "#1565C0" }}>
          Jan 2026 cohort retains 8% better than Oct 2025 at the same stage — onboarding improvements are working.
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MODULE 6: PLATFORM REPORTING
// ============================================================
// ============================================================
// DATA
// ============================================================

const FEED = [
  { id: 1, type: "install", shop: "Bloom & Vine", domain: "bloom-vine.myshopify.com", country: "US", plan: "No subscription", time: "2 min ago", shopifyPlan: "shopify", email: "kate@bloomvine.com", history: "First install", onboarding: "Not started" },
  { id: 2, type: "trial_started", shop: "Green Garden Supply", domain: "green-garden.myshopify.com", country: "BR", plan: "Starter", time: "8 min ago", shopifyPlan: "basic", email: "maria@greengarden.com", history: "First install", onboarding: "Step 1/4" },
  { id: 3, type: "uninstall", shop: "Quick Prints Co", domain: "quick-prints.myshopify.com", country: "US", plan: "No subscription", time: "12 min ago", shopifyPlan: "basic", email: "dan@quickprints.com", history: "First install (7 min ago)", onboarding: "Not started" },
  { id: 4, type: "subscription", shop: "Blue Sky Apparel", domain: "bluesky-apparel.myshopify.com", country: "US", plan: "Growth", time: "1 hr ago", shopifyPlan: "shopify_plus", email: "sarah@bluesky.com", history: "Installed 15 days ago", onboarding: "Complete" },
  { id: 5, type: "reinstall", shop: "Book Nook Online", domain: "book-nook.myshopify.com", country: "GB", plan: "No subscription", time: "2 hr ago", shopifyPlan: "basic", email: "tom@booknook.com", history: "Reinstall #2 (uninstalled 22 days ago)", onboarding: "Step 2/4" },
  { id: 6, type: "install", shop: "Artisan Soaps", domain: "artisan-soaps.myshopify.com", country: "CA", plan: "No subscription", time: "3 hr ago", shopifyPlan: "shopify", email: "lily@artisansoaps.com", history: "First install", onboarding: "Not started" },
  { id: 7, type: "uninstall", shop: "Vintage Records", domain: "vintage-records.myshopify.com", country: "US", plan: "Starter", time: "4 hr ago", shopifyPlan: "basic", email: "james@vintagerecords.com", history: "Installed 3 days ago", onboarding: "Step 1/4" },
  { id: 8, type: "review", shop: "Outdoor Gear Co", domain: "outdoor-gear.myshopify.com", country: "CA", plan: "Pro", time: "6 hr ago", shopifyPlan: "shopify", email: "mike@outdoors.com", history: "Installed 9 months ago", onboarding: "Complete", rating: 5 },
  { id: 9, type: "trial_started", shop: "Artisan Soaps", domain: "artisan-soaps.myshopify.com", country: "CA", plan: "Starter", time: "6 hr ago", shopifyPlan: "shopify", email: "lily@artisansoaps.com", history: "First install", onboarding: "Step 1/4" },
  { id: 10, type: "install", shop: "Nordic Threads", domain: "nordic-threads.myshopify.com", country: "DE", plan: "No subscription", time: "8 hr ago", shopifyPlan: "shopify", email: "erik@nordicthreads.com", history: "First install", onboarding: "Not started" },
  { id: 11, type: "uninstall", shop: "Tiny Tots Store", domain: "tiny-tots.myshopify.com", country: "AU", plan: "No subscription", time: "10 hr ago", shopifyPlan: "basic", email: "emma@tinytots.com", history: "First install (4 min ago)", onboarding: "Not started" },
  { id: 12, type: "subscription", shop: "Fashion Hub", domain: "fashion-hub.myshopify.com", country: "US", plan: "Starter", time: "12 hr ago", shopifyPlan: "basic", email: "anna@fashionhub.com", history: "Installed 14 days ago", onboarding: "Step 3/4" },
];

const EVENT_CONFIG = {
  install: { label: "New Install", icon: "↓", color: "#4CAF50", bg: "#E8F5E9" },
  reinstall: { label: "Reinstall", icon: "↻", color: "#2196F3", bg: "#E3F2FD" },
  uninstall: { label: "Uninstall", icon: "✕", color: "#E53935", bg: "#FDECEA" },
  trial_started: { label: "Trial Started", icon: "▶", color: "#FF9800", bg: "#FFF3E0" },
  subscription: { label: "Subscribed", icon: "$", color: "#43A047", bg: "#E8F5E9" },
  review: { label: "Review", icon: "★", color: "#FFC107", bg: "#FFFDE7" },
};

const FIRST_HOUR = [
  { stage: "Installed", time: "0 min", pct: 100, target: 100, color: "#4CAF50" },
  { stage: "Still Here 5 min", time: "+5 min", pct: 82, target: 90, color: "#66BB6A" },
  { stage: "Still Here 10 min", time: "+10 min", pct: 68, target: 80, color: "#FFC107" },
  { stage: "Still Here 15 min", time: "+15 min", pct: 60, target: 75, color: "#FF9800" },
  { stage: "Still Here 30 min", time: "+30 min", pct: 58, target: 72, color: "#FF9800" },
  { stage: "Still Here 60 min", time: "+60 min", pct: 56.2, target: 70, color: "#E53935" },
  { stage: "Trial Started", time: "0-60 min", pct: 40, target: 55, color: "#2196F3" },
  { stage: "Widget Added", time: "0-60 min", pct: 15, target: 35, color: "#9C27B0" },
];

const INSTALL_SOURCE = [
  { source: "App Store (organic)", installs: 45, pct: "56%", trial: "42%", conv: "11%" },
  { source: "App Store (search)", installs: 18, pct: "22%", trial: "38%", conv: "9%" },
  { source: "Direct Link", installs: 8, pct: "10%", trial: "50%", conv: "15%" },
  { source: "Referral", installs: 5, pct: "6%", trial: "60%", conv: "20%" },
  { source: "Partner", installs: 3, pct: "4%", trial: "55%", conv: "18%" },
  { source: "Unknown", installs: 1, pct: "2%", trial: "30%", conv: "5%" },
];

const ACTIVE_TRIALS = [
  { shop: "Green Garden Supply", plan: "Starter", ends: "3 days", onboarding: 1, widget: false, edits: 0, logins: 0, score: 15 },
  { shop: "Fashion Hub", plan: "Starter", ends: "1 day", onboarding: 3, widget: true, edits: 3, logins: 2, score: 62 },
  { shop: "Nordic Threads", plan: "Growth", ends: "12 days", onboarding: 0, widget: false, edits: 0, logins: 0, score: 0 },
  { shop: "Artisan Soaps", plan: "Starter", ends: "13 days", onboarding: 1, widget: false, edits: 0, logins: 1, score: 22 },
  { shop: "Bloom & Vine", plan: "Starter", ends: "14 days", onboarding: 0, widget: false, edits: 0, logins: 0, score: 0 },
];

const CHURN_BUCKETS = [
  { bucket: "0-15 min", pct: 35, cumul: "35%", insight: "Immediate rejection", color: "#E53935" },
  { bucket: "15-60 min", pct: 9, cumul: "44%", insight: "Setup friction", color: "#EF5350" },
  { bucket: "1-24 hr", pct: 8, cumul: "52%", insight: "Not convinced", color: "#FF9800" },
  { bucket: "1-7 days", pct: 12, cumul: "64%", insight: "Trial evaluation", color: "#FFC107" },
  { bucket: "7-14 days", pct: 10, cumul: "74%", insight: "End-of-trial", color: "#FFEB3B" },
  { bucket: "14-30 days", pct: 8, cumul: "82%", insight: "Post-trial", color: "#8BC34A" },
  { bucket: "30+ days", pct: 18, cumul: "100%", insight: "Mature churn", color: "#43A047" },
];

const LOGO_COHORTS = [
  { cohort: "Oct 2025", n: 25, months: [100, 52, 44, 40, 36, 32] },
  { cohort: "Nov 2025", n: 30, months: [100, 55, 48, 43, 38] },
  { cohort: "Dec 2025", n: 18, months: [100, 50, 42, 38] },
  { cohort: "Jan 2026", n: 35, months: [100, 57, 50] },
  { cohort: "Feb 2026", n: 28, months: [100, 60] },
  { cohort: "Mar 2026", n: 32, months: [100] },
];

// Heatmap data: 30 days × 12 five-minute buckets for first hour
const HEATMAP_DATA = Array.from({ length: 15 }, (_, day) =>
  Array.from({ length: 12 }, () => Math.floor(Math.random() * 5))
);

// ============================================================
// ICONS
// ============================================================
function PlatIc({ d, s = 18 }) {
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>;
}

const PIX = {
  Activity: (s) => <PlatIc s={s} d={<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />} />,
  Users: (s) => <PlatIc s={s} d={<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></>} />,
  Mail: (s) => <PlatIc s={s} d={<><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>} />,
  Dollar: (s) => <PlatIc s={s} d={<><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>} />,
  Zap: (s) => <PlatIc s={s} d={<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />} />,
  CC: (s) => <PlatIc s={s} d={<><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></>} />,
  Bar: (s) => <PlatIc s={s} d={<><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></>} />,
  Set: (s) => <PlatIc s={s} d={<><circle cx="12" cy="12" r="3" /><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /></>} />,
  Chev: (s) => <PlatIc s={s || 14} d={<path d="m6 9 6 6 6-6" />} />,
  Layers: (s) => <PlatIc s={s} d={<><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></>} />,
  TrendUp: (s) => <PlatIc s={s || 14} d={<><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></>} />,
  TrendDn: (s) => <PlatIc s={s || 14} d={<><polyline points="22 17 13.5 8.5 8.5 13.5 2 7" /><polyline points="16 17 22 17 22 11" /></>} />,
};

// ============================================================
// CSS
// ============================================================


function platCColor(p) { return p >= 90 ? "#4CAF50" : p >= 80 ? "#8BC34A" : p >= 70 ? "#FFC107" : p >= 60 ? "#FF9800" : p >= 50 ? "#FF5722" : "#E53935"; }
function platCBg(p) { return p >= 90 ? "#E8F5E9" : p >= 80 ? "#F1F8E9" : p >= 70 ? "#FFFDE7" : p >= 60 ? "#FFF3E0" : p >= 50 ? "#FBE9E7" : "#FDECEA"; }

// ============================================================
// ACTIVITY FEED
// ============================================================

function ActivityFeed() {
  const [typeF, setTypeF] = useState("all");
  const [expanded, setExpanded] = useState(null);

  const filtered = FEED.filter(e => typeF === "all" || e.type === typeF);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span className="live-dot" />
        <span style={{ fontSize: 12, fontWeight: 600, color: "#4CAF50" }}>Live</span>
        <span style={{ fontSize: 11, color: "var(--t3)" }}>Auto-refreshing every 5s</span>
      </div>
      <div className="fbar">
        {[["all", "All Events"], ["install", "Installs"], ["reinstall", "Reinstalls"], ["uninstall", "Uninstalls"], ["trial_started", "Trials"], ["subscription", "Subscriptions"], ["review", "Reviews"]].map(([k, l]) => (
          <button
            key={k}
            className={`toggle-btn ${typeF === k ? "on" : ""}`}
            style={{ borderRadius: "var(--r)", border: "1px solid var(--bd)", marginRight: 0 }}
            onClick={() => setTypeF(k)}
          >
            {l}
          </button>
        ))}
      </div>
      <div style={{ background: "#fff", border: "1px solid var(--bd)", borderRadius: "var(--r2)", overflow: "hidden" }}>
        {filtered.map(e => {
          const cfg = EVENT_CONFIG[e.type];
          const isOpen = expanded === e.id;
          return (
            <div key={e.id}>
              <div className="feed-item" onClick={() => setExpanded(isOpen ? null : e.id)}>
                <div className="feed-icon" style={{ background: cfg.color }}>{cfg.icon}</div>
                <div className="feed-info">
                  <div className="feed-label">
                    <span className="tag-chip" style={{ background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                    {e.shop}
                    {e.rating && <span style={{ color: "#FFC107" }}>{"★".repeat(e.rating)}</span>}
                  </div>
                  <div className="feed-sub">{e.domain} {FLAGS[e.country] || ""}</div>
                </div>
                <div className="feed-right">
                  <div className="feed-time">{e.time}</div>
                  <div className="feed-plan">{e.plan}</div>
                </div>
              </div>
              {isOpen && (
                <div className="feed-detail">
                  <div>Shopify Plan: <span>{e.shopifyPlan}</span></div>
                  <div>Email: <span>{e.email}</span></div>
                  <div>History: <span>{e.history}</span></div>
                  <div>Onboarding: <span>{e.onboarding}</span></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// INSTALL ANALYTICS
// ============================================================

function InstallAnalytics() {
  return (
    <div>
      {/* First-Hour Funnel */}
      <div className="card">
        <h3>First-Hour Funnel</h3>
        <div style={{ fontSize: 11, color: "var(--t3)", marginBottom: 12 }}>
          43.8% first-hour churn · Median uninstall at 12 minutes
        </div>
        {FIRST_HOUR.map((s, i) => (
          <div key={s.stage} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{ width: 130, fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{s.stage}</span>
            <div style={{ flex: 1, height: 28, background: "var(--bd)", borderRadius: "var(--r)", overflow: "hidden", position: "relative" }}>
              <div style={{ height: "100%", width: `${s.pct}%`, background: s.color, borderRadius: "var(--r)", display: "flex", alignItems: "center", paddingLeft: 8, color: "#fff", fontSize: 12, fontWeight: 600 }}>
                {s.pct}%
              </div>
              <div style={{ position: "absolute", top: 0, left: `${s.target}%`, height: "100%", borderLeft: "2px dashed rgba(0,0,0,.2)" }} />
            </div>
            <span style={{ fontSize: 10, color: "var(--t3)", width: 60, textAlign: "right" }}>Target: {s.target}%</span>
          </div>
        ))}
      </div>

      {/* First-Hour Heatmap */}
      <div className="card">
        <h3>First-Hour Uninstall Heatmap</h3>
        <div style={{ fontSize: 11, color: "var(--t3)", marginBottom: 12 }}>
          Darker = more uninstalls in that 5-minute window. Each row is a day (last 15 days).
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          <div style={{ width: 50, display: "flex", flexDirection: "column", gap: 2, justifyContent: "flex-end" }}>
            {HEATMAP_DATA.map((_, i) => (
              <div key={i} style={{ height: 16, fontSize: 9, color: "var(--t3)", display: "flex", alignItems: "center" }}>Day {15 - i}</div>
            ))}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: 2, marginBottom: 4 }}>
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} style={{ flex: 1, fontSize: 8, color: "var(--t3)", textAlign: "center" }}>{i * 5}m</div>
              ))}
            </div>
            {HEATMAP_DATA.map((row, ri) => (
              <div key={ri} style={{ display: "flex", gap: 2, marginBottom: 2 }}>
                {row.map((val, ci) => (
                  <div key={ci} style={{ flex: 1, height: 16, borderRadius: 2, background: val === 0 ? "#F5F5F5" : `rgba(229, 57, 53, ${Math.min(val / 4, 1)})` }} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Install Source */}
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--bd)" }}>
          <h3 style={{ margin: 0 }}>Install Source Attribution (30d)</h3>
        </div>
        <table className="table" style={{ border: "none" }}>
          <thead><tr><th>Source</th><th>Installs</th><th>% Total</th><th>Trial Rate</th><th>Conversion</th></tr></thead>
          <tbody>
            {INSTALL_SOURCE.map(s => (
              <tr key={s.source} style={{ cursor: "default" }}>
                <td style={{ fontWeight: 600 }}>{s.source}</td>
                <td style={{ fontWeight: 700 }}>{s.installs}</td>
                <td>{s.pct}</td>
                <td>{s.trial}</td>
                <td style={{ fontWeight: 600, color: parseFloat(s.conv) >= 15 ? "#43A047" : parseFloat(s.conv) >= 10 ? "#FF9800" : "#E53935" }}>{s.conv}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================
// TRIALS TAB
// ============================================================

function TrialsTab() {
  return (
    <div>
      <div className="metrics" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
        {[
          { v: "12", l: "Trials Started (Mar)", d: "↑ +20% vs Feb", up: true },
          { v: "6", l: "Converted", d: "↑ +20%", up: true },
          { v: "50%", l: "Conversion Rate", d: "→ Flat", up: null },
          { v: "11.2d", l: "Avg Time to Convert", d: "↑ Faster", up: true },
        ].map(m => (
          <div key={m.l} className="mc">
            <div className="mc-v">{m.v}</div>
            <div className="mc-l">{m.l}</div>
            {m.up !== null && <div className={`mc-d ${m.up ? "up" : "dn"}`}>{m.d}</div>}
            {m.up === null && <div style={{ fontSize: 10, color: "var(--t3)", marginTop: 3 }}>{m.d}</div>}
          </div>
        ))}
      </div>
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--bd)" }}>
          <h3 style={{ margin: 0 }}>Active Trials</h3>
        </div>
        <table className="table" style={{ border: "none" }}>
          <thead><tr><th>Shop</th><th>Plan</th><th>Ends In</th><th>Onboarding</th><th>Widget</th><th>Edits</th><th>Logins</th><th>Score</th></tr></thead>
          <tbody>
            {ACTIVE_TRIALS.map(t => {
              const scoreColor = t.score >= 80 ? "#43A047" : t.score >= 50 ? "#FF9800" : "#E53935";
              const daysLeft = parseInt(t.ends);
              return (
                <tr key={t.shop} style={{ cursor: "default" }}>
                  <td style={{ fontWeight: 600 }}>{t.shop}</td>
                  <td>{t.plan}</td>
                  <td style={{ color: daysLeft <= 3 ? "#E53935" : "var(--t1)", fontWeight: daysLeft <= 3 ? 700 : 400 }}>{t.ends}</td>
                  <td>
                    <span className="progress-bar"><span className="progress-fill" style={{ width: `${(t.onboarding / 4) * 100}%`, background: "#0073EA" }} /></span>
                    {t.onboarding}/4
                  </td>
                  <td>{t.widget ? <span style={{ color: "#43A047" }}>✓</span> : <span style={{ color: "#E53935" }}>✕</span>}</td>
                  <td>{t.edits}</td>
                  <td>{t.logins}</td>
                  <td style={{ fontWeight: 700, color: scoreColor }}>{t.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================
// LOGO CHURN
// ============================================================

function LogoChurn() {
  const maxPct = Math.max(...CHURN_BUCKETS.map(b => b.pct));
  return (
    <div>
      <div className="metrics" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
        <div className="mc"><div className="mc-v" style={{ color: "#E53935" }}>8.2%</div><div className="mc-l">Basic Logo Churn</div><div style={{ fontSize: 10, color: "var(--t3)", marginTop: 3 }}>Target: {"<"}5%</div></div>
        <div className="mc"><div className="mc-v" style={{ color: "#FF9800" }}>7.5%</div><div className="mc-l">Net Logo Churn</div><div style={{ fontSize: 10, color: "var(--t3)", marginTop: 3 }}>Target: {"<"}3%</div></div>
        <div className="mc"><div className="mc-v" style={{ color: "#E53935" }}>43.8%</div><div className="mc-l">First-Hour Churn</div><div style={{ fontSize: 10, color: "var(--t3)", marginTop: 3 }}>Target: {"<"}25%</div></div>
        <div className="mc"><div className="mc-v" style={{ color: "#FF9800" }}>~55%</div><div className="mc-l">First-Week Churn</div><div style={{ fontSize: 10, color: "var(--t3)", marginTop: 3 }}>Target: {"<"}35%</div></div>
      </div>
      <div className="card">
        <h3>Churn by Time Bucket</h3>
        {CHURN_BUCKETS.map(b => (
          <div key={b.bucket} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ width: 80, fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{b.bucket}</span>
            <div style={{ flex: 1, height: 10, background: "var(--bd)", borderRadius: 5, overflow: "hidden" }}>
              <div style={{ width: `${(b.pct / maxPct) * 100}%`, height: "100%", background: b.color, borderRadius: 5 }} />
            </div>
            <span style={{ fontFamily: "var(--m)", fontSize: 12, width: 35, textAlign: "right", fontWeight: 700, color: b.color }}>{b.pct}%</span>
            <span style={{ fontSize: 10, color: "var(--t3)", width: 70, textAlign: "right" }}>({b.cumul})</span>
            <span style={{ fontSize: 10, color: "var(--t2)", width: 100, textAlign: "right" }}>{b.insight}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// LOGO RETENTION
// ============================================================

function LogoRetention() {
  const [mode, setMode] = useState("relative");
  const maxM = Math.max(...LOGO_COHORTS.map(c => c.months.length));

  return (
    <div>
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h3 style={{ margin: 0 }}>Logo Retention Cohorts</h3>
          <div className="toggle-grp">
            <button className={`toggle-btn ${mode === "relative" ? "on" : ""}`} onClick={() => setMode("relative")}>Relative %</button>
            <button className={`toggle-btn ${mode === "absolute" ? "on" : ""}`} onClick={() => setMode("absolute")}>Absolute #</button>
          </div>
        </div>
        <div style={{ fontSize: 11, color: "var(--t3)", marginBottom: 12 }}>
          Logo retention is lower than subscription retention — it includes all installs, most of which churn before paying.
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="ct">
            <thead>
              <tr>
                <th style={{ textAlign: "left", minWidth: 80 }}>Cohort</th>
                <th>Installs</th>
                {Array.from({ length: maxM }, (_, i) => <th key={i}>M{i}</th>)}
              </tr>
            </thead>
            <tbody>
              {LOGO_COHORTS.map(c => (
                <tr key={c.cohort}>
                  <td className="cl">{c.cohort}</td>
                  <td style={{ fontWeight: 600 }}>{c.n}</td>
                  {Array.from({ length: maxM }, (_, i) => {
                    const val = c.months[i];
                    if (val === undefined) {
                      return <td key={i} style={{ background: "#FAFAFA", color: "var(--t3)" }}>—</td>;
                    }
                    const display = mode === "relative" ? `${val}%` : String(Math.round(c.n * val / 100));
                    return (
                      <td key={i} style={{ background: platCBg(val), color: platCColor(val), fontWeight: 600 }}>
                        {display}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 10, fontSize: 10, color: "var(--t3)" }}>
          {[[">=90%", "#4CAF50", "#E8F5E9"], ["70-89%", "#8BC34A", "#F1F8E9"], ["50-69%", "#FFC107", "#FFFDE7"], ["30-49%", "#FF9800", "#FFF3E0"], ["<30%", "#E53935", "#FDECEA"]].map(([l, bc, bg]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: bg, border: `1px solid ${bc}` }} />{l}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, padding: "10px 14px", background: "#E3F2FD", borderRadius: "var(--r)", fontSize: 12, color: "#1565C0" }}>
          Feb 2026 cohort has 60% M1 retention vs 52% for Oct 2025 — a 15% improvement. Your onboarding redesign is having measurable impact.
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================


// ============================================================
// UNIFIED CRM APP — Navigation & Layout
// ============================================================

export default function App() {
  const [mod, setMod] = useState("customer");
  const [sub, setSub] = useState("customers");
  const [custStore, setCustStore] = useState(null);
  const [emailEditTrigger, setEmailEditTrigger] = useState(null);
  const [emailShowEditor, setEmailShowEditor] = useState(false);
  const [emailToast, setEmailToast] = useState(null);
  const [flowEditFlow, setFlowEditFlow] = useState(null);
  const [flowShowTemplates, setFlowShowTemplates] = useState(false);
  const [expanded, setExpanded] = useState("customer");

  const navTo = (m, s) => { setMod(m); setSub(s); setExpanded(m); setCustStore(null); setFlowEditFlow(null); setEmailShowEditor(false); };

  const emailOpenEditor = (t) => { setEmailEditTrigger(t); setEmailShowEditor(true); };
  const emailCloseEditor = () => { setEmailShowEditor(false); setEmailEditTrigger(null); };
  const emailHandleSave = (st) => { setEmailToast({ msg: `Template ${st === "active" ? "activated" : "saved as draft"}.`, type: "ok" }); emailCloseEditor(); };

  const flowHandleEdit = (f) => { setFlowEditFlow(f); setSub("flow-editor"); };
  const flowHandleBack = () => { setFlowEditFlow(null); setSub("flow-list"); };
  const flowHandleTemplateSelect = (t) => {
    setFlowShowTemplates(false);
    if (t) { const ex = FLOWS.find(f => f.name === t.name); if (ex) flowHandleEdit(ex); }
    else { flowHandleEdit({ id: "new", name: "New Flow", desc: "", status: "draft", trigger: "app.installed", actionsCount: 0, executions: 0, lastTriggered: "—", tags: [], createdBy: "rahul@itgeeks.com", version: 1, nodes: [] }); }
  };

  const MODULES = [
    { id: "customer", label: "Customer", icon: "users", subs: [
      { id: "customers", label: "All Customers" },
      { id: "churn-risk", label: "Churn Risk" },
      { id: "segments", label: "Segments" },
    ]},
    { id: "email", label: "Email", icon: "mail", subs: [
      { id: "email-center", label: "Email Center" },
      { id: "customer-template", label: "Customer Template" },
      { id: "email-marketing", label: "Email Marketing" },
      { id: "email-analytics", label: "Email Analytics" },
      { id: "suppression-mgmt", label: "Suppression Mgmt" },
      { id: "suppression-ref", label: "Suppression Rules" },
    ]},
    { id: "revenue", label: "Revenue", icon: "dollar", subs: [
      { id: "mrr", label: "MRR Dashboard" },
      { id: "rev-churn", label: "Revenue Churn" },
      { id: "rev-retention", label: "Retention & Cohorts" },
    ]},
    { id: "flows", label: "Flows", icon: "activity", subs: [
      { id: "flow-list", label: "All Flows" },
      { id: "flow-log", label: "Execution Log" },
    ]},
    { id: "subscription", label: "Subscriptions", icon: "card", section: "Reports", subs: [
      { id: "sub-overview", label: "Overview" },
      { id: "sub-trials", label: "Trials" },
      { id: "sub-churn", label: "Churn" },
      { id: "sub-retention", label: "Retention" },
    ]},
    { id: "platform", label: "Platform", icon: "layers", subs: [
      { id: "plat-feed", label: "Activity Feed" },
      { id: "plat-installs", label: "Install Analytics" },
      { id: "plat-trials", label: "Trials" },
      { id: "plat-churn", label: "Logo Churn" },
      { id: "plat-retention", label: "Retention" },
    ]},
  ];

  const iconSvg = (name, s=16) => {
    const paths = {
      users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></>,
      mail: <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></>,
      dollar: <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
      activity: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>,
      card: <><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></>,
      layers: <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
      chevDown: <path d="m6 9 6 6 6-6"/>,
      settings: <><circle cx="12" cy="12" r="3"/><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/></>,
    };
    return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
  };

  let prevSection = "Main";

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        {/* ─── SIDEBAR ─── */}
        <div className="sb">
          <div className="sb-logo">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#323338"/><path d="M7 8h10M7 12h7M7 16h10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
            <div><b>account editor</b><small>CRM</small></div>
          </div>
          <div className="sb-nav">
            {MODULES.map(m => {
              const section = m.section || "Main";
              const showHeader = section !== prevSection;
              prevSection = section;
              return (
                <div key={m.id}>
                  {showHeader && <div className="sb-hd" style={{ marginTop: 8 }}>{section}</div>}
                  {m.id === MODULES[0].id && <div className="sb-hd">Main</div>}
                  <div
                    className={`sb-item ${mod === m.id ? "" : ""}`}
                    style={{ fontWeight: mod === m.id ? 600 : 400 }}
                    onClick={() => { setExpanded(expanded === m.id ? null : m.id); if (mod !== m.id) navTo(m.id, m.subs[0].id); }}
                  >
                    {iconSvg(m.icon)}
                    {m.label}
                    <span style={{ marginLeft: "auto", transform: expanded === m.id ? "rotate(0)" : "rotate(-90deg)", transition: "transform .2s" }}>
                      {iconSvg("chevDown", 14)}
                    </span>
                  </div>
                  {expanded === m.id && m.subs.map(s => (
                    <div
                      key={s.id}
                      className={`sb-item sb-indent ${sub === s.id ? "on" : ""}`}
                      onClick={() => navTo(m.id, s.id)}
                    >
                      {s.label}
                    </div>
                  ))}
                </div>
              );
            })}
            <div className="sb-hd" style={{ marginTop: 12 }}>Settings</div>
            <div className="sb-item" style={{ opacity: .45 }}>{iconSvg("settings")} Settings</div>
          </div>
        </div>

        {/* ─── MAIN CONTENT ─── */}
        <div className="main">
          <div className="topbar">
            <div style={{ fontSize: 13, fontWeight: 600, color: "#323338" }}>
              {MODULES.find(m => m.id === mod)?.label || ""}
              <span style={{ color: "#9699A6", fontWeight: 400 }}> / {MODULES.find(m => m.id === mod)?.subs.find(s => s.id === sub)?.label || ""}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ padding: "3px 8px", borderRadius: 4, fontSize: 10, fontWeight: 600, background: "#E8F5E8", color: "#258750", border: "1px solid #C5E8C5" }}>Development</span>
              <span style={{ fontSize: 12, color: "#676879", cursor: "pointer" }}>Sign Out</span>
            </div>
          </div>
          <div className="content">
            {emailToast && <Toast msg={emailToast.msg} type={emailToast.type} onClose={() => setEmailToast(null)} />}
            {flowShowTemplates && <TemplateChooser onClose={() => setFlowShowTemplates(false)} onSelect={flowHandleTemplateSelect} />}

            {/* CUSTOMER */}
            {mod === "customer" && sub === "customers" && !custStore && <CustomerList onSelect={setCustStore} />}
            {mod === "customer" && sub === "customers" && custStore && <Detail store={custStore} onBack={() => setCustStore(null)} />}
            {mod === "customer" && sub === "churn-risk" && !custStore && <ChurnDash onSelect={setCustStore} />}
            {mod === "customer" && sub === "churn-risk" && custStore && <Detail store={custStore} onBack={() => setCustStore(null)} />}
            {mod === "customer" && sub === "segments" && <CustomerList onSelect={setCustStore} />}

            {/* EMAIL */}
            {mod === "email" && !emailShowEditor && sub === "email-center" && <EmailCenter onEdit={emailOpenEditor} />}
            {mod === "email" && emailShowEditor && <TemplateEditor trigger={emailEditTrigger} onBack={emailCloseEditor} onSave={emailHandleSave} />}
            {mod === "email" && sub === "customer-template" && !emailShowEditor && <CustomerTemplate onEdit={emailOpenEditor} />}
            {mod === "email" && sub === "email-marketing" && !emailShowEditor && <EmailMarketing />}
            {mod === "email" && sub === "email-analytics" && !emailShowEditor && <EmailAnalytics />}
            {mod === "email" && sub === "suppression-mgmt" && !emailShowEditor && <SuppressionMgmt />}
            {mod === "email" && sub === "suppression-ref" && !emailShowEditor && <SuppressionRulesRef />}

            {/* REVENUE */}
            {mod === "revenue" && sub === "mrr" && <MRRDashboard />}
            {mod === "revenue" && sub === "rev-churn" && <RevenueChurn />}
            {mod === "revenue" && sub === "rev-retention" && <RevenueRetention />}

            {/* FLOWS */}
            {mod === "flows" && sub === "flow-list" && !flowEditFlow && <FlowList onEdit={flowHandleEdit} onShowTemplates={() => setFlowShowTemplates(true)} />}
            {mod === "flows" && sub === "flow-editor" && flowEditFlow && <FlowEditor flow={flowEditFlow} onBack={flowHandleBack} />}
            {mod === "flows" && sub === "flow-log" && <ExecutionLog />}

            {/* SUBSCRIPTION */}
            {mod === "subscription" && sub === "sub-overview" && <SubOverview />}
            {mod === "subscription" && sub === "sub-trials" && <SubTrials />}
            {mod === "subscription" && sub === "sub-churn" && <SubChurnPage />}
            {mod === "subscription" && sub === "sub-retention" && <SubRetentionPage />}

            {/* PLATFORM */}
            {mod === "platform" && sub === "plat-feed" && <ActivityFeed />}
            {mod === "platform" && sub === "plat-installs" && <InstallAnalytics />}
            {mod === "platform" && sub === "plat-trials" && <TrialsTab />}
            {mod === "platform" && sub === "plat-churn" && <LogoChurn />}
            {mod === "platform" && sub === "plat-retention" && <LogoRetention />}
          </div>
        </div>
      </div>
    </>
  );
}

