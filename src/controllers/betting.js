async function checkPost(req,res){
    console.log(JSON.stringify(req.body));
    return res.json({message: "teste"});
}

export{
    checkPost
}