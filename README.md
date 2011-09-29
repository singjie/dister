dister IRC Bot on node.js
=========================
#Introduction:
Start the bot with

    node start.js

#Todo - Possibilities:
- readme common facts with bot - very helpful for newcomers
	!readme hudson
	!readme git
- deployment status, upon completing integration
	Release 12930219231 has been deployed on .... 
- leave matters, !avail <nick>; <nick> is currently on leave till - xxxx
- !seen <nick>; <nick> was last seen on .... 
- simple AI for !lunch

#Implemented:
## Attend
Keeps a list of those attending certain events:

    !attend <event> [list]

Eg. Team meeting on 27th Sept 2011:

    !attend 27092011

The list of those attended:

    !attend 27092011 list

## Bugzilla
Returns non-fixed bugs from Bugzilla, for P1|2|3|4, assigned to username:

    !bugs [P1|P2|P3|P4] [username]

Eg. Search for all bugs assigned to sjlee

    !bugs sjlee

Eg. Search for all P1 bugs assigned to sjlee

    !bugs P1 sjlee

Eg. Search for all P1 bugs

    !bugs P1

## Hudson
Checks Hudson build status from IRC client:

    !hudson [staging|production|master]

## Food
Returns food suggestions:

    !food

## Github
Notify of new commits immediately (or almost immediately)

## Events
Handle messages to be broadcasted within a certain time, with format similar to
cron:

    !event <day> <hour> <min> <sec> <times> <message>

eg. This will notify us at our conference time, Tuesday, 17:00:00, indefinitely:

    !event 2 17 0 0 -1 "Conference now!"

To check for existing events:

    !events

## Lunch (Deprecated)
Generates a random lunch location based on the added location or adds a new
location

    !lunch [location]
