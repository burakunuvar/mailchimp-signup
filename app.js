const express = require('express')
const bodyParser = require('body-parser');
var request = require('request');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  // res.send('calculator')
  res.sendFile(__dirname + "/signup.html");
})


app.post("/", (req,res)=>{
  let {firstname,lastname,email} = req.body
  console.log(firstname,lastname,email);
  let data = {
    members: [
      {
        email_address:email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstname,
          LNAME:lastname
        }
      },
    ]
  }
  let jsonData = JSON.stringify(data);
  var options = {
    url:"https://us20.api.mailchimp.com/3.0/lists/fa3b9b3295",
    method: "POST" ,
    headers: {
      "Authorization" : "buraku 66bb5c271956ddc2a05e167770890a6a-us20"
    },
    // body : jsonData
  }
  request(options,function(error,response,body){
    if(error){
      console.log(error);
      res.sendFile(__dirname + "/failure.html");
    }else{
      console.log(response.statusCode)
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      }else{
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
})

app.listen(port, () => console.log(`Calculator listening on port ${port}!`))

module.exports = app

//
// 66bb5c271956ddc2a05e167770890a6a-us20
//
// fa3b9b3295
