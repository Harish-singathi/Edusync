async function displaydata()
{
    let res=await fetch("/Student")
    try{
        if(!res.ok)
        {
            throw new Error("data not getting");
        }
        let data=await res.json();
        showdata(data)

    }
    catch(error)
    {
        console.log(error)
    }
}
   let container=document.getElementById("container")
   function showdata(data)
   {
    data.forEach(ele=>
    {
        let item=document.createElement("div")
        item.innerHTML=`
        <p>Name:${ele.name}</p>
        <img src =${ele.image} width="100">`
          container.appendChild(item)
    }
    );
   }
   addEventListener("DOMContentLoaded",displaydata)