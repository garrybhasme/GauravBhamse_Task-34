const express=require('express');
const app = express();
const PORT=4000;
let data=[{
              id:1,
              text:"I want to complete this course",
              actions:{
                complete:false
              }
            },
            {
              id:2,
              text:"I want to drink the water",
              actions:{
                complete:false
              }
            }
]
app.use(express.json());

//Get the home page
app.get("/",(req, res)=>{
  res.status(200).json({
    message:"Home Page:-"
  })
})

/**Get all the tasks
*method: GET
*url: '/task'
*param:None
*/
app.get('/tasks',(req, res)=>{
  return res.status(200).send(data)
})

/**Get the particular task
*method: GET
*url: '/task'
*param::id
*/
app.get('/task/:id',(req, res)=>{
  const {id}=req.params;
  const task=data.find(each=>each.id===Number(id))
  res.status(200).send(task);
})

/**Add new task
*method: POST
*url: '/task'
*param:None
*/
app.post('/task',(req, res)=>{
  const task=req.body;
  data.forEach((each)=>{
    if(each.id===task.id){
      return res.status(409).send(`The data you filled the ID:${task.id} exists. Please emter anpther ID.`)
  }})
  data.push(task);
  res.status(200).send(data);
})

/**Complete the task
*method: PUT
*url: '/task/complete/ID'
*param:None
*/
app.put('/task/complete/:id',(req, res)=>{
  const {id}=req.params;
  updatedData = data.map((task) => {
    if (task.id === Number(id)) {
      return {
        ...task,
        actions: {
          ...task.actions,
          complete: true 
        }
      };
    }
    return task; 
  });
  data=[...updatedData];
  res.status(200).send(data);
})

/**Edit the task
*method: PUT
*url: '/task/edit/:id'
*param:None
*/
app.put('/task/edit/:id',(req, res)=>{
  const {id}=req.params;
  const {newtext}=req.body
  updatedData = data.map((task) => {
    if (task.id === Number(id)) {
      return {
        ...task,
        text:newtext
      };
    }
    return task; 
  });
  data=[...updatedData];
  res.status(200).send(data);
})

/**Delete the task
*method: DELETE
*url: '/task/:id'
*param:Id
*/
app.delete('/task/:id',(req,res)=>{
  const {id}=req.params;
  const updatedData=data.filter((task)=>task.id!==Number(id))
  
  if(data.length===updatedData.length){
    return res.status(404).send("Task not found! Please Enter valid  task")
  }
  data=[...updatedData];
  res.status(200).send(data);
})

app.listen(PORT,()=>{
  console.log(`Server is up and running ion http://localhost:${PORT}`);
})