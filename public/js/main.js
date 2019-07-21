const priceRange = document.querySelector(".price-range");

const colorArray = ["green", " rgb(248, 183, 5)", "red"];
const priceRangeArray = {
  low: 1000,
  moderate: 99999,
  expensive: 9999999999,
  dothis: price => {
    if (
      priceRangeArray.low < priceRangeArray.moderate ||
      (priceRangeArray.expensive && priceRangeArray.moderate > low)
    ) {
      return price;
    }
  }
};

let priceCheck = e => {
  let price = document.getElementById("price").value;
  if (price < priceRangeArray.expensive && price < priceRangeArray.moderate) {
    priceRange.style.backgroundColor = `${colorArray[0]}`;
    priceRange.style.width = `50%`;
  } else if (
    price > priceRangeArray.low &&
    price !== priceRangeArray.moderate
  ) {
    priceRange.style.backgroundColor = `${colorArray[1]}`;
    priceRange.style.width = `100%`;
  }
};
const priceInput = document.querySelector(".price-input");
priceInput.addEventListener("keypress", priceCheck, false);
const signUpBtn = document.querySelector(".signupbtn");

let formValidation = e => {
  //   e.preventDefault();
  let inputFields = document.getElementsByTagName("input");
  inputFieldsArray = [...inputFields];

  inputFieldsArray.forEach(input => {
    if (input.value === "") {
      input.style.outline = "yellow solid 2px";
    }
  });
};

// Modal Toggle
document.querySelector("#toggle").addEventListener("click", function() {
  document.querySelector(".modal").classList.add("active");
});
document.querySelector(".close").addEventListener("click", function() {
  document.querySelector(".modal").classList.remove("active");
});

// Animate on Scroll Initialization

AOS.init();
