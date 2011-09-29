dister IRC Bot on node.js
=========================
Introduction:
-------------
Start the bot with

    node start.js

Todo - Possibilities:
--------------------
- readme common facts with bot - very helpful for newcomers
	!readme hudson
	!readme git
- deployment status, upon completing integration
	Release 12930219231 has been deployed on .... 
- leave matters, !avail <nick>; <nick> is currently on leave till - xxxx
- !seen <nick>; <nick> was last seen on .... 
- !remind x "Move Kiosk to all-hands area"; <nick>!!!!! - "Move Kiosk to all-hands area"
- "Conference now... xxx dial in to: xxxx with PC 85......"
- Conference rollcall; !conf; <nick> is now in conference; !conflist; list of attendees in conference;
- simple AI for !lunch

Implemented:
------------
#### Bugzilla
Returns non-fixed bugs from Bugzilla, for P1|2|3|4, assigned to username:

    !bugs [PX] [username]

#### Food
Returns food suggestions.

    !food

#### Github
Echo out commits immediately (or almost immediately)

#### Cron
Work in progress

#### Lunch (Deprecated)
Generates a random lunch location based on the added location or adds a new
location

    !lunch [location]


