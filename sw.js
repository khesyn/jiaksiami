const V='jiak-v18',A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||!(u.origin===location.origin||/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)))return;
const nav=e.request.mode==='navigate'||/(\/|\.html|sw\.js|\.webmanifest)$/.test(u.pathname);
const put=res=>{const cp=res.clone();caches.open(V).then(c=>c.put(e.request,cp)).catch(()=>{});return res};
e.respondWith(nav?fetch(e.request,{cache:'no-cache'}).then(put).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))):caches.match(e.request).then(r=>r||fetch(e.request).then(put).catch(()=>caches.match('index.html'))))});
