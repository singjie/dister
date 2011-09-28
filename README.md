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
- bugzilla p1 (not sure if implementable)
	<blah blah> updated P1 bug... 
	!bnc#12321 ; http://bugzilla....url [FIXED/OPEN]
- leave matters, !avail <nick>; <nick> is currently on leave till - xxxx
- !seen <nick>; <nick> was last seen on .... 
- !remind x "Move Kiosk to all-hands area"; <nick>!!!!! - "Move Kiosk to all-hands area"
- "Conference now... xxx dial in to: xxxx with PC 85......"
- Conference rollcall; !conf; <nick> is now in conference; !conflist; list of attendees in conference;
- simple AI for !lunch

Implemented:
------------
- !bug <username>
  - Returns non-fixed bugs from Bugzilla, which are assigned to <username>
- !bugp1
  - !bugp1 - Returns non-fixed P1 bugs
- !lunch [location]
  - !lunch - generates a random lunch location based on the added location
  - !lunch <location> - adds a location for lunch
- Github integration
  - Echo out commits immediately (or almost immediately)
