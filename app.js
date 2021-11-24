var express = require('express');
var path = require('path');
var fs=require('fs');
var alert = require('alert');
var session = require('client-sessions');
const { request } = require('http');
const { runInNewContext } = require('vm');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
  cookieName: 'session',
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
  res.redirect('/login');
})

if (process.env.PORT){
  app.listen(process.env.PORT,function() {console.log('Server started')});
}
else{
  app.listen(3000,function() {console.log('server started on port 3000')});
}
app.get('/dune',function(req,res){
  res.render('dune')
})
app.get('/fiction',function(req,res){
  res.render('fiction')
})
app.get('/flies',function(req,res){
  res.render('flies')
})
app.get('/grapes',function(req,res){
  res.render('grapes')
})
app.get('/home',function(req,res){
  res.render('home')
})
app.get('/leaves',function(req,res){
  res.render('leaves')
})
app.get('/login',function(req,res){
  res.render('login')
})
app.get('/mockingbird',function(req,res){
  res.render('mockingbird')
})
app.get('/novel',function(req,res){
  res.render('novel')
})
app.get('/poetry',function(req,res){
  res.render('poetry')
})
app.get('/readlist',function(req,res){
  var curuser =req.session.user;
  var books2;
  var data2= fs.readFileSync("users.json");
  var w=JSON.parse(data2);
  for( i=0;i<w.length;i++){
    if(w[i].user==curuser)
      books2=w[i].readlist;
  }
  res.render('readlist', {books: books2});
})
app.get('/registration',function(req,res){
  res.render('registration')
})
app.get('/sun',function(req,res){
  res.render('sun')
})
app.post('/login',function(req,res){
  var x=req.body.username; 
  var y=req.body.password; 
  req.session.user=x;
  var data = fs.readFileSync("users.json");
  var flag = false ;
  if(data!=""){
    var z = JSON.parse(data);
    for( i = 0; i<z.length; i++ ) {
      if(z[i].user==x){
        flag = true ;
        if(z[i].password== y){
         res.redirect("/home");
          }
        else 
         alert("The password you entered is incorrect.");
      }  
    }
    if (!flag){
      alert("You aren't registered yet.");
       res.redirect("/registration");
    }
  }
  else {
     alert("You aren't registered yet.");
     res.redirect("/registration");
    }
  }
)
app.post('/register',function(req,res){
  var f=req.body.username; 
  var n=req.body.password; 
  var data2= fs.readFileSync("users.json");
  if(data2=="") {
    var s= {user:f,password:n,readlist:[]};
    var s1= JSON.stringify(s);
    fs.writeFileSync("users.json",s1);
    res.redirect("/login");
  }
  else{
    var flag=false;
    var w=JSON.parse(data2);
    for(i=0;i<w.length;i++){
     if(w[i].user==f){
      flag=true;
      break;
    }
  }
    if(flag){
     alert("username already taken");
  } 
    else {
    // get file then parse then push to usernames and passwords then writefilesync to users with updated file
      w.push({user:f,password:n,readlist:[]});
      var w2=JSON.stringify(w);
      fs.writeFileSync("users.json",w2);
      res.redirect("/login"); }
  }
}
)
app.post('/flies',function(req,res){
let index;
var data3= fs.readFileSync("users.json");
var wnew=JSON.parse(data3);
for(let i=0;i<wnew.length;i++){
  if (wnew[i].user==req.session.user)
  index=i;
}
if(wnew[index].readlist=={}){
  wnew[index].readlist.push(["Lord of the Flies"]) ;
  var w3=JSON.stringify(wnew);
  fs.writeFileSync("users.json",w3);}
else{
  var flag=false;
  for(let i=0;i<wnew.length;i++){
    if(wnew[index].readlist[i]=="Lord of the Flies")
      flag=true
  }
  if(flag){
    alert("Book already in list");
  }
  else{
    wnew[index].readlist.push(["Lord of the Flies"]) ;
    var w3=JSON.stringify(wnew);
    fs.writeFileSync("users.json",w3);}
  }
}
)
app.post('/dune',function(req,res){
  let index;
  var data3= fs.readFileSync("users.json");
  var wnew=JSON.parse(data3);
  for(let i=0;i<wnew.length;i++){
    if (wnew[i].user==req.session.user)
    index=i;
  }
  if(wnew[index].readlist=={}){
    wnew[index].readlist.push(["Dune"]) ;
    var w3=JSON.stringify(wnew);
    fs.writeFileSync("users.json",w3);}
  else{
    var flag=false;
    for(let i=0;i<wnew.length;i++){
      if(wnew[index].readlist[i]=="Dune")
        flag=true
    }
    if(flag){
      alert("Book already in list");
    }
    else{
      wnew[index].readlist.push(["Dune"]) ;
      var w3=JSON.stringify(wnew);
      fs.writeFileSync("users.json",w3);}
    }
  }
  )
  app.post('/grapes',function(req,res){
    let index;
    var data3= fs.readFileSync("users.json");
    var wnew=JSON.parse(data3);
    for(let i=0;i<wnew.length;i++){
      if (wnew[i].user==req.session.user)
      index=i;
    }
    if(wnew[index].readlist=={}){
      wnew[index].readlist.push(["The Grapes of Wrath"]) ;
      var w3=JSON.stringify(wnew);
      fs.writeFileSync("users.json",w3);}
    else{
      var flag=false;
      for(let i=0;i<wnew.length;i++){
        if(wnew[index].readlist[i]=="The Grapes of Wrath")
          flag=true
      }
      if(flag){
        alert("Book already in list");
      }
      else{
        wnew[index].readlist.push(["The Grapes of Wrath"]) ;
        var w3=JSON.stringify(wnew);
        fs.writeFileSync("users.json",w3);}
      }
    }
    )
    app.post('/leaves',function(req,res){
      let index;
      var data3= fs.readFileSync("users.json");
      var wnew=JSON.parse(data3);
      for(let i=0;i<wnew.length;i++){
        if (wnew[i].user==req.session.user)
        index=i;
      }
      if(wnew[index].readlist=={}){
        wnew[index].readlist.push(["Leaves of Grass"]) ;
        var w3=JSON.stringify(wnew);
        fs.writeFileSync("users.json",w3);}
      else{
        var flag=false;
        for(let i=0;i<wnew.length;i++){
          if(wnew[index].readlist[i]=="Leaves of Grass")
            flag=true
        }
        if(flag){
          alert("Book already in list");
        }
        else{
          wnew[index].readlist.push(["Leaves of Grass"]) ;
          var w3=JSON.stringify(wnew);
          fs.writeFileSync("users.json",w3);}
        }
      }
      )
      app.post('/mockingbird',function(req,res){
        let index;
        var data3= fs.readFileSync("users.json");
        var wnew=JSON.parse(data3);
        for(let i=0;i<wnew.length;i++){
          if (wnew[i].user==req.session.user)
          index=i;
        }
        if(wnew[index].readlist=={}){
          wnew[index].readlist.push(["To Kill a Mockingbird"]) ;
          var w3=JSON.stringify(wnew);
          fs.writeFileSync("users.json",w3);}
        else{
          var flag=false;
          for(let i=0;i<wnew.length;i++){
            if(wnew[index].readlist[i]=="To Kill a Mockingbird")
              flag=true
          }
          if(flag){
            alert("Book already in list");
          }
          else{
            wnew[index].readlist.push(["To Kill a Mockingbird"]) ;
            var w3=JSON.stringify(wnew);
            fs.writeFileSync("users.json",w3);}
          }
        }
        )
       app.post('/sun',function(req,res){
          let index;
          var data3= fs.readFileSync("users.json");
          var wnew=JSON.parse(data3);
          for(let i=0;i<wnew.length;i++){
            if (wnew[i].user==req.session.user)
            index=i;
          }
          if(wnew[index].readlist=={}){
            wnew[index].readlist.push(["The Sun and Her Flowers"]) ;
            var w3=JSON.stringify(wnew);
            fs.writeFileSync("users.json",w3);}
          else{
            var flag=false;
            for(let i=0;i<wnew.length;i++){
              if(wnew[index].readlist[i]=="The Sun and Her Flowers")
                flag=true
            }
            if(flag){
              alert("Book already in list");
            }
            else{
              wnew[index].readlist.push(["The Sun and Her Flowers"]) ;
              var w3=JSON.stringify(wnew);
              fs.writeFileSync("users.json",w3);}
            }
          }
          )
app.post("/search",function(req,res){
  var searchin=(req.body.Search).toLowerCase();
  var results2 = new Array();
  if(("lord of the flies").includes(searchin))
    results2.push("Lord of the Flies");
  if(("the grapes of wrath").includes(searchin))
    results2.push("The Grapes of Wrath");
  if(("leaves of grass").includes(searchin))
    results2.push("Leaves of Grass");
   if(("the sun and her flowers").includes(searchin))
    results2.push("The Sun and Her Flowers");
  if(("dune").includes(searchin))
    results2.push("Dune");
  if(("to kill a mockingbird").includes(searchin))
   results2.push("To Kill a Mockingbird");
  if(results2.length==0)
   results2.push("Book not found");
  res.render('searchresults',{results: results2})   
})

