
const { schema } = require('@hapi/joi/lib/compile');
var { Schema } = require('mongoose');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/backend', );
mongoose.connection.on('open',function() {
    console.log('Mongoose connected.');
});

Schema = mongoose.Schema;

var User=new Schema({
    fname:{
        type:String
      },
      lname:{
        type:String
      },
      gender: {
        type: String
      },
      hobby: {
        type: Array
      },
      phone: {
        type: String
      },
      email: {
        type: String
      },
      password:{
        type:String
      },
      cpassword: {
        type: String
      },
      city: {
        type: String
      },
      image:{
        type: String
      }
  });



  var Catagory = new Schema({
    name:{
      type: String
    }
  });



  var Contact = new Schema({
    name:{
      type: String
    },
    email:{
      type: String
    },
    phone:{
      type:String
    },
    message:{
      type: String
    },
    date:{
      type: Date
    }
  });


  const Testimonial = new mongoose.Schema({

    name: {
        type: String
    },
    desg: {
        type: String
    },
    desc: {
        type: String
    },
    image: {
        type: String
    }

});


const Portfolio = new mongoose.Schema({

  catagory: {
      type: String
  },
  name: {
      type: String
  },
  image: {
      type: Array
  },
  title: {
      type: String
  },
  url: {
     type: String
  },
  date: {
    type: Date
  }
});

  var UserModel = mongoose.model('User', User);
  var CatagoryModel = mongoose.model('Catagory', Catagory)
  var ContactModel = mongoose.model('Contact', Contact)
  const TModel = mongoose.model('Testimonial', Testimonial); 
  const PortfolioModel = mongoose.model('Portfolio', Portfolio);

  module.exports = {
    UserModel,
    CatagoryModel,
    ContactModel,
    TModel,
    PortfolioModel
  }

  