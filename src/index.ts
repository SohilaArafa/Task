import { constants } from "buffer";
import { error } from "console";
import express , {Request,Response} from "express";
import * as fs from 'fs';

const app = express()
const bodyParser = require('body-parser').json();

type note = {
  title : string , 
  priority : number ,
  date : string ,
  id : number
}

app.listen( '3001', (): void =>{
    console.log("server is running")
})

app.get('/db', function(req : Request, res : Response) {
  fs.readFile('db.json', (err : any, data : any) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const json : note [] = JSON.parse(data); 
      return res.send(json)
    }
});
})
// read all ascendingly by either type = date , type = title , type = priority
app.get('/db/:type', function(req : Request, res : Response) {
  let{type} = req.params;
  fs.readFile('db.json', (err : any, data : any) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const json : note [] = JSON.parse(data); 
      if(type === 'priority') {
      let sortedPriority = json.sort( (p1 : note, p2 : note) => (p1.priority > p2.priority) ? 1 : (p1.priority < p2.priority) ? -1 : 0);
       return res.send(sortedPriority)
      }

      if(type === 'title') {
      let sortedTitles = json.sort(function(a : note , b : note) {
        const nameA = a.title.toUpperCase(); 
        const nameB = b.title.toUpperCase(); 
          
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      return res.send(sortedTitles)

    }

    if(type === 'date') {
      let sortedDates= json.sort((x : any, y : any) => {
             x = new Date(x.Date),
            y = new Date(y.Date);
             return x - y;
});
     res.send(sortedDates)
    }

 
    }
});
})

app.post('/db/new',bodyParser, (req, res) => {
  const noteID = Math.floor(100000 + Math.random() * 900000)

  fs.readFile('db.json', (err : any, data : any) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const json : note [] = JSON.parse(data);
      const temp : note= req.body
      const t = {...temp , "id" : noteID}

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
app.get('/:id' , (req : Request ,res : Response) => {
  const{id} = req.params;
  fs.readFile('db.json', (err : any, data : any) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const json : note[]= JSON.parse(data);
      
      json?.map( (item : note) => {
          if( item.id.toString() == id){
          return res.send(item);     
    }
      })
    }
  });
})


app.delete('/delete/:id' , (req : Request , res: Response) => {

    fs.readFile('db.json' ,(err : any, data : any) => {
    if (err) {
      res.status(500).send(err);
    } else {
    const {id} = req.params;
    const json : note [] = JSON.parse(data);
    let newArray = json.filter((item : note) => item.id.toString() !== id );
    console.log(newArray);


      fs.writeFile('db.json',  JSON.stringify(newArray) , (err:any) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send('Deleted Successfully');
        }
      });}
 });

})

app.delete('/delete' , (req : Request , res: Response) => {

    fs.readFile('db.json' ,(err : any, data : any) => {
    if (err) {
      res.status(500).send(err);
    } else {
    let json : note [] = JSON.parse(data);
    json  = [];


      fs.writeFile('db.json',  JSON.stringify(json) , (err:any) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send('Deleted Successfully');
        }
      });}
 });

})

app.put('/update/:id' ,bodyParser , (req: Request , res : Response) => {
    const{id} = req.params;
    const updates : note = req.body;

  fs.readFile('db.json', (err : any, data : any) => {
    if (err) {
      res.status(500).send(err);
    } else {
        let json : note [] = JSON.parse(data);
        const index = json.findIndex((item: note) => {
          return item.id.toString() === id;
        })
     if (index === -1) {
      throw new Error('Item not found');
    }
    json[index] = {...json[index], ...updates };

        fs.writeFile('db.json', JSON.stringify(json), (err:any) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send('Success');
        }
      });

    }

})
})

