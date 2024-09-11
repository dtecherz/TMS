const LogModal = require('../models/LogModal')

const LogController ={



    async getLogsOfOrder(req,res){
        try {
            
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success:false,
                message:"somethng went wrong whilet getting orders log"
            })
        }
    }
}