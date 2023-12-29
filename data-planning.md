This document is to sketch out how data will be stored, populated.


ENTITIES:
- User
- City
- Alert
- Notification


SCHEMAS:
User
- ID
- email
- name
- password

UserCity
- city name
- country
- user id
// This table is used when querying the weather api.
// id column vs having cityName, country and userId as composite key?

WeatherAlert
- id
- city
- country
- alert type (wind, rain...)
- weatherStart (time describing when the extreme weather starts)

Notification
- userId
- WeatherAlertId
- sent bool
// this table is periodically checked to send the notifications


SCHEMASV2:
What if there was a `City`, `UserCity` table?
That way there would be no duplication in the `UserCity` and `WeatherAlert` tables,
currently `cityName` and `country` are duplicated.


DATA:
`User` and `UserCity` tables are populated based on user activity.

`WeatherAlert` is populated using a scheduled job:
1. Every X hours get the distinct (`cityName`, `country`) from `UserCity`
2. Call the `WeatherAPI` for weather alerts using city and country
3. Drop weather alerts that are already happening
   1. Reason: If a hailstorm has already started I can see that myself
4. Populate `WeatherAlert` with the remaining values

`Notification` is also populated using a scheduled job:
1. Every Y hours read the userId's from `User`,
   1. and weatherAlertId's from `WeatherAlert`
2. if these 2 id's are not present in `Notification`, insert them
   1. with sent=false of course


NOTES:
- what about user preferences like notification 
   for only a particular type of weather alert?