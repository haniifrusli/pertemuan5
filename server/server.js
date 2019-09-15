const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient

// DB Option
const dbUrl = "mongodb+srv://haniif:haniif@cluster0-igq45.mongodb.net/test"
const dbOption = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// Insert
app.get('/insert', function (req, res) {
    MongoClient.connect(dbUrl, dbOption, function(err, db) {
    if (err) throw err
    var dbo = db.db("mydb")
    var myobj = { 
      name: "Company Inc 2", 
      address: "Highway 37 2" 
    }
    dbo.collection("customers").insertOne(myobj, function(err, resDB) {
      if (err) throw err
      db.close()
      res.send("1 document inserted")
    })
  })
})

// Find One
app.get('/findOne', function (req, res) {
  MongoClient.connect(dbUrl, dbOption, function(err, db) {
    if (err) throw err
    var dbo = db.db("mydb")
    dbo.collection("customers").findOne({}, function(err, resDB) {
      if (err) throw err
      db.close()
      res.send(resDB.name)
    })
  })
})

// Find All
app.get('/findAll', function (req, res) {
  MongoClient.connect(dbUrl, dbOption, function(err, db) {
    if (err) throw err
    var dbo = db.db("mydb")
    dbo.collection("customers").find({}).toArray(function(err, result) {
      if (err) throw err
      db.close()
      res.send(result)
    })
  })
})

// Find All + Filter
app.get('/findAllFilter', function (req, res) {
  MongoClient.connect(dbUrl, dbOption, function(err, db) {
    if (err) throw err
    var dbo = db.db("mydb")
    var filter = {
      address: 'Highway 3'
    }
    dbo.collection("customers").find(filter).toArray(function(err, result) {
      if (err) throw err
      db.close()
      res.send(result)
    })
  })
})

// Delete One
app.get('/deleteOne', function (req, res) {
  MongoClient.connect(dbUrl, dbOption, function(err, db) {
    if (err) throw err
    var dbo = db.db("mydb")
    var myquery = { 
      name: 'Company Inc' 
    }
    dbo.collection("customers").deleteOne(myquery, function(err, obj) {
      if (err) throw err
      db.close()
      res.send("1 document deleted")
    })
  })
})

// Delete Many
app.get('/deleteMany', function (req, res) {
  MongoClient.connect(dbUrl, dbOption, function(err, db) {
    if (err) throw err
    var dbo = db.db("mydb")
    var myquery = { 
      address: "Highway 37 2"
    }
    dbo.collection("customers").deleteMany(myquery, function(err, obj) {
      if (err) throw err
      db.close()
      res.send(obj.result.n + " document(s) deleted")
    })
  })
})

// Update One
app.get('/updateOne', function (req, res) {
  MongoClient.connect(dbUrl, dbOption, function(err, db) {
    if (err) throw err
    var dbo = db.db("mydb")
    var myquery = { 
      address: "Highway 37 2" 
    }
    var newvalues = { 
      $set: {
        name: "Mickey"
      } 
    }
    dbo.collection("customers").updateOne(myquery, newvalues, function(err, resDB) {
      if (err) throw err
      db.close()
      res.send("1 document updated")
    })
  })
})

// Update Many
app.get('/updateMany', function (req, res) {
  MongoClient.connect(dbUrl, dbOption, function(err, db) {
    if (err) throw err
    var dbo = db.db("mydb")
    var myquery = { 
      address: "Highway 37 2",
      name: "Company Inc"
    }
    var newvalues = {
      $set: {
        name: "Minnie s"
      } 
    }
    dbo.collection("customers").updateMany(myquery, newvalues, function(err, resDB) {
      if (err) throw err
      db.close()
      res.send(resDB.result.nModified + " document(s) updated")
    })
  })
})

app.listen(3000, function () {
  console.log('Run in Port 3000')
})