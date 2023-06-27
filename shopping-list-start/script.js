const itemForm= document.getElementById("item-form");
const itemInput=document.getElementById("item-input");
const itemList=document.getElementById("item-list");
const Clearbtn=document.getElementById("clear");
const itemfilter= document.getElementById('filter');
const formbtn=itemForm.querySelector('button');
let iseditmode=false;

function displayitems(){
    const itemfromstorage=getitemsfromstorage();
    itemfromstorage.forEach(item => additemtodom(item));
    checkui();
}

function onaddItemsubmit(e){
    e.preventDefault();
    const newitem= itemInput.value;
    if( newitem === "") {
        alert("please add an item");
        return;
    }
    if (iseditmode){
        const itemtoedit=itemList.querySelector('.edit-mode');
        removeItemfromstorage(itemtoedit.textContent);
        itemtoedit.classList.remove('edit-mode');
        itemtoedit.remove();
        iseditmode=false;
    }else{
        if (checkifitemexist(newitem)){
            alert('That item already exists!');
            return;
        }
    }
    additemtodom(newitem);
    additemtostorage(newitem);
   
    checkui();
    itemInput.value='';
}
function additemtodom(item){
    const li=document.createElement("li");
    li.appendChild(document.createTextNode(item));
    const button=createButton("remove-item btn-link text-red")
    li.appendChild(button); 
    itemList.appendChild(li);


}

    function createButton(classes){
        const button=document.createElement('button');
        button.className=classes;
        const icon=createIcon("fa-solid fa-xmark");
        button.appendChild(icon);
        return button;
    }
    function createIcon(classes){
        const icon=document.createElement('i');
        icon.className=classes;
        return icon;
    }
    function additemtostorage(item){
        let itemfromstorage=getitemsfromstorage();
        if (localStorage.getItem('items')==null){
            itemfromstorage=[];
        }else{
            itemfromstorage=JSON.parse(localStorage.getItem('items'));
        }
        itemfromstorage.push(item);
        localStorage.setItem('items',JSON.stringify(itemfromstorage));
    }
    function getitemsfromstorage(){
        let itemfromstorage;
        if (localStorage.getItem('items')==null){
            itemfromstorage=[];
        }else{
            itemfromstorage=JSON.parse(localStorage.getItem('items'));
        }
        return itemfromstorage;
    
    }
    function onclickitem(e){
        if (e.target.parentElement.classList.contains('remove-item')){
            removeItem(e.target.parentElement.parentElement);
        }else{
            setItemToEdit(e.target);

        }


    }
    function checkifitemexist(item){
        const itemfromstorage=getitemsfromstorage();
        return itemfromstorage.includes(item);
        
    }
    function setItemToEdit(item){
        iseditmode=true;
        itemList.querySelectorAll('li').forEach((i)=> i.classList.remove('edit-mode'));
        item.classList.add('edit-mode');
        formbtn.innerHTML='<i class="fa-solid fa-pen"></i> Update item';
        formbtn.style.backgroundColor='#228B22';
        itemInput.value=item.textContent;
    }
    function removeItem(item){
        if (confirm('Are u Sure?')){
            item.remove();
            removeItemfromstorage(item.textContent);
            
            checkui();
        }

  
           
    }
    function removeItemfromstorage(item){
        let itemfromstorage=getitemsfromstorage();
        itemfromstorage=itemfromstorage.filter((i)=> i !==item);
        localStorage.setItem('items',JSON.stringify(itemfromstorage));
    }
    
    function clearItems(){
            while (itemList.firstChild){
                itemList.removeChild(itemList.firstChild);
                
            }
            localStorage.removeItem('items');
            checkui();
        }
    function filterItems(e){
        const items=itemList.querySelectorAll('li');
        const text=e.target.value.toLowerCase();
        items.forEach((item) => {
            const itemname=item.firstChild.textContent.toLowerCase();
            if (itemname.indexOf(text)!=-1){
                item.style.display='flex';

            }else{
                item.style.display='none';

            }


        });
    }
    function checkui(){
        const items=itemList.querySelectorAll('li');
        if (items.length===0){
            Clearbtn.style.display='none';
            itemfilter.style.display='none';

        }else{
            Clearbtn.style.display='block';
            itemfilter.style.display='block';


        }
        formbtn.innerHTML='<i class="fa-solid fa-plus"></i>Add Item';
        formbtn.style.backgroundColor='#333';
        iseditmode=false;

    }
    




 

function init(){

itemForm.addEventListener("submit",onaddItemsubmit);
itemList.addEventListener("click",onclickitem);
Clearbtn.addEventListener("click",clearItems);
itemfilter.addEventListener("input",filterItems);
document.addEventListener('DOMContentLoaded',displayitems)
checkui();

}
init();

