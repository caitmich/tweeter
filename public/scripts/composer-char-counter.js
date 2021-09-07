$(document).ready(function() {

  $('#tweet-text').on('input', function () {
    // console.log(this);  
    const $tweetInput = $(this).val().length;
    console.log(140 - $tweetInput);
    
    const $parentSection = $(event.target).closest('section');
    let $counter = $parentSection.find('.counter');

    $counter.html(140 - $tweetInput);
  })

});