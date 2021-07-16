i=1
i=1
let inputs=[]
heigh=()=>{
    let code = id('code')
    let text = code.innerText
    code.innerHTML=`<pre><code class="python">${text}</code></pre>`
    setEnd(code)
}
Send = async (text,name,input=[]) => {
    const data = {text,name,input};
    console.log(data)
    const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    };
    let output = await fetch(window.location.origin+'/out')
    console.log(output)
    let json   = await output.json();
    let out=json.out
    id('output').innerHTML='<pre><code class="python">'+out+'</code></pre>'
    await fetch('/ryu', options)
}
send=async()=>{
    let text=id('code').innerText
    let name=id('name').value
    this.name=name
    let inner = []
    let p=text.match(/input/g)
    let l=p!=undefined ? p.length : 0
    this.l=l
    if(l>0){
        text.split('input').forEach((ele)=>{
                inner.push(ele.split('\n')[0].replace(/print\(.*?\)/g,'').replace(/[()""'']/g,'').replaceAll(' ','&nbsp;'))
        })
        inner=inner.filter(n=>n)
        console.log(inner)
        id('output').innerHTML=''
        for(i=0;i<l;i++){
            if(id.innerText!="please try again\n")
            {id('output').innerHTML+=`${inner[i]} <input id='a${i}' type="text"><br>`}
        }
        
    }
    else{
        id('output').innerHTML=''
        await Send(text,name,[])
    }
}

