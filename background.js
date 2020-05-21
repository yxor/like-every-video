

const iconsOn = {
    32: "assets/on32.png",
    128: "assets/on128.png"
}

const iconsOff = {
    32: "assets/off32.png",
    128: "assets/off128.png"
}

// extension enabled by default
browser.storage.local.set({"enabled": true});
browser.browserAction.setIcon({path: iconsOn})


// Turn the extension on and off, change the icon and title when doing that.
browser.browserAction.onClicked.addListener((tab) => {
    // get the old extension state
    browser.storage.local.get("enabled", (state) => {

        // toggle the state of the extension
        browser.storage.local.set({"enabled": !state.enabled});

        // toggle the icon and title 
        const newTitle = (!state.enabled) ? "Like Everything:ON" : "Like Everything:OFF";
        const iconToUse = (!state.enabled) ? iconsOn : iconsOff;

        browser.browserAction.setTitle({title: newTitle});
        browser.browserAction.setIcon({path: iconToUse});
    })
});