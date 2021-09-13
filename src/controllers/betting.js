async function checkPost(req,res){
    console.log(JSON.stringify(req.body.event.data.new));
    return res.json({message: "teste"});
}

export{
    checkPost
}