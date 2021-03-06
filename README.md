## Overview:

Cuteflix is a Netflix clone for watching cute animal videos


## Features:

### Sign up and Sign in

Pretty standard stuff. There's also a demo sign in button, which creates and signs in to a demo account, with some pre-populated account information. Note that because a new account is created with a complex email address each time the button is pressed (to ensure unique addresses), changes made to the account won't persist between separate demo sessions. If you want things to persist, just create a new account with an email address and password you can remember, rather than using the demo sign in button. 

###My List

Like Netflix, Cuteflix allows users to store videos in a list and watch them later. Videos are added and removed from My List with the blue plus and minus buttons on each tile. Videos in My List appear in the order they were added, with the most recent additions first. My List will persist between sessions for a given user, and is unique to each user. Although a video can appear in multiple places, every appearance of a given video will be consistent with regards to whether or not it is in My List. If a user adds a video in one place, every other appearance of that video will reflect this by switching its plus button to a minus button. 

###Recently Watched

Cuteflix stores the 7 videos a user has most recently watched in the Recently Watched list. 

###Horizontal scrolling

Cuteflix uses an interface similar to Netflix for scrolling. Hovering over the left and right arrows that appear on each slider of videos will scroll through the slider in that direction. However, unlike Netflix, the slider doesn't cycle through videos infinitely, and instead will stop when it reaches the end of the list.

###Watching videos

Clicking on a video image allows users to watch a YouTube embed of the video. The back button returns to the video browsing page. 

###Adding new videos

Clicking on the “Add a new video” tile will expand the tile into a simple form. Entering a YouTube link into this form and submitting will add the video to this slider. This video is added to the global library of videos, and will be available to all other users. More recently added videos will appear first. The form will check that the entered URL is a valid YouTube video and show an error if it isn't, but there is no error handling to check if the video is relevant. For example, a user will get an error for an invalid URL like "facebook.com", but won't get an error for a YouTube link to Gangnam Style, which is not relevant to Cuteflix. 

##Technologies/Frameworks:

The back-end API, as well as Sign in/Sign up, use Ruby on Rails. The front-end uses Javascript and Backbone.js, as well as jQuery for some user interaction. Cuteflix is deployed on Heroku.

##Future Todos:

There are a number of additions I'd like to make when I find the time.

###Video queues

Users should be able to add videos to a queue. When a video is over, the following video in the queue plays automatically. When the last video in the queue is over, the user is taken back to the video browsing page. I'd also like to get pretty fancy with UI, using a drag-and-drop interface in which users can drag a video tile into a persistant bar on the bottom of the page to add to the queue, and drag videos within this bottom bar to re-order the queue.

###Cleaning up user accounts

Since the demo sign in button creates a new account, it's possible for the number of accounts to grow quite quickly. Meanwhile, users can't log back in to a demo account, because the email address is intentionally complex. This means that there will be lots of unusable demo accounts filling up the database. I'd like to use Heroku scheduler to clean up these accounts on a regular interval (perhaps every 48 hours), to keep the size of the user accounts table reasonable.

###Tourguide

I'd like to add a simple tourguide that outlines Cuteflix's basic features when a new user logs in. 

###Error handling for duplicate videos

Currently, if a user tries to add a new video that's already in the database, things break pretty badly. I want to implement better error handling for this, and good feedback for the user when this happens. Ideally, this feedback should include a button that takes the user directly to the Cuteflix version of the video they are trying to add.

