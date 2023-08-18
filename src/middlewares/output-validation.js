// const outputValidation = () => {
//     return {
//         after: async (handler) => {
            
//             if (handler.response && typeof handler.response.body !== 'string') {
//                 handler.response = JSON.stringify(handler.response);
//                 console.log(handler.response)
//             }
//             return handler.response
//         }
//     }
// }

// module.exports = outputValidation;