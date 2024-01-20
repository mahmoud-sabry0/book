let home = document.getElementById("home")
let search = document.getElementById("search")
let searchList = document.getElementById("searchList")
let aboutPage = document.getElementById("about")
let contentPage = document.getElementById("content-page")
let cartPage = document.getElementById("cart")
let favouritePage = document.getElementById("favourite")
let aside = document.querySelector("aside")
let setting = document.querySelector(".setting")
let settingIcon = document.querySelector(".setting i")
let openProductForm = document.querySelector(".Create_Product")
let productForm = document.getElementById("product-form")
let closeForm = document.getElementById("close-form")
let formPutton = document.getElementById("cu")
let bookName = document.getElementById("bookName")
let bookPrice = document.getElementById("bookPrice")
let bookDescription = document.getElementById("book-description")
let welcomeMessage = document.getElementById("welcomeMessage")
showHomePage()

formPutton.innerHTML="Add"
formPutton.style.background=("#0d6efd")
welcomeMessage.innerHTML= "Home Page"

let list=[]
let cartList=localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
let favourList=localStorage.getItem("favourItem") ? JSON.parse(localStorage.getItem("favourItem")) : []
if(localStorage.getItem("books")!= null){
    list = JSON.parse(localStorage.getItem("books"))
}else{
    list=[]
}

//******calc total price******

let total;
function calc(){
    let sum = cartList.reduce((a,b) =>{
        return a += +b.cartBookPrice;
    },0)
    total = sum
}
calc()


//******events for all button an input ******
setting.addEventListener("click", ()=>{
    aside.classList.toggle("open-setting")
    settingIcon.classList.toggle("fa-spin")
})

openProductForm.addEventListener("click", ()=>{
    productForm.style.display = "block"; 
})
closeForm.addEventListener('click', ()=>{
    productForm.style.display = "none";
})
home.addEventListener("click", ()=>{
    welcomeMessage.innerHTML= "Home Page"
    showHomePage()
    showMainData()
})


cartPage.addEventListener("click", ()=>{
    welcomeMessage.innerHTML= `Cart Page.... <span class="text-dark">Total price =</span> <span class="text-success badge fs-4 bg-dark total">${total} L.E</span>`
    showHomePage()
    showCartItems()
    calc()
})
favouritePage.addEventListener("click", ()=>{
    welcomeMessage.innerHTML= "Favourite Page"
    showHomePage()
    showFavouriteItems()
})


formPutton.addEventListener('click', ()=>{
if(!formPutton.hasAttribute("update-item")){
    let book = {
        bookName: bookName.value,
        bookPrice: bookPrice.value,
        bookDescription: bookDescription.value
    }
    list.push(book)
    console.log(list)
    localStorage.setItem("books", JSON.stringify(list))
    showMainData()
    showDataInTable()
}


})


search.addEventListener("input",()=>{
    filteration()
})
searchList.addEventListener("input",()=>{
    filterList()
})
//****filter list in home page and push items im new list when i search about items*****
function filteration(){
    let books = ""
       let newList = []
        for (let i = 0; i < list.length; i++) {
            if(list[i].bookName.includes(search.value)){
                newList.push(list[i])
        console.log(newList)
        console.log(list)
                books += `
                <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="card">
                <img src="./imgs/9e175870df16e1a54f3259f4b7354bba.jpg" class="card-img-top w-100" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${list[i].bookName}</h5>
                    <p class="card-text fw-bold fs-5">price: <span class="badge fs-6 text-primary">${list[i].bookPrice} L.E</span></p>
                    <div class="icons-item">
                    <i class="fa-solid fa-cart-shopping p-2 rounded bg-primary fs-6 mx-3" add-item="${[i]}"></i>
                    <i class="fa-solid fa-heart p-2 rounded bg-danger fs-6 mx-3" favour-item="${[i]}"></i>
                    </div>
                </div>
                </div>
            </div>
                `
            }
            document.querySelector(".row").innerHTML = books
            
        }

}

//****filter list in CRUD page to add,edit,update and delete when i search about items*****
function filterList(){
    let tbody = ""
       let newDataList = []
        for (let i = 0; i < list.length; i++) {
            if(list[i].bookName.includes(searchList.value)){
                newDataList.push(list[i])
        // console.log(newDataList)
        // console.log(list)
            tbody += `
            <tr>
                <td>${[i]}</td>
                <td>${list[i].bookName}</td>
                <td>${list[i].bookPrice}</td>
                <td>${list[i].bookDescription}</td>
                <td><span class="text-primary fw-bolder" id="Edit" data-edit = "${[i]}">Edit</span></td>
                <td><span class="text-danger fw-bolder" id="Delete" data-delete = "${[i]}">Delete</span></td>
            </tr>
            `
            }
            document.getElementById("tbody").innerHTML = tbody
            
        }

}

