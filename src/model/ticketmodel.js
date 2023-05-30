const mongoose = require("mongoose")

const ticketModel = new mongoose.Schema({
     
    // tambola_ticket: {
    //     type: [
    //         [
    //             [Number]
    //         ]
    //     ],
    //     required: true
    //   }
//       tambolaticket : {
//         type : [
//         {
//          tickets : {
//         type: [[Number]],
//         required: true
//       }
//     }
//     ]
// }

tambolaticket :
    {
    type: [ [ [Number] ] ],
    required: true
}
},
    { timestamps: true }
)

module.exports = mongoose.model("tambola_ticket",ticketModel)








































