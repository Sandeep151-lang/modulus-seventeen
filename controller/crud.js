const express = require('express');
const users = require('../model/users');
const router = express.Router()


router.post(`/create`,async(req,res)=>{
    try {
    const { firstName,lastName,email } = req.body;
    const userList = new users({ firstName,lastName,email });
    await userList.save();
    return  res.status(201).json(userList);
    } catch (error) {
        return res.status(400).json(`users not created`)
    }
})

router.get('/list', async (req, res) => {
    try {
        const crud = await users.find();
        return res.status(200).json(crud);
    } catch (error) {
        return res.status(400).json('users not found')
    }
  });

  router.delete('/delete/:_id',async(req,res)=>{
    try {
        const {_id} =req?.params
        await users.deleteOne({ _id: _id }).then((item) => {
            return res.json("users deleted successfully")
        })

    } catch (error) {
        return res.status(200).json("users not deleted")
    }
  })

  

  router.put('/update/:_id',async (req,res)=>{
    try {
        await users.findByIdAndUpdate({ _id: req?.params?._id }, req.body ,{new:true, upsert: false}) 
           return res.send("users updated successfully")
        
    } catch (error) {
        return res.status(400).json('users not updated')
    }
  })


module.exports = router