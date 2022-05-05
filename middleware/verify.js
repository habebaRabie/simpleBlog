const jwt = require('jsonwebtoken');


module.exports = async(req,res,next) => {

    const header = req.headers["authorization"];
    console.log("header ",header);
    const token = header && header.split(" ")[1];
    console.log("token ",token);
    if(!token)
    {
        return res.status(403).send("A token is required for authentication");
    }
    jwt.verify(token, process.env.SECRET_KEY ,(err, result)=>{
        if(err) res.status(401).send("Invalid Token");
        if(result.committee!="SMM")
        {
            res.status(403).send("Forbidden.");
        }
        req.user = result;
        next();
    });
}