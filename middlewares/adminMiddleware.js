const onlyAdminAccess = async  (req, res, next) => {
    try{

        if(req.user.role !=1){
            return res.status(400).json({
                success: false,
                message:  "You don't have permission to this route",
    
            });

        }

        

    }
    catch(error){
        return res.status(400).json({
            success: false,
            message:  "Something went  wrong",

        });
    }

    return next();

}

module.exports= {
    onlyAdminAccess
}