//****show data in table in CRUD product window**** */
function showDataInTable(){
    let tbody=""
    for (let i = 0; i < list.length; i++) {
        tbody += `
        <tr>
            <td>${[i]}</td>
            <td>${list[i].bookName}</td>
            <td>${list[i].bookPrice}</td>
            <td>${list[i].bookDescription}</td>
            <td><span class="text-primary fw-bolder" id="Edit" data-edit = "${[i]}">Edit</span></td>
            <td><span class="text-danger fw-bolder" id="Delete" data-delete = "${[i]}">Delete</span></td>
        </tr>
        `
        
    }
    document.getElementById("tbody").innerHTML = tbody
}
showDataInTable()

//****show data in home page**** */
function showMainData(){
    let books = ""
    for (let i = 0; i < list.length; i++) {
        books += `
        <div class="col-lg-3 col-md-4 col-sm-6">
        <div class="card">
          <img src="./imgs/9e175870df16e1a54f3259f4b7354bba.jpg" class="card-img-top w-100" alt="...">
          <div class="card-body">
            <h5 class="card-title">${list[i].bookName}</h5>
            <p class="card-text fw-bold fs-5">price: <span class="badge fs-6 text-primary">${list[i].bookPrice} L.E</span></p>
            <div class="icons-item">
              <i class="fa-solid fa-cart-shopping p-2 rounded bg-primary fs-6 mx-3" add-item="${[i]}"></i>
              <i class="fa-solid fa-heart p-2 rounded bg-danger fs-6 mx-3" favour-item="${[i]}"></i>
            </div>
          </div>
        </div>
      </div>
        `
    }
    document.querySelector(".row").innerHTML = books
}
showMainData()
//****check about data type**** */
let idCart 
let idFavour

document.addEventListener('click', (e)=>{
    let checkToEditData = e.target.hasAttribute("data-edit")
    let checkToDeleteData = e.target.hasAttribute("data-delete")
    let checkToAddItem = e.target.hasAttribute("add-item")
    let checkToAddItemToFavouritList = e.target.hasAttribute("favour-item")
    let checkTodeleteItemFromCart = e.target.hasAttribute("delete-item-from-cart")
    let checkTodeleteItemFromFavour = e.target.hasAttribute("delete-item-from-favour")
    let checkToUpdateItem = e.target.hasAttribute("update-item")
  
    if(checkToEditData){
        let idEdit = e.target.getAttribute("data-edit")
        editeItem(idEdit)
    }
    if(checkToDeleteData){
        let idDelete = e.target.getAttribute("data-delete")
        deleteItem(idDelete)
    }
    if(checkToAddItem){
     idCart = e.target.getAttribute("add-item")
        addToCart(idCart)
        
    }
    if(checkToAddItemToFavouritList){
        idFavour = e.target.getAttribute("favour-item")
        addToFavourList(idFavour)
    }
    if(checkTodeleteItemFromCart){
        let idDeleteFromCart = e.target.getAttribute("delete-item-from-cart")
        deleteItemFromCart(idDeleteFromCart)
        // calc()
        
    }
    if(checkTodeleteItemFromFavour){
        let idDeleteFromFavour = e.target.getAttribute("delete-item-from-cart")
        deleteItemFromFavour(idDeleteFromFavour)
        // calc()
        
    }
    if(checkToUpdateItem){
        let updateID = e.target.getAttribute("update-item")
        updateItem(updateID)
    }
   
})
//****delete item from main data and from localstorage**** */
function deleteItem(i)
{
  list.splice(i,1);
  localStorage.setItem("books", JSON.stringify(list))
  showDataInTable()
  showMainData()
}
//****edit item from main data to update it**** */
function editeItem(i)
{
    bookName.value = list[i].bookName;
    bookPrice.value = list[i].bookPrice;     
    bookDescription.value = list[i].bookDescription;   
    formPutton.innerHTML="Update"
    formPutton.style.background=("#ffc107")
    formPutton.setAttribute("update-item", `${i}`)
}
//****update item from main data to saved it after change some info from it**** */

