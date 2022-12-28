import { constants } from "buffer";
import { error } from "console";
import express , {Request,Response} from "express";
import * as fs from 'fs';

const app = express()
const bodyParser = require('body-parser').json();


app.listen( '3001', (): void =>{
    console.log("server is running")
})
//all data
app.get('/db', function(req : Request, res : Response) {
  fs.readFile('db.json', (err : any, data : any) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const json = JSON.parse(data); //array of objects
      console.log(json)
      return res.send(json)
    }
});
})
// read all ascendingly by either type = date , type = title , type = priority
app.get('/db/:type', function(req : Request, res : Response) {
  let{type} = req.params;
  console.log(type)
  fs.readFile('db.json', (err : any, data : any) => {
    let myData = {}
    if (err) {
      res.status(500).send(err);
    } else {
      const json = JSON.parse(data); //array of objects
      if(type === 'priority') {
      // sort ascendingly by the priority
      let sortedPriority = json.sort( (p1 : any, p2 : any) => (p1.priority > p2.priority) ? 1 : (p1.priority < p2.priority) ? -1 : 0);
      console.log(sortedPriority)
       return res.send(sortedPriority)
      }

      //sort title ascendingly
      if(type === 'title') {
      let sortedTitles = json.sort(function(a : any , b : any) {
        const nameA = a.title.toUpperCase(); // ignore upper and lowercase
        const nameB = b.title.toUpperCase(); // ignore upper and lowercase
          
      // sort in an ascending order
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      });
      console.log(sortedTitles)
      return res.send(sortedTitles)

    }

    if(type === 'date') {
      // sorting dates ascendingly
      let sortedDates= json.sort((x : any, y : any) => {
             x = new Date(x.Date),
            y = new Date(y.Date);
             return x - y;
});
  console.log(sortedDates)
     res.send(sortedDates)
    }

 
    }
});
})

//add new note
app.post('/db/new',bodyParser, (req, res) => {
  // Read the JSON file, add a new entry, and write the updated object back to the file
  const noteID = Math.floor(100000 + Math.random() * 900000)

  fs.readFile('db.json', (err : any, data : any) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const json = JSON.parse(data);
      //console.log(json)
      const temp = req.body
      const t = {...temp , "id" : noteID}
     // console.log(t)
      json.push(t);
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
//get a specific note
app.get('/:id' , (req : Request ,res : Response) => {
  const{id} = req.params;
  console.log(id)
  let myData = {}
  fs.readFile('db.json', (err : any, data : any) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const json = JSON.parse(data); //array of objects
      
      json?.map( (item : any) => {
          if( item.id == id){
            console.log("true")
            myData = item
            console.log(myData)
          return res.send(myData);     
    }
      })
    }
  });
})

//update an existing note
app.put('./update/:id' , bodyParser, ( req : Request ,  res : Response) => {
  const{id} = req.params;
  let myData = {}
  const temp = req.body;

    fs.readFile('db.json', (err : any, data : any) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const json = JSON.parse(data); //array of objects
      
      json?.map( (item : any) => {  //item to update saved in myData
          if( item.id == id){
            myData = item
          }
      })
      
      const temp = req.body  //new variable  ex "title"
      myData = {...myData, temp}
      console.log(myData)
     // const t = {...temp , "id" : noteID}
     // console.log(t)
      json.push(myData);

      fs.writeFile('db.json', JSON.stringify(json), (err:any) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send('Success');
        }
      });      



    }
  });

}   )



//delete one
app.delete('./delete/:id' , (req : Request , res : Response) => {
  const{id} = req.params;
  let myData = {}
  console.log(id)
  fs.readFile('db.json', (err : any, data : any) => {
    if (err) {
      res.status(500).send(err);
    } else {
      let json = JSON.parse(data);     //array of objects
      console.log("recieved json" , json)
    //  const found = json?.map( (item : any) => {   //found an item to delete
    //      if( item.id == id){  
    //      }})
    
      json =  json.filter((item : any) => {
          item.id !== id
        })
      console.log(json)
   //   fs.writeFile('db.json', JSON.stringify(json), (err:any) => {
   //     if (err) {
   //       res.status(500).send(err);
   //     } else {
   //       res.send('Success');
   //     }
   //   });

    }
  })
     
  });











//const test = [6,3,6,500,1]
//test.sort(function(a, b){return a-b});
//console.log(test)
