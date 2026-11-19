// The four visual directions. Each sets the design tokens css-base.js reads, re-tunes the six block colours,
// renders blocks its own way, and styles its own Home layout.
const aurora = `
.v-aurora{--disp:'Fredoka',sans-serif;--ui:'Outfit',sans-serif;
 --bg:radial-gradient(45% 22% at 30% 12%,rgba(45,226,206,.20) 0%,rgba(45,226,206,0) 100%),radial-gradient(50% 24% at 62% 8%,rgba(139,92,246,.30) 0%,rgba(139,92,246,0) 100%),radial-gradient(110% 55% at 15% 0%,#43208C 0%,rgba(67,32,140,0) 62%),radial-gradient(90% 45% at 100% 28%,#0C5F6E 0%,rgba(12,95,110,0) 60%),radial-gradient(90% 50% at 0% 100%,#5B1E66 0%,rgba(91,30,102,0) 60%),linear-gradient(180deg,#1B1038 0%,#100826 100%);
 --ink:#F5F2FF;--mut:#B9B0E4;--acc:#2DE2CE;--acc-ink:#052A27;--gold:#FFC44D;--line:rgba(255,255,255,.09);--line2:rgba(255,255,255,.28);
 --card-bg:linear-gradient(160deg,rgba(255,255,255,.12),rgba(255,255,255,.04));--card-bd:1px solid rgba(255,255,255,.13);--card-sh:inset 0 1px 0 rgba(255,255,255,.14),0 12px 28px -8px rgba(5,0,20,.55);--card-solid:#2a1b52;
 --r:24px;--r-sm:18px;
 --btn-bg:linear-gradient(180deg,#6BF5E4 0%,#2DE2CE 45%,#14B3A1 100%);--btn-ink:#04211E;--btn-sh:inset 0 1px 0 rgba(255,255,255,.7),inset 0 -3px 0 rgba(0,0,0,.18),0 10px 24px -6px rgba(45,226,206,.65),0 0 0 1px rgba(45,226,206,.6);--btn-r:20px;
 --btn2-bg:rgba(255,255,255,.08);--btn2-sh:inset 0 0 0 1px rgba(255,255,255,.14);--ghost-bd:1px solid rgba(255,255,255,.16);
 --pill-bg:rgba(10,4,30,.45);--pill-bd:1px solid rgba(255,255,255,.12);--plus-bg:#2DE2CE;--plus-ink:#052A27;
 --ib-bg:rgba(255,255,255,.08);--ib-bd:1px solid rgba(255,255,255,.12);
 --track:rgba(255,255,255,.10);--fill:linear-gradient(90deg,#8B5CF6,#2DE2CE);
 --tabs-bg:rgba(255,255,255,.06);--tabs-bd:1px solid rgba(255,255,255,.1);--tab-on-bg:linear-gradient(180deg,rgba(45,226,206,.30),rgba(45,226,206,.12));--tab-on-ink:#BFFBF3;--tab-on-sh:inset 0 0 0 1px rgba(45,226,206,.55);
 --nav-bg:linear-gradient(180deg,rgba(44,26,92,.95),rgba(26,15,58,.97));--nav-bd:1px solid rgba(255,255,255,.12);--nav-sh:0 16px 34px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.12);--nav-r:24px;--nav-on:#2DE2CE;--dot-ring:#24164c;
 --board-bg:linear-gradient(160deg,rgba(255,255,255,.10),rgba(255,255,255,.03));--board-bd:1px solid rgba(255,255,255,.14);--board-sh:inset 0 1px 0 rgba(255,255,255,.16),0 24px 44px -12px rgba(0,0,0,.6),0 0 46px -6px rgba(124,92,255,.45);--board-r:24px;--blk-r:9px;
 --cell:rgba(255,255,255,.05);--cell-sh:inset 0 1px 0 rgba(255,255,255,.05),inset 0 -1px 0 rgba(0,0,0,.25);
 --slot-bg:rgba(255,255,255,.05);--slot-bd:1px solid rgba(255,255,255,.10);
 --life-bg:linear-gradient(160deg,rgba(255,255,255,.11),rgba(255,255,255,.04));--life-bd:1px solid rgba(255,255,255,.12);--lico-bg:rgba(45,226,206,.14);--lico-ink:#7FF3E6;--own-ring:#1d1140;
 --chip-bg:rgba(255,255,255,.09);--evt-bg:linear-gradient(90deg,#FFC44D,#FF8A5C);--evt-ink:#3A1800;
 --hint-bg:rgba(45,226,206,.16);--hint-ink:#9DF7EC;
 --hero-bg:linear-gradient(150deg,rgba(139,92,246,.55),rgba(45,226,206,.20)),#22134a;
 --ri-bg:rgba(45,226,206,.12);--tgl-off:rgba(255,255,255,.16);--tgl-on:linear-gradient(90deg,#14B3A1,#2DE2CE);
 --day-bg:rgba(255,255,255,.05);--day-done-bg:linear-gradient(160deg,#8B5CF6,#5B3FE0);--day-done-ink:#fff;
 --scrim:rgba(8,3,24,.6);--modal-bg:linear-gradient(170deg,#3A2280 0%,#22134D 55%,#1A0F3B 100%);--modal-bd:1px solid rgba(255,255,255,.16);--modal-sh:0 30px 60px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.2);
 --rays:radial-gradient(closest-side,rgba(255,196,77,.55),rgba(255,196,77,0));--ray-c:#FFE08F;
 --pz-bg:rgba(255,255,255,.07);--pz-bd:1px solid rgba(255,255,255,.12);
 --map-bg:radial-gradient(60% 40% at 30% 70%,rgba(54,211,153,.16),transparent 70%),radial-gradient(50% 35% at 80% 30%,rgba(89,194,255,.14),transparent 70%);
 --path:rgba(255,255,255,.22);--path-w:12;--path-dash:2 16;
 --node-bg:linear-gradient(180deg,#A996FF,#6B4BF0);--node-bd:2px solid rgba(255,255,255,.55);--node-sh:0 6px 14px rgba(0,0,0,.4),0 0 18px rgba(124,92,255,.6);
 --node-lock-bg:rgba(255,255,255,.08);--node-cur-bg:linear-gradient(180deg,#7FF3E6,#14B3A1);--node-cur-ink:#04211E;--node-cur-sh:0 0 0 6px rgba(45,226,206,.22),0 0 30px rgba(45,226,206,.7);
 --offer-bg:linear-gradient(120deg,#7C5CFF 0%,#C04BD8 55%,#FF7A8A 100%);
 --free-bg:linear-gradient(90deg,rgba(255,196,77,.20),rgba(255,196,77,.06));--free-bd:1px solid rgba(255,196,77,.4);
 --ring-in:#2c1a5c;--sw-bg:rgba(8,3,24,.45);--fade:#120a2a}
.v-aurora .bgx::after{content:"";position:absolute;left:0;top:0;width:2px;height:2px;border-radius:50%;background:transparent;box-shadow:74px 246px 0 rgba(255,255,255,.7),258px 98px 0 rgba(255,255,255,.6),313px 452px 0 rgba(255,255,255,.5),147px 674px 0 rgba(255,255,255,.5),37px 526px 0 rgba(255,255,255,.55),213px 362px 0 rgba(255,255,255,.4),330px 210px 0 rgba(255,255,255,.45),120px 140px 0 rgba(255,255,255,.35)}

.v-aurora .blk{background:linear-gradient(180deg,var(--hi) 0%,var(--c) 46%,var(--lo) 100%);box-shadow:inset 0 1.5px 0 rgba(255,255,255,.6),inset 0 -3px 0 rgba(0,0,0,.22),0 0 12px -3px var(--c)}
.v-aurora .blk::after{left:16%;right:16%;top:10%;height:26%;border-radius:6px;background:linear-gradient(180deg,rgba(255,255,255,.75),rgba(255,255,255,0))}
.v-aurora .blk.ghost{background:color-mix(in srgb,var(--c) 18%,transparent);box-shadow:inset 0 0 0 2px var(--c),0 0 16px -2px var(--c)}.v-aurora .blk.ghost::after{display:none}
.v-aurora .cell.clr .blk{filter:brightness(1.12)}
.v-aurora .streak{white-space:nowrap;display:flex;align-items:center;gap:5px;height:32px;padding:0 10px 0 8px;border-radius:999px;background:linear-gradient(90deg,rgba(255,140,60,.25),rgba(255,92,138,.18));border:1px solid rgba(255,170,90,.4);font:700 12px/1 var(--ui)}
.v-aurora .streak .ic{width:16px;height:16px;color:#FFB347}.v-aurora .streak b{font:700 15px/1 var(--disp)}.v-aurora .streak span{color:var(--mut);font-size:11px}
.v-aurora .brand{display:flex;flex-direction:column;align-items:center;gap:2px;margin-top:-4px}
.v-aurora .logo{width:52px;height:52px;filter:drop-shadow(0 6px 14px rgba(124,92,255,.6))}
.v-aurora .word{margin:0;font:700 38px/1 var(--disp);letter-spacing:1.5px;display:flex;gap:10px}
.v-aurora .word .w2{background:linear-gradient(90deg,#2DE2CE,#59C2FF);-webkit-background-clip:text;background-clip:text;color:transparent}
.v-aurora .tag{margin:3px 0 0;font:600 10.5px/1 var(--ui);letter-spacing:4px;text-transform:uppercase;color:var(--mut)}
.v-aurora .hero{position:relative;display:grid;place-items:center;height:176px}
.v-aurora .glowring{position:absolute;width:240px;height:240px;border-radius:50%;background:radial-gradient(closest-side,rgba(124,92,255,.5),rgba(124,92,255,0))}
.v-aurora .board.mini{width:168px;--board-pad:8px;--gap:3px;--blk-r:7px;transform:rotate(-5deg)}
.v-aurora .herostat{position:absolute;right:2px;bottom:4px;display:flex;flex-direction:column;align-items:flex-end;padding:8px 12px;border-radius:14px;background:rgba(10,4,30,.62);border:1px solid rgba(255,255,255,.14);font:700 9px/1 var(--ui);letter-spacing:1.5px;color:var(--mut)}
.v-aurora .herostat b{font:700 24px/1.1 var(--disp);color:#FFE08F;letter-spacing:0}
.v-aurora .seg{display:grid;grid-template-columns:repeat(3,1fr);padding:4px;gap:4px;border-radius:16px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.10)}
.v-aurora .sg{position:relative;text-align:center;padding:10px 0;border-radius:12px;font:700 14px/1 var(--ui);color:var(--mut)}
.v-aurora .sg.on{background:linear-gradient(180deg,rgba(139,92,246,.6),rgba(91,63,224,.6));color:#fff;box-shadow:inset 0 1px 0 rgba(255,255,255,.3),0 6px 14px -6px rgba(124,92,255,.9)}
.v-aurora .sg i{position:absolute;top:-7px;right:6px;padding:2px 5px;border-radius:6px;background:#FF8A5C;color:#2a0d00;font:800 9px/1 var(--ui);font-style:normal}
.v-aurora .ctarow{display:flex;gap:10px}.v-aurora .ctarow .btn.big{flex:1}
.v-aurora .btn.square{border-radius:20px;background:rgba(255,255,255,.08);box-shadow:inset 0 0 0 1px rgba(255,255,255,.16)}.v-aurora .btn.square .ic{width:24px;height:24px}
.v-aurora .tiles{display:grid;grid-template-columns:1.3fr 1fr;gap:10px}
.v-aurora .tile{position:relative;padding:12px;border-radius:20px;background:var(--card-bg);border:var(--card-bd);box-shadow:var(--card-sh);display:flex;flex-direction:column;gap:6px;min-height:116px;overflow:hidden}
.v-aurora .tl-h{display:flex;align-items:center;gap:6px;font:700 10px/1 var(--ui);letter-spacing:1.2px;text-transform:uppercase;color:#FFC44D}.v-aurora .tl-h .ic{width:14px;height:14px}
.v-aurora .tl-goal{font:700 18px/1.1 var(--disp)}
.v-aurora .ring{position:absolute;right:10px;top:30px;width:42px;height:42px;border-radius:50%;display:grid;place-items:center;background:radial-gradient(closest-side,#2a1a58 75%,transparent 77% 100%),conic-gradient(#2DE2CE calc(var(--p)*100%),rgba(255,255,255,.12) 0);font:700 10.5px/1 var(--disp)}
.v-aurora .timer{display:flex;align-items:center;gap:4px;color:var(--mut);font-weight:600}.v-aurora .timer .ic{width:12px;height:12px}
.v-aurora .tile.chest{align-items:center;justify-content:center;text-align:center;background:radial-gradient(70% 60% at 50% 35%,rgba(255,196,77,.32),transparent 70%),var(--card-bg);border-color:rgba(255,196,77,.45)}
.v-aurora .chestart{width:72px;height:60px;filter:drop-shadow(0 8px 12px rgba(0,0,0,.45))}
.v-aurora .tile.chest .tl-goal{font-size:15px}
.v-aurora .ready{display:inline-flex;align-items:center;gap:4px;padding:4px 9px;border-radius:999px;background:rgba(45,226,206,.18);color:#9DF7EC;font:800 10.5px/1 var(--ui)}.v-aurora .ready .ic{width:12px;height:12px}
.v-aurora .event{display:flex;align-items:center;gap:8px;padding:0 12px;height:40px;border-radius:14px;background:linear-gradient(90deg,rgba(255,196,77,.22),rgba(255,92,138,.14));border:1px solid rgba(255,196,77,.35);font-size:13px}
.v-aurora .event .ic{width:16px;height:16px;color:#FFC44D}.v-aurora .event span{flex:1}.v-aurora .event em{display:flex;gap:4px;align-items:center;font-style:normal;font-weight:700;color:#FFE08F}.v-aurora .event em .ic{width:13px;height:13px}
.v-aurora .scr-home .nav{margin:auto 0 24px}
.v-aurora .nav .nv.on::before{content:"";position:absolute;top:-8px;width:52px;height:44px;border-radius:14px;background:radial-gradient(closest-side,rgba(45,226,206,.32),rgba(45,226,206,0))}
.v-aurora .pause{border-radius:14px}
.v-aurora .score b{background:linear-gradient(180deg,#FFFFFF,#CFC6FF);-webkit-background-clip:text;background-clip:text;color:transparent}
.v-aurora .mode{background:rgba(139,92,246,.32)}
`;

