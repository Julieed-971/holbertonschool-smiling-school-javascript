$(document).ready(function () {
  const carousel = $("#carouselExampleControls");
  const loader = $(".loader");

  const loadData = (data) => {
    $(".carousel-item:nth-child(1) img").attr("src", data[0].pic_url);
    $(".carousel-item:nth-child(1) .quote-text p").text(data[0].text);
    $(".carousel-item:nth-child(1) h4").text(data[0].name);
    $(".carousel-item:nth-child(1) span").text(data[0].title)
    $(".carousel-item:nth-child(2) img").attr("src", data[1].pic_url);
    $(".carousel-item:nth-child(2) .quote-text p").text(data[1].text);
    $(".carousel-item:nth-child(2) h4").text(data[1].name);
    $(".carousel-item:nth-child(2) span").text(data[1].title);
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
        console.loaf(error);
        loader.removeClass("show");
      },
      success: function (data) {
        if (data !== null) {
          loadData(data);
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