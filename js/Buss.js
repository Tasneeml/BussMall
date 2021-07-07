'use strict';
function Gproduct(title, src) {
  this.title = title;
  this.src = src;
  this.clickCtr = 0;
  this.shownCtr = 0;
  Gproduct.all.push(this);
}
Gproduct.roundCtr = 0;
Gproduct.roundLimit = 25;
Gproduct.all = [];
Gproduct.container = document.getElementById('conterproduct');

Gproduct.leftImage = document.getElementById('left-imgaes');
Gproduct.centerImage = document.getElementById('center-images');
Gproduct.rightImage = document.getElementById('right-images');
Gproduct.leftTitle = document.getElementById('left-title');
Gproduct.centerTitle = document.getElementById('center-title');
Gproduct.rightTitle = document.getElementById('right-title');

Gproduct.leftObject = null;
Gproduct.centerObject = null;
Gproduct.rightObject = null;

new Gproduct('Bag', 'img/bag.jpg');
new Gproduct('Banana', 'img/banana.jpg');
new Gproduct('Bathroom', 'img/bathroom.jpg');
new Gproduct('Boots', 'img/boots.jpg');
new Gproduct('breakfast', 'img/breakfast.jpg');
new Gproduct('bubblegum', 'img/bubblegum.jpg');
new Gproduct('chair', 'img/chair.jpg');
new Gproduct('cthulhu', 'img/cthulhu.jpg');
new Gproduct('dog-duck', 'img/dog-duck.jpg');
new Gproduct('dragon', 'img/dragon.jpg');
new Gproduct('pen', 'img/pen.jpg');
new Gproduct('pet-sweep', 'img/pet-sweep.jpg');
new Gproduct('scissors', 'img/scissors.jpg');
new Gproduct('shark', 'img/shark.jpg');
new Gproduct('sweep', 'img/sweep.jpg');
new Gproduct('tauntaun', 'img/tauntaun.jpg');
new Gproduct('unicorn', 'img/unicorn.jpg');
new Gproduct('usb', 'img/usb.jpg');
new Gproduct('water-can', 'img/water-can.jpg');
new Gproduct('wine-glass', 'img/wine-glass.jpg');

function renderNewProduct() {
  var forbidden = [Gproduct.leftObject, Gproduct.centerObject, Gproduct.rightObject];

  do {
    Gproduct.leftObject = getRandomProduct();
  } while (forbidden.includes(Gproduct.leftObject))
  forbidden.push(Gproduct.leftObject);
  do {
    Gproduct.centerObject = getRandomProduct();
  } while (forbidden.includes(Gproduct.centerObject))
  forbidden.push(Gproduct.centerObject);
  do {
    Gproduct.rightObject = getRandomProduct();
  } while (forbidden.includes(Gproduct.rightObject));

  Gproduct.leftObject.shownCtr++;
  Gproduct.centerObject.shownCtr++;
  Gproduct.rightObject.shownCtr++;

  var leftProductImageElement = Gproduct.leftImage;
  var centerProductImageElement = Gproduct.centerImage;
  var rightProductImageElement = Gproduct.rightImage;

  leftProductImageElement.setAttribute('src', Gproduct.leftObject.src);
  leftProductImageElement.setAttribute('alt', Gproduct.leftObject.title);
  centerProductImageElement.setAttribute('src', Gproduct.centerObject.src);
  centerProductImageElement.setAttribute('alt', Gproduct.centerObject.title);
  rightProductImageElement.setAttribute('src', Gproduct.rightObject.src);
  rightProductImageElement.setAttribute('alt', Gproduct.rightObject.title);

  Gproduct.leftTitle.textContent = Gproduct.leftObject.title;
  Gproduct.centerTitle.textContent = Gproduct.centerObject.title;
  Gproduct.rightTitle.textContent = Gproduct.rightObject.title;

}
function getRandomProduct() {
  var index = Math.floor(Math.random() * Gproduct.all.length);
  return Gproduct.all[index];
}
function randomInRange(min, max) {
  var range = max - min + 1;
  var rand = Math.floor(Math.random() * range) + min
  return rand;
}
function rendersantence() {
  var up = document.getElementById('ulnew');
  for (var i = 0; i < Gproduct.all.length; i++) {
      addElement ('p', up, rownew )
      var image = Gproduct.all[i];
      var rownew = (image.title +  ' had ' + image.clickCtr +' votes '+ ' and was shown ' +  image.shownCtr + ' times ');
  }
}
function addElement(tag, container, text) {
  var element = document.createElement(tag);
  container.appendChild(element);
  if (text) {
    element.textContent = text;
  }
  return element;
};
function clickHandler(event) {
  var clickedId = event.target.id;
  var ProductClicked;
  if (clickedId === 'left-imgaes') {
    ProductClicked = Gproduct.leftObject;
  } else if (clickedId === 'center-images') {
    ProductClicked = Gproduct.centerObject;
  } else if (clickedId === 'right-images') {
    ProductClicked = Gproduct.rightObject;
  } else {
    alert('Please click on the area of the picture just! *_* ')
  }
  if (ProductClicked) {
    ProductClicked.clickCtr++;
    Gproduct.roundCtr++;

    if (Gproduct.roundCtr === Gproduct.roundLimit) {


      // this is what runs when clicking is done
      alert('No more clicking for you plz!!');
      Gproduct.container.removeEventListener('click', clickHandler);
      rendersantence() ;
renderchart();


    } else {

      // this happens every time we are NOT at the limit
      renderNewProduct();

    }
  }
};
function renderchart() {
  var productArray = [];
  var clickArray = [];
  var ShownArray = [];
  for (let i = 0; i < Gproduct.all.length; i++) {
    var ProductInstent = Gproduct.all[i];
    productArray.push(ProductInstent.title);
    clickArray.push(ProductInstent.clickCtr);
    ShownArray.push(ProductInstent.shownCtr);
  }
  var ctx = document.getElementById('Chart').getContext('2d');
  var chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck ',
        'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'],
      datasets: [
        {
          label: 'Votes ',
          backgroundColor: 'yellow',
          borderColor: 'black',
          data: clickArray,
        },

        {
          label: 'Shown',
          backgroundColor: 'gray',
          borderColor: 'white',
          data: ShownArray,
        }
      ],
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }
          ]
        }
      }
    }
  }
  )
}


Gproduct.container.addEventListener('click', clickHandler);
renderNewProduct();