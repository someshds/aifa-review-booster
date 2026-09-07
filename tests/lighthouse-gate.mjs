import {chromium} from '@playwright/test';
import {spawn, spawnSync} from 'node:child_process';
import fs from 'node:fs';

const server=spawn('python3',['-m','http.server','4173','--bind','127.0.0.1'],{stdio:'ignore'});
try {
  for(let attempt=0;attempt<30;attempt++){
    try{if((await fetch('http://127.0.0.1:4173/')).ok)break;}catch{}
    await new Promise(resolve=>setTimeout(resolve,200));
  }
  const out='/tmp/aifa-lighthouse-ci.json';
  const bin=process.platform==='win32'?'node_modules/.bin/lighthouse.cmd':'node_modules/.bin/lighthouse';
  const run=spawnSync(bin,['http://127.0.0.1:4173/','--chrome-path='+chromium.executablePath(),'--chrome-flags=--headless --no-sandbox','--output=json','--output-path='+out,'--quiet'],{encoding:'utf8'});
  if(run.status!==0)throw new Error(run.stderr||'Lighthouse failed');
  const j=JSON.parse(fs.readFileSync(out));
  const scores=Object.fromEntries(Object.entries(j.categories).filter(([k])=>['performance','accessibility','best-practices','seo'].includes(k)).map(([k,v])=>[k,Math.round(v.score*100)]));
  console.log(scores);
  for(const [k,min] of Object.entries({performance:90,accessibility:95,'best-practices':95,seo:95}))if(scores[k]<min)throw new Error(`${k} ${scores[k]} < ${min}`);
  for(const [k,max] of Object.entries({'largest-contentful-paint':2500,'total-blocking-time':200,'cumulative-layout-shift':.1}))if(j.audits[k].numericValue>max)throw new Error(`${k} ${j.audits[k].numericValue} > ${max}`);
} finally {
  server.kill('SIGTERM');
}
