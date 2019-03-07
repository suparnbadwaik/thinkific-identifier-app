# Thinkific Identifier App

The Thinkific Identifier app provides the following functionalities :
1. Sign up :
Allows you to signup as a new user by entering your email and password.
2. Sign in :
Allows you to login the app and generated and view the identifiers
3. View the next identifier :
Generates a new identifier. It basically increments the count by 1.
4. View the current identifier :
Displays the current identifier.
5. Set the identifier value by yourself :
Set a no negative number as your identifiers current value. It would change the current value to this number.
6. View the token :
Displays the token to check the api url from the browser or using curl using this token


# Screenshots present in the repository in the snapshot directory.



# Behind the Scenes :
It accesses the API Gateway using the node api we created using javascript.
Sign up and sign in takes place through the application using AWS Cognito.
