// Structural CSS shared by the four directions. Every colour, radius, shadow and font comes from variables that
// css-variants.js sets per direction, so the layout (the UX fixes) is identical and only the look changes.
module.exports = `
.phone,.phone *,.phone *::before,.phone *::after{box-sizing:border-box}
.phone{width:390px;height:844px;border-radius:58px;padding:11px;position:relative;flex:none;
  background:linear-gradient(150deg,#4a4a58 0%,#16161d 22%,#08080c 60%,#2a2a34 100%);
  box-shadow:inset 0 0 0 1.5px #5c5c6c,inset 0 0 0 3px #0b0b10,0 50px 80px -30px rgba(0,0,0,.75),0 20px 40px -12px rgba(0,0,0,.5)}
.phone::before{content:"";position:absolute;right:-3px;top:170px;width:3px;height:78px;border-radius:0 3px 3px 0;background:#2b2b35}
.phone::after{content:"";position:absolute;left:-3px;top:150px;width:3px;height:46px;border-radius:3px 0 0 3px;background:#2b2b35;box-shadow:0 70px 0 #2b2b35}
.screen{position:relative;width:368px;height:822px;border-radius:47px;overflow:hidden;display:flex;flex-direction:column;
  font-family:var(--ui);color:var(--ink);background:var(--bg);-webkit-font-smoothing:antialiased}
.bgx{position:absolute;inset:0;z-index:0;pointer-events:none}
.status{position:relative;z-index:3;height:46px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:4px 30px 0 34px;font:600 15px/1 var(--ui);color:var(--status,var(--ink))}
.status .cam{position:absolute;left:50%;top:13px;width:19px;height:19px;margin-left:-9.5px;border-radius:50%;background:#030305;box-shadow:inset 0 0 0 4px #0c0c14,0 0 0 1.5px rgba(255,255,255,.07)}
.status .sys{display:flex;gap:6px;align-items:center}.status .sys svg{height:11px;width:auto}
.body{position:relative;z-index:1;flex:1;display:flex;flex-direction:column;padding:2px 16px 0;gap:11px;min-height:0}
.gesture{position:absolute;bottom:8px;left:50%;width:134px;height:5px;margin-left:-67px;border-radius:3px;background:var(--ink);opacity:.42;z-index:9}
.ic{width:20px;height:20px;flex:none}.art{width:22px;height:22px;flex:none}
b,strong{font-weight:700}small{font-size:12px}
.sp{flex:1}
.body>*:not(.scroll):not(.mapwrap){flex-shrink:0}

/* ---- blocks: the six colours (each direction may retune them) ---- */
.c1{--c:#7C5CFF;--hi:#AE9BFF;--lo:#5638D9}.c2{--c:#2BD9C6;--hi:#86F4E7;--lo:#0FA595}.c3{--c:#FF5C8A;--hi:#FFA0BC;--lo:#DE2F66}
.c4{--c:#FFC44D;--hi:#FFE195;--lo:#EE9612}.c5{--c:#59C2FF;--hi:#A3DFFF;--lo:#2A90E6}.c6{--c:#36D399;--hi:#86EDC4;--lo:#13A571}
.blk{position:absolute;inset:0;display:block}
.blk::after{content:"";position:absolute}

/* ---- top rows, pills, buttons ---- */
.top{display:flex;align-items:center;gap:7px;min-height:38px}
.curs{display:flex;gap:6px;align-items:center}
.pill{display:inline-flex;align-items:center;gap:5px;height:32px;padding:0 5px 0 5px;border-radius:999px;background:var(--pill-bg);border:var(--pill-bd);color:var(--pill-ink,var(--ink));box-shadow:var(--pill-sh,none)}
.pill .art{width:21px;height:21px}.pill b{font:700 14px/1 var(--disp);letter-spacing:.2px;padding-right:2px}
.pill .ic{width:16px;height:16px;color:var(--gold,#FFC44D)}
.plus{display:grid;place-items:center;width:20px;height:20px;border-radius:50%;background:var(--plus-bg,var(--acc));color:var(--plus-ink,var(--acc-ink))}.plus .ic{width:13px;height:13px}
.iconbtn{display:grid;place-items:center;width:38px;height:38px;flex:none;border-radius:var(--ib-r,50%);border:var(--ib-bd,0);background:var(--ib-bg);color:var(--ink);box-shadow:var(--ib-sh,none);padding:0}
.iconbtn .ic{width:19px;height:19px}.iconbtn.sm{width:30px;height:30px}.iconbtn.sm .ic{width:15px;height:15px}.iconbtn.dis{opacity:.35}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;height:46px;padding:0 18px;border:var(--btn-bd,0);border-radius:var(--btn-r);
  background:var(--btn2-bg);color:var(--btn2-ink,var(--ink));font:700 15px/1 var(--disp);box-shadow:var(--btn2-sh,none);letter-spacing:var(--btn-ls,0);white-space:nowrap}
.btn.primary{background:var(--btn-bg);color:var(--btn-ink);box-shadow:var(--btn-sh)}
.btn .ic{width:18px;height:18px}
.btn.big{height:64px;width:100%;font-size:21px;gap:14px;justify-content:center}
.btn.big .ic{width:26px;height:26px}
.btn.big span{display:flex;flex-direction:column;align-items:flex-start;gap:4px}.btn.big small{font:600 12px/1 var(--ui);opacity:.78;letter-spacing:0}
.btn.small{height:32px;padding:0 12px;font-size:13px;gap:5px}.btn.small .art{width:16px;height:16px}
.btn.ghost{background:var(--ghost-bg,transparent);border:var(--ghost-bd);box-shadow:none;color:var(--mut)}
.btn.square{width:64px;height:64px;padding:0;flex:none}
.rw{display:inline-flex;gap:8px;align-items:center;font:700 13px/1 var(--disp)}.rwi{display:inline-flex;align-items:center;gap:3px}.rwi .art{width:17px;height:17px}

/* ---- headers / lists ---- */
.hdr{display:flex;align-items:center;gap:10px;min-height:44px}
.hdr .ttl{flex:1;margin:0;font:var(--ttl-font,700 24px/1.1 var(--disp));color:var(--hdr-ink,var(--ink));letter-spacing:var(--ttl-ls,0);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ver{font:600 11px/1 var(--ui);color:var(--mut)}
.sec{display:flex;align-items:baseline;justify-content:space-between;font:var(--sec-font,700 12px/1 var(--ui));text-transform:uppercase;letter-spacing:1.4px;color:var(--sec-ink,var(--mut));margin:6px 4px -3px}
.sec em{font-style:normal;text-transform:none;letter-spacing:0;font-weight:600;opacity:.8}
.card{background:var(--card-bg);border:var(--card-bd);border-radius:var(--r);box-shadow:var(--card-sh);position:relative}
.list{padding:2px 0}
.row{display:flex;align-items:center;gap:12px;padding:11px 14px;min-height:50px}
.row+.row{border-top:1px solid var(--line)}
.ri{display:grid;place-items:center;width:34px;height:34px;border-radius:var(--ri-r,11px);background:var(--ri-bg);color:var(--acc);flex:none}.ri .ic{width:18px;height:18px}
.rt{flex:1;display:flex;flex-direction:column;gap:2px;min-width:0}.rt b{font:700 15px/1.2 var(--ui)}.rt small{color:var(--mut)}
.rv{display:flex;align-items:center;gap:4px;color:var(--mut);font-weight:600;font-size:13px}.rv .ic{width:16px;height:16px;opacity:.8}
.tgl{width:46px;height:28px;border-radius:999px;background:var(--tgl-off);position:relative;flex:none;box-shadow:var(--tgl-sh,none)}
.tgl i{position:absolute;top:3px;left:3px;width:22px;height:22px;border-radius:50%;background:var(--knob,#fff);box-shadow:0 2px 4px rgba(0,0,0,.25)}
.tgl.on{background:var(--tgl-on)}.tgl.on i{left:21px}
.scroll{position:relative;flex:1;min-height:0;overflow:hidden;display:flex;flex-direction:column;gap:10px;margin:0 -16px;padding:0 16px 30px}
.scroll::after{content:"";position:absolute;left:0;right:0;bottom:0;height:64px;background:linear-gradient(transparent,var(--fade,#100826));pointer-events:none;z-index:3}
.bar{height:8px;border-radius:999px;background:var(--track);overflow:hidden}.bar i{display:block;height:100%;border-radius:inherit;background:var(--fill)}
.tabs{display:flex;gap:6px;padding:4px;border-radius:var(--tabs-r,999px);background:var(--tabs-bg);border:var(--tabs-bd,0)}
.tb{flex:1;text-align:center;padding:9px 0;border-radius:var(--tabs-r,999px);font:700 13px/1 var(--ui);color:var(--mut)}
.tb.on{background:var(--tab-on-bg);color:var(--tab-on-ink);box-shadow:var(--tab-on-sh,none)}

/* ---- navigation ---- */
.nav{margin-top:auto;display:grid;grid-template-columns:repeat(4,1fr);align-items:center;height:64px;background:var(--nav-bg);border:var(--nav-bd);box-shadow:var(--nav-sh);border-radius:var(--nav-r);position:relative;z-index:4}
.nv{display:flex;flex-direction:column;align-items:center;gap:4px;font:700 11px/1 var(--ui);color:var(--mut);position:relative}
.nv .ic{width:22px;height:22px}.nv.on{color:var(--nav-on)}
.nv .dot{position:absolute;top:-6px;left:54%;min-width:17px;height:17px;padding:0 4px;border-radius:9px;background:#FF4F7B;color:#fff;font:800 10px/17px var(--ui);text-align:center;font-style:normal;box-shadow:0 0 0 2px var(--dot-ring,#1a0f35)}
.nv .dot.new{background:var(--gold,#FFC44D);color:#3a2400;font-size:8px;letter-spacing:.4px}

/* ---- board / tray / lifelines ---- */
.board{position:relative;padding:var(--board-pad,9px);border-radius:var(--board-r);background:var(--board-bg);border:var(--board-bd);box-shadow:var(--board-sh)}
.bgrid{position:relative;display:grid;grid-template-columns:repeat(var(--n),1fr);gap:var(--gap,3px)}
.clrbar{position:absolute;left:-5px;right:-5px;top:calc((100% + var(--gap,3px)) * var(--row) / var(--n) - 5px);height:calc((100% + var(--gap,3px)) / var(--n) - var(--gap,3px) + 10px);border-radius:calc(var(--blk-r) + 4px);box-shadow:0 0 0 2px var(--clr,var(--acc)),0 0 24px -2px var(--clr,var(--acc));background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--clr,var(--acc)) 22%,transparent),transparent);z-index:2;pointer-events:none}
.cell{position:relative;aspect-ratio:1;border-radius:var(--blk-r);background:var(--cell);box-shadow:var(--cell-sh,none)}
.blk{border-radius:var(--blk-r)}
.tray{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;height:112px}
.slot{position:relative;display:grid;place-items:center;border-radius:var(--slot-r,18px);background:var(--slot-bg);border:var(--slot-bd);box-shadow:var(--slot-sh,none);--pc:24px}
.slot em{position:absolute;bottom:7px;left:0;right:0;text-align:center;font:600 10.5px/1 var(--ui);font-style:normal;color:var(--mut);display:flex;gap:3px;justify-content:center;align-items:center}
.slot em .ic{width:11px;height:11px}
.slot.used .sock{width:34px;height:58px;border-radius:10px;border:2px dashed var(--line2,rgba(255,255,255,.25))}
.slot.nofit .piece{opacity:.32;filter:saturate(.4)}
.slot.nofit em{color:var(--warn,#FF8FA8)}
.piece{display:grid;grid-template-columns:repeat(var(--w),var(--pc));grid-template-rows:repeat(var(--h),var(--pc));gap:3px}
.piece .blk{position:relative;inset:auto;width:var(--pc);height:var(--pc)}
.lifes{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.life{display:flex;flex-direction:column;align-items:center;gap:5px;padding:10px 6px;border-radius:var(--life-r,18px);background:var(--life-bg);border:var(--life-bd);box-shadow:var(--life-sh,none)}
.lico{position:relative;display:grid;place-items:center;width:40px;height:40px;border-radius:var(--lico-r,13px);background:var(--lico-bg);color:var(--lico-ink,var(--ink))}
.lico .ic{width:22px;height:22px}
.own{position:absolute;right:-7px;top:-6px;min-width:19px;height:19px;border-radius:10px;background:var(--acc);color:var(--acc-ink);font:800 11px/19px var(--ui);text-align:center;font-style:normal;box-shadow:0 0 0 2px var(--own-ring,#160c2c)}
.lname{font:700 12.5px/1 var(--ui)}.lcost{display:flex;align-items:center;gap:3px;font:700 12px/1 var(--disp);color:var(--mut)}.lcost .art{width:15px;height:15px}
.life.buy .lname{opacity:.85}

/* ---- game HUD ---- */
.ghud{display:grid;grid-template-columns:42px 1fr auto;align-items:center;gap:10px;min-height:76px}
.score{display:flex;flex-direction:column;align-items:center;gap:3px}
.score small{font:700 10.5px/1 var(--ui);letter-spacing:2px;color:var(--mut)}
.score b{font:700 46px/1 var(--disp);letter-spacing:1px}
.bst{display:flex;align-items:center;gap:4px;font:700 12px/1 var(--ui);color:var(--mut)}.bst .ic{width:13px;height:13px;color:var(--gold,#FFC44D)}
.gright{display:flex;flex-direction:column;gap:6px;align-items:flex-end}
.mode,.evt{display:inline-flex;align-items:center;gap:3px;height:24px;padding:0 9px;border-radius:999px;font:800 11px/1 var(--ui);background:var(--chip-bg);color:var(--ink);border:var(--chip-bd,0)}
.evt{background:var(--evt-bg);color:var(--evt-ink)}.evt .ic{width:12px;height:12px}
.combo{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:10px;font:700 12px/1 var(--ui)}
.cl{display:flex;align-items:center;gap:4px;color:var(--combo,#FFB347)}.cl .ic{width:15px;height:15px}
.cm{height:7px;border-radius:999px;background:var(--track);overflow:hidden}.cm i{display:block;height:100%;background:var(--combo-fill,linear-gradient(90deg,#FFB347,#FF5C8A))}
.cn{color:var(--mut);font-weight:600}
.clearhint{align-self:center;margin-top:-6px;display:inline-flex;align-items:center;gap:5px;height:24px;padding:0 10px;border-radius:999px;font:800 11.5px/1 var(--ui);background:var(--hint-bg);color:var(--hint-ink)}
.clearhint .ic{width:13px;height:13px}

/* ---- daily ---- */
.dhero{padding:16px;border-radius:var(--r);background:var(--hero-bg);border:var(--card-bd);box-shadow:var(--card-sh);display:flex;flex-direction:column;gap:10px;color:var(--hero-ink,var(--ink))}
.dtop{display:flex;justify-content:space-between;align-items:center;font:700 12px/1 var(--ui)}
.dlabel,.dtimer{display:inline-flex;gap:5px;align-items:center;opacity:.9}.dlabel .ic,.dtimer .ic{width:14px;height:14px}
.dtimer{padding:5px 9px;border-radius:999px;background:var(--dtimer-bg,var(--chip-bg))}
.dhero h3{margin:2px 0 0;font:700 26px/1.1 var(--disp)}
.dprog{display:flex;flex-direction:column;gap:6px}.dprog small{opacity:.8}
.dfoot{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:2px}
.month{padding:12px 14px 22px;border-radius:var(--r);background:var(--card-bg);border:var(--card-bd);box-shadow:var(--card-sh)}
.month .mt{display:flex;justify-content:space-between;font:700 13px/1 var(--ui);margin-bottom:14px}.month .mt span{color:var(--mut)}
.trk{position:relative;height:10px;margin:0 12px}.trkbar{height:8px;border-radius:999px;background:var(--track);overflow:hidden}.trkbar i{display:block;height:100%;background:var(--fill)}
.stp{position:absolute;top:-10px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:3px}
.stp .sb{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--card-solid,#2a1b4e);border:2px solid var(--track)}.stp .sb .art{width:17px;height:17px}
.stp.got .sb{border-color:var(--acc)}.stp small{font:700 10px/1 var(--ui);color:var(--mut)}
.cal{padding:12px;border-radius:var(--r);background:var(--card-bg);border:var(--card-bd);box-shadow:var(--card-sh)}
.calh{display:flex;align-items:center;justify-content:space-between;font:700 15px/1 var(--disp);margin-bottom:8px}
.dow,.days{display:grid;grid-template-columns:repeat(7,1fr);gap:5px}.dow span{text-align:center;font:700 10.5px/1 var(--ui);color:var(--mut);padding:4px 0}
.d{position:relative;aspect-ratio:1;border-radius:var(--day-r,11px);display:grid;place-items:center;font:700 13px/1 var(--ui);background:var(--day-bg)}
.d.blank{background:none}.d span{position:relative;z-index:1}
.d.done{background:var(--day-done-bg);color:var(--day-done-ink)}.d.done .ic{position:absolute;width:30px;height:30px;opacity:.28}
.d.missed{opacity:.55}.d .mx{position:absolute;bottom:4px;width:4px;height:4px;border-radius:50%;background:var(--miss,#FF5C8A)}
.d.today{box-shadow:inset 0 0 0 2px var(--acc);color:var(--acc)}.d.future{opacity:.38}
.legend{display:flex;gap:14px;justify-content:center;margin-top:10px;font:600 11px/1 var(--ui);color:var(--mut)}
.legend span{display:flex;gap:5px;align-items:center}.lg{width:11px;height:11px;border-radius:4px;display:inline-block}
.lg.done{background:var(--day-done-bg)}.lg.missed{background:var(--miss,#FF5C8A)}.lg.today{box-shadow:inset 0 0 0 2px var(--acc)}

/* ---- chest modal ---- */
.scr-chest .body{padding:0}
.behind{position:absolute;inset:-46px 0 0;display:flex;flex-direction:column;padding:48px 16px 0;gap:11px;opacity:.38}
.scrim{position:absolute;inset:-46px 0 0;background:var(--scrim)}
.modal{position:absolute;left:18px;right:18px;top:104px;padding:26px 20px 18px;border-radius:var(--modal-r,30px);background:var(--modal-bg);border:var(--modal-bd);box-shadow:var(--modal-sh);display:flex;flex-direction:column;align-items:center;text-align:center;gap:10px}
.mclose{position:absolute;right:14px;top:14px}
.rays{position:absolute;top:-10px;left:50%;width:280px;height:240px;margin-left:-140px;background:var(--rays);pointer-events:none;color:var(--ray-c,#FFE08F)}.rays svg{width:100%;height:100%;fill:currentColor;opacity:.16}
.bigchest{width:150px;height:126px;position:relative;margin-top:2px;filter:drop-shadow(0 12px 24px rgba(0,0,0,.45))}
.mkick{font:800 11px/1 var(--ui);letter-spacing:2px;text-transform:uppercase;color:var(--acc)}
.modal h3{margin:0;font:700 27px/1.1 var(--disp)}
.modal p{margin:0 6px;font-size:13.5px;line-height:1.45;color:var(--mut)}
.prizes{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;width:100%;margin:4px 0}
.pz{display:flex;flex-direction:column;align-items:center;gap:4px;padding:12px 4px;border-radius:var(--pz-r,18px);background:var(--pz-bg);border:var(--pz-bd)}
.pz .art{width:30px;height:30px}.pz .ic{width:28px;height:28px;color:var(--acc)}.pz b{font:700 19px/1 var(--disp)}.pz small{color:var(--mut);font-weight:600}
.btn.wait{height:40px;font:700 13px/1 var(--ui)}

/* ---- adventure ---- */
.region{padding:12px 14px;border-radius:var(--r);background:var(--card-bg);border:var(--card-bd);box-shadow:var(--card-sh);display:grid;grid-template-columns:1fr auto;gap:6px 10px;align-items:center}
.rn{font:700 18px/1 var(--disp)}.rr{font:700 12px/1 var(--ui);color:var(--mut)}.region .rbar{grid-column:1/-1;height:7px;border-radius:999px;background:var(--track);overflow:hidden}.region .rbar i{display:block;height:100%;background:var(--fill)}
.region small{grid-column:1/-1;color:var(--mut);font-weight:600}
.mapwrap{position:relative;flex:1;min-height:0;margin:0 -16px}
.mapbg{position:absolute;inset:0;background:var(--map-bg)}
.path{position:absolute;left:0;top:0;width:100%;height:100%}.path path{fill:none;stroke:var(--path);stroke-width:var(--path-w,10);stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:var(--path-dash,none)}
.node{position:absolute;transform:translate(-50%,-50%);width:50px;height:50px;border-radius:var(--node-r,50%);display:grid;place-items:center;background:var(--node-bg);border:var(--node-bd);box-shadow:var(--node-sh);font:700 19px/1 var(--disp);color:var(--node-ink,var(--ink))}
.node .ic{width:17px;height:17px;opacity:.7}.node.lock{background:var(--node-lock-bg);color:var(--mut);box-shadow:none;width:42px;height:42px}
.node.cur{width:64px;height:64px;font-size:24px;background:var(--node-cur-bg);color:var(--node-cur-ink);box-shadow:var(--node-cur-sh)}
.nst{position:absolute;bottom:-11px;display:flex;gap:0}.nst .ic{width:13px;height:13px;color:var(--gold,#FFC44D);opacity:1}
.milestone{position:absolute;transform:translate(-50%,-50%)}.milestone .art{width:44px;height:38px;filter:drop-shadow(0 4px 8px rgba(0,0,0,.4))}
.nextregion{position:absolute;top:2%;left:50%;transform:translateX(-50%);display:flex;gap:5px;align-items:center;padding:6px 11px;border-radius:999px;background:var(--chip-bg);font:700 11px/1 var(--ui);color:var(--mut);white-space:nowrap}.nextregion .ic{width:12px;height:12px}
.lvcard{padding:14px;border-radius:var(--r);background:var(--hero-bg);border:var(--card-bd);box-shadow:var(--card-sh);display:flex;flex-direction:column;gap:10px;margin-bottom:26px;color:var(--hero-ink,var(--ink))}
.lvh{display:flex;justify-content:space-between;align-items:center}.lvn{font:700 20px/1 var(--disp)}.lvg{display:flex;gap:5px;align-items:center;font:700 12px/1 var(--ui);opacity:.85}.lvg .ic{width:14px;height:14px}
.lvf{display:flex;align-items:center;gap:10px}.lvf .btn{margin-left:auto}.stars3{display:flex}.stars3 .ic{width:16px;height:16px;opacity:.5}

/* ---- shop ---- */
.offer{position:relative;display:grid;grid-template-columns:1fr auto;gap:8px;padding:16px;border-radius:var(--r);background:var(--offer-bg);border:var(--card-bd);box-shadow:var(--card-sh);overflow:hidden;min-height:118px;color:var(--offer-ink,var(--ink))}
.osave{position:absolute;left:14px;top:-1px;padding:5px 8px;border-radius:0 0 8px 8px;background:var(--save-bg,#FF4F7B);color:#fff;font:800 11px/1 var(--ui)}
.otext{display:flex;flex-direction:column;gap:4px;margin-top:14px;position:relative;z-index:1;max-width:190px}.otext small{opacity:.8;font-weight:700}.otext b{font:700 21px/1.1 var(--disp)}.otext span{font-size:12.5px;opacity:.85;line-height:1.35}
.obuy{display:flex;flex-direction:column;align-items:flex-end;justify-content:flex-end;gap:4px;position:relative;z-index:1}.obuy s{opacity:.6;font-size:12px}
.ochest{position:absolute;right:6px;top:4px;width:96px;height:80px;opacity:.95}
.themes{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.theme{position:relative;padding:10px;border-radius:var(--r-sm,18px);background:var(--card-bg);border:var(--card-bd);box-shadow:var(--card-sh);display:flex;flex-direction:column;gap:7px}
.theme.active{box-shadow:var(--card-sh),0 0 0 2px var(--acc)}
.sw{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;padding:8px;border-radius:12px;background:var(--sw-bg,rgba(0,0,0,.25))}
.sw i{aspect-ratio:1;border-radius:6px;background:linear-gradient(180deg,color-mix(in srgb,var(--c) 55%,#fff),var(--c) 50%,color-mix(in srgb,var(--c) 75%,#000));box-shadow:inset 0 1px 0 rgba(255,255,255,.4)}
.theme b{font:700 14px/1 var(--ui)}
.tp{display:inline-flex;align-items:center;gap:4px;align-self:flex-start;height:26px;padding:0 10px;border-radius:999px;background:var(--btn-bg);color:var(--btn-ink);font:800 12px/1 var(--disp)}
.tp .art{width:15px;height:15px}.tp .ic{width:14px;height:14px}.tp.own{background:var(--chip-bg);color:var(--acc)}.tp.ad{background:var(--chip-bg);color:var(--ink)}
.ttag{position:absolute;right:8px;top:8px;padding:3px 7px;border-radius:999px;background:var(--gold,#FFC44D);color:#3a2400;font:800 9.5px/1 var(--ui);font-style:normal;z-index:2;white-space:nowrap}
.free{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:var(--r);background:var(--free-bg);border:var(--free-bd);box-shadow:var(--card-sh)}
.fi{display:grid;place-items:center;width:38px;height:38px;border-radius:12px;background:var(--gold,#FFC44D);color:#3a2400}.ft{flex:1;display:flex;flex-direction:column;gap:2px}.ft b{font:700 15px/1 var(--ui)}.ft small{color:var(--mut)}
.gempacks{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}
.gp{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;padding:14px 6px 10px;border-radius:var(--r-sm,18px);background:var(--card-bg);border:var(--card-bd);box-shadow:var(--card-sh)}
.gtag{position:absolute;top:-9px;left:50%;transform:translateX(-50%);padding:4px 8px;border-radius:999px;background:var(--gold,#FFC44D);color:#3a2400;font:800 9.5px/1 var(--ui);font-style:normal;white-space:nowrap}
.gstack{display:flex;height:34px;align-items:center}.gstack .art{width:30px;height:30px}.gstack .art+.art{margin-left:-14px}
.gp b{font:700 18px/1 var(--disp)}.gp .btn{width:100%}

/* ---- trophies ---- */
.tsum{position:relative;display:flex;align-items:center;gap:14px;padding:14px;border-radius:var(--r);background:var(--hero-bg);border:var(--card-bd);box-shadow:var(--card-sh);overflow:hidden;color:var(--hero-ink,var(--ink))}
.tring{--p:.3;flex:none;width:74px;height:74px;border-radius:50%;display:grid;place-content:center;text-align:center;
  background:radial-gradient(closest-side,var(--ring-in,#1d1240) 79%,transparent 80% 100%),conic-gradient(var(--acc) calc(var(--p)*100%),var(--track) 0)}
.tring b{font:700 24px/1 var(--disp)}.tring small{font-weight:700;opacity:.75}
.tst{display:flex;flex-direction:column;gap:4px;align-items:flex-start;position:relative;z-index:1}.tst b{font:700 17px/1.1 var(--disp)}.tst small{opacity:.8}.tst .btn{margin-top:4px}
.bigtrophy{position:absolute;right:-6px;bottom:-8px;width:96px;height:96px;opacity:.9}
.tlist{gap:9px}
.tr{display:grid;grid-template-columns:44px 1fr auto;gap:12px;align-items:center;padding:11px 12px;border-radius:var(--r-sm,18px);background:var(--card-bg);border:var(--card-bd);box-shadow:var(--card-sh)}
.tr.claim{box-shadow:var(--card-sh),0 0 0 2px var(--acc)}
.tr.done{opacity:.72}
.tmed .art{width:42px;height:42px}
.tt{display:flex;flex-direction:column;gap:3px;min-width:0}.tt b{font:700 14.5px/1.1 var(--ui)}.tt small{color:var(--mut);line-height:1.2}
.tbar{height:6px;border-radius:999px;background:var(--track);overflow:hidden;margin-top:3px}.tbar i{display:block;height:100%;background:var(--fill)}
.tnum{font:700 10.5px/1 var(--ui);color:var(--mut)}
.tact{display:flex;flex-direction:column;align-items:flex-end;gap:6px}.tact .rw{font-size:12px}
.got{display:flex;align-items:center;gap:3px;font:800 11px/1 var(--ui);color:var(--acc)}.got .ic{width:14px;height:14px}

/* ---- settings ---- */
.moods{display:grid;grid-template-columns:1fr 1fr;gap:9px}
.mood{position:relative;display:flex;flex-direction:column;gap:3px;padding:12px;border-radius:var(--r-sm,18px);background:var(--card-bg);border:var(--card-bd);box-shadow:var(--card-sh)}
.mood.on{box-shadow:var(--card-sh),0 0 0 2px var(--acc)}
.mplay{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--chip-bg);color:var(--ink);margin-bottom:4px}.mplay .ic{width:14px;height:14px}
.mood.on .mplay{background:var(--acc);color:var(--acc-ink)}
.mood b{font:700 15px/1 var(--disp)}.mood small{color:var(--mut);line-height:1.25}
.mprice{position:absolute;right:10px;top:12px;display:flex;align-items:center;gap:3px;font:800 11px/1 var(--disp);font-style:normal;color:var(--ink)}.mprice .art{width:14px;height:14px}
.mood.lock{opacity:.85}
`;
