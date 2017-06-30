# escape2

> An electron-vue project

Built by [Doug Cone](https://dougcone.com) for Synergy Mill's first birthday party. App was one piece of a series of puzzles in the escape room featured at the party. The app was run in kiosk mode on a raspberry pi, deployed via Resin.io.

The app contains a username/password which was hidden on a sticky note underneath the keyboard provided in the room. Once the login is passed a simple email screen is presented with a clue hidden in the emails to help players decrypt the lock for the room.

The app also uses an Express server and Websockets to provide a remote control for starting/stopping the timer and resetting the app back to the login screen. Websockets are used to push the current time back to the remote app so the operator can see how much time is remaining.

Check out the video describing the room on [YouTube](https://youtu.be/xZ_W-WAhSOw)

Screenshots:
![screenshot 1](https://github.com/nullvariable/escape2/raw/master/screenshot1.png "screenshot1")
![screenshot 2](https://github.com/nullvariable/escape2/raw/master/screenshot2.png "screenshot2")

### Todo / Wishlist
Originally the goal was to leverage johnny-five to operate a digital countdown timer inside the room, possibly also an audio warning of the remaining time.

Also a cool feature to add would've be the ability to "echo" the screen, or show the current location on the remote so that the operator could see where the players were in the system.

Add or subtract a minute from the remote.


#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


# lint all JS/Vue component files in `src/`
npm run lint

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
