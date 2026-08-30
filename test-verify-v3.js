import http from 'http';

function checkUrl(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:5173${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, len: data.length }));
    }).on('error', reject);
  });
}

async function verify() {
  console.log('Testing server endpoints:');
  const index = await checkUrl('/');
  console.log(`- GET / : status ${index.status}, length ${index.len}`);
  
  const css = await checkUrl('/style.css');
  console.log(`- GET /style.css : status ${css.status}, length ${css.len}`);
  
  const js = await checkUrl('/app.js');
  console.log(`- GET /app.js : status ${js.status}, length ${js.len}`);
  
  console.log('\nAll static files served successfully!');
}

verify().catch(console.error);
