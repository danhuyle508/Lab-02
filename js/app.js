'use strict';

function Horn(hornObject){
  this.image_url = hornObject.image_url;
  this.title = hornObject.title;
  this.description = hornObject.description;
  this.keyword = hornObject.keyword;
  this.horns = hornObject.horns;
}
let dropdownList = [];

Horn.allHorns = [];

Horn.prototype.render = function() {
  $('main').append('<section class = "clone"></section>');
  const $hornClone = $('section[class="clone"]');

  const $hornHtml = $('#photo-template').html();
  $hornClone.html($hornHtml);

  //h2
  $hornClone.find('h2').text(this.title);
  //img
  $hornClone.find('img').attr('src', this.image_url);
  //p
  $hornClone.find('p').text(this.description);
  $hornClone.removeClass('clone');
}

Horn.readJson = () => {
  $.get('page-1.json', 'json')
    .then(data =>{
      data.forEach( horn =>{
        Horn.allHorns.push( new Horn(horn));
      })
    })
    .then(Horn.loadHorns);
}

Horn.loadHorns = () => {
  Horn.allHorns.forEach(horn => {
    horn.render(); 
  });
  Horn.loadOptions();
};

$(() => Horn.readJson());

Horn.loadOptions = function() { 
  Horn.allHorns.forEach(horn => {
    if (!dropdownList.includes(horn.keyword)){
      console.log(horn.keyword);
      dropdownList.push(horn.keyword);
    }
  })
  console.log(dropdownList);
  dropdownList.forEach(element => {
    $('#horn-select').append('<option class = "optionClone"></option>');
    const optionTag = $('option[class="optionClone"]');
    optionTag.attr('value', element)
    optionTag.text(element);
    optionTag.removeClass('optionClone');
  })
};




