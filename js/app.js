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

Horn.prototype.toHtml = function(){
  let $htmlTemplate = $('#horn-template').html();

  let templateRender = Handlebars.compile($htmlTemplate);

  return templateRender(this);
}
Horn.allHorns.forEach(hornObject =>{
  $('#photo-template').append(hornObject.toHtml());
})


//renders each horn to page with descrptions
// Horn.prototype.render = function() {
//   $('main').append('<section class = "clone"></section>');
//   const $hornClone = $('section[class="clone"]');

//   const $hornHtml = $('#photo-template').html();
//   $hornClone.html($hornHtml);

//   //h2
//   //$hornClone.find('h2').text(this.title);
//   //img
//   //$hornClone.find('img').attr('src', this.image_url);
//   //p
//   //$hornClone.find('p').text(this.description);
//   $hornClone.removeClass('clone');
//   $hornClone.addClass(this.keyword);
  
// }

//reads first JSON file then executes loading of horns and list
Horn.readJson = () => {
  $.get('page-1.json', 'json')
    .then(data =>{
      data.forEach( horn =>{
        Horn.allHorns.push( new Horn(horn));
      })
      Horn.allHorns.forEach(hornObject =>{
        $('#photo-template').append(hornObject.toHtml());
      })
    })
    .then(Horn.loadOptions);
}

//reads second JSON file then executes loading of horns and list
Horn.readJson2 = () => {
  $.get('page-2.json', 'json')
    .then(data =>{
      data.forEach( horn =>{
        Horn.allHorns.push( new Horn(horn));
      })
      Horn.allHorns.forEach(hornObject =>{
        $('#photo-template').append(hornObject.toHtml());
      })
    })
    // .then(Horn.loadHorns);
}

//executes render and option list
// Horn.loadHorns = () => {
//   Horn.allHorns.forEach(horn => {
//     horn.render(); 
//   });
//   Horn.loadOptions();
// };

//executes readJSON function
$(() => Horn.readJson());
$(() => Horn.loadOptions());

//loads dropwdown bar with all keyword options
Horn.loadOptions = function() { 
  Horn.allHorns.forEach(horn => {
    if (!dropdownList.includes(horn.keyword)){
      dropdownList.push(horn.keyword);
    }
  })
  dropdownList.forEach(element => {
    $('#horn-select').append('<option class = "optionClone"></option>');
    const optionTag = $('option[class="optionClone"]');
    optionTag.attr('value', element)
    optionTag.text(element);
    optionTag.removeClass('optionClone');
  })
};

//event listener for selecting keyword from option list
$('select[id="horn-select"]').on('change', function () {
  let $selection = $(this).val();
  $('section').hide();
  $(`section[class="${$selection}"]`).show();
  console.log($selection);
})

$('#page-1').on('click', function () {
  $('select').empty();
  $('section').empty();
  Horn.allHorns = []
  Horn.readJson();
})

$('#page-2').on('click', function () {
  $('select').empty();
  Horn.loadOptions();
  Horn.allHorns = [];
  $('section').empty();
  Horn.readJson2();
})

