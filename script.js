var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 160 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

//Start of Up Arrow
let mybutton = document.getElementById("up-arrow");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
//End of Up Arrow

//To change the agree text
var amountField = document.getElementById("amount");
var startField = document.getElementById("start");
var endField = document.getElementById("end");

function updateSentence() {
  var amount = parseFloat(amountField.value).toFixed(2);
  var startMonth = startField.value;
  var endMonth = endField.value;
  var sentence =
    "I hereby accept to deduct RM" +
    amount +
    " from my account, starting " +
    startMonth +
    " until " +
    endMonth +
    ".";
  document.getElementById("agree-text").innerText = sentence;
}

amountField.addEventListener("input", updateSentence);
startField.addEventListener("input", updateSentence);
endField.addEventListener("input", updateSentence);

updateSentence();

//for user can tick the agreement only after the fill all of other details
var checkbox = document.getElementById("agree");
var requiredFields = document.querySelectorAll("input[required]");

function checkRequiredFields() {
  for (var i = 0; i < requiredFields.length; i++) {
    if (requiredFields[i].value === "") {
      return false;
    }
  }
  return true;
}
function updateCheckbox() {
  var allFieldsFilled = checkRequiredFields();
  checkbox.disabled = !allFieldsFilled;
  document.getElementById("agree-text").style.display = allFieldsFilled
    ? "block"
    : "none";
}
for (var i = 0; i < requiredFields.length; i++) {
  requiredFields[i].addEventListener("input", updateCheckbox);
}
updateCheckbox();
