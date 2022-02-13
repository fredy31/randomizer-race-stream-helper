# Randomiser Race Stream Helper #

*URL of the website:* http://speedrun-randomizer-helper.fredericpilon.com/

Hello!

This is a tool I built after there seemed to be some problems with the randomisers trackers on AGDQ 2022. (And I needed something to train my react with.)

I'm not a speedrunner myself, so if there is some features that would better the experience, tell me about it by contacting /u/fredy31 on Reddit, or put in a bug request on this Github.

## Features ##
- Automatic Room creation (You can put in a custom name too!)
- A control to change the key color, so the one streaming the event can put a greenscreen on, and the players can put a black background that is easier for the eyes.
- Item sets for easy setup (Have an item/item set to add? Contact me with the instructions above!)

## Wanna setup on your own server? ## 

Go ahead! This has a configuration file to make it easy.

1- Checkout the whole project on your PC.
2- Create yourself an account with Google Firebase
3- In `/src/config.tsx`, put in the API information to connect to your account instead of mine (this can be used to have a more secure database for your rooms)
4- You may add items/item sets in that config also
5- At this point, you will need node. Run NPM I at the root of the projet to install everything you will need.
6a- You can run the site locally by doing `npm run start`.
6b- You can run the site online by doing `npm run build` and then uploading the build folder anywhere.

## Wanna contribute? ##

Like I said before, this was, for me, a project to learn react and typescript. If you have any toughts about how the code could be better, or find any bugs, please tell me with the above contact information.
