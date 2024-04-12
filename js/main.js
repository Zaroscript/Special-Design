let mainColors = localStorage.getItem("color-option");

if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  });
}

// Random Background Option
let backgroundOption = true;
let backgroundInterval;
let backgroundLocalItem = localStorage.getItem("background-option");

if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

if (localStorage.getItem("choosen-img-url")) {
  document.querySelector(
    ".landing-page"
  ).style.backgroundImage = `url("../images/${localStorage.getItem(
    "choosen-img"
  )}.jpg")`;

  document.querySelectorAll(".choose-background li img").forEach((element) => {
    element.parentElement.classList.remove("active");

    if (element.dataset.choosen === localStorage.getItem("choosen-img")) {
      element.parentElement.classList.add("active");
    }
  });
}

// Click On Toggle Settings Gear
document.querySelector(".toggle-settings i").onclick = function () {
  this.classList.toggle("fa-spin");

  document.querySelector(".toggle-settings").classList.toggle("clear");

  document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    localStorage.setItem("color-option", e.target.dataset.color);

    handleactive(e);
  });
});

// Switch Random Background Option
const randomBackEL = document.querySelectorAll(".random-backgrounds span");

randomBackEL.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleactive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;

      localStorage.setItem("background-option", true);

      randomizeImgs();
    } else {
      backgroundOption = false;

      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }

    document.querySelectorAll(".choose-background li").forEach((li) => {
      li.classList.remove("active");
    });
  });
});

// Choose background
document.querySelectorAll(".choose-background li img").forEach((img) => {
  img.addEventListener("click", (img) => {
    document.querySelector(
      ".landing-page"
    ).style.backgroundImage = `url("../images/${img.target.dataset.choosen}.jpg")`;

    document.querySelectorAll(".choose-background li").forEach((li) => {
      li.classList.remove("active");
    });

    img.target.parentElement.classList.add("active");

    localStorage.setItem("choosen-img", img.target.dataset.choosen);
  });
});

let landingPage = document.querySelector(".landing-page");
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Function To randomize Imgs
function randomizeImgs() {
  if (backgroundOption) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      landingPage.style.backgroundImage = `url("../images/${imgsArray[randomNumber]}")`;
    }, 10000);

    document.querySelectorAll(".choose-background li").forEach((li) => {
      li.classList.remove("active");
    });
  }
}

randomizeImgs();

let skills = document.querySelector(".skills");

window.onscroll = function () {
  let skillsOffsetTop = skills.offsetTop;
  let skillsOuterHeight = skills.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.scrollY;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Create PopUp With Image
let ourgallary = document.querySelectorAll(".gallary img");

ourgallary.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      let imgHeading = document.createElement("h3");
      imgHeading.appendChild(document.createTextNode(img.alt));
      popupBox.appendChild(imgHeading);
    }

    let popupImg = document.createElement("img");
    popupImg.src = img.src;
    popupBox.appendChild(popupImg);
    document.body.appendChild(popupBox);

    let closeButton = document.createElement("span");
    closeButton.className = "close";
    closeButton.append(document.createTextNode("X"));
    popupBox.appendChild(closeButton);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className == "close") {
    e.target.parentNode.remove();

    document.querySelector(".popup-overlay").remove();
  }
});

// Generate bullets
function generateBullets() {
  let sections = Array.from(document.querySelectorAll("section"));

  let allBullets = document.createElement("div");
  allBullets.className = "nav-bullets";
  document.body.appendChild(allBullets);

  for (let i = 0; i < sections.length; i++) {
    let bullet = document.createElement("div");
    bullet.className = "bullet";
    bullet.dataset.section = `.${sections[i].className}`;
    allBullets.appendChild(bullet);

    let toolTip = document.createElement("div");
    toolTip.className = "tooltip";
    toolTip.append(
      document.createTextNode(
        document.querySelector(`.${sections[i].className} h2`).innerHTML
      )
    );
    bullet.appendChild(toolTip);
  }
}

generateBullets();

const allBullets = document.querySelectorAll(".bullet");
const allLinks = document.querySelectorAll(".links a");
// Hadle scroll function
function scrollToSomewhere(ele) {
  ele.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

// Handle active status
function handleactive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");

    ev.target.classList.add("active");
  });
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets-option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    }

    handleactive(e);
  });
});

// Reset button
document.querySelector(".reset-option").onclick = function () {
  localStorage.clear();
  location.reload();
};

// Toggle Menu

let toggleMenu = document.querySelector(".toggle-menu");
let links = document.querySelector(".header-area .links");

toggleMenu.onclick = function (e) {
  e.stopPropagation();
  links.classList.toggle("open");
  this.classList.toggle("menu-active");
};

// Click anaywhere outside the menu and toggle button action
document.addEventListener("click", (e) => {
  if (e.target !== toggleMenu && e.target !== links) {
    if (links.classList.contains("open")) {
      toggleMenu.classList.toggle("menu-active");

      links.classList.toggle("open");
    }
  }
});

links.onclick = function (e) {
  e.stopPropagation();
}
