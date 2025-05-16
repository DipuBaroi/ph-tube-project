function loadCategories(){
    // fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // convert promise
    .then(res => res.json())
    // send data 
    .then(data=>displayCategories(data.categories
))
}

// {
//     "category_id": "1001",
//     "category": "Music"
// }


function displayCategories(categories){
    // get container
    const categoryContainer = document.getElementById('category-container')

    // loop operation on array of object

    for(const cat of categories){
        

    // creat the element
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML =`
        <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `
    // appened the element
    categoryContainer.appendChild(categoryDiv)
    }
}

loadCategories()