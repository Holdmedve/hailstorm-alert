Project iterations:
- [x] get wheather data from a 3rd party api (/)
    - any data, just have access and fetch something at this point
- [ ] create cloud infra (google cloud function)
    - create deploy script for the application that is run locally
    - set api key in deploy script, but not as plain text
- [ ] create some visualisation
    - either map, or just text and images for weather types
    - use angular for the frontend
- [ ] add login functionality
    - at this point users can see everything regardless of login
    - save user data e.g. in a postgres db (on gcp)
- [ ] add weather alert functionality
    - extend frontend with additional view/button
    - store data in db for user alerts
    - create recurring job to send alerts to users
        - trigger job with cloud scheduler
        - job checks db and whether data
        - sends users email

For each iteration:
- [ ] create automatic tests
    - I don't think test env in CI is necessary

Additional learning objectives:
- [ ] think through logging
    - e.g. you can't log user data, so logging should be aligned to environment (prod, test)
- [ ] use comments where code takes surprising turns