const royal = `
.v-royal{--disp:'Cinzel',serif;--ui:'Manrope',sans-serif;
 --bg:radial-gradient(100% 50% at 50% 0%,#215E4C 0%,rgba(33,94,76,0) 62%),radial-gradient(90% 45% at 50% 100%,#3B1140 0%,rgba(59,17,64,0) 70%),linear-gradient(180deg,#0E2A22 0%,#091812 100%);
 --ink:#FBF3DC;--mut:#CDBB8C;--acc:#F2CF72;--acc-ink:#2A1A02;--gold:#F2CF72;--line:rgba(233,196,106,.16);--line2:rgba(233,196,106,.5);
 --card-bg:linear-gradient(180deg,rgba(24,60,49,.94),rgba(12,34,27,.95));--card-bd:1.5px solid #B8903E;--card-sh:inset 0 0 0 3px rgba(9,24,19,.9),inset 0 0 0 4px rgba(242,207,114,.28),0 14px 26px -10px rgba(0,0,0,.7);--card-solid:#12352B;
 --r:16px;--r-sm:14px;
 --btn-bg:linear-gradient(180deg,#FFF0B8 0%,#F2CF72 38%,#C99A3A 72%,#9C6F1C 100%);--btn-ink:#2A1A02;--btn-sh:inset 0 1px 0 #FFF8DC,inset 0 -2px 0 rgba(90,55,5,.5),0 4px 0 #6E4C0E,0 12px 22px -8px rgba(242,207,114,.55);--btn-r:14px;--btn-ls:1px;
 --btn2-bg:rgba(242,207,114,.08);--btn2-sh:inset 0 0 0 1.5px rgba(242,207,114,.5);--ghost-bd:1.5px solid rgba(242,207,114,.45);
 --pill-bg:linear-gradient(180deg,rgba(14,40,32,.96),rgba(8,24,19,.96));--pill-bd:1.5px solid #B8903E;--plus-bg:linear-gradient(180deg,#FFE9A3,#C99A3A);--plus-ink:#2A1A02;
 --ib-bg:linear-gradient(180deg,rgba(24,60,49,.96),rgba(10,28,22,.96));--ib-bd:1.5px solid #B8903E;
 --track:rgba(242,207,114,.14);--fill:linear-gradient(90deg,#C99A3A,#FFE9A3);
 --tabs-bg:rgba(9,24,19,.85);--tabs-bd:1.5px solid rgba(184,144,62,.7);--tabs-r:12px;--tab-on-bg:linear-gradient(180deg,#FFE9A3,#C99A3A);--tab-on-ink:#2A1A02;
 --nav-bg:linear-gradient(180deg,#10302A,#081812);--nav-bd:0;--nav-sh:0 -1.5px 0 #B8903E,0 -5px 0 rgba(242,207,114,.10),0 -16px 30px rgba(0,0,0,.45);--nav-r:0;--nav-on:#F2CF72;--dot-ring:#10302A;
 --board-bg:radial-gradient(80% 80% at 50% 40%,#1A4A3C,#0B2019);--board-bd:2px solid #C9A04A;--board-sh:0 0 0 5px #0C211A,0 0 0 6.5px rgba(242,207,114,.55),0 22px 40px -12px rgba(0,0,0,.75);--board-r:12px;--blk-r:6px;
 --cell:rgba(0,0,0,.28);--cell-sh:inset 0 2px 4px rgba(0,0,0,.55),inset 0 0 0 1px rgba(242,207,114,.10);
 --slot-bg:radial-gradient(120% 100% at 50% 0%,#4A1550,#26092B);--slot-bd:1.5px solid rgba(184,144,62,.6);--slot-r:14px;
 --life-bg:linear-gradient(180deg,rgba(24,60,49,.94),rgba(12,34,27,.95));--life-bd:1.5px solid #B8903E;--life-r:14px;--lico-bg:radial-gradient(circle at 35% 30%,#FFF0B8,#D9A93F 55%,#8F6416);--lico-ink:#3A2504;--lico-r:50%;--own-ring:#0E2A22;
 --chip-bg:rgba(242,207,114,.12);--chip-bd:1px solid rgba(242,207,114,.4);--evt-bg:linear-gradient(90deg,#B3123F,#7A0B2B);--evt-ink:#FFE6EC;
 --hint-bg:rgba(242,207,114,.16);--hint-ink:#FFE9A3;
 --hero-bg:radial-gradient(90% 90% at 100% 0%,rgba(242,207,114,.24),transparent 60%),linear-gradient(180deg,rgba(28,74,60,.97),rgba(12,34,27,.97));
 --ri-bg:rgba(242,207,114,.12);--ri-r:50%;--tgl-off:rgba(242,207,114,.18);--tgl-on:linear-gradient(90deg,#C99A3A,#FFE9A3);--knob:#FFF8E6;
 --day-bg:rgba(0,0,0,.22);--day-r:8px;--day-done-bg:radial-gradient(circle at 35% 30%,#FFF0B8,#D9A93F 60%,#9C6F1C);--day-done-ink:#2A1A02;
 --scrim:rgba(3,10,8,.66);--modal-bg:radial-gradient(90% 60% at 50% 0%,rgba(242,207,114,.20),transparent 60%),linear-gradient(180deg,#143D32,#0A1F19);--modal-bd:2px solid #C9A04A;--modal-sh:0 0 0 6px #0A1F19,0 0 0 7.5px rgba(242,207,114,.5),0 30px 60px rgba(0,0,0,.7);--modal-r:20px;
 --rays:radial-gradient(closest-side,rgba(255,224,140,.55),rgba(255,224,140,0));--ray-c:#FFE9A3;
 --pz-bg:rgba(0,0,0,.25);--pz-bd:1.5px solid rgba(184,144,62,.6);--pz-r:14px;
 --map-bg:radial-gradient(50% 30% at 30% 75%,rgba(43,182,115,.20),transparent 70%),radial-gradient(40% 30% at 75% 35%,rgba(242,207,114,.10),transparent 70%);
 --path:rgba(242,207,114,.6);--path-w:4;--path-dash:1 10;
 --node-bg:radial-gradient(circle at 35% 30%,#FFF0B8,#D9A93F 55%,#8F6416);--node-bd:2px solid #FFF0B8;--node-ink:#2A1A02;--node-sh:0 6px 12px rgba(0,0,0,.5);--node-r:50%;
 --node-lock-bg:rgba(9,24,19,.92);--node-cur-bg:radial-gradient(circle at 35% 30%,#FFB3C8,#E8336E 55%,#8F0F3A);--node-cur-ink:#fff;--node-cur-sh:0 0 0 4px #0B2019,0 0 0 6px #F2CF72,0 0 26px rgba(242,207,114,.6);
 --offer-bg:radial-gradient(80% 90% at 85% 20%,rgba(255,224,140,.35),transparent 60%),linear-gradient(120deg,#5A1239 0%,#2D0B2E 55%,#14302A 100%);
 --free-bg:linear-gradient(90deg,rgba(242,207,114,.16),rgba(242,207,114,.05));--free-bd:1.5px solid rgba(242,207,114,.5);--save-bg:#B3123F;
 --ring-in:#123a30;--fade:#0a1a14;--sw-bg:rgba(0,0,0,.3);--miss:#E8336E;--combo:#F2CF72;--combo-fill:linear-gradient(90deg,#C99A3A,#FFE9A3);
 --ttl-font:700 22px/1.1 'Cinzel',serif;--ttl-ls:1.5px;--hdr-ink:#F2CF72;--sec-font:800 11.5px/1 'Manrope',sans-serif;--sec-ink:#D9B969}
.v-royal .c1{--c:#8E5CF7;--hi:#D2BCFF;--lo:#4E24B8}.v-royal .c2{--c:#1FC7A6;--hi:#A6F7E7;--lo:#0B7D68}.v-royal .c3{--c:#E8336E;--hi:#FFB3C8;--lo:#8F0F3A}
.v-royal .c4{--c:#F4B63F;--hi:#FFEBB0;--lo:#A8700F}.v-royal .c5{--c:#3B8CF6;--hi:#B8D8FF;--lo:#1748A6}.v-royal .c6{--c:#2BB673;--hi:#A9F2CB;--lo:#0F6B40}
.v-royal .blk{background:conic-gradient(from 45deg,var(--hi) 0 25%,var(--c) 0 50%,var(--lo) 0 75%,var(--c) 0);box-shadow:inset 0 0 0 1.5px rgba(255,241,184,.85),inset 0 0 0 3px rgba(0,0,0,.15),0 2px 5px rgba(0,0,0,.55)}
.v-royal .blk::after{inset:24%;border-radius:3px;background:linear-gradient(135deg,rgba(255,255,255,.7),rgba(255,255,255,.08) 55%,rgba(255,255,255,0));box-shadow:0 0 0 1px rgba(255,255,255,.22)}
.v-royal .blk.ghost{background:color-mix(in srgb,var(--c) 20%,transparent);box-shadow:inset 0 0 0 2px var(--hi),0 0 14px var(--c)}.v-royal .blk.ghost::after{display:none}
.v-royal{--clr:#F2CF72}.v-royal .cell.clr .blk{filter:brightness(1.12)}

.v-royal .bgx::before,.v-royal .bgx::after{content:"";position:absolute;top:-70px;width:150px;height:150px;border-radius:50%;border:1.5px solid rgba(242,207,114,.30);box-shadow:0 0 0 8px rgba(242,207,114,.05),0 0 0 9.5px rgba(242,207,114,.18)}
.v-royal .bgx::before{left:-80px}.v-royal .bgx::after{right:-80px}
.v-royal .medal.streak{display:flex;align-items:center;gap:4px;height:34px;padding:0 10px 0 8px;border-radius:999px;background:var(--pill-bg);border:1.5px solid #B8903E;font:700 15px/1 var(--disp);color:var(--gold)}.v-royal .medal .ic{width:16px;height:16px;color:#FF9A6B}
.v-royal .crest{display:flex;flex-direction:column;align-items:center;margin-top:-6px}
.v-royal .crown{width:46px;height:37px;filter:drop-shadow(0 4px 10px rgba(242,207,114,.45))}
.v-royal .word{margin:2px 0 0;font:800 32px/1 var(--disp);letter-spacing:2.5px;background:linear-gradient(180deg,#FFF6CF 0%,#F2CF72 50%,#A8741A 100%);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 2px 0 rgba(0,0,0,.55))}
.v-royal .flourish{display:flex;align-items:center;gap:8px;color:var(--gold);margin-top:6px}.v-royal .flourish i{display:block;width:72px;height:1.5px;background:linear-gradient(90deg,transparent,#F2CF72)}.v-royal .flourish i:last-child{transform:scaleX(-1)}.v-royal .flourish .ic{width:16px;height:16px}
.v-royal .tag{margin:4px 0 0;font:700 9.5px/1 var(--ui);letter-spacing:3.5px;text-transform:uppercase;color:var(--mut)}
.v-royal .frame{display:flex;align-items:center;justify-content:center;gap:12px;margin-top:2px}
.v-royal .board.mini{width:192px;--board-pad:7px;--gap:3px;--blk-r:5px}
.v-royal .plaques{display:flex;flex-direction:column;gap:8px}
.v-royal .plq{display:flex;flex-direction:column;align-items:flex-start;gap:5px;padding:8px 12px;min-width:96px;border-radius:10px;background:var(--pill-bg);border:1.5px solid #B8903E;font:800 9.5px/1 var(--ui);letter-spacing:1.5px;text-transform:uppercase;color:var(--mut)}.v-royal .plq b{font:700 15px/1 var(--disp);color:var(--gold);letter-spacing:0;text-transform:none}
.v-royal .medals{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.v-royal .md{position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px 4px;border-radius:14px;color:var(--mut)}
.v-royal .md.on{background:rgba(242,207,114,.08);box-shadow:inset 0 0 0 1.5px rgba(242,207,114,.55);color:var(--ink)}
.v-royal .coinmd{display:grid;place-items:center;width:38px;height:38px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#2a6e5a,#0f2d24);border:1.5px solid #B8903E;color:var(--gold)}.v-royal .coinmd .ic{width:19px;height:19px}
.v-royal .md.on .coinmd{background:radial-gradient(circle at 35% 30%,#FFF0B8,#D9A93F 55%,#8F6416);color:#3A2504;box-shadow:0 0 16px rgba(242,207,114,.55)}
.v-royal .md b{font:700 13px/1 var(--disp);letter-spacing:1px}.v-royal .md small{font-size:10px}
.v-royal .md i{position:absolute;top:3px;right:10px;padding:2px 5px;border-radius:5px;background:#B3123F;color:#FFE6EC;font:800 9px/1 var(--ui);font-style:normal}
.v-royal .btn.gold{text-transform:uppercase;font-size:20px}
.v-royal .otext b{font-size:18px}.v-royal .otext{max-width:200px}
.v-royal .gl{display:grid!important;place-items:center;width:38px;height:38px;border-radius:50%;background:rgba(60,35,0,.12);box-shadow:inset 0 0 0 1.5px rgba(60,35,0,.35)}.v-royal .gl .ic{width:20px;height:20px}
.v-royal .twin{display:grid;grid-template-columns:1.35fr 1fr;gap:10px}
.v-royal .decree,.v-royal .vault{position:relative;padding:12px;border-radius:14px;background:var(--card-bg);border:var(--card-bd);box-shadow:var(--card-sh);display:flex;flex-direction:column;gap:6px}
.v-royal .dh{display:flex;gap:5px;align-items:center;font:800 9.5px/1 var(--ui);letter-spacing:1.5px;text-transform:uppercase;color:var(--gold)}.v-royal .dh .ic{width:13px;height:13px}
.v-royal .decree b{font:700 16px/1.1 var(--disp)}
.v-royal .decree small{display:flex;gap:4px;align-items:center;color:var(--mut)}.v-royal .decree small .ic{width:12px;height:12px}
.v-royal .decree .bar{height:6px}
.v-royal .vault{align-items:center;justify-content:center;text-align:center;gap:5px}
.v-royal .vault b{font:700 13px/1 var(--disp)}
.v-royal .chestart{width:70px;height:58px;filter:drop-shadow(0 8px 12px rgba(0,0,0,.5))}
.v-royal .ready{padding:4px 10px;border-radius:999px;background:linear-gradient(180deg,#FFE9A3,#C99A3A);color:#2A1A02;font:800 10.5px/1 var(--ui)}
.v-royal .ribbon{position:relative;display:flex;align-items:center;justify-content:space-between;height:36px;padding:0 24px;color:#FFE6EC;font:700 12.5px/1 var(--ui);background:linear-gradient(180deg,#C2174A,#7A0B2B);clip-path:polygon(0 0,100% 0,95% 50%,100% 100%,0 100%,5% 50%)}
.v-royal .ribbon span{display:flex;align-items:center;gap:6px}.v-royal .ribbon .ic{width:14px;height:14px;color:#FFD36E}.v-royal .ribbon em{font-style:normal;color:#FFD36E;font-weight:800}
.v-royal .scr-home .nav{margin:auto -16px 0;height:80px;padding-bottom:16px}
.v-royal .nv.on::before{content:"";position:absolute;top:-13px;width:8px;height:8px;background:#F2CF72;transform:rotate(45deg);box-shadow:0 0 8px #F2CF72}
.v-royal .score{position:relative;padding:0 30px}
.v-royal .score b{font-family:'Cinzel',serif;font-weight:800;background:linear-gradient(180deg,#FFF6CF,#F2CF72 55%,#A8741A);-webkit-background-clip:text;background-clip:text;color:transparent}
.v-royal .laurel{position:absolute;inset:0}
.v-royal .laurel::before,.v-royal .laurel::after{content:"";position:absolute;top:4px;width:28px;height:62px;border-radius:50%;border:2.5px solid transparent;border-left-color:rgba(242,207,114,.65)}
.v-royal .laurel::before{left:0}.v-royal .laurel::after{right:0;transform:scaleX(-1)}
.v-royal .pause{border-radius:50%}
`;

