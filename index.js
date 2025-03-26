import 'dotenv/config'
import express from 'express'

const app = express()

const port =   process.env.PORT|| 3000
app.use(express.json())

let SamData = []
let nextId = 1

app.post('/sams',(req,res)=>{
    const {name, price} = req.body
    const newSam = {
        id: nextId++,
        name,
        price
    }
    SamData.push(newSam)
    res.status(201).send(newSam)
})

app.get('/sams/:id',(req,res)=>{
     const tea = SamData.find(SamData => SamData.id === parseInt(req.params.id))
     if(!tea){
        return res.status(404).send('The tea with the given ID was not found')
     }
     res.status(200).send(tea)
})

//update tea 
app.put('/sams/:id/',(req,res)=>{
    req.params.id = req.params.id
    const tea = SamData.find(SamData => SamData.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('The tea with the given ID was not found')
    }
    const{name, price} = req.body 
    tea.name = name
    tea.price = price
    res.status(200).send(tea)
})
// delete tea 
app.delete('/sams/:id',(req,res)=>{
     const index=  SamData.findIndex(SamData => SamData.id === parseInt(req.params.id))
        if(index === -1){
            return res.status(404).send('The tea with the given ID was not found')
        }
        SamData.splice(index,1)
        res.status(204).send("tea deleted")
})

 app.get('/sams',(req,res)=>{
    res.status(200).send(SamData)
 })

app.listen(port,()=>{
    console.log(`Server is running on port ${port}....`)
})
app.listen(port,()=>{
    console.log(`hello`)
})