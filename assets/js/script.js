console.log("JS WORKING!")
// start rendering events .......................
function createEventCard(event){
    return `
    <div class="card">
        <img src="${event.image}" alt="${event.title}">
        <div class="text-info">
            <h3 class="title">${event.title}</h3>
            <p>${event.description}</p>
            <p><span class="title">المكان</span>: ${event.location}</p>
            <p><span class="title">التصنيف:</span> <span class="category">${event.categorey}</span></p>
            <h4>${event.date}</h4>
            <a href="event.html?id=${event.id}"><button id="btn-details">التفاصيل</button></a>
        </div>
    </div>
    `;
}

function renderFeaturedEvents(){
    const container = document.getElementById("featuredContent");
    if (!container) return;

    container.innerHTML = eventsData.slice(0,3).map(event => 
        createEventCard(event)
    ).join('');
}
document.addEventListener('DOMContentLoaded', renderFeaturedEvents);

function renderlatestEvents(){
    const container = document.getElementById("latestEvents");
    if (!container) return;

    container.innerHTML = eventsData.slice(4,9).map(event => 
        createEventCard(event)
    ).join('');
}
document.addEventListener('DOMContentLoaded', renderlatestEvents);

function renderEvents(){
    const container = document.getElementById("eventsContent");
    if (!container) return;

    container.innerHTML = eventsData.map(event => 
        createEventCard(event)
    ).join('');
}
document.addEventListener('DOMContentLoaded', renderEvents);

//end rendering events ..........................


// start Search And Filter .....................
const searchText = document.getElementById("searchText");
const filter = document.getElementById("categories");

let activeMode = "search";

searchText.addEventListener('input', () =>{
    activeMode = "search";
    applySearch();
})


filter.addEventListener('input' , () => {
    activeMode = "filter";
    applyFilter();
})

function applySearch(){
    let currentValue = searchText.value;
    let text = document.querySelectorAll('div.card');
    text.forEach(card  =>{
        if(card.textContent.includes(currentValue)){
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    })
    document.getElementById("categories").value = "عرض الكل"
}

function applyFilter(){
    let catego = filter.value;
    let card = document.querySelectorAll('span.category');
    card.forEach(category =>{
        if(category.textContent.includes(catego)){
            category.parentNode.parentNode.parentNode.style.display = 'block';
        } else if (catego === "عرض الكل"){
            category.parentNode.parentNode.parentNode.style.display = 'block';
        }
        else{
            category.parentNode.parentNode.parentNode.style.display = 'none';
        }
    })
}

//end Search and Filter .......................



//start details button



//end details button