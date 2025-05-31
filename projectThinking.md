# How i am thinking to do this project

* first create the two folder for seprate code for frontend and backend.
* first starting with backend because frontend will expect some data from our backend server so why not first create the backend.
* so starting with backend.

## Starting with backend

* step 1 -> setting basic server setup like .dotenv , mongoose , db on atlas etc..not the authentication right now.
* step 2 => thinking to create at least three schema like for user,comments and videos.
* step 3 -> right now what i will do i will create all crud operation for each collection inorder to test the api back-and-forth. later if changes required we will do ...
* step 4 -> once crud is done then i will try to implment the authentication part user signin sign out ....

---

## step 1 is done

## step 2 => thinking about creation of schema

* now what i am thinking is suppose there is a user and it has channel and that channel will have videos and all videos will have comment so why not make then reference to each other becuase whenever i will need the user info like its channel , video etc i can directly do like db.findById(userId).populate(channel) etc.
* that means we need to create the chanel scheama seprately.
* now while creating these schema we will set reference. like user will have reference to Channel collection, Channel collection will have reference to Video collection and Video collection will have refrence to Comment collection

* usercollection

```json
{
  "_id": "user01_id",
  "username": "JohnDoe",
  "email": "john@example.com",
  "password": "hashedPassword123",
  "avatar": "https://example.com/avatar/johndoe.png",
  "channel": "channel01_id"   <-- Reference to Channel
}
```

* channel collection

```json
{
  "_id": "channel01_id",
  "channelName": "Code with John",
  "description": "Coding tutorials and tech reviews by John Doe.",
  "channelBanner": "https://example.com/banners/john_banner.png",
  "owner": "user01_id",       <-- Reference to User
  "subscribers": 5200,
  "videos": ["video01_id", "video02_id"]  <-- References to Videos
}

```

* video collection

```json
{
  "_id": "video01_id",
  "title": "Learn React in 30 Minutes",
  "thumbnailUrl": "https://example.com/thumbnails/react30min.png",
  "description": "A quick tutorial to get started with React.",
  "channel": "channel01_id",     <-- Reference to Channel
  "views": 15200,
  "likes": 1023,
  "dislikes": 45,
  "uploadDate": "2024-09-20T00:00:00Z",
  "comments": ["comment01_id"]   <-- References to Comments
}

```

* comments collection

```json
{
  "_id": "comment01_id",
  "text": "Great video! Very helpful.",
  "userId": "user02_id",       <-- Reference to commenter (User)
  "timestamp": "2024-09-21T08:30:00Z"
}
```

## Forward vs Backward References — Explained Separately with Use Cases

---

## Forward References

### What is it?  

A reference from a **parent document** to its **child documents** or related data is called setting forward reference.

### Use Case  

* When the parent needs to keep track of all its children or related items.  

* Typically used in **one-to-many** or **one-to-one** relationships.

### Examples  

* **User → Channel:** User has a `channel` field referencing their channel.  

* **Channel → Videos:** Channel has an array of `videos` ObjectIds to all videos it owns.  
* **Video → Comments:** Video has an array of `comments` ObjectIds to all comments on it.

### Why use it?  

* Easily get all child documents from the parent in one query. like using populate.

* Efficiently display lists or collections belonging to a parent.

---

## Backward References

### What it is?

A reference from a **child document** back to its **parent document** or related entity.

### Use Case of Backwrd Reference

* When a child needs to know which parent or owner it belongs to.  

* Useful for querying the parent directly from the child.  
* Often used in **many-to-one** relationships.
* **useCase:** when we want to display the user profile along with their channel information in one query.

### Examples of Backwrd Reference

* **Channel → User:** Channel has an `owner` field referencing the User who owns it.  

* **Video → Channel:** Video has a `channel` field referencing the Channel it belongs to.  
* **Comment → User:** Comment has a `userId` field referencing the User who posted it.

### Why we need to use it?

* Quickly find the parent or owner of a child.  

* Simplify authorization and ownership checks.  
* Populate parent details when accessing child data.
* **useCase :** When showing a video page,we might want to display details about the channel that owns this video.

---

## Summary Table

| Reference Type    | Direction        | Typical Use Case                          | Example                   |
|-------------------|------------------|------------------------------------------|---------------------------|
| **Forward**       | Parent → Child   | Parent tracks its children or related docs | User → Channel, Channel → Videos |
| **Backward**      | Child → Parent   | Child knows its parent or owner          | Video → Channel, Comment → User   |

---

This way, we get **flexible querying** and **easy population** of related data both ways.

---

* ### `(1) userSchema`

  * so userScheam -> User collection using this userSchema we will create this User collection..
  * a typical userSchema wil lahve userName , email , password, avatar , channelname.. where usr will have reference to channel.

* ### `(2) channelSchema`

  * so channelSchema -> Channel collection will have like channel name , description , a url for channel banner, a backword reference to owner like userId, no of subscriber. and a forward reference to video that how much video this chanel have.

