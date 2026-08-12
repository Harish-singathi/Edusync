async function fetchdata()
{
    let res=await fetch("/Student");
    let data=await res.json();
        showdata(data);
}

function showdata(data)
{
    let btn1=document.getElementById("btn");
    
    data.forEach(student=>
    {
        let item=document.createElement("div");
        item.innerHTML=`
        <p> ${student.id}</p>
        <p> ${student.name}</p>
        <img src='${student.image}' width="100">
        <button id='delete${student.id}'>Delete</button>
        <button id='edit${student.id}' >Edit</button>`
         btn1.appendChild(item)
   
    }
    );
    data.forEach(student=>
    {
        let deletebtn=document.getElementById(`delete${student.id}`)
        deletebtn.onclick=()=>
        {
            deletedata(student.id);
        }
        let editbtn=document.getElementById(`edit${student.id}`)
        editbtn.onclick=()=>
        {
             editdata(student.id);
        }
    }  

    );
}
    async function deletedata(id)
    {
        let res=await fetch(`/Student/${id}`,{"method":"DELETE"})
        try{
            if(!res.ok)
            {
                throw new Error("DAta not deleted")
            }
            alert("data deleted")
        }
        catch(error)
        {
            
        }
    }
    async function editdata(id)
    {
        let studentid=document.getElementById("id");
        let sname=document.getElementById("name");
        let image=document.getElementById("image")
        let res=await fetch(`/Student/${id}`)
        try
        {
            if(!res.ok)
            {
                throw new Error("data is not getting into input fields");

            }
            let data=await res.json();
            studentid.value=data.id;
            sname.value=data.name;
            image.value=data.image;
        }
        catch(error)
        {
            console.log(error)
        }
    }
    async function savedata()
    {
        let studentid=document.getElementById("id").value;
        let name=document.getElementById("name").value;
        let image=document.getElementById("image").value;
         
        let obj={
            "name":name,
            "image":image
        }
        let studentmethod=studentid?"PUT":"POST";
         const url=studentid?`/Student/${studentid}`:"/Student"
         let res=await fetch(url,{
              "method":studentmethod,
              "headers":{
                "Content-Type":"application/json"
              },
              "body":JSON.stringify(obj)
         })
         try{
               if(!res.ok)
               {
                throw new Error("Data not Updated");
               }
               alert("data updated Successfully")
         }
         catch(error)
         {

         }
    }
    addEventListener("Domcontentloaded",fetchdata)
         
    
       

