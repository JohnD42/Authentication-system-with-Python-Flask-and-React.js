.My first full stack JWT authentication application
A new user can be registered using the sign-up link on the front page of the front end. After registering with valid information, the user will be redirected to the login page.
Once the user logs in, a JWT authentication token is sent to the front end from the back end API, and stored both in Flux and as a cookie. 
This allows the user to access information which is specific to that user on the /private route.The user is immediately redirected to this route. 
The user now has the option to sign out with the link in the navbar, clearing the JWT access token from cookies and the Flux/Context store.
Then, the user is redirected to home, and can sign up or log in again. The /private route will redirect the user to login if they are not logged in, without showing any private information.
