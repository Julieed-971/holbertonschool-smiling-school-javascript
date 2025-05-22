$(document).ready(function () {
  const carousel = $("#carouselExampleControls");
  const loader = $(".loader");

  const loadQuotesData = (data) => {
    for (let i = 1; i <= data.length; i++) {
    $(`.carousel-item:nth-child(${i}) img`).attr("src", data[i -1].pic_url);
    $(`.carousel-item:nth-child(${i}) .quote-text p`).text(data[i -1].text);
    $(`.carousel-item:nth-child(${i}) h4`).text(data[i -1].name);
    $(`.carousel-item:nth-child(${i}) span`).text(data[i -1].title);
    }
  }

  const loadQuotes = () => {
    carousel.addClass("d-none");
    loader.addClass("show");
    $.ajax({
      type: "GET",
      url: "https://smileschool-api.hbtn.info/quotes",
      dataType: "json",
      error: function(xhr, status, error) {
        console.log(xhr.status);
        console.log(error);
        loader.removeClass("show");
      },
      success: function (data) {
        if (data !== null) {
          loadQuotesData(data);
          setTimeout(() => {
            loader.removeClass("show");
            carousel.removeClass("d-none");
          }, 1000);
        }
      }
    });
  }
  loadQuotes();
});