const neon = `
.v-neon{--disp:'Orbitron',sans-serif;--ui:'Chakra Petch',sans-serif;
 --bg:radial-gradient(90% 40% at 50% -5%,rgba(255,43,214,.30) 0%,rgba(255,43,214,0) 65%),radial-gradient(80% 40% at 110% 55%,rgba(0,240,255,.16) 0%,rgba(0,240,255,0) 60%),linear-gradient(180deg,#070818 0%,#04050D 100%);
 --ink:#E9FBFF;--mut:#86A2C2;--acc:#00F0FF;--acc-ink:#021418;--gold:#FFE600;--line:rgba(0,240,255,.12);--line2:rgba(0,240,255,.5);
 --card-bg:linear-gradient(180deg,rgba(14,20,44,.93),rgba(8,11,28,.93));--card-bd:1px solid rgba(0,240,255,.35);--card-sh:0 0 16px -4px rgba(0,240,255,.35),inset 0 0 18px -8px rgba(0,240,255,.25);--card-solid:#0b1026;
 --r:6px;--r-sm:6px;
 --btn-bg:linear-gradient(90deg,#FF2BD6 0%,#A259FF 50%,#00F0FF 100%);--btn-ink:#04050D;--btn-sh:0 0 18px -2px rgba(255,43,214,.7),0 0 26px -6px rgba(0,240,255,.7);--btn-r:4px;--btn-ls:1.5px;
 --btn2-bg:rgba(0,240,255,.06);--btn2-sh:inset 0 0 0 1px rgba(0,240,255,.5);--ghost-bd:1px solid rgba(0,240,255,.5);
 --pill-bg:rgba(6,10,26,.92);--pill-bd:1px solid rgba(0,240,255,.4);--pill-sh:0 0 10px -2px rgba(0,240,255,.45);--plus-bg:#00F0FF;--plus-ink:#021418;
 --ib-bg:rgba(6,10,26,.92);--ib-bd:1px solid rgba(0,240,255,.45);--ib-r:8px;--ib-sh:0 0 10px -3px rgba(0,240,255,.6);
 --track:rgba(0,240,255,.12);--fill:linear-gradient(90deg,#FF2BD6,#00F0FF);
 --tabs-bg:rgba(6,10,26,.92);--tabs-bd:1px solid rgba(0,240,255,.3);--tabs-r:4px;--tab-on-bg:rgba(0,240,255,.16);--tab-on-ink:#00F0FF;--tab-on-sh:inset 0 -2px 0 #00F0FF,0 0 12px -2px rgba(0,240,255,.6);
 --nav-bg:linear-gradient(180deg,rgba(8,11,28,.96),rgba(4,5,13,.98));--nav-bd:0;--nav-sh:0 -1px 0 rgba(0,240,255,.55),0 -10px 24px -8px rgba(0,240,255,.35);--nav-r:0;--nav-on:#00F0FF;--dot-ring:#070818;
 --board-bg:rgba(5,8,22,.94);--board-bd:1px solid rgba(0,240,255,.55);--board-sh:0 0 26px -4px rgba(0,240,255,.45),inset 0 0 30px -10px rgba(0,240,255,.3);--board-r:6px;--blk-r:4px;--gap:4px;
 --cell:rgba(0,240,255,.035);--cell-sh:inset 0 0 0 1px rgba(0,240,255,.10);
 --slot-bg:rgba(0,240,255,.04);--slot-bd:1px solid rgba(0,240,255,.25);--slot-r:6px;
 --life-bg:rgba(8,11,28,.92);--life-bd:1px solid rgba(255,43,214,.45);--life-r:6px;--lico-bg:rgba(255,43,214,.12);--lico-ink:#FF7BE6;--lico-r:6px;--own-ring:#070818;--life-sh:0 0 14px -6px rgba(255,43,214,.8);
 --chip-bg:rgba(0,240,255,.10);--chip-bd:1px solid rgba(0,240,255,.4);--evt-bg:#FFE600;--evt-ink:#151200;
 --hint-bg:rgba(182,255,0,.12);--hint-ink:#D6FF6B;
 --hero-bg:linear-gradient(135deg,rgba(255,43,214,.24),rgba(0,240,255,.10)),#0a0e24;
 --ri-bg:rgba(0,240,255,.08);--ri-r:6px;--tgl-off:rgba(134,162,194,.25);--tgl-on:#00F0FF;--knob:#04050D;--tgl-sh:0 0 10px -2px rgba(0,240,255,.6);
 --day-bg:rgba(0,240,255,.04);--day-r:4px;--day-done-bg:rgba(182,255,0,.18);--day-done-ink:#D6FF6B;
 --scrim:rgba(2,3,10,.7);--modal-bg:linear-gradient(180deg,rgba(18,10,40,.98),rgba(6,8,22,.98));--modal-bd:1px solid rgba(255,43,214,.6);--modal-sh:0 0 40px -6px rgba(255,43,214,.6),0 0 0 1px rgba(255,43,214,.2);--modal-r:8px;
 --rays:radial-gradient(closest-side,rgba(255,43,214,.45),rgba(255,43,214,0));--ray-c:#00F0FF;
 --pz-bg:rgba(0,240,255,.05);--pz-bd:1px solid rgba(0,240,255,.35);--pz-r:6px;
 --map-bg:linear-gradient(transparent 0 0);
 --path:rgba(0,240,255,.75);--path-w:2;--path-dash:6 6;
 --node-bg:rgba(8,11,28,.96);--node-bd:2px solid #B6FF00;--node-ink:#D6FF6B;--node-sh:0 0 14px -2px rgba(182,255,0,.7);--node-r:8px;
 --node-lock-bg:rgba(8,11,28,.92);--node-cur-bg:rgba(255,43,214,.2);--node-cur-ink:#fff;--node-cur-sh:0 0 0 2px #FF2BD6,0 0 30px rgba(255,43,214,.8);
 --offer-bg:linear-gradient(120deg,rgba(255,43,214,.38),rgba(162,89,255,.26) 50%,rgba(0,240,255,.26)),#080B1C;
 --free-bg:rgba(255,230,0,.08);--free-bd:1px solid rgba(255,230,0,.5);--save-bg:#FF2BD6;
 --ring-in:#0b1028;--fade:#05060f;--sw-bg:#04050D;--miss:#FF2BD6;--warn:#FF7BE6;--combo:#FFE600;--combo-fill:linear-gradient(90deg,#FFE600,#FF2BD6);
 --ttl-font:800 18px/1.1 'Orbitron',sans-serif;--ttl-ls:2px;--sec-font:700 12px/1 'Chakra Petch',sans-serif;--sec-ink:#00F0FF}
.v-neon .c1{--c:#A259FF}.v-neon .c2{--c:#00F0FF}.v-neon .c3{--c:#FF2BD6}.v-neon .c4{--c:#FFE600}.v-neon .c5{--c:#2D9BFF}.v-neon .c6{--c:#B6FF00}
.v-neon .blk{background:linear-gradient(180deg,color-mix(in srgb,var(--c) 40%,transparent),color-mix(in srgb,var(--c) 14%,transparent));box-shadow:inset 0 0 0 2px var(--c),0 0 9px -1px var(--c),inset 0 0 12px -2px var(--c)}
.v-neon .blk::after{left:4px;right:4px;top:4px;height:2px;border-radius:2px;background:rgba(255,255,255,.75)}
.v-neon .blk.ghost{background:transparent;box-shadow:inset 0 0 0 1.5px var(--c),0 0 12px var(--c);opacity:.85}.v-neon .blk.ghost::after{display:none}
.v-neon{--clr:#B6FF00}
.v-neon .bgx{background:repeating-linear-gradient(0deg,rgba(255,255,255,.028) 0 1px,transparent 1px 3px)}
.v-neon .hdr .ttl{text-transform:uppercase;text-shadow:0 0 12px rgba(0,240,255,.6)}
.v-neon .sec{letter-spacing:2.5px}
.v-neon .grid-floor{position:absolute;left:-40%;right:-40%;bottom:70px;height:250px;background:repeating-linear-gradient(90deg,rgba(255,43,214,.5) 0 1px,transparent 1px 44px),repeating-linear-gradient(0deg,rgba(255,43,214,.5) 0 1px,transparent 1px 34px);transform:perspective(240px) rotateX(60deg);transform-origin:50% 100%;-webkit-mask-image:linear-gradient(transparent,#000 60%);mask-image:linear-gradient(transparent,#000 60%);opacity:.9;z-index:0;pointer-events:none}
.v-neon .scr-home .body>*{position:relative;z-index:1}
.v-neon .scr-home .body>.grid-floor{position:absolute;z-index:0}
.v-neon .hudtag{display:flex;align-items:center;gap:6px;height:32px;padding:0 10px;border:1px solid rgba(255,230,0,.55);border-radius:4px;background:rgba(255,230,0,.06);font:700 10.5px/1 var(--ui);letter-spacing:1.5px;color:#FFE600;box-shadow:0 0 12px -4px rgba(255,230,0,.7)}
.v-neon .hudtag .ic{width:15px;height:15px}.v-neon .hudtag b{font:800 14px/1 var(--disp)}
.v-neon .brand{text-align:center;margin-top:2px}
.v-neon .word{margin:0;font:900 35px/1 var(--disp);letter-spacing:3px;display:flex;justify-content:center;gap:12px}
.v-neon .word span{color:#E8FDFF;text-shadow:0 0 6px #00F0FF,0 0 16px #00F0FF,0 0 34px rgba(0,240,255,.6)}
.v-neon .word .w2{color:#FFE2FA;text-shadow:0 0 6px #FF2BD6,0 0 16px #FF2BD6,0 0 34px rgba(255,43,214,.6)}
.v-neon .tag{margin:9px 0 0;font:600 10.5px/1 var(--ui);letter-spacing:4px;color:var(--mut)}
.v-neon .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.v-neon .st{padding:10px;border:1px solid rgba(0,240,255,.35);border-radius:4px;background:rgba(8,11,28,.88);display:flex;flex-direction:column;gap:7px;box-shadow:inset 0 0 14px -8px rgba(0,240,255,.5)}
.v-neon .st span{font:700 9px/1 var(--ui);letter-spacing:1.5px;color:var(--mut)}.v-neon .st b{font:800 17px/1 var(--disp);color:#fff}
.v-neon .diff{padding:10px 12px;border:1px solid rgba(255,43,214,.45);border-radius:4px;background:rgba(8,11,28,.88);display:grid;grid-template-columns:auto 1fr;gap:9px 14px;align-items:center;box-shadow:0 0 14px -6px rgba(255,43,214,.7)}
.v-neon .dl{display:flex;flex-direction:column;gap:5px}.v-neon .dl span{font:700 9px/1 var(--ui);letter-spacing:1.5px;color:var(--mut)}.v-neon .dl b{font:800 14px/1 var(--disp);color:#FF7BE6}
.v-neon .heat{display:grid;grid-template-columns:repeat(5,1fr);gap:5px}.v-neon .k{height:12px;border-radius:2px;background:rgba(255,43,214,.14);transform:skewX(-20deg)}.v-neon .k.on{background:linear-gradient(90deg,#FF2BD6,#FF7BE6);box-shadow:0 0 8px #FF2BD6}
.v-neon .dm{grid-column:1/-1;display:flex;justify-content:space-between;font:700 10px/1 var(--ui);letter-spacing:1.2px;color:var(--mut)}.v-neon .dm .on{color:#FF7BE6}
.v-neon .ctas{display:flex;gap:10px;filter:drop-shadow(0 0 10px rgba(255,43,214,.55)) drop-shadow(0 0 16px rgba(0,240,255,.3))}
.v-neon .ctas .btn.big{flex:1;clip-path:polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px);box-shadow:none;font-weight:900;letter-spacing:2px;font-size:16px}
.v-neon .ctas .btn.big small{font:700 10px/1 var(--ui);letter-spacing:1.5px}
.v-neon .ctas .btn.ghost{height:64px;flex-direction:column;gap:5px;width:72px;padding:0;font:800 10.5px/1 var(--disp);letter-spacing:1.5px;color:#00F0FF;clip-path:polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px);background:rgba(0,240,255,.1);border:0;box-shadow:inset 0 0 0 1px rgba(0,240,255,.6)}
.v-neon .missions{border:1px solid rgba(0,240,255,.3);border-radius:4px;background:rgba(8,11,28,.9)}
.v-neon .mh{display:flex;justify-content:space-between;padding:9px 12px;border-bottom:1px solid rgba(0,240,255,.15);font:700 10px/1 var(--ui);letter-spacing:2px;color:#00F0FF}.v-neon .mh em{font-style:normal;color:var(--mut)}
.v-neon .ms{display:grid;grid-template-columns:30px 1fr auto;gap:10px;align-items:center;padding:8px 12px}.v-neon .ms+.ms{border-top:1px dashed rgba(0,240,255,.14)}
.v-neon .mi{display:grid;place-items:center;width:30px;height:30px;border-radius:4px;background:rgba(0,240,255,.08);color:#00F0FF}.v-neon .mi .ic{width:16px;height:16px}
.v-neon .mtx{display:flex;flex-direction:column;gap:4px}.v-neon .mtx b{font:700 11.5px/1.1 var(--ui);letter-spacing:.6px}.v-neon .mtx small{font:600 9.5px/1 var(--ui);letter-spacing:.6px;color:var(--mut)}
.v-neon .mp{font:800 11.5px/1 var(--disp);color:#B6FF00}.v-neon .mp.go{padding:6px 9px;background:#FFE600;color:#151200;border-radius:3px;box-shadow:0 0 12px rgba(255,230,0,.6)}
.v-neon .ms.hot .mi{background:rgba(255,230,0,.12);color:#FFE600}
.v-neon .ticker{display:flex;align-items:center;gap:8px;height:34px;padding:0 12px;background:repeating-linear-gradient(-45deg,rgba(255,230,0,.10) 0 8px,rgba(255,230,0,.02) 8px 16px);border:1px solid rgba(255,230,0,.5);border-radius:3px;font:700 10.5px/1 var(--ui);letter-spacing:1.5px;color:#FFE600}
.v-neon .ticker .ic{width:14px;height:14px}.v-neon .ticker span{flex:1}.v-neon .ticker em{font:800 12px/1 var(--disp);font-style:normal}
.v-neon .scr-home .nav{margin:auto -16px 0;height:78px;padding-bottom:14px}
.v-neon .nv{font:700 10px/1 var(--ui);letter-spacing:1.2px;text-transform:uppercase}
.v-neon .nv.on::after{content:"";position:absolute;bottom:-8px;width:26px;height:2px;background:#00F0FF;box-shadow:0 0 8px #00F0FF}
.v-neon .score b{font:800 32px/1 var(--disp);letter-spacing:3px;color:#fff;text-shadow:0 0 10px rgba(0,240,255,.85)}
.v-neon .bst{letter-spacing:1.5px;font-size:10.5px}
.v-neon .pill b,.v-neon .rw,.v-neon .tp,.v-neon .gp b,.v-neon .lcost,.v-neon .pz b{font-family:'Chakra Petch',sans-serif;font-weight:700}
.v-neon .dfoot .btn{letter-spacing:.6px;font-size:12px;padding:0 12px}
.v-neon .lname,.v-neon .mood b,.v-neon .theme b{letter-spacing:.8px;text-transform:uppercase;font-size:12px}
.v-neon .btn{text-transform:uppercase}
.v-neon .rn,.v-neon .lvn,.v-neon .dhero h3,.v-neon .modal h3,.v-neon .otext b,.v-neon .tst b{text-transform:uppercase;letter-spacing:1px}
.v-neon .dhero h3{font-size:21px}.v-neon .modal h3{font-size:21px}.v-neon .otext b{font-size:17px}.v-neon .rn{font-size:15px}
`;

