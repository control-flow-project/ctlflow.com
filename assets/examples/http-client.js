const response = await fetch(`${origin}/api/health`);
if (!response.ok) throw new Error(`HTTP ${response.status}`);
const { data, meta } = await response.json();
console.log(data.instance, data.version, meta.requestId);
