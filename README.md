Project iterations:
- [x] get wheather data from a 3rd party api (/)
    - any data, just have access and fetch something at this point
- [x] create cloud infra (google cloud function)
    - create deploy script for the application that is run locally
    - set api key in deploy script, but not as plain text
- [ ] Add some user interaction
    - [ ] User can select city from hardcoded list, temperature is displayed
    - [ ] List of cities is dynamic
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

<br></br>
For each iteration:
- [ ] create automatic tests
    - I don't think test env in CI is necessary

<br></br>
Additional learning objectives:
- [ ] think through logging
    - e.g. you can't log user data, so logging should be aligned to environment (prod, test)
- [ ] use comments where code takes surprising turns
- [ ] as an exercise, create a contract for the weather api that is used for tests and the real api
    https://quii.gitbook.io/learn-go-with-tests/testing-fundamentals/working-without-mocks#the-problem-with-stubs-and-mocks
- [ ] write your own code instead of using the ```jason``` package


<br></br>
for production deployment copy ```incomplete_app.yaml``` as ```app.yaml``` and set the missing values then run ```deploy.bat```