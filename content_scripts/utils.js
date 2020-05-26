// utility functions


/**
 * Waits for the element queried by the selector to appear.
 *
 * @param {string} selector - Selector for the element to wait for.
 * @param {number} interval - Interval of time between each check.
 * @return {Promise} List of elements found.
 */
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


/**
 *  Get the time actually watched by the user.
 * 
 * @param {HTMLVideoElement} video
 * @returns {{total: number, percent: number}}
 */
const getPlayedTime = (video) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/TimeRanges
    let totalPlayed = 0;
    let played = video.played; // get an array of TimeRanges 

    for (let i = 0; i < played.length; i++) {
        totalPlayed += played.end(i) - played.start(i);
    }

    return {
        total: totalPlayed,
        percent: totalPlayed / video.duration * 100
    };
}