* ### `(3) video schema`

  * a video scheam will ahve like title , upload date , and a backword reference to which channel it belongs , and a forwarrd reference like what all comments it have , and views , likes dislikes etc.

* ### `(4) comment schema`

  * a comment section will ahve some text , a backword reference to user who posted this comment , and a upload date or when this comment was posted etc.

---

## `STep 3 : what i am doing right now is creating the all crud operation for each collection for just sake of testing and later we will see what actually is requried or not`

* ### `(1) Starting with User collection`

  * for User collection or when the api is like this localhost:port/api/user/login -> then login , /signup -> then for signup , /  or /users-> fetch all users, /users/:id -> to get user , /user/:id -> to update user , /user/:id -> delete user...
  * **we will need the logout functionality but let's see it later**
  * we also need to do verification of token that is being sent in the request...

  * **we also need to do the if user already registered or not ... like if user exist then return a message. same for login also once the user is logeed in generate a token and when usesr try to login again before logout thne send a error**

* ### `(2) starting with .. another collection || channel collection`

  * a channel collection will have channel name , description ,channel banner , owner , subsscriber , video etc..........
  * but in functionality we will protect these routes because only logined user can create channell...
  * **functionality we need**

    * `(1) create a channel` post req api will be like -> localhost:port/api/channel
    * `(2) get chanel by id` Get request  GET /api/channel/:id
    * `(3) get chanel by userId` get request   GET /api/channel/user/:userId
    * `(4) update channel` -> put request   PUT /api/channel/:id
    * `(5) delete dchannel` -> delete request.  DELETE /api/channel/:id

* **functionality we need in channel collection**

  * `(1) create a channel` post req api will be like -> localhost:port/api/channel
    *? we are creating a addition get request to fetch all chanel for my testing purpose...
  * `(2) get chanel by id` Get request  GET /api/channel/:id
  * `(3) get chanel by userId` get request   GET /api/channel/user/:userId
  * `(4) update channel` -> put request   PUT /api/channel/:id
  * `(5) delete dchannel` -> delete request.  DELETE /api/channel/:id

    ** we will need one more function which will find the channel by the userid or owner id.. using this function in service we will get to know does current user which want to create a channel does it have any channel or not...

* ### `(3) started with video collection`

  * (1) first we need to create a function to upload the video or create the video -> /api/video/ -> post request..
  * (2) another function to get all video -> /api/video -> get request.
  * (3) getVideoById -> /api/video/videoId -> get request.
  * (4) get all video by channel id -> since our channel has a backword reference to we can know who is the owner of this channel. -> /api/video/channel/channelId -> get request.
  * (5) update video -> we will see later what we need to allow for update
  * (6) delete video ->

  these all the main route that we need but we need also ...checkVideoOwnerShip() function..

  * similarly we need addVideoTochannel in channelREpository , removeVideoFrom channel in channelReopository and checkChannelOwnership functions.

* ### `(4) started with comment collection`

  * here we are not implementing the nested comment feature ... because it will become too complex so we will create it in version 2 of this project like a new addon feature..

  * **we need to create**
  * we can go for /:id but just to make it more clear ... or check in fronted .. if its fine with commentId then go for it else we will change to id ... (check later)
  * (1) create comment -> /api/comment/:videoId
  * (2) get comment by video id -> /api/comment/:videoId
  * (3) update comment by comment id -> /api/comment/:commentId
  * (4) delete comment by comment id -> /api/comment/:commentId
  * **additional we need one function for adding comment in video and one function for removing comments from video**

---

* there are some feature left like **search video** , **like , dislike , subscribe** we will do it later like mostely once we do the mvp of our project.
* **keep in mind we need to add a validation for password , userName, email a kind of manual validatio for enhance security.. check it later and think where should i place this logic in fronted or in backend**

---

## `Starting of the frontend`

* in frontend we will be using ..
  * (1) browser router
  * (2) context api ---> if required then zustand (no - redux)
  * (3) no arrow function
  * (4) initially a basic layout using the tailwind css
  * (5) we will create basic component also like for button etc we will see based on requirement.
  * (6) initially we will not focus on optimization like reducing the re-rendrs -->  we will see it in v1 of our project.

* ### `(1) understanding the folder structure mainly src`

  * so src will look something lke this.

```planetext
client/
├── public/
├── src/
│   ├── assets/              # Images, thumbnails
│   ├── components/          # Reusable components like Header, Sidebar, VideoCard
│   ├── pages/               # Home, VideoPage, ChannelPage, AuthPage
│   ├── services/            # Axios API services
│   ├── utils/               # Helper functions (auth utils, date formatting)
|   |-- context/             # mostly auth related..
│   ├── App.js
│   ├── index.js
│   └── routes.js            # React Router config


/src
  /components
    /Header
    /Sidebar
    /VideoCard
    /VideoPlayer
    /CommentSection
  /pages
    Home.jsx
    Login.jsx
    Signup.jsx
    VideoPage.jsx
    ChannelPage.jsx
  /context
    AuthContext.jsx
  /services
    api.js
  App.js
  main.jsx
```

