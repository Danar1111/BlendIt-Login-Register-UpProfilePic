# Backend API for Register, Login, and Upload Profile Picture (BlendIt) CheckPoint 3
There is a change to limit the number of photo files sent to 1mb and there is also a bug fix, previously if you already had a profile photo then when you changed the profile photo it would pile up and fill up cloud storage, with this fix the old file will be deleted and will be replaced with a new file, Likewise in the database URL.

## Documentation

### Endpoint
https://vps.danar.site

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
