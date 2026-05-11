const { spawn } = require("child_process");
function run(cmd,args,name){const p=spawn(cmd,args,{shell:true,stdio:"inherit",env:process.env});p.on("exit",c=>{if(c!==0&&c!==null)console.log(`[${name}] exited ${c}`)});return p;}
const api=run("node",["server.cjs","--api-only"],"api"); setTimeout(()=>run("npx",["vite","--host","0.0.0.0"],"vite"),500);
function shutdown(){try{api.kill()}catch{} process.exit(0)} process.on("SIGINT",shutdown); process.on("SIGTERM",shutdown);
