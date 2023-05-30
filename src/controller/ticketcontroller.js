const ticketModel = require("../model/ticketmodel");

const {isValidTicket, isvalidateColumnAscending} = require("../validator/validator");
const { userLogin } = require("./usercontroller");



const ticketcreate = async function(req,res) {
    try{
        
        let {tambolaticket} = req.body;

     if (Object.keys(req.body).length == 0 ) return res.status(400).send({ status: false, message: "plss put some data in body" })
      

     if(!isValidTicket(tambolaticket))  return res.status(400).send({status : false ,message : "Ticket is not valid"});

      const createTicket = await ticketModel.create({tambolaticket : tambolaticket});
     
      return res.status(201).send({status : true ,data : createTicket ,message : "Ticket created succesfully"})

    }catch(err){
        return res.status(500).send({status : false ,error : err.message});
    }
}

const getallticekts = async function(req ,res){
    try{

        // Each page has 5 documents

        const pageSize = 5; // Desired page size
        const currentPage = parseInt(req.query.page) || 1;   // Get current page from query params or default to 1
        const skip = (currentPage - 1) * pageSize;

        let findticket = await ticketModel.find().skip(skip).limit(pageSize);

        return res.status(200).send({status : true ,data : findticket})
    }catch(err){
        return res.status(500).send({status : false ,error : err.message});
    }
}
module.exports = {ticketcreate ,getallticekts};