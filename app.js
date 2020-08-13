let productList = []

let productsJson = localStorage.getItem('product')

if(productsJson !== null){
    productList = JSON.parse(productsJson)
}
let filtered = {title:'' , available:false}

// add-----------------------------------------

document.querySelector("#form-control").addEventListener('submit' , function(e){
    e.preventDefault()

    const title = e.target.elements.addProducts.value
    const exist = (e.target.elements.addAvailable.value == 'true')

    const product = {title, exist}
    
    productList.push(product)
    
    localStorage.setItem('product',JSON.stringify(productList) )

    render(productList, filtered)

    e.target.elements.addProducts.value = ''
    e.target.elements.addAvailable.value = ''
    
})


// showProducts--------------------------------------------

const render = function(array, filter){
    let filterProduct = array.filter(function(item){
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
        const p = document.createElement("p")
        p.textContent = item.title
        document.querySelector("#showProduct").appendChild(p)
    })
}

render(productList, filtered)

document.querySelector("#input-search").addEventListener('input' , function(e){
    filtered.title  = e.target.value
    render(productList, filtered)
})


document.querySelector("#checkProduct").addEventListener("change", function(e){
    filtered.available = e.target.checked
    render(productList, filtered)
})
