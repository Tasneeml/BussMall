'use strict';

var picContainer = document.getElementById('pic-container');
var left = document.getElementById('left');
var center = document.getElementById('center');
var right = document.getElementById('right');
var listResults = document.getElementById('list');

var allProducts = [];
var totalClicks = 0;
var maxClicks = 25;
var previousImgs = [];
var previousShown = [];
var listFinal = [];
var percentageData = [];


var productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'tauntaun',
  'wine-glass', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'unicorn',
  'usb', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'water-can'];


function saveProductsToLocalStorage(allProducts){
  localStorage.allProducts = JSON.stringify(allProducts);
  console.log('Saved to local storage');
}


function Product(name, id, path) {
  this.name = name;
  this.productID = id;
  this.views = 0;
  this.clicks = 0;
  this.path = 'img/' + name + '.jpg';
}


Product.prototype.avgClicks = function(){
  var percentage = 100 * (this.clicks / this.views);
  this.percentage = percentage;
};



function createProducts(){
  for(var i = 0; i < productNames.length; i++){
    var name = productNames[i];
    var newItem = new Product(name);
    allProducts.push(newItem);
  }
}

if(localStorage.allProducts){
  allProducts = JSON.parse(localStorage.allProducts);
}else{
  createProducts();
}

function randomNum(){
  return Math.floor(Math.random() * productNames.length);
}; 

function generateImg(){
  var leftIndex = randomNum();
  var centerIndex = randomNum();
  var rightIndex = randomNum();

  console.log('Left Index:' + leftIndex);
  console.log('Center Index:' + centerIndex);
  console.log('Right Index:' + rightIndex);

  
  while(previousImgs.includes(leftIndex)){
    var leftIndex = randomNum();
    console.log('new left:' + leftIndex);
  }
  
  while(centerIndex === leftIndex || previousImgs.includes(centerIndex)){
    var centerIndex = randomNum();
    console.log('new center:' + centerIndex);
  }
  

  
  while(rightIndex === leftIndex || rightIndex === centerIndex || previousImgs.includes(rightIndex)){
    var rightIndex = randomNum();
    console.log('new right:' + rightIndex);
  }
  
  previousImgs = [leftIndex, centerIndex, rightIndex];


  console.log(previousImgs);
  var leftImg = document.createElement('img');
  allProducts[previousImgs[0]].views += 1;
  leftImg.setAttribute('src',[allProducts[previousImgs[0]].path]);
  leftImg.setAttribute('alt',[allProducts[previousImgs[0]].name]);
  picContainer.appendChild(leftImg);
  
  var centerImg = document.createElement('img');
  allProducts[previousImgs[1]].views += 1;
  centerImg.setAttribute('src',[allProducts[previousImgs[1]].path]);
  centerImg.setAttribute('alt',[allProducts[previousImgs[1]].name]);
  picContainer.appendChild(centerImg);
  
  var rightImg = document.createElement('img');
  allProducts[previousImgs[2]].views += 1;
  rightImg.setAttribute('src',[allProducts[previousImgs[2]].path]);
  rightImg.setAttribute('alt',[allProducts[previousImgs[2]].name]);
  picContainer.appendChild(rightImg);
  
}

generateImg();

picContainer.addEventListener('click', handlePicturesOnClick);

function handlePicturesOnClick(event){
  
  console.log(event.target.alt);
  for(var p = 0; p < allProducts.length; p++){
    if(event.target.alt === allProducts[p].name){
      allProducts[p].clicks += 1;
      totalClicks += 1;
    }
  }

  event.preventDefault(); 
  picContainer.innerHTML = '';
  listResults.innerHTML = '';

  console.log('Total clicks:' + totalClicks);
  if(totalClicks < maxClicks){
    for(var q = 0; q < allProducts.length; q++){
      var objectsToPrint = allProducts[q];
      var tagToPrintTo = document.createElement('li');
      tagToPrintTo.textContent = allProducts[q].name + ': ' + allProducts[q].clicks;
      listResults.appendChild(tagToPrintTo);
     
    }
  } else{
    for(var q = 0; q < allProducts.length; q++){
      var objectsToPrint = allProducts[q];
      var tagToPrintTo = document.createElement('li');
      tagToPrintTo.textContent = allProducts[q].name + ': ' + allProducts[q].clicks;
      listResults.appendChild(tagToPrintTo);
      picContainer.removeEventListener('click', handlePicturesOnClick);
      saveProductsToLocalStorage(allProducts);
    }
  }
  generateImg();
}