const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready( function () {

  const renderTweets = function(tweets) {
    for (dataObj of tweets) {
      // loops through tweets
      const $tweetSection = createTweetElement(dataObj);
      $('#tweets-container').append($tweetSection);
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
      <i${escape(avatar)}> </i>
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
        alert("Your tweet is empty!")
    }
    if (($("#tweet-text").val().length) > 140) {
        alert("Your tweet is too long!")
    }

    const $data = $("form").serialize();

    console.log('data:', $data);

      $.ajax({
        method: "POST",
        url: "/tweets",
        data: $data,
        dataType: 'JSON',
      });

    })

      const loadTweets = function() {
          $.ajax('/tweets', { method: 'GET' })
          .then(function (data) {
            console.log('Success');
            renderTweets(data);
          });
        };

    loadTweets();
    
  })
  