* so first we will create component part and then pages part ---> check for auth like we are sending the token in backend which is fine but check for how to send it in frontend like with just data or okey ---- check it later....

* ## `(1) component`

  * ### `(1) header component`

    * keep in mind the search bar is in header..
    * its easy to built it since we assume if there is a user is preent in localstorage then show either login or user data like conditional rendering..

  * ### `(2) VideoCard`

    * this is also simple we just assume that we will get the single video data and we just display it.. providing a link on whole video details.

---

* ## `(3) Home page`

  * now the problem is in backend i did not include any video url so my video are not playing ........ now i have two option.. either i go for directly storing video in blob format using multer on cloudineary but ..... what i am thinking is we will do that in our version1.
  * currently what we do is store the video id in the db keep in mind this is the id that yt provide on the url for each video and we can call the api url for yt with video id whenever we need to do ... But in this we have every time to create the url instead of this we will store the url in db

---

* in url approach .... first we will ask the user to paste the url and then we will extract id from it in bavckend and then save this yt video id as videoId and then when on frontend to show it i will call the my api to get all videos and then create a link like using that yt video id and using i frame i can emmed that yt video directly...

* every thing is fine .... but the problem is i take the yt url as input from the usr while uploading the video right and store that url and in bakcend i extract id from that url and then when any one hit /video then i will show all video document and its frontend responsibility to make a call on yt by using the videoId which is techinally a yt video id so ultimately we are calling yt servers and i did not understand then why we are storing the id in backend and fetching it in frontend ... we can simply ask user to past yt url and call it that's it all videos will be shown anyway i did not get it ... and so we will use cloudinary where user can upload raw video --- like 50-100mb size and user can upload a profile phot else just think if i ask user for profile photo then user has to first host that image somewhere and then past the url which makes no sense....

---

* ## `using cloudinary`

  * ### `step 1`

    * install multer , cloudinary , and multer-storage-cloudinary packages
    * multer will handel filte upload , cloudinary searvers as storage point and multer-storage-cloudinary this npm package will help us to directly store iamge or video on the cloudinary.. not like first stored tempory on server then upload it to cloudinary.
    * similary we did on aws using s3 buccket that suppor blob storage.......(refer notes)

  * ### `step 2`

    * go to the cloudinary signup and then do all the basic thing like upload assests etc then go to ur dashboard then copy three things which are important

        ```js
        CLOUDINARY_CLOUD_NAME=dqehwpc7b
        CLOUDINARY_API_KEY=1234567890abcdef
        CLOUDINARY_API_SECRET=your_api_secret_here

        ```

    * once u copy paste it inside the .env file.

  * ### `step 3`

    * now create a cloudinary config file and setup configuration just like we setup for mongodb.

        ```js
        import {v2 as cloudinary} from 'cloudinary';

        // now setting up sdk with our account details or we can say linking our account to cloudinary sdk.

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });

        export default cloudinary;
        ```

  * ### `step 4`

    * now create a multer middleware for profile photo image upload..

<!-- chek it why the channel is not coming with  -->

* now currently i implement this ... when user signup and loged in for the first time then ovisouly they will have not any channel right but assume user create a channel and we updated user like we add the channel info in the user -- in backend and we return updated user to frontend that have channel info ... but on logout the user is currently removed from the local storage ...that means its channel info is already removed while user is  removed..........But i want when some credientials like userName,password is same as the user that created the channel before then we can add that channel info that same user ??

---

* ## `Feature need to add`

  * (1) on home page or side bar call a api on db to find all user in db and show their avatar on the sidebar ... something like real yt and when user click on it then their channel should open.
  * (2) currently when user log out then we are clearing the local storage -- which is fine but we need to check in sign In backend api that is this user exist in db and if it have channel then return the updated user with channel info in it...by doing this we make sure that user already created channel does no lost its channel..
  * (3) now courrently the multiple user can comment but any user is able to edit and delete the comment of any user  we need to prevent it..
  * (4) at last go for the channel banner also becuase in schema we have a channel banner so while creaating a channel add a file upload for channel banner and (think can we create the channel banner from the yt url or not ..) else we will upload ... and on while creating channel show the user avatar with name so that user is full sure that he is creating his own channel..

  * (5) like and dislike .... (for this we need to store) more filed in our video schema like which user liked the video and which user did no liked the video...and both will be array that store user reference like mongoose id so that we can run a loop to check is this user already likes or dislikes if yes then reverse it else increase or decrease the count.

---

* things that are still left ---
* (1) a header bar on the video player page
* (2) some video on the right side of the video player page just like yt.
* (3) on the homepage video are not shifting to the left..

---

* task left ---> fix the sidebar on the profile page, on video page -- try to give sidebar if it looks good else just ad dthe profileheader its fine...
* on search page header and side bar is must

* comment cheak-- but its fine -- check later if u have time...

---

* mostly things are done...before going to version 2 --> do changes in the layout -- or fix it currently there are two header and two sidebar--> which fine for version 1 but update it later-->
* just think how this sidebar is wroking -- we can acchive it with context but why layout is breaking on multiple page..
