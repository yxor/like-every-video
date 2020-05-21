const likeCallback = async() => {
  // main controller, checks if youtube is open and if it is and the video is not liked 
  // or dislike already it likes it.
    
  // wait for like and dislike buttons to show
  const waitFor = (selector, interval) => {
    return new Promise((res, rej) => {
        waitForElementToDisplay(selector, interval);
        function waitForElementToDisplay(selector, time) {
            if (document.querySelectorAll(selector) != null) {
                res(document.querySelectorAll(selector));
            }
            else {
                setTimeout(function () {
                    waitForElementToDisplay(selector, time);
                }, time);
            }
        }
    });
  }

  // get a list with like and dislike button. (like is first and dislike is second)
  const [likeButton, dislikeButton] = await waitFor("#top-level-buttons > ytd-toggle-button-renderer", 600);

  const is_rated = likeButton.classList.contains("style-default-active" ) || dislikeButton.classList.contains("style-default-active" );

  // if the video is already rated then do nothing
  if(!is_rated){
    // click like
    likeButton.click();
  };
}

let enabled = true;
browser.storage.sync.get("enabled", (state) => {
  enabled = state.enabled;
});

browser.storage.onChanged.addListener( async(changes, areaname) => {
  enabled = changes.enabled.newValue;
  if(enabled)
    await likeCallback();

})

const target = document.querySelector('title');

const config = { attributes: true, childList: true, subtree: true };

const observer = new MutationObserver(async (mutations, observer) => {
  if(enabled)
    await likeCallback();
});

window.onload = async () => {
  if(enabled)
    await likeCallback();
};

// Start observing the title changes
observer.observe(target, config);
