const express = require("express");
const app = express();
const bodyParser = require('body-parser');
// require database connection 
const bcrypt = require("bcrypt");
const User = require("./models/userModel");
const Profile = require("./models/profileModel");
const Books = require("./models/booksModel");
const auth = require("./auth");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");


require('dotenv').config()


// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// execute database connection 
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });


const librarySchema = new mongoose.Schema({
    _id: mongoose.ObjectId,
    title: String,
    author: String,
    publisher: String,
    pubblication_date: Date,
    price: Number,
    image: String,
  });
const libraryModel = mongoose.model('books', librarySchema);


const ProfileSchema = new mongoose.Schema({
  _id: mongoose.ObjectId,
  email: String,
  credit: Number,
  cart_items: [librarySchema],
})
const profileModel = mongoose.model('profiles', ProfileSchema)


// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});



app.get("/", (request, response, next) => {
  response.json({ message: "Server response!" });
  next();
});


app.get("/api/findall", async (request, response) => {
  
  const library = await libraryModel.find();
  response.send(library);

});

app.post("/api/findCart", async (request, response) => {
  
  await profileModel.findOne({ email: request.body.email})
  .then( result =>{
    response.send(result);
  })
  .catch( error => {
    response.send(error)
  })
  
  
});

/*
app.post("/api/insertOne", async (request, response) => {


  var newBook = new Books(request.body);
  const result = newBook.save();
  response.send(result);
});*/

app.post("/api/insert", async (request, response) => {

  //response.send("response: " + request.body)
  request.body.map(book=> {
    var newBook = new Books(book);
    const result = newBook.save()
    .then(function(){
        console.log("ok")
    }).catch(function(error){
        response.send(error);
    });
  })
  
  
  
});



app.post("/api/delete", async (request, response) => {

  const result = await libraryModel.deleteMany({ _id: { $in: request.body } });
  response.send(result);

});


app.post("/api/put", async (request, response) => {


  if(request.body.origin==="/library"){

    const selectedBooks = await libraryModel.find({ _id: { $in: request.body.id } })
    var books = [];

    selectedBooks.forEach(function(book) {
      books.push(book);
    });

    await profileModel.findOneAndUpdate({ email: request.body.email}, { $addToSet: { cart_items: books }});
    await libraryModel.deleteMany({ _id: { $in: request.body.id } });

    response.send("ok")

  }
  else if(request.body.origin==="/cart"){

    const oldProfile = await profileModel.findOne({ email: request.body.email})
    const newItems = oldProfile.cart_items.filter(function(item) { return item._id.valueOf() !== request.body.item._id });
    const newProfile = await profileModel.findOneAndUpdate({ email: request.body.email}, { $set : {cart_items : newItems}})
    var newBook = new libraryModel(request.body.item);
    await newBook.save();

    response.send("ok")
  }
  else{
    response.send("no origin")
  }
  
  
  
  

});


// register endpoint
app.post("/register", (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        email: request.body.email,
        password: hashedPassword,
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });

      const profile = new Profile({
        email: request.body.email,
        credit: 0,
        cart_items : [],
      });

      // save the new user
      profile
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "Profile Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating profile",
            error,
          });
        });

    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});






// login endpoint
app.post("/login", (request, response) => {
  // check if email exists
  User.findOne({ email: request.body.username })

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt.compare(request.body.password, user.password, (error, data) => {
          //if error than throw error
          if (error){
              response.status(400).send({
                message: "Passwords does not match",
                error,
              });
          }
          //if both match than you can do anything
          if (data) {
              const token = jwt.sign(
                {
                  userId: user._id,
                  userEmail: user.email,
                },
                "RANDOM-TOKEN",
                { expiresIn: "24h" }
              );

              //   return success response
              response.status(200).send({
                message: "Login Successful",
                username: user.email,
                token,
              });
          } else {
              return response.status(401).json({ msg: "Invalid credential" })
          }
      })
      
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});


app.get("/verify", async (request, response) =>{

  try {
    //   get the token from the authorization header
    const token = await request.headers.authorization.split(" ")[1];

    //check if the token matches the supposed origin
    const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");

    // retrieve the user details of the logged in user
    const user = await decodedToken;

    response.status(200).send({
        message: "token verified",
    });
    
  } catch (error) {
    response.status(401).json({
      error: new Error("Invalid request!"),
    });
  }


})





module.exports = app;
