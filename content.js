
const likeCallback = async() => {
  // main controller, checks if youtube is open and if it is and the video is not liked 
  // or dislike already it likes it.
  
  // if were not in a video page there is no need to wait for the like button
  if(!window.location.href.includes("watch"))
    return;

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

browser.storage.local.get("enabled", (state) => {
  enabled = state.enabled;
});

// exectue the callback everytime on/off button is toggled
browser.storage.onChanged.addListener( async(changes, _) => {
  enabled = changes.enabled.newValue;
  if(enabled)
    await likeCallback();

})

const target = document.querySelector('title');

const config = { attributes: true, childList: true, subtree: true };

// execute the callback when the title changes
const observer = new MutationObserver(async (mutations, observer) => {
  if(enabled)
    await likeCallback();
});

// execute the callback when window first loads
window.onload = async () => {
  if(enabled)
    await likeCallback();
};

// Start observing the title changes
observer.observe(target, config);
