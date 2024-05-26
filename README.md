# Backend API for Register, Login, and Upload Profile Picture (BlendIt)
API for logging in and registering and can upload a profile picture for application use. The backend uses node.js and also uses the Express framework, using several necessary packages such as :

- "@google-cloud/storage"

    This package allows your Node.js application to interact with Google Cloud Storage. You can use it to store and retrieve files, such as profile pictures uploaded by users.

- "bcryptjs"

    bcryptjs is a library for hashing passwords securely. When users register or log in, their passwords should be hashed before storing them in the database. bcryptjs provides a way to securely hash passwords and compare hashed passwords for authentication.

- "dotenv"

    dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. This is useful for storing sensitive information like API keys or database credentials without hardcoding them into your code.

- "express"

    Express is a web application framework for Node.js. It simplifies the process of building web applications and APIs by providing a robust set of features for handling HTTP requests, routing, middleware, and more.

- "express-validator"

    express-validator is a middleware for Express that provides easy validation of user input. It helps sanitize and validate user data to prevent common security vulnerabilities such as SQL injection and cross-site scripting (XSS).

- "jsonwebtoken"

    jsonwebtoken is a package for generating and verifying JSON Web Tokens (JWT) in Node.js. JWTs are commonly used for authentication and authorization in web applications. You can use them to securely transmit information between parties.

- "multer"

    multer is a middleware for handling multipart/form-data, which is commonly used for uploading files in HTML forms. It allows you to parse and handle file uploads easily in Express applications.

- "mysql2"

    mysql2 is a fast MySQL driver for Node.js. It enables your application to interact with a MySQL database, allowing you to perform CRUD operations (Create, Read, Update, Delete) on user data, such as storing user profiles and credentials.

- "nodemon"

    nodemon is a utility that automatically restarts your Node.js application when file changes are detected. This is particularly useful during development, as it eliminates the need to manually stop and restart the server every time you make changes to your code.

## How to use
need to create a `credentials.json` file to store the key from the service account for access to the storage bucket, then you can run the `npm install` command. for the `.env` file you can adjust it to the value used, it can be adjusted to the SQL in Google Cloud and the bucket name used.

## Documentation
- Register
    - URL
        - `/register`
    - Method
        - `POST`
    - Request Body
        - `email` as `string`, must be unique
        - `username` as `string`
        - `password` as `string`, must be at least 6 characters
    - Response
    ```json
    {
        "error": false,
        "message": "User registered"
    }
    ```

- Login
    - URL
        - `/login`
    - Method
        - `POST`
    - Request Body
        - `email` as `string`
        - `password` as `string`, must be at least 6 characters
    - Response
    ```json
    {
        "error": false,
        "message": "Login successful",
        "loginResult": {
            "userId": "user-J0WEK5n55O0=",
            "email": "danar123@gmail.com",
            "username": "testuser",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItSjBXRUs1bjU1TzA9IiwiaWF0IjoxNzE2NzI5NDMwLCJleHAiOjE3MTY3MzMwMzB9.ofbDhvUz_8K9pFdZoF-B-qTfooFzPhbAEUvkCcTX7j4",
            "profilePic": null
        }
    }
    ```
    - Response after upload profile picture
    ```json
    {
        "error": false,
        "message": "Login successful",
        "loginResult": {
            "userId": "user-J0WEK5n55O0=",
            "email": "danar123@gmail.com",
            "username": "testuser",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItSjBXRUs1bjU1TzA9IiwiaWF0IjoxNzE2NzMwNTExLCJleHAiOjE3MTY3MzQxMTF9.047n454gllUpG3q4JtlS9LoFLPfxAx-isna6xFTqiVQ",
            "profilePic": "https://storage.googleapis.com/test-blendit-profilepic/user-J0WEK5n55O0=/profile_picture_1716730501733.jpg"
        }
    }
    ```

- Logout
    - URL
        - `/logout`
    - Method
        - `POST`
    - Request Body
        - nothing
    - Response
    ```json
    {
        "error": false,
        "message": "Logout successful"
    }
    ```

- Upload Profile Pic
    - URL
        - `/upload-profile-picture`
    - Method
        - `POST`
    - Headers
        - `Authorization`: `Bearer <token>`
    - Request Body
        - `photo` as `file`, must be a valid image file
    - Response
    ```json
    {
        "error": false,
        "message": "File uploaded successfully",
        "photoUrl": "https://storage.googleapis.com/test-blendit-profilepic/user-J0WEK5n55O0=/profile_picture_1716730501733.jpg"
    }
    ```

- Delete Profile Pic
    - URL
        - `/delete-profile-picture`
    - Method
        - `DEL`
    - Headers
        - `Authorization`: `Bearer <token>`
    - Request Body
        - nothing
    - Response
    ```json
    {
        "error": false,
        "message": "Profile picture deleted successfully"
    }
    ```

## Image
- register
![img](images/a.png)
- login
![img](images/b.png)
- login after upload profile pic
![img](images/c.png)
- logout
![img](images/d.png)
- Upload Profile Pic
![img](images/e.png)
- Delete Profile Pic
![img](images/f.png)
- Profile Pic Save in Cloud Storage
![img](images/g.png)

# Thanks