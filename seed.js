<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>KN Track Flow</title>
<link rel="icon" id="faviconLink" type="image/png" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet"/>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jspdf-autotable@3.8.1/dist/jspdf.plugin.autotable.min.js"></script>
<style>
*,*::before,*::after{box-sizing:border-box}
html{scroll-behavior:smooth}


*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}

:root{
  /* ── KN Brand Palette ── */
  --kn1:#00306A;    /* Primary KN Blue */
  --kn2:#002562;    /* Darker variant */
  --kn3:#002864;    /* Mid-deep blue */
  --kn4:#002965;    /* Brand shade */

  /* ── Backgrounds ── */
  --bg:#f4f7fc;--bg2:#ffffff;--bg3:#edf2f9;--bg4:#dce6f4;

  /* ── Borders ── */
  --bdr:rgba(0,48,106,.09);--bdr2:rgba(0,48,106,.18);

  /* ── Text ── */
  --tx:#00306A;--tx2:#3a5a8a;--tx3:#7a96b8;

  /* ── Accent (primary KN Blue) ── */
  --ac:#00306A;--adim:rgba(0,48,106,.08);--ah:#002562;

  /* ── Status colors (functional, kept distinct) ── */
  --gn:#059669;--gdim:rgba(5,150,105,.10);
  --rd:#dc2626;--rdim:rgba(220,38,38,.08);
  --or:#d97706;--odim:rgba(217,119,6,.10);
  --tl:#0891b2;--tdim:rgba(8,145,178,.10);
  --pu:#5b4ecb;--pudim:rgba(91,78,203,.10);

  /* ── Fonts ── */
  --font-sans:"Inter",ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  --fn:var(--font-sans);--mo:'IBM Plex Mono',monospace;--dp:'Inter',ui-sans-serif,system-ui,sans-serif;

  /* ── Radii & Shadows ── */
  --r:6px;--r2:10px;--r3:14px;
  --sh:0 1px 4px rgba(0,48,106,.08),0 1px 2px rgba(0,48,106,.05);
  --sh2:0 4px 16px rgba(0,48,106,.12);--sh3:0 8px 32px rgba(0,48,106,.18);
  --sidebar-w:240px;
}
/* Dark mode */
/* ══════════════════════════════════════════════════
   DARK MODE — Dynamic KN Brand Dark Theme
   Optimised for WCAG AA contrast on all elements.
   All values use CSS custom properties so JS can
   fine-tune them live when themes are switched.
   ══════════════════════════════════════════════════ */
body.dark{
  /* ── Backgrounds (layered depth, KN navy family) ── */
  --bg:#061022;       /* page base — deepest */
  --bg2:#0c1c36;      /* cards, sidebar, topbar */
  --bg3:#112444;      /* inputs, hover rows, raised areas */
  --bg4:#1a3058;      /* borders visible on bg3, active states */

  /* ── Borders ── */
  --bdr:rgba(100,160,255,.10);
  --bdr2:rgba(100,160,255,.18);

  /* ── Text — high contrast on KN navy ── */
  --tx:#e8f2ff;        /* primary text — near white with blue tint, WCAG AA */
  --tx2:#9bbee8;       /* secondary text — clearly readable */
  --tx3:#5a82ae;       /* muted/placeholder — still legible */

  /* ── KN accent brightened for dark ── */
  --ac:#5ba3e0;        /* brightened KN blue — 4.8:1 on bg2 */
  --adim:rgba(91,163,224,.14);
  --ah:#76b8f0;        /* hover — even lighter */

  /* ── Status colors — all brightened for dark bg ── */
  --gn:#34d399;  --gdim:rgba(52,211,153,.14);   /* green */
  --rd:#fc8181;  --rdim:rgba(252,129,129,.12);   /* red */
  --or:#fbbf24;  --odim:rgba(251,191,36,.12);    /* amber */
  --tl:#38bdf8;  --tdim:rgba(56,189,248,.12);    /* teal */
  --pu:#a78bfa;  --pudim:rgba(167,139,250,.12);  /* purple */

  /* ── Shadows — deeper for dark ── */
  --sh:0 2px 10px rgba(0,0,0,.5),0 1px 3px rgba(0,0,0,.4);
  --sh2:0 6px 24px rgba(0,0,0,.6);
  --sh3:0 12px 48px rgba(0,0,0,.7);
}

/* ════ BASE LAYOUT ════════════════════════════════ */
body.dark{background:var(--bg);color:var(--tx)}
body.dark .main{margin-left:var(--sidebar-w);flex:1;min-height:100vh}
body.dark .content{padding:20px 24px;background:var(--bg)}

/* ════ SIDEBAR ════════════════════════════════════ */
body.dark .sidebar{
  background:var(--bg2);
  border-right:1px solid var(--bdr);
  box-shadow:2px 0 12px rgba(0,0,0,.3);
}
body.dark .logo-area{border-color:var(--bdr)}
body.dark .logo-mark{color:var(--ac)}
body.dark .logo-sub{color:var(--tx3)}
body.dark .nav-sec{
  color:var(--tx3);
  text-transform:uppercase;
  letter-spacing:1px;
}
body.dark .ni{
  color:var(--tx2);
  border-radius:6px;
}
body.dark .ni:hover{
  background:var(--bg3);
  color:var(--tx);
}
body.dark .ni.active{
  background:rgba(91,163,224,.15);
  color:var(--ac);
  border-left:3px solid var(--ac);
  padding-left:7px;
}
body.dark .sfoot{border-top:1px solid var(--bdr)}
body.dark .user-pill{
  background:var(--bg3);
  border:1px solid var(--bdr);
}
body.dark .user-name{color:var(--tx);font-weight:600}
body.dark .user-role{color:var(--tx3)}
body.dark .logout-btn{
  background:transparent;
  border:1px solid var(--bdr2);
  color:var(--tx3);
}
body.dark .logout-btn:hover{
  background:rgba(252,129,129,.1);
  color:var(--rd);
  border-color:rgba(252,129,129,.3);
}

/* ════ TOPBAR ══════════════════════════════════════ */
body.dark .topbar{background:var(--bg2);border-bottom:1px solid var(--bdr);padding:10px 24px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;position:sticky;top:0;z-index:50;box-shadow:var(--sh)}
body.dark .ptitle{color:var(--tx);font-family:var(--dp);}
body.dark .ptitle span{color:var(--ac)}
body.dark .sync-info{color:var(--tx3)}
body.dark .spill.live{background:rgba(52,211,153,.12);color:var(--gn)}
body.dark .spill.saving{background:rgba(91,163,224,.12);color:var(--ac)}
body.dark .spill.idle{background:var(--bg3);color:var(--tx3)}
body.dark .dm-toggle{
  background:var(--bg3);
  border:1px solid var(--bdr2);
  color:var(--tx2);
}
body.dark .dm-toggle:hover{background:var(--bg4);color:var(--tx)}

/* ════ BUTTONS ═════════════════════════════════════ */
body.dark .btn{
  background:var(--bg3);
  border:1px solid var(--bdr2);
  color:var(--tx);
  box-shadow:none;
}
body.dark .btn:hover{background:var(--bg4);color:var(--tx)}
body.dark .btn.pri{
  background:var(--ac);
  border-color:var(--ac);
  color:#fff;
  box-shadow:0 2px 12px rgba(91,163,224,.3);
}
body.dark .btn.pri:hover{
  background:var(--ah);
  box-shadow:0 4px 16px rgba(91,163,224,.4);
}
body.dark .btn.ghost{
  background:transparent;
  border:1px solid var(--bdr2);
  color:var(--tx2);
}
body.dark .btn.ghost:hover{background:var(--bg3);color:var(--tx)}
body.dark .btn.danger{background:var(--rd);border-color:var(--rd);color:#fff}
body.dark .btn.danger:hover{background:#f87171}
body.dark .btn.success{background:var(--gn);border-color:var(--gn);color:#0a1a0a}

/* ════ ACTION BUTTONS ══════════════════════════════ */
body.dark .act{
  background:var(--bg3);
  border:1px solid var(--bdr);
  color:var(--tx2);
}
body.dark .act:hover{background:var(--bg4);color:var(--tx)}
body.dark .act.disp:hover{background:rgba(52,211,153,.15);color:var(--gn);border-color:rgba(52,211,153,.3)}
body.dark .act.del:hover{background:rgba(252,129,129,.12);color:var(--rd);border-color:rgba(252,129,129,.3)}
body.dark .act.arch:hover{background:rgba(251,191,36,.12);color:var(--or);border-color:rgba(251,191,36,.3)}
body.dark .act.plk:hover{background:rgba(91,163,224,.15);color:var(--ac);border-color:rgba(91,163,224,.3)}

/* ════ FORMS & INPUTS ══════════════════════════════ */
body.dark input[type=text],
body.dark input[type=password],
body.dark input[type=email],
body.dark input[type=number],
body.dark input[type=date],
body.dark input[type=url],
body.dark input[type=color],
body.dark select,
body.dark textarea,
body.dark .field input,
body.dark .field select,
body.dark .field textarea{
  background:var(--bg3);
  border:1px solid var(--bdr2);
  color:var(--tx);
}
body.dark input::placeholder,
body.dark textarea::placeholder{color:var(--tx3)}
body.dark input:focus,
body.dark select:focus,
body.dark textarea:focus{
  border-color:var(--ac);
  background:rgba(91,163,224,.06);
  outline:none;
  box-shadow:0 0 0 3px rgba(91,163,224,.15);
}
body.dark label,
body.dark .af label{color:var(--tx2)}

/* ════ TABLES ══════════════════════════════════════ */
body.dark .tbl-wrap{background:var(--bg2);border:1px solid var(--bdr);border-radius:var(--r2);overflow:hidden;box-shadow:var(--sh)}
body.dark table{background:transparent}
body.dark thead th{
  background:var(--bg3);
  color:var(--tx2);
  border-bottom:1px solid var(--bdr2);
  font-weight:600;
}
body.dark tbody td{
  color:var(--tx);
  border-bottom:1px solid rgba(100,160,255,.06);
}
body.dark tbody tr:nth-child(even) td{background:rgba(255,255,255,.02)}
body.dark tbody tr:hover td{
  background:rgba(91,163,224,.08);
}
body.dark .mono{color:var(--tx)}
body.dark .dim{color:var(--tx2)}
body.dark .muted{color:var(--tx3)}
body.dark .rtbl thead th{
  background:var(--bg3);
  color:var(--tx2);
}
body.dark .rtbl td{
  color:var(--tx);
  border-color:rgba(100,160,255,.06);
}
body.dark .rtbl tbody tr:hover td{background:rgba(91,163,224,.08)}

/* ════ CARDS & PANELS ══════════════════════════════ */
body.dark .sc{
  background:var(--bg2);
  border:1px solid var(--bdr);
}
body.dark .sl{color:var(--tx2)}
body.dark .sv{color:var(--tx)}
body.dark .ss{color:var(--tx3)}
body.dark .sc.ca .sv,.sc.va{color:var(--ac)}
body.dark .sc.cg .sv,.sc.vg{color:var(--gn)}
body.dark .sc.cp .sv,.sc.vp{color:var(--pu)}
body.dark .sc.co .sv,.sc.vo{color:var(--or)}
body.dark .sc.ct .sv,.sc.vt{color:var(--tl)}

body.dark .admin-card{
  background:var(--bg2);
  border:1px solid var(--bdr);
}
body.dark .admin-title{color:var(--tx);font-weight:600}
body.dark .admin-sub{color:var(--tx2)}
body.dark .admin-grid .admin-card:hover{border-color:var(--bdr2)}

body.dark .admin-tabs{
  background:var(--bg3);
  border-bottom:1px solid var(--bdr);
}
body.dark .admin-tab{color:var(--tx2)}
body.dark .admin-tab:hover{color:var(--tx);background:var(--bg4)}
body.dark .admin-tab.active{
  background:var(--bg2);
  color:var(--ac);
  border-bottom:2px solid var(--ac);
}

body.dark .cc{background:var(--bg2);border:1px solid var(--bdr)}
body.dark .ctitle{color:var(--tx)}
body.dark .csub{color:var(--tx2)}

/* ════ MODALS ══════════════════════════════════════ */
body.dark .modal{background:var(--bg2);border:1px solid var(--bdr);border-radius:var(--r3);width:100%;max-width:680px;padding:24px;box-shadow:var(--sh3);animation:sli .15s ease;margin:auto}
body.dark .mhdr{display:flex;align-items:center;justify-content:space-between;margin:-24px -24px 18px;padding:16px 24px;background:var(--bg3);border-bottom:1px solid var(--bdr);border-radius:var(--r3) var(--r3) 0 0}
body.dark .mhdr h2{color:var(--tx)}
body.dark .mbd{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:200;display:none;align-items:flex-start;justify-content:center;padding:20px 16px;overflow-y:auto;backdrop-filter:blur(3px)}
.mbd.show{display:flex}
body.dark .mft{
  background:var(--bg3);
  border-top:1px solid var(--bdr);
}
body.dark .modal-overlay,
body.dark #pwdResetOverlay{background:rgba(0,0,0,.75)}
body.dark #pwdResetOverlay > div{
  background:var(--bg2);
  border:1px solid var(--bdr2);
}

/* ════ BADGES ══════════════════════════════════════ */
body.dark .badge.pending{
  background:rgba(251,191,36,.12);
  color:#fcd34d;
  border:1px solid rgba(251,191,36,.25);
}
body.dark .badge.scheduled{
  background:rgba(167,139,250,.12);
  color:#c4b5fd;
  border:1px solid rgba(167,139,250,.25);
}
body.dark .badge.staged{
  background:rgba(91,163,224,.14);
  color:#93c5fd;
  border:1px solid rgba(91,163,224,.28);
}
body.dark .badge.dispatched{
  background:rgba(52,211,153,.12);
  color:#6ee7b7;
  border:1px solid rgba(52,211,153,.25);
}
body.dark .badge.deleted{
  background:rgba(252,129,129,.1);
  color:#fca5a5;
  border:1px solid rgba(252,129,129,.25);
}
body.dark .badge.archived{
  background:rgba(255,255,255,.06);
  color:var(--tx3);
  border:1px solid var(--bdr);
}
body.dark .badge.admin-role{
  background:rgba(251,191,36,.12);
  color:#fcd34d;
}
body.dark .badge.operator-role{
  background:rgba(91,163,224,.14);
  color:#93c5fd;
}
body.dark .badge.ontime{
  background:rgba(52,211,153,.12);
  color:#6ee7b7;
}
body.dark .badge.late{
  background:rgba(252,129,129,.1);
  color:#fca5a5;
}

/* ════ TAB BARS ════════════════════════════════════ */
body.dark .tab-bar{display:flex;margin-bottom:14px;background:var(--bg2);border:1px solid var(--bdr);border-radius:var(--r);overflow:hidden;width:fit-content;box-shadow:var(--sh)}
body.dark .tab{
  color:var(--tx2);
  background:transparent;
font-family:var(--fn);}
body.dark .tab:hover{
  background:var(--bg3);
  color:var(--tx);
}
body.dark .tab.active{
  background:var(--ac);
  color:#fff;
  box-shadow:0 2px 8px rgba(91,163,224,.3);
}

/* ════ INFO BOXES ══════════════════════════════════ */
body.dark .ibox{
  background:rgba(91,163,224,.08);
  border:1px solid rgba(91,163,224,.2);
  color:var(--tx2);
}
body.dark .ibox strong{color:var(--tx)}

/* ════ DRAG ZONES ══════════════════════════════════ */
body.dark .dz{
  background:var(--bg3);
  border:2px dashed var(--bdr2);
  color:var(--tx2);
}
body.dark .dz:hover{
  background:rgba(91,163,224,.06);
  border-color:var(--ac);
}
body.dark .dz .dz-icon{color:var(--tx3)}
body.dark .dz p{color:var(--tx2)}
body.dark .dz .sub{color:var(--tx3)}

/* ════ STAGING ══════════════════════════════════════ */
body.dark .dock-card{
  background:var(--bg2);
  border:1px solid var(--bdr);
}
body.dark .dock-hdr{
  background:var(--bg3);
  border-bottom:1px solid var(--bdr);
}
body.dark .dock-item{border-bottom:1px solid rgba(100,160,255,.06)}

/* ════ REPORTS ═════════════════════════════════════ */
body.dark .rpt-hdr{
  background:var(--bg2);
  border:1px solid var(--bdr);
}
body.dark .rpt-date{color:var(--tx);font-weight:700}
body.dark .rpt-meta{color:var(--tx2)}
body.dark .rpt-num{color:var(--ac);font-weight:700}
body.dark .rpt-lbl{color:var(--tx2)}
body.dark .rpt-stat{background:var(--bg2);border:1px solid var(--bdr)}

/* ════ ARCHIVE BANNER ══════════════════════════════ */
body.dark .arch-banner{
  background:var(--bg3);
  border:1px solid var(--bdr);
  color:var(--tx);
}
body.dark .arch-banner p{color:var(--tx2)}

/* ════ IMPORT TAGS ═════════════════════════════════ */
body.dark .import-tag.new{background:rgba(52,211,153,.15);color:#6ee7b7}
body.dark .import-tag.dup{background:rgba(251,191,36,.12);color:#fcd34d}
body.dark .import-tag.upd{background:rgba(91,163,224,.15);color:#93c5fd}
body.dark .import-row-new td{background:rgba(52,211,153,.04)!important}
body.dark .import-row-dup td{background:rgba(251,191,36,.03)!important}

/* ════ PICKING REPORT ══════════════════════════════ */
body.dark .pl-order-title{color:var(--tx);font-weight:700}
body.dark .pl-order-sub{color:var(--tx2)}
body.dark .pl-info-item label{color:var(--tx3)}
body.dark .pl-info-item span{color:var(--tx)}
body.dark .pl-grid{border-color:var(--bdr)}
body.dark .plt-chip{
  background:var(--bg3);
  border:1px solid var(--bdr);
  color:var(--tx2);
}
body.dark .plt-sec-h{color:var(--tx2)}

/* ════ EMPTY STATES ════════════════════════════════ */
body.dark .empty-state{color:var(--tx2)}
body.dark .empty-state p{color:var(--tx3)}

/* ════ PALLET EXPAND ═══════════════════════════════ */
body.dark .plt-expand{
  background:var(--bg3);
  border-top:1px solid var(--bdr);
}

/* ════ STATUS/FEEDBACK ═════════════════════════════ */
body.dark .ast.ok{color:var(--gn)}
body.dark .ast.err{color:var(--rd)}

/* ════ PASSWORD OVERLAY ════════════════════════════ */
body.dark .pwd-overlay{background:rgba(0,0,0,.8)}
body.dark .pwd-card{
  background:var(--bg2);
  border:1px solid var(--bdr2);
}
body.dark .pwd-card h3{color:var(--tx)}

/* ════ SCROLLBAR ═══════════════════════════════════ */
body.dark ::-webkit-scrollbar-track{background:var(--bg)}
body.dark ::-webkit-scrollbar-thumb{
  background:var(--bg4);
  border-radius:3px;
}
body.dark ::-webkit-scrollbar-thumb:hover{background:#1e4070}

/* ════ SELECTION ═══════════════════════════════════ */
body.dark ::selection{
  background:rgba(91,163,224,.3);
  color:var(--tx);
}

/* ══════════════════════════════════════════════════
   LOGIN PAGE — Professional Two-Half Design
   Left: KN Branding (navy)  |  Right: Clean white form
   ══════════════════════════════════════════════════ */
.login-page{
  min-height:100vh;display:flex;overflow:hidden;position:relative;
  font-family:var(--fn);
}
#loginCanvas{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0}
.login-banner{
  position:fixed;top:0;left:0;right:0;z-index:100;
  padding:11px 24px;text-align:center;font-size:13px;
  font-weight:600;color:#fff;display:none;
}

/* ── Left half — KN Navy ─────────────────────────── */
.login-left{
  width:50%;display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  padding:60px 48px;position:relative;z-index:1;
  background:linear-gradient(170deg,#00306A 0%,#002060 60%,#001840 100%);
}
.login-left::after{
  content:'';position:absolute;bottom:0;right:0;
  width:1px;height:100%;
  background:linear-gradient(to bottom,transparent,rgba(255,255,255,.08),transparent);
}
.login-kn-logo-wrap{
  width:96px;height:96px;border-radius:24px;
  background:rgba(255,255,255,.1);
  border:1px solid rgba(255,255,255,.2);
  display:flex;align-items:center;justify-content:center;
  margin-bottom:32px;
  box-shadow:0 8px 32px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.15);
}
.login-kn-logo-wrap img{height:56px;width:auto;object-fit:contain;display:none;border-radius:12px}
.login-kn-logo-icon{font-size:40px;color:#fff;line-height:1}
.login-kn-company{
  font-size:22px;font-weight:700;color:#fff;letter-spacing:1px;
  text-transform:uppercase;text-align:center;margin-bottom:8px;
  text-shadow:0 2px 12px rgba(0,0,0,.3);
font-family:var(--dp);}
.login-kn-product{
  font-size:15px;font-weight:500;color:rgba(255,255,255,.6);
  text-align:center;letter-spacing:.5px;
font-family:var(--fn);}

/* ── Right half — Clean White ───────────────────── */
.login-right{
  width:50%;display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  padding:60px 48px;position:relative;z-index:1;
  background:#ffffff;
}
.login-form-wrap{width:100%;max-width:380px}
.login-form-title{
  font-size:26px;font-weight:700;
  color:#00306A;margin-bottom:6px;
font-family:var(--dp);}
.login-form-sub{
  font-size:13px;color:#6b7280;margin-bottom:32px;line-height:1.5;
font-family:var(--fn);}
.login-field{margin-bottom:18px}
.login-field label{
  display:block;font-size:12px;font-weight:600;
  color:#374151;margin-bottom:7px;letter-spacing:.3px;
}
.login-input-wrap{position:relative}
.login-input-icon{
  position:absolute;left:14px;top:50%;transform:translateY(-50%);
  font-size:15px;color:#9ca3af;pointer-events:none;z-index:1;
}
.login-input{
  width:100%;padding:13px 14px 13px 44px;
  background:#f9fafb;
  border:1.5px solid #e5e7eb;border-radius:10px;
  color:#111827;font-family:var(--fn);font-size:14px;
  transition:all .2s;outline:none;
}
.login-input::placeholder{color:#d1d5db}
.login-input:focus{
  background:#fff;
  border-color:#00306A;
  box-shadow:0 0 0 4px rgba(0,48,106,.1);
}
.login-input:-webkit-autofill,
.login-input:-webkit-autofill:focus{
  -webkit-box-shadow:0 0 0 100px #fff inset;
  -webkit-text-fill-color:#111827;
}
.login-btn{
  width:100%;padding:14px;margin-top:6px;
  background:#00306A;border:none;border-radius:10px;
  cursor:pointer;font-family:var(--fn);font-size:15px;
  font-weight:700;color:#fff;letter-spacing:.3px;
  transition:all .2s;position:relative;overflow:hidden;
  box-shadow:0 4px 14px rgba(0,48,106,.35);
}
.login-btn::after{
  content:'';position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(255,255,255,.1) 0%,transparent 60%);
  border-radius:inherit;
}
.login-btn:hover{
  background:#002562;transform:translateY(-2px);
  box-shadow:0 8px 24px rgba(0,48,106,.45);
}
.login-btn:active{transform:translateY(0)}
.login-btn-inner{position:relative;z-index:1;display:flex;align-items:center;justify-content:center;gap:8px}
.login-btn-arrow{transition:transform .2s}
.login-btn:hover .login-btn-arrow{transform:translateX(5px)}
.login-err{
  display:none;margin-top:14px;padding:11px 14px;
  background:#fef2f2;border:1px solid #fecaca;
  border-radius:8px;color:#dc2626;font-size:13px;
  align-items:center;gap:9px;
  animation:loginShake .4s cubic-bezier(.36,.07,.19,.97) both;
}
.login-err.show{display:flex}
@keyframes loginShake{
  10%,90%{transform:translateX(-2px)}20%,80%{transform:translateX(4px)}
  30%,50%,70%{transform:translateX(-4px)}40%,60%{transform:translateX(4px)}
}
.login-foot-row{
  display:flex;align-items:center;justify-content:center;
  margin-top:28px;
}
.login-footer{font-size:11px;color:#9ca3af;font-family:var(--fn)}

/* ── Responsive ────────────────────────────────── */
@media(max-width:768px){
  .login-page{flex-direction:column}
  .login-left,.login-right{width:100%;padding:36px 28px}
  .login-kn-logo-wrap{width:72px;height:72px;border-radius:18px}
  .login-kn-logo-icon{font-size:32px}
  .login-kn-company{font-size:18px}
  .login-form-wrap{max-width:100%}
}

/* ── Dark mode login ────────────────────────────── */
/* ── Theme preset cards ─────────────── */
.theme-card{cursor:pointer;border-radius:12px;overflow:hidden;border:2px solid var(--bdr2);transition:all .25s}
.theme-card:hover{transform:translateY(-2px);box-shadow:var(--sh2)}
.theme-check{width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;transition:all .2s}
/* ── Admin grid alignment ──────────── */
.admin-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;align-items:start}

body.dark .login-right{background:#0c1c36}
body.dark .login-form-title{color:#d0e4ff}
body.dark .login-form-sub{color:#7aa3cc}
body.dark .login-field label{color:#9bbee8}
body.dark .login-input{background:#112444;border-color:rgba(100,160,255,.2);color:#e8f2ff}
body.dark .login-input:focus{background:#0c1c36;border-color:#5ba3e0;box-shadow:0 0 0 4px rgba(91,163,224,.1)}
body.dark .login-input::placeholder{color:#4a6e99}
body.dark .login-err{background:rgba(220,38,38,.1);border-color:rgba(220,38,38,.3);color:#fc8181}
body.dark .login-footer{color:#4a6e99}


body{font-family:var(--fn);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
/* ── LAYOUT ── */
.shell{display:flex;min-height:100vh}
.sidebar{width:var(--sidebar-w);background:var(--bg2);border-right:1px solid var(--bdr);display:flex;flex-direction:column;position:fixed;top:0;left:0;height:100vh;z-index:100;box-shadow:var(--sh)}
.main{margin-left:var(--sidebar-w);flex:1;min-height:100vh}

/* ── SIDEBAR ── */
.logo-area{padding:14px 16px;border-bottom:1px solid var(--bdr);display:flex;align-items:center;gap:10px;min-height:60px}
#logoImg{height:28px;width:auto;max-width:88px;object-fit:contain;display:none}
.logo-mark{font-family:var(--dp);font-size:18px;font-weight:700;color:var(--ac);line-height:1}
.logo-sub{font-size:10px;color:var(--tx3);font-family:var(--mo);margin-top:2px;text-transform:uppercase;letter-spacing:1px}
.nav{padding:8px;flex:1;overflow-y:auto}
.nav-sec{font-size:10px;font-family:var(--mo);text-transform:uppercase;letter-spacing:1.2px;color:var(--tx3);padding:12px 10px 4px;display:flex;align-items:center;gap:6px}
.ni{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:var(--r);cursor:pointer;color:var(--tx2);font-size:13px;font-weight:500;transition:all .12s;margin-bottom:1px;border:none;background:none;width:100%;text-align:left}
.ni:hover{color:var(--tx);background:var(--bg3)}.ni.active{color:var(--ac);background:var(--adim);font-weight:600}
.ni-ic{font-size:15px;width:18px;text-align:center;flex-shrink:0}
.ni-badge{font-size:10px;font-family:var(--mo);background:var(--rd);color:#fff;padding:1px 6px;border-radius:99px;margin-left:auto;display:none}.ni-badge.show{display:inline}
.sfoot{padding:10px 14px;border-top:1px solid var(--bdr)}
.user-pill{display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:var(--r);background:var(--bg3);margin-bottom:8px}
.user-avatar{width:28px;height:28px;border-radius:50%;background:var(--ac);color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;font-family:var(--mo);flex-shrink:0}
.user-name{font-size:12px;font-weight:600;color:var(--tx);line-height:1}
.user-role{font-size:10px;color:var(--tx3);font-family:var(--mo);text-transform:uppercase;letter-spacing:.5px}
.logout-btn{width:100%;font-size:11px;font-family:var(--mo);padding:5px 8px;border-radius:var(--r);border:1px solid var(--bdr2);background:transparent;color:var(--tx3);cursor:pointer;transition:all .12s}
.logout-btn:hover{background:var(--rdim);color:var(--rd);border-color:rgba(220,38,38,.3)}
.spill{display:inline-flex;align-items:center;gap:5px;font-size:10px;font-family:var(--mo);padding:2px 8px;border-radius:99px;margin-bottom:4px}
.spill::before{content:'';width:5px;height:5px;border-radius:50%;flex-shrink:0}
.spill.live{background:var(--gdim);color:var(--gn)}.spill.live::before{background:var(--gn);animation:pulse 1.5s infinite}
.spill.saving{background:var(--adim);color:var(--ac)}.spill.saving::before{background:var(--ac);animation:pulse .5s infinite}
.spill.idle{background:var(--bg3);color:var(--tx3)}.spill.idle::before{background:var(--tx3)}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
.sfoot p{font-size:10px;color:var(--tx3);font-family:var(--mo);margin-top:2px}

/* ── TOPBAR ── */
.topbar{background:var(--bg2);border-bottom:1px solid var(--bdr);padding:10px 24px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;position:sticky;top:0;z-index:50;box-shadow:var(--sh)}
.ptitle{font-family:var(--dp);font-size:21px;font-weight:700;color:var(--tx)}.ptitle span{color:var(--ac)}
.tbar-r{display:flex;gap:7px;align-items:center;flex-wrap:wrap}
.sync-info{font-size:11px;font-family:var(--mo);color:var(--tx3)}
.view-mode-pill{font-size:11px;font-family:var(--mo);padding:3px 10px;border-radius:99px;font-weight:600}
.view-mode-pill.admin-mode{background:#fef3c7;color:#92400e;border:1px solid #fcd34d}
.view-mode-pill.ops-mode{background:var(--gdim);color:var(--gn);border:1px solid rgba(5,150,105,.25)}

/* ── BUTTONS ── */
.btn{font-family:var(--fn);font-size:13px;font-weight:500;padding:7px 14px;border-radius:var(--r);border:1px solid var(--bdr2);background:var(--bg2);color:var(--tx);cursor:pointer;transition:all .12s;white-space:nowrap;box-shadow:var(--sh)}
.btn:hover{background:var(--bg3)}.btn:active{transform:scale(.98)}.btn:disabled{opacity:.4;cursor:default}
.btn.pri{background:var(--ac);border-color:var(--ac);color:#fff;font-weight:600}.btn.pri:hover{background:var(--ah)}
.btn.ghost{background:transparent;border-color:var(--bdr);color:var(--tx2);box-shadow:none}.btn.ghost:hover{background:var(--bg3);color:var(--tx)}
.btn.danger{background:var(--rd);border-color:var(--rd);color:#fff}.btn.danger:hover{background:#b91c1c}
.btn.success{background:var(--gn);border-color:var(--gn);color:#fff}
.btn.warn{background:var(--or);border-color:var(--or);color:#fff}
.btn.sm{font-size:12px;padding:5px 11px}.btn.xs{font-size:11px;padding:3px 8px;box-shadow:none}

/* ── CONTENT ── */
.content{padding:18px 24px}.view{display:none}.view.active{display:block}

/* ── STATS ── */
.stats-row{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-bottom:16px}
.sc{background:var(--bg2);border:1px solid var(--bdr);border-radius:var(--r2);padding:13px 15px;position:relative;overflow:hidden;box-shadow:var(--sh);transition:box-shadow .15s}
.sc:hover{box-shadow:var(--sh2)}
.sc::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;border-radius:var(--r) var(--r) 0 0}
.sc.ca::before{background:var(--ac)}.sc.cg::before{background:var(--gn)}.sc.co::before{background:var(--or)}.sc.ct::before{background:var(--tl)}.sc.cp::before{background:var(--pu)}.sc.cx::before{background:#94a3b8}
.sl{font-size:10px;color:var(--tx3);text-transform:uppercase;letter-spacing:1px;font-family:var(--mo);margin-bottom:5px}
.sv{font-family:var(--dp);font-size:28px;font-weight:700;line-height:1;color:var(--tx)}
.sv.va{color:var(--ac)}.sv.vg{color:var(--gn)}.sv.vo{color:var(--or)}.sv.vt{color:var(--tl)}.sv.vp{color:var(--pu)}
.ss{font-size:11px;color:var(--tx3);margin-top:3px;font-family:var(--mo)}

/* ── TOOLBAR ── */
.toolbar{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:12px;align-items:center}
.toolbar input[type=text]{font-family:var(--fn);font-size:13px;padding:7px 11px;background:var(--bg2);border:1px solid var(--bdr2);border-radius:var(--r);color:var(--tx);flex:1;min-width:160px;box-shadow:var(--sh)}
.toolbar input:focus{outline:none;border-color:var(--ac)}
.toolbar select{font-family:var(--fn);font-size:13px;padding:7px 11px;background:var(--bg2);border:1px solid var(--bdr2);border-radius:var(--r);color:var(--tx);cursor:pointer;box-shadow:var(--sh)}
.toolbar select:focus{outline:none;border-color:var(--ac)}

/* ── TABS ── */
.tab-bar{display:flex;margin-bottom:12px;background:var(--bg2);border:1px solid var(--bdr);border-radius:var(--r);overflow:hidden;width:fit-content;box-shadow:var(--sh)}
.tab{font-family:var(--fn);font-size:12px;font-weight:500;padding:7px 16px;background:transparent;border:none;color:var(--tx2);cursor:pointer;transition:all .12s;white-space:nowrap}
.tab:hover{color:var(--tx);background:var(--bg3)}.tab.active{background:var(--ac);color:#fff;font-weight:600}

/* ── TABLE ── */
.tbl-wrap{background:var(--bg2);border:1px solid var(--bdr);border-radius:var(--r2);overflow:hidden;box-shadow:var(--sh)}
.tbl-scroll{overflow-x:auto}
table{width:100%;border-collapse:collapse;font-size:12.5px}
thead th{background:var(--bg3);padding:9px 11px;text-align:left;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.7px;color:var(--tx3);border-bottom:1px solid var(--bdr);white-space:nowrap;cursor:pointer;user-select:none;font-family:var(--mo)}
thead th:hover{color:var(--tx2);background:var(--bg4)}.ns{cursor:default!important}.ns:hover{background:var(--bg3)!important;color:var(--tx3)!important}
tbody td{padding:9px 11px;border-bottom:1px solid var(--bdr);vertical-align:middle}
tbody tr:last-child td{border-bottom:none}tbody tr:hover td{background:#f8f9fc}
.mono{font-family:var(--mo);font-size:12px}.muted{color:var(--tx2)}.dim{color:var(--tx3);font-size:12px}

/* ── BADGES ── */
.badge{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:600;padding:2px 8px;border-radius:99px;font-family:var(--mo);white-space:nowrap}
.badge::before{content:'';width:5px;height:5px;border-radius:50%;flex-shrink:0}
.badge.pending{background:var(--odim);color:var(--or);border:1px solid rgba(217,119,6,.2)}.badge.pending::before{background:var(--or)}
.badge.scheduled{background:var(--pudim);color:var(--pu);border:1px solid rgba(124,58,237,.2)}.badge.scheduled::before{background:var(--pu)}
.badge.staged{background:var(--adim);color:var(--ac);border:1px solid rgba(0,48,106,.2)}.badge.staged::before{background:var(--ac)}
.badge.dispatched{background:var(--gdim);color:var(--gn);border:1px solid rgba(5,150,105,.2)}.badge.dispatched::before{background:var(--gn)}
.badge.archived{background:var(--bg3);color:var(--tx3);border:1px solid var(--bdr2)}.badge.archived::before{background:var(--tx3)}
.badge.deleted{background:#fee2e2;color:#991b1b;border:1px solid #fca5a5}.badge.deleted::before{background:#dc2626}
.badge.ontime{background:var(--gdim);color:var(--gn)}.badge.ontime::before{background:var(--gn)}
.badge.late{background:var(--rdim);color:var(--rd)}.badge.late::before{background:var(--rd)}
.badge.na{background:var(--bg3);color:var(--tx3)}.badge.na::before{display:none}
.badge.admin-role{background:#fef3c7;color:#92400e;border:1px solid #fcd34d}.badge.admin-role::before{background:#f59e0b}
.badge.operator-role{background:var(--adim);color:var(--ac);border:1px solid rgba(0,48,106,.2)}.badge.operator-role::before{background:var(--ac)}
.loc-t{font-size:10px;font-family:var(--mo);padding:1px 5px;border-radius:3px;font-weight:600;margin-left:2px}
.loc-t.rack{background:var(--tdim);color:var(--tl)}.loc-t.lane{background:var(--odim);color:var(--or)}

/* ── ACTIONS ── */
.actions{display:flex;gap:3px}
.act{font-family:var(--mo);font-size:11px;padding:3px 7px;border-radius:var(--r);border:1px solid var(--bdr2);background:transparent;color:var(--tx2);cursor:pointer;white-space:nowrap;transition:all .12s}
.act:hover{background:var(--bg3);color:var(--tx)}
.act.disp{border-color:rgba(5,150,105,.35);color:var(--gn)}.act.disp:hover{background:var(--gdim)}
.act.plk{border-color:rgba(124,58,237,.35);color:var(--pu)}.act.plk:hover{background:var(--pudim)}
.act.arch{border-color:rgba(217,119,6,.3);color:var(--or)}.act.arch:hover{background:var(--odim)}
.act.del:hover{background:var(--rdim);color:var(--rd);border-color:rgba(220,38,38,.3)}
/* Action icon buttons */
.act{position:relative}
.act::after{content:attr(data-tip);position:absolute;bottom:calc(100% + 5px);left:50%;transform:translateX(-50%);background:#1a1d26;color:#fff;font-size:10px;font-family:var(--mo);padding:3px 7px;border-radius:4px;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .15s;z-index:99}
.act:hover::after{opacity:1}
.act::before{content:'';position:absolute;bottom:calc(100% + 1px);left:50%;transform:translateX(-50%);border:4px solid transparent;border-top-color:#1a1d26;pointer-events:none;opacity:0;transition:opacity .15s;z-index:99}
.act:hover::before{opacity:1}

/* ── DT CELL ── */
.dt-cell{font-family:var(--mo);font-size:11px;line-height:1.6;white-space:nowrap}
.dt-d{color:var(--tx)}.dt-t{color:var(--tx3)}.overdue .dt-d{color:var(--rd);font-weight:600}

/* ── PALLET EXPAND ── */
.plt-expand{padding:12px 14px 12px 26px;border-top:1px solid var(--bdr);background:var(--bg3)}
.plt-sec-h{font-size:10px;font-family:var(--mo);color:var(--tx3);text-transform:uppercase;letter-spacing:.7px;margin-bottom:8px}
.plt-grid{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:8px}
.plt-chip{background:var(--bg2);border:1px solid var(--bdr2);border-radius:var(--r);padding:9px 12px;min-width:155px;box-shadow:var(--sh)}
.plt-chip-id{font-size:13px;font-weight:600;color:var(--ac);font-family:var(--mo);margin-bottom:3px}
.plt-chip-loc{font-size:11px;color:var(--tx2);display:flex;align-items:center;gap:3px;flex-wrap:wrap;margin-top:2px}
.plt-chip-type{font-size:10px;font-family:var(--mo);padding:1px 5px;border-radius:3px;font-weight:600}
.plt-chip-type.rack{background:var(--tdim);color:var(--tl)}.plt-chip-type.lane{background:var(--odim);color:var(--or)}
.nbox{background:var(--bg2);border-radius:var(--r);padding:6px 10px;border-left:3px solid var(--ac);font-size:12px;color:var(--tx2);margin-bottom:5px}
.snbox{background:var(--bg2);border-radius:var(--r);padding:6px 10px;border-left:3px solid var(--pu);font-size:12px;color:var(--tx2)}

/* ── EMPTY / PAGING ── */
.empty-state{padding:40px;text-align:center;color:var(--tx3);font-size:14px}
.empty-state p{margin-top:5px;font-size:12px;font-family:var(--mo)}
.pagination{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:10px 14px;border-top:1px solid var(--bdr);font-size:12px;color:var(--tx3);font-family:var(--mo)}

/* ── MODAL ── */
.mbd{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:200;display:none;align-items:flex-start;justify-content:center;padding:20px 16px;overflow-y:auto;backdrop-filter:blur(3px)}
.mbd.show{display:flex}
.modal{background:var(--bg2);border:1px solid var(--bdr);border-radius:var(--r3);width:100%;max-width:680px;padding:22px;box-shadow:var(--sh3);animation:sli .15s ease;margin:auto}
.modal.wide{max-width:860px}.modal.narrow{max-width:440px}.modal.xwide{max-width:1040px}.modal.narrow{max-width:440px}.modal.xwide{max-width:1020px}
@keyframes sli{from{transform:translateY(-14px);opacity:0}to{transform:translateY(0);opacity:1}}
.mhdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.mtitle{font-family:var(--dp);font-size:18px;font-weight:700}
.mclose{background:none;border:none;color:var(--tx3);cursor:pointer;font-size:18px;padding:4px;line-height:1;border-radius:4px}.mclose:hover{background:var(--bg3);color:var(--tx)}
.slbl{font-size:10px;font-family:var(--mo);text-transform:uppercase;letter-spacing:1px;color:var(--ac);margin:13px 0 8px;padding-bottom:5px;border-bottom:1px solid var(--adim)}
.field{margin-bottom:10px}
.field label{font-size:11px;color:var(--tx3);display:block;margin-bottom:4px;font-family:var(--mo);text-transform:uppercase;letter-spacing:.5px}
.field input,.field select,.field textarea{width:100%;font-family:var(--fn);font-size:13px;padding:8px 11px;background:var(--bg3);border:1px solid var(--bdr2);border-radius:var(--r);color:var(--tx);transition:border-color .12s}
.field input:focus,.field select:focus,.field textarea:focus{outline:none;border-color:var(--ac);background:var(--bg2)}
.field textarea{resize:vertical;min-height:54px}
.fr2{display:grid;grid-template-columns:1fr 1fr;gap:12px}.fr3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
.mfoot{display:flex;justify-content:flex-end;gap:8px;margin-top:16px;padding-top:13px;border-top:1px solid var(--bdr)}

/* ── PALLET EDITOR ── */
.pe-wrap{max-height:280px;overflow-y:auto;border:1px solid var(--bdr);border-radius:var(--r);padding:9px;background:var(--bg3);margin-bottom:8px}
.pe-hdr{display:grid;grid-template-columns:28px 1fr 1fr 100px 1fr 26px;gap:6px;margin-bottom:5px;font-size:10px;font-family:var(--mo);text-transform:uppercase;letter-spacing:.5px;color:var(--tx3);padding:0 2px}
.pe-row{display:grid;grid-template-columns:28px 1fr 1fr 100px 1fr 26px;gap:6px;align-items:center;margin-bottom:5px}
.pe-row input,.pe-row select{font-family:var(--mo);font-size:12px;padding:5px 7px;background:var(--bg2);border:1px solid var(--bdr2);border-radius:var(--r);color:var(--tx);width:100%}
.pe-row input:focus,.pe-row select:focus{outline:none;border-color:var(--ac)}
.pe-num{font-family:var(--mo);font-size:12px;color:var(--tx3);text-align:center;line-height:26px}
.pe-del{background:none;border:none;cursor:pointer;color:var(--tx3);font-size:16px;padding:2px;border-radius:3px;line-height:1}.pe-del:hover{background:var(--rdim);color:var(--rd)}

/* ── PICKING REPORT / PICK LIST ── */
.pl-bar{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:13px;padding:11px 15px;background:var(--bg2);border:1px solid var(--bdr);border-radius:var(--r2);box-shadow:var(--sh)}
.pl-chk{width:15px;height:15px;cursor:pointer;accent-color:var(--ac)}
.pl-order{background:var(--bg2);border:1px solid var(--bdr2);border-radius:var(--r2);margin-bottom:16px;overflow:hidden;box-shadow:var(--sh)}
.pl-order-hdr{background:var(--ac);color:#fff;padding:10px 14px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px}
.pl-order-title{font-family:var(--dp);font-size:17px;font-weight:700}.pl-order-sub{font-size:11px;font-family:var(--mo);opacity:.85}
.pl-order-body{padding:13px 15px}
.pl-info-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:9px;margin-bottom:13px}
.pl-info-item label{font-size:10px;color:var(--tx3);font-family:var(--mo);text-transform:uppercase;letter-spacing:.5px;display:block;margin-bottom:2px}
.pl-info-item span{font-size:13px;font-weight:500;color:var(--tx)}
.pl-ptable{width:100%;border-collapse:collapse;font-size:12.5px}
.pl-ptable th{background:var(--bg3);padding:7px 10px;text-align:left;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.6px;color:var(--tx3);border-bottom:1px solid var(--bdr2);font-family:var(--mo)}
.pl-ptable td{padding:8px 10px;border-bottom:1px solid var(--bdr);vertical-align:middle}
.pl-ptable tr:last-child td{border-bottom:none}
.pl-scan{width:72px;height:20px;border:1px solid var(--bdr2);border-radius:3px;background:var(--bg2)}
.pl-sig-row{margin-top:14px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:22px}
.pl-sig{border-top:1px solid var(--bdr2);padding-top:5px;font-size:10px;font-family:var(--mo);color:var(--tx3);text-transform:uppercase;letter-spacing:.5px}
.pl-notes-box{background:var(--bg3);border-radius:var(--r);padding:8px 11px;border-left:3px solid var(--pu);font-size:12px;color:var(--tx2);margin-top:10px}

/* ── STAGING (DOCK) ── */
.staging-summary{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:16px}
.dock-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(215px,1fr));gap:12px}
.dock-card{background:var(--bg2);border:1px solid var(--bdr);border-radius:var(--r2);overflow:hidden;box-shadow:var(--sh);transition:box-shadow .15s}.dock-card:hover{box-shadow:var(--sh2)}
.dock-hdr{padding:9px 13px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--bdr);background:var(--bg3)}
.dock-loc{font-family:var(--dp);font-size:15px;font-weight:700}
.dock-loc.lp{color:var(--or)}.dock-loc.ls{color:var(--pu)}.dock-loc.lst{color:var(--ac)}.dock-loc.ld{color:var(--gn)}
.dock-body{padding:10px 13px}.dock-item{margin-bottom:9px;padding-bottom:9px;border-bottom:1px solid var(--bdr)}.dock-item:last-child{margin:0;padding:0;border:none}

/* ── DASHBOARD (CHARTS) ── */
.cgrid{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-bottom:15px}
.cc{background:var(--bg2);border:1px solid var(--bdr);border-radius:var(--r2);padding:16px;box-shadow:var(--sh)}.cc.full{grid-column:1/-1}
.ctitle{font-family:var(--dp);font-size:15px;font-weight:600;margin-bottom:2px}.csub{font-size:11px;color:var(--tx3);font-family:var(--mo);margin-bottom:12px}
.cwrap{position:relative;height:215px}.cwrap.tall{height:265px}
.legend{display:flex;flex-wrap:wrap;gap:9px;margin-top:9px}
.li{display:flex;align-items:center;gap:4px;font-size:11px;color:var(--tx2);font-family:var(--mo)}.ldot{width:9px;height:9px;border-radius:2px;flex-shrink:0}

/* ── ON-TIME ── */
.met-row{display:grid;grid-template-columns:repeat(4,1fr);gap:11px;margin-bottom:15px}
.met{background:var(--bg2);border:1px solid var(--bdr);border-radius:var(--r2);padding:14px;box-shadow:var(--sh);text-align:center}
.met-big{font-family:var(--dp);font-size:34px;font-weight:700;line-height:1}
.met-big.g{color:var(--gn)}.met-big.r{color:var(--rd)}.met-big.o{color:var(--or)}.met-big.a{color:var(--ac)}
.met-lbl{font-size:10px;color:var(--tx3);font-family:var(--mo);text-transform:uppercase;letter-spacing:.7px;margin-top:4px}

/* ── ACTIVITY ── */
.activity-tabs{display:flex;gap:0;margin-bottom:14px;border:1px solid var(--bdr2);border-radius:var(--r);overflow:hidden;width:fit-content}
.atab{font-size:13px;font-weight:500;padding:8px 20px;background:transparent;border:none;cursor:pointer;color:var(--tx2);transition:all .12s;font-family:var(--fn)}
.atab:hover{background:var(--bg3);color:var(--tx)}.atab.active{background:var(--ac);color:#fff;font-weight:600}
.activity-action-bar{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:14px}
.email-btn{display:flex;align-items:center;gap:6px;font-size:12px;padding:7px 14px;border-radius:var(--r);border:1px solid var(--bdr2);background:var(--bg2);color:var(--tx2);cursor:pointer;font-family:var(--fn);box-shadow:var(--sh);transition:all .12s}
.email-btn:hover{background:#eff6ff;color:var(--ac);border-color:var(--ac)}

/* ── REPORTS ── */
.rpt-hdr{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px}
.rpt-date{font-family:var(--dp);font-size:22px;font-weight:700;color:var(--ac);line-height:1;margin-bottom:2px}
.rpt-meta{font-size:11px;font-family:var(--mo);color:var(--tx3)}
.rpt-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px}
.rpt-stat{background:var(--bg2);border:1px solid var(--bdr);border-radius:var(--r2);padding:11px 13px;box-shadow:var(--sh)}
.rpt-num{font-family:var(--dp);font-size:22px;font-weight:700;color:var(--ac)}
.rpt-lbl{font-size:10px;font-family:var(--mo);color:var(--tx3);text-transform:uppercase;letter-spacing:.7px;margin-top:2px}
.rtbl-wrap{background:var(--bg2);border:1px solid var(--bdr);border-radius:var(--r2);overflow:hidden;box-shadow:var(--sh)}
.rtbl{width:100%;border-collapse:collapse;font-size:12.5px}
.rtbl th{background:var(--bg3);padding:8px 11px;text-align:left;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.6px;color:var(--tx3);border-bottom:1px solid var(--bdr);font-family:var(--mo)}
.rtbl td{padding:9px 11px;border-bottom:1px solid var(--bdr)}.rtbl tr:last-child td{border-bottom:none}.rtbl tr:hover td{background:var(--bg3)}

/* ── ARCHIVE ── */
.arch-banner{background:var(--bg2);border:1px solid var(--bdr);border-radius:var(--r2);padding:11px 14px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;box-shadow:var(--sh)}

/* ── ADMIN ── */
.admin-tabs{display:flex;gap:0;margin-bottom:18px;border:1px solid var(--bdr2);border-radius:var(--r);overflow:hidden;background:var(--bg2);box-shadow:var(--sh);width:fit-content}
.admin-tab{font-size:13px;font-weight:500;padding:9px 20px;background:transparent;border:none;cursor:pointer;color:var(--tx2);transition:all .12s;font-family:var(--fn);display:flex;align-items:center;gap:6px}
.admin-tab:hover{background:var(--bg3);color:var(--tx)}.admin-tab.active{background:var(--ac);color:#fff;font-weight:600}
.admin-panel{display:none}.admin-panel.active{display:block}
.admin-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.admin-card{background:var(--bg2);border:1px solid var(--bdr);border-radius:var(--r2);padding:17px;box-shadow:var(--sh)}.admin-card.full{grid-column:1/-1}
.admin-title{font-family:var(--dp);font-size:15px;font-weight:600;margin-bottom:3px;display:flex;align-items:center;gap:8px}
.admin-sub{font-size:11px;color:var(--tx3);font-family:var(--mo);margin-bottom:13px}
.af{margin-bottom:11px}
.af label{font-size:11px;color:var(--tx3);display:block;margin-bottom:4px;font-family:var(--mo);text-transform:uppercase;letter-spacing:.5px}
.af input,.af select,.af textarea{width:100%;font-family:var(--fn);font-size:13px;padding:8px 11px;background:var(--bg3);border:1px solid var(--bdr2);border-radius:var(--r);color:var(--tx)}
.af input:focus,.af select:focus{outline:none;border-color:var(--ac);background:var(--bg2)}
.ast{font-size:11px;font-family:var(--mo);margin-top:6px;min-height:15px}
.ast.ok{color:var(--gn)}.ast.err{color:var(--rd)}.ast.loading{color:var(--or)}
.dz{border:2px dashed var(--bdr2);border-radius:var(--r);padding:14px;text-align:center;cursor:pointer;background:var(--bg3);transition:all .15s}
.dz:hover,.dz.over{border-color:var(--ac);background:var(--adim)}.dz.loaded{border-color:var(--gn);background:var(--gdim);border-style:solid}
.dz-icon{font-size:22px;margin-bottom:5px;color:var(--tx3)}.dz p{font-size:13px;color:var(--tx2)}.dz p strong{color:var(--ac);text-decoration:underline}.dz .sub{font-size:11px;color:var(--tx3);font-family:var(--mo);margin-top:3px}
#fpi{display:none}
.url-note{font-size:11px;color:var(--tx3);font-family:var(--mo);margin-top:7px;padding:7px 10px;background:var(--bg3);border-radius:var(--r);border-left:3px solid var(--bdr2)}
.ibox{background:var(--adim);border:1px solid rgba(0,48,106,.15);border-radius:var(--r);padding:9px 12px;font-size:12px;color:var(--tx2);margin-bottom:10px}
.ibox strong{color:var(--ac)}
.ibox.warn{background:var(--odim);border-color:rgba(217,119,6,.2)}.ibox.warn strong{color:var(--or)}
.ibox.danger{background:var(--rdim);border-color:rgba(220,38,38,.2)}.ibox.danger strong{color:var(--rd)}
.sync-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:10px;padding:9px 11px;background:var(--bg3);border-radius:var(--r);border:1px solid var(--bdr)}
.bk-st{font-size:11px;font-family:var(--mo);color:var(--tx3);margin-top:5px}.bk-st strong{color:var(--tx2)}

/* ── USER MANAGEMENT ── */
.user-row{display:grid;grid-template-columns:1fr 1fr 80px 80px auto;gap:10px;align-items:center;padding:10px 0;border-bottom:1px solid var(--bdr)}
.user-row:last-child{border-bottom:none}

/* ── CARRIER MANAGEMENT ── */
.carrier-item{background:var(--bg3);border:1px solid var(--bdr2);border-radius:var(--r);padding:10px 12px;margin-bottom:8px}
.carrier-name-row{display:flex;align-items:center;gap:8px;margin-bottom:6px}
.carrier-name-input{flex:1;font-family:var(--fn);font-size:13px;padding:5px 8px;background:var(--bg2);border:1px solid var(--bdr2);border-radius:var(--r);color:var(--tx)}
.carrier-name-input:focus{outline:none;border-color:var(--ac)}
.sl-tags{display:flex;flex-wrap:wrap;gap:5px}
.sl-tag{font-size:11px;font-family:var(--mo);background:var(--adim);color:var(--ac);border:1px solid rgba(0,48,106,.2);padding:2px 8px;border-radius:99px;display:inline-flex;align-items:center;gap:4px}
.sl-tag button{background:none;border:none;cursor:pointer;color:var(--ac);font-size:13px;line-height:1;padding:0}
.sl-tag button:hover{color:var(--rd)}
.sl-add-row{display:flex;gap:6px;margin-top:6px}
.sl-add-input{flex:1;font-family:var(--mo);font-size:12px;padding:4px 8px;background:var(--bg2);border:1px solid var(--bdr2);border-radius:var(--r);color:var(--tx)}
.sl-add-input:focus{outline:none;border-color:var(--ac)}

/* ── LABEL & COLOR CUSTOMIZATION ── */
.lc-row{display:grid;grid-template-columns:1fr 1fr 60px;gap:8px;align-items:center;padding:5px 0;border-bottom:1px solid var(--bdr)}
.lc-row:last-child{border-bottom:none}
.lc-orig{font-size:11px;font-family:var(--mo);color:var(--tx3)}
.lc-inp{font-family:var(--fn);font-size:12px;padding:4px 8px;background:var(--bg3);border:1px solid var(--bdr2);border-radius:var(--r);color:var(--tx);width:100%}
.lc-inp:focus{outline:none;border-color:var(--ac)}
.lc-color{width:42px;height:28px;padding:2px;cursor:pointer;border:1px solid var(--bdr2);border-radius:var(--r);background:transparent}

/* ── AUDIT LOG ── */
.audit-row-create td{background:#f0fdf4}
.audit-row-update td{background:#fffbeb}
.audit-row-delete td{background:#fef2f2}
.audit-row-config td{background:#eff6ff}
.audit-diff{font-size:11px;font-family:var(--mo);color:var(--tx3);max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

/* ── IMPORT ── */
.import-row-new td{background:#f0fdf4}
.import-row-dup td{background:#fffbeb}
.import-tag{font-size:10px;font-family:var(--mo);padding:1px 6px;border-radius:3px;font-weight:600}
.import-tag.new{background:var(--gdim);color:var(--gn)}.import-tag.dup{background:var(--odim);color:var(--or)}
.import-tag.upd{background:var(--adim);color:var(--ac)}

/* ── PASSWORD PROMPT ── */
.pwd-overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:300;display:none;align-items:center;justify-content:center;backdrop-filter:blur(4px)}
.pwd-overlay.show{display:flex}
.pwd-card{background:var(--bg2);border-radius:var(--r3);padding:28px;width:100%;max-width:380px;box-shadow:var(--sh3);text-align:center}
.pwd-icon{font-size:32px;margin-bottom:12px}
.pwd-title{font-family:var(--dp);font-size:18px;font-weight:700;margin-bottom:4px}
.pwd-sub{font-size:13px;color:var(--tx3);margin-bottom:20px}
.pwd-input{width:100%;font-family:var(--fn);font-size:14px;padding:10px 13px;border:1.5px solid var(--bdr2);border-radius:var(--r2);color:var(--tx);background:var(--bg3);text-align:center;letter-spacing:3px;margin-bottom:12px}
.pwd-input:focus{outline:none;border-color:var(--ac);background:var(--bg2)}
.pwd-err{font-size:12px;color:var(--rd);font-family:var(--mo);margin-bottom:8px;min-height:16px}
.pwd-btns{display:flex;gap:8px}

/* ── FLASH / ANIMATIONS ── */
@keyframes rowFlash{0%{background:#dbeafe}100%{background:transparent}}
.flash td{animation:rowFlash 1.4s ease}
@keyframes fadeIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
.fade-in{animation:fadeIn .2s ease}

/* ── PRINT ── */
@media print{
  .sidebar,.topbar,.tbar-r,.tab-bar,.toolbar,.actions,.pagination,.no-print,
  button,.mbd,.pl-bar,.pwd-overlay,.login-page{display:none!important}
  .main{margin-left:0!important}.content{padding:0!important}
  .view{display:none!important}.view.print-show{display:block!important}
  body{background:#fff;font-size:12px}
  .pl-order,.rtbl-wrap,.tbl-wrap{box-shadow:none!important;border:1px solid #ccc!important}
  .badge,.loc-t,.plt-chip-type{border:1px solid #ccc!important;color:#333!important;background:#f5f5f5!important}.badge::before{display:none}
  .pl-order-hdr{background:#00306A!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  @page{margin:1.5cm}
}

@media(max-width:1100px){
  :root{--sidebar-w:58px}
  .ni span,.logo-sub,.sfoot .spill,.sfoot p,.user-pill .user-name,.user-pill .user-role,.nav-sec{display:none}
  .logo-mark{font-size:14px}.user-avatar{margin:0 auto}
}
@media(max-width:640px){
  .content{padding:12px}.stats-row,.met-row,.rpt-stats{grid-template-columns:1fr 1fr}
  .fr2,.fr3{grid-template-columns:1fr}.pl-info-grid{grid-template-columns:1fr 1fr}
  .admin-grid{grid-template-columns:1fr}
}


/* ══════════════════════════════════════════════════════════════
   CLEAN OVERRIDES — supersedes all previous patch blocks
   Applied last so these win all specificity battles
   ══════════════════════════════════════════════════════════════ */

/* ── Core layout ── */
.shell{display:flex;min-height:100vh}
.main{margin-left:var(--sidebar-w);flex:1;min-height:100vh;display:flex;flex-direction:column}
.content{padding:18px 22px;flex:1}
.view{display:none}.view.active{display:block}

/* ── Topbar ── */
.topbar{background:var(--bg2);border-bottom:1px solid var(--bdr);padding:9px 22px;display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;position:sticky;top:0;z-index:50;box-shadow:var(--sh)}
.ptitle{font-family:var(--dp);font-size:19px;font-weight:700;color:var(--tx)}.ptitle span{color:var(--ac)}
.tbar-r{display:flex;gap:6px;align-items:center;flex-wrap:wrap}
.sync-info{font-size:11px;font-family:var(--mo);color:var(--tx3)}

/* ── Sidebar nav ── */
.ni{display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:var(--r);cursor:pointer;color:var(--tx2);font-size:12.5px;font-weight:500;transition:all .12s;margin-bottom:1px;border:none;background:none;width:100%;text-align:left;line-height:1.4}
.ni:hover{color:var(--tx);background:var(--bg3)}.ni.active{color:var(--ac);background:var(--adim);font-weight:600;border-left:3px solid var(--ac);padding-left:7px}
.ni-ic{font-size:14px;width:17px;text-align:center;flex-shrink:0}

/* ── Stats row ── */
.stats-row{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-bottom:16px}
.sc{background:var(--bg2);border:1px solid var(--bdr);border-radius:var(--r2);padding:13px 14px;position:relative;overflow:hidden;box-shadow:var(--sh);transition:box-shadow .15s,transform .15s;cursor:default}
.sc:hover{box-shadow:var(--sh2);transform:translateY(-1px)}
.sc::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;border-radius:var(--r) var(--r) 0 0}
.sc.ca::before{background:var(--ac)}.sc.cg::before{background:var(--gn)}.sc.co::before{background:var(--or)}.sc.ct::before{background:var(--tl)}.sc.cp::before{background:var(--pu)}.sc.cx::before{background:#94a3b8}
.sl{font-size:10px;color:var(--tx3);text-transform:uppercase;letter-spacing:1px;font-family:var(--mo);margin-bottom:5px;font-weight:600}
.sv{font-family:var(--dp);font-size:28px;font-weight:800;line-height:1;color:var(--tx)}
.sv.va{color:var(--ac)}.sv.vg{color:var(--gn)}.sv.vo{color:var(--or)}.sv.vt{color:var(--tl)}.sv.vp{color:var(--pu)}
.ss{font-size:11px;color:var(--tx3);margin-top:3px;font-family:var(--mo)}

/* ── Toolbar ── */
.toolbar{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:12px;align-items:center}
.toolbar input[type=text]{font-family:var(--fn);font-size:12.5px;padding:7px 10px;background:var(--bg2);border:1.5px solid var(--bdr2);border-radius:var(--r);color:var(--tx);flex:1;min-width:180px;box-shadow:var(--sh);transition:border-color .15s}
.toolbar input:focus{outline:none;border-color:var(--ac);box-shadow:0 0 0 3px var(--adim)}
.toolbar select{font-family:var(--fn);font-size:12.5px;padding:7px 10px;background:var(--bg2);border:1.5px solid var(--bdr2);border-radius:var(--r);color:var(--tx);cursor:pointer;box-shadow:var(--sh)}

/* ── Tab bar ── */
.tab-bar{display:flex;margin-bottom:13px;background:var(--bg2);border:1px solid var(--bdr);border-radius:var(--r);overflow:hidden;width:fit-content;box-shadow:var(--sh)}
.tab{font-family:var(--fn);font-size:12px;font-weight:500;padding:7px 14px;background:transparent;border:none;color:var(--tx2);cursor:pointer;transition:all .12s;white-space:nowrap}
.tab:hover{color:var(--tx);background:var(--bg3)}.tab.active{background:var(--ac);color:#fff;font-weight:600}

/* ── Buttons ── */
.btn{font-family:var(--fn);font-size:12.5px;font-weight:500;padding:7px 14px;border-radius:var(--r);border:1px solid var(--bdr2);background:var(--bg2);color:var(--tx);cursor:pointer;transition:all .13s;white-space:nowrap;box-shadow:var(--sh);display:inline-flex;align-items:center;gap:4px}
.btn:hover{background:var(--bg3)}.btn:active{transform:scale(.98)}.btn:disabled{opacity:.4;cursor:default}
.btn.pri{background:var(--ac);border-color:var(--ac);color:#fff;font-weight:600}.btn.pri:hover{background:var(--ah)}
.btn.ghost{background:transparent;border-color:var(--bdr);color:var(--tx2);box-shadow:none}.btn.ghost:hover{background:var(--bg3);color:var(--tx)}
.btn.danger{background:var(--rd);border-color:var(--rd);color:#fff}.btn.danger:hover{background:#b91c1c}
.btn.success{background:var(--gn);border-color:var(--gn);color:#fff}
.btn.warn{background:var(--or);border-color:var(--or);color:#fff}
.btn.sm{font-size:12px;padding:5px 11px}.btn.xs{font-size:11px;padding:3px 8px;box-shadow:none}

/* ── Table ── */
.tbl-wrap{background:var(--bg2);border:1px solid var(--bdr);border-radius:var(--r2);overflow:hidden;box-shadow:var(--sh)}
.tbl-scroll{overflow-x:auto}
table{width:100%;border-collapse:collapse;font-size:12.5px}
thead th{background:var(--bg3);padding:9px 11px;text-align:left;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.7px;color:var(--tx3);border-bottom:1px solid var(--bdr);white-space:nowrap;cursor:pointer;user-select:none;font-family:var(--mo);transition:background .12s}
thead th:hover{color:var(--tx2);background:var(--bg4)}.ns{cursor:default!important}.ns:hover{background:var(--bg3)!important;color:var(--tx3)!important}
tbody td{padding:9px 11px;border-bottom:1px solid var(--bdr);vertical-align:middle}
tbody tr:last-child td{border-bottom:none}
tbody tr:hover td{background:rgba(0,48,106,.025)}

/* ── Pagination ── */
.pagination{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:9px 13px;border-top:1px solid var(--bdr);font-size:12px;color:var(--tx3);font-family:var(--mo)}

/* ══════════════════════════════════════════════════════════════
   MODAL — Compact, clean, no overlaps
   ══════════════════════════════════════════════════════════════ */

/* Backdrop */
.mbd{position:fixed;inset:0;background:rgba(0,0,0,.52);z-index:200;display:none;align-items:flex-start;justify-content:center;padding:16px;overflow-y:auto;backdrop-filter:blur(3px)}
.mbd.show{display:flex}

/* Modal box */
.modal{background:var(--bg2);border:1px solid var(--bdr2);border-radius:var(--r3);width:100%;max-width:680px;padding:0;box-shadow:0 20px 60px rgba(0,0,0,.2);animation:sli .15s ease;margin:auto;overflow:hidden}
.modal.wide{max-width:860px}
.modal.narrow{max-width:440px}
.modal.xwide{max-width:1040px}

/* Header bar */
.mhdr{display:flex;align-items:center;justify-content:space-between;padding:14px 20px;background:var(--bg3);border-bottom:1px solid var(--bdr)}
.mtitle{font-family:var(--dp);font-size:16px;font-weight:700;color:var(--tx)}
.mclose{background:none;border:none;color:var(--tx3);cursor:pointer;font-size:16px;padding:4px 6px;line-height:1;border-radius:4px;transition:all .12s}
.mclose:hover{background:var(--rdim);color:var(--rd)}

/* Modal body */
.mbody{padding:16px 20px}

/* Section separator */
.slbl{font-size:10px;font-family:var(--mo);text-transform:uppercase;letter-spacing:1.2px;color:var(--ac);margin:12px 0 8px;padding-bottom:5px;border-bottom:1px solid var(--adim);font-weight:700}
.slbl:first-child{margin-top:0}

/* Modal footer */
.mfoot{display:flex;justify-content:flex-end;gap:8px;padding:12px 20px;border-top:1px solid var(--bdr);background:var(--bg3)}

/* ── Form fields inside modal — COMPACT ── */
.field{margin-bottom:9px}
.field label{font-size:10.5px;color:var(--tx2);display:block;margin-bottom:3px;font-family:var(--mo);text-transform:uppercase;letter-spacing:.5px;font-weight:600}
.field input,.field select,.field textarea{width:100%;font-family:var(--fn);font-size:12px;padding:7px 9px;background:var(--bg3);border:1px solid var(--bdr2);border-radius:var(--r);color:var(--tx);transition:border-color .15s,box-shadow .15s;line-height:1.4;box-sizing:border-box}
.field input:focus,.field select:focus,.field textarea:focus{outline:none;border-color:var(--ac);background:var(--bg2);box-shadow:0 0 0 2px var(--adim)}
.field textarea{resize:vertical;min-height:52px}
.field select{cursor:pointer}

/* Required star */
.req{color:var(--rd);font-size:11px;margin-left:2px}

/* Grid rows */
.fr2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.fr3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
.fr4{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:10px}

/* ── Pallet editor ── */
.pe-wrap{max-height:220px;overflow-y:auto;border:1px solid var(--bdr);border-radius:var(--r);padding:8px;background:var(--bg3);margin-bottom:6px}
.pe-hdr{display:grid;grid-template-columns:24px 1.4fr 1fr 88px 1.2fr 24px;gap:6px;margin-bottom:5px;font-size:9.5px;font-family:var(--mo);text-transform:uppercase;letter-spacing:.5px;color:var(--tx3);padding:0 2px;font-weight:600}
.pe-row{display:grid;grid-template-columns:24px 1.4fr 1fr 88px 1.2fr 24px;gap:6px;align-items:center;margin-bottom:5px}
.pe-row input,.pe-row select{font-family:var(--mo);font-size:11.5px;padding:5px 7px;background:var(--bg2);border:1px solid var(--bdr2);border-radius:var(--r);color:var(--tx);width:100%;transition:border-color .12s;box-sizing:border-box}
.pe-row input:focus,.pe-row select:focus{outline:none;border-color:var(--ac);box-shadow:0 0 0 2px var(--adim)}
.pe-num{font-family:var(--mo);font-size:11px;color:var(--tx3);text-align:center;padding-top:6px;font-weight:600}
.pe-del{background:none;border:none;cursor:pointer;color:var(--tx3);font-size:14px;padding:3px;border-radius:3px;line-height:1;transition:all .12s}
.pe-del:hover{background:var(--rdim);color:var(--rd)}

/* ── Admin ── */
.admin-tabs{display:flex;gap:0;margin-bottom:16px;border:1px solid var(--bdr2);border-radius:var(--r);overflow:hidden;background:var(--bg2);box-shadow:var(--sh);flex-wrap:wrap}
.admin-tab{font-size:12px;font-weight:500;padding:8px 15px;background:transparent;border:none;cursor:pointer;color:var(--tx2);transition:all .12s;font-family:var(--fn);display:flex;align-items:center;gap:5px;white-space:nowrap}
.admin-tab:hover{background:var(--bg3);color:var(--tx)}.admin-tab.active{background:var(--ac);color:#fff;font-weight:600}
.admin-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;align-items:start}
.admin-card{background:var(--bg2);border:1px solid var(--bdr);border-radius:var(--r2);padding:16px;box-shadow:var(--sh)}.admin-card.full{grid-column:1/-1}
.admin-title{font-family:var(--dp);font-size:14px;font-weight:700;margin-bottom:3px;color:var(--tx)}
.admin-sub{font-size:11px;color:var(--tx3);font-family:var(--mo);margin-bottom:12px;line-height:1.5}
.af{margin-bottom:10px}
.af label{font-size:10.5px;color:var(--tx2);display:block;margin-bottom:4px;font-family:var(--mo);text-transform:uppercase;letter-spacing:.5px;font-weight:600}
.af input,.af select,.af textarea{width:100%;font-family:var(--fn);font-size:12.5px;padding:7px 10px;background:var(--bg3);border:1px solid var(--bdr2);border-radius:var(--r);color:var(--tx);transition:border-color .15s;box-sizing:border-box}
.af input:focus,.af select:focus,.af textarea:focus{outline:none;border-color:var(--ac);background:var(--bg2);box-shadow:0 0 0 2px var(--adim)}
.af textarea{resize:vertical;min-height:54px}
.ast{font-size:11px;font-family:var(--mo);margin-top:5px;min-height:15px}
.ast.ok{color:var(--gn)}.ast.err{color:var(--rd)}.ast.loading{color:var(--or)}

/* ── Drop zone ── */
.dz{border:2px dashed var(--bdr2);border-radius:var(--r2);padding:20px;text-align:center;cursor:pointer;background:var(--bg3);transition:all .2s}
.dz:hover,.dz.over{border-color:var(--ac);background:var(--adim)}.dz.loaded{border-color:var(--gn);background:var(--gdim);border-style:solid}
.dz-icon{font-size:24px;margin-bottom:6px;color:var(--ac)}.dz p{font-size:12.5px;color:var(--tx2);margin:4px 0}.dz .sub{font-size:11px;color:var(--tx3);font-family:var(--mo);margin-top:4px}

/* ── ibox ── */
.ibox{background:var(--adim);border:1px solid rgba(0,48,106,.15);border-radius:var(--r);padding:9px 11px;font-size:12px;color:var(--tx2);margin-bottom:10px;line-height:1.6}
.ibox strong{color:var(--ac)}.ibox.warn{background:var(--odim);border-color:rgba(217,119,6,.2)}.ibox.warn strong{color:var(--or)}
.ibox.danger{background:var(--rdim);border-color:rgba(220,38,38,.2)}.ibox.danger strong{color:var(--rd)}

/* ── Badges ── */
.badge{display:inline-flex;align-items:center;gap:4px;font-size:10.5px;font-weight:600;padding:2px 8px;border-radius:99px;font-family:var(--mo);white-space:nowrap}
.badge::before{content:'';width:5px;height:5px;border-radius:50%;flex-shrink:0}
.badge.pending{background:var(--odim);color:var(--or);border:1px solid rgba(217,119,6,.2)}.badge.pending::before{background:var(--or)}
.badge.scheduled{background:var(--pudim);color:var(--pu);border:1px solid rgba(124,58,237,.2)}.badge.scheduled::before{background:var(--pu)}
.badge.staged{background:var(--adim);color:var(--ac);border:1px solid rgba(0,48,106,.2)}.badge.staged::before{background:var(--ac)}
.badge.dispatched{background:var(--gdim);color:var(--gn);border:1px solid rgba(5,150,105,.2)}.badge.dispatched::before{background:var(--gn)}
.badge.archived{background:var(--bg3);color:var(--tx3);border:1px solid var(--bdr2)}.badge.archived::before{background:var(--tx3)}
.badge.deleted{background:#fee2e2;color:#991b1b;border:1px solid #fca5a5}.badge.deleted::before{background:#dc2626}
.badge.ontime{background:var(--gdim);color:var(--gn)}.badge.ontime::before{background:var(--gn)}
.badge.late{background:var(--rdim);color:var(--rd)}.badge.late::before{background:var(--rd)}
.badge.na{background:var(--bg3);color:var(--tx3)}.badge.na::before{display:none}
.badge.admin-role{background:#fef3c7;color:#92400e;border:1px solid #fcd34d}.badge.admin-role::before{background:#f59e0b}
.badge.operator-role{background:var(--adim);color:var(--ac);border:1px solid rgba(0,48,106,.2)}.badge.operator-role::before{background:var(--ac)}

/* ── Staging ── */
.dock-card{background:var(--bg2);border:1px solid var(--bdr);border-radius:var(--r2);overflow:hidden;box-shadow:var(--sh);transition:box-shadow .15s,transform .15s}.dock-card:hover{box-shadow:var(--sh2);transform:translateY(-1px)}
.dock-hdr{padding:9px 13px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--bdr);background:var(--bg3)}
.dock-body{padding:10px 13px}
.dock-item{margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid var(--bdr)}.dock-item:last-child{border:none;margin:0;padding:0}

/* ── Charts ── */
.cc{background:var(--bg2);border:1px solid var(--bdr);border-radius:var(--r2);padding:16px;box-shadow:var(--sh)}.cc.full{grid-column:1/-1}
.ctitle{font-family:var(--dp);font-size:14px;font-weight:700;margin-bottom:2px;color:var(--tx)}.csub{font-size:11px;color:var(--tx3);font-family:var(--mo);margin-bottom:10px}
.cwrap{position:relative;height:200px}.cwrap.tall{height:250px}

/* ── On-time metrics ── */
.met{background:var(--bg2);border:1px solid var(--bdr);border-radius:var(--r2);padding:14px;box-shadow:var(--sh);text-align:center}
.met-big{font-family:var(--dp);font-size:34px;font-weight:800;line-height:1}
.met-lbl{font-size:10px;color:var(--tx3);font-family:var(--mo);text-transform:uppercase;letter-spacing:.8px;margin-top:4px}
.met-big.g{color:var(--gn)}.met-big.r{color:var(--rd)}.met-big.o{color:var(--or)}.met-big.a{color:var(--ac)}

/* ── User rows ── */
.user-row{display:grid;grid-template-columns:1.2fr 1fr 1.2fr 80px 80px auto;gap:10px;align-items:center;padding:10px 0;border-bottom:1px solid var(--bdr)}
.user-row:last-child{border-bottom:none}

/* ── Import ── */
.import-tag{font-size:10px;font-family:var(--mo);padding:2px 6px;border-radius:3px;font-weight:700;text-transform:uppercase;letter-spacing:.5px}
.import-tag.new{background:var(--gdim);color:var(--gn)}.import-tag.dup{background:var(--odim);color:var(--or)}.import-tag.upd{background:var(--adim);color:var(--ac)}
.import-row-new td{background:rgba(5,150,105,.03)!important}
.import-row-dup td{background:rgba(217,119,6,.03)!important}

/* ── FTP/Email export ── */
.exp-recipient{display:flex;align-items:center;gap:6px;padding:5px 8px;background:var(--bg3);border-radius:var(--r);margin-bottom:4px;border:1px solid var(--bdr)}
.exp-recipient span{flex:1;font-size:12px;font-family:var(--mo);color:var(--tx2)}
.exp-recipient button{background:none;border:none;cursor:pointer;color:var(--tx3);padding:2px 5px;border-radius:3px;font-size:13px;line-height:1}
.exp-recipient button:hover{background:var(--rdim);color:var(--rd)}
.sch-badge{display:inline-block;font-size:10px;font-family:var(--mo);padding:2px 7px;border-radius:99px;background:var(--gdim);color:var(--gn);border:1px solid rgba(5,150,105,.2)}
.sch-badge.off{background:var(--bg3);color:var(--tx3);border-color:var(--bdr)}

/* ── Animations ── */
@keyframes sli{from{transform:translateY(-12px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes rowFlash{0%{background:#dbeafe}100%{background:transparent}}
.flash td{animation:rowFlash 1.4s ease}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}

/* ── Print ── */
@media print{
  .sidebar,.topbar,.tbar-r,.tab-bar,.toolbar,.actions,.pagination,.no-print,
  button,.mbd,.pl-bar{display:none!important}
  .main{margin-left:0!important}.content{padding:0!important}
  .view{display:none!important}.view.print-show{display:block!important}
  body{background:#fff;font-size:12px}
  .pl-order,.tbl-wrap{box-shadow:none!important;border:1px solid #ccc!important}
  @page{margin:1.5cm}
}

/* ── Responsive ── */
@media(max-width:1100px){
  :root{--sidebar-w:58px}
  .ni span,.logo-sub,.sfoot .spill,.sfoot p,.user-pill .user-name,.user-pill .user-role,.nav-sec{display:none}
  .logo-mark{font-size:14px}.user-avatar{margin:0 auto}
  .ni.active{border-left:3px solid var(--ac)}
}
@media(max-width:640px){
  .content{padding:10px 12px}
  .stats-row,.met-row{grid-template-columns:1fr 1fr}
  .fr2,.fr3,.fr4{grid-template-columns:1fr}
  .admin-grid{grid-template-columns:1fr}
  .cgrid{grid-template-columns:1fr}
}

/* Admin-only tabs — hidden for operators via applyRoleUI */
.admin-only-tab{display:none}

</style>
</head>
<body>
<!-- PASSWORD RESET MODAL -->
<div id="pwdResetOverlay" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:1200;align-items:center;justify-content:center">
  <div style="background:var(--bg2);border:1px solid var(--bdr2);border-radius:var(--r2);padding:32px;width:100%;max-width:420px;box-shadow:var(--sh3);margin:20px">
    <div style="font-family:var(--dp);font-size:18px;font-weight:700;color:var(--tx);margin-bottom:4px">&#128274; Reset Password</div>
    <div style="font-size:12px;color:var(--tx3);margin-bottom:20px" id="pwdResetUserLabel">Set a new password</div>
    <div style="margin-bottom:14px">
      <label style="font-size:10px;font-family:var(--mo);text-transform:uppercase;letter-spacing:1px;color:var(--tx3);display:block;margin-bottom:7px">New Password</label>
      <div style="position:relative">
        <input type="password" id="pwdResetNew" placeholder="Min. 6 characters" oninput="checkPwdStrength()" autocomplete="new-password"
          style="width:100%;font-size:13px;font-family:var(--fn);padding:11px 44px 11px 12px;border:1.5px solid var(--bdr2);border-radius:var(--r);background:var(--bg3);color:var(--tx);outline:none;transition:border-color .15s"/>
        <button onclick="togglePwdVis('pwdResetNew','eyeNew')" id="eyeNew" title="Show/hide"
          style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:var(--tx3);font-size:16px">&#128065;</button>
      </div>
    </div>
    <div style="margin-bottom:16px">
      <div style="display:flex;gap:4px;margin-bottom:5px">
        <div id="ps1" style="height:4px;flex:1;border-radius:2px;background:var(--bg4);transition:background .2s"></div>
        <div id="ps2" style="height:4px;flex:1;border-radius:2px;background:var(--bg4);transition:background .2s"></div>
        <div id="ps3" style="height:4px;flex:1;border-radius:2px;background:var(--bg4);transition:background .2s"></div>
        <div id="ps4" style="height:4px;flex:1;border-radius:2px;background:var(--bg4);transition:background .2s"></div>
      </div>
      <div id="pwdStrengthLabel" style="font-size:11px;color:var(--tx3);font-family:var(--mo)"></div>
    </div>
    <div style="margin-bottom:20px">
      <label style="font-size:10px;font-family:var(--mo);text-transform:uppercase;letter-spacing:1px;color:var(--tx3);display:block;margin-bottom:7px">Confirm New Password</label>
      <div style="position:relative">
        <input type="password" id="pwdResetConfirm" placeholder="Re-enter password" autocomplete="new-password"
          onkeydown="if(event.key==='Enter')confirmPwdReset()"
          style="width:100%;font-size:13px;font-family:var(--fn);padding:11px 44px 11px 12px;border:1.5px solid var(--bdr2);border-radius:var(--r);background:var(--bg3);color:var(--tx);outline:none;transition:border-color .15s"/>
        <button onclick="togglePwdVis('pwdResetConfirm','eyeConfirm')" id="eyeConfirm" title="Show/hide"
          style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:var(--tx3);font-size:16px">&#128065;</button>
      </div>
    </div>
    <div id="pwdResetErr" style="font-size:12px;color:var(--rd);background:var(--rdim);border:1px solid rgba(220,38,38,.25);border-radius:var(--r);padding:9px 12px;margin-bottom:14px;display:none"></div>
    <div style="display:flex;gap:8px;justify-content:flex-end">
      <button class="btn ghost sm" onclick="closePwdReset()">Cancel</button>
      <button class="btn pri sm" onclick="confirmPwdReset()">&#128274; Set Password</button>
    </div>
  </div>
</div>


<!-- LOGIN PAGE -->
<div id="loginPage" class="login-page">
  <canvas id="loginCanvas"></canvas>
  <div class="login-banner" id="loginBanner"></div>

  <!-- LEFT HALF — KN Brand -->
  <div class="login-left">
    <div class="login-kn-logo-wrap" id="loginLogoWrap">
      <img id="loginLogoImg" src="" alt="" style="display:none"/>
      <span class="login-kn-logo-icon" id="loginLogoFallback">&#9658;</span>
    </div>
    <div class="login-kn-company" id="loginLogoText">KUEHNE &amp; NAGEL</div>
    <div class="login-kn-product" id="loginLogoSub">Track Flow</div>
  </div>

  <!-- RIGHT HALF — Login Form -->
  <div class="login-right">
    <div class="login-form-wrap">
      <div class="login-form-title">Sign In</div>
      <div class="login-form-sub">Enter your credentials to access your account</div>

      <div class="login-field">
        <label>Username</label>
        <div class="login-input-wrap">
          <span class="login-input-icon">&#128100;</span>
          <input class="login-input" id="loginUser" type="text"
            placeholder="Enter username" autocomplete="username"
            onkeydown="if(event.key==='Enter')document.getElementById('loginPass').focus()"/>
        </div>
      </div>

      <div class="login-field">
        <label>Password</label>
        <div class="login-input-wrap">
          <span class="login-input-icon">&#128274;</span>
          <input class="login-input" id="loginPass" type="password"
            placeholder="Enter password" autocomplete="current-password"
            onkeydown="if(event.key==='Enter')doLogin()"/>
        </div>
      </div>

      <button class="login-btn" onclick="doLogin()">
        <span class="login-btn-inner">
          Sign In <span class="login-btn-arrow">&#8594;</span>
        </span>
      </button>

      <div class="login-err" id="loginErr">
        <span>&#9888;</span>
        <span>Incorrect username or password. Please try again.</span>
      </div>

      <div class="login-foot-row">
        <span class="login-footer" id="loginFooterText">KN Track Flow v1.0</span>
      </div>
    </div>
  </div>
</div>

<div id="appShell" class="shell" style="display:none">
<aside class="sidebar">
  <div class="logo-area">
    <img id="logoImg" src="" alt=""/>
    <div>
      <div class="logo-mark" id="sbTitle">KN Track Flow</div>
      <div class="logo-sub" id="sbSub">Track Flow</div>
    </div>
  </div>
  <nav class="nav">
    <div class="nav-sec">&#9632; Operations</div>
    <button class="ni active" id="nav-tracker" onclick="gv('tracker')"><span class="ni-ic">&#128203;</span><span>Orders</span></button>
    <button class="ni" id="nav-staging" onclick="gv('staging')"><span class="ni-ic">&#128205;</span><span>Staging Location</span></button>

    <div class="nav-sec">&#9632; Reports</div>
    <button class="ni" id="nav-picking" onclick="gv('picking')"><span class="ni-ic">&#9989;</span><span>Picking Report</span></button>
    <button class="ni" id="nav-activity" onclick="gv('activity')"><span class="ni-ic">&#128337;</span><span>Activity</span></button>
    <button class="ni" id="nav-insights" onclick="gv('insights')"><span class="ni-ic">&#128202;</span><span>Order Report</span></button>

    <div class="nav-sec">&#9632; Analytics</div>
    <button class="ni" id="nav-dashboard" onclick="gv('dashboard')"><span class="ni-ic">&#128200;</span><span>Dashboard</span></button>
    <button class="ni" id="nav-ontime" onclick="gv('ontime')"><span class="ni-ic">&#9201;</span><span>On-Time Report</span></button>

    <div class="nav-sec">&#9632; Data</div>
    <button class="ni" id="nav-import" onclick="gv('import')"><span class="ni-ic">&#8659;</span><span>Import Data</span></button>

    <div class="nav-sec admin-only">&#9632; Admin</div>
    <button class="ni admin-only" id="nav-admin" onclick="gv('admin')"><span class="ni-ic">&#9881;</span><span>Settings</span><span class="ni-badge" id="archBadge">0</span></button>
  </nav>
  <div class="sfoot">
    <div class="user-pill" id="userPill">
      <div class="user-avatar" id="userAvatar">?</div>
      <div><div class="user-name" id="userNameLabel">User</div><div class="user-role" id="userRoleLabel">operator</div></div>
    </div>
    <div class="spill idle" id="syncPill">&#9679; idle</div>
    <p id="cdownLabel" style="margin-top:2px"></p>
    <button class="logout-btn" onclick="doLogout()">&#x2192; Sign Out</button>
  </div>
</aside>



<!-- MAIN -->
<div class="main">
  <div class="topbar">
    <div class="ptitle" id="pageTitle">Outbound <span>Orders</span></div>
    <div class="tbar-r">
      <button class="btn ghost sm no-print" id="dmToggle" onclick="toggleDark()" title="Toggle Dark Mode">&#9790;</button>
      <span class="sync-info" id="syncInfo"></span>
      <button class="btn ghost sm no-print" onclick="manualRefresh()">&#8635; Refresh</button>
      <button class="btn ghost sm no-print" onclick="exportCSV()">&#8595; Export</button>
      <button class="btn pri sm no-print" onclick="openAdd()">+ New Order</button>
    </div>
  </div>
  <div class="content">

    <!-- TRACKER -->
    <div class="view active" id="view-tracker">
      <div class="stats-row">
        <div class="sc cx"><div class="sl">Total Orders</div><div class="sv" id="sSTotal">0</div><div class="ss" id="sSCli">0 clients</div></div>
        <div class="sc cp"><div class="sl">Scheduled</div><div class="sv vp" id="sSSched">0</div><div class="ss" id="ssSchedP">0 pallets</div></div>
        <div class="sc ca"><div class="sl">Staged</div><div class="sv va" id="sSStaged">0</div><div class="ss" id="ssStagedP">0 pallets</div></div>
        <div class="sc cg"><div class="sl">Dispatched</div><div class="sv vg" id="sSDisp">0</div><div class="ss" id="ssDispP">0 pallets</div></div>
        <div class="sc co"><div class="sl">Pending</div><div class="sv vo" id="sSPend">0</div><div class="ss">awaiting staging</div></div>
        <div class="sc ct"><div class="sl">Total Pallets</div><div class="sv vt" id="sSPallets">0</div><div class="ss">all orders</div></div>
      </div>
      <div class="tab-bar">
        <button class="tab active" onclick="setVTab('all')" id="vtab-all">All</button>
        <button class="tab" onclick="setVTab('pending')" id="vtab-pending">Pending</button>
        <button class="tab" onclick="setVTab('scheduled')" id="vtab-scheduled">Scheduled</button>
        <button class="tab" onclick="setVTab('staged')" id="vtab-staged">Staged</button>
        <button class="tab" onclick="setVTab('dispatched')" id="vtab-dispatched">Dispatched</button>
        <button class="tab" onclick="setVTab('deleted')" id="vtab-deleted" style="color:var(--rd)">&#128465; Deleted</button>
      </div>
      <div class="toolbar">
        <input type="text" id="searchBox" placeholder="Search order number, client, pallet ID, location..." oninput="renderTable()"/>
        <select id="fltClient" onchange="renderTable()"><option value="">All Clients</option></select>
        <select id="fltCountry" onchange="renderTable()"><option value="">All Countries</option></select>
        <select id="fltCarrier" onchange="renderTable()"><option value="">All Carriers</option></select>
        <button class="btn ghost sm" onclick="clearFilters()">Clear</button>
      </div>
      <div class="tbl-wrap">
        <div class="tbl-scroll">
          <table style="min-width:1120px">
            <thead><tr>
              <th onclick="srt('clientId')">Client ID <span id="s-clientId"></span></th>
              <th onclick="srt('customerName')">Customer <span id="s-customerName"></span></th>
              <th onclick="srt('destCountry')">Country <span id="s-destCountry"></span></th>
              <th onclick="srt('orderNo')">Order No.<span id="s-orderNo"></span></th>
              <th onclick="srt('shipmentNo')">Shipment No.<span id="s-shipmentNo"></span></th>
              <th onclick="srt('palletCount')" style="text-align:center">Pallets <span id="s-palletCount"></span></th>
              <th>Locations</th>
              <th onclick="srt('carrier')">Carrier <span id="s-carrier"></span></th>
              <th onclick="srt('trackingNo')">Tracking <span id="s-trackingNo"></span></th>
              <th onclick="srt('scheduledShipDate')">Sched. Ship <span id="s-scheduledShipDate"></span></th>
              <th onclick="srt('inboundDt')">Inbound <span id="s-inboundDt"></span></th>
              <th onclick="srt('outboundDt')">Outbound <span id="s-outboundDt"></span></th>
              <th onclick="srt('status')">Status <span id="s-status"></span></th>
              <th class="ns">Actions</th>
            </tr></thead>
            <tbody id="tblBody"></tbody>
          </table>
          <div class="empty-state" id="emptyMsg" style="display:none">No orders found<p>Load data via Admin or add a new order</p></div>
        </div>
        <div class="pagination" id="pagBar"></div>
      </div>
    </div>

    <!-- STAGING -->
    <div class="view" id="view-staging">
      <div class="staging-summary" id="stagingStats"></div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px">
        <div style="display:flex;gap:0;border:1px solid var(--bdr2);border-radius:var(--r);overflow:hidden">
          <button class="tab active" onclick="setStagingView('cards')" id="stab-cards" style="padding:7px 16px">Card View</button>
          <button class="tab" onclick="setStagingView('table')" id="stab-table" style="padding:7px 16px">Table View</button>
        </div>
        <select id="stagingFlt" onchange="renderStaging()" style="font-size:12px;padding:6px 10px;background:var(--bg2);border:1px solid var(--bdr2);border-radius:var(--r);color:var(--tx)">
          <option value="">All Statuses</option><option value="pending">Pending</option>
          <option value="scheduled">Scheduled</option><option value="staged">Staged</option><option value="dispatched">Dispatched</option>
        </select>
      </div>
      <div id="stagingCardView"><div class="dock-grid" id="dockGrid"></div></div>
      <div id="stagingTableView" style="display:none">
        <div class="toolbar" style="margin-bottom:11px">
          <input type="text" id="stagingSearch" placeholder="Search..." oninput="renderStagingTable()" style="max-width:300px"/>
        </div>
        <div class="tbl-wrap"><div class="tbl-scroll">
          <table style="min-width:700px">
            <thead><tr>
              <th>Pallet ID</th><th>Order No.</th><th>Shipment No.</th><th>Client</th><th>Location</th><th>Loc. Type</th><th>Carrier</th><th>Status</th>
            </tr></thead>
            <tbody id="stagingTblBody"></tbody>
          </table>
        </div></div>
      </div>
    </div>

    <!-- PICKING REPORT -->
    <div class="view" id="view-picking">
      <div class="pl-bar">
        <div>
          <p><strong id="plCount">0</strong> orders selected</p>
          <p style="font-size:11px;color:var(--tx3);margin-top:2px">Select orders below then click Save as PDF</p>
        </div>
        <div style="display:flex;gap:7px;flex-wrap:wrap">
          <button class="btn ghost sm" onclick="plSelAll()">Select All</button>
          <button class="btn ghost sm" onclick="plClear()">Clear</button>
          <button class="btn pri sm" onclick="pdfPL()">&#128462; Save as PDF</button>
        </div>
      </div>
      <div class="tbl-wrap" id="plSelWrap">
        <div class="tbl-scroll">
          <table style="min-width:860px">
            <thead><tr>
              <th class="ns" style="width:38px"><input type="checkbox" class="pl-chk" id="plMaster" onchange="plMasterChk(this)"/></th>
              <th>Order No.</th><th>Shipment No.</th><th>Client ID</th><th>Customer</th>
              <th>Country</th><th>Pallets</th><th>Carrier</th><th>Sched. Ship</th><th>Status</th>
            </tr></thead>
            <tbody id="plSelBody"></tbody>
          </table>
          <div class="empty-state" id="plSelEmpty" style="display:none">No orders available<p>Load data from Admin</p></div>
        </div>
      </div>
    </div>


    <!-- ACTIVITY -->
    <div class="view" id="view-activity">
      <div class="rpt-hdr">
        <div><div class="rpt-date" id="actDate"></div><div class="rpt-meta">Activity Report</div></div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn ghost sm no-print" onclick="emailActivity()">&#9993; Email via Outlook</button>
          <button class="btn ghost sm no-print" onclick="window.print()">&#128438; Print</button>
        </div>
      </div>
      <div class="activity-tabs">
        <button class="atab active" onclick="setActTab('inbound')" id="atab-inbound">&#8659; Inbound</button>
        <button class="atab" onclick="setActTab('dispatched')" id="atab-dispatched">&#10003; Dispatched</button>
        <button class="atab" onclick="setActTab('scheduled')" id="atab-scheduled">&#128197; Scheduled</button>
      </div>
      <div id="actContent"></div>
    </div>

    <!-- DASHBOARD -->
    <div class="view" id="view-dashboard">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:14px">
        <div style="font-family:var(--dp);font-size:16px;font-weight:600">Dashboard</div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
          <div style="display:flex;gap:0;border:1px solid var(--bdr2);border-radius:var(--r);overflow:hidden;background:var(--bg2)">
            <button class="tab active" id="dp-all" onclick="setDashPeriod('all')" style="padding:6px 13px;font-size:12px">All Time</button>
            <button class="tab" id="dp-7" onclick="setDashPeriod('7')" style="padding:6px 13px;font-size:12px">Last 7 Days</button>
            <button class="tab" id="dp-30" onclick="setDashPeriod('30')" style="padding:6px 13px;font-size:12px">Last 30 Days</button>
            <button class="tab" id="dp-week" onclick="setDashPeriod('week')" style="padding:6px 13px;font-size:12px">This Week</button>
            <button class="tab" id="dp-month" onclick="setDashPeriod('month')" style="padding:6px 13px;font-size:12px">This Month</button>
          </div>
          <select id="dashDateField" onchange="renderDashboard()" style="font-size:12px;padding:6px 10px;background:var(--bg2);border:1px solid var(--bdr2);border-radius:var(--r);color:var(--tx)">
            <option value="inbound">By Inbound Date</option>
            <option value="scheduled">By Scheduled Ship Date</option>
            <option value="outbound">By Dispatch Date</option>
          </select>
        </div>
      </div>
      <div class="cgrid">
        <div class="cc"><div class="ctitle">Pallets by Carrier</div><div class="csub">pallet count per carrier</div><div class="cwrap"><canvas id="cCarrier"></canvas></div><div class="legend" id="lCarrier"></div></div>
        <div class="cc"><div class="ctitle">Status Distribution</div><div class="csub">orders by status</div><div class="cwrap"><canvas id="cStatus"></canvas></div><div class="legend" id="lStatus"></div></div>
        <div class="cc full"><div class="ctitle">Pallets by Client</div><div class="csub">total pallets per client</div><div class="cwrap tall"><canvas id="cClient"></canvas></div></div>
        <div class="cc"><div class="ctitle">Package Type Mix</div><div class="csub">pallet count by type</div><div class="cwrap"><canvas id="cPkg"></canvas></div><div class="legend" id="lPkg"></div></div>
        <div class="cc"><div class="ctitle">Inbound Activity</div><div class="csub">orders received by date</div><div class="cwrap"><canvas id="cActivity"></canvas></div></div>
        <div class="cc"><div class="ctitle">Outbound Activity</div><div class="csub">orders dispatched by date</div><div class="cwrap"><canvas id="cOutbound"></canvas></div></div>
      </div>
    </div>

    <!-- INSIGHTS (ORDER REPORT) -->
    <div class="view" id="view-insights">

      <!-- Header -->
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:18px">
        <div>
          <div style="font-family:var(--dp);font-size:20px;font-weight:700;color:var(--tx)">Order Report</div>
          <div style="font-size:12px;color:var(--tx3);margin-top:2px">Filter by date range — export to Excel</div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap" class="no-print">
          <button class="btn pri sm" onclick="exportInsightsExcel()">&#128196; Export to Excel</button>
        </div>
      </div>

      <!-- Filter bar -->
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end;padding:14px 16px;background:var(--bg2);border:1px solid var(--bdr);border-radius:var(--r2);margin-bottom:16px;box-shadow:var(--sh)">
        <div>
          <div style="font-size:10px;font-family:var(--mo);text-transform:uppercase;letter-spacing:.8px;color:var(--tx3);margin-bottom:5px">Date Field</div>
          <select id="insDateField" onchange="renderInsights()" style="font-size:13px;padding:8px 10px;background:var(--bg3);border:1px solid var(--bdr2);border-radius:var(--r);color:var(--tx);min-width:150px">
            <option value="inbound">Inbound Date</option>
            <option value="scheduled">Scheduled Ship</option>
            <option value="outbound">Dispatch Date</option>
          </select>
        </div>
        <div>
          <div style="font-size:10px;font-family:var(--mo);text-transform:uppercase;letter-spacing:.8px;color:var(--tx3);margin-bottom:5px">From</div>
          <input type="date" id="insFrom" onchange="renderInsights()" style="font-size:13px;padding:8px 10px;background:var(--bg3);border:1px solid var(--bdr2);border-radius:var(--r);color:var(--tx)"/>
        </div>
        <div>
          <div style="font-size:10px;font-family:var(--mo);text-transform:uppercase;letter-spacing:.8px;color:var(--tx3);margin-bottom:5px">To</div>
          <input type="date" id="insTo" onchange="renderInsights()" style="font-size:13px;padding:8px 10px;background:var(--bg3);border:1px solid var(--bdr2);border-radius:var(--r);color:var(--tx)"/>
        </div>
        <div style="display:flex;gap:0;border:1px solid var(--bdr2);border-radius:var(--r);overflow:hidden;background:var(--bg2)">
          <button class="tab" id="ip-7"   onclick="setInsPeriod(7)"  style="padding:8px 13px;font-size:12px">7d</button>
          <button class="tab" id="ip-30"  onclick="setInsPeriod(30)" style="padding:8px 13px;font-size:12px">30d</button>
          <button class="tab" id="ip-90"  onclick="setInsPeriod(90)" style="padding:8px 13px;font-size:12px">90d</button>
          <button class="tab active" id="ip-all" onclick="setInsPeriod(0)" style="padding:8px 13px;font-size:12px">All</button>
        </div>
        <button class="btn ghost sm" onclick="clearInsights()" style="padding:8px 14px">&#x2715; Clear</button>
      </div>

      <!-- Orders table -->
      <div class="tbl-wrap">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid var(--bdr);background:var(--bg3)">
          <div style="font-size:12px;font-weight:600;color:var(--tx)" id="insOrderCount">0 orders</div>
          <div style="font-size:11px;color:var(--tx3)">Showing filtered results</div>
        </div>
        <div class="tbl-scroll">
          <table style="min-width:960px">
            <thead><tr>
              <th onclick="insSort('orderNo')">Order No. <span id="is-orderNo"></span></th>
              <th onclick="insSort('shipmentNo')">Shipment No. <span id="is-shipmentNo"></span></th>
              <th onclick="insSort('clientId')">Client <span id="is-clientId"></span></th>
              <th onclick="insSort('customerName')">Customer <span id="is-customerName"></span></th>
              <th onclick="insSort('destCountry')">Country <span id="is-destCountry"></span></th>
              <th onclick="insSort('palletCount')" style="text-align:center">Pallets <span id="is-palletCount"></span></th>
              <th onclick="insSort('carrier')">Carrier <span id="is-carrier"></span></th>
              <th onclick="insSort('inboundDt')">Inbound <span id="is-inboundDt"></span></th>
              <th onclick="insSort('scheduledShipDate')">Sched. Ship <span id="is-scheduledShipDate"></span></th>
              <th onclick="insSort('outboundDt')">Dispatched <span id="is-outboundDt"></span></th>
              <th onclick="insSort('status')">Status <span id="is-status"></span></th>
            </tr></thead>
            <tbody id="insightsBody"></tbody>
          </table>
          <div class="empty-state" id="insightsEmpty" style="display:none">No orders in selected period<p>Adjust the date range filter above</p></div>
        </div>
        <div class="pagination" id="insPageBar"></div>
      </div>
    </div>

    <!-- ON-TIME -->
    <div class="view" id="view-ontime">
      <div class="met-row">
        <div class="met"><div class="met-big g" id="otPct">—</div><div class="met-lbl">On-Time %</div></div>
        <div class="met"><div class="met-big g" id="otOT">0</div><div class="met-lbl">On Time</div></div>
        <div class="met"><div class="met-big r" id="otLate">0</div><div class="met-lbl">Late</div></div>
        <div class="met"><div class="met-big o" id="otPend">0</div><div class="met-lbl">Not Yet Dispatched</div></div>
      </div>
      <div class="cgrid" style="margin-bottom:14px">
        <div class="cc"><div class="ctitle">On-Time vs Late</div><div class="csub">dispatched orders</div><div class="cwrap"><canvas id="cOTPie"></canvas></div><div class="legend" id="lOTPie"></div></div>
        <div class="cc"><div class="ctitle">Variance by Carrier</div><div class="csub">avg days late (neg = early)</div><div class="cwrap"><canvas id="cOTCarrier"></canvas></div></div>
      </div>
      <div class="tbl-wrap"><div class="tbl-scroll">
        <table style="min-width:860px">
          <thead><tr><th>Order No.</th><th>Shipment No.</th><th>Client</th><th>Customer</th><th>Carrier</th>
          <th>Sched. Ship</th><th>Actual Dispatch</th><th>Variance (days)</th><th>Performance</th></tr></thead>
          <tbody id="otBody"></tbody>
        </table>
        <div class="empty-state" id="otEmpty" style="display:none">No data<p>Dispatch orders with a scheduled ship date to see performance</p></div>
      </div></div>
    </div>

    <!-- BULK IMPORT -->
    <div class="view" id="view-import">
      <div class="admin-card" style="margin-bottom:14px">
        <div class="admin-title">Shipment Data Import</div>
        <div class="admin-sub">upload a CSV file to create new shipments or update existing orders</div>
        <div class="ibox"><strong>Structure:</strong> One row per pallet. Rows sharing the same Order No. are grouped into one order. See Admin &rarr; Data Management for the CSV format guide.</div>

        <!-- Import Type Selector -->
        <div style="display:flex;gap:0;border:1px solid var(--bdr2);border-radius:var(--r);overflow:hidden;background:var(--bg3);width:fit-content;margin-bottom:14px">
          <button id="impTypeNew" onclick="setImportType('new')"
            style="padding:9px 20px;font-size:13px;font-weight:600;font-family:var(--fn);border:none;cursor:pointer;background:var(--ac);color:#fff;transition:all .15s">
            &#10010; New Records
          </button>
          <button id="impTypeUpdate" onclick="setImportType('update')"
            style="padding:9px 20px;font-size:13px;font-weight:500;font-family:var(--fn);border:none;cursor:pointer;background:transparent;color:var(--tx2);transition:all .15s">
            &#8635; Update Existing
          </button>
        </div>

        <!-- Mode description -->
        <div id="impModeDesc" style="font-size:12px;padding:8px 12px;border-radius:var(--r);margin-bottom:12px;background:var(--adim);color:var(--ac);border:1px solid rgba(0,48,106,.2)">
          <strong>New Records:</strong> Only rows with an Order No. not already in the system are imported. Duplicate order numbers are skipped.
        </div>

        <div class="dz" id="importDz" onclick="triggerImport()" ondragover="importDov(event)" ondragleave="importDol()" ondrop="importDop(event)">
          <div class="dz-icon">&#8659;</div><p><strong>Browse</strong> or drag &amp; drop CSV file</p>
          <p class="sub">One row per pallet — same structure as the data source CSV</p>
        </div>
        <input type="file" id="importFpi" accept=".csv,.txt" onchange="onImportSel(event)" style="display:none"/>
      </div>

      <div id="importPreviewArea" style="display:none">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:12px">
          <div>
            <div style="font-family:var(--dp);font-size:16px;font-weight:600">Import Preview</div>
            <div style="font-size:12px;color:var(--tx2);margin-top:3px">
              <span id="impNewCount" style="color:var(--gn);font-weight:600">0 new</span> &bull;
              <span id="impDupCount" style="color:var(--or);font-weight:600">0 duplicate / existing</span>
              <span id="impUpdateCount" style="color:var(--ac);font-weight:600;display:none">0 will update</span>
            </div>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn ghost sm" onclick="cancelImport()">Cancel</button>
            <button class="btn pri sm" id="importConfirmBtn" onclick="confirmImport()">&#10003; Confirm Import</button>
          </div>
        </div>
        <div class="tbl-wrap"><div class="tbl-scroll">
          <table style="min-width:900px;font-size:12px;border-collapse:collapse">
            <thead><tr>
              <th style="padding:6px 10px;background:var(--bg3);border-bottom:1px solid var(--bdr2);font-family:var(--mo);font-size:10px;text-transform:uppercase;color:var(--tx3)">Action</th>
              <th style="padding:6px 10px;background:var(--bg3);border-bottom:1px solid var(--bdr2);font-family:var(--mo);font-size:10px;text-transform:uppercase;color:var(--tx3)">Order No.</th>
              <th style="padding:6px 10px;background:var(--bg3);border-bottom:1px solid var(--bdr2);font-family:var(--mo);font-size:10px;text-transform:uppercase;color:var(--tx3)">Shipment No.</th>
              <th style="padding:6px 10px;background:var(--bg3);border-bottom:1px solid var(--bdr2);font-family:var(--mo);font-size:10px;text-transform:uppercase;color:var(--tx3)">Client</th>
              <th style="padding:6px 10px;background:var(--bg3);border-bottom:1px solid var(--bdr2);font-family:var(--mo);font-size:10px;text-transform:uppercase;color:var(--tx3)">Pallet ID</th>
              <th style="padding:6px 10px;background:var(--bg3);border-bottom:1px solid var(--bdr2);font-family:var(--mo);font-size:10px;text-transform:uppercase;color:var(--tx3)">Location</th>
              <th style="padding:6px 10px;background:var(--bg3);border-bottom:1px solid var(--bdr2);font-family:var(--mo);font-size:10px;text-transform:uppercase;color:var(--tx3)">Carrier</th>
              <th style="padding:6px 10px;background:var(--bg3);border-bottom:1px solid var(--bdr2);font-family:var(--mo);font-size:10px;text-transform:uppercase;color:var(--tx3)">Status</th>
            </tr></thead>
            <tbody id="importPreviewBody"></tbody>
          </table>
        </div></div>
        <div id="importResultMsg" class="ast" style="margin-top:10px"></div>
      </div>
    </div>



    <!-- SETTINGS -->
    <div class="view" id="view-admin">
      <div class="admin-tabs">
        <button class="admin-tab active" onclick="setAdminTab('general')" id="atab-general">&#9881; General Settings</button>
        <button class="admin-tab" onclick="setAdminTab('data')" id="atab-data">&#128190; Data Management</button>
        <button class="admin-tab" onclick="setAdminTab('custom')" id="atab-custom">&#127912; Customization</button>
        <button class="admin-tab" onclick="setAdminTab('users')" id="atab-users">&#128100; User Management</button>
        <button class="admin-tab" onclick="setAdminTab('security')" id="atab-security">&#128274; Security</button>
        <button class="admin-tab" onclick="setAdminTab('audit')" id="atab-audit" class="admin-tab admin-only-tab">&#128270; Audit Trail</button>
        <button class="admin-tab" onclick="setAdminTab('exports')" id="atab-exports">&#128228; Exports</button>
        <button class="admin-tab" onclick="setAdminTab('archive')" id="atab-archive" class="admin-tab admin-only-tab">&#128451; Archive</button>
      </div>

      <!-- GENERAL SETTINGS -->
      <div class="admin-panel active" id="apanel-general">
        <div class="admin-grid">
          <div class="admin-card">
            <div class="admin-title">Application Settings</div>
            <div class="admin-sub">core app configuration</div>
            <div class="af"><label>App Name</label><input id="adminAppName" type="text" value="KN Track Flow"/></div>
            <div class="af"><label>Subtitle</label><input id="adminAppSub" type="text" value="Track Flow"/></div>
            <div class="af"><label>Accent Colour</label><input id="adminAccent" type="color" value="#00306A" style="width:60px;height:34px;padding:2px;cursor:pointer"/></div>
            <div class="af"><label>Logo Image</label><input type="file" accept="image/*" id="logoUpload" onchange="onLogoUpload(event)" style="font-size:12px"/></div>
            <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">
              <input type="hidden" id="themeAccent" value="#00306A"/>
            <button class="btn pri sm" onclick="saveBranding()">Apply Branding</button>
              <button class="btn ghost sm" onclick="resetBranding()">Reset</button>
            </div>
          </div>
          <div class="admin-card">
            <div class="admin-title">Carrier Management</div>
            <div class="admin-sub">add carriers and their service levels — these appear as dropdown options throughout the app</div>
            <div id="carrierList"></div>
            <button class="btn ghost sm" onclick="addCarrierItem()" style="margin-top:8px">+ Add Carrier</button>
            <button class="btn pri sm" onclick="saveCarriers()" style="margin-top:8px">Save Carriers</button>
            <div id="carrierSt" class="ast"></div>
          </div>
        </div>
      </div>

      <!-- DATA MANAGEMENT -->
      <div class="admin-panel" id="apanel-data">
        <div class="admin-grid">
          <div class="admin-card">
            <div class="admin-title">Data Source</div>
            <div class="admin-sub">configure where data is loaded from and written to</div>
            <div class="af"><label>Source Type</label>
              <select id="adminSrcType" onchange="onSrcTypeChange()">
                <option value="file">Local / Network File (two-way)</option>
                <option value="url">HTTP URL (read-only)</option>
                <option value="demo">Demo Data</option>
              </select>
            </div>
            <div id="adminFileSection">
              <div class="dz" id="dropZone" onclick="triggerPicker()" ondragover="dov(event)" ondragleave="dol()" ondrop="dop(event)">
                <div class="dz-icon">&#128194;</div><p><strong>Browse</strong> or drag &amp; drop CSV file</p>
                <p class="sub">Local drive or mapped network drive (Z:\wms\shipments.csv)</p>
              </div>
              <input type="file" id="fpi" accept=".csv,.txt" onchange="onFileSel(event)"/>
              <div id="adminFileSt" class="ast"></div>
            </div>
            <div id="adminUrlSection" style="display:none">
              <div class="af" style="margin-top:8px"><label>HTTP URL</label>
                <input id="adminUrlInput" type="text" placeholder="http://192.168.1.10/shipments.csv"/></div>
              <button class="btn pri sm" onclick="loadFromUrl(true)">Connect</button>
              <div class="url-note">&#9432; HTTP URL is read-only.</div>
              <div id="adminUrlSt" class="ast"></div>
            </div>
            <div id="adminDemoSection" style="display:none">
              <button class="btn pri sm" style="margin-top:8px" onclick="loadDemo()">Load Demo Data</button>
              <div id="adminDemoSt" class="ast"></div>
            </div>
          </div>
          <div class="admin-card">
            <div class="admin-title">Sync &amp; Auto-Save</div>
            <div class="admin-sub">refresh interval and write-back behaviour</div>
            <div class="af"><label>Auto-Refresh Interval</label>
              <select id="adminInterval" onchange="onIntervalChange()">
                <option value="0">Off (manual only)</option>
                <option value="30">30 seconds</option>
                <option value="60">1 minute</option>
                <option value="300">5 minutes</option>
                <option value="900" selected>15 minutes</option>
                <option value="1800">30 minutes</option>
              </select>
            </div>
            <div class="af"><label>Two-Way Write-Back</label>
              <select id="adminWriteBack"><option value="1">Enabled</option><option value="0">Disabled</option></select>
            </div>
            <div class="af"><label>Auto-Save on Change</label>
              <select id="adminAutoSave"><option value="1">Enabled</option><option value="0">Disabled</option></select>
            </div>
            <button class="btn pri sm" onclick="saveDataSettings()" style="margin-top:10px">Save Settings</button>
            <div class="sync-row">
              <span id="adminSyncInd" style="font-size:12px;font-family:var(--mo);color:var(--tx3)">&#9679; not connected</span>
              <span id="adminCdown" style="font-size:11px;font-family:var(--mo);color:var(--tx3)"></span>
            </div>
          </div>
          <div class="admin-card">
            <div class="admin-title">Archive Settings</div>
            <div class="admin-sub">auto-archive based on dispatched date</div>
            <div class="af"><label>Archive N days after Dispatched Date</label>
              <input id="adminArchDays" type="number" min="1" max="365" value="30"/></div>
            <div class="af"><label>Auto-Archive on Refresh</label>
              <select id="adminAutoArch"><option value="1">Enabled</option><option value="0">Disabled</option></select></div>
            <div style="display:flex;gap:8px;margin-top:8px">
              <button class="btn pri sm" onclick="saveArchSettings()">Save</button>
              <button class="btn ghost sm" onclick="runArchNow()">Run Now</button>
            </div>
            <div id="adminArchSt" class="ast"></div>
          </div>
                    <div class="admin-card">
            <div class="admin-title">&#128465; Clear Data</div>
            <div class="admin-sub">permanently delete selected data — cannot be undone</div>
            <div class="af">
              <label>What to delete</label>
              <select id="clearDataSelect" style="font-size:13px;padding:7px 10px;background:var(--bg3);border:1px solid var(--bdr2);border-radius:var(--r);color:var(--tx);width:100%">
                <option value="">— Select what to clear —</option>
                <option value="shipments_pending">Pending shipments only</option>
                <option value="shipments_dispatched">Dispatched shipments only</option>
                <option value="shipments_staged">Staged shipments only</option>
                <option value="shipments_scheduled">Scheduled shipments only</option>
                <option value="shipments_deleted">Deleted (soft-deleted) shipments</option>
                <option value="shipments_all">ALL active shipments</option>
                <option value="archive">Archive (all archived orders)</option>
                <option value="audit">Audit log</option>
                <option value="everything">EVERYTHING (full reset)</option>
              </select>
            </div>
            <button class="btn danger sm" style="margin-top:8px" onclick="clearSelectedData()">&#128465; Clear Selected Data</button>
            <div id="clearDataSt" class="ast" style="margin-top:6px"></div>
          </div>

          <div class="admin-card">
            <div class="admin-title">Backup Configuration</div>
            <div class="admin-sub">full backup as <strong>.zip</strong> containing separate files: shipments.csv, archive.csv, audit_log.csv, users.json, settings.json</div>

            <div class="af">
              <label>Backup Folder</label>
              <div style="display:flex;gap:7px;align-items:center;flex-wrap:wrap">
                <div id="backupFolderDisplay" style="flex:1;font-family:var(--mo);font-size:12px;padding:7px 10px;background:var(--bg3);border:1px solid var(--bdr2);border-radius:var(--r);color:var(--tx3);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
                  No folder selected — will download to default Downloads folder
                </div>
                <button class="btn ghost sm" onclick="pickBackupFolder()" id="pickFolderBtn">&#128194; Browse</button>
                <button class="btn xs danger" id="clearFolderBtn" onclick="clearBackupFolder()" style="display:none" title="Clear folder selection">&#x2715;</button>
              </div>
              <div style="font-size:11px;color:var(--tx3);font-family:var(--mo);margin-top:5px;line-height:1.5">
                &#9432; Requires Chrome or Edge for folder selection. Backup downloads as <strong>.zip</strong> — open the same file to restore. Auto-backup also saves a compact copy to browser storage.
              </div>
            </div>

            <div class="af"><label>Backup Filename</label>
              <input id="adminBackupName" type="text" value="kn_backup" placeholder="kn_backup"/>
            </div>
            <div class="af"><label>Auto-Backup Interval</label>
              <select id="adminBackupInterval">
                <option value="0">Off</option>
                <option value="3600">Every 1 hour</option>
                <option value="7200" selected>Every 2 hours (default)</option>
                <option value="14400">Every 4 hours</option>
                <option value="28800">Every 8 hours</option>
              </select>
            </div>
            <div class="ibox" style="background:var(--adim);border-color:var(--ac);font-size:12px;padding:9px 12px;margin-bottom:8px">
              &#9432; Backup includes <strong>all data</strong>: shipments, archive, users, settings &amp; audit log. File saved as <code>.knbak</code> (JSON).
            </div>
            <div style="display:flex;gap:8px;margin-top:4px;flex-wrap:wrap">
              <button class="btn pri sm" onclick="doBackup(true)">&#128190; Backup Now</button>
              <button class="btn ghost sm" onclick="restoreBackup()">&#128194; Restore from .zip&hellip;</button>
              <button class="btn ghost sm" onclick="restoreFromLocalStorage()">&#8635; Restore Last Auto-Backup</button>
            </div>
            <div style="font-size:11px;color:var(--tx3);font-family:var(--mo);margin-top:6px">Auto-backup also saves to browser storage as a safety net.</div>
            <div class="bk-st" id="bkStatus" style="margin-top:8px">Last backup: <strong>never</strong></div>
            <div class="bk-st" id="bkNext" style="margin-top:3px"></div>
            <button class="btn pri sm" onclick="saveBackupSettings()" style="margin-top:8px">Save Backup Settings</button>
            <div id="bkSettingsSt" class="ast" style="margin-top:4px"></div>
          </div>
          <div class="admin-card full">
            <div class="admin-title">CSV Format Guide</div>
            <div class="admin-sub">one row per pallet/LPN — rows sharing the same Shipment No. are grouped into one order</div>
            <div style="overflow-x:auto">
              <table style="min-width:860px;font-size:12px;border-collapse:collapse">
                <thead><tr style="background:var(--bg3)">
                  <th style="padding:6px 10px;border-bottom:1px solid var(--bdr2);text-align:left;font-family:var(--mo);font-size:10px;text-transform:uppercase;color:var(--tx3)">Column</th>
                  <th style="padding:6px 10px;border-bottom:1px solid var(--bdr2);text-align:left;font-family:var(--mo);font-size:10px;text-transform:uppercase;color:var(--tx3)">Example</th>
                  <th style="padding:6px 10px;border-bottom:1px solid var(--bdr2);text-align:left;font-family:var(--mo);font-size:10px;text-transform:uppercase;color:var(--tx3)">Notes</th>
                </tr></thead>
                <tbody id="csvGuideBody"></tbody>
              </table>
            </div>
            <button class="btn pri sm" onclick="dlTemplate()" style="margin-top:12px">&#8595; Download CSV Template</button>
          </div>
        </div>
      </div>

      <!-- CUSTOMIZATION -->
      <div class="admin-panel" id="apanel-custom">
        <div class="admin-grid">
          <div class="admin-card full">
            <div class="admin-title">Field Label Customization</div>
            <div class="admin-sub">rename any field label — changes apply throughout the entire app</div>
            <div id="rnContainer"></div>
            <div style="display:flex;gap:8px;margin-top:12px">
              <button class="btn pri sm" onclick="saveFieldNames()">Apply Labels</button>
              <button class="btn ghost sm" onclick="resetFieldNames()">Reset to Defaults</button>
            </div>
          </div>
          <div class="admin-card">
            <div class="admin-title">Status Badge Colors</div>
            <div class="admin-sub">customize the colour for each status badge</div>
            <div id="colorCustomContainer"></div>
            <div style="display:flex;gap:8px;margin-top:12px">
              <button class="btn pri sm" onclick="saveStatusColors()">Apply Colors</button>
              <button class="btn ghost sm" onclick="resetStatusColors()">Reset</button>
            </div>
          </div>
          <div class="admin-card" style="grid-column:1/-1">
            <div class="admin-title">&#127912; Colour Themes</div>
            <div class="admin-sub">Three Kuehne+Nagel brand themes — click to apply instantly across the entire app</div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:14px">
              <div id="theme-card-1" onclick="applyThemePreset(1)" style="cursor:pointer;border-radius:12px;overflow:hidden;border:2px solid #00306A;box-shadow:0 4px 16px rgba(0,48,106,.2);transition:all .2s">
                <div style="height:44px;background:linear-gradient(135deg,#00306A,#002864);display:flex;align-items:center;padding:0 12px;gap:7px">
                  <div style="width:7px;height:7px;border-radius:50%;background:#fff;opacity:.9"></div>
                  <div style="width:7px;height:7px;border-radius:50%;background:#fff;opacity:.5"></div>
                  <div style="width:7px;height:7px;border-radius:50%;background:#fff;opacity:.25"></div>
                </div>
                <div style="background:#ffffff;padding:10px 12px">
                  <div style="height:5px;border-radius:3px;background:#00306A;width:60%;margin-bottom:5px"></div>
                  <div style="height:3px;border-radius:2px;background:#e8f0fa;width:80%;margin-bottom:3px"></div>
                  <div style="height:3px;border-radius:2px;background:#e8f0fa;width:50%;margin-bottom:8px"></div>
                  <div style="display:flex;gap:5px">
                    <div style="height:16px;border-radius:4px;background:#00306A;flex:1"></div>
                    <div style="height:16px;border-radius:4px;background:#f4f7fc;border:1px solid #dce6f4;flex:1"></div>
                  </div>
                </div>
                <div style="background:#f4f7fc;padding:8px 12px;display:flex;align-items:center;justify-content:space-between">
                  <span style="font-size:12px;font-weight:700;color:#00306A;font-family:var(--fn)">Classic KN</span>
                  <span id="theme-check-1" style="font-size:13px;color:#00306A">&#10003;</span>
                </div>
              </div>
              <div id="theme-card-2" onclick="applyThemePreset(2)" style="cursor:pointer;border-radius:12px;overflow:hidden;border:2px solid var(--bdr2);transition:all .2s">
                <div style="height:44px;background:linear-gradient(135deg,#002965,#002562);display:flex;align-items:center;padding:0 12px;gap:7px">
                  <div style="width:7px;height:7px;border-radius:50%;background:#fff;opacity:.9"></div>
                  <div style="width:7px;height:7px;border-radius:50%;background:#fff;opacity:.5"></div>
                  <div style="width:7px;height:7px;border-radius:50%;background:#fff;opacity:.25"></div>
                </div>
                <div style="background:#f8fbff;padding:10px 12px">
                  <div style="height:5px;border-radius:3px;background:#002965;width:60%;margin-bottom:5px"></div>
                  <div style="height:3px;border-radius:2px;background:#d0e8ff;width:80%;margin-bottom:3px"></div>
                  <div style="height:3px;border-radius:2px;background:#d0e8ff;width:50%;margin-bottom:8px"></div>
                  <div style="display:flex;gap:5px">
                    <div style="height:16px;border-radius:4px;background:#002965;flex:1"></div>
                    <div style="height:16px;border-radius:4px;background:#ffffff;border:1px solid #d0e8ff;flex:1"></div>
                  </div>
                </div>
                <div style="background:#eef6ff;padding:8px 12px;display:flex;align-items:center;justify-content:space-between">
                  <span style="font-size:12px;font-weight:700;color:#002965;font-family:var(--fn)">KN Fresh</span>
                  <span id="theme-check-2" style="font-size:13px;color:transparent">&#10003;</span>
                </div>
              </div>
              <div id="theme-card-3" onclick="applyThemePreset(3)" style="cursor:pointer;border-radius:12px;overflow:hidden;border:2px solid var(--bdr2);transition:all .2s">
                <div style="height:44px;background:linear-gradient(135deg,#001430,#002050);display:flex;align-items:center;padding:0 12px;gap:7px">
                  <div style="width:7px;height:7px;border-radius:50%;background:#4a8fd4;opacity:.9"></div>
                  <div style="width:7px;height:7px;border-radius:50%;background:#4a8fd4;opacity:.5"></div>
                  <div style="width:7px;height:7px;border-radius:50%;background:#4a8fd4;opacity:.25"></div>
                </div>
                <div style="background:#0d1e3a;padding:10px 12px">
                  <div style="height:5px;border-radius:3px;background:#4a8fd4;width:60%;margin-bottom:5px"></div>
                  <div style="height:3px;border-radius:2px;background:#1a2e52;width:80%;margin-bottom:3px"></div>
                  <div style="height:3px;border-radius:2px;background:#1a2e52;width:50%;margin-bottom:8px"></div>
                  <div style="display:flex;gap:5px">
                    <div style="height:16px;border-radius:4px;background:#4a8fd4;flex:1"></div>
                    <div style="height:16px;border-radius:4px;background:#122040;border:1px solid #1a2e52;flex:1"></div>
                  </div>
                </div>
                <div style="background:#071428;padding:8px 12px;display:flex;align-items:center;justify-content:space-between">
                  <span style="font-size:12px;font-weight:700;color:#4a8fd4;font-family:var(--fn)">KN Dark</span>
                  <span id="theme-check-3" style="font-size:13px;color:transparent">&#10003;</span>
                </div>
              </div>
            </div>
            <div style="margin-top:14px;padding:10px 14px;background:var(--adim);border-radius:var(--r);border:1px solid var(--bdr2);font-size:12px;color:var(--tx2)">
              &#9432; All themes use Kuehne+Nagel brand colours. <strong>KN Dark</strong> activates dark mode automatically.
            </div>
            <div id="themeSt" class="ast" style="margin-top:8px"></div>
          </div>
        </div>
      </div>

      <!-- USER MANAGEMENT -->
      <div class="admin-panel" id="apanel-users">
        <div class="admin-card full">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
            <div><div class="admin-title">Users</div><div class="admin-sub">manage user accounts and access levels</div></div>
            <button class="btn pri sm" onclick="openAddUser()">+ Add User</button>
          </div>
          <div id="usrMgmtSt" class="ast" style="margin-bottom:8px"></div>
          <div class="tbl-wrap"><div class="tbl-scroll">
            <table>
              <thead><tr>
                <th>Name</th><th>Username</th><th>Email</th><th>Role</th><th>Status</th><th class="ns">Actions</th>
              </tr></thead>
              <tbody id="usersTbody"></tbody>
            </table>
          </div></div>
        </div>
      </div>

      <!-- SECURITY -->
      <div class="admin-panel" id="apanel-security">
        <div class="admin-grid">
          <div class="admin-card">
            <div class="admin-title">Admin Password</div>
            <div class="admin-sub">change the password required to access the Admin Console and perform restricted actions</div>
            <div class="af"><label>Current Password</label><input id="pwdCurrent" type="password" placeholder="Current admin password"/></div>
            <div class="af"><label>New Password</label><input id="pwdNew" type="password" placeholder="New password (min 6 chars)"/></div>
            <div class="af"><label>Confirm New Password</label><input id="pwdConfirm" type="password" placeholder="Repeat new password"/></div>
            <button class="btn pri sm" onclick="changeAdminPwd()" style="margin-top:6px">Change Password</button>
            <div id="pwdChangeSt" class="ast"></div>
          </div>
          <div class="admin-card">
            <div class="admin-title">Session Settings</div>
            <div class="admin-sub">access control and session configuration</div>
            <div class="ibox" style="font-size:12px;padding:8px 12px;background:var(--gdim);border-color:var(--gn);border-radius:var(--r)">&#9989; Admin Console access is <strong>role-based</strong> — users with the Admin role have full access automatically.</div>
            <div class="af"><label>Delete Records Requires Admin Password</label>
              <select id="deleteRequiresPwd"><option value="1">Yes (recommended)</option><option value="0">No</option></select>
            </div>
            <div class="af"><label>View Mode on Login</label>
              <select id="defaultViewMode">
                <option value="ops">Operations View (default)</option>
                <option value="admin">Administrator View</option>
              </select>
            </div>
            <button class="btn pri sm" onclick="saveSecuritySettings()">Save Settings</button>
            <div id="securitySt" class="ast"></div>
          </div>
        </div>
      </div>
    </div>

      <!-- AUDIT TRAIL PANEL -->
      <div class="admin-panel" id="apanel-audit">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px">
        <div>
          <div style="font-family:var(--dp);font-size:18px;font-weight:600">Audit Trail</div>
          <div style="font-size:11px;color:var(--tx3);font-family:var(--mo);margin-top:2px">All tracked actions — <span id="auditCount">0</span> entries</div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <select id="auditFltAction" onchange="renderAudit()" style="font-size:12px;padding:6px 10px;background:var(--bg2);border:1px solid var(--bdr2);border-radius:var(--r);color:var(--tx)">
            <option value="">All Actions</option>
            <option value="create">Create</option>
            <option value="update">Update</option>
            <option value="delete">Delete</option>
            <option value="dispatch">Dispatch</option>
            <option value="archive">Archive</option>
            <option value="config">Config Change</option>
            <option value="login">Login</option>
          </select>
          <select id="auditFltUser" onchange="renderAudit()" style="font-size:12px;padding:6px 10px;background:var(--bg2);border:1px solid var(--bdr2);border-radius:var(--r);color:var(--tx)">
            <option value="">All Users</option>
          </select>
          <button class="btn ghost sm" onclick="exportAuditCSV()">&#8595; Export CSV</button>
          <button class="btn danger sm" onclick="reqAdminPwd('clearAudit')">Clear Log</button>
        </div>
      </div>
      <div class="tbl-wrap"><div class="tbl-scroll">
        <table style="min-width:900px">
          <thead><tr>
            <th>Timestamp</th><th>User</th><th>Action</th><th>Entity</th><th>Entity ID</th>
            <th>Before</th><th>After</th>
          </tr></thead>
          <tbody id="auditBody"></tbody>
        </table>
        <div class="empty-state" id="auditEmpty" style="display:none">No audit log entries<p>Actions will be logged here automatically</p></div>
      </div></div>
      </div>

      <!-- EXPORTS PANEL -->
      <div class="admin-panel" id="apanel-exports">
        <div class="admin-grid">

          <!-- FTP/SFTP Connection -->
          <div class="admin-card">
            <div class="admin-title">&#128225; FTP / SFTP Connection</div>
            <div class="admin-sub">Configure remote file server for automated export delivery</div>
            <div class="ibox">&#9432; Browser security prevents direct FTP/SFTP connections. Settings are saved and used when exporting via the <strong>Export Now</strong> button — the file is downloaded with the FTP-ready filename. For fully automated uploads, connect this app to a server-side proxy.</div>
            <div class="fr2">
              <div class="af">
                <label>Protocol</label>
                <select id="ftpProtocol">
                  <option value="sftp">SFTP (recommended)</option>
                  <option value="ftp">FTP</option>
                  <option value="ftps">FTPS</option>
                </select>
              </div>
              <div class="af">
                <label>Port</label>
                <input id="ftpPort" type="number" placeholder="22" value="22"/>
              </div>
            </div>
            <div class="af">
              <label>Server Address / Host</label>
              <input id="ftpHost" type="text" placeholder="ftp.yourserver.com or 192.168.1.10"/>
            </div>
            <div class="fr2">
              <div class="af">
                <label>Username</label>
                <input id="ftpUser" type="text" placeholder="ftpuser" autocomplete="off"/>
              </div>
              <div class="af">
                <label>Password</label>
                <input id="ftpPass" type="password" placeholder="••••••••" autocomplete="new-password"/>
              </div>
            </div>
            <div class="af">
              <label>Remote Folder Path</label>
              <input id="ftpPath" type="text" placeholder="/exports/kn/" value="/exports/kn/"/>
            </div>
            <div class="af">
              <label>Passive Mode (FTP only)</label>
              <select id="ftpPassive"><option value="1">Enabled (recommended)</option><option value="0">Disabled</option></select>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:4px">
              <button class="btn pri sm" onclick="saveFtpSettings()">Save Connection</button>
              <button class="btn ghost sm" onclick="testFtpSettings()">&#9654; Test Connection</button>
              <button class="btn ghost sm" onclick="exportToFtp()">&#8593; Export Now</button>
            </div>
            <div id="ftpSt" class="ast" style="margin-top:6px"></div>
          </div>

          <!-- FTP Export Options -->
          <div class="admin-card">
            <div class="admin-title">&#128196; Export Settings</div>
            <div class="admin-sub">Configure what data and format is exported to FTP/SFTP</div>
            <div class="af">
              <label>Data to Export</label>
              <select id="ftpExportData">
                <option value="all">All Active Orders</option>
                <option value="scheduled">Scheduled Orders Only</option>
                <option value="staged">Staged Orders Only</option>
                <option value="dispatched">Dispatched Orders Only</option>
                <option value="pending">Pending Orders Only</option>
                <option value="today_inbound">Inbound Today</option>
                <option value="today_dispatched">Dispatched Today</option>
              </select>
            </div>
            <div class="af">
              <label>File Format</label>
              <select id="ftpExportFormat">
                <option value="csv">CSV (.csv)</option>
                <option value="xlsx">Excel (.xlsx)</option>
              </select>
            </div>
            <div class="af">
              <label>File Name Pattern</label>
              <input id="ftpFileName" type="text" value="KN_Export_{data}_{date}_{time}" placeholder="KN_Export_{data}_{date}_{time}"/>
              <div style="font-size:10px;color:var(--tx3);font-family:var(--mo);margin-top:4px">
                Variables: <strong>{data}</strong> = data type &nbsp;|&nbsp; <strong>{date}</strong> = YYYYMMDD &nbsp;|&nbsp; <strong>{time}</strong> = HHMMSS
              </div>
            </div>
            <div class="af">
              <label>Include Column Headers</label>
              <select id="ftpHeaders"><option value="1">Yes</option><option value="0">No</option></select>
            </div>
            <div class="af">
              <label>Date Filter Field</label>
              <select id="ftpDateField">
                <option value="all">All Orders (no date filter)</option>
                <option value="inbound">By Inbound Date</option>
                <option value="scheduled">By Scheduled Ship Date</option>
                <option value="outbound">By Dispatch Date</option>
              </select>
            </div>
            <div class="fr2">
              <div class="af">
                <label>From Date</label>
                <input id="ftpDateFrom" type="date"/>
              </div>
              <div class="af">
                <label>To Date</label>
                <input id="ftpDateTo" type="date"/>
              </div>
            </div>
            <div id="ftpExpSt" class="ast"></div>
          </div>

          <!-- Email Scheduling -->
          <div class="admin-card full">
            <div class="admin-title">&#9993; Scheduled Email Exports</div>
            <div class="admin-sub">Automatically generate and send export files to a list of recipients on a schedule</div>
            <div class="ibox">&#9432; Email scheduling uses your default email client (Outlook, Mail, etc.) to compose and send. Clicking <strong>Send Now</strong> or a scheduled trigger will open a pre-composed email with the export file attached.</div>
            <div class="admin-grid" style="gap:12px">
              <div>
                <!-- Recipients -->
                <div class="af">
                  <label>Recipients</label>
                  <div style="display:flex;gap:6px;margin-bottom:6px">
                    <input id="emailRecipientInput" type="email" placeholder="name@company.com" style="flex:1" onkeydown="if(event.key==='Enter'){addEmailRecipient();event.preventDefault()}"/>
                    <button class="btn ghost sm" onclick="addEmailRecipient()">+ Add</button>
                  </div>
                  <div id="emailRecipientList" style="min-height:32px"></div>
                </div>
                <!-- Subject line -->
                <div class="af">
                  <label>Email Subject</label>
                  <input id="emailSubject" type="text" value="KN Track Flow — {data} Export {date}"/>
                </div>
                <!-- Format -->
                <div class="fr2">
                  <div class="af">
                    <label>File Format</label>
                    <select id="emailFormat">
                      <option value="xlsx">Excel (.xlsx)</option>
                      <option value="csv">CSV (.csv)</option>
                    </select>
                  </div>
                  <div class="af">
                    <label>Data to Export</label>
                    <select id="emailExportData">
                      <option value="all">All Active Orders</option>
                      <option value="scheduled">Scheduled Orders</option>
                      <option value="staged">Staged Orders</option>
                      <option value="dispatched">Dispatched Orders</option>
                      <option value="pending">Pending Orders</option>
                      <option value="today_inbound">Inbound Today</option>
                      <option value="today_dispatched">Dispatched Today</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <!-- Schedule -->
                <div class="af">
                  <label>Schedule</label>
                  <select id="emailSchedule" onchange="onEmailScheduleChange()">
                    <option value="off">Off — Manual only</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly (specific date)</option>
                    <option value="custom">Custom (every N days)</option>
                  </select>
                </div>
                <div id="emailScheduleOptions">
                  <!-- Daily -->
                  <div id="emailOptDaily" style="display:none">
                    <div class="af">
                      <label>Send Time</label>
                      <input id="emailTimeDaily" type="time" value="08:00"/>
                    </div>
                  </div>
                  <!-- Weekly -->
                  <div id="emailOptWeekly" style="display:none">
                    <div class="fr2">
                      <div class="af">
                        <label>Day of Week</label>
                        <select id="emailDayOfWeek">
                          <option value="1">Monday</option><option value="2">Tuesday</option>
                          <option value="3">Wednesday</option><option value="4">Thursday</option>
                          <option value="5">Friday</option><option value="6">Saturday</option>
                          <option value="0">Sunday</option>
                        </select>
                      </div>
                      <div class="af">
                        <label>Send Time</label>
                        <input id="emailTimeWeekly" type="time" value="08:00"/>
                      </div>
                    </div>
                  </div>
                  <!-- Monthly -->
                  <div id="emailOptMonthly" style="display:none">
                    <div class="fr2">
                      <div class="af">
                        <label>Day of Month (1–28)</label>
                        <input id="emailDayOfMonth" type="number" min="1" max="28" value="1"/>
                      </div>
                      <div class="af">
                        <label>Send Time</label>
                        <input id="emailTimeMonthly" type="time" value="08:00"/>
                      </div>
                    </div>
                  </div>
                  <!-- Custom -->
                  <div id="emailOptCustom" style="display:none">
                    <div class="fr2">
                      <div class="af">
                        <label>Every N Days</label>
                        <input id="emailEveryDays" type="number" min="1" max="365" value="7"/>
                      </div>
                      <div class="af">
                        <label>Send Time</label>
                        <input id="emailTimeCustom" type="time" value="08:00"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="af">
                  <label>Next Scheduled Send</label>
                  <div id="emailNextSend" style="font-size:12px;color:var(--tx2);font-family:var(--mo);padding:5px 0">—</div>
                </div>
                <div style="display:flex;gap:8px;margin-top:6px;flex-wrap:wrap">
                  <button class="btn pri sm" onclick="saveEmailSchedule()">Save Schedule</button>
                  <button class="btn ghost sm" onclick="sendEmailNow()">&#9993; Send Now</button>
                  <button class="btn ghost sm" onclick="previewEmailExport()">&#128065; Preview</button>
                </div>
                <div id="emailSchSt" class="ast" style="margin-top:6px"></div>
              </div>
            </div>
          </div>

        </div>
      </div>


    <!-- ARCHIVE ADMIN PANEL (injected into admin view via JS) -->
    <div id="apanel-archive" class="admin-panel" style="display:none">
      <div class="admin-grid">
        <div class="admin-card" style="grid-column:1/-1">
          <div class="admin-title">Archived Orders</div>
          <div class="admin-sub">Orders auto-archived after dispatch date exceeds threshold. Only visible to Admin role.</div>
          <div class="arch-banner" style="margin-bottom:12px">
            <p><strong id="archCount2">0</strong> archived orders — auto-archived when dispatched date is older than <strong id="archDaysTxt2">30</strong> days.</p>
            <div style="display:flex;gap:7px">
              <button class="btn ghost sm" onclick="exportArchCSV()">&#8595; Export CSV</button>
              <button class="btn danger sm" onclick="reqAdminPwd('clearArchive')">Clear Archive</button>
            </div>
          </div>
          <div class="tbl-wrap"><div class="tbl-scroll">
            <table style="min-width:860px">
              <thead><tr>
                <th>Client</th><th>Customer</th><th>Order No.</th><th>Shipment No.</th>
                <th>Pallets</th><th>Carrier</th><th>Dispatched</th><th class="ns">Actions</th>
              </tr></thead>
              <tbody id="archBody2"></tbody>
            </table>
            <div class="empty-state" id="archEmpty2" style="display:none">No archived orders<p>Dispatched orders past the threshold will auto-archive here</p></div>
          </div></div>
        </div>
      </div>
    </div>


  </div><!-- /content -->
</div><!-- /main -->
</div><!-- /app shell -->

<!-- PASSWORD PROMPT OVERLAY -->
<div class="pwd-overlay" id="pwdOverlay">
  <div class="pwd-card">
    <div class="pwd-icon">&#128274;</div>
    <div class="pwd-title" id="pwdOverlayTitle">Admin Access Required</div>
    <div class="pwd-sub" id="pwdOverlaySub">Enter the admin password to continue</div>
    <input class="pwd-input" id="pwdOverlayInput" type="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" onkeydown="if(event.key==='Enter')pwdSubmit()"/>
    <div class="pwd-err" id="pwdOverlayErr"></div>
    <div class="pwd-btns">
      <button class="btn ghost" onclick="pwdCancel()" style="flex:1">Cancel</button>
      <button class="btn pri" onclick="pwdSubmit()" style="flex:1">Confirm</button>
    </div>
  </div>
</div>

<!-- SHIPMENT MODAL -->
<div class="mbd" id="shipModal">
  <div class="modal wide">

    <!-- Header -->
    <div class="mhdr">
      <div class="mtitle" id="shipModalTitle">New Order</div>
      <button class="mclose" onclick="closeShipModal()" title="Close">&#x2715;</button>
    </div>

    <!-- Body -->
    <div class="mbody">

      <!-- ─ Order Identity ─ -->
      <div class="slbl">Order Identity</div>
      <div class="fr4">
        <div class="field">
          <label>Client ID <span class="req">*</span></label>
          <input id="fClient" type="text" placeholder="ACME-001" autocomplete="off"/>
        </div>
        <div class="field">
          <label>Order No. <span class="req">*</span></label>
          <input id="fOrder" type="text" placeholder="ORD-2024-001" autocomplete="off"/>
        </div>
        <div class="field">
          <label>Shipment No. <span class="req">*</span></label>
          <input id="fShipment" type="text" placeholder="SHP-0001" autocomplete="off"/>
        </div>
        <div class="field">
          <label>Status</label>
          <select id="fStatus">
            <option value="pending">Pending</option>
            <option value="scheduled">Scheduled</option>
            <option value="staged">Staged</option>
            <option value="dispatched">Dispatched</option>
          </select>
        </div>
      </div>
      <div class="fr2">
        <div class="field">
          <label>Customer Name</label>
          <input id="fCustName" type="text" placeholder="Acme Corporation" autocomplete="off"/>
        </div>
        <div class="field">
          <label>Destination Country</label>
          <input id="fCountry" type="text" placeholder="Germany" autocomplete="off"/>
        </div>
      </div>

      <!-- ─ Carrier & Dates ─ -->
      <div class="slbl">Carrier &amp; Dates</div>
      <div class="fr3">
        <div class="field">
          <label>Carrier</label>
          <select id="fCarrier" onchange="populateCarrierDropdown()"><option value="">Select…</option></select>
        </div>
        <div class="field">
          <label>Service Level</label>
          <select id="fServiceLevel"><option value="">Select…</option></select>
        </div>
        <div class="field">
          <label>Tracking Number</label>
          <input id="fTracking" type="text" placeholder="AWB / tracking ref" autocomplete="off"/>
        </div>
      </div>
      <div class="fr3">
        <div class="field">
          <label>Scheduled Ship Date</label>
          <input id="fSchedDate" type="date"/>
        </div>
        <div class="field">
          <label>Inbound Date &amp; Time</label>
          <input id="fInbound" type="datetime-local"/>
        </div>
        <div class="field">
          <label>Outbound Date &amp; Time</label>
          <input id="fOutbound" type="datetime-local"/>
        </div>
      </div>

      <!-- ─ Notes ─ -->
      <div class="slbl">Notes</div>
      <div class="fr2">
        <div class="field">
          <label>Internal Reference</label>
          <input id="fNotes" type="text" placeholder="Internal ref, handling codes…" autocomplete="off"/>
        </div>
        <div class="field">
          <label>Shipping Notes</label>
          <input id="fShipNotes" type="text" placeholder="Incoterms, BOL, customs ref, delivery instructions…" autocomplete="off"/>
        </div>
      </div>

      <!-- ─ Pallets ─ -->
      <div class="slbl" style="display:flex;align-items:center;justify-content:space-between">
        <span>Pallets / LPNs</span>
        <span style="font-weight:400;font-size:10px;color:var(--tx3);text-transform:none;letter-spacing:0">one row per pallet — each can have its own location</span>
      </div>
      <div class="pe-hdr">
        <span>#</span>
        <span>Pallet ID / LPN</span>
        <span>Package Type</span>
        <span>Loc. Type</span>
        <span>Staging Location</span>
        <span></span>
      </div>
      <div class="pe-wrap" id="peWrap"></div>
      <button class="btn ghost sm" onclick="addPltRow()" style="margin-top:5px;font-size:11px">+ Add Pallet</button>

    </div><!-- /mbody -->

    <div class="mfoot">
      <button class="btn ghost sm" onclick="closeShipModal()">Cancel</button>
      <button class="btn pri sm" onclick="saveShipment()">&#10003; Save Order</button>
    </div>

  </div>
</div>

<!-- USER MODAL -->
<div class="mbd" id="userModal">
  <div class="modal narrow">
    <div class="mhdr"><div class="mtitle" id="userModalTitle">Add User</div><button class="mclose" onclick="closeUserModal()">&#x2715;</button></div>
    <div class="field"><label>Full Name *</label><input id="uName" type="text" placeholder="e.g. John Smith"/></div>
    <div class="field"><label>Username *</label><input id="uUsername" type="text" placeholder="e.g. jsmith"/></div>
    <div class="field"><label>Email</label><input id="uEmail" type="email" placeholder="e.g. jsmith@company.com"/></div>
    <div class="field"><label>Role</label>
      <select id="uRole"><option value="operator">Operator</option><option value="admin">Admin</option></select>
    </div>
    <div class="field"><label>Password *</label><input id="uPassword" type="password" placeholder="Min 6 characters"/></div>
    <div id="uEditNote" style="display:none;margin-top:8px" class="ibox">Leave password blank to keep current password.</div>
    <div class="mfoot">
      <button class="btn ghost" onclick="closeUserModal()">Cancel</button>
      <button class="btn pri" onclick="saveUser()">Save User</button>
    </div>
  </div>
</div>

<script>

/* ═══════════════════════════════════════════════
   WMS OUTBOUND TRACKER v5.0
   Enhanced Edition
   ═══════════════════════════════════════════════ */

/* ── DATA MODEL ── */
let rawRows = [];
let archive = [];
let auditLog = [];
let importParsed = [];
let importType = 'new';
let insightsLastOrders = []; // stores last filtered result for export
let editKey = null;
let sortCol = 'shipmentNo', sortAsc = true;
let activeVTab = 'all';
let page = 1;
const PG = 15;
let chartInst = {};
let plSel = new Set();
const APP_VERSION='1.0';
let fHandle = null, fFallback = null, lastUrl = '', lastCSV = '';
let activeSrc = 'demo';
let cdownTimer = null, cdownSecs = 0;
let backupTimer = null;
let stagingViewMode = 'cards';
let activeActTab = 'inbound';
let pwdCallback = null;
let editUserId = null;
let currentUser = null;

/* ── SETTINGS ── */
let S = {
  refreshInterval: 900,
  writeBack: true,
  autoSave: true,
  archiveDays: 30,
  autoArchive: true,
  appName: 'KN Track Flow',
  appSub: 'Track Flow',
  accent: '#00306A',
  logoDataUrl: '',
  fieldLabels: {},
  statusColors: {},
  theme: {},
  carriers: [
    {name:'DHL', sls:['Express','Economy','Freight','Parcel']},
    {name:'FedEx', sls:['Priority','Standard','Economy','Freight']},
    {name:'UPS', sls:['Express','Saver','Standard','Freight']},
    {name:'DB Schenker', sls:['Road','Air','Ocean','Logistics']},
    {name:'Maersk', sls:['FCL','LCL','Air','Spot']},
    {name:'XPO Logistics', sls:['FTL','LTL','Air','Intermodal']},
    {name:'CEVA', sls:['Air','Ocean','Ground','Warehousing']},
    {name:'TNT', sls:['Express','Economy','Night','Freight']},
  ],
  adminPassword: btoa('admin123'),
  requireAdminForDelete: true,
  requireAdminForConsole: false,
  darkMode: false,
  defaultViewMode: 'ops',
  loginBgType: 'particles',
  loginBgColor1: '#001430',
  loginBgColor2: '#002864',
  loginBgImage: '',
  loginBannerText: '',
  loginBannerColor: '#00306A',
  activeTheme: 1,
  loginLeftBg: '',
  backupFilename: 'kn_backup',
  backupInterval: 7200,
  ftpSettings: {},
  emailSchedule: {},
};

let USERS = [
  {id:'u1', name:'Administrator', username:'admin', email:'admin@company.com', role:'admin', password: btoa('admin123'), active:true},
  {id:'u2', name:'Warehouse Operator', username:'operator', email:'ops@company.com', role:'operator', password: btoa('wms2024'), active:true},
];

const DFL = {
  clientId:'Client ID', customerName:'Customer Name', destCountry:'Destination Country',
  orderNo:'Order Number', shipmentNo:'Shipment No.', palletId:'Pallet ID / LPN',
  pkgType:'Package Type', locationType:'Location Type', stagingLoc:'Staging Location',
  carrier:'Carrier', serviceLevel:'Service Level', trackingNo:'Tracking Number',
  scheduledShipDate:'Scheduled Ship Date',
  inboundDt:'Inbound Date', outboundDt:'Outbound Date', status:'Status',
  notes:'Internal Reference', shippingNotes:'Shipping Notes'
};

const DEFAULT_STATUS_COLORS = {
  pending:'#d97706', scheduled:'#7c3aed', staged:'#00306A', dispatched:'#059669', archived:'#94a3b8'
};

const CSV_COLS = [
  ['Client ID','ACME-001','Your client/account code'],
  ['Customer Name','Acme Corporation','Full customer name'],
  ['Destination Country','Germany','Destination country'],
  ['Order Number','ORD-2024-0001','Order reference number'],
  ['Shipment No.','SHP-2024-0001','Reference number — ALL pallets of one Order No. share this value'],
  ['Pallet ID / LPN','PLT-REF0001-001','UNIQUE per pallet row'],
  ['Package Type','Euro Pallet','Pallet / Euro Pallet / Half Pallet / Carton / Drum / Crate / Mixed'],
  ['Location Type','rack','rack or lane'],
  ['Staging Location','RACK-A-01-02','Bin address or lane name — can be unique per pallet'],
  ['Carrier','DHL','Carrier name'],
  ['Service Level','Express','Service level / product'],
  ['Tracking Number','JD014600006251476','AWB or tracking number'],
  ['Scheduled Ship Date','15/06/2024','dd/MM/yyyy — e.g. 15/06/2024'],
  ['Inbound Date','10/06/2024 08:30','dd/MM/yyyy HH:MM — e.g. 10/06/2024 14:30'],
  ['Outbound Date','10/06/2024 14:00','dd/MM/yyyy HH:MM — blank if not dispatched'],
  ['Status','staged','pending | scheduled | staged | dispatched'],
  ['Internal Reference','REF-123','Per-pallet internal reference or handling instructions'],
  ['Shipping Notes','DDP — BOL ref BOL-88001','Carrier/customs instructions'],
];

const DEMO_ROWS = [
  {clientId:'SCHNEIDER-ALD',customerName:'Schneider Electric',destCountry:'Germany',orderNo:'ORD-2024-0101',shipmentNo:'REF-0101',palletId:'PLT-0101-001',pkgType:'Euro Pallet',locationType:'rack',stagingLoc:'RACK-A-01-01',carrier:'DHL',serviceLevel:'Express',trackingNo:'JD014600006251476',scheduledShipDate:'2024-06-10',inboundDt:'2024-06-10T08:30',outboundDt:'2024-06-10T14:00',status:'dispatched',notes:'Fragile electronics',shippingNotes:'DDP Incoterms — BOL ref BOL-88001'},
  {clientId:'SCHNEIDER-ALD',customerName:'Schneider Electric',destCountry:'Germany',orderNo:'ORD-2024-0101',shipmentNo:'REF-0101',palletId:'PLT-0101-002',pkgType:'Euro Pallet',locationType:'rack',stagingLoc:'RACK-A-01-02',carrier:'DHL',serviceLevel:'Express',trackingNo:'JD014600006251476',scheduledShipDate:'2024-06-10',inboundDt:'2024-06-10T08:30',outboundDt:'2024-06-10T14:00',status:'dispatched',notes:'Handle with care',shippingNotes:'DDP Incoterms — BOL ref BOL-88001'},
  {clientId:'SCHNEIDER-ALD',customerName:'Schneider Electric',destCountry:'Germany',orderNo:'ORD-2024-0101',shipmentNo:'REF-0101',palletId:'PLT-0101-003',pkgType:'Euro Pallet',locationType:'lane',stagingLoc:'LANE-B-03',carrier:'DHL',serviceLevel:'Express',trackingNo:'JD014600006251476',scheduledShipDate:'2024-06-10',inboundDt:'2024-06-10T09:00',outboundDt:'2024-06-10T14:00',status:'dispatched',notes:'',shippingNotes:'DDP Incoterms — BOL ref BOL-88001'},
  {clientId:'GLOBEX-02',customerName:'Globex Corporation',destCountry:'United States',orderNo:'ORD-2024-0201',shipmentNo:'REF-0201',palletId:'PLT-0201-001',pkgType:'Mixed',locationType:'lane',stagingLoc:'LANE-A-01',carrier:'DB Schenker',serviceLevel:'Road',trackingNo:'SCH-00123456',scheduledShipDate:'2024-06-15',inboundDt:'2024-06-11T11:15',outboundDt:'',status:'staged',notes:'Stack max 2 high',shippingNotes:'EXW terms — ISF filing required'},
  {clientId:'GLOBEX-02',customerName:'Globex Corporation',destCountry:'United States',orderNo:'ORD-2024-0201',shipmentNo:'REF-0201',palletId:'PLT-0201-002',pkgType:'Mixed',locationType:'lane',stagingLoc:'LANE-A-02',carrier:'DB Schenker',serviceLevel:'Road',trackingNo:'SCH-00123456',scheduledShipDate:'2024-06-15',inboundDt:'2024-06-11T11:15',outboundDt:'',status:'staged',notes:'',shippingNotes:'EXW terms — ISF filing required'},
  {clientId:'GLOBEX-02',customerName:'Globex Corporation',destCountry:'United States',orderNo:'ORD-2024-0201',shipmentNo:'REF-0201',palletId:'PLT-0201-003',pkgType:'Carton',locationType:'rack',stagingLoc:'RACK-C-02-01',carrier:'DB Schenker',serviceLevel:'Road',trackingNo:'SCH-00123456',scheduledShipDate:'2024-06-15',inboundDt:'2024-06-11T11:30',outboundDt:'',status:'staged',notes:'Mixed dims',shippingNotes:'EXW terms — ISF filing required'},
  {clientId:'INITECH-03',customerName:'Initech Solutions',destCountry:'United Kingdom',orderNo:'ORD-2024-0301',shipmentNo:'REF-0301',palletId:'PLT-0301-001',pkgType:'Half Pallet',locationType:'rack',stagingLoc:'RACK-D-01-03',carrier:'XPO Logistics',serviceLevel:'FTL',trackingNo:'XPO-9900012',scheduledShipDate:'2024-06-12',inboundDt:'2024-06-09T07:45',outboundDt:'2024-06-14T16:30',status:'dispatched',notes:'Refrigerated',shippingNotes:'Cold chain 2-8C — UK CHIEF clearance'},
  {clientId:'INITECH-03',customerName:'Initech Solutions',destCountry:'United Kingdom',orderNo:'ORD-2024-0301',shipmentNo:'REF-0301',palletId:'PLT-0301-002',pkgType:'Half Pallet',locationType:'rack',stagingLoc:'RACK-D-01-04',carrier:'XPO Logistics',serviceLevel:'FTL',trackingNo:'XPO-9900012',scheduledShipDate:'2024-06-12',inboundDt:'2024-06-09T07:45',outboundDt:'2024-06-14T16:30',status:'dispatched',notes:'Temp check done',shippingNotes:'Cold chain 2-8C — UK CHIEF clearance'},
  {clientId:'UMBRELLA-04',customerName:'Umbrella Industries',destCountry:'France',orderNo:'ORD-2024-0401',shipmentNo:'REF-0401',palletId:'PLT-0401-001',pkgType:'Pallet',locationType:'lane',stagingLoc:'LANE-D-01',carrier:'Maersk',serviceLevel:'FCL',trackingNo:'MSK-LCL-4422',scheduledShipDate:'2024-06-12',inboundDt:'2024-06-12T08:00',outboundDt:'2024-06-12T17:00',status:'dispatched',notes:'FCL BOL attached',shippingNotes:'CIF Le Havre — EUR1 cert required'},
  {clientId:'UMBRELLA-04',customerName:'Umbrella Industries',destCountry:'France',orderNo:'ORD-2024-0401',shipmentNo:'REF-0401',palletId:'PLT-0401-002',pkgType:'Pallet',locationType:'lane',stagingLoc:'LANE-D-02',carrier:'Maersk',serviceLevel:'FCL',trackingNo:'MSK-LCL-4422',scheduledShipDate:'2024-06-12',inboundDt:'2024-06-12T08:00',outboundDt:'2024-06-12T17:00',status:'dispatched',notes:'',shippingNotes:'CIF Le Havre — EUR1 cert required'},
  {clientId:'UMBRELLA-04',customerName:'Umbrella Industries',destCountry:'France',orderNo:'ORD-2024-0402',shipmentNo:'REF-0402',palletId:'PLT-0402-001',pkgType:'Crate',locationType:'rack',stagingLoc:'RACK-E-01-01',carrier:'TNT',serviceLevel:'Freight',trackingNo:'',scheduledShipDate:'2024-06-20',inboundDt:'',outboundDt:'',status:'pending',notes:'Awaiting AWB',shippingNotes:'DAP Paris — customs invoice EUR 14500'},
  {clientId:'UMBRELLA-04',customerName:'Umbrella Industries',destCountry:'France',orderNo:'ORD-2024-0402',shipmentNo:'REF-0402',palletId:'PLT-0402-002',pkgType:'Crate',locationType:'rack',stagingLoc:'RACK-E-01-02',carrier:'TNT',serviceLevel:'Freight',trackingNo:'',scheduledShipDate:'2024-06-20',inboundDt:'',outboundDt:'',status:'pending',notes:'',shippingNotes:'DAP Paris — customs invoice EUR 14500'},
  {clientId:'ACME-CORP',customerName:'Acme Corporation',destCountry:'India',orderNo:'ORD-2024-0501',shipmentNo:'REF-0501',palletId:'PLT-0501-001',pkgType:'Euro Pallet',locationType:'rack',stagingLoc:'RACK-A-02-01',carrier:'DHL',serviceLevel:'Economy',trackingNo:'JD01460000112233',scheduledShipDate:'2024-06-14',inboundDt:'2024-06-13T07:00',outboundDt:'',status:'staged',notes:'Priority SLA 48h',shippingNotes:'CFS Mumbai — IEC ACME1234567'},
  {clientId:'ACME-CORP',customerName:'Acme Corporation',destCountry:'India',orderNo:'ORD-2024-0501',shipmentNo:'REF-0501',palletId:'PLT-0501-002',pkgType:'Euro Pallet',locationType:'lane',stagingLoc:'LANE-B-01',carrier:'DHL',serviceLevel:'Economy',trackingNo:'JD01460000112233',scheduledShipDate:'2024-06-14',inboundDt:'2024-06-13T07:00',outboundDt:'',status:'staged',notes:'',shippingNotes:'CFS Mumbai — IEC ACME1234567'},
  {clientId:'WAYNE-ENT',customerName:'Wayne Enterprises',destCountry:'Canada',orderNo:'ORD-2024-0601',shipmentNo:'REF-0601',palletId:'PLT-0601-001',pkgType:'Mixed',locationType:'lane',stagingLoc:'LANE-C-01',carrier:'DB Schenker',serviceLevel:'Air',trackingNo:'SCH-00198765',scheduledShipDate:'2024-06-18',inboundDt:'',outboundDt:'',status:'scheduled',notes:'Oversized',shippingNotes:'DAP Toronto — CUSMA cert required'},
  {clientId:'WAYNE-ENT',customerName:'Wayne Enterprises',destCountry:'Canada',orderNo:'ORD-2024-0601',shipmentNo:'REF-0601',palletId:'PLT-0601-002',pkgType:'Mixed',locationType:'lane',stagingLoc:'LANE-C-02',carrier:'DB Schenker',serviceLevel:'Air',trackingNo:'SCH-00198765',scheduledShipDate:'2024-06-18',inboundDt:'',outboundDt:'',status:'scheduled',notes:'Forklift only',shippingNotes:'DAP Toronto — CUSMA cert required'},
  {clientId:'WAYNE-ENT',customerName:'Wayne Enterprises',destCountry:'Canada',orderNo:'ORD-2024-0601',shipmentNo:'REF-0601',palletId:'PLT-0601-003',pkgType:'Carton',locationType:'rack',stagingLoc:'RACK-F-01-01',carrier:'DB Schenker',serviceLevel:'Air',trackingNo:'SCH-00198765',scheduledShipDate:'2024-06-18',inboundDt:'',outboundDt:'',status:'scheduled',notes:'',shippingNotes:'DAP Toronto — CUSMA cert required'},
];

/* ═══════ UTILS ═══════ */
function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function fmtDt(dt){if(!dt)return null;try{const d=new Date(dt);if(isNaN(d.getTime()))return null;return{date:_dd(dt),time:d.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})};}catch{return null;}}
function _dd(v){if(!v)return'—';try{const d=new Date(v);if(isNaN(d))return v;const z=n=>String(n).padStart(2,'0');return z(d.getDate())+'/'+z(d.getMonth()+1)+'/'+d.getFullYear();}catch{return v;}}
function fmtDate(d){return _dd(d);}
function nowLocal(){const d=new Date(),z=n=>String(n).padStart(2,'0');return`${d.getFullYear()}-${z(d.getMonth()+1)}-${z(d.getDate())}T${z(d.getHours())}:${z(d.getMinutes())}`;}
function todayStr(){const d=new Date(),z=n=>String(n).padStart(2,'0');return`${d.getFullYear()}-${z(d.getMonth()+1)}-${z(d.getDate())}`;}
/* NOTE: hashPwd uses Base64 encoding (btoa), not cryptographic hashing.
   This is a known limitation of client-side-only authentication.
   Do not store sensitive passwords — treat this as a basic access control only. */
function hashPwd(p){return btoa(unescape(encodeURIComponent(p)));}
function checkPwd(input){return hashPwd(input)===S.adminPassword;}
function getULabel(k){return (S.fieldLabels&&S.fieldLabels[k])||DFL[k]||k;}
function badge(s){
  const l={pending:'Pending',scheduled:'Scheduled',staged:'Staged',dispatched:'Dispatched',archived:'Archived',deleted:'Deleted'};
  const col=S.statusColors&&S.statusColors[s]?S.statusColors[s]:DEFAULT_STATUS_COLORS[s]||'#94a3b8';
  return `<span class="badge ${s}" style="background:${col}22;color:${col};border-color:${col}44">${l[s]||s}</span>`;
}
function locTag(t){if(t==='rack')return'<span class="loc-t rack">RACK</span>';if(t==='lane')return'<span class="loc-t lane">LANE</span>';return'';}
function genId(){return 'id_'+Date.now()+'_'+Math.random().toString(36).slice(2,7);}

/* ═══════ AUDIT TRAIL ═══════ */
function logAudit(action, entity, entityId, before, after){
  const entry={
    id:genId(),
    userId:currentUser?currentUser.id:'system',
    userName:currentUser?currentUser.name:'System',
    timestamp:new Date().toISOString(),
    action,entity,entityId,
    before:before?JSON.stringify(before):'',
    after:after?JSON.stringify(after):'',
  };
  auditLog.unshift(entry);
  if(auditLog.length>2000)auditLog=auditLog.slice(0,2000);
  saveLS();
}

/* ═══════ LOGIN ═══════ */
function doLogin(){
  const u=document.getElementById('loginUser').value.trim();
  const p=document.getElementById('loginPass').value;
  const user=USERS.find(x=>x.username===u&&x.password===hashPwd(p)&&x.active);
  if(!user){document.getElementById('loginErr').classList.add('show');return;}
  document.getElementById('loginErr').classList.remove('show');
  currentUser=user;
  logAudit('login','session',user.id,null,{username:user.username,role:user.role});
  showApp();
}
function doLogout(){
  logAudit('logout','session',currentUser?.id,null,null);
  currentUser=null;
  document.getElementById('appShell').style.display='none';
  document.getElementById('loginPage').style.display='flex';
  // Restart canvas animation cleanly
  if(window._loginCanvasAnimId)cancelAnimationFrame(window._loginCanvasAnimId);
  requestAnimationFrame(()=>initLoginCanvas());
  document.getElementById('loginUser').value='';
  document.getElementById('loginPass').value='';
  // Remove role badge so it's recreated cleanly on next login
  document.getElementById('roleBadge')?.remove();
}
function showApp(){
  document.getElementById('loginPage').style.display='none';
  document.getElementById('appShell').style.display='flex';
  document.getElementById('userAvatar').textContent=currentUser.name.slice(0,2).toUpperCase();
  document.getElementById('userNameLabel').textContent=currentUser.name;
  document.getElementById('userRoleLabel').textContent=currentUser.role;
  applyRoleUI();
  updateStats();renderTable();
}
/* Role-based access — admin/operator determined purely by user.role, no manual toggle */
function applyRoleUI(){
  const isAdmin=currentUser&&currentUser.role==='admin';
  document.querySelectorAll('.admin-only').forEach(el=>el.style.display=isAdmin?'':'none');
  // Hide admin-only tabs inside Settings panel
  document.querySelectorAll('.admin-only-tab').forEach(el=>el.style.display=isAdmin?'':'none');
  // If operator somehow landed on audit/archive tab, switch to general
  if(!isAdmin){
    const cur=document.querySelector('.admin-tab.active');
    if(cur&&(cur.id==='atab-audit'||cur.id==='atab-archive')){
      setAdminTab('general');
    }
  }
  // Hide deleted tab from operators
  const delTab=document.getElementById('vtab-deleted');if(delTab)delTab.style.display=isAdmin?'':'none';
  // Show role badge in topbar
  let badge=document.getElementById('roleBadge');
  if(!badge){
    badge=document.createElement('span');
    badge.id='roleBadge';
    badge.style.cssText='font-size:11px;font-family:var(--mo);padding:3px 10px;border-radius:99px;font-weight:600;flex-shrink:0';
    document.querySelector('.tbar-r').prepend(badge);
  }
  badge.textContent=isAdmin?'⚑ Admin':'⚡ Operator';
  badge.style.background=isAdmin?'#fef3c7':'var(--gdim)';
  badge.style.color=isAdmin?'#92400e':'var(--gn)';
  badge.style.border=isAdmin?'1px solid #fcd34d':'1px solid rgba(5,150,105,.25)';
}
function setViewMode(mode){applyRoleUI();} /* stub — kept for any legacy calls */

/* ═══════ PASSWORD OVERLAY ═══════ */
function reqAdminPwd(callbackName, callbackArg){
  if(!S.requireAdminForDelete&&(callbackName==='deleteShipment'||callbackName==='clearArchive'||callbackName==='clearAudit')){
    execPwdCallback(callbackName,callbackArg);return;
  }
  // Admin console is role-based — no password required
  pwdCallback={name:callbackName,arg:callbackArg};
  document.getElementById('pwdOverlayInput').value='';
  document.getElementById('pwdOverlayErr').textContent='';
  const titles={
    deleteShipment:'Confirm Delete',clearArchive:'Confirm Clear Archive',
    clearAudit:'Confirm Clear Audit Log',openAdmin:'Admin Console Access'
  };
  document.getElementById('pwdOverlayTitle').textContent=titles[callbackName]||'Admin Access Required';
  document.getElementById('pwdOverlay').classList.add('show');
  setTimeout(()=>document.getElementById('pwdOverlayInput').focus(),100);
}
function pwdSubmit(){
  const val=document.getElementById('pwdOverlayInput').value;
  if(!checkPwd(val)){document.getElementById('pwdOverlayErr').textContent='Incorrect password';return;}
  document.getElementById('pwdOverlay').classList.remove('show');
  if(pwdCallback)execPwdCallback(pwdCallback.name,pwdCallback.arg);
  pwdCallback=null;
}
function pwdCancel(){document.getElementById('pwdOverlay').classList.remove('show');pwdCallback=null;}
function execPwdCallback(name,arg){
  if(name==='deleteShipment')delShipConfirmed(arg);
  else if(name==='clearArchive'){archive=[];saveLS();updateArchBadge();renderArchiveAdmin();logAudit('delete','archive','all',null,null);}
  else if(name==='clearAudit'){auditLog=[];saveLS();renderAudit();}
  else if(name==='switchToAdmin'||name==='openAdmin'){applyRoleUI();gv('admin',true);}
}

/* ═══════ GROUP rawRows → orders ═══════ */
function groupOrders(rows){
  // Status rank: higher rank = more progressed in workflow
  const STATUS_RANK={pending:0,scheduled:1,staged:2,dispatched:3,archived:4,deleted:5};
  const map=new Map();
  rows.forEach(r=>{
    const k=r.orderNo||'__none__';
    if(!map.has(k))map.set(k,{
      shipmentNo:r.shipmentNo,orderNo:r.orderNo,
      clientId:r.clientId,customerName:r.customerName,destCountry:r.destCountry,
      carrier:r.carrier,serviceLevel:r.serviceLevel,trackingNo:r.trackingNo,
      scheduledShipDate:r.scheduledShipDate,inboundDt:r.inboundDt,outboundDt:r.outboundDt,
      status:r.status,notes:r.notes,shippingNotes:r.shippingNotes,pallets:[],
      _statusCounts:{}
    });
    const s=map.get(k);
    s.pallets.push({palletId:r.palletId,pkgType:r.pkgType,locationType:r.locationType,stagingLoc:r.stagingLoc,notes:r.notes});
    if(r.outboundDt&&(!s.outboundDt||r.outboundDt>s.outboundDt))s.outboundDt=r.outboundDt;
    if(r.inboundDt&&(!s.inboundDt||r.inboundDt<s.inboundDt))s.inboundDt=r.inboundDt;
    // Track status frequency across all pallet rows for this order
    const st=r.status||'pending';
    s._statusCounts[st]=(s._statusCounts[st]||0)+1;
    // Use consensus: if all pallets agree → use that status
    //                if mixed → use the highest-rank status present
    const total=Object.values(s._statusCounts).reduce((a,b)=>a+b,0);
    const unanimousStatus=Object.keys(s._statusCounts).find(st=>s._statusCounts[st]===total);
    if(unanimousStatus){
      s.status=unanimousStatus;
    } else {
      // Mixed statuses — pick the highest rank so dispatched wins over staged etc.
      s.status=Object.keys(s._statusCounts).reduce((best,st)=>
        (STATUS_RANK[st]||0)>(STATUS_RANK[best]||0)?st:best
      ,Object.keys(s._statusCounts)[0]);
    }
    if(!s.shippingNotes&&r.shippingNotes)s.shippingNotes=r.shippingNotes;
    if(!s.serviceLevel&&r.serviceLevel)s.serviceLevel=r.serviceLevel;
  });
  return[...map.values()].map(s=>{
    const {_statusCounts,...rest}=s;
    return{...rest,palletCount:s.pallets.length,stagingLocs:[...new Set(s.pallets.map(p=>p.stagingLoc).filter(Boolean))].join(', ')};
  });
}
function getOrders(){return groupOrders(rawRows);}

/* ═══════ STATS ═══════ */
function updateStats(){
  const sh=getOrders();
  const active=sh.filter(s=>s.status!=='deleted');
  const sc=active.filter(s=>s.status==='scheduled');
  const st=active.filter(s=>s.status==='staged');
  const di=active.filter(s=>s.status==='dispatched');
  const pe=active.filter(s=>s.status==='pending');
  const delCount=sh.filter(s=>s.status==='deleted').length;
  const cli=new Set(active.map(s=>s.clientId)).size;
  document.getElementById('sSTotal').textContent=active.length+(delCount>0?` (+${delCount} deleted)`:'');
  document.getElementById('sSCli').textContent=`${cli} client${cli!==1?'s':''}`;
  document.getElementById('sSSched').textContent=sc.length;
  document.getElementById('ssSchedP').textContent=`${sc.reduce((a,s)=>a+s.palletCount,0)} pallets`;
  document.getElementById('sSStaged').textContent=st.length;
  document.getElementById('ssStagedP').textContent=`${st.reduce((a,s)=>a+s.palletCount,0)} pallets`;
  document.getElementById('sSDisp').textContent=di.length;
  document.getElementById('ssDispP').textContent=`${di.reduce((a,s)=>a+s.palletCount,0)} pallets`;
  document.getElementById('sSPend').textContent=pe.length;
  document.getElementById('sSPallets').textContent=rawRows.length;
  updateArchBadge();
  const mkDrp=(id,arr)=>{const el=document.getElementById(id);if(!el)return;const cv=el.value,l0=el.options[0].text;el.innerHTML=`<option value="">${l0}</option>`+arr.map(v=>`<option${v===cv?' selected':''}>${esc(v)}</option>`).join('');};
  const _active=sh.filter(s=>s.status!=='deleted');
    const _afd=sh.filter(s=>s.status!=='deleted');
  mkDrp('fltClient',[...new Set(_afd.map(s=>s.clientId).filter(Boolean))].sort());
  mkDrp('fltCountry',[...new Set(_afd.map(s=>s.destCountry).filter(Boolean))].sort());
  mkDrp('fltCarrier',[...new Set(_afd.map(s=>s.carrier).filter(Boolean))].sort());
}
function updateArchBadge(){
  const b=document.getElementById('archBadge');
  if(b){b.textContent=archive.length;b.style.display=archive.length>0?'inline':'none';}
}

/* ═══════ MAIN TABLE ═══════ */
function getFiltered(){
  const q=(document.getElementById('searchBox')?.value||'').toLowerCase();
  const cl=document.getElementById('fltClient')?.value||'';
  const co=document.getElementById('fltCountry')?.value||'';
  const ca=document.getElementById('fltCarrier')?.value||'';
  return getOrders().filter(s=>{
    if(s.status==='archived')return false;
    if(activeVTab==='deleted')return s.status==='deleted';
    if(s.status==='deleted')return false;
    const mt=activeVTab==='all'||s.status===activeVTab;
    const mq=!q||[s.clientId,s.customerName,s.destCountry,s.orderNo,s.shipmentNo,s.carrier,s.trackingNo,s.stagingLocs,...s.pallets.map(p=>p.palletId)].some(f=>(f||'').toLowerCase().includes(q));
    return mt&&mq&&(!cl||s.clientId===cl)&&(!co||s.destCountry===co)&&(!ca||s.carrier===ca);
  }).sort((a,b)=>{
    let va=a[sortCol],vb=b[sortCol];
    if(sortCol==='palletCount'){va=+va||0;vb=+vb||0;return sortAsc?va-vb:vb-va;}
    return sortAsc?String(va||'').localeCompare(String(vb||'')):String(vb||'').localeCompare(String(va||''));
  });
}
function renderTable(){
  const rows=getFiltered();
  const tp=Math.max(1,Math.ceil(rows.length/PG));
  if(page>tp)page=tp;
  const paged=rows.slice((page-1)*PG,page*PG);
  const tb=document.getElementById('tblBody');
  document.getElementById('emptyMsg').style.display=paged.length===0?'block':'none';
  if(!paged.length){tb.innerHTML='';document.getElementById('pagBar').innerHTML='';return;}
  const today=todayStr();
  tb.innerHTML=paged.map(s=>{
    const ib=fmtDt(s.inboundDt),ob=fmtDt(s.outboundDt);
    const overdue=s.scheduledShipDate&&s.scheduledShipDate<today&&s.status!=='dispatched';
    const _uniqLocs=[...new Map(s.pallets.filter(p=>p.stagingLoc).map(p=>[p.stagingLoc,p])).values()];
    const _first=_uniqLocs[0];
    const _rest=_uniqLocs.length-1;
    const locsHtml=_uniqLocs.length===0?'<span class="dim">—</span>':
      `<span style="display:inline-flex;align-items:center;gap:2px;font-family:var(--mo);font-size:11px;background:var(--bg3);padding:2px 7px;border-radius:3px;font-weight:500">${esc(_first.stagingLoc)}${locTag(_first.locationType)}</span>`+
      (_rest>0?`<span style="font-size:11px;font-family:var(--mo);color:var(--ac);font-weight:600;margin-left:4px">+${_rest}</span>`:'');
    const canDispatch=s.status!=='dispatched'&&s.status!=='deleted'&&s.status!=='archived';
    return`<tr>
      <td class="mono" style="color:var(--ac);font-weight:600">${esc(s.clientId)}</td>
      <td style="font-weight:500">${esc(s.customerName)||'—'}</td>
      <td><span style="font-family:var(--mo);font-size:11px;background:var(--tdim);color:var(--tl);padding:1px 6px;border-radius:3px">${esc(s.destCountry)||'—'}</span></td>
      <td class="mono">${esc(s.orderNo)}</td>
      <td class="mono muted">${esc(s.shipmentNo)}</td>
      <td style="text-align:center;font-family:var(--mo);font-weight:700;font-size:15px;color:var(--ac)">${s.palletCount}</td>
      <td style="max-width:190px">${locsHtml}</td>
      <td class="dim">${esc(s.carrier)||'—'}${s.serviceLevel?`<span style="font-size:10px;font-family:var(--mo);background:var(--bg3);padding:1px 5px;border-radius:3px;margin-left:3px;color:var(--tx3)">${esc(s.serviceLevel)}</span>`:''}</td>
      <td class="mono dim" style="font-size:11px">${esc(s.trackingNo)||'—'}</td>
      <td class="dt-cell${overdue?' overdue':''}">${s.scheduledShipDate?`<div class="dt-d">${fmtDate(s.scheduledShipDate)}</div>`:'—'}</td>
      <td class="dt-cell">${ib?`<div class="dt-d">${ib.date}</div><div class="dt-t">${ib.time}</div>`:'—'}</td>
      <td class="dt-cell">${ob?`<div class="dt-d">${ob.date}</div><div class="dt-t">${ob.time}</div>`:'—'}</td>
      <td>${badge(s.status)}</td>
      <td><div class="actions">
        ${canDispatch?`<button class="act disp" data-tip="Dispatch" onclick="dispNow('${esc(s.orderNo)}')">&#10003;</button>`:''}
        <button class="act plk" data-tip="Picking Report" onclick="quickPL('${esc(s.orderNo)}')">&#128203;</button>
        <button class="act" data-tip="Edit Order" onclick="openEdit('${esc(s.orderNo)}')">&#9998;</button>
        ${s.status==='deleted'
          ?`<button class="act disp" data-tip="Restore to Pending" onclick="restoreDeleted('${esc(s.orderNo)}')">&#8617; Restore</button>
            <button class="act del" data-tip="Delete Forever" onclick="deleteForever('${esc(s.orderNo)}')">&#128683; Forever</button>`
          :`<button class="act del" data-tip="Delete" onclick="initDelete('${esc(s.orderNo)}')">&#128465;</button>`}
      </div></td>
    </tr>
    <tr id="exp-${esc(s.orderNo)}" style="display:none"><td colspan="14">${buildExp(s)}</td></tr>`;
  }).join('');
  document.querySelectorAll('#tblBody tr:not([id^="exp"])').forEach(tr=>{
    tr.addEventListener('dblclick',()=>{
      const on=tr.cells[3]?.textContent?.trim();
      if(on){const r=document.getElementById('exp-'+on);if(r)r.style.display=r.style.display==='none'?'table-row':'none';}
    });
  });
  const bar=document.getElementById('pagBar');
  if(tp<=1){bar.innerHTML=`<span>${rows.length} order${rows.length!==1?'s':''} — ${rawRows.length} pallets total</span>`;return;}
  bar.innerHTML=`<span>${rows.length} orders</span>
    <button class="btn ghost sm" onclick="goP(${page-1})" ${page<=1?'disabled':''}>&#8592; Prev</button>
    <span style="color:var(--tx2)">Page ${page} of ${tp}</span>
    <button class="btn ghost sm" onclick="goP(${page+1})" ${page>=tp?'disabled':''}>Next &#8594;</button>`;
}
function buildExp(s){
  const chips=s.pallets.map(p=>`<div class="plt-chip">
    <div class="plt-chip-id">${esc(p.palletId||'—')}</div>
    <div style="font-size:11px;color:var(--tx3);font-family:var(--mo)">${esc(p.pkgType||'—')}</div>
    <div class="plt-chip-loc"><span style="font-family:var(--mo);font-size:11px">${esc(p.stagingLoc||'—')}</span>${p.locationType?`<span class="plt-chip-type ${p.locationType}">${p.locationType.toUpperCase()}</span>`:''}</div>
    ${p.notes?`<div style="font-size:10px;color:var(--tx3);margin-top:3px">${esc(p.notes)}</div>`:''}
  </div>`).join('');
  const n=s.notes?`<div class="nbox"><strong style="font-family:var(--mo);font-size:10px;color:var(--ac)">PALLET NOTES</strong> — ${esc(s.notes)}</div>`:'';
  const sn=s.shippingNotes?`<div class="snbox"><strong style="font-family:var(--mo);font-size:10px;color:var(--pu)">SHIPPING NOTES</strong> — ${esc(s.shippingNotes)}</div>`:'';
  return`<div class="plt-expand"><div class="plt-sec-h">${s.palletCount} Pallet${s.palletCount!==1?'s':''} — ${esc(s.shipmentNo)} / ${esc(s.orderNo)} (double-click to collapse)</div><div class="plt-grid">${chips}</div>${n}${sn}</div>`;
}
function goP(p){page=p;renderTable();}
function srt(col){if(sortCol===col)sortAsc=!sortAsc;else{sortCol=col;sortAsc=true;}document.querySelectorAll('[id^="s-"]').forEach(e=>e.textContent='');const el=document.getElementById('s-'+col);if(el)el.textContent=sortAsc?' ▲':' ▼';renderTable();}
function setVTab(t){activeVTab=t;page=1;['all','pending','scheduled','staged','dispatched','deleted'].forEach(id=>document.getElementById('vtab-'+id)?.classList.toggle('active',id===t));renderTable();}
function clearFilters(){document.getElementById('searchBox').value='';['fltClient','fltCountry','fltCarrier'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});setVTab('all');}

function dispNow(on){
  // Safety: only dispatch if rows with this exact orderNo exist and are not already dispatched
  const affected=rawRows.filter(r=>r.orderNo===on);
  if(!affected.length){console.warn('dispNow: no rows found for orderNo',on);return;}
  if(affected.every(r=>r.status==='dispatched')){
    alert('This order is already dispatched.');return;
  }
  if(!confirm('Dispatch order "'+on+'"?\n\n'+affected.length+' pallet row(s) will be marked as Dispatched.')){return;}
  const now=nowLocal();
  const before=affected[0].status;
  // Only update rows with this EXACT orderNo — no other orders affected
  rawRows.forEach(r=>{
    if(r.orderNo===on){
      r.status='dispatched';
      r.outboundDt=now;
      if(!r.inboundDt)r.inboundDt=now;
    }
  });
  logAudit('dispatch','order',on,{status:before},{status:'dispatched',outboundDt:now,pallets:affected.length});
  updateStats();renderTable();
  // Refresh other active views that show order status
  const _av=document.querySelector('.view.active');
  if(_av){
    if(_av.id==='view-staging')renderStaging();
    if(_av.id==='view-dashboard')renderDashboard();
    if(_av.id==='view-ontime')renderOnTime();
    if(_av.id==='view-picking')renderPLSelTable();
  }
  if(S.autoSave)autoWriteBack();
}
function initDelete(on){
  const ord=getOrders().find(s=>s.orderNo===on);
  const lbl=ord?`"${ord.orderNo}"`:on;
  if(confirm(`Delete order ${lbl}?\n\nThis will remove it from active views.`)){
    softDelete(on);
  }
}
function softDelete(on){
  const before=rawRows.filter(r=>r.orderNo===on).map(r=>({...r}));
  rawRows.forEach(r=>{if(r.orderNo===on)r.status='deleted';});
  logAudit('delete','order',on,{status:before[0]?.status||'unknown'},{status:'deleted'});
  updateStats();renderTable();if(S.autoSave)autoWriteBack();
}
function restoreDeleted(on){
  if(!confirm('Restore this order back to Pending status?'))return;
  rawRows.forEach(r=>{if(r.orderNo===on)r.status='pending';});
  logAudit('update','order',on,{status:'deleted'},{status:'pending'});
  updateStats();renderTable();if(S.autoSave)autoWriteBack();
}
function deleteForever(on){
  if(!confirm('Permanently remove this order?\n\nIt will be moved to the Archive and cannot be seen in Shipments.'))return;
  const sh=getOrders().find(s=>s.orderNo===on);
  if(sh){archive.push({...sh,status:'archived'});}
  rawRows=rawRows.filter(r=>r.orderNo!==on);
  logAudit('delete','order',on,{status:'deleted'},{moved:'archive',permanent:true});
  saveLS();updateStats();renderTable();if(S.autoSave)autoWriteBack();
  writeArchiveFile();
}
function delShipConfirmed(on){softDelete(on);}// on = orderNo (renamed from sn for clarity)
function archOrder(on){
  const sh=getOrders().find(s=>s.orderNo===on);if(!sh)return;
  // Store restoreStatus so unarch() can revert to correct status
  archive.push({...sh,status:'archived',restoreStatus:sh.status});
  rawRows=rawRows.filter(r=>r.orderNo!==on);
  logAudit('archive','order',on,{status:sh.status},{status:'archived'});
  saveLS();updateStats();renderTable();if(S.autoSave)autoWriteBack();
  writeArchiveFile();
}
function unarch(i){
  const s=archive[i];if(!s)return;
  // Restore to pre-archive status (stored as restoreStatus), fallback to 'staged'
  const restoredStatus=s.restoreStatus||'staged';
  s.pallets.forEach(p=>rawRows.push({clientId:s.clientId,customerName:s.customerName,destCountry:s.destCountry,orderNo:s.orderNo,shipmentNo:s.shipmentNo,palletId:p.palletId,pkgType:p.pkgType,locationType:p.locationType,stagingLoc:p.stagingLoc,carrier:s.carrier,serviceLevel:s.serviceLevel,trackingNo:s.trackingNo,scheduledShipDate:s.scheduledShipDate,inboundDt:s.inboundDt,outboundDt:s.outboundDt,status:restoredStatus,notes:p.notes,shippingNotes:s.shippingNotes}));
  logAudit('restore','order',s.orderNo,{status:'archived'},{status:restoredStatus});
  archive.splice(i,1);saveLS();updateStats();renderTable();if(S.autoSave)autoWriteBack();
}
function delArch(i){
  if(!confirm('Permanently delete this archived order?'))return;
  const s=archive[i];
  logAudit('delete','archive',s?.shipmentNo,s,null);
  archive.splice(i,1);saveLS();updateArchBadge();renderArchive();
}

/* ═══════ ARCHIVE TABLE ═══════ */
function renderArchiveAdmin(){
  const tb=document.getElementById('archBody2');
  if(!tb)return;
  const empty=document.getElementById('archEmpty2');
  const cnt=document.getElementById('archCount2');
  if(cnt)cnt.textContent=archive.length;
  const daysEl=document.getElementById('archDaysTxt2');
  if(daysEl)daysEl.textContent=S.archiveDays||30;
  if(empty)empty.style.display=archive.length===0?'block':'none';
  if(!archive.length){tb.innerHTML='';return;}
  tb.innerHTML=archive.map((s,i)=>{
    const ob=fmtDt(s.outboundDt);
    return`<tr>
      <td class="mono" style="color:var(--ac)">${esc(s.clientId)}</td>
      <td>${esc(s.customerName)||'—'}</td>
      <td class="mono" style="font-weight:600;color:var(--ac)">${esc(s.orderNo)}</td>
      <td class="mono">${esc(s.shipmentNo)}</td>
      <td style="font-family:var(--mo);text-align:center;font-weight:700;color:var(--ac)">${s.palletCount}</td>
      <td class="dim">${esc(s.carrier)||'—'}</td>
      <td class="dt-cell">${ob?`<div class="dt-d">${ob.date}</div><div class="dt-t">${ob.time}</div>`:'—'}</td>
      <td><div class="actions">
        <button class="act disp" data-tip="Restore to Active" onclick="unarch(${i})">&#8617; Restore</button>
        <button class="act del" data-tip="Delete" onclick="delArch(${i})">&#128465;</button>
      </div></td>
    </tr>`;
  }).join('');
}
function renderArchive(){renderArchiveAdmin();}
function writeArchiveFile(){/* archive is persisted via saveLS() */}

function exportArchCSV(){if(!archive.length){alert('No archived orders.');return;}dlCSV(flatRows(archive),'archive_orders.csv');}

/* ═══════ STAGING (DOCK) ═══════ */
function setStagingView(v){
  stagingViewMode=v;
  document.getElementById('stagingCardView').style.display=v==='cards'?'block':'none';
  document.getElementById('stagingTableView').style.display=v==='table'?'block':'none';
  document.getElementById('stab-cards').classList.toggle('active',v==='cards');
  document.getElementById('stab-table').classList.toggle('active',v==='table');
  renderStaging();
}
function renderStaging(){
  const sh=getOrders();
  // Summary cards
  const staged=sh.filter(s=>s.status==='staged');
  const scheduled=sh.filter(s=>s.status==='scheduled');
  const pending=sh.filter(s=>s.status==='pending');
  document.getElementById('stagingStats').innerHTML=`
    <div class="sc ca"><div class="sl">Staged Orders</div><div class="sv va">${staged.length}</div><div class="ss">${staged.reduce((a,s)=>a+s.palletCount,0)} pallets</div></div>
    <div class="sc cp"><div class="sl">Scheduled Orders</div><div class="sv vp">${scheduled.length}</div><div class="ss">${scheduled.reduce((a,s)=>a+s.palletCount,0)} pallets</div></div>
    <div class="sc co"><div class="sl">Pending Orders</div><div class="sv vo">${pending.length}</div><div class="ss">${pending.reduce((a,s)=>a+s.palletCount,0)} pallets</div></div>`;
  if(stagingViewMode==='cards')renderDock();else renderStagingTable();
}
function renderDock(){
  const sf=document.getElementById('stagingFlt').value;
  const src=(sf?rawRows.filter(r=>r.status===sf):rawRows).filter(r=>r.status!=='archived'&&r.status!=='deleted');
  const lm={};
  src.forEach(r=>{const l=r.stagingLoc||'Unassigned';if(!lm[l])lm[l]={lt:r.locationType,rows:[]};lm[l].rows.push(r);});
  const g=document.getElementById('dockGrid');
  if(!Object.keys(lm).length){g.innerHTML='<div style="color:var(--tx3);font-family:var(--mo);font-size:13px;padding:20px">No staging locations to display.</div>';return;}
  const rank={pending:0,scheduled:1,staged:2,dispatched:3};
  g.innerHTML=Object.keys(lm).sort().map(loc=>{
    const{lt,rows}=lm[loc];
    const topSt=rows.reduce((b,r)=>(rank[r.status]||0)>(rank[b]||0)?r.status:b,'pending');
    const cls=topSt==='dispatched'?'ld':topSt==='staged'?'lst':topSt==='scheduled'?'ls':'lp';
    const sns=new Set(rows.map(r=>r.shipmentNo));
    return`<div class="dock-card">
      <div class="dock-hdr">
        <div><div class="dock-loc ${cls}">${esc(loc)}</div>${lt?`<div style="margin-top:2px">${locTag(lt)}</div>`:''}</div>
        <div style="text-align:right"><div style="font-family:var(--dp);font-size:14px;font-weight:700;color:var(--ac)">${rows.length} <span style="font-size:10px;font-family:var(--mo)">PLT</span></div><div style="font-size:10px;font-family:var(--mo);color:var(--tx3)">${sns.size} ORD</div></div>
      </div>
      <div class="dock-body">${rows.map(r=>`<div class="dock-item">
        <div style="font-family:var(--mo);font-size:12px;font-weight:600;color:var(--ac)">${esc(r.palletId||'—')}</div>
        <div style="font-size:12px;font-weight:600;color:var(--tx);font-family:var(--fn)">${esc(r.orderNo)||'—'}</div>
        <div style="font-size:11px;color:var(--tx3);font-family:var(--mo)">${esc(r.shipmentNo)} &bull; ${esc(r.clientId)}</div>
        <div style="margin-top:3px">${badge(r.status)}</div>
      </div>`).join('')}</div>
    </div>`;
  }).join('');
}
function renderStagingTable(){
  const q=(document.getElementById('stagingSearch')?.value||'').toLowerCase();
  const sf=document.getElementById('stagingFlt').value;
  let src=(sf?rawRows.filter(r=>r.status===sf):rawRows).filter(r=>r.status!=='archived'&&r.status!=='deleted');
  if(q)src=src.filter(r=>[r.palletId,r.orderNo,r.shipmentNo,r.clientId,r.stagingLoc,r.carrier].some(f=>(f||'').toLowerCase().includes(q)));
  const tb=document.getElementById('stagingTblBody');
  if(!src.length){tb.innerHTML='<tr><td colspan="8" class="empty-state" style="padding:24px">No rows to display</td></tr>';return;}
  tb.innerHTML=src.map(r=>`<tr>
    <td class="mono" style="color:var(--pu)">${esc(r.palletId||'—')}</td>
    <td class="mono" style="color:var(--ac);font-weight:600">${esc(r.orderNo||'—')}</td>
    <td class="mono">${esc(r.shipmentNo)}</td>
    <td class="mono" style="color:var(--tx2)">${esc(r.clientId)}</td>
    <td><span style="font-family:var(--mo);font-size:11px;font-weight:600">${esc(r.stagingLoc||'—')}</span></td>
    <td>${r.locationType?`<span class="loc-t ${r.locationType}">${r.locationType.toUpperCase()}</span>`:'—'}</td>
    <td class="dim">${esc(r.carrier)||'—'}</td>
    <td>${badge(r.status)}</td>
  </tr>`).join('');
}

/* ═══════ PICKING REPORT ═══════ */
function renderPLSelTable(){
  const ships=getOrders().filter(s=>s.status!=='archived'&&s.status!=='deleted');
  const tb=document.getElementById('plSelBody');
  document.getElementById('plSelEmpty').style.display=ships.length===0?'block':'none';
  if(!ships.length){tb.innerHTML='';return;}
  tb.innerHTML=ships.map(s=>`<tr>
    <td><input type="checkbox" class="pl-chk" ${plSel.has(s.orderNo)?'checked':''} onchange="plTog('${esc(s.orderNo)}',this)"/></td>
    <td class="mono" style="color:var(--ac);font-weight:600">${esc(s.orderNo)}</td>
    <td class="mono muted">${esc(s.shipmentNo)}</td>
    <td class="mono">${esc(s.clientId)}</td>
    <td>${esc(s.customerName)||'—'}</td>
    <td><span style="font-family:var(--mo);font-size:11px;background:var(--tdim);color:var(--tl);padding:1px 5px;border-radius:3px">${esc(s.destCountry)||'—'}</span></td>
    <td style="font-family:var(--mo);font-weight:700;color:var(--ac);text-align:center">${s.palletCount}</td>
    <td class="dim">${esc(s.carrier)||'—'}</td>
    <td class="dt-cell">${s.scheduledShipDate?`<div class="dt-d">${fmtDate(s.scheduledShipDate)}</div>`:'—'}</td>
    <td>${badge(s.status)}</td>
  </tr>`).join('');
  document.getElementById('plCount').textContent=plSel.size;
}
function plTog(on,cb){if(cb.checked)plSel.add(on);else plSel.delete(on);document.getElementById('plCount').textContent=plSel.size;}
function plMasterChk(cb){const ships=getOrders().filter(s=>s.status!=='archived'&&s.status!=='deleted');ships.forEach(s=>cb.checked?plSel.add(s.orderNo):plSel.delete(s.orderNo));renderPLSelTable();}
function plSelAll(){const ships=getOrders().filter(s=>s.status!=='archived'&&s.status!=='deleted');ships.forEach(s=>plSel.add(s.orderNo));renderPLSelTable();}
function plClear(){plSel.clear();renderPLSelTable();}
function quickPL(on){plSel.clear();plSel.add(on);gv('picking');renderPLSelTable();}

/* ── Direct PDF generation using jsPDF — no preview step ── */
function pdfPL(){
  if(!plSel.size){alert('Select at least one order to generate a PDF.');return;}
  const jspdfLib=window.jspdf||window;
  if(typeof jspdfLib.jsPDF==='undefined'){alert('PDF library not loaded. Check your internet connection.');return;}
  if(typeof jspdfLib.jsPDF.prototype.autoTable==='undefined'&&typeof window.jspdf?.autoTable==='undefined'){
    // autoTable check
  }
  const {jsPDF}=jspdfLib;
  const ships=getOrders().filter(s=>plSel.has(s.orderNo));
  if(!ships.length){alert('No valid orders found.');return;}

  const doc=new jsPDF({orientation:'landscape',unit:'mm',format:'a4'});
  const pageW=297,marginL=7,marginR=7,usableW=pageW-marginL-marginR;
  const now=new Date();
  const dtStr=_dd(now)+' '+now.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
  const totalPallets=ships.reduce((a,s)=>a+s.palletCount,0);

  // ── Global header (first page) ─────────────────────────
  doc.setFillColor(0,48,106);
  doc.rect(0,0,pageW,15,'F');
  doc.setTextColor(255,255,255);
  doc.setFontSize(10.5);doc.setFont('helvetica','bold');
  doc.text('KN Outbound Picking Report',marginL,9.5);
  doc.setFontSize(7);doc.setFont('helvetica','normal');
  doc.text(`${dtStr}  ·  ${ships.length} order${ships.length!==1?'s':''}  ·  ${totalPallets} pallets`,pageW-marginR,9.5,{align:'right'});
  let y=19;

  ships.forEach((s,si)=>{
    // ── Order block ─────────────────────────────────────
    const palletRows=s.pallets.map((p,pi)=>([
      String(pi+1),
      p.palletId||'—',
      p.pkgType||'—',
      (p.locationType||'').toUpperCase().slice(0,4)||'—',
      p.stagingLoc||'—',
      p.notes||'',
      '☐'
    ]));

    // Estimate: order header (~18mm) + table header (~6mm) + rows (~5mm each) + sig (~10mm)
    const blockH=18+6+(palletRows.length*5.2)+10;
    // Start new page if not enough room (leave 15mm margin at bottom)
    if(y+blockH>195&&si>0){
      // Footer on current page
      const pg=doc.internal.getNumberOfPages();
      doc.setFontSize(6);doc.setTextColor(160,160,175);
      doc.text(`KN Track Flow  ·  Page ${pg}`,pageW/2,206,{align:'center'});
      doc.addPage();
      // Re-draw global header on new page
      doc.setFillColor(0,48,106);
      doc.rect(0,0,pageW,10,'F');
      doc.setTextColor(255,255,255);
      doc.setFontSize(8);doc.setFont('helvetica','bold');
      doc.text('KN Outbound Picking Report (continued)',marginL,6.8);
      doc.setFontSize(6.5);doc.setFont('helvetica','normal');
      doc.text(dtStr,pageW-marginR,6.8,{align:'right'});
      y=14;
    }

    // Order header band
    doc.setFillColor(232,240,252);
    doc.roundedRect(marginL,y,usableW,15.5,1,1,'F');
    doc.setDrawColor(180,205,240);
    doc.roundedRect(marginL,y,usableW,15.5,1,1,'S');

    // Order number (prominent)
    doc.setFontSize(9.5);doc.setFont('helvetica','bold');doc.setTextColor(0,48,106);
    doc.text(s.orderNo||'—',marginL+3,y+5.5);

    // Sub line: shipment · client · customer · country
    doc.setFontSize(7);doc.setFont('helvetica','normal');doc.setTextColor(60,80,110);
    const subline=[s.shipmentNo,s.clientId,s.customerName,s.destCountry].filter(Boolean).join('  ·  ');
    doc.text(subline,marginL+3,y+10,{maxWidth:usableW*0.55});

    // Right side info
    const carrier=(s.carrier||'—')+(s.serviceLevel?' / '+s.serviceLevel:'');
    const schedDate=s.scheduledShipDate?fmtDate(s.scheduledShipDate):'—';
    doc.setFontSize(7);doc.setTextColor(60,80,110);
    doc.text(`Carrier: ${carrier}`,pageW-marginR-3,y+5.5,{align:'right'});
    doc.text(`Sched. Ship: ${schedDate}   Pallets: ${s.palletCount}`,pageW-marginR-3,y+10,{align:'right'});

    // Status pill
    const stColors={dispatched:[5,150,105],staged:[0,48,106],scheduled:[100,60,200],pending:[200,120,0]};
    const [sr,sg,sb]=stColors[s.status]||[100,100,100];
    doc.setFillColor(sr,sg,sb);
    doc.roundedRect(pageW-marginR-24,y+11,22,3.5,1,1,'F');
    doc.setTextColor(255,255,255);doc.setFontSize(6);doc.setFont('helvetica','bold');
    doc.text((s.status||'').toUpperCase(),pageW-marginR-13,y+13.8,{align:'center'});

    y+=17;

    // Pallet table using autoTable
    doc.autoTable({
      startY:y,
      head:[['#','Pallet ID / LPN','Package Type','Loc.','Staging Location','Notes','Confirm']],
      body:palletRows,
      margin:{left:marginL,right:marginR},
      styles:{fontSize:7,cellPadding:1.4,font:'helvetica',textColor:[15,23,42],lineColor:[210,220,235],lineWidth:0.2},
      headStyles:{fillColor:[0,48,106],textColor:[255,255,255],fontStyle:'bold',fontSize:7,cellPadding:1.8},
      alternateRowStyles:{fillColor:[248,251,255]},
      columnStyles:{
        0:{cellWidth:8,halign:'center'},
        1:{cellWidth:40,fontStyle:'bold'},
        2:{cellWidth:28},
        3:{cellWidth:12,halign:'center'},
        4:{cellWidth:38,fontStyle:'bold'},
        5:{cellWidth:'auto'},
        6:{cellWidth:14,halign:'center',fontSize:9}
      },
      didDrawPage:()=>{},
      tableWidth:'auto'
    });
    y=doc.lastAutoTable.finalY+2;

    // Shipping notes (if any)
    if(s.shippingNotes){
      doc.setFontSize(6.5);doc.setFont('helvetica','normal');doc.setTextColor(100,70,10);
      doc.setFillColor(255,251,235);
      doc.rect(marginL,y,usableW,5.5,'F');
      doc.text('ℹ  '+s.shippingNotes.slice(0,180),marginL+2,y+3.5,{maxWidth:usableW-4});
      y+=7;
    }

    // Signature strip
    doc.setDrawColor(180,200,230);doc.setFillColor(252,254,255);
    doc.rect(marginL,y,usableW,8,'FD');
    const sigW=usableW/3;
    ['Picker Name & Signature','Supervisor Sign-Off','Date / Time'].forEach((lbl,i)=>{
      const sx=marginL+(i*sigW);
      doc.setFontSize(6);doc.setTextColor(130,150,175);doc.setFont('helvetica','normal');
      doc.text(lbl,sx+3,y+5.5);
      if(i>0){doc.setDrawColor(200,215,235);doc.line(sx,y,sx,y+8);}
    });
    y+=11;

    // Gap between orders
    if(si<ships.length-1) y+=4;
  });

  // Final page footer
  const pg=doc.internal.getNumberOfPages();
  doc.setFontSize(6);doc.setTextColor(160,160,175);
  doc.text(`KN Track Flow  ·  Page ${pg}`,pageW/2,206,{align:'center'});

  const ts=now.toISOString().slice(0,10);
  doc.save(`KN_PickingReport_${ts}.pdf`);
  logAudit('create','report','picking-pdf',null,{orders:ships.length,pallets:totalPallets});
}

function printPL(){
  // Kept for backward compat — just use pdfPL
  pdfPL();
}

/* ═══════ ACTIVITY ═══════ */
function setActTab(t){
  activeActTab=t;
  ['inbound','dispatched','scheduled'].forEach(id=>document.getElementById('atab-'+id)?.classList.toggle('active',id===t));
  renderActivity();
}
function renderActivity(){
  const today=todayStr();
  const orders=getOrders();
  document.getElementById('actDate').textContent=new Date().toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  let filtered=[];
  if(activeActTab==='inbound'){
    // Orders with inbound date today
    filtered=orders.filter(s=>s.inboundDt&&s.inboundDt.slice(0,10)===today);
  }else if(activeActTab==='dispatched'){
    filtered=orders.filter(s=>s.outboundDt&&s.outboundDt.slice(0,10)===today);
  }else if(activeActTab==='scheduled'){
    filtered=orders.filter(s=>s.scheduledShipDate===today);
  }
  const labels={inbound:'Inbound Today',dispatched:'Dispatched Today',scheduled:'Scheduled for Today'};
  document.getElementById('actContent').innerHTML=`
    <div class="activity-action-bar">
      <div style="font-family:var(--dp);font-size:16px;font-weight:600">${labels[activeActTab]} &mdash; <span style="color:var(--ac)">${filtered.length}</span> order${filtered.length!==1?'s':''}</div>
    </div>
    <div class="rtbl-wrap">
      <table class="rtbl">
        <thead><tr><th>Client</th><th>Customer</th><th>Country</th><th>Order No.</th><th>Shipment No.</th>
        <th>Pallets</th><th>Carrier</th><th>Tracking</th>
        ${activeActTab==='inbound'?'<th>Inbound</th>':activeActTab==='dispatched'?'<th>Dispatched</th>':'<th>Sched. Ship</th>'}
        <th>Status</th></tr></thead>
        <tbody>${filtered.length===0?`<tr><td colspan="10" class="empty-state" style="padding:24px">No records for today</td></tr>`:
        filtered.map(s=>{
          const dt=activeActTab==='inbound'?fmtDt(s.inboundDt):activeActTab==='dispatched'?fmtDt(s.outboundDt):null;
          const dtHtml=dt?`<div class="dt-d">${dt.date}</div><div class="dt-t">${dt.time}</div>`:s.scheduledShipDate?fmtDate(s.scheduledShipDate):'—';
          return`<tr>
            <td class="mono" style="color:var(--ac)">${esc(s.clientId)}</td>
            <td>${esc(s.customerName)||'—'}</td>
            <td><span style="font-family:var(--mo);font-size:11px;background:var(--tdim);color:var(--tl);padding:1px 5px;border-radius:3px">${esc(s.destCountry)||'—'}</span></td>
            <td class="mono">${esc(s.orderNo)}</td>
            <td class="mono">${esc(s.shipmentNo)}</td>
            <td style="font-family:var(--mo);font-weight:700;text-align:center;color:var(--ac)">${s.palletCount}</td>
            <td class="dim">${esc(s.carrier)||'—'}</td>
            <td class="mono dim" style="font-size:11px">${esc(s.trackingNo)||'—'}</td>
            <td class="dt-cell">${dtHtml}</td>
            <td>${badge(s.status)}</td>
          </tr>`;
        }).join('')}
        </tbody>
      </table>
    </div>`;
}
function emailActivity(){
  const today=todayStr();
  const orders=getOrders();
  const dateStr=_dd(new Date());

  // Build data only for the ACTIVE tab
  const tabDefs={
    inbound:   {label:'Inbound Today',     data:orders.filter(s=>s.inboundDt&&s.inboundDt.slice(0,10)===today)},
    dispatched:{label:'Dispatched Today',   data:orders.filter(s=>s.outboundDt&&s.outboundDt.slice(0,10)===today)},
    scheduled: {label:'Scheduled Today',    data:orders.filter(s=>s.scheduledShipDate===today)},
  };
  const tab = tabDefs[activeActTab] || tabDefs['inbound'];
  const {label, data} = tab;

  // Column header row
  const COL_SEP = ' | ';
  const LINE    = '%0A';
  const DIVIDER = '─'.repeat(90);

  let body = `KN Track Flow — Activity Report${LINE}`;
  body    += `${label} — ${dateStr}${LINE}`;
  body    += `${DIVIDER}${LINE}`;

  if(!data.length){
    body += `No records for today.${LINE}`;
  } else {
    // Header
    body += `Order No.       ${COL_SEP}Shipment No.    ${COL_SEP}Client          ${COL_SEP}Customer            ${COL_SEP}Country     ${COL_SEP}Carrier         ${COL_SEP}Pallets${COL_SEP}Status${LINE}`;
    body += `${DIVIDER}${LINE}`;
    data.forEach(s=>{
      const pad=(v,n)=>String(v||'—').padEnd(n).slice(0,n);
      body += `${pad(s.orderNo,16)}${COL_SEP}${pad(s.shipmentNo,16)}${COL_SEP}${pad(s.clientId,16)}${COL_SEP}${pad(s.customerName,20)}${COL_SEP}${pad(s.destCountry,12)}${COL_SEP}${pad(s.carrier,16)}${COL_SEP}${String(s.palletCount).padStart(7)}${COL_SEP}${s.status||'—'}${LINE}`;
    });
    body += `${DIVIDER}${LINE}`;
    body += `Total: ${data.length} order${data.length!==1?'s':''}, ${data.reduce((a,s)=>a+s.palletCount,0)} pallets${LINE}`;
  }

  const subject=encodeURIComponent(`KN Activity — ${label} — ${dateStr}`);
  window.location.href=`mailto:?subject=${subject}&body=${body}`;
}

/* ═══════ INSIGHTS — ORDER REPORT ═══════ */

let _insSortCol = 'orderNo', _insSortAsc = true;
let _insPage = 1;
const INS_PG = 50;

function insSort(col){
  if(_insSortCol===col)_insSortAsc=!_insSortAsc;
  else{_insSortCol=col;_insSortAsc=true;}
  document.querySelectorAll('[id^="is-"]').forEach(el=>el.textContent='');
  const el=document.getElementById('is-'+col);
  if(el)el.textContent=_insSortAsc?' ▲':' ▼';
  _insPage=1;
  _renderInsTableOnly();
}

function setInsPeriod(days){
  const fromEl=document.getElementById('insFrom');
  const toEl=document.getElementById('insTo');
  if(!fromEl||!toEl)return;
  if(days===0){fromEl.value='';toEl.value='';}
  else{
    const now=new Date();
    toEl.value=now.toISOString().slice(0,10);
    const from=new Date(now);from.setDate(from.getDate()-days);
    fromEl.value=from.toISOString().slice(0,10);
  }
  ['ip-7','ip-30','ip-90','ip-all'].forEach(id=>{
    const b=document.getElementById(id);
    if(b)b.classList.toggle('active',id==='ip-'+(days===0?'all':days));
  });
  renderInsights();
}

function clearInsights(){
  const fromEl=document.getElementById('insFrom');
  const toEl=document.getElementById('insTo');
  if(fromEl)fromEl.value='';
  if(toEl)toEl.value='';
  ['ip-7','ip-30','ip-90','ip-all'].forEach(id=>{const b=document.getElementById(id);if(b)b.classList.toggle('active',id==='ip-all');});
  renderInsights();
}

let _insDebounceTimer=null;
function renderInsights(){
  if(_insDebounceTimer)clearTimeout(_insDebounceTimer);
  _insDebounceTimer=setTimeout(_renderInsightsNow, 60);
}

function _renderInsightsNow(){
  const field=document.getElementById('insDateField')?.value||'inbound';
  const fromVal=document.getElementById('insFrom')?.value||'';
  const toVal=document.getElementById('insTo')?.value||'';
  const fieldMap={inbound:'inboundDt',scheduled:'scheduledShipDate',outbound:'outboundDt'};
  const dateKey=fieldMap[field];

  insightsLastOrders=getOrders().filter(s=>{
    if(s.status==='deleted'||s.status==='archived')return false;
    if(!fromVal&&!toVal)return true;
    const d=s[dateKey];if(!d)return false;
    const dt=d.slice(0,10);
    if(fromVal&&dt<fromVal)return false;
    if(toVal&&dt>toVal)return false;
    return true;
  });

  _insPage=1;
  _renderInsTableOnly();
}

function _renderInsTableOnly(){
  const orders=[...insightsLastOrders].sort((a,b)=>{
    let va=a[_insSortCol],vb=b[_insSortCol];
    if(_insSortCol==='palletCount'){va=+va||0;vb=+vb||0;return _insSortAsc?va-vb:vb-va;}
    return _insSortAsc?String(va||'').localeCompare(String(vb||'')):String(vb||'').localeCompare(String(va||''));
  });
  const total=orders.length;
  const tp=Math.max(1,Math.ceil(total/INS_PG));
  if(_insPage>tp)_insPage=tp;
  const paged=orders.slice((_insPage-1)*INS_PG,_insPage*INS_PG);

  const cntEl=document.getElementById('insOrderCount');
  if(cntEl)cntEl.textContent=total+' order'+(total!==1?'s':'');

  const empty=document.getElementById('insightsEmpty');
  const tbody=document.getElementById('insightsBody');
  if(empty)empty.style.display=paged.length===0?'block':'none';

  const fd=v=>_dd(v);
  if(tbody){
    tbody.innerHTML=paged.map(s=>`<tr>
      <td class="mono" style="color:var(--ac);font-weight:600">${esc(s.orderNo)}</td>
      <td class="mono muted">${esc(s.shipmentNo)}</td>
      <td class="mono" style="color:var(--ac)">${esc(s.clientId)}</td>
      <td style="font-weight:500">${esc(s.customerName)||'—'}</td>
      <td><span style="font-size:11px;background:var(--tdim);color:var(--tl);padding:1px 5px;border-radius:3px;font-family:var(--mo)">${esc(s.destCountry)||'—'}</span></td>
      <td style="text-align:center;font-weight:700;color:var(--ac);font-family:var(--mo)">${s.palletCount}</td>
      <td class="dim">${esc(s.carrier)||'—'}${s.serviceLevel?`<span style="font-size:10px;font-family:var(--mo);background:var(--bg3);padding:1px 5px;border-radius:3px;margin-left:3px;color:var(--tx3)">${esc(s.serviceLevel)}</span>`:''}</td>
      <td class="dt-cell"><div class="dt-d">${fd(s.inboundDt)}</div></td>
      <td class="dt-cell"><div class="dt-d">${fd(s.scheduledShipDate)}</div></td>
      <td class="dt-cell"><div class="dt-d">${fd(s.outboundDt)}</div></td>
      <td>${badge(s.status)}</td>
    </tr>`).join('');
  }

  // Pagination
  const bar=document.getElementById('insPageBar');
  if(bar){
    if(tp<=1){bar.innerHTML=`<span>${total} order${total!==1?'s':''}</span>`;return;}
    bar.innerHTML=`<span>${total} orders</span>
      <button class="btn ghost sm" onclick="_insGoP(${_insPage-1})" ${_insPage<=1?'disabled':''}>&#8592; Prev</button>
      <span style="color:var(--tx2)">Page ${_insPage} of ${tp}</span>
      <button class="btn ghost sm" onclick="_insGoP(${_insPage+1})" ${_insPage>=tp?'disabled':''}>Next &#8594;</button>`;
  }
}

function _insGoP(p){_insPage=p;_renderInsTableOnly();}

function _insightsExportRows(){
  if(!insightsLastOrders||!insightsLastOrders.length){
    renderInsights();
    if(!insightsLastOrders||!insightsLastOrders.length){alert('No data to export.');return null;}
  }
  return insightsLastOrders;
}
function _insightsFieldLabel(){
  const v=document.getElementById('insDateField')?.value||'inbound';
  return {inbound:'Inbound Date',scheduled:'Scheduled Ship Date',outbound:'Dispatch Date'}[v]||'Date';
}
function _insightsPeriodLabel(){
  const from=document.getElementById('insFrom')?.value||'';
  const to=document.getElementById('insTo')?.value||'';
  if(from&&to)return `${from} to ${to}`;
  if(from)return `From ${from}`;
  if(to)return `Up to ${to}`;
  return 'All Dates';
}

/* ── Excel Export ─────────────────────────────────────────── */
function exportInsightsExcel(){
  const orders=_insightsExportRows();if(!orders)return;
  if(typeof XLSX==='undefined'){alert('Excel library not loaded. Check your internet connection.');return;}
  const dateField=_insightsFieldLabel();
  const period=_insightsPeriodLabel();
  const fd=v=>{if(!v)return'';return _dd(v)||'';};
  const headers=['Order No.','Shipment No.','Client ID','Customer','Country','Pallets','Carrier','Service Level','Tracking No.','Inbound Date','Sched. Ship','Dispatch Date','Status','Shipping Notes'];
  const rows=orders.map(s=>[s.orderNo,s.shipmentNo,s.clientId,s.customerName||'',s.destCountry||'',s.palletCount,s.carrier||'',s.serviceLevel||'',s.trackingNo||'',fd(s.inboundDt),fd(s.scheduledShipDate),fd(s.outboundDt),s.status,s.shippingNotes||'']);
  const wb=XLSX.utils.book_new();
  const ws=XLSX.utils.aoa_to_sheet([headers,...rows]);
  ws['!cols']=[{wch:18},{wch:16},{wch:14},{wch:22},{wch:14},{wch:8},{wch:14},{wch:13},{wch:18},{wch:14},{wch:14},{wch:14},{wch:12},{wch:30}];
  XLSX.utils.book_append_sheet(wb,'Orders',ws);
  // Summary sheet
  const totPallets=orders.reduce((a,s)=>a+s.palletCount,0);
  const dispCnt=orders.filter(s=>s.status==='dispatched').length;
  const dispWithSched=orders.filter(s=>s.status==='dispatched'&&s.scheduledShipDate&&s.outboundDt);
  const onTime=dispWithSched.filter(s=>s.outboundDt.slice(0,10)<=s.scheduledShipDate).length;
  const otPct=dispWithSched.length?Math.round(onTime/dispWithSched.length*100):null;
  const summary=[
    ['KN Track Flow — Order Report Export'],[''],
    ['Generated',new Date().toLocaleString()],
    ['Date Field',dateField],['Period',period],
    ['Total Orders',orders.length],['Total Pallets',totPallets],
    ['Dispatched',dispCnt],['On-Time Rate',otPct!==null?otPct+'%':'n/a'],
  ];
  const wsSummary=XLSX.utils.aoa_to_sheet(summary);
  wsSummary['!cols']=[{wch:24},{wch:20}];
  XLSX.utils.book_append_sheet(wb,'Summary',wsSummary);
  const ts=new Date().toISOString().slice(0,10);
  XLSX.writeFile(wb,`KN_OrderReport_${ts}.xlsx`);
  logAudit('config','report','export-excel',null,{rows:orders.length,period,dateField});
}

/* ═══════ DASHBOARD ═══════ */
let dashPeriod='all';
function setDashPeriod(p){
  dashPeriod=p;
  ['all','7','30','week','month'].forEach(id=>{
    const el=document.getElementById('dp-'+id);
    if(el)el.classList.toggle('active',id===p);
  });
  renderDashboard();
}
function getDashRows(){
  const field=document.getElementById('dashDateField')?.value||'inbound';
  const today=new Date(); today.setHours(23,59,59,999);
  const fieldMap={inbound:'inboundDt',scheduled:'scheduledShipDate',outbound:'outboundDt'};
  const dateKey=fieldMap[field]||'inboundDt';
  if(dashPeriod==='all') return rawRows.filter(r=>r.status!=='deleted'&&r.status!=='archived');
  const from=new Date();
  if(dashPeriod==='7') from.setDate(from.getDate()-7);
  else if(dashPeriod==='30') from.setDate(from.getDate()-30);
  else if(dashPeriod==='week'){from.setDate(from.getDate()-from.getDay());from.setHours(0,0,0,0);}
  else if(dashPeriod==='month'){from.setDate(1);from.setHours(0,0,0,0);}
  return rawRows.filter(r=>{
    if(r.status==='deleted') return false;
    const d=r[dateKey];
    if(!d) return false;
    const dt=new Date(d);
    return dt>=from&&dt<=today;
  });
}
function getDashOrders(){return groupOrders(getDashRows());}
const CC=['#00306A','#059669','#d97706','#0891b2','#7c3aed','#db2777','#dc2626','#0d9488','#64748b'];
function dstC(id){if(chartInst[id]){chartInst[id].destroy();delete chartInst[id];}}
function renderDashboard(){
  const orders=getDashOrders();
  const filtRows=getDashRows();
  const isDarkMode=document.body.classList.contains('dark');
  const axCol=isDarkMode?'#9bbee8':'#7a96b8';
  const axGrid=isDarkMode?'rgba(100,160,255,.08)':'rgba(0,48,106,.05)';
  const ax={x:{ticks:{color:axCol,font:{size:11,family:"var(--fn)"}},grid:{color:axGrid}},y:{ticks:{color:axCol,font:{size:11,family:"var(--fn)"}},grid:{color:axGrid},beginAtZero:true}};
  const animNone={duration:0};
  dstC('c');const cm={};filtRows.forEach(r=>{if(r.carrier)cm[r.carrier]=(cm[r.carrier]||0)+1;});const cl=Object.keys(cm).sort((a,b)=>cm[b]-cm[a]);
  chartInst['c']=new Chart(document.getElementById('cCarrier'),{type:'bar',data:{labels:cl,datasets:[{data:cl.map(k=>cm[k]),backgroundColor:CC,borderRadius:4,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,animation:animNone,plugins:{legend:{display:false}},scales:ax}});
  document.getElementById('lCarrier').innerHTML=cl.map((l,i)=>`<div class="li"><div class="ldot" style="background:${CC[i%CC.length]}"></div>${esc(l)}: ${cm[l]}</div>`).join('');
  dstC('st');const sm={pending:0,scheduled:0,staged:0,dispatched:0};orders.forEach(s=>{if(sm[s.status]!==undefined)sm[s.status]++;});
  chartInst['st']=new Chart(document.getElementById('cStatus'),{type:'doughnut',data:{labels:['Pending','Scheduled','Staged','Dispatched'],datasets:[{data:[sm.pending,sm.scheduled,sm.staged,sm.dispatched],backgroundColor:['#d97706','#7c3aed','#00306A','#059669'],borderWidth:2,borderColor:'#fff',hoverOffset:6}]},options:{responsive:true,maintainAspectRatio:false,cutout:'65%',plugins:{legend:{display:false}}}});
  document.getElementById('lStatus').innerHTML=[{l:'Pending',c:'#d97706',v:sm.pending},{l:'Scheduled',c:'#7c3aed',v:sm.scheduled},{l:'Staged',c:'#00306A',v:sm.staged},{l:'Dispatched',c:'#059669',v:sm.dispatched}].map(i=>`<div class="li"><div class="ldot" style="background:${i.c}"></div>${i.l}: ${i.v}</div>`).join('');
  dstC('cl');const qm={};orders.forEach(s=>{if(s.clientId)qm[s.clientId]=(qm[s.clientId]||0)+s.palletCount;});const ql=Object.keys(qm).sort((a,b)=>qm[b]-qm[a]);
  chartInst['cl']=new Chart(document.getElementById('cClient'),{type:'bar',data:{labels:ql,datasets:[{data:ql.map(k=>qm[k]),backgroundColor:CC,borderRadius:4,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:ax}});
  dstC('pk');const pm={};filtRows.forEach(r=>{if(r.pkgType)pm[r.pkgType]=(pm[r.pkgType]||0)+1;});const pl=Object.keys(pm).sort((a,b)=>pm[b]-pm[a]);
  chartInst['pk']=new Chart(document.getElementById('cPkg'),{type:'doughnut',data:{labels:pl,datasets:[{data:pl.map(k=>pm[k]),backgroundColor:CC,borderWidth:2,borderColor:'#fff',hoverOffset:6}]},options:{responsive:true,maintainAspectRatio:false,cutout:'60%',plugins:{legend:{display:false}}}});
  document.getElementById('lPkg').innerHTML=pl.map((l,i)=>`<div class="li"><div class="ldot" style="background:${CC[i%CC.length]}"></div>${esc(l)}: ${pm[l]}</div>`).join('');
  dstC('ac');const am={};orders.forEach(s=>{if(s.inboundDt){const d=s.inboundDt.slice(0,10);am[d]=(am[d]||0)+1;}});
  // Outbound activity
  const bm={};orders.forEach(s=>{if(s.outboundDt){const d=s.outboundDt.slice(0,10);bm[d]=(bm[d]||0)+1;}});const al=Object.keys(am).sort();
  const bl=Object.keys(bm).sort();
  chartInst['ac']=new Chart(document.getElementById('cActivity'),{type:'line',data:{labels:al.map(d=>{const p=d.split('-');return`${p[2]}/${p[1]}`;}),datasets:[{data:al.map(k=>am[k]),borderColor:'#00306A',backgroundColor:'rgba(0,48,106,.08)',fill:true,tension:.4,pointBackgroundColor:'#00306A',pointRadius:4}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:ax}});
  if(document.getElementById('cOutbound')){dstC('ob');chartInst['ob']=new Chart(document.getElementById('cOutbound'),{type:'bar',data:{labels:bl.map(d=>{const p=d.split('-');return`${p[2]}/${p[1]}`;}),datasets:[{data:bl.map(k=>bm[k]),backgroundColor:'#059669',borderRadius:4,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:ax}});}
}

/* ═══════ ON-TIME ═══════ */
function renderOnTime(){
  const orders=getOrders().filter(s=>s.status!=='archived'&&s.scheduledShipDate&&s.status==='dispatched'&&s.outboundDt);
  const notDisp=getOrders().filter(s=>s.scheduledShipDate&&s.status!=='dispatched').length;
  let ot=0,late=0;
  const rows=orders.map(s=>{
    const diff=Math.round((new Date(s.outboundDt.slice(0,10))-new Date(s.scheduledShipDate))/(1000*86400));
    if(diff<=0)ot++;else late++;
    return{...s,diff};
  });
  const total=ot+late;
  const pct=total>0?Math.round(ot/total*100):null;
  document.getElementById('otPct').textContent=pct!==null?`${pct}%`:'—';
  document.getElementById('otOT').textContent=ot;
  document.getElementById('otLate').textContent=late;
  document.getElementById('otPend').textContent=notDisp;
  document.getElementById('otEmpty').style.display=rows.length===0?'block':'none';
  dstC('op');
  if(total>0){
    chartInst['op']=new Chart(document.getElementById('cOTPie'),{type:'doughnut',data:{labels:['On Time','Late'],datasets:[{data:[ot,late],backgroundColor:['#059669','#dc2626'],borderWidth:2,borderColor:'#fff',hoverOffset:6}]},options:{responsive:true,maintainAspectRatio:false,cutout:'65%',plugins:{legend:{display:false}}}});
    document.getElementById('lOTPie').innerHTML=[{l:'On Time',c:'#059669',v:ot},{l:'Late',c:'#dc2626',v:late}].map(i=>`<div class="li"><div class="ldot" style="background:${i.c}"></div>${i.l}: ${i.v}</div>`).join('');
  }
  dstC('oc');const cv={};rows.forEach(r=>{if(r.carrier){if(!cv[r.carrier])cv[r.carrier]=[];cv[r.carrier].push(r.diff);}});
  const carrL=Object.keys(cv).sort();
  if(carrL.length){
    const avgD=carrL.map(c=>(cv[c].reduce((a,b)=>a+b,0)/cv[c].length).toFixed(1));
    chartInst['oc']=new Chart(document.getElementById('cOTCarrier'),{type:'bar',data:{labels:carrL,datasets:[{data:avgD,backgroundColor:avgD.map(v=>+v>0?'#dc2626':'#059669'),borderRadius:4,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{ticks:{color:'#9aa0b0',font:{size:11}},grid:{color:'rgba(0,0,0,.05)'}},y:{ticks:{color:'#9aa0b0',font:{size:11}},grid:{color:'rgba(0,0,0,.05)'},beginAtZero:true}}}});
  }
  const tb=document.getElementById('otBody');
  if(!rows.length){tb.innerHTML='';return;}
  tb.innerHTML=rows.map(r=>`<tr>
    <td class="mono" style="color:var(--ac);font-weight:600">${esc(r.orderNo)}</td><td class="mono">${esc(r.shipmentNo)}</td>
    <td class="mono" style="color:var(--ac)">${esc(r.clientId)}</td><td>${esc(r.customerName)||'—'}</td>
    <td class="dim">${esc(r.carrier)||'—'}</td>
    <td class="dt-cell"><div class="dt-d">${fmtDate(r.scheduledShipDate)}</div></td>
    <td class="dt-cell"><div class="dt-d">${fmtDate(r.outboundDt)}</div></td>
    <td style="font-family:var(--mo);font-weight:700;color:${r.diff>0?'var(--rd)':r.diff<0?'var(--gn)':'var(--tx3)'}">${r.diff>0?'+'+r.diff:r.diff} days</td>
    <td>${r.diff<=0?'<span class="badge ontime">On Time</span>':'<span class="badge late">Late</span>'}</td>
  </tr>`).join('');
}

/* ═══════ AUDIT LOG ═══════ */
function renderAudit(){
  const fa=document.getElementById('auditFltAction')?.value||'';
  const fu=document.getElementById('auditFltUser')?.value||'';
  const rows=auditLog.filter(e=>(!fa||e.action===fa)&&(!fu||e.userId===fu));
  document.getElementById('auditCount').textContent=auditLog.length;
  document.getElementById('auditEmpty').style.display=rows.length===0?'block':'none';
  // Update user dropdown
  const users=[...new Set(auditLog.map(e=>e.userId))];
  const fud=document.getElementById('auditFltUser');
  if(fud){const cv=fud.value;fud.innerHTML='<option value="">All Users</option>'+USERS.map(u=>`<option value="${u.id}"${u.id===cv?' selected':''}>${esc(u.name)}</option>`).join('');}
  const tb=document.getElementById('auditBody');
  if(!rows.length){tb.innerHTML='';return;}
  const cls={create:'audit-row-create',update:'audit-row-update',delete:'audit-row-delete',config:'audit-row-config'};
  tb.innerHTML=rows.slice(0,500).map(e=>{
    const dt=new Date(e.timestamp);
    const dtStr=`${_dd(dt)} ${dt.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit'})}`;
    const rowCls=cls[e.action]||'';
    return`<tr class="${rowCls}">
      <td class="mono" style="font-size:11px;white-space:nowrap">${dtStr}</td>
      <td style="font-size:12px;font-weight:500">${esc(e.userName)}</td>
      <td><span class="badge ${e.action==='create'?'dispatched':e.action==='delete'?'late':e.action==='update'?'scheduled':'na'}" style="text-transform:capitalize">${esc(e.action)}</span></td>
      <td class="dim" style="text-transform:capitalize">${esc(e.entity)}</td>
      <td class="mono" style="font-size:11px">${esc(e.entityId)}</td>
      <td><div class="audit-diff" title="${esc(e.before)}">${esc(e.before?e.before.slice(0,60)+'…':'—')}</div></td>
      <td><div class="audit-diff" title="${esc(e.after)}">${esc(e.after?e.after.slice(0,60)+'…':'—')}</div></td>
    </tr>`;
  }).join('');
}
function exportAuditCSV(){
  if(!auditLog.length){alert('No audit log entries.');return;}
  const h=['Timestamp','User ID','User Name','Action','Entity','Entity ID','Before','After'];
  const rows=auditLog.map(e=>[e.timestamp,e.userId,e.userName,e.action,e.entity,e.entityId,e.before,e.after].map(v=>`"${String(v||'').replace(/"/g,'""')}"`).join(','));
  const blob=new Blob([[h.join(','),...rows].join('\r\n')],{type:'text/csv'});
  const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='audit_log.csv';a.click();URL.revokeObjectURL(url);
}

/* ═══════ SHIPMENT MODAL ═══════ */
function addPltRow(id='',type='',lt='rack',loc=''){
  const i=document.querySelectorAll('#peWrap .pe-row').length;
  const wrap=document.getElementById('peWrap');
  const row=document.createElement('div');row.className='pe-row';
  row.innerHTML=`
    <div class="pe-num">${i+1}</div>
    <input type="text" value="${esc(id)}" placeholder="PLT-${String(i+1).padStart(3,'0')}"/>
    <select>${['Pallet','Euro Pallet','Half Pallet','Carton','Drum','Crate','Mixed'].map(t=>`<option${type===t?' selected':''}>${t}</option>`).join('')}</select>
    <select><option value="rack"${lt==='rack'?' selected':''}>Rack</option><option value="lane"${lt==='lane'?' selected':''}>Lane</option></select>
    <input type="text" value="${esc(loc)}" placeholder="e.g. RACK-A-01"/>
    <button class="pe-del" onclick="this.closest('.pe-row').remove();rebuildPeNums()">&#x2715;</button>`;
  wrap.appendChild(row);
}
function rebuildPeNums(){document.querySelectorAll('#peWrap .pe-row').forEach((r,i)=>{r.querySelector('.pe-num').textContent=i+1;});}
function populateCarrierDropdown(carrierId='fCarrier', slId='fServiceLevel'){
  const cs=document.getElementById(carrierId);
  const sls=document.getElementById(slId);
  if(!cs)return;
  const cv=cs.value;
  cs.innerHTML='<option value="">Select carrier...</option>'+S.carriers.map(c=>`<option${c.name===cv?' selected':''}>${esc(c.name)}</option>`).join('');
  if(sls){
    const carrier=S.carriers.find(c=>c.name===cs.value);
    const slv=sls.value;
    sls.innerHTML='<option value="">Select service level...</option>'+((carrier&&carrier.sls)||[]).map(sl=>`<option${sl===slv?' selected':''}>${esc(sl)}</option>`).join('');
  }
}
function openAdd(){
  editKey=null;
  document.getElementById('shipModalTitle').textContent='New Order';
  ['fClient','fCustName','fOrder','fCountry','fShipment','fTracking','fNotes','fShipNotes'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('fStatus').value='pending';
  document.getElementById('fSchedDate').value='';
  document.getElementById('fInbound').value=nowLocal();
  document.getElementById('fOutbound').value='';
  document.getElementById('peWrap').innerHTML='';
  populateCarrierDropdown();
  addPltRow();
  document.getElementById('shipModal').classList.add('show');
}
function openEdit(on){
  editKey=on;
  const s=getOrders().find(x=>x.orderNo===on);if(!s)return;
  document.getElementById('shipModalTitle').textContent='Edit Order';
  document.getElementById('fClient').value=s.clientId;
  document.getElementById('fCustName').value=s.customerName||'';
  document.getElementById('fOrder').value=s.orderNo;
  document.getElementById('fCountry').value=s.destCountry||'';
  document.getElementById('fShipment').value=s.shipmentNo;
  document.getElementById('fSchedDate').value=s.scheduledShipDate||'';
  document.getElementById('fStatus').value=s.status;
  document.getElementById('fTracking').value=s.trackingNo||'';
  document.getElementById('fInbound').value=s.inboundDt||'';
  document.getElementById('fOutbound').value=s.outboundDt||'';
  document.getElementById('fNotes').value=s.notes||'';
  document.getElementById('fShipNotes').value=s.shippingNotes||'';
  document.getElementById('peWrap').innerHTML='';
  populateCarrierDropdown();
  document.getElementById('fCarrier').value=s.carrier||'';
  document.getElementById('fServiceLevel').value=s.serviceLevel||'';
  s.pallets.forEach(p=>addPltRow(p.palletId,p.pkgType,p.locationType,p.stagingLoc));
  document.getElementById('shipModal').classList.add('show');
}
function closeShipModal(){document.getElementById('shipModal').classList.remove('show');}
function saveShipment(){
  const clientId=document.getElementById('fClient').value.trim();
  const orderNo=document.getElementById('fOrder').value.trim();
  const shipmentNo=document.getElementById('fShipment').value.trim();
  if(!clientId||!orderNo||!shipmentNo){alert('Client ID, Order Number and Shipment No. are required.');return;}
  const shared={
    clientId,customerName:document.getElementById('fCustName').value.trim(),
    destCountry:document.getElementById('fCountry').value.trim(),
    orderNo,shipmentNo,
    carrier:document.getElementById('fCarrier').value,
    serviceLevel:document.getElementById('fServiceLevel').value,
    trackingNo:document.getElementById('fTracking').value.trim(),
    scheduledShipDate:document.getElementById('fSchedDate').value,
    inboundDt:document.getElementById('fInbound').value,
    outboundDt:(()=>{const _s=document.getElementById('fStatus').value;const _d=document.getElementById('fOutbound').value;return _s==='dispatched'&&!_d?nowLocal():(_s!=='dispatched'&&!_d?'':_d);})(),
    status:document.getElementById('fStatus').value,
    notes:document.getElementById('fNotes').value.trim(),
    shippingNotes:document.getElementById('fShipNotes').value.trim()
  };
  const pallets=[];
  document.querySelectorAll('#peWrap .pe-row').forEach(row=>{
    const inputs=row.querySelectorAll('input,select');
    const palletId=inputs[0].value.trim();
    const pkgType=inputs[1].value;
    const locationType=inputs[2].value;
    const stagingLoc=inputs[3].value.trim();
    if(palletId)pallets.push({palletId,pkgType,locationType,stagingLoc});
  });
  if(!pallets.length){alert('Add at least one pallet row.');return;}
  // Warn if user is changing a dispatched order's status backwards
  if(editKey){
    const currentRows=rawRows.filter(r=>r.orderNo===editKey);
    const currentStatus=currentRows[0]?.status;
    const newStatus=shared.status;
    if(currentStatus==='dispatched'&&newStatus!=='dispatched'){
      if(!confirm('This order is currently Dispatched. Are you sure you want to change status to "'+newStatus+'"?\nThis will update ALL pallets of this order.')){return;}
    }
  }
  // Keep existing pallet-level notes if pallet ID unchanged
  const oldPalletNotes={};
  if(editKey){rawRows.filter(r=>r.orderNo===editKey).forEach(r=>{oldPalletNotes[r.palletId]=r.notes;});}
  const before=editKey?rawRows.filter(r=>r.orderNo===editKey).map(r=>({...r})):null;
  if(editKey)rawRows=rawRows.filter(r=>r.orderNo!==editKey);
  pallets.forEach(p=>rawRows.push({
    ...shared,
    palletId:p.palletId,pkgType:p.pkgType,
    locationType:p.locationType,stagingLoc:p.stagingLoc,
    notes:oldPalletNotes[p.palletId]||shared.notes
  }));
  logAudit(editKey?'update':'create','order',shipmentNo,before,{...shared,palletCount:pallets.length});
  closeShipModal();updateStats();renderTable();if(S.autoSave)autoWriteBack();
}

/* ═══════ BULK IMPORT ═══════ */
function triggerImport(){document.getElementById('importFpi').click();}
function importDov(e){e.preventDefault();document.getElementById('importDz').classList.add('over');}
function importDol(){document.getElementById('importDz').classList.remove('over');}
function importDop(e){e.preventDefault();document.getElementById('importDz').classList.remove('over');const f=e.dataTransfer.files[0];if(!f)return;readImportFile(f);}
function onImportSel(e){const f=e.target.files[0];if(!f)return;readImportFile(f);document.getElementById('importFpi').value='';}
function readImportFile(f){const r=new FileReader();r.onload=ev=>{const rows=parseCSV(ev.target.result);if(!rows.length){alert('No valid rows found.');return;}previewImport(rows);};r.readAsText(f);}
function setImportType(type){
  importType=type;
  const btnNew=document.getElementById('impTypeNew');
  const btnUpd=document.getElementById('impTypeUpdate');
  const desc=document.getElementById('impModeDesc');
  if(btnNew){btnNew.style.background=type==='new'?'var(--ac)':'transparent';btnNew.style.color=type==='new'?'#fff':'var(--tx2)';}
  if(btnUpd){btnUpd.style.background=type==='update'?'var(--ac)':'transparent';btnUpd.style.color=type==='update'?'#fff':'var(--tx2)';}
  if(desc){
    if(type==='new'){
      desc.innerHTML='<strong>New Records:</strong> Only orders with an Order No. not already in the system are imported. Existing orders are skipped — no data is overwritten.';
      desc.style.background='var(--adim)';desc.style.color='var(--ac)';desc.style.borderColor='rgba(0,48,106,.2)';
    }else{
      desc.innerHTML='<strong>Update Existing:</strong> Rows matching an existing Order No. will fully replace all pallet data for that order. New order numbers not in the system are also added.';
      desc.style.background='var(--odim)';desc.style.color='var(--or)';desc.style.borderColor='rgba(217,119,6,.2)';
    }
  }
  // Re-run preview if data already loaded
  if(importParsed.length) previewImport(importParsed.map(r=>{const {_isDup,_action,...rest}=r;return rest;}));
}

function previewImport(rows){
  const existingOrderNos=new Set(rawRows.map(r=>r.orderNo));
  importParsed=rows.map(r=>{
    const exists=existingOrderNos.has(r.orderNo);
    let action;
    if(importType==='new'){
      action=exists?'SKIP':'NEW';
    }else{
      action=exists?'UPDATE':'NEW';
    }
    return{...r,_isDup:exists&&importType==='new',_action:action};
  });
  const newRows=importParsed.filter(r=>r._action==='NEW');
  const updRows=importParsed.filter(r=>r._action==='UPDATE');
  const skipRows=importParsed.filter(r=>r._action==='SKIP');
  const el_new=document.getElementById('impNewCount');
  const el_dup=document.getElementById('impDupCount');
  const el_upd=document.getElementById('impUpdateCount');
  if(el_new) el_new.textContent=`${newRows.length} new`;
  if(el_dup){
    el_dup.textContent=importType==='new'?`${skipRows.length} duplicate (skipped)`:`${skipRows.length} skipped`;
    el_dup.style.display=importType==='new'||(importType==='update'&&skipRows.length)?'inline':'none';
  }
  if(el_upd){
    el_upd.textContent=`${updRows.length} will update`;
    el_upd.style.display=importType==='update'&&updRows.length?'inline':'none';
  }
  const canImport=(newRows.length+updRows.length)>0;
  const btn=document.getElementById('importConfirmBtn');
  if(btn){
    btn.disabled=!canImport;
    if(importType==='new') btn.textContent=`✓ Import ${newRows.length} New Record${newRows.length!==1?'s':''}`;
    else btn.textContent=`✓ Import ${newRows.length} New + Update ${updRows.length} Order${updRows.length!==1?'s':''}`;
  }
  const tb=document.getElementById('importPreviewBody');
  tb.innerHTML=importParsed.slice(0,200).map(r=>`<tr class="${r._isDup?'import-row-dup':'import-row-new'}" style="font-size:12px">
    <td style="padding:5px 9px"><span class="import-tag ${r._action==='NEW'?'new':r._action==='UPDATE'?'upd':'dup'}">${r._action||'NEW'}</span></td>
    <td style="padding:5px 9px;font-family:var(--mo);font-weight:600;color:var(--ac)">${esc(r.orderNo)}</td>
    <td style="padding:5px 9px;font-family:var(--mo)">${esc(r.shipmentNo)}</td>
    <td style="padding:5px 9px;color:var(--ac)">${esc(r.clientId)}</td>
    <td style="padding:5px 9px;font-family:var(--mo);color:var(--pu)">${esc(r.palletId)}</td>
    <td style="padding:5px 9px">${esc(r.stagingLoc)}</td>
    <td style="padding:5px 9px">${esc(r.carrier)}</td>
    <td style="padding:5px 9px">${badge(r.status||'pending')}</td>
  </tr>`).join('');
  document.getElementById('importPreviewArea').style.display='block';
  document.getElementById('importResultMsg').textContent='';
  document.getElementById('importPreviewArea').scrollIntoView({behavior:'smooth'});
}
function cancelImport(){importParsed=[];document.getElementById('importPreviewArea').style.display='none';}
async function confirmImport(){
  const newRows=importParsed.filter(r=>r._action==='NEW');
  const updRows=importParsed.filter(r=>r._action==='UPDATE');

  if(!newRows.length&&!updRows.length){
    alert('Nothing to import — no new or updatable records found.');return;
  }

  if(importType==='update'&&updRows.length){
    // Confirm update — show what will be overwritten
    const orderNos=[...new Set(updRows.map(r=>r.orderNo))];
    const preview=orderNos.slice(0,5).join(', ')+(orderNos.length>5?` +${orderNos.length-5} more`:'');
    if(!confirm(`Update ${orderNos.length} existing order${orderNos.length!==1?'s':''}?\n\nOrders to be updated: ${preview}\n\nAll pallet rows for these orders will be replaced with the imported data.`)) return;
  }

  let addedCount=0, updatedOrders=0, updatedPallets=0;

  // 1. Process UPDATES — remove all existing rows for updated orders, then add new
  if(updRows.length){
    const updOrderNos=new Set(updRows.map(r=>r.orderNo));
    // Count pallets being replaced
    updatedPallets=rawRows.filter(r=>updOrderNos.has(r.orderNo)).length;
    updatedOrders=updOrderNos.size;
    // Remove old rows for those orders
    rawRows=rawRows.filter(r=>!updOrderNos.has(r.orderNo));
    // Add updated rows
    updRows.forEach(r=>{const {_isDup,_action,...row}=r;rawRows.push(row);});
  }

  // 2. Process NEW — append only, no duplication
  if(newRows.length){
    const existingAfterUpdate=new Set(rawRows.map(r=>r.orderNo));
    newRows.forEach(r=>{
      if(!existingAfterUpdate.has(r.orderNo)){
        const {_isDup,_action,...row}=r;rawRows.push(row);addedCount++;
      }
    });
  }

  // Audit
  logAudit('create','import','bulk',null,{
    mode:importType, added:addedCount,
    updatedOrders, updatedPallets
  });

  const el=document.getElementById('importResultMsg');
  let msg='✓ Import complete — ';
  const parts=[];
  if(addedCount)   parts.push(`${addedCount} new pallet row${addedCount!==1?'s':''} added`);
  if(updatedOrders) parts.push(`${updatedOrders} order${updatedOrders!==1?'s':''} updated (${updatedPallets} old rows replaced)`);
  el.textContent=msg+parts.join(', ')+'.';
  el.className='ast ok';
  importParsed=[];
  updateStats();renderTable();saveLS();
  if(S.autoSave)await autoWriteBack();
}

/* ═══════ CSV EXPORT ═══════ */
const CSV_HEADER=['Client ID','Customer Name','Destination Country','Order Number','Shipment No.','Pallet ID / LPN','Package Type','Location Type','Staging Location','Carrier','Service Level','Tracking Number','Scheduled Ship Date','Inbound Date','Outbound Date','Status','Internal Reference','Shipping Notes'];
function rowToCSV(r){return[r.clientId,r.customerName,r.destCountry,r.orderNo,r.shipmentNo,r.palletId,r.pkgType,r.locationType,r.stagingLoc,r.carrier,r.serviceLevel,r.trackingNo,r.scheduledShipDate,r.inboundDt,r.outboundDt,r.status,r.notes,r.shippingNotes].map(v=>`"${String(v||'').replace(/"/g,'""')}"`).join(',');}
function buildCSVText(rows){return[CSV_HEADER.join(','),...rows.map(rowToCSV)].join('\r\n');}
function dlCSV(rows,fname){const blob=new Blob([buildCSVText(rows)],{type:'text/csv'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=fname;a.click();URL.revokeObjectURL(url);}
function exportCSV(){if(!rawRows.length){alert('No data to export.');return;}dlCSV(rawRows,'outbound_orders.csv');}
function flatRows(ships){return ships.flatMap(s=>s.pallets.map(p=>({clientId:s.clientId,customerName:s.customerName,destCountry:s.destCountry,orderNo:s.orderNo,shipmentNo:s.shipmentNo,palletId:p.palletId,pkgType:p.pkgType,locationType:p.locationType,stagingLoc:p.stagingLoc,carrier:s.carrier,serviceLevel:s.serviceLevel,trackingNo:s.trackingNo,scheduledShipDate:s.scheduledShipDate,inboundDt:s.inboundDt,outboundDt:s.outboundDt,status:s.status,notes:p.notes,shippingNotes:s.shippingNotes})));}

/* ═══════ CSV PARSER ═══════ */
function pLine(line){const c=[];let cur='',q=false;for(let i=0;i<line.length;i++){const ch=line[i];if(ch==='"'){if(q&&line[i+1]==='"'){cur+='"';i++;}else q=!q;}else if(ch===','&&!q){c.push(cur);cur='';}else cur+=ch;}c.push(cur);return c;}
/* parse dd/MM/yyyy or dd/MM/yyyy HH:MM → ISO string for storage */
function normDateInput(v){
  if(!v||!v.trim())return '';
  v=v.trim();
  // Already ISO: 2024-06-15 or 2024-06-15T14:00
  if(/^\d{4}-\d{2}-\d{2}/.test(v))return v;
  // dd/MM/yyyy HH:MM
  const m1=v.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:[T ](\d{2}:\d{2}))?$/);
  if(m1){const[,d,mo,y,t]=m1;return `${y}-${mo.padStart(2,'0')}-${d.padStart(2,'0')}${t?'T'+t:''}`;}
  // dd-MM-yyyy
  const m2=v.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  if(m2){const[,d,mo,y]=m2;return `${y}-${mo.padStart(2,'0')}-${d.padStart(2,'0')}`;}
  return v;
}
function parseCSV(text){
  const lines=text.trim().split(/\r?\n/);if(lines.length<2)return[];
  const hdrs=lines[0].split(',').map(h=>h.replace(/^"|"$/g,'').trim().toLowerCase());
  const al={
    clientId:['client id','client','client_id','account'],
    customerName:['customer name','customer','name','company'],
    destCountry:['destination country','dest country','country','destination','dest'],
    orderNo:['order number','order no','order_no','order'],
    shipmentNo:['order ref','shipment number','shipment no','shipment_no','shipmentno','shipment','ref'],
    palletId:['pallet id / lpn','pallet id','lpn','pallet_id','palletid','pallet id/lpn'],
    pkgType:['package type','pkg type','package','pkg_type'],
    locationType:['location type','loc type','loc_type'],
    stagingLoc:['staging location','staging loc','staging','location','loc','dock'],
    carrier:['carrier','shipping carrier','courier'],
    serviceLevel:['service level','service_level','servicelevel','svc level','product'],
    trackingNo:['tracking number','tracking no','tracking','awb'],
    scheduledShipDate:['scheduled ship date','sched ship date','ship date','sched date'],
    inboundDt:['inbound date','inbound','in date','received date','received at'],
    outboundDt:['outbound date','outbound','out date','dispatch date','dispatched at'],
    status:['status','state'],
    notes:['internal reference','notes','remarks'],
    shippingNotes:['shipping notes','ship notes','carrier notes'],
  };
  function fc(k){for(const a of al[k]){const i=hdrs.indexOf(a);if(i!==-1)return i;}return -1;}
  const cols={};for(const k of Object.keys(al))cols[k]=fc(k);
  return lines.slice(1).filter(l=>l.trim()).map((line,idx)=>{
    const c=pLine(line);
    const g=(k,d='')=>cols[k]!==-1?(c[cols[k]]||'').replace(/^"|"$/g,'').trim():d;
    return{clientId:g('clientId'),customerName:g('customerName'),destCountry:g('destCountry'),
      orderNo:g('orderNo'),shipmentNo:g('shipmentNo'),palletId:g('palletId')||`PLT-IMP-${String(idx+1).padStart(4,'0')}`,
      pkgType:g('pkgType','Pallet'),locationType:g('locationType','rack').toLowerCase(),
      stagingLoc:g('stagingLoc'),carrier:g('carrier'),serviceLevel:g('serviceLevel'),trackingNo:g('trackingNo'),
      scheduledShipDate:normDateInput(g('scheduledShipDate')),inboundDt:normDateInput(g('inboundDt')),outboundDt:normDateInput(g('outboundDt')),
      status:g('status','pending'),notes:g('notes'),shippingNotes:g('shippingNotes')};
  }).filter(r=>r.clientId||r.orderNo||r.shipmentNo);
}

/* ═══════ FILE SOURCE ═══════ */
function triggerPicker(){
  if(window.showOpenFilePicker){
    window.showOpenFilePicker({types:[{description:'CSV Files',accept:{'text/csv':['.csv','.txt']}}],multiple:false})
      .then(async([h])=>{fHandle=h;fFallback=null;activeSrc='file';await readHandle(true);startSync();})
      .catch(()=>{});
  }else{document.getElementById('fpi').click();}
}
function onFileSel(e){const f=e.target.files[0];if(!f)return;fHandle=null;fFallback=f;activeSrc='file';readFallback(true);startSync();}
async function readHandle(flash){if(!fHandle)return false;try{const f=await fHandle.getFile();return ingest(await f.text(),f.name,flash);}catch(e){setSt('file','Cannot re-read: '+e.message,'err');return false;}}
async function readFallback(flash){if(!fFallback)return false;return ingest(await fFallback.text(),fFallback.name,flash);}
function dov(e){e.preventDefault();document.getElementById('dropZone').classList.add('over');}
function dol(){document.getElementById('dropZone').classList.remove('over');}
function dop(e){e.preventDefault();document.getElementById('dropZone').classList.remove('over');const f=e.dataTransfer.files[0];if(!f)return;fHandle=null;fFallback=f;activeSrc='file';const r=new FileReader();r.onload=ev=>ingest(ev.target.result,f.name,true);r.readAsText(f);startSync();}
async function loadFromUrl(flash){
  const u=document.getElementById('adminUrlInput').value.trim();
  if(!u){setSt('url','Enter a URL.','err');return;}
  lastUrl=u;activeSrc='url';setSt('url','Loading...','loading');
  try{const res=await fetch(lastUrl,{cache:'no-store'});if(!res.ok)throw new Error('HTTP '+res.status);const txt=await res.text();if(txt.trim().startsWith('<!'))throw new Error('URL returned HTML');ingest(txt,lastUrl.split('/').pop()||'data.csv',flash);startSync();}
  catch(e){setSt('url','Error: '+e.message,'err');}
}
function ingest(text,name,flash){
  const rows=parseCSV(text);
  if(!rows.length){setSt(activeSrc,'No valid rows — check headers.','err');return false;}
  const changed=text!==lastCSV;lastCSV=text;
  rawRows=rows;updateStats();renderTable();
  const active=document.querySelector('.view.active');
  if(active){const id=active.id.replace('view-','');if(id==='staging')renderStaging();if(id==='dashboard')renderDashboard();if(id==='ontime')renderOnTime();}
  const t=new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
  setSt(activeSrc,`✓ ${rows.length} pallets in ${[...new Set(rows.map(r=>r.shipmentNo))].length} orders — ${t}${changed?' (updated)':''}`, 'ok');
  if(activeSrc==='file'){const dz=document.getElementById('dropZone');dz.classList.add('loaded');dz.innerHTML=`<div class="dz-icon">&#9989;</div><p><strong>${esc(name)}</strong> connected</p><p class="sub">Click to change</p>`;}
  if(flash&&changed){document.querySelectorAll('#tblBody tr:not([id^="exp"])').forEach(tr=>{tr.classList.remove('flash');void tr.offsetWidth;tr.classList.add('flash');});}
  runAutoArchive();return true;
}
async function autoWriteBack(){
  if(!S.writeBack)return;
  if(activeSrc==='url'){setSyncInfo('Read-only URL — export to save');return;}
  if(!fHandle&&!fFallback){setSyncInfo('No file — export CSV to save');return;}
  setSyncPill('saving','&#9679; saving...');
  const csv=buildCSVText(rawRows);
  if(fHandle){
    try{const w=await fHandle.createWritable();await w.write(csv);await w.close();lastCSV=csv;setSyncPill('live','&#9679; live');setSyncInfo(`Saved at ${new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit'})}`);}
    catch(e){setSyncInfo('Write failed: '+e.message);}
  }else{setSyncPill('live','&#9679; live');}
}

/* ═══════ SYNC ═══════ */
/* ── Status helpers ────────────────────────────────────────── */
function manualRefresh(){if(activeSrc==='demo')return;doSync();}
function setSyncPill(cls,txt){const p=document.getElementById('syncPill');if(p){p.className=`spill ${cls}`;p.innerHTML=txt;}}
function setSyncInfo(msg){const el=document.getElementById('syncInfo');if(el)el.textContent=msg;}
function setSt(src,msg,cls){
  const map={file:'adminFileSt',url:'adminUrlSt',demo:'adminDemoSt'};
  const el=document.getElementById(map[src]);
  if(el){el.textContent=msg;el.className='ast '+(cls||'');}
}

function getInterval(){return parseInt(document.getElementById('adminInterval')?.value||'900')||0;}
function startSync(){
  if(cdownTimer)clearInterval(cdownTimer);
  const secs=getInterval();
  if(!secs){setSyncPill('live','&#9679; connected');return;}
  setSyncPill('live','&#9679; live');cdownSecs=secs;
  cdownTimer=setInterval(async()=>{
    cdownSecs--;
    document.getElementById('cdownLabel').textContent=`next in ${cdownSecs}s`;
    document.getElementById('adminCdown').textContent=`next in ${cdownSecs}s`;
    if(cdownSecs<=0){cdownSecs=secs;await doSync();}
  },1000);
}
function stopSync(){if(cdownTimer)clearInterval(cdownTimer);cdownTimer=null;setSyncPill('idle','&#9679; idle');document.getElementById('cdownLabel').textContent='';if(document.getElementById('adminCdown'))document.getElementById('adminCdown').textContent='';}
function onIntervalChange(){const s=getInterval();if(s===0)stopSync();else if(fHandle||fFallback||lastUrl)startSync();}
async function doSync(){
  if(activeSrc==='file'){if(fHandle)await readHandle(false);else if(fFallback)await readFallback(false);}
  else if(activeSrc==='url')await loadFromUrl(false);
}
function toggleDark(){
  document.body.classList.toggle('dark');
  const isDark=document.body.classList.contains('dark');
  const btn=document.getElementById('dmToggle');
  if(btn)btn.textContent=isDark?'☀':'☾';
  S.darkMode=isDark;saveLS();
  // Update Chart.js instances with correct tick/grid colors for the mode
  updateChartColors(isDark);
  // Re-render dashboard if visible to pick up new axis colors
  const activeView=document.querySelector('.view.active');
  if(activeView&&activeView.id==='view-dashboard') renderDashboard();
}

function updateChartColors(isDark){
  const textCol=isDark?'#9bbee8':'#7a96b8';
  const gridCol=isDark?'rgba(100,160,255,.08)':'rgba(0,48,106,.05)';
  Object.values(chartInst||{}).forEach(ch=>{
    if(!ch||!ch.options) return;
    const scales=ch.options.scales||{};
    ['x','y'].forEach(axis=>{
      if(scales[axis]){
        if(scales[axis].ticks)  scales[axis].ticks.color=textCol;
        if(scales[axis].grid)   scales[axis].grid.color=gridCol;
      }
    });
    const legend=ch.options.plugins?.legend;
    if(legend&&legend.labels) legend.labels.color=textCol;
    try{ch.update('none');}catch(e){}
  });
  // Also update insights charts
  Object.values(window._insCharts||{}).forEach(ch=>{
    if(!ch||!ch.options)return;
    const scales=ch.options.scales||{};
    ['x','y'].forEach(axis=>{
      if(scales[axis]){
        if(scales[axis].ticks)scales[axis].ticks.color=textCol;
        if(scales[axis].grid)scales[axis].grid.color=gridCol;
      }
    });
    const legend=ch.options.plugins?.legend;
    if(legend&&legend.labels)legend.labels.color=textCol;
    try{ch.update('none');}catch(e){}
  });
}

/* ═══════ ARCHIVE ENGINE ═══════ */
function runAutoArchive(){
  if(!S.autoArchive)return;
  const today=new Date();
  const toArch=getOrders().filter(s=>{
    if(s.status!=='dispatched')return false;
    if(!s.outboundDt)return false;
    const diff=(today-new Date(s.outboundDt.slice(0,10)))/(1000*86400);
    return diff>S.archiveDays;
  });
  if(!toArch.length)return;
  toArch.forEach(s=>{archive.push({...s,status:'archived',restoreStatus:s.status});rawRows=rawRows.filter(r=>r.orderNo!==s.orderNo);});
  logAudit('archive','auto','batch',null,{count:toArch.length});
  saveLS();updateStats();
}
function runArchNow(){runAutoArchive();document.getElementById('adminArchSt').textContent=`✓ Archived orders with dispatch date older than ${S.archiveDays} days.`;document.getElementById('adminArchSt').className='ast ok';}

function saveDataSettings(){
  S.writeBack=document.getElementById('adminWriteBack')?.value==='1';
  S.autoSave=document.getElementById('adminAutoSave')?.value==='1';
  saveLS();
  const si=document.getElementById('adminSyncInd');
  if(si){si.textContent='✓ Settings saved';setTimeout(()=>{if(si)si.textContent=activeSrc!=='demo'?'&#9679; connected':'&#9679; demo';},2000);}
}

function saveArchSettings(){
  S.archiveDays=parseInt(document.getElementById('adminArchDays').value)||30;
  S.autoArchive=document.getElementById('adminAutoArch').value==='1';
  logAudit('config','settings','archive',null,{archiveDays:S.archiveDays});
  saveLS();document.getElementById('adminArchSt').textContent='✓ Archive settings saved.';document.getElementById('adminArchSt').className='ast ok';
  {const _el=document.getElementById('archDaysTxt2');if(_el)_el.textContent=S.archiveDays;}
}

/* ═══════ BACKUP ═══════ */
let backupDirHandle = null;   // FileSystemDirectoryHandle — persists for the session

async function pickBackupFolder(){
  if(!window.showDirectoryPicker){
    alert('Folder selection requires Chrome or Edge (File System Access API).\nBackups will download to your default Downloads folder instead.');
    return;
  }
  try{
    const handle = await window.showDirectoryPicker({mode:'readwrite',startIn:'documents'});
    backupDirHandle = handle;
    updateFolderDisplay(handle.name);
    logAudit('config','backup','folder_selected',null,{folder:handle.name});
    saveLS();
    // Show a confirmation
    const st=document.getElementById('bkStatus');
    st.innerHTML=`Folder set: <strong>${esc(handle.name)}</strong> — backup will write here.`;
  }catch(e){
    if(e.name!=='AbortError') console.warn('Folder pick failed:',e);
  }
}

function clearBackupFolder(){
  backupDirHandle=null;
  updateFolderDisplay(null);
  logAudit('config','backup','folder_cleared',null,null);
}

function updateFolderDisplay(folderName){
  const disp=document.getElementById('backupFolderDisplay');
  const clearBtn=document.getElementById('clearFolderBtn');
  if(!disp)return;
  if(folderName){
    disp.textContent='📁 '+folderName;
    disp.style.color='var(--gn)';
    disp.style.fontWeight='600';
    if(clearBtn)clearBtn.style.display='inline-flex';
  }else{
    disp.textContent='No folder selected — will download to default Downloads folder';
    disp.style.color='var(--tx3)';
    disp.style.fontWeight='400';
    if(clearBtn)clearBtn.style.display='none';
  }
}

/* ══════════════════════════════════════════════════════════
   COMPREHENSIVE BACKUP & RESTORE
   File format: .knbak (JSON)
   Contains: shipments, archive, users, settings, auditLog
   ══════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════
   ZIP BACKUP — one .zip, separate files inside:
   ├── shipments.csv      (active pallet rows)
   ├── archive.csv        (archived orders)
   ├── audit_log.csv      (full audit trail)
   ├── users.json         (user accounts)
   ├── settings.json      (all app settings)
   └── manifest.json      (version + timestamps)
   ══════════════════════════════════════════════════ */

function buildAuditCSV(){
  const hdr=['Timestamp','User ID','User Name','Action','Entity','Entity ID','Before','After'];
  const q=v=>`"${String(v||'').replace(/"/g,'""')}"`;
  return [hdr.join(','), ...auditLog.map(e=>[
    e.timestamp,e.userId,e.userName,e.action,e.entity,e.entityId,
    JSON.stringify(e.before||''),JSON.stringify(e.after||'')
  ].map(q).join(','))].join('\r\n');
}

function buildUsersJSON(){
  return JSON.stringify(USERS.map(u=>({
    id:u.id, name:u.name, username:u.username,
    email:u.email||'', role:u.role, active:u.active,
    password:u.password
  })), null, 2);
}

function buildSettingsJSON(){
  return JSON.stringify({...S}, null, 2);
}

function buildManifest(fname){
  return JSON.stringify({
    app: 'KN Track Flow',
    version: APP_VERSION,
    exportedAt: new Date().toISOString(),
    exportedBy: currentUser?.username||'system',
    filename: fname,
    counts:{
      shipments: rawRows.length,
      archive: archive.length,
      users: USERS.length,
      auditEntries: auditLog.length
    }
  }, null, 2);
}

async function buildZipBlob(fname){
  if(typeof JSZip==='undefined'){
    alert('JSZip library not loaded. Check your internet connection.');
    return null;
  }
  const zip = new JSZip();
  zip.file('shipments.csv',   buildCSVText(rawRows));
  zip.file('archive.csv',     buildCSVText(flatRows(archive)));
  zip.file('audit_log.csv',   buildAuditCSV());
  zip.file('users.json',      buildUsersJSON());
  zip.file('settings.json',   buildSettingsJSON());
  zip.file('manifest.json',   buildManifest(fname));
  return await zip.generateAsync({type:'blob', compression:'DEFLATE', compressionOptions:{level:6}});
}

async function doBackup(manual){
  const ts    = new Date().toISOString().slice(0,19).replace(/[T:]/g,'-');
  const base  = (S.backupFilename||'kn_backup').replace(/\.(zip|csv|knbak)$/i,'');
  const fname = `${base}_${ts}.zip`;

  // Always keep a compact localStorage safety copy
  const safetyBlob = JSON.stringify({
    version:APP_VERSION, exportedAt:new Date().toISOString(),
    shipments:rawRows, archive:archive, users:USERS,
    settings:S, auditLog:auditLog
  });
  try{ localStorage.setItem('kn_backup_data', safetyBlob);
       localStorage.setItem('kn_backup_ts', new Date().toISOString()); }catch(e){}

  const zipBlob = await buildZipBlob(fname);
  if(!zipBlob) return;

  if(backupDirHandle){
    try{
      const perm = await backupDirHandle.queryPermission({mode:'readwrite'});
      if(perm!=='granted'){
        const req = await backupDirHandle.requestPermission({mode:'readwrite'});
        if(req!=='granted') throw new Error('Permission denied');
      }
      const fh = await backupDirHandle.getFileHandle(fname,{create:true});
      const w  = await fh.createWritable();
      await w.write(zipBlob);
      await w.close();
      _onBackupDone(fname, manual, `→ folder: ${backupDirHandle.name}`);
      return;
    }catch(e){ console.warn('Folder backup failed, downloading instead:', e); }
  }
  // Browser download
  const url = URL.createObjectURL(zipBlob);
  const a   = document.createElement('a');
  a.href=url; a.download=fname; a.click();
  URL.revokeObjectURL(url);
  _onBackupDone(fname, manual, '→ Downloads folder');
}

function _onBackupDone(fname, manual, where){
  logAudit('config','backup',manual?'manual':'auto',null,{
    file:fname, where,
    shipments:rawRows.length, archive:archive.length,
    users:USERS.length, auditEntries:auditLog.length
  });
  updateBackupStatus(fname);
  if(manual){
    const el=document.getElementById('bkStatus');
    if(el) el.innerHTML=`&#9989; <strong>${esc(fname)}</strong> ${esc(where)}<br>`+
      `<span style="font-size:11px;color:var(--tx3)">`+
      `${rawRows.length} shipment rows &middot; ${archive.length} archived &middot; `+
      `${USERS.length} users &middot; ${auditLog.length} audit entries</span>`;
  }
}

function restoreBackup(){
  const inp=document.createElement('input');
  inp.type='file';inp.accept='.zip,.json,.knbak';
  inp.onchange=async(e)=>{
    const f=e.target.files[0];if(!f)return;
    if(f.name.toLowerCase().endsWith('.zip')) await _restoreFromZip(f);
    else{const text=await f.text();await _applyRestoreJSON(text,f.name);}
  };
  inp.click();
}

function restoreFromLocalStorage(){
  const txt=localStorage.getItem('kn_backup_data');
  if(!txt){alert('No auto-backup found in browser storage.');return;}
  _applyRestoreJSON(txt,'browser auto-backup');
}

async function _restoreFromZip(file){
  if(typeof JSZip==='undefined'){alert('JSZip library not loaded. Check your internet connection.');return;}
  let zip;
  try{zip=await JSZip.loadAsync(file);}
  catch(e){alert('Could not open ZIP file.\nMake sure it is a valid KN Track Flow backup.');return;}
  let manifest={};
  try{const mf=zip.file('manifest.json');if(mf)manifest=JSON.parse(await mf.async('string'));}catch(e){}
  const summary=[
    'File: '+file.name,
    'Exported: '+(manifest.exportedAt||'unknown'),
    'By: '+(manifest.exportedBy||'unknown'),
    'App version: '+(manifest.version||'unknown'),
    'Shipments: '+(manifest.counts?.shipments??'?')+' pallet rows',
    'Archive: '+(manifest.counts?.archive??'?')+' orders',
    'Users: '+(manifest.counts?.users??'?'),
    'Audit entries: '+(manifest.counts?.auditEntries??'?'),
  ].join('\n');
  if(!confirm('Restore from ZIP backup?\n\n'+summary+'\n\nThis will replace ALL current data.'))return;
  try{
    const shipFile=zip.file('shipments.csv');
    if(shipFile){const txt=await shipFile.async('string');rawRows=parseCSV(txt);}
    const archFile=zip.file('archive.csv');
    if(archFile){const txt=await archFile.async('string');archive=groupOrders(parseCSV(txt));}
    const usrFile=zip.file('users.json');
    if(usrFile){const parsed=JSON.parse(await usrFile.async('string'));if(Array.isArray(parsed)&&parsed.length)USERS=parsed;}
    const setFile=zip.file('settings.json');
    if(setFile){const parsed=JSON.parse(await setFile.async('string'));
      if(parsed&&typeof parsed==='object'){const logo=S.logoDataUrl;S={...S,...parsed};if(!S.logoDataUrl)S.logoDataUrl=logo;}}
    const audFile=zip.file('audit_log.csv');
    if(audFile){auditLog=_parseAuditCSV(await audFile.async('string'));}
  }catch(e){alert('Error reading ZIP contents:\n'+e.message);return;}
  _finaliseRestore(file.name);
}

async function _applyRestoreJSON(text,source){
  let data;try{data=JSON.parse(text);}catch(e){alert('Could not read backup file.');return;}
  const summary=[
    'Source: '+source,
    'Exported: '+(data.exportedAt||'unknown'),
    'Shipments: '+((data.shipments||[]).length)+' rows',
    'Archive: '+((data.archive||[]).length)+' orders',
    'Users: '+((data.users||[]).length),
    'Audit entries: '+((data.auditLog||[]).length),
  ].join('\n');
  if(!confirm('Restore backup?\n\n'+summary+'\n\nThis will replace ALL current data.'))return;
  if(Array.isArray(data.shipments))rawRows=data.shipments;
  if(Array.isArray(data.archive))archive=data.archive;
  if(Array.isArray(data.users)&&data.users.length)USERS=data.users;
  if(data.settings&&typeof data.settings==='object'){
    const logo=S.logoDataUrl;S={...S,...data.settings};if(!S.logoDataUrl)S.logoDataUrl=logo;}
  if(Array.isArray(data.auditLog))auditLog=data.auditLog;
  _finaliseRestore(source);
}

function _parseAuditCSV(text){
  const lines=text.trim().split('\n').map(l=>l.replace(/\r/g,''));
  if(lines.length<2)return[];
  return lines.slice(1).map(l=>{
    const cols=[];let cur='',q=false;
    for(let i=0;i<l.length;i++){
      const ch=l[i];
      if(ch==='"'){if(q&&l[i+1]==='"'){cur+='"';i++;}else q=!q;}
      else if(ch===','&&!q){cols.push(cur);cur='';}else cur+=ch;
    }
    cols.push(cur);
    return{id:genId(),timestamp:cols[0]||'',userId:cols[1]||'',userName:cols[2]||'',
           action:cols[3]||'',entity:cols[4]||'',entityId:cols[5]||'',
           before:cols[6]||'',after:cols[7]||''};
  }).filter(e=>e.timestamp);
}

function _finaliseRestore(source){
  ensureDefaultAdmin();
  applyBranding();applyFieldLabels();
  initLoginCanvas();
if(S.darkMode){
  document.body.classList.add('dark');
  const btn=document.getElementById('dmToggle');
  if(btn)btn.textContent='☀';
}else document.body.classList.remove('dark');
  saveLS();updateStats();renderTable();updateArchBadge();if(currentUser&&currentUser.role==='admin')renderArchiveAdmin();
  try{if(document.getElementById('auditCount'))renderAudit();}catch(e){}
  logAudit('config','backup','restore',null,{source,shipments:rawRows.length,archive:archive.length,users:USERS.length,auditEntries:auditLog.length});
  const el=document.getElementById('bkStatus');
  if(el)el.innerHTML='&#9989; Restored from <strong>'+esc(source)+'</strong><br>'+
    '<span style="font-size:11px;color:var(--tx3)">'+
    rawRows.length+' shipment rows &middot; '+archive.length+' archived &middot; '+
    USERS.length+' users &middot; '+auditLog.length+' audit entries</span>';
  alert('Restore complete!\n\n'+rawRows.length+' shipment rows\n'+archive.length+' archived orders\n'+USERS.length+' users\n'+auditLog.length+' audit entries');
}


function updateBackupStatus(fname){
  const now2=new Date();const z2=n=>String(n).padStart(2,'0');const ts=z2(now2.getDate())+'/'+z2(now2.getMonth()+1)+'/'+now2.getFullYear()+' '+z2(now2.getHours())+':'+z2(now2.getMinutes());
  const el = document.getElementById('bkStatus');
  if(el&&fname) el.innerHTML=`Last backup: <strong>${esc(fname)}</strong> at ${ts}`;
  else if(el) el.innerHTML=`Last backup: <strong>${ts}</strong>`;
  localStorage.setItem('kn_backup_ts', new Date().toISOString());
}

function pickBackupFolder(){
  if(!window.showDirectoryPicker){alert('Folder selection requires Chrome or Edge.\nBackups will download to your Downloads folder.');return;}
  window.showDirectoryPicker({mode:'readwrite',startIn:'documents'}).then(h=>{
    backupDirHandle=h;
    const el=document.getElementById('backupFolderDisplay');
    if(el){el.textContent='📁 '+h.name;el.style.color='var(--gn)';el.style.fontWeight='600';}
    const cb=document.getElementById('clearFolderBtn');
    if(cb)cb.style.display='inline-flex';
    saveLS();
  }).catch(()=>{});
}

function clearBackupFolder(){
  backupDirHandle=null;
  const el=document.getElementById('backupFolderDisplay');
  if(el){el.textContent='No folder selected — will download to default Downloads folder';el.style.color='var(--tx3)';el.style.fontWeight='400';}
  const cb=document.getElementById('clearFolderBtn');
  if(cb)cb.style.display='none';
}

function clearSelectedData(){
  const sel=document.getElementById('clearDataSelect').value;
  const st=document.getElementById('clearDataSt');
  if(!sel){if(st){st.textContent='Please select what to clear.';st.className='ast err';}return;}

  const labels={
    shipments_pending:'all PENDING shipments',
    shipments_dispatched:'all DISPATCHED shipments',
    shipments_staged:'all STAGED shipments',
    shipments_scheduled:'all SCHEDULED shipments',
    shipments_deleted:'all DELETED (soft-deleted) shipments',
    shipments_all:'ALL active shipments',
    archive:'the entire Archive',
    audit:'the entire Audit Log',
    everything:'EVERYTHING (full data reset)',
  };
  const label=labels[sel]||sel;
  if(!confirm('Permanently delete '+label+'?\n\nThis cannot be undone. Consider taking a backup first.'))return;

  let count=0;
  if(sel==='shipments_all'){count=rawRows.length;rawRows=[];}
  else if(sel==='shipments_pending'){const b=rawRows.length;rawRows=rawRows.filter(r=>r.status!=='pending');count=b-rawRows.length;}
  else if(sel==='shipments_dispatched'){const b=rawRows.length;rawRows=rawRows.filter(r=>r.status!=='dispatched');count=b-rawRows.length;}
  else if(sel==='shipments_staged'){const b=rawRows.length;rawRows=rawRows.filter(r=>r.status!=='staged');count=b-rawRows.length;}
  else if(sel==='shipments_scheduled'){const b=rawRows.length;rawRows=rawRows.filter(r=>r.status!=='scheduled');count=b-rawRows.length;}
  else if(sel==='shipments_deleted'){const b=rawRows.length;rawRows=rawRows.filter(r=>r.status!=='deleted');count=b-rawRows.length;}
  else if(sel==='archive'){count=archive.length;archive=[];}
  else if(sel==='audit'){count=auditLog.length;auditLog=[];}
  else if(sel==='everything'){
    count=rawRows.length+archive.length+auditLog.length;
    rawRows=[];archive=[];auditLog=[];
    Object.keys(localStorage).filter(k=>k.startsWith('kn')).forEach(k=>localStorage.removeItem(k));
  }

  logAudit('delete','data',sel,{label,count},null);
  saveLS();updateStats();renderTable();updateArchBadge();if(currentUser&&currentUser.role==='admin')renderArchiveAdmin();
  document.getElementById('clearDataSelect').value='';
  if(st){st.textContent='✓ Cleared '+count+' records from: '+label;st.className='ast ok';}
  if(S.autoSave)autoWriteBack();
}

function saveBackupSettings(){
  S.backupFilename=document.getElementById('adminBackupName').value.trim()||'kn_backup';
  S.backupInterval=parseInt(document.getElementById('adminBackupInterval').value)||0;
  saveLS(); startBackupTimer();
  const el=document.getElementById('bkSettingsSt');
  if(el){el.textContent='✓ Backup settings saved.';el.className='ast ok';}
}

function startBackupTimer(){
  if(backupTimer) clearInterval(backupTimer);
  const iv = S.backupInterval||0;
  if(iv>0) backupTimer=setInterval(async()=>{if(rawRows.length) await doBackup(false);},iv*1000);
}

/* ═══════ BRANDING ═══════ */
/* KN Brand Theme Presets */
const KN_THEMES = {
  1: {name:'Classic KN', dark:false, accent:'#00306A',
      bg:'#f4f7fc', bg2:'#ffffff', bg3:'#edf2f9', bg4:'#dce6f4',
      tx:'#00306A', tx2:'#3a5a8a', tx3:'#7a96b8',
      loginBg1:'#001430', loginBg2:'#002864'},
  2: {name:'KN Fresh', dark:false, accent:'#002965',
      bg:'#f0f8ff', bg2:'#ffffff', bg3:'#e4f0ff', bg4:'#cce0ff',
      tx:'#002965', tx2:'#2a4a7a', tx3:'#6080a8',
      loginBg1:'#00122a', loginBg2:'#002965'},
  3: {name:'KN Dark', dark:true, accent:'#4a8fd4',
      bg:'#071428', bg2:'#0d1e3a', bg3:'#122040', bg4:'#1a2e52',
      tx:'#d0e4ff', tx2:'#7aa3cc', tx3:'#4a6e99',
      loginBg1:'#020a18', loginBg2:'#071428'},
};
let activeTheme = 1;

function applyThemePreset(n){
  const t = KN_THEMES[n]; if(!t) return;
  activeTheme = n;
  const r = document.documentElement.style;
  r.setProperty('--ac', t.accent);
  r.setProperty('--adim', t.accent+'18');
  r.setProperty('--ah', t.tx2||t.accent);
  r.setProperty('--bg', t.bg);
  r.setProperty('--bg2', t.bg2);
  r.setProperty('--bg3', t.bg3);
  r.setProperty('--bg4', t.bg4);
  r.setProperty('--tx', t.tx);
  r.setProperty('--tx2', t.tx2);
  r.setProperty('--tx3', t.tx3);
  r.setProperty('--bdr', 'rgba(0,0,0,.07)');
  r.setProperty('--bdr2', 'rgba(0,0,0,.12)');

  // Dark mode
  if(t.dark){ document.body.classList.add('dark'); S.darkMode=true; }
  else { document.body.classList.remove('dark'); S.darkMode=false; }

  // Login bg
  S.loginBgColor1 = t.loginBg1;
  S.loginBgColor2 = t.loginBg2;
  S.accent = t.accent;
  S.activeTheme = n;
  applyLoginStyle();
  saveLS();

  // Update theme card selection UI
  [1,2,3].forEach(i=>{
    const card = document.getElementById('theme-card-'+i);
    const check = document.getElementById('theme-check-'+i);
    if(card){
      card.style.borderColor = i===n ? t.accent : 'var(--bdr2)';
      card.style.boxShadow = i===n ? '0 4px 16px rgba(0,48,106,.2)' : 'none';
    }
    if(check) check.style.color = i===n ? t.accent : 'transparent';
  });

  const st=document.getElementById('themeSt');
  if(st){st.textContent='✓ Theme "'+t.name+'" applied.';st.className='ast ok';}
}

function saveBranding(){
  S.appName=document.getElementById('adminAppName').value||'DOCK\u25B6';
  S.appSub=document.getElementById('adminAppSub').value||'WMS Outbound';
  S.accent=document.getElementById('adminAccent').value||'#00306A';
  logAudit('config','branding','update',null,{appName:S.appName});
  applyBranding();saveLS();
}
/* ── LOGIN STYLE FUNCTIONS ── */
function applyLoginStyle(){
  const lp=document.getElementById('loginPage');if(!lp)return;
  const type=S.loginBgType||'particles';
  const bg1=S.loginBgColor1||'#001430';
  const bg2=S.loginBgColor2||'#002864';
  const ll=document.querySelector('.login-left');
  if(ll){
    if(type==='image'&&S.loginBgImage){
      ll.style.background='url('+S.loginBgImage+') center/cover no-repeat';
    }else if(type==='solid'){
      ll.style.background=bg1;
    }else if(type==='gradient'){
      ll.style.background='linear-gradient(170deg,'+bg1+' 0%,'+bg2+' 60%)';
    }else{
      ll.style.background='linear-gradient(170deg,#00306A 0%,#002060 60%,#001840 100%)';
    }
    if(S.loginLeftBg){
      ll.style.background='url('+S.loginLeftBg+') center/cover no-repeat';
    }
  }
  const banner=document.getElementById('loginBanner');
  if(banner){
    if(S.loginBannerText){
      banner.textContent=S.loginBannerText;
      banner.style.background=S.loginBannerColor||'#00306A';
      banner.style.display='block';
    }else{banner.style.display='none';}
  }
  const ft=document.getElementById('loginFooterText');
  if(ft)ft.textContent=(S.appName||'KN Track Flow')+' v1.0';
}
function syncColorHex(pickerId,hexId){
  const hex=document.getElementById(hexId)?.value||'';
  if(/^#[0-9a-fA-F]{6}$/.test(hex)){const p=document.getElementById(pickerId);if(p)p.value=hex;previewLoginBg();}
}
function onLoginBgUpload(e){
  const f=e.target.files[0];if(!f)return;
  const r=new FileReader();r.onload=ev=>{S.loginBgImage=ev.target.result;document.getElementById('loginBgImageUrl').value='(uploaded)';previewLoginBg();};r.readAsDataURL(f);
}
function onLoginLeftBgUpload(e){
  const f=e.target.files[0];if(!f)return;
  const r=new FileReader();r.onload=ev=>{S.loginLeftBg=ev.target.result;document.getElementById('loginLeftBgUrl').value='(uploaded)';applyLoginStyle();};r.readAsDataURL(f);
}
function clearLoginLeftBg(){S.loginLeftBg='';const el=document.getElementById('loginLeftBgUrl');if(el)el.value='';applyLoginStyle();}
function previewLoginBg(){
  const g=id=>document.getElementById(id);
  const type=g('loginBgTypeSelect')?.value||'particles';
  const c2w=g('loginBgColor2Wrap');const imgw=g('loginBgImageWrap');
  if(c2w)c2w.style.display=type==='gradient'?'':'none';
  if(imgw)imgw.style.display=type==='image'?'':'none';
  S.loginBgType=type;
  S.loginBgColor1=g('loginBgColor1')?.value||'#001430';
  S.loginBgColor2=g('loginBgColor2')?.value||'#002864';
  const bgurl=g('loginBgImageUrl')?.value||'';if(bgurl&&bgurl!=='(uploaded)')S.loginBgImage=bgurl;
  S.loginBannerText=g('loginBannerText')?.value||'';
  S.loginBannerColor=g('loginBannerColor')?.value||'#00306A';
  applyLoginStyle();
}
function saveLoginStyle(){
  previewLoginBg();
  const lu=document.getElementById('loginLeftBgUrl')?.value||'';if(lu&&lu!=='(uploaded)')S.loginLeftBg=lu;
  saveLS();const el=document.getElementById('loginStyleSt');if(el){el.textContent='✓ Login style saved.';el.className='ast ok';}
}
function resetLoginStyle(){
  S.loginBgType='particles';S.loginBgColor1='#001430';S.loginBgColor2='#002864';
  S.loginBgImage='';S.loginLeftBg='';S.loginBannerText='';S.loginBannerColor='#00306A';
  initLoginStyleUI();applyLoginStyle();saveLS();
  const el=document.getElementById('loginStyleSt');if(el){el.textContent='✓ Reset to default.';el.className='ast ok';}
}
function initLoginStyleUI(){/* login style panel removed */}


function applyBranding(){
  document.getElementById('sbTitle').textContent=S.appName;
  document.getElementById('sbSub').textContent=S.appSub;
  // loginLogoText shows KN brand identity — do not overwrite with appName
  // loginLogoSub shows product subtitle — preserved
  document.documentElement.style.setProperty('--ac',S.accent);
  document.documentElement.style.setProperty('--ah',S.accent);
  document.documentElement.style.setProperty('--adim',S.accent+'18');
  if(S.logoDataUrl){
    document.getElementById('logoImg').src=S.logoDataUrl;document.getElementById('logoImg').style.display='block';
    const _eli=document.getElementById('loginLogoImg');if(_eli){_eli.src=S.logoDataUrl;_eli.style.display='block';}
    const _elf=document.getElementById('loginLogoFallback');if(_elf)_elf.style.display='none';
    document.getElementById('loginLogoText').style.display='none';
    // Use uploaded logo as favicon
    setFaviconFromImage(S.logoDataUrl);
  }else{
    document.getElementById('logoImg').style.display='none';
    document.getElementById('loginLogoImg').style.display='none';
    document.getElementById('loginLogoText').style.display='block';
    // Generate text-based favicon from accent colour and app initial
    setFaviconFromText(S.appName, S.accent);
  }
  document.title=S.appName;
  applyLoginStyle();
  if(document.getElementById('adminAppName'))document.getElementById('adminAppName').value=S.appName;
  if(document.getElementById('adminAppSub'))document.getElementById('adminAppSub').value=S.appSub;
  if(document.getElementById('adminAccent'))document.getElementById('adminAccent').value=S.accent;
  if(document.getElementById('themeAccent'))document.getElementById('themeAccent').value=S.accent;
}

/* ── FAVICON HELPERS ── */
function setFaviconFromImage(dataUrl){
  // Draw uploaded logo into a 64x64 canvas, output as PNG favicon
  const img=new Image();
  img.onload=function(){
    const cv=document.createElement('canvas');cv.width=64;cv.height=64;
    const ctx=cv.getContext('2d');
    // White rounded background
    ctx.fillStyle='#ffffff';
    roundRect(ctx,0,0,64,64,12);ctx.fill();
    // Scale and center image preserving aspect ratio
    const scale=Math.min(52/img.width,52/img.height);
    const w=img.width*scale,h=img.height*scale;
    ctx.drawImage(img,(64-w)/2,(64-h)/2,w,h);
    applyFaviconDataUrl(cv.toDataURL('image/png'));
  };
  img.src=dataUrl;
}
function setFaviconFromText(appName, accent){
  // Draw a coloured rounded square with the first letter of the app name
  const cv=document.createElement('canvas');cv.width=64;cv.height=64;
  const ctx=cv.getContext('2d');
  // Background: accent colour
  ctx.fillStyle=accent||'#00306A';
  roundRect(ctx,0,0,64,64,14);ctx.fill();
  // Letter: white, bold, centred
  const letter=(appName||'D').replace(/[^A-Za-z0-9]/g,'').charAt(0).toUpperCase()||'D';
  ctx.fillStyle='#ffffff';
  ctx.font='bold 36px "Barlow Condensed","Barlow",system-ui,sans-serif';
  ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(letter,32,34);
  applyFaviconDataUrl(cv.toDataURL('image/png'));
}
function roundRect(ctx,x,y,w,h,r){
  ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);
  ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);
  ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);
  ctx.closePath();
}
function applyFaviconDataUrl(dataUrl){
  let link=document.getElementById('faviconLink');
  if(!link){link=document.createElement('link');link.id='faviconLink';link.rel='icon';link.type='image/png';document.head.appendChild(link);}
  link.href=dataUrl;
}
function resetBranding(){S.appName='DOCK\u25B6';S.appSub='WMS Outbound';S.accent='#00306A';S.logoDataUrl='';applyBranding();saveLS();}
function onLogoUpload(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{S.logoDataUrl=ev.target.result;applyBranding();saveLS();};r.readAsDataURL(f);}
function previewAccent(v){document.documentElement.style.setProperty('--ac',v);document.documentElement.style.setProperty('--adim',v+'18');}
function saveTheme(){S.accent=document.getElementById('adminAccent')?.value||S.accent;applyBranding();saveLS();
}
function resetTheme(){document.documentElement.style.setProperty('--bg','#f4f6f9');document.documentElement.style.setProperty('--bg2','#ffffff');S.accent='#00306A';applyBranding();saveLS();}

/* ═══════ STATUS COLORS ═══════ */
function buildColorUI(){
  const c=document.getElementById('colorCustomContainer');
  c.innerHTML=Object.entries(DEFAULT_STATUS_COLORS).map(([k,def])=>`
    <div style="display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid var(--bdr)">
      <span style="flex:1;text-transform:capitalize;font-size:13px">${k}</span>
      <input type="color" data-status="${k}" value="${S.statusColors[k]||def}" style="width:42px;height:28px;padding:2px;cursor:pointer;border:1px solid var(--bdr2);border-radius:var(--r)"/>
    </div>`).join('');
}
function saveStatusColors(){
  document.querySelectorAll('[data-status]').forEach(inp=>{S.statusColors[inp.dataset.status]=inp.value;});
  logAudit('config','statusColors','update',null,S.statusColors);
  saveLS();renderTable();alert('Status colors applied.');
}
function resetStatusColors(){S.statusColors={};buildColorUI();saveLS();renderTable();}

/* ═══════ FIELD LABELS ═══════ */
function buildRenameUI(){
  const c=document.getElementById('rnContainer');
  c.innerHTML=`<div style="columns:2;gap:16px">${Object.entries(DFL).map(([k,def])=>`
    <div class="lc-row" style="break-inside:avoid">
      <div class="lc-orig">${def}</div>
      <input class="lc-inp rn-inp" data-key="${k}" type="text" value="${esc(S.fieldLabels[k]||def)}" placeholder="${esc(def)}"/>
    </div>`).join('')}</div>`;
}
function saveFieldNames(){
  document.querySelectorAll('.rn-inp').forEach(inp=>{const k=inp.dataset.key,v=inp.value.trim();if(v&&v!==DFL[k])S.fieldLabels[k]=v;else delete S.fieldLabels[k];});
  logAudit('config','fieldLabels','update',null,S.fieldLabels);
  saveLS();applyFieldLabels();alert('Labels applied.');
}
function applyFieldLabels(){document.querySelectorAll('[data-field]').forEach(el=>{const k=el.dataset.field;if(k)el.textContent=getULabel(k);});}
function resetFieldNames(){S.fieldLabels={};saveLS();buildRenameUI();applyFieldLabels();}

/* ═══════ CARRIER MANAGEMENT ═══════ */
function buildCarrierUI(){
  const c=document.getElementById('carrierList');
  c.innerHTML=S.carriers.map((car,ci)=>`
    <div class="carrier-item">
      <div class="carrier-name-row">
        <input class="carrier-name-input" type="text" value="${esc(car.name)}" placeholder="Carrier name" data-ci="${ci}"/>
        <button class="btn xs danger" onclick="removeCarrier(${ci})">&#x2715;</button>
      </div>
      <div style="font-size:10px;font-family:var(--mo);color:var(--tx3);text-transform:uppercase;letter-spacing:.5px;margin-bottom:5px">Service Levels</div>
      <div class="sl-tags" id="slTags-${ci}">${car.sls.map((sl,si)=>`<span class="sl-tag">${esc(sl)}<button onclick="removeSL(${ci},${si})">&#x2715;</button></span>`).join('')}</div>
      <div class="sl-add-row">
        <input class="sl-add-input" type="text" placeholder="Add service level..." id="slInput-${ci}" onkeydown="if(event.key==='Enter')addSL(${ci})"/>
        <button class="btn xs ghost" onclick="addSL(${ci})">+ Add</button>
      </div>
    </div>`).join('');
}
function addCarrierItem(){S.carriers.push({name:'New Carrier',sls:[]});buildCarrierUI();}
function removeCarrier(ci){S.carriers.splice(ci,1);buildCarrierUI();}
function addSL(ci){const inp=document.getElementById('slInput-'+ci);const v=inp.value.trim();if(!v)return;S.carriers[ci].sls.push(v);inp.value='';buildCarrierUI();}
function removeSL(ci,si){S.carriers[ci].sls.splice(si,1);buildCarrierUI();}
function saveCarriers(){
  document.querySelectorAll('.carrier-name-input').forEach((inp,i)=>{if(S.carriers[i])S.carriers[i].name=inp.value.trim()||S.carriers[i].name;});
  logAudit('config','carriers','update',null,{count:S.carriers.length});
  saveLS();document.getElementById('carrierSt').textContent='✓ Carriers saved.';document.getElementById('carrierSt').className='ast ok';
  populateCarrierDropdown();
}

/* ═══════ USER MANAGEMENT ═══════ */
function renderUserTable(){
  const tb=document.getElementById('usersTbody');
  tb.innerHTML=USERS.map((u,i)=>`<tr>
    <td style="font-weight:500">${esc(u.name)}</td>
    <td class="mono">${esc(u.username)}</td>
    <td class="dim">${esc(u.email||'—')}</td>
    <td>${u.role==='admin'?'<span class="badge admin-role">Admin</span>':'<span class="badge operator-role">Operator</span>'}</td>
    <td>${u.active?'<span class="badge dispatched">Active</span>':'<span class="badge archived">Inactive</span>'}</td>
    <td><div class="actions">
      <button class="act" data-tip="Edit" onclick="openEditUser('${u.id}')">&#9998;</button>
      <button class="act" data-tip="Reset Pwd" onclick="resetUserPwd('${u.id}')">&#128272;</button>
      ${u.id!==currentUser?.id?`<button class="act ${u.active?'arch':'disp'}" data-tip="${u.active?'Disable':'Enable'}" onclick="toggleUserActive('${u.id}')">${u.active?'&#9940;':'&#9989;'}</button><button class="act del" data-tip="Delete" onclick="deleteUser('${u.id}')">&#128465;</button>`:'<span style="font-size:10px;color:var(--tx3);font-family:var(--mo)">you</span>'}
    </div></td>
  </tr>`).join('');
}
function openAddUser(){editUserId=null;document.getElementById('userModalTitle').textContent='Add User';['uName','uUsername','uEmail','uPassword'].forEach(id=>document.getElementById(id).value='');document.getElementById('uRole').value='operator';document.getElementById('uEditNote').style.display='none';document.getElementById('userModal').classList.add('show');}
function openEditUser(id){
  editUserId=id;const u=USERS.find(x=>x.id===id);if(!u)return;
  document.getElementById('userModalTitle').textContent='Edit User';
  document.getElementById('uName').value=u.name;document.getElementById('uUsername').value=u.username;
  document.getElementById('uEmail').value=u.email||'';document.getElementById('uRole').value=u.role;
  document.getElementById('uPassword').value='';document.getElementById('uEditNote').style.display='block';
  document.getElementById('userModal').classList.add('show');
}
function closeUserModal(){document.getElementById('userModal').classList.remove('show');editUserId=null;}
function saveUser(){
  const name=document.getElementById('uName').value.trim();
  const username=document.getElementById('uUsername').value.trim();
  const pwd=document.getElementById('uPassword').value;
  const role=document.getElementById('uRole').value;
  const email=document.getElementById('uEmail').value.trim();
  if(!name||!username){alert('Name and Username are required.');return;}
  if(!editUserId&&!pwd){alert('Password is required for new users.');return;}
  if(!editUserId&&pwd.length<6){alert('Password must be at least 6 characters.');return;}
  if(editUserId){
    const u=USERS.find(x=>x.id===editUserId);if(!u)return;
    const before={...u};
    u.name=name;u.username=username;u.email=email;u.role=role;
    if(pwd&&pwd.length>=6)u.password=hashPwd(pwd);
    logAudit('update','user',u.id,before,{name,username,role});
  }else{
    const nu={id:genId(),name,username,email,role,password:hashPwd(pwd),active:true};
    USERS.push(nu);
    logAudit('create','user',nu.id,null,{name,username,role});
  }
  saveLS();closeUserModal();renderUserTable();
}
function toggleUserActive(id){const u=USERS.find(x=>x.id===id);if(!u)return;const before={active:u.active};
u.active=!u.active;logAudit('update','user',id,before,{active:u.active});saveLS();renderUserTable();}
function deleteUser(id){
  if(id===currentUser?.id){alert('You cannot delete your own account.');return;}
  const u=USERS.find(x=>x.id===id);if(!u)return;
  if(!confirm('Permanently delete user "'+u.name+'" (@'+u.username+')?\nThis cannot be undone.'))return;
  USERS=USERS.filter(x=>x.id!==id);
  logAudit('delete','user',id,{name:u.name,username:u.username,role:u.role},null);
  saveLS();renderUserTable();
}
let pwdResetTargetId=null;
function resetUserPwd(id){
  const u=USERS.find(x=>x.id===id);if(!u)return;
  pwdResetTargetId=id;
  document.getElementById('pwdResetUserLabel').textContent='Setting new password for: '+u.name+' (@'+u.username+')';
  document.getElementById('pwdResetNew').value='';
  document.getElementById('pwdResetConfirm').value='';
  const err=document.getElementById('pwdResetErr');if(err)err.style.display='none';
  ['ps1','ps2','ps3','ps4'].forEach(id2=>{const el=document.getElementById(id2);if(el)el.style.background='var(--bg4)';});
  const lbl=document.getElementById('pwdStrengthLabel');if(lbl)lbl.textContent='';
  const ov=document.getElementById('pwdResetOverlay');if(ov){ov.style.display='flex';ov.style.alignItems='center';ov.style.justifyContent='center';}
  setTimeout(()=>document.getElementById('pwdResetNew')?.focus(),100);
}
function closePwdReset(){
  const ov=document.getElementById('pwdResetOverlay');if(ov)ov.style.display='none';
  pwdResetTargetId=null;
}
function confirmPwdReset(){
  const np=document.getElementById('pwdResetNew')?.value||'';
  const cp=document.getElementById('pwdResetConfirm')?.value||'';
  const errEl=document.getElementById('pwdResetErr');
  const showErr=msg=>{if(errEl){errEl.textContent=msg;errEl.style.display='block';}};
  if(errEl)errEl.style.display='none';
  if(np.length<6){showErr('Password must be at least 6 characters.');return;}
  if(np!==cp){showErr('Passwords do not match. Please re-enter the password.');document.getElementById('pwdResetConfirm')?.focus();return;}
  const u=USERS.find(x=>x.id===pwdResetTargetId);if(!u)return;
  u.password=hashPwd(np);
  logAudit('update','user',pwdResetTargetId,null,{action:'password_reset'});
  saveLS();closePwdReset();
  const st=document.getElementById('usrMgmtSt');
  if(st){st.textContent='✓ Password updated for '+u.name;st.className='ast ok';setTimeout(()=>st.textContent='',4000);}
}
function togglePwdVis(inputId,btnId){
  const inp=document.getElementById(inputId);const btn=document.getElementById(btnId);
  if(!inp||!btn)return;
  const show=inp.type==='password';
  inp.type=show?'text':'password';
  btn.innerHTML=show?'&#128584;':'&#128065;';
}
function checkPwdStrength(){
  const pw=document.getElementById('pwdResetNew')?.value||'';
  let score=0;
  if(pw.length>=6)score++;if(pw.length>=10)score++;
  if(/[A-Z]/.test(pw)&&/[a-z]/.test(pw))score++;
  if(/[0-9]/.test(pw)&&/[^A-Za-z0-9]/.test(pw))score++;
  const colors=['#ef4444','#f97316','#eab308','#22c55e'];
  const labels=['Weak','Fair','Good','Strong'];
  ['ps1','ps2','ps3','ps4'].forEach((id2,i)=>{
    const el=document.getElementById(id2);if(el)el.style.background=i<score?colors[Math.max(0,score-1)]:'var(--bg4)';
  });
  const lbl=document.getElementById('pwdStrengthLabel');
  if(lbl)lbl.textContent=pw.length>0?(labels[Math.max(0,score-1)]||'Weak'):'';
}

/* ═══════ SECURITY SETTINGS ═══════ */
function changeAdminPwd(){
  const cur=document.getElementById('pwdCurrent').value;
  const nw=document.getElementById('pwdNew').value;
  const cf=document.getElementById('pwdConfirm').value;
  const el=document.getElementById('pwdChangeSt');
  if(!checkPwd(cur)){el.textContent='Current password is incorrect.';el.className='ast err';return;}
  if(nw.length<6){el.textContent='New password must be at least 6 characters.';el.className='ast err';return;}
  if(nw!==cf){el.textContent='Passwords do not match.';el.className='ast err';return;}
  S.adminPassword=hashPwd(nw);
  logAudit('config','security','password_change',null,null);
  saveLS();el.textContent='✓ Admin password changed successfully.';el.className='ast ok';
  ['pwdCurrent','pwdNew','pwdConfirm'].forEach(id=>document.getElementById(id).value='');
}
function saveSecuritySettings(){
  S.requireAdminForDelete=document.getElementById('deleteRequiresPwd').value==='1';
  S.defaultViewMode=document.getElementById('defaultViewMode').value;
  logAudit('config','security','settings',null,{requireAdminForConsole:S.requireAdminForConsole,requireAdminForDelete:S.requireAdminForDelete});
  saveLS();document.getElementById('securitySt').textContent='✓ Security settings saved.';document.getElementById('securitySt').className='ast ok';
}

/* ═══════ ADMIN TABS & INIT ═══════ */
function setAdminTab(t){
  // Audit and Archive are admin-only tabs
  if((t==='audit'||t==='archive')&&(!currentUser||currentUser.role!=='admin')){
    console.warn('setAdminTab: admin only');return;
  }
  ['general','data','custom','users','security','archive','audit','exports'].forEach(id=>{
    document.getElementById('atab-'+id)?.classList.toggle('active',id===t);
    const p=document.getElementById('apanel-'+id);
    if(p){p.style.display=(id===t?'block':'none');}
  });
  if(t==='archive') renderArchiveAdmin();
  if(t==='audit') renderAudit();
  if(t==='exports'){_loadFtpUI();_loadEmailUI();}
  if(t==='general'){buildCarrierUI();initLoginStyleUI();}
  if(t==='custom'){buildRenameUI();buildColorUI();}
  if(t==='users'){renderUserTable();}
  if(t==='data'){buildCsvGuide();}
  if(t==='security'){
    document.getElementById('deleteRequiresPwd').value=S.requireAdminForDelete?'1':'0';
    document.getElementById('defaultViewMode').value=S.defaultViewMode||'ops';
  }
}
function onSrcTypeChange(){
  const t=document.getElementById('adminSrcType').value;
  document.getElementById('adminFileSection').style.display=t==='file'?'block':'none';
  document.getElementById('adminUrlSection').style.display=t==='url'?'block':'none';
  document.getElementById('adminDemoSection').style.display=t==='demo'?'block':'none';
  if(t==='demo')stopSync();
}
function initAdminUI(){
  // Enforce role-based tab visibility every time Settings opens
  const isAdmin=currentUser&&currentUser.role==='admin';
  document.querySelectorAll('.admin-only-tab').forEach(el=>el.style.display=isAdmin?'':'none');
  // Restore active theme selection indicator
  const at = S.activeTheme||1;
  if(typeof KN_THEMES!=='undefined'&&KN_THEMES[at]){
    const t=KN_THEMES[at];
    [1,2,3].forEach(i=>{
      const card=document.getElementById('theme-card-'+i);
      const check=document.getElementById('theme-check-'+i);
      if(card)card.style.borderColor=i===at?t.accent:'var(--bdr2)';
      if(check)check.style.color=i===at?t.accent:'transparent';
    });
  }
  document.getElementById('adminInterval').value=String(S.refreshInterval);
  document.getElementById('adminWriteBack').value=S.writeBack?'1':'0';
  document.getElementById('adminAutoSave').value=S.autoSave?'1':'0';
  document.getElementById('adminArchDays').value=S.archiveDays;
  document.getElementById('adminAutoArch').value=S.autoArchive?'1':'0';
  document.getElementById('adminBackupName').value=S.backupFilename||'wms_backup.csv';
  document.getElementById('adminBackupInterval').value=String(S.backupInterval||7200);
  updateBackupStatus();
  // Restore folder display if we still have a handle from this session
  if(backupDirHandle) updateFolderDisplay(backupDirHandle.name);
  else updateFolderDisplay(null);
  ['adminWriteBack','adminAutoSave'].forEach(id=>{
    document.getElementById(id)?.addEventListener('change',e=>{
      if(id==='adminWriteBack')S.writeBack=e.target.value==='1';
      if(id==='adminAutoSave')S.autoSave=e.target.value==='1';
      saveLS();
    });
  });
  document.getElementById('adminBackupInterval')?.addEventListener('change',e=>{
    S.backupInterval=parseInt(e.target.value)||0;saveLS();startBackupTimer();updateBackupStatus();
  });
  document.getElementById('adminBackupName')?.addEventListener('change',e=>{S.backupFilename=e.target.value||'wms_backup.csv';saveLS();});
}

/* ═══════ CSV GUIDE ═══════ */
function buildCsvGuide(){
  const tb=document.getElementById('csvGuideBody');if(!tb)return;
  tb.innerHTML=CSV_COLS.map(([col,ex,note])=>`<tr>
    <td style="padding:6px 10px;border-bottom:1px solid var(--bdr);font-family:var(--mo);font-weight:600;color:var(--ac)">${col}</td>
    <td style="padding:6px 10px;border-bottom:1px solid var(--bdr);font-family:var(--mo);color:var(--tx2)">${ex}</td>
    <td style="padding:6px 10px;border-bottom:1px solid var(--bdr);color:var(--tx3)">${note}</td>
  </tr>`).join('');
}
function dlTemplate(){
  const ex=[
    '"ACME-001","Acme Corporation","Germany","ORD-2024-0001","REF-0001","PLT-REF0001-001","Euro Pallet","rack","RACK-A-01-01","DHL","Express","JD014600006251476","2024-06-15","2024-06-10T08:30","","staged","Stack max 2","DDP Incoterms"',
    '"ACME-001","Acme Corporation","Germany","ORD-2024-0001","REF-0001","PLT-REF0001-002","Pallet","lane","LANE-B-01","DHL","Express","JD014600006251476","2024-06-15","2024-06-10T08:30","","staged","","DDP Incoterms"',
  ];
  const blob=new Blob([[CSV_HEADER.join(','),...ex].join('\r\n')],{type:'text/csv'});
  const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='wms_orders_template.csv';a.click();URL.revokeObjectURL(url);
}

/* ═══════ DEMO ═══════ */
function loadDemo(){
  rawRows=DEMO_ROWS.map(d=>({...d}));activeSrc='demo';
  updateStats();renderTable();
  setSt('demo','✓ Demo data loaded: 17 pallet rows across 6 orders.','ok');
  setSyncPill('idle','&#9679; demo');
  logAudit('config','data','load_demo',null,{rows:rawRows.length});
}

/* ═══════ LOCAL STORAGE ═══════ */
function saveLS(){
  try{
    localStorage.setItem('kn_version',APP_VERSION);
    localStorage.setItem('kn_raw',JSON.stringify(rawRows));
    localStorage.setItem('kn_archive',JSON.stringify(archive));
    localStorage.setItem('kn_settings',JSON.stringify(S));
    localStorage.setItem('kn_users',JSON.stringify(USERS));
    localStorage.setItem('kn_audit',JSON.stringify(auditLog.slice(0,1000)));
  }catch(e){
    console.warn('[KN] saveLS failed:',e.message||e);
    // Notify user if storage is full or blocked
    setSyncPill('err','⚠ Save failed');
    const si=document.getElementById('syncInfo');
    if(si)si.textContent='Storage error — changes may not be saved';
  }
}
function loadLS(){
  try{
    const storedVer=localStorage.getItem('kn_version');
    if(storedVer&&storedVer!==APP_VERSION){
      ['kn_users','kn_settings'].forEach(k=>localStorage.removeItem(k));
    }
    localStorage.setItem('kn_version',APP_VERSION);
    const r=localStorage.getItem('kn_raw');
    if(r)try{rawRows=JSON.parse(r);}catch(e){}
    const a=localStorage.getItem('kn_archive');
    if(a)try{archive=JSON.parse(a);}catch(e){}
    const s=localStorage.getItem('kn_settings');
    if(s)try{S={...S,...JSON.parse(s)};}catch(e){}
    const u=localStorage.getItem('kn_users');
    if(u)try{USERS=JSON.parse(u);}catch(e){}
    const al=localStorage.getItem('kn_audit');
    if(al)try{auditLog=JSON.parse(al);}catch(e){}
  }catch(e){}
  ensureDefaultAdmin();
}
/* ── Particle canvas animation ── */
function initLoginCanvas(){
  const canvas=document.getElementById('loginCanvas');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  let W=canvas.width=window.innerWidth;
  let H=canvas.height=window.innerHeight;
  window.addEventListener('resize',()=>{W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;});

  // Create particles
  const N=70;
  const particles=Array.from({length:N},()=>({
    x:Math.random()*W, y:Math.random()*H,
    r:Math.random()*1.8+0.4,
    vx:(Math.random()-.5)*.4, vy:(Math.random()-.5)*.4,
    alpha:Math.random()*.5+.1,
    color:Math.random()<.5?'0,48,106':'0,41,100',
  }));

  // Moving orbs
  const orbs=[
    {x:W*.2,y:H*.3,r:220,color:'0,48,106',alpha:.12,vx:.3,vy:.2},
    {x:W*.8,y:H*.7,r:300,color:'0,38,98',alpha:.10,vx:-.2,vy:.3},
    {x:W*.5,y:H*.1,r:180,color:'0,41,100',alpha:.08,vx:.1,vy:.4},
  ];

  function draw(){
    ctx.clearRect(0,0,W,H);

    // Draw orbs
    orbs.forEach(o=>{
      o.x+=o.vx; o.y+=o.vy;
      if(o.x<-o.r||o.x>W+o.r)o.vx*=-1;
      if(o.y<-o.r||o.y>H+o.r)o.vy*=-1;
      const g=ctx.createRadialGradient(o.x,o.y,0,o.x,o.y,o.r);
      g.addColorStop(0,`rgba(${o.color},${o.alpha})`);
      g.addColorStop(1,`rgba(${o.color},0)`);
      ctx.beginPath();ctx.arc(o.x,o.y,o.r,0,Math.PI*2);
      ctx.fillStyle=g;ctx.fill();
    });

    // Draw particles + connections
    particles.forEach((p,i)=>{
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>W)p.vx*=-1;
      if(p.y<0||p.y>H)p.vy*=-1;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${p.color},${p.alpha})`;ctx.fill();
      // Connect nearby particles
      particles.slice(i+1).forEach(q=>{
        const dx=p.x-q.x,dy=p.y-q.y,dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<120){
          ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);
          ctx.strokeStyle=`rgba(${p.color},${(1-dist/120)*.12})`;
          ctx.lineWidth=.6;ctx.stroke();
        }
      });
    });
    requestAnimationFrame(draw);
  }
  draw();
}

function clearStorageLogin(){
  if(confirm('Clear locally saved data and reload?\nYou will keep your connected database file.\nIf login still fails, please contact your administrator.')){
    Object.keys(localStorage).filter(k=>k.startsWith('kn')||k.startsWith('wms')).forEach(k=>localStorage.removeItem(k));
    location.reload();
  }
}
function ensureDefaultAdmin(){
  if(!USERS.find(u=>u.username==='admin'&&u.role==='admin'&&u.active)){
    const i=USERS.findIndex(u=>u.username==='admin');
    const d={id:'u1',name:'Administrator',username:'admin',email:'admin@company.com',role:'admin',password:btoa('admin123'),active:true};
    if(i>=0)USERS[i]=d; else USERS.unshift(d);
  }
}


/* ═══════ EXPORTS — FTP/SFTP & EMAIL SCHEDULING ═══════ */

// ── FTP/SFTP ──────────────────────────────────────────────────

let S_ftp = {};  // FTP settings stored in S.ftpSettings

function _loadFtpUI(){
  const f = S.ftpSettings||{};
  const g = id => document.getElementById(id);
  if(g('ftpProtocol')) g('ftpProtocol').value = f.protocol||'sftp';
  if(g('ftpHost'))     g('ftpHost').value     = f.host||'';
  if(g('ftpPort'))     g('ftpPort').value     = f.port||'22';
  if(g('ftpUser'))     g('ftpUser').value     = f.user||'';
  if(g('ftpPass'))     g('ftpPass').value     = f.pass||'';
  if(g('ftpPath'))     g('ftpPath').value     = f.path||'/exports/kn/';
  if(g('ftpPassive'))  g('ftpPassive').value  = f.passive||'1';
  if(g('ftpExportData'))   g('ftpExportData').value   = f.exportData||'all';
  if(g('ftpExportFormat')) g('ftpExportFormat').value = f.exportFormat||'csv';
  if(g('ftpFileName'))     g('ftpFileName').value     = f.fileName||'KN_Export_{data}_{date}_{time}';
  if(g('ftpHeaders'))      g('ftpHeaders').value      = f.headers||'1';
  if(g('ftpDateField'))    g('ftpDateField').value    = f.dateField||'all';
}

function saveFtpSettings(){
  const g = id => document.getElementById(id)?.value||'';
  S.ftpSettings = {
    protocol: g('ftpProtocol'),
    host: g('ftpHost').trim(),
    port: parseInt(g('ftpPort'))||22,
    user: g('ftpUser').trim(),
    pass: g('ftpPass'),
    path: g('ftpPath').trim()||'/exports/kn/',
    passive: g('ftpPassive'),
    exportData: g('ftpExportData'),
    exportFormat: g('ftpExportFormat'),
    fileName: g('ftpFileName').trim()||'KN_Export_{data}_{date}_{time}',
    headers: g('ftpHeaders'),
    dateField: g('ftpDateField'),
    dateFrom: g('ftpDateFrom'),
    dateTo: g('ftpDateTo'),
  };
  saveLS();
  const st = document.getElementById('ftpSt');
  if(st){ st.textContent='✓ Connection settings saved.'; st.className='ast ok'; }
  logAudit('config','exports','ftp_settings_saved',null,{host:S.ftpSettings.host,protocol:S.ftpSettings.protocol});
}

function testFtpSettings(){
  const st = document.getElementById('ftpSt');
  const host = document.getElementById('ftpHost')?.value?.trim();
  if(!host){ if(st){st.textContent='Enter a server address first.';st.className='ast err';} return; }
  if(st){ st.textContent='⏳ Testing connection… (browser limitations apply)'; st.className='ast loading'; }
  // Browser cannot open raw TCP/SFTP connections.
  // We attempt a HEAD fetch as a best-effort reachability check.
  const protocol = document.getElementById('ftpProtocol')?.value||'sftp';
  const port = document.getElementById('ftpPort')?.value||22;
  setTimeout(()=>{
    if(st){
      st.innerHTML='&#9432; Direct '+protocol.toUpperCase()+' connections are not supported from a browser. Settings have been saved. Use <strong>Export Now</strong> to download the file, then upload manually, or configure a server-side FTP proxy endpoint.';
      st.className='ast';
      st.style.color='var(--or)';
    }
  }, 800);
}

function _buildFtpFilename(dataType, format){
  const f = S.ftpSettings || {};
  const pattern = f.fileName || 'KN_Export_{data}_{date}_{time}';
  const now = new Date();
  const date = now.toISOString().slice(0,10).replace(/-/g,'');
  const time = now.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit'}).replace(/:/g,'');
  const ext = (format||f.exportFormat||'csv')==='xlsx' ? 'xlsx' : 'csv';
  return pattern.replace('{data}',dataType||'export').replace('{date}',date).replace('{time}',time) + '.' + ext;
}

function _getFtpExportRows(dataType, dateField, dateFrom, dateTo){
  const orders = getOrders();
  const fieldMap = {inbound:'inboundDt',scheduled:'scheduledShipDate',outbound:'outboundDt'};
  const today = todayStr();
  return orders.filter(s=>{
    if(s.status==='archived'||s.status==='deleted') return false;
    if(dataType==='scheduled') return s.status==='scheduled';
    if(dataType==='staged')    return s.status==='staged';
    if(dataType==='dispatched') return s.status==='dispatched';
    if(dataType==='pending')   return s.status==='pending';
    if(dataType==='today_inbound') return s.inboundDt&&s.inboundDt.slice(0,10)===today;
    if(dataType==='today_dispatched') return s.outboundDt&&s.outboundDt.slice(0,10)===today;
    // all — apply date filter if set
    if(dateField&&dateField!=='all'){
      const dk = fieldMap[dateField];
      const d = s[dk]; if(!d) return false;
      const dt = d.slice(0,10);
      if(dateFrom&&dt<dateFrom) return false;
      if(dateTo&&dt>dateTo) return false;
    }
    return true;
  });
}

function exportToFtp(){
  saveFtpSettings();
  const f = S.ftpSettings||{};
  const dataType = f.exportData||'all';
  const format   = f.exportFormat||'csv';
  const rows = _getFtpExportRows(dataType, f.dateField, f.dateFrom, f.dateTo);
  if(!rows.length){ alert('No orders match the selected filter. Nothing to export.'); return; }

  const fname = _buildFtpFilename(dataType, format);
  const flatData = flatRows(rows);

  if(format==='xlsx'){
    if(typeof XLSX==='undefined'){ alert('Excel library not loaded.'); return; }
    const headers = ['Order No.','Shipment No.','Client ID','Customer','Country','Pallets',
                     'Carrier','Service Level','Tracking','Inbound Date','Sched. Ship','Dispatch Date','Status','Shipping Notes'];
    const fd = v => _dd(v)||'';
    const sheetRows = rows.map(s=>[s.orderNo,s.shipmentNo,s.clientId,s.customerName||'',s.destCountry||'',
      s.palletCount,s.carrier||'',s.serviceLevel||'',s.trackingNo||'',
      fd(s.inboundDt),fd(s.scheduledShipDate),fd(s.outboundDt),s.status,s.shippingNotes||'']);
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([headers,...sheetRows]);
    ws['!cols'] = [{wch:18},{wch:16},{wch:14},{wch:22},{wch:14},{wch:8},{wch:14},{wch:13},{wch:18},{wch:14},{wch:14},{wch:14},{wch:12},{wch:30}];
    XLSX.utils.book_append_sheet(wb,'Orders',ws);
    XLSX.writeFile(wb, fname);
  } else {
    dlCSV(flatData, fname);
  }

  const ftpSt = document.getElementById('ftpExpSt');
  const connInfo = f.host ? ` → Upload to: ${f.protocol||'sftp'}://${f.host}:${f.port||22}${f.path||'/'}` : '';
  if(ftpSt){ ftpSt.textContent=`✓ ${rows.length} orders (${flatData.length} pallets) downloaded as ${fname}.${connInfo}`; ftpSt.className='ast ok'; }
  logAudit('create','export','ftp',null,{file:fname,orders:rows.length,pallets:flatData.length});
}

// ── Email Scheduling ──────────────────────────────────────────

let emailRecipients = [];

function _loadEmailUI(){
  const es = S.emailSchedule||{};
  emailRecipients = Array.isArray(es.recipients) ? [...es.recipients] : [];
  _renderRecipients();
  const g = id => document.getElementById(id);
  if(g('emailSubject'))     g('emailSubject').value     = es.subject||'KN Track Flow — {data} Export {date}';
  if(g('emailFormat'))      g('emailFormat').value      = es.format||'xlsx';
  if(g('emailExportData'))  g('emailExportData').value  = es.exportData||'all';
  if(g('emailSchedule'))    g('emailSchedule').value    = es.schedule||'off';
  if(g('emailDayOfWeek'))   g('emailDayOfWeek').value   = es.dayOfWeek||'1';
  if(g('emailDayOfMonth'))  g('emailDayOfMonth').value  = es.dayOfMonth||'1';
  if(g('emailEveryDays'))   g('emailEveryDays').value   = es.everyDays||'7';
  ['Daily','Weekly','Monthly','Custom'].forEach(t=>{
    if(g('emailTime'+t)) g('emailTime'+t).value = es['time'+t]||'08:00';
  });
  onEmailScheduleChange();
  _updateNextSend();
}

function _renderRecipients(){
  const el = document.getElementById('emailRecipientList');
  if(!el) return;
  if(!emailRecipients.length){
    el.innerHTML='<div style="font-size:11px;color:var(--tx3);font-family:var(--mo);padding:4px 0">No recipients added yet</div>';
    return;
  }
  el.innerHTML = emailRecipients.map((e,i)=>`
    <div class="exp-recipient">
      <span>&#9993; ${esc(e)}</span>
      <button onclick="removeEmailRecipient(${i})" title="Remove">&#x2715;</button>
    </div>`).join('');
}

function addEmailRecipient(){
  const inp = document.getElementById('emailRecipientInput');
  const val = inp?.value?.trim();
  if(!val) return;
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)){ alert('Please enter a valid email address.'); return; }
  if(emailRecipients.includes(val)){ inp.value=''; return; }
  emailRecipients.push(val);
  inp.value='';
  _renderRecipients();
}

function removeEmailRecipient(i){
  emailRecipients.splice(i,1);
  _renderRecipients();
}

function onEmailScheduleChange(){
  const val = document.getElementById('emailSchedule')?.value||'off';
  ['Daily','Weekly','Monthly','Custom'].forEach(t=>{
    const el = document.getElementById('emailOpt'+t);
    if(el) el.style.display = val.toLowerCase()===t.toLowerCase() ? 'block' : 'none';
  });
  _updateNextSend();
}

function _updateNextSend(){
  const el = document.getElementById('emailNextSend');
  if(!el) return;
  const sch = document.getElementById('emailSchedule')?.value||'off';
  if(sch==='off'){ el.textContent='— (disabled)'; return; }
  const now = new Date();
  let next = new Date(now);
  const getTime = suffix => {
    const t = document.getElementById('emailTime'+suffix)?.value||'08:00';
    const [h,m] = t.split(':').map(Number);
    return {h,m};
  };
  if(sch==='daily'){
    const {h,m} = getTime('Daily');
    next.setHours(h,m,0,0);
    if(next<=now) next.setDate(next.getDate()+1);
  } else if(sch==='weekly'){
    const dow = parseInt(document.getElementById('emailDayOfWeek')?.value||'1');
    const {h,m} = getTime('Weekly');
    next.setHours(h,m,0,0);
    while(next.getDay()!==dow||next<=now) next.setDate(next.getDate()+1);
  } else if(sch==='monthly'){
    const dom = parseInt(document.getElementById('emailDayOfMonth')?.value||'1');
    const {h,m} = getTime('Monthly');
    next.setDate(dom); next.setHours(h,m,0,0);
    if(next<=now) next.setMonth(next.getMonth()+1);
  } else if(sch==='custom'){
    const days = parseInt(document.getElementById('emailEveryDays')?.value||'7');
    const {h,m} = getTime('Custom');
    next.setHours(h,m,0,0);
    if(next<=now) next.setDate(next.getDate()+days);
  }
  const _nz=n=>String(n).padStart(2,'0');el.textContent = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][next.getDay()]+' '+_nz(next.getDate())+'/'+_nz(next.getMonth()+1)+'/'+next.getFullYear() +
                   ' at ' + next.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
}

function saveEmailSchedule(){
  const g = id => document.getElementById(id)?.value||'';
  S.emailSchedule = {
    recipients: [...emailRecipients],
    subject: g('emailSubject')||'KN Track Flow — {data} Export {date}',
    format: g('emailFormat'),
    exportData: g('emailExportData'),
    schedule: g('emailSchedule'),
    dayOfWeek: g('emailDayOfWeek'),
    dayOfMonth: g('emailDayOfMonth'),
    everyDays: g('emailEveryDays'),
    timeDaily: g('emailTimeDaily'),
    timeWeekly: g('emailTimeWeekly'),
    timeMonthly: g('emailTimeMonthly'),
    timeCustom: g('emailTimeCustom'),
  };
  saveLS();
  _updateNextSend();
  _scheduleEmailTimer();
  const st = document.getElementById('emailSchSt');
  if(st){ st.textContent='✓ Schedule saved.'; st.className='ast ok'; }
  logAudit('config','exports','email_schedule_saved',null,{schedule:S.emailSchedule.schedule,recipients:emailRecipients.length});
}

let _emailTimer = null;
function _scheduleEmailTimer(){
  if(_emailTimer) clearTimeout(_emailTimer);
  const es = S.emailSchedule||{};
  if(!es.schedule||es.schedule==='off') return;
  if(!es.recipients||!es.recipients.length) return;
  // Check every minute if it's time to send
  _emailTimer = setInterval(()=>{
    if(_isEmailDue()) sendEmailNow(true);
  }, 60000);
}

function _isEmailDue(){
  const es = S.emailSchedule||{};
  if(!es.schedule||es.schedule==='off') return false;
  const now = new Date();
  const h = now.getHours(), m = now.getMinutes();
  const getHM = key => { const t=(es[key]||'08:00').split(':').map(Number); return{h:t[0],m:t[1]}; };
  if(es.schedule==='daily'){
    const {h:sh,m:sm}=getHM('timeDaily');
    return h===sh&&m===sm;
  }
  if(es.schedule==='weekly'){
    const dow=parseInt(es.dayOfWeek||'1');
    const {h:sh,m:sm}=getHM('timeWeekly');
    return now.getDay()===dow&&h===sh&&m===sm;
  }
  if(es.schedule==='monthly'){
    const dom=parseInt(es.dayOfMonth||'1');
    const {h:sh,m:sm}=getHM('timeMonthly');
    return now.getDate()===dom&&h===sh&&m===sm;
  }
  return false;
}

function sendEmailNow(auto){
  const es = S.emailSchedule||{};
  const recipients = es.recipients||emailRecipients;
  if(!recipients||!recipients.length){ alert('Add at least one recipient first.'); return; }

  const dataType = es.exportData||'all';
  const format   = es.format||'xlsx';
  const rows = _getFtpExportRows(dataType,'all','','');
  if(!rows.length){ alert('No orders to export.'); return; }

  const now = new Date();
  const dateStr = now.toISOString().slice(0,10).replace(/-/g,'');
  const fname = _buildFtpFilename(dataType, format);

  // Build subject
  const subject = (es.subject||'KN Track Flow — {data} Export {date}')
    .replace('{data}', dataType)
    .replace('{date}', _dd(now))
    .replace('{time}', now.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'}));

  // Download the file first
  if(format==='xlsx'){
    if(typeof XLSX!=='undefined'){
      const headers=['Order No.','Shipment No.','Client ID','Customer','Country','Pallets','Carrier','Service Level','Tracking','Inbound Date','Sched. Ship','Dispatch Date','Status','Shipping Notes'];
      const fd = v => _dd(v)||'';
      const sheetRows=rows.map(s=>[s.orderNo,s.shipmentNo,s.clientId,s.customerName||'',s.destCountry||'',s.palletCount,s.carrier||'',s.serviceLevel||'',s.trackingNo||'',fd(s.inboundDt),fd(s.scheduledShipDate),fd(s.outboundDt),s.status,s.shippingNotes||'']);
      const wb=XLSX.utils.book_new();
      const ws=XLSX.utils.aoa_to_sheet([headers,...sheetRows]);
      XLSX.utils.book_append_sheet(wb,'Orders',ws);
      XLSX.writeFile(wb,fname);
    }
  } else {
    dlCSV(flatRows(rows),fname);
  }

  // Open mailto
  const to=recipients.join(',');
  const body=`KN Track Flow — ${dataType} Export%0A%0AGenerated: ${now.toLocaleString()}%0AOrders: ${rows.length}%0A%0APlease find the export file "${fname}" attached.%0A%0AThis email was ${auto?'automatically':'manually'} triggered by KN Track Flow.`;
  window.location.href=`mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${body}`;

  const st=document.getElementById('emailSchSt');
  if(st){st.textContent=`✓ Email composed for ${recipients.length} recipient${recipients.length!==1?'s':''}. File "${fname}" downloaded — attach it to the email.`;st.className='ast ok';}
  logAudit('create','export','email',null,{recipients:recipients.length,file:fname,orders:rows.length});
}

function previewEmailExport(){
  const dataType = document.getElementById('emailExportData')?.value||'all';
  const rows = _getFtpExportRows(dataType,'all','','');
  const fname = _buildFtpFilename(dataType, document.getElementById('emailFormat')?.value||'xlsx');
  const st = document.getElementById('emailSchSt');
  if(st){
    st.innerHTML=`<strong>Preview:</strong> ${rows.length} orders, file: <code>${fname}</code>`;
    st.className='ast';
    st.style.color='var(--tx2)';
  }
}


/* ═══════ VIEW SWITCHING ═══════ */
function gv(v, skipPwdCheck){
  // Route audit to settings tab (admin only)
  if(v==='audit'){
    if(!currentUser||currentUser.role!=='admin'){alert('Admin access required.');return;}
    gv('admin');setTimeout(()=>setAdminTab('audit'),50);return;
  }
  // If trying to reach admin views while in ops mode, require password switch first
  if(v==='admin'&&currentUser&&currentUser.role!=='admin'){alert('Admin access required.');return;}
  document.querySelectorAll('.view').forEach(el=>el.classList.remove('active'));
  document.querySelectorAll('.ni').forEach(el=>el.classList.remove('active'));
  document.getElementById('view-'+v)?.classList.add('active');
  document.getElementById('nav-'+v)?.classList.add('active');
  const titles={
    tracker:'Outbound <span>Orders</span>',
    picking:'<span>Picking</span> Report',
    staging:'Staging <span>Location</span>',
    activity:'<span>Activity</span>',
    dashboard:'<span>Dashboard</span>',
    insights:'Order <span>Report</span>',
    ontime:'On-Time <span>Report</span>',
    import:'Shipment Data <span>Import</span>',
    admin:'<span>Settings</span>',
  };
  document.getElementById('pageTitle').innerHTML=titles[v]||v;
  if(v==='staging')renderStaging();

  if(v==='dashboard')renderDashboard();
  if(v==='insights'){setInsPeriod(7);}
  if(v==='ontime')renderOnTime();
  if(v==='activity'){renderActivity();}

  if(v==='picking')renderPLSelTable();
  if(v==='admin'){initAdminUI();setAdminTab('general');}
  // audit is now inside settings tab
}

/* ═══════ MODAL CLOSE ON BACKDROP ═══════ */
document.getElementById('shipModal').addEventListener('click',function(e){if(e.target===this)closeShipModal();});
document.getElementById('userModal').addEventListener('click',function(e){if(e.target===this)closeUserModal();});

/* ═══════ CARRIER DROPDOWN LINK ═══════ */
document.getElementById('fCarrier')?.addEventListener('change',function(){
  populateCarrierDropdown();
});

/* ═══════ INIT ═══════ */
loadLS();
if(S.darkMode){
  document.body.classList.add('dark');
  const btn=document.getElementById('dmToggle');
  if(btn)btn.textContent='☀';
}
applyBranding();
applyFieldLabels();
startBackupTimer();
updateBackupStatus();
_scheduleEmailTimer();
if(rawRows.length>0){setSyncPill('idle','&#9679; data loaded');}

// Auto-fill login fields hint if using defaults
document.getElementById('loginUser').placeholder='admin or operator';

</script>
</body>
</html>