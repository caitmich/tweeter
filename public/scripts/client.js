
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready( function () {

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (data) {
      console.log('Success');
      renderTweets(data);
    });
  };

  const renderTweets = function(tweets) {
    // empty container before rendering tweets so you have no doubles
    $("#tweets-container").empty();
    for (dataObj of tweets) {
      // loops through tweets
      const $tweetSection = createTweetElement(dataObj);
      $('#tweets-container').prepend($tweetSection);
    }
  }

  function createTweetElement(tweetData) {
   const name = tweetData.user.name;
   const handle = tweetData.user.handle;
   const avatar = tweetData.user.avatars;
   const words = tweetData.content.text;
   const timePassed = timeago.format(tweetData.created_at);


   const $tweet = $(`<article class="tweetBox">
   <header class="contentBox">
   <div> 
      <img src=${avatar}> </img>
      <p> ${name} </p>
    </div>
    <p> ${escape(handle)}</p>
   </header>
   <div class="midSection">
   <p>${escape(words)}</p>
 </div>
   <footer class="iconSection"> 
   <p>${escape(timePassed)}</p>
        <div class="icons">
          <i class="fab fa-font-awesome-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
   </footer>
   </article>`);

    return $tweet;
  }
    

  $("form").on('submit', (event) => {
    event.preventDefault();

    if (($("#tweet-text").val().length) === 0) {
      return ($(".empty-tweet-alert").slideDown()).fadeOut(5000);
       
    }
    if (($("#tweet-text").val().length) > 140) {
      return ($(".tweet-too-long").show()).fadeOut(5000);
    }

    const $data = $("form").serialize();

    console.log('data:', $data);

      $.post("/tweets", $data).then(() => {
        loadTweets();
        $("#tweet-text").val("");
      });

    })

  
    loadTweets();
    
  })
  
