const express = require('express');
const {exec}   = require('child_process')
const {existsSync,
      writeFileSync,
      readFileSync,
     watchFile} = require('fs')

let output=''
function read(){
  let data=readFileSync('C:\\Users\\The Ryu\\Python\\main.ipynb',{encoding:'utf8',flag:'r'});
  return data.toString()
}
function run(cmd){
      exec(cmd, (error, stdout, stderr) => {
      let err=''
      let k=false
      error != null ? [err,k]=[error,true] : [err,k]=[stderr,false]
      if(k){
        console.log(err)
        err=err.toString().split('\n').filter(n=>n)
        err[4]=err[4].split(':')
        err='on'+err[1].split(',')[1]+'<span class="hljs-string">'+err[2]+'</span>'+'<span class="hljs-string">'+err[3]+'</span>'+'<span class="hljs-built_in">'+err[4][0]+'</span>'+'<span class="hljs-string"> => </span>'+'<span class="hljs-keyword">'+err[4][1]+'</span>'
      }
      if(!k){
        console.log(stdout)
      }
      stdout=stdout+err
      output=stdout.replace('D:\\Programiing\\coding\\nodejs\\Project\\Live_Class\\files','').replace('D:\\Programing\\coding\\nodejs\\Project\\express\\Live_Class\\files')
      output='<span class="hljs-string">'+output+'</span>'
    })
}
const exe = (code,id='a')=>{
    i+=1
    if(id!=''){
      i=0
    }
    if(existsSync('./files/'+id)){
      writeFileSync(`./files/${id}/file${i}.py`, code);
      run(`cd files && cd ${id} && python file${i}.py`)
    }
    else{
      run(`cd files && mkdir ${id}`)
      writeFileSync(`./files/${id}/file${i}.py`, code);
      run(`cd files && cd ${id} && python file${i}.py`)
    }
}


i=0;

const app = express();


app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.get('/type',function(req, res) {
  let data=read()
  res.json({out:data});
})
j=0

app.listen(7000, () => console.log('listening at 7000'));
app.post('/ryu', (request, response) => {
  i+=1
  const code = request.body.text;
  const id   = request.body.name;
  output=exe(code,id)
  if(!code || !id){
    return response.status(404).json({msg:'nodata'})
  }
});

app.get('/out', function(req, res) {
    console.log(output)
      res.json({out:output});
});

app.get('/login', function(req, res) {
  res.sendFile(__dirname+"\\public\\login.html");
});

app.get('/live', function(req,res) {
  res.sendFile(__dirname+"\\public\\live.html");
});


app.get('/ejs', function(req,res) {
  let data=read()
  watchFile('./code/main.py',(curr,prev) => {
    data=read()
    console.log('file changed')
  })
  res.render('live.ejs',{data:data});
});
