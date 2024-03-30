const validator = (schema) => async (req, res, next) => {
    try {
        const parsedBody = await schema.parseAsync(req.body);
        req.body = parsedBody;
        return next(); // Success, move to the next middleware
    } catch(err){
        const status= 422;
        const message="fill the input properly";
        const extraDetails = err.errors[0].message;
        const error={
            status,
            message,
            extraDetails,
        };
        console.log(error);
       // res
        //.status(400)
        //.json({msg: message }); // Sending error message as JSON
        next(error);
    }
    
};

module.exports = validator;