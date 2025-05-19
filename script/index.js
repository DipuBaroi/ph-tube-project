function removeActiveClass(){
    const activeButtons = document.getElementsByClassName('active')
    
    for(const btn of activeButtons){
        btn.classList.remove('active')
    }
}

function loadCategories(){
    // fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // convert promise
    .then(res => res.json())
    // send data 
    .then(data=>displayCategories(data.categories
))
}

function loadVideo (){
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data=>{
        document.getElementById('btn-all').classList.add('active')
        displayVideos(data.videos)
    })
}

const loadCategoryVideos = (id) =>{
    url =`
    https://openapi.programming-hero.com/api/phero-tube/category/${id}
    `
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActiveClass()
        const clickedButton = document.getElementById(`btn-${id}`)
         console.log(clickedButton)
         clickedButton.classList.add('active')
        displayVideos(data.category)
       
    })
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
        <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id} )" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `
    // append the element
    categoryContainer.appendChild(categoryDiv)
    }
}

// {
//     "category_id": "1001",
//     "video_id": "aaah",
//     "thumbnail": "https://i.ibb.co/hY496Db/coloer-of-the-wind.jpg",
//     "title": "Colors of the Wind",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/6r4cx4P/ethen-clack.png",
//             "profile_name": "Ethan Clark",
//             "verified": true
//         }
//     ],
//     "others": {
//         "views": "233K",
//         "posted_date": "16090"
//     },
//     "description": "Ethan Clark's 'Colors of the Wind' is a vibrant musical exploration that captivates listeners with its rich, expressive melodies and uplifting rhythm. With 233K views, this song is a celebration of nature's beauty and human connection, offering a soothing and enriching experience for fans of heartfelt, nature-inspired music."
// }

const displayVideos = (videos) =>{
    // get container
    const videoContainer = document.getElementById('video-container');

    
    videoContainer.innerHTML = '';

    if(videos.length === 0){
        videoContainer.innerHTML=`
        <div class="py-20 col-span-4 flex flex-col items-center justify-center">
            <img src="assets/Icon.png" alt="">
            <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
        </div>
        `
        
        return
    }
    // forEach()
    videos.forEach(video=>{
        // console.log(video)

        const videoCard = document.createElement('div')
        videoCard.innerHTML=`
     <div class="card card-compact bg-base-100 ">
                <!-- thumbnail -->
                <figure class="relative">
                    <img class="w-full h-[150px] object-cover" src="${video.thumbnail}" alt="Shoes" />
                    <span class="absolute bottom-2 right-2 bg-black text-white text-sm rounded px-2">3hrs 56 min
                        ago</span>
                </figure>
                <!-- profile and description -->
                <div class="flex gap-3 px-0 py-5">
                    <div class="profile">
                        <div class="avatar">
                            <div class="w-6 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src=${video.authors[0].profile_picture} />
                            </div>
                        </div>
                    </div>
                    <div class="intro">
                        <h3 class="font-semibold text-sm">${video.title} </h3>
                        <p class="text-sm text-gray-500 flex gap-3">${video.authors[0].profile_name} <img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=SRJUuaAShjVD&format=png" alt=""></p>
                        <p class="text-sm text-gray-500">${video.others.views} views</p>
                    </div>
                </div>
            </div>
        `
        // append
        videoContainer.appendChild(videoCard)
    })
    
}

loadCategories()
