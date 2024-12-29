const addTodo = async(req, res)=>{
    try {
        const {Name, FatherName, Phone, Description} = req.body;
        const newTodo = new Todo({Name, FatherName, Phone, Description});
        await newTodo.save();
        res.status(200).json({success: true, msg: "Todo added successfully", todo: newTodo})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, msg: "Internal server error"})
    }
}

const getTodo = async(req, res)=>{
    try {
        const todo = await Todo.find()
        if(!todo) return res.status(400).json({success: true, msg: "Todo not found"})
        res.status(200).json({success: true, todo})
} catch (error) {
    console.log(error)
    res.status(500).json({success: false, msg: "Internal server error"})
}
}

const updateTodo = async (req, res) => {
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json({ success: true, msg: "Todo updated successfully", updatedTodo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, msg: "Internal server error" });
    }
  };

  
const deleteTodo = async(req, res)=>{
    try {
        const User_Id = req.params.id;
        const deleteUser = await Todo.findByIdAndDelete(User_Id)
        if(!deleteUser) return res.status(404).json({success: true, msg: "User not found"})
        res.status(200).json({success: true, msg: "User deleted successfully"})
} catch (error) {
    console.log("Error deleting user:", error)
    res.status(500).json({success: false, message: "Internal server error"}) 
    }
}


module.exports = {addTodo,updateTodo,getTodo,deleteTodo,}