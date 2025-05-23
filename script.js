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

  function getCardsPerSlide() {
  if (window.innerWidth >= 992) return 4;
  if (window.innerWidth >= 768) return 2;
  return 1;
  }
  // DYNAMIC TUTORIALS SECTION POPULATION
  const tutorialsCarousel = $("#carouselExampleControls2");
  const tutorialsLoader = $(".loader.video");
  let cardsPerSlide = getCardsPerSlide();
  let totalCards = 0;
  let currentCarouselIndex = 0;
  let cardWidth = 0;


  const loadTutorialsData = (data) => {
    const tutorialsCarouselInner = $("#carouselExampleControls2 .carousel-inner");
    tutorialsCarouselInner.empty();

      let itemHtml = `<div class="carousel-item active"><div class="row cards-row flex-nowrap" style="transition: transform 0.5s;">`;
      // Create a card per data in dataset
      data.forEach(card => {
        itemHtml += `
          <div class="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center justify-content-lg-center">
            <div class="card">
              <img src="${card.thumb_url}" class="card-img-top" alt="video-thumbnail" />
              <div class="card-img-overlay text-center">
                <img src="images/play.png" alt="play" width="64px" class="align-self-center play-overlay" />
              </div>
              <div class="card-body">
                <h5 class="card-title font-weight-bold">${card.title}</h5>
                <p class="card-text text-muted">${card['sub-title']}</p>
                <div class="creator d-flex align-items-center">
                  <img src="${card.author_pic_url}" alt="creator" width="30px" class="rounded-circle" />
                  <h6 class="pl-3 m-0 main-color">${card.author}</h6>
                </div>
                <div class="info pt-3 d-flex justify-content-between">
                  <div class="rating">
                    ${'<img src="images/star_on.png" alt="star-on" width="15px" />'.repeat(card.star)}
                    ${'<img src="images/star_off.png" alt="star-off" width="15px" />'.repeat(5 - card.star)}
                  </div>
                  <span class="main-color">${card.duration}</span>
                </div>
              </div>
            </div>
          </div>
        `;
      });
      itemHtml += '</div></div>';
      tutorialsCarouselInner.append(itemHtml);
      // Set up sliding logic
      totalCards = data.length;
      // Index of the first visible card
      currentCarouselIndex = 0;
      tutorialsCarousel.removeClass("d-none");

      // Wait for DOM to update, then get card width
      setTimeout(() => {
        const cols = tutorialsCarouselInner.find('.cards-row > div');
        // // Step size: width of one Bootstrap column (including gutter), ensures smooth one-card sliding
        if (cols.length > 0) {
          cardWidth = cols[0].offsetWidth;
          cardsPerSlide = getCardsPerSlide();
          updateCarousel();
        }
      }, 100);
  };

  // Recalculate card width and number of visible cards on window resize,
  // then update the carousel position and arrow states to keep everything responsive.
  $(window).on('resize', function() {
    const cols = $("#carouselExampleControls2 .cards-row > div");
    if (cols.length > 0) {
      cardWidth = cols[0].offsetWidth;
      cardsPerSlide = getCardsPerSlide();
      updateCarousel();
    }
  });

  function updateCarousel() {
    const $row = $("#carouselExampleControls2 .cards-row");
    // Move the row 
    $row.css('transform', `translateX(-${currentCarouselIndex * cardWidth}px)`);
    // Disable/enable arrows when reaching left of right end of carousel checking if 
    $(".carousel-control-prev", tutorialsCarousel).toggleClass('disabled', currentCarouselIndex === 0);
    $(".carousel-control-next", tutorialsCarousel).toggleClass('disabled', currentCarouselIndex >= totalCards - cardsPerSlide);
  }

  // Handle carousel arrow clicks:
  // Move the carousel left or right by one card (step) if not at the end or beginning,
  // and update the carousel position and arrow states accordingly.
  tutorialsCarousel.on('click', '.carousel-control-next', function (e) {
    e.preventDefault();
    if (currentCarouselIndex < totalCards - cardsPerSlide) {
      currentCarouselIndex++;
      updateCarousel();
    }
  });
  tutorialsCarousel.on('click', '.carousel-control-prev', function (e) {
    e.preventDefault();
    if (currentCarouselIndex > 0) {
      currentCarouselIndex--;
      updateCarousel();
    }
  });

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