function updateItem(i)
{
    let book = {
        bookName: bookName.value,
        bookPrice: bookPrice.value,
        bookDescription: bookDescription.value

    }
    list[i]=book
    localStorage.setItem("books", JSON.stringify(list))
    showMainData()
    showDataInTable()

    formPutton.innerHTML="Add"
    formPutton.style.background=("#0d6efd")
    formPutton.removeAttribute("update-item")
}
//****add item to cart page**** */
 function addToCart (i){
    if(isItemInCart() == false){
    let cartItem ={
        cartBookID:i,
        cartBookName:list[i].bookName,
        cartBookPrice:list[i].bookPrice,
        cartBookDescript:list[i].bookDescription,
    }
    cartList.push(cartItem)
    localStorage.setItem("cart", JSON.stringify(cartList))
    calc()
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${list[i].bookName} added to cart`,
        showConfirmButton: false,
        timer: 1500
      });
}else{
    Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${list[i].bookName} already added to cart`,
        showConfirmButton: false,
        timer: 1500
      });
     }
 }

//****add item to favourite page**** */
 function addToFavourList (i){
    if(isItemInFavourList() == false){
    let favourItem ={
        favourBookID:i,
        favourBookName:list[i].bookName,
        favourBookPrice:list[i].bookPrice,
        favourBookDescript:list[i].bookDescription,
    }
    favourList.push(favourItem)
    localStorage.setItem("favourItem", JSON.stringify(favourList))
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${list[i].bookName} added to favourites`,
        showConfirmButton: false,
        timer: 1500
      });
}else{
    Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${list[i].bookName} already added to favourites`,
        showConfirmButton: false,
        timer: 1500
      });
}
 }

//****show cart items in cart page**** */
 function showCartItems(){
    let items = ""
    for (let i = 0; i < cartList.length; i++) {
       items += `
       <div class="card mb-3 bg-dark col-md-12">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="./imgs/9e175870df16e1a54f3259f4b7354bba.jpg" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title text-primary">${cartList[i].cartBookName}</h5>
        <p class="card-text text-danger">price: ${cartList[i].cartBookPrice} L.E</p>
        <p class="card-text"><small class="text-muted">${cartList[i].cartBookDescript}</small></p>
         <button class="btn btn-danger" delete-item-from-cart="${[i]}">Delete</button>
        </div>
    </div>
  </div>
</div>
       `
       document.querySelector(".row").innerHTML = items
       
    }
}
//****show favourite items in favourite page**** */
function showFavouriteItems(){
    let favourItems = ""
    for (let i = 0; i < favourList.length; i++) {
       favourItems += `
       <div class="card mb-3 bg-dark col-md-12">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="./imgs/9e175870df16e1a54f3259f4b7354bba.jpg" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title text-primary">${favourList[i].favourBookName}</h5>
        <p class="card-text text-danger">price: ${favourList[i].favourBookPrice} L.E</p>
        <p class="card-text"><small class="text-muted">${favourList[i].favourBookDescript}</small></p>
        <button class="btn btn-danger" delete-item-from-favour="${[i]}">Delete</button>
        </div>
    </div>
  </div>
</div>
       `
       document.querySelector(".row").innerHTML = favourItems
    }
}


//****check if already added item to cart page or not**** */
function isItemInCart(){
    for (let i = 0; i < cartList.length; i++) {
        if(cartList[i].cartBookID == idCart)
        {
            return true
        }
    }
    return false
}

//****check if already added item to favourite page or not**** */
function isItemInFavourList(){
    for (let i = 0; i < favourList.length; i++) {
        if(favourList[i].favourBookID == idFavour)
        {
            return true
        } 
    }
    return false
}

//****delete item from cart list **** */
function deleteItemFromCart(i)
{
    cartList.splice(i,1);
  localStorage.setItem("cart", JSON.stringify(cartList))
  showCartItems()
  console.log(cartList.length)
  if(cartList.length != 0){
    total += -cartList[i].cartBookPrice
  }else if(cartList.length == 0){
    showHomePage()
  }
  calc();
  document.querySelector(".total").innerHTML=`${total} L.E`
  console.log(total)
}
//****delete item from favour list **** */
function deleteItemFromFavour(i)
{
    favourList.splice(i,1);
  localStorage.setItem("favourItem", JSON.stringify(favourList))
  showFavouriteItems()
   if(favourList.length == 0){
    showHomePage()
  }
}

//****show home page**** */
function showHomePage(){
    contentPage.innerHTML=`
        <section>
            <div class="container text-center mt-5">
              <div class="row gy-3">

              </div>
            </div>
        </section>
    `
}