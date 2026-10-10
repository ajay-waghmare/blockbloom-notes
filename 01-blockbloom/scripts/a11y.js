const fs=require('fs'),path=require('path');
const ROOT='D:/DevTools/BlockBloom-ing/app/src/main/res';
const T={
 'values':{a11y_score_best:'Score %1$d, best %2$d',a11y_coins:'%1$d coins'},
 'values-pt-rBR':{a11y_score_best:'Pontos %1$d, recorde %2$d',a11y_coins:'%1$d moedas'},
 'values-tr':{a11y_score_best:'Puan %1$d, rekor %2$d',a11y_coins:'%1$d para'},
 'values-ko':{a11y_score_best:'점수 %1$d, 최고 %2$d',a11y_coins:'코인 %1$d개'},
 'values-de':{a11y_score_best:'Punkte %1$d, Rekord %2$d',a11y_coins:'%1$d Münzen'},
 'values-ja':{a11y_score_best:'スコア %1$d、ベスト %2$d',a11y_coins:'コイン %1$d枚'},
 'values-es':{a11y_score_best:'Puntos %1$d, récord %2$d',a11y_coins:'%1$d monedas'},
};
for(const [d,m] of Object.entries(T)){
 const p=path.join(ROOT,d,'strings.xml'); let s=fs.readFileSync(p,'utf8');
 const add=Object.entries(m).filter(([k])=>!s.includes(`name="${k}"`))
   .map(([k,v])=>`    <string name="${k}">${v}</string>`).join('\n');
 if(!add){console.log(`  ${d}: none`);continue;}
 fs.writeFileSync(p,s.replace('</resources>',add+'\n</resources>'));
 console.log(`  ${d}: +${add.split('\n').length}`);
}
