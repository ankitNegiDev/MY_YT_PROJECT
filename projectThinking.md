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
