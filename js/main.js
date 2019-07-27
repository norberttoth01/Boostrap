function test() {
  let testim = document.getElementById("testim"),
    testimDots = Array.prototype.slice.call(document.getElementById("testim-dots").children),
    testimContent = Array.prototype.slice.call(document.getElementById("testim-content").children),
    testimLeftArrow = document.getElementById("left-arrow"),
    testimRightArrow = document.getElementById("right-arrow"),
    testimSpeed = 4500,
    currentSlide = 0,
    currentActive = 0,
    testimTimer,
    touchStartPos,
    touchEndPos,
    touchPosDiff,
    ignoreTouch = 30;;

  // Testim Script
  function playSlide(slide) {
    for (var k = 0; k < testimDots.length; k++) {
      testimContent[k].classList.remove("active");
      testimContent[k].classList.remove("inactive");
      testimDots[k].classList.remove("active");
    }

    if (slide < 0) {
      slide = currentSlide = testimContent.length - 1;
    }

    if (slide > testimContent.length - 1) {
      slide = currentSlide = 0;
    }

    if (currentActive != currentSlide) {
      testimContent[currentActive].classList.add("inactive");
    }
    testimContent[slide].classList.add("active");
    testimDots[slide].classList.add("active");

    currentActive = currentSlide;

    clearTimeout(testimTimer);
    testimTimer = setTimeout(function () {
      playSlide(currentSlide += 1);
    }, testimSpeed)
  }

  testimLeftArrow.addEventListener("click", function () {
    playSlide(currentSlide -= 1);
  })

  testimRightArrow.addEventListener("click", function () {
    playSlide(currentSlide += 1);
  })

  for (var l = 0; l < testimDots.length; l++) {
    testimDots[l].addEventListener("click", function () {
      playSlide(currentSlide = testimDots.indexOf(this));
    })
  }

  playSlide(currentSlide);

  // keyboard shortcuts
  document.addEventListener("keyup", function (e) {
    switch (e.keyCode) {
      case 37:
        testimLeftArrow.click();
        break;

      case 39:
        testimRightArrow.click();
        break;

      case 39:
        testimRightArrow.click();
        break;

      default:
        break;
    }
  })

  testim.addEventListener("touchstart", function (e) {
    touchStartPos = e.changedTouches[0].clientX;
  })

  testim.addEventListener("touchend", function (e) {
    touchEndPos = e.changedTouches[0].clientX;

    touchPosDiff = touchStartPos - touchEndPos;

    console.log(touchPosDiff);
    console.log(touchStartPos);
    console.log(touchEndPos);


    if (touchPosDiff > 0 + ignoreTouch) {
      testimLeftArrow.click();
    } else if (touchPosDiff < 0 - ignoreTouch) {
      testimRightArrow.click();
    } else {
      return;
    }

  })
}
const url = 'http://46.101.237.11/json/users.json';
let Testimonial = {
  costumers: [],
  randomSelector(tomb) {
    const newTomb5 = [];
    while (newTomb5.length < 5) {
      let length = tomb.length;
      const index = Math.floor(Math.random() * length);
      console.log(index);
      newTomb5.push(tomb.splice(index, 1)[0]);
    }
    this.selectedCostumers = newTomb5;
    return newTomb5;
  },
  newName(costumer) {
    let name = document.createElement('div');
    $(name).addClass('h4')
      .append(`${costumer.name.first}`);
    return name;
  },
  newGreeting(costumer) {
    let greeting = document.createElement('p');
    $(greeting).append(`${costumer.greeting}`);
    return greeting;
  },
  newImgRow(costumer) {
    let cosImg = document.createElement('div');
    $(cosImg).addClass('img')
      .append(`<img src="${costumer.picture}" alt="">`);
    return cosImg;
  },
  newTestimental() {
    $('#testim-content .active')
      .append(this.newImgRow(this.selectedCostumers[0]))
      .append(this.newName(this.selectedCostumers[0]))
      .append(this.newGreeting(this.selectedCostumers[0]));

    for (let i = 1; i < 5; i += 1) {
      let newDiv = document.createElement('div');
      $(newDiv).append(this.newImgRow(this.selectedCostumers[i]))
        .append(this.newName(this.selectedCostumers[i]))
        .append(this.newGreeting(this.selectedCostumers[i]));
      $('#testim-content').append(newDiv);
    }
    console.log($('#testim-content').html());
  },
  getData(data) {
    this.costumers = data;
    this.randomSelector(this.costumers);
    this.newTestimental();
    test();

  },
  getJson() {
    $.getJSON(url, (data) => {
      Testimonial.getData(data);
    });
  },
};
window.addEventListener('load', Testimonial.getJson);

function scrolledWindow() {
  const nav = document.querySelector('#main-menu');
  const top = document.body.scrollTop || document.documentElement.scrollTop;
  if (top !== 0) {
    nav.classList.add('scrolled-nav')
  } else {
    nav.classList.remove('scrolled-nav')
  }
}
window.onscroll = function () {
  scrolledWindow();
};