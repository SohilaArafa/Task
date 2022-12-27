import { error } from "console";
import express , {Request,Response} from "express";
import * as fs from 'fs';

//const fs = require('fs')
const app = express()
let elements = require('./db.json');
const dataPath = './db.json' 


app.listen( '3001', (): void =>{
    console.log("server is running")
})

//  get all the saved notes
app.get('/db', function(req : Request, res : Response) {
   const f =  tryr()
  return res.send(elements);
});


app.delete('/db/delete' , (req,res) => {
    elements = []
    return res.send(elements)
})

const tryr =  ( async() =>   {
await fs.readFile('db.json', 'utf8', (err : any, data : any) => {
  if (err) {
    // handle the error
    throw error
  }
  const d = data;
  console.log(d)
});
} )


const saveAccountData = (data : any) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}

const getAccountData = () => {
    const jsonData = fs.readFileSync(dataPath)
  //  return JSON.parse(jsonData)    
}


//get all the data
const getData = () => {
    const jsonData = fs.readFileSync('db.json')
  //  return JSON.parse(jsonData)    
}
//write new data in json
const saveUserData = (data : any) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('db.json', stringifyData)
}

app.post('/db/addN' ,(req: Request , res : Response) => {
//access file --> dats is raw --> change to json format

    const dataa = req.body
    const d = JSON.parse(dataa)
    console.log(d)
    //var data = fs.readFileSync('./db.json');
    //var myObject= JSON.parse(data);
//
    //const {title,Description,Date,Priority} = req.body
    console.log("ok")


} )


//app.post('/db/add' , (req: Request , res : Response) => {
//
////access file --> dats is raw --> change to json format
//    var data = fs.readFileSync('db.json');
//    var myObject= JSON.parse(data);
//
//    const noteID = Math.floor(100000 + Math.random() * 900000)
//    const {title,Description,Date,Priority} = req.params
//    console.log(title,Description,Date,Priority)
//    let newData = {
//        "id": noteID
//    }  
//
//    myObject.push(newData);
//
//    let newwData = JSON.stringify(myObject);
//    fs.writeFile('data.json', newwData );   


  
//}  )



app.post('/db/neww', (req : Request, res : Response) => {
   
    var existAccounts = getAccountData()
    const newAccountId = Math.floor(100000 + Math.random() * 900000)
   
 //   existAccounts[newAccountId] = req.body
     
    console.log(existAccounts);

    saveAccountData(existAccounts);
    res.send({success: true, msg: 'account data added successfully'})
})

app.post('/db/new', (req : Request, res : Response) => {

    const id  = Math.floor(100000 + Math.random() * 900000)
    const addID = JSON.stringify(id)

    const newData = req.body

    //check if the userData fields are missing
    if (newData.title == null || newData.Description == null || newData.Date == null || newData.Priority == null) {
        return res.status(401).send({error: true, msg: 'User data missing'})
    }
      
    elements.push(newData,addID)

    res.send(id)
})

//const data = fs.readFileSync('./db.json');

// parse the JSON data
//const json = JSON.parse(data);
//console.log(json)

app.post('/', (req, res) => {
  // Read the JSON file, add a new entry, and write the updated object back to the file
  fs.readFile('db.json', (err : any, data : any) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const json = JSON.parse(data);
      json.push(req.body);
      fs.writeFile('db.json', JSON.stringify(json), (err:any) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send('Success');
        }
      });
    }
  });
});

//app.put('/:id', (req, res) => {
//  // Read the JSON file, update the specified entry, and write the updated object back to the file
//  fs.readFile('data.json', (err, data) => {
//    if (err) {
//      res.status(500).send(err);
//    } else {
//      const json = JSON.parse(data);
//      const index = json.findIndex((item) => item.id === req.params.id);




//app.get('/db/:id', (req : Request, res : Response) => {
//  const{id} = req.params
//  let found = elements.find( x : any  => x.id === parseInt(req.params.id));
//  let jsonString = JSON.stringify(found);
//  res.send(jsonString);
//});


//  get a certain note
//app.get('/db/:id', function(req : Request, res : Response) {
//  const { id } = req.params;  //id in the request
//  var file_content = fs.readFileSync(filename);
//  return res.send(elements[id]);
//  var content = JSON.parse(file_content);
//
//});

//app.patch('/db/update/:priority',function(req : Request, res : Response) {
//    //find the element
//    return res.send()
//}   )


//app.delete('/db', function(req : Request, res : Response) {
//  elements = []
//  const { id } = req.params;
//  return res.send(elements[id]);
//});




// delete - using delete method
//app.delete('/db/delete/:id', (req : Request, res : Response) => {
//  fs.readFile(dataPath, 'utf8', (err, data) => {
//    var existAccounts = getAccountData()
//    const userId = req.params['id'];
//    delete existAccounts[userId]; 
//    saveAccountData(existAccounts);
//    res.send(`accounts with id ${userId} has been deleted`)
//  }, true);
//})
//
//
app.post('/db/new', (req, res) => {
 
    const id  = Math.floor(100000 + Math.random() * 900000)

 
   
    res.send({success: true, msg: 'account added successfully'})
})