# Import data
There are seveal script to generate  and remove entries. Some of them have to be launch in order.

## Country entries
In order to generate the entries for series only is necessary to run the script `add-countries.js`. Get the list of countries from the CSSEGISandData.
Only generate entries for countries no for the regions of these countries.

## Delete entries
In case that it's necessary remove all entries for an specific type only running this script. It's necessary change the `type` of enties that you want to remove. This variable has inside the file

## Time series entries
If you want add entries for the confirmed, recovered and death time series is necessary to run firts the script `generate-dates.js`.
This script generate a file called `dates.js` inside `assets` directory with the new types that would be combined with `schemas/timeSeries.js` in order to add a column for each new date with confirmed, recovered and deatsh information.

After that, it's necessary to run `sanity start`. With that the new schema would be generate and then we can add the new entries running the script `add-timeSeries.js`



