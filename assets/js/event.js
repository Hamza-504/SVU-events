function createEventCard(event){
    return `
    <div class="card p-5">
        <img src="${event.image}" alt="${event.title}">
        <div class="text-info">
            <h3 class="title">${event.title}</h3>
            <p>${event.description}</p>
            <p>المكان: ${event.location}</p>
            <p>التصنيف: <span class="category">${event.categorey}</span></p>
            <h4>${event.date}</h4>
        </div>
    </div>
    `;
}
function copyLink() {
  const url = window.location.href;

  navigator.clipboard.writeText(url)
    .then(() => {
      alert("Link copied: " + url);
    })
    .catch(err => {
      console.error("Failed to copy:", err);
    });
}

function getEventId() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
}

function displayEventDetails() {
    const container = document.getElementById("eventContent");
    const id = getEventId();
    
    if (!id) {
        document.getElementById('eventTitle').textContent = "لم يتم تحديد فعالية";
        return;
    }

    const event = eventsData.find(e => e.id === id);

    showRelatedEvents(event);

    if (!event) {
        document.getElementById('eventTitle').textContent = "الفعالية غير موجودة";
        return;
    }
    
    container.innerHTML = `
                <div class="event-img ms-4 col-lg-6 col-md-6 col-sm-12 position-relative">
                    <img src="${event.image}" alt="${event.title}" class="w-100 position-absolute top-50 start-50 translate-middle">
                </div>
                <div class="info p-4 col-lg-6 col-md-6 col-sm-12">
                    <h2 class="fw-bold py-4">${event.title}</h2>
                    <p class="m-0">${event.longDescription}</p>
                    <div class="event-details row gap-3 px-4 ">
                        <a class="d-flex" href=""><i class="fa-solid fa-location-dot"></i>${event.location}</a>
                        <a class="d-flex" href=""><i class="fa-solid fa-calendar-days"></i>${event.date}</a>
                        <a class="d-flex" href=""><i class="fas fa-bars"></i>${event.categorey}</a>
                        <a class="d-flex" href=""><i class="fa-solid fa-hourglass-half"></i>${event.time}</a>
                    </div>
                        <div class="event-btn row p-4 justify-content-between text-center">
                            <a onclick="copyLink()" class="col-5" href=""><i class="fa-solid fa-share-nodes"></i></a>
                            <a class="col-5" href=""><i class="fa-regular fa-calendar-plus"></i>أضف إلى التقويم</a>
                            <img src="${event.map}" alt="${event.title}" class="w-100 h-100 p-4">
                        </div>
                    </div>
                </div>
                `

}
// تشغيل الدالة
document.addEventListener('DOMContentLoaded', displayEventDetails);


// related events
function showRelatedEvents(currentEvent) {
    const container = document.getElementById('relatedEventsContainer');
    if (!container) return;


    const related = eventsData
        .filter(event => 
            event.id !== currentEvent.id &&
            event.categorey === currentEvent.categorey
        ); 
    if (related.length === 0) {
        container.innerHTML = `<p>لا توجد فعاليات ذات صلة حالياً.</p>`;
        return;
    }
    
    container.innerHTML = related.map(event => `<div class="r-event col-4 rounded-4 bg-white p-0">
        <img src="${event.image}" alt="${event.title}" class="w-100 rounded-top-4">
        <div class="text-info py-4 text-center">
            <h3 class="title">${event.title}</h3>
           <p>${event.description}</p>
            <p><span class="title">المكان: </span> ${event.location}</p>
            <p><span class="title">التصنيف:</span> <span class="category">${event.categorey}</span></p>
            <h4 >${event.date}</h4>
            <a href="event.html?id=${event.id}"><button id="btn-details" class="btn btn-secondary">التفاصيل</button></a>
        </div>
    </div>
    `).join('');
}