const clay = `
.v-clay{--disp:'Baloo 2',sans-serif;--ui:'Nunito',sans-serif;
 --bg:radial-gradient(80% 40% at 0% 0%,#FFD6EA 0%,rgba(255,214,234,0) 70%),radial-gradient(80% 42% at 100% 18%,#D4F1FF 0%,rgba(212,241,255,0) 70%),radial-gradient(90% 45% at 50% 100%,#FFE6C7 0%,rgba(255,230,199,0) 72%),linear-gradient(180deg,#F5EEFF 0%,#FFF7EF 100%);
 --ink:#2C2254;--mut:#7B71A6;--acc:#14B8A6;--acc-ink:#fff;--gold:#F5A524;--line:rgba(44,34,84,.08);--line2:rgba(44,34,84,.22);
 --card-bg:linear-gradient(180deg,#FFFFFF,#FAF7FF);--card-bd:0;--card-sh:0 10px 22px -8px rgba(90,70,170,.30),inset 0 -3px 0 rgba(124,92,255,.08),inset 0 2px 0 #fff;--card-solid:#fff;
 --r:26px;--r-sm:22px;
 --btn-bg:linear-gradient(180deg,#5EEAD4 0%,#14B8A6 100%);--btn-ink:#fff;--btn-sh:0 6px 0 #0E8F81,0 14px 22px -8px rgba(20,184,166,.6),inset 0 2px 0 rgba(255,255,255,.55);--btn-r:22px;
 --btn2-bg:#fff;--btn2-sh:0 5px 0 #E0D8F7,0 10px 18px -8px rgba(90,70,170,.35);--ghost-bd:2px solid #E3DCF7;--ghost-bg:#fff;
 --pill-bg:#fff;--pill-bd:0;--pill-sh:0 4px 0 #E6DFFA,0 8px 14px -8px rgba(90,70,170,.4);--plus-bg:linear-gradient(180deg,#5EEAD4,#14B8A6);--plus-ink:#fff;
 --ib-bg:#fff;--ib-bd:0;--ib-r:14px;--ib-sh:0 4px 0 #E6DFFA,0 8px 14px -8px rgba(90,70,170,.45);
 --track:#ECE6FB;--fill:linear-gradient(90deg,#8C6BFF,#FF6B9A);
 --tabs-bg:#ECE6FB;--tab-on-bg:#fff;--tab-on-ink:#2C2254;--tab-on-sh:0 3px 0 #DCD3F5,0 6px 12px -6px rgba(90,70,170,.4);
 --nav-bg:#fff;--nav-bd:0;--nav-sh:0 -6px 24px -10px rgba(90,70,170,.35);--nav-r:30px 30px 0 0;--nav-on:#7C5CFF;--dot-ring:#fff;
 --board-bg:#FFFFFF;--board-bd:0;--board-sh:0 16px 30px -12px rgba(90,70,170,.4),inset 0 -5px 0 rgba(124,92,255,.08);--board-r:28px;--blk-r:10px;--board-pad:11px;
 --cell:#EEE8FB;--cell-sh:inset 0 3px 5px rgba(90,70,170,.18),inset 0 -1px 0 rgba(255,255,255,.9);
 --slot-bg:#fff;--slot-bd:0;--slot-sh:0 8px 18px -10px rgba(90,70,170,.45),inset 0 -3px 0 rgba(124,92,255,.07);--slot-r:22px;
 --life-bg:#fff;--life-bd:0;--life-sh:0 5px 0 #E6DFFA,0 10px 18px -10px rgba(90,70,170,.4);--life-r:22px;--lico-bg:#F1EDFF;--lico-ink:#7C5CFF;--lico-r:50%;--own-ring:#fff;
 --chip-bg:#F1EDFF;--evt-bg:linear-gradient(90deg,#FFC94D,#FF8A5C);--evt-ink:#4A1D00;
 --hint-bg:#DDF8F3;--hint-ink:#0E8F81;
 --hero-bg:linear-gradient(140deg,#8C6BFF 0%,#B26BFF 50%,#FF8FB1 100%);--hero-ink:#fff;
 --ri-bg:#F1EDFF;--ri-r:12px;--tgl-off:#E3DCF7;--tgl-on:linear-gradient(90deg,#2DD4BF,#14B8A6);
 --day-bg:#F4F0FF;--day-r:12px;--day-done-bg:linear-gradient(180deg,#A78BFA,#7C5CFF);--day-done-ink:#fff;
 --scrim:rgba(60,40,120,.32);--modal-bg:linear-gradient(180deg,#FFFFFF,#FBF7FF);--modal-bd:0;--modal-sh:0 30px 60px -20px rgba(60,40,120,.55),inset 0 -6px 0 rgba(124,92,255,.08);--modal-r:34px;
 --rays:radial-gradient(closest-side,rgba(255,201,77,.6),rgba(255,201,77,0));--ray-c:#FFC94D;
 --pz-bg:#F7F3FF;--pz-bd:0;--pz-r:20px;
 --map-bg:radial-gradient(60% 30% at 25% 72%,#D7F5E8 0%,transparent 70%),radial-gradient(50% 30% at 80% 32%,#DDEFFF 0%,transparent 70%);
 --path:#FFFFFF;--path-w:18;
 --node-bg:linear-gradient(180deg,#A78BFA,#7C5CFF);--node-bd:3px solid #fff;--node-sh:0 5px 0 #5B3FD0,0 10px 16px -6px rgba(90,70,170,.5);--node-ink:#fff;
 --node-lock-bg:#E9E3FA;--node-cur-bg:linear-gradient(180deg,#FFD36E,#F5A524);--node-cur-ink:#5A2E00;--node-cur-sh:0 6px 0 #C47D0E,0 0 0 8px rgba(245,165,36,.22),0 16px 24px -8px rgba(245,165,36,.6);
 --offer-bg:linear-gradient(130deg,#FF8FB1 0%,#B26BFF 55%,#7C5CFF 100%);--offer-ink:#fff;
 --free-bg:linear-gradient(90deg,#FFF4D6,#FFFFFF);--free-bd:0;--save-bg:#FF4F7B;
 --ring-in:#9F74FF;--fade:#FFF7EF;--dtimer-bg:rgba(255,255,255,.24);--sw-bg:#F4F0FF;--miss:#FF6B9A;--warn:#E0457B;--combo:#F5A524;
 --ttl-font:800 26px/1.1 'Baloo 2',sans-serif;--sec-ink:#8E83BD;--status:#2C2254}
.v-clay .c1{--c:#8C6BFF;--hi:#C9B8FF;--lo:#6A45F0}.v-clay .c2{--c:#2FD6C3;--hi:#9AF5EA;--lo:#11AE9B}.v-clay .c3{--c:#FF6B9A;--hi:#FFB3CB;--lo:#E8467C}
.v-clay .c4{--c:#FFC94D;--hi:#FFE7A3;--lo:#F0A11A}.v-clay .c5{--c:#5CB8FF;--hi:#B1DEFF;--lo:#2F8FEA}.v-clay .c6{--c:#4CD68F;--hi:#A6F0C9;--lo:#20B26B}
.v-clay .blk{background:radial-gradient(120% 120% at 28% 18%,var(--hi) 0%,var(--c) 52%,var(--lo) 100%);box-shadow:inset 0 -4px 0 rgba(0,0,0,.13),inset 0 3px 0 rgba(255,255,255,.4),0 3px 6px -1px rgba(60,40,120,.3)}
.v-clay .blk::after{left:18%;top:13%;width:28%;height:20%;border-radius:50%;background:rgba(255,255,255,.75);transform:rotate(-18deg)}
.v-clay .blk.ghost{background:color-mix(in srgb,var(--c) 22%,#fff);box-shadow:inset 0 0 0 2.5px var(--c)}.v-clay .blk.ghost::after{display:none}
.v-clay{--clr:#F5A524}
.v-clay .clouds{position:absolute;inset:0;pointer-events:none;z-index:0}
.v-clay .clouds i{position:absolute;background:#fff;border-radius:999px;opacity:.9;box-shadow:0 8px 18px -10px rgba(90,70,170,.25)}
.v-clay .clouds i:nth-child(1){width:120px;height:38px;left:-34px;top:92px}.v-clay .clouds i:nth-child(2){width:96px;height:30px;right:-26px;top:150px}.v-clay .clouds i:nth-child(3){width:70px;height:24px;left:232px;top:66px;opacity:.7}
.v-clay .scr-home .body>*{position:relative;z-index:1}
.v-clay .scr-home .body>.clouds,.v-clay .scr-home .body>.floaters{position:absolute;z-index:0}
.v-clay .brand{display:flex;flex-direction:column;align-items:center;gap:2px;margin-top:2px}
.v-clay .logo{width:82px;height:82px;filter:drop-shadow(0 10px 14px rgba(124,92,255,.35))}
.v-clay .word{margin:0;font:800 42px/.95 var(--disp);color:#2C2254;letter-spacing:-.5px;text-shadow:0 3px 0 #fff,0 6px 0 #E3DCF7}
.v-clay .chips{display:flex;gap:8px;margin-top:8px}
.v-clay .cp{display:inline-flex;align-items:center;gap:5px;height:30px;padding:0 12px;border-radius:999px;background:#fff;box-shadow:0 4px 0 #E6DFFA,0 8px 14px -8px rgba(90,70,170,.4);font:800 12.5px/1 var(--ui)}
.v-clay .cp .ic{width:15px;height:15px;color:#F5A524}.v-clay .cp.fire .ic{color:#FF6B5A}
.v-clay .floaters{inset:0;pointer-events:none}
.v-clay .floaters .blk{position:absolute;inset:auto;width:30px;height:30px;border-radius:9px}
.v-clay .floaters .f1{left:18px;top:150px;transform:rotate(-14deg)}.v-clay .floaters .f2{right:22px;top:104px;transform:rotate(12deg);width:24px;height:24px}.v-clay .floaters .f3{right:36px;top:198px;transform:rotate(-8deg)}
.v-clay .floaters .f4{left:44px;top:64px;transform:rotate(16deg);width:22px;height:22px}.v-clay .floaters .f5{left:290px;top:22px;transform:rotate(20deg);width:18px;height:18px}
.v-clay .seg{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;padding:5px;border-radius:22px;background:#ECE6FB;box-shadow:inset 0 3px 6px rgba(90,70,170,.15)}
.v-clay .sg{position:relative;text-align:center;padding:11px 0;border-radius:17px;font:800 14px/1 var(--ui);color:var(--mut)}
.v-clay .sg.on{background:#fff;color:#2C2254;box-shadow:0 4px 0 #DCD3F5,0 8px 14px -8px rgba(90,70,170,.45)}
.v-clay .sg i{position:absolute;top:-8px;right:4px;padding:3px 6px;border-radius:8px;background:#FF8A5C;color:#fff;font:800 9px/1 var(--ui);font-style:normal;box-shadow:0 2px 0 #D9603A}
.v-clay .scr-home .btn.big{height:70px;font-size:25px;border-radius:24px;margin-top:4px}
.v-clay .newgame{align-self:center;display:inline-flex;gap:6px;align-items:center;font:800 13px/1 var(--ui);color:var(--mut);margin-top:0}.v-clay .newgame .ic{width:15px;height:15px}
.v-clay .tiles{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.v-clay .tile{position:relative;padding:14px 14px 12px;border-radius:24px;background:var(--card-bg);box-shadow:var(--card-sh);display:flex;flex-direction:column;gap:5px;overflow:hidden;min-height:128px}
.v-clay .tile::before{content:"";position:absolute;left:0;right:0;top:0;height:6px;background:linear-gradient(90deg,#8C6BFF,#FF6B9A)}
.v-clay .tile.chest::before{background:linear-gradient(90deg,#FFC94D,#FF8A5C)}
.v-clay .tic{display:grid;place-items:center;width:34px;height:34px;border-radius:12px;background:#F1EDFF;color:#7C5CFF}.v-clay .tic .ic{width:18px;height:18px}
.v-clay .tile b{font:800 15px/1.1 var(--disp)}.v-clay .tile small{color:var(--mut);font-weight:700}
.v-clay .tile .bar{height:7px}
.v-clay .tile.chest{align-items:center;text-align:center;justify-content:center}
.v-clay .chestart{width:76px;height:64px;filter:drop-shadow(0 8px 10px rgba(110,53,20,.35))}
.v-clay .ready{padding:4px 10px;border-radius:999px;background:#DDF8F3;color:#0E8F81;font:800 11.5px/1 var(--ui)}
.v-clay .event{display:flex;align-items:center;gap:8px;height:40px;padding:0 14px;border-radius:999px;background:linear-gradient(90deg,#FFE9A8,#FFD0B8);box-shadow:0 4px 0 #F5C98E;font:700 13px/1 var(--ui);color:#5A2E00}
.v-clay .event .ic{width:16px;height:16px;color:#E8890C}.v-clay .event span{flex:1}.v-clay .event em{font-style:normal;font-weight:900}
.v-clay .scr-home .nav{margin:auto -16px 0;height:84px;padding-bottom:18px}
.v-clay .nv{z-index:0}
.v-clay .nv.on{color:#fff}
.v-clay .nv.on::before{content:"";position:absolute;top:-11px;width:58px;height:54px;border-radius:18px;background:linear-gradient(180deg,#A78BFA,#7C5CFF);box-shadow:0 5px 0 #5B3FD0,0 10px 16px -6px rgba(90,70,170,.5);z-index:-1}
.v-clay .score b{font:800 52px/1 var(--disp);color:#2C2254;text-shadow:0 4px 0 #fff,0 7px 0 #E3DCF7}
.v-clay .pause{border-radius:14px}
.v-clay .mode{background:#fff;box-shadow:0 3px 0 #E6DFFA}
.v-clay .hdr .ttl{color:#2C2254}
.v-clay .slot.used .sock{border-color:#D8CFF3}
`;

module.exports = { aurora, royal, neon, clay };
