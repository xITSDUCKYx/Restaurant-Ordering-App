import { menuArray } from "/data.js"
import { v4 as uuidv4 } from 'uuid'

const checkout = document.getElementById("checkout")
const modalForm = document.getElementById("modal-form")
let checkoutArray =[]
let checkoutInner =""

document.addEventListener("click", function(e){
  if (e.target.dataset.add){  
      return addCheckoutItem(e.target.dataset.add)
  }
  else if (e.target.dataset.remove){ 
      return removeCheckoutItem(e.target.dataset.remove)
  }
  else if (e.target.id === "checkout-btn")
    displayModal()
})


modalForm.addEventListener("submit", function(e){
     e.preventDefault()
    
    const name = document.getElementById("modal-name").value
    const cardNumber = document.getElementById("modal-card-number")
    const modalCVV = document.getElementById("modal-CVV")
    const payFormData = new FormData(modalForm)
    const fullName = payFormData.get('fullName')   

    document.getElementById("checkout").innerHTML = 
                                `<div class="checkout-comfirmation-wrapper container">
                                    <p class="checkout-comfirmation">Thanks, ${fullName}! Your order is on its way!</p>
                                </div> `
    
    document.getElementById("modal").style.display= "none"
    checkoutArray =[]
    document.querySelector("input").textContent = ""
    document.querySelector("input[type=number]").textContent = ""
})




function displayModal(){
 document.getElementById("modal").style.display= "inline"
}

function addCheckoutItem(foodId){
   
    const targetFoodObj = menuArray.filter(function(food){
        return food.uuid === foodId
    })[0]
    let checkoutItem ={ name: targetFoodObj.name, price: targetFoodObj.price, uuid: uuidv4()}
    
    checkoutArray.push(checkoutItem)
   render()
}


function removeCheckoutItem(foodId){
    
   // find the object the contains the same uuid id in the checkout array
   // remove that object from the checkout array
   // call the render()
   const targetFoodObj = checkoutArray.filter(function(food){
        return food.uuid === foodId
   })[0]
   // this finds location of the array
   const index = checkoutArray.findIndex(x => x.uuid ===foodId)
    // this looks thourgh until it sees it once
   checkoutArray.splice(index,1)
    render()
    
}




function getCheckoutHtml(){
    const totalPrice = checkoutArray.reduce(function (accumulator, food){
        return accumulator + food.price;
    }, 0);
    
    let checkout = ""
    let checkoutInner = ""
    


    if (totalPrice){
         checkoutArray.forEach(function(foodObj){
        checkoutInner +=`
                    <div class="checkout-food-item-container">
                        <p class="checkout-food-item">${foodObj.name}</p>
                        <button class="checkout-remove-btn" data-remove="${foodObj.uuid}">remove </button>
                        <p class="checkout-price">$${foodObj.price}</p>
                    </div>
                `
        
    })
    
    
        checkout = `
                    <div class="checkout-wrapper container">
                        <p class="checkout-title">Your order</p>
                            <div id="checkout-orders">
                                ${checkoutInner}
                            </div>
                        <div class="checkout-price-wrapper">
                            <p class="checkout-price-title">Total Price</p>
                            <p id="checkout-total">$${totalPrice}</p>
                        </div>
                        <button id="checkout-btn">Complete order</button>
                    </div>
    `
    }



 
     
    
    
    
    return checkout
}


function getFoodSelectionHtml() {
    
    
    let foodSelection = ""
    
    menuArray.forEach(function(food){
        let foodContents = `
            ${food.ingredients.join(", ")}
        `
          
        
        foodSelection += `
       <div class="food-wrapper container">
            <div class="food-inner">
                <p class="food-emoji">${food.emoji}</p>
                    <div class="food-details">
                        <h2 class="food-title">${food.name}</h2>
                        <p class="food-contents">${foodContents}</p>
                        <p class="food-price">$${food.price}</p>
                    </div>
            </div>
                <button class="food-btn" data-add="${food.uuid}">+</button>
       </div>
        
        `
    })
    
    return foodSelection
}




function render(){
    document.getElementById("food-selection").innerHTML = getFoodSelectionHtml()
    document.getElementById("checkout").innerHTML = getCheckoutHtml()
}

render()























