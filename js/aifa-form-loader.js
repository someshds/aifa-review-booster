(function(){
  "use strict";
  var button=document.getElementById('load-aifa-form'),mount=document.getElementById('aifa-form-mount');
  if(!button||!mount)return;
  button.addEventListener('click',function(){
    button.disabled=true;button.textContent='Loading form…';
    var frame=document.createElement('iframe');
    frame.src='https://link.aifusionautomations.com/widget/form/lS0nKZSRwsBvI4BUU92p';
    frame.title='Request a call with AI Fusion Automations';frame.id='aifa-opportunity-form';
    var submitted=false;
    window.addEventListener('message',function(event){
      if(submitted||event.origin!=='https://link.aifusionautomations.com'||event.source!==frame.contentWindow)return;
      if(Array.isArray(event.data)&&event.data[0]==='set-sticky-contacts'){
        submitted=true;window.dataLayer=window.dataLayer||[];
        window.dataLayer.push({event:'generate_lead',form_id:'lS0nKZSRwsBvI4BUU92p',page_path:location.pathname});
      }
    });
    frame.addEventListener('load',function(){
      button.remove();window.dataLayer=window.dataLayer||[];
      window.dataLayer.push({event:'form_view',form_id:'lS0nKZSRwsBvI4BUU92p',page_path:location.pathname});
    },{once:true});
    mount.appendChild(frame);
    var embed=document.createElement('script');embed.src='https://link.aifusionautomations.com/js/form_embed.js';embed.defer=true;document.body.appendChild(embed);
  },{once:true});
})();
