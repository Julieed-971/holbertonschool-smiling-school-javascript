$(document).ready(function () {
  // DYNAMIC QUOTES SECTION POPULATION
  const quotesCarousel = $("#carouselExampleControls");
  const quotesLoader = $(".loader");

  const loadQuotesData = (data) => {
    const quotesCarouselInner = $("#carouselExampleControls .carousel-inner");
    for (let i = 0; i < data.length; i++) {
      const quoteItemHtml = `<div class="carousel-item${i === 0 ? ' active' : ''}""  id="carousel-quotes">
                <div class="row mx-auto align-items-center">
                  <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                    <img
                      src="${data[i].pic_url}"
                      class="d-block align-self-center"
                      alt="Carousel Pic ${i + 1}"
                    />
                  </div>
                  <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
                    <div class="quote-text">
                      <p class="text-white">
                        ${data[i].text}
                      </p>
                      <h4 class="text-white font-weight-bold">${data[i].name}</h4>
                      <span class="text-white">${data[i].title}</span>
                    </div>
                  </div>
                </div>
              </div>
      `
      quotesCarouselInner.append(quoteItemHtml);
    }
  }

  const loadQuotes = () => {
    quotesCarousel.addClass("d-none");
    quotesLoader.addClass("show");
    $.ajax({
      type: "GET",
      url: "https://smileschool-api.hbtn.info/quotes",
      dataType: "json",
      error: function(xhr, status, error) {
        console.log(xhr.status);
        console.log(error);
        quotesLoader.removeClass("show");
      },
      success: function (data) {
        if (data !== null) {
          loadQuotesData(data);
          setTimeout(() => {
            quotesLoader.removeClass("show");
            quotesCarousel.removeClass("d-none");
          }, 2000);
        }
      }
    });
  }
  loadQuotes();

  // DYNAMIC TUTORIALS SECTION POPULATION
  const tutorialsCarousel = $("#carouselExampleControls2");
  const tutorialsLoader = $(".loader.video");

  const loadTutorialsData = (data) => {
    const cardsPerSlide = 4;
    const tutorialsCarouselInner = $("#carouselExampleControls2 .carousel-inner");
    
    for (let i = 0; i <= data.length - cardsPerSlide; i++) {
      let itemHtml = `<div class="carousel-item${i === 0 ? ' active' : ''}"><div class="row align-items-center mx-auto">`;
      for (let j = 0; j < cardsPerSlide; j++) {
        const card = data[i + j];
        itemHtml += `
          <div class="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-end justify-content-lg-center">
            <div class="card">
              <img src="${card.thumb_url}" class="card-img-top" alt="Video thumbnail" />
              <div class="card-img-overlay text-center">
                <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
              </div>
              <div class="card-body">
                <h5 class="card-title font-weight-bold">${card.title}</h5>
                <p class="card-text text-muted">${card['sub-title']}</p>
                <div class="creator d-flex align-items-center">
                  <img src="${card.author_pic_url}" alt="Creator" width="30px" class="rounded-circle" />
                  <h6 class="pl-3 m-0 main-color">${card.author}</h6>
                </div>
                <div class="info pt-3 d-flex justify-content-between">
                  <div class="rating">
                    ${'<img src="images/star_on.png" alt="star on" width="15px" />'.repeat(card.star)}
                    ${'<img src="images/star_off.png" alt="star off" width="15px" />'.repeat(5 - card.star)}
                  </div>
                  <span class="main-color">${card.duration}</span>
                </div>
              </div>
            </div>
          </div>
        `;
      }
      itemHtml += '</div></div>';
      tutorialsCarouselInner.append(itemHtml);
    }
  };
  const loadTutorials = () => {
    tutorialsCarousel.addClass("d-none");
    tutorialsLoader.addClass("show");
    $.ajax({
      type: "GET",
      url: "https://smileschool-api.hbtn.info/popular-tutorials",
      dataType: "json",
      error: function(xhr, status, error) {
        console.log(xhr.status);
        console.log(error);
        tutorialsLoader.removeClass("show");
      },
      success: function (data) {
        if (data !== null) {
          loadTutorialsData(data)
          setTimeout(() => {
            tutorialsLoader.removeClass("show");
            tutorialsCarousel.removeClass("d-none");
            
          }, 3000);
        }
      }
    })
  }
  loadTutorials();
});