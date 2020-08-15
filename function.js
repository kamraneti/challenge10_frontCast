
const getSaveProduct = function(){
    let productsJson = localStorage.getItem('product')
    if(productsJson !== null){
        return JSON.parse(productsJson)
    }else{
        return []
    }
}

const saveProducts = function(productList){
    localStorage.setItem('product',JSON.stringify(productList) )
}

const removeProduct = function(id){
    const productIndex = productList.findIndex(function(item){
        return item.id === id
    })
    if(productIndex > -1){
        productList.splice(productIndex,1)
    }
}

const toggleProduct = function(id){
    const product = productList.find(function(item){
        return item.id === id
    })
    if(product !== undefined){
        product.exist = !product.exist
    }
}


const renderProducts = function(array, filter){
    let filterProduct =array.filter(function(item){
        return item.title.toLowerCase().includes(filter.title.toLowerCase())
    })

    filterProduct = filterProduct.filter(function(item){
        if(filtered.available){
            return item.exist
        }else{
            return true
        }
    })
        document.querySelector("#showProduct").innerHTML = ''
        filterProduct.forEach(function(item){
            document.querySelector("#showProduct").appendChild(creatProductsDomb(item))
        })
}

const creatProductsDomb = function(product){
    const productEl = document.createElement('div')
    const checkbox = document.createElement("input")
    const productItem = document.createElement("span")
    const removeButton = document.createElement("button")

    checkbox.setAttribute("type" , "checkbox")
    checkbox.checked = !product.exist
    checkbox.addEventListener("change", function(){
        toggleProduct(product.id)
        saveProducts(product)
        renderProducts(productList, filtered)
    })
        // checkbox.addEventListener("change", function(e){
    //     let change = e.target.checked
    //     if(change ===true){
    //         const filtrue = productList.filter(function(item){
    //             return item.title === product.title
    //         })
    //         filtrue.forEach(function(item){
    //             item.exist = false
    //             saveProducts(productList)
    //         })
    //     }else if(change === false){
    //         const filfals = productList.filter(function(item){
    //             return item.title === product.title
    //         })
    //         filfals.forEach(function(item){
    //             item.exist = true
    //             saveProducts(productList)
    //         })
    //     }
    // })
    
    productEl.appendChild(checkbox)

    productItem.textContent = product.title
    productEl.appendChild(productItem)

    removeButton.textContent = 'remove'
    productEl.appendChild(removeButton)
    removeButton.addEventListener("click" , function() {
        removeProduct(product.id)
        saveProducts(productList)
        renderProducts(productList, filtered)
    })

    return productEl
}
