$(document).ready(function() {

  $('#tweet-text').on('input', function () {
    const $tweetInput = $(this).val().length;
    // console.log(140 - $tweetInput);
    
    const $parentSection = $(event.target).closest('section');
    let $counter = $parentSection.find('.counter');

    $counter.html(140 - $tweetInput);
    console.log($counter);
    
    if($tweetInput > 140) {
      $($counter).css('color', 'red');
    } else {
      $($counter).css('color', 'black');

    }

  })

});