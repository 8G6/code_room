id=(ID)=>{return document.getElementById(ID)}

hide  = (ele) => {id(ele).style.display='none'}

show  = (ele) => {id(ele).style.display=null}

other = (v)   => {if(v.value!='CEK'){show('other-clg')}else{hide('other-clg')}}

email = (e)   => {
                    if(e.value.match(/^([a-z0-9__\.-]+)@([A-Za-z0-9\.-]+)\.([a-zA-z0-9])/g)){
                        console.log('valid email')
                    }
                    else{
                        console.log('invalid email')
                    }
                }
                setEnd=(ele)=>  {
                    var range,selection;
                    if(document.createRange){
                        range = document.createRange();
                        range.selectNodeContents(ele);
                        range.collapse(false);
                        selection = window.getSelection();
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                    else if(document.selection){ 
                        range = document.body.createTextRange();
                        range.moveToElementText(ele);
                        range.collapse(false);
                        range.select();
                    }
            
                }

sss = (sheet)=> {
                    console.log(sheet)
                    document.getElementById("style").setAttribute("href", sheet);  
                }