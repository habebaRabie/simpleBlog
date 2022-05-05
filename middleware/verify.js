const jwt = require('jsonwebtoken');

module.exports = async(req,res,next) => {

    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];

    if(!token)
    {
        return res.status(403).send("Token required");
    }
    jwt.verify(token, process.env.SECRET_KEY ,(err, result)=>{
        if(err) res.status(401).send("Invalid Token");
        if(result.committee!="SMM"){
            res.status(403).send("Forbidden");
        }else{
            req.user = result;
            next();
        }
        
    });
}