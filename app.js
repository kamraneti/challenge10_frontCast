let productList = getSaveProduct()
let filtered = {title:'' , available:false}
renderProducts(productList, filtered)

document.querySelector("#form-control").addEventListener('submit' , function(e){
    e.preventDefault()

    const title = e.target.elements.addProducts.value
    const exist = (e.target.elements.addAvailable.value == 'true')
    const id = uuidv4()
    const product = {title:title, exist:exist, Id:id}
    
    productList.push(product)
    saveProducts(productList)
    renderProducts(productList, filtered)

    e.target.elements.addProducts.value = ''
    e.target.elements.addAvailable.value = ''
    
})


document.querySelector("#input-search").addEventListener('input' , function(e){
    filtered.title  = e.target.value
    renderProducts(productList, filtered)
})


document.querySelector("#checkProduct").addEventListener("change", function(e){
    filtered.available = e.target.checked
    renderProducts(productList, filtered)
})
