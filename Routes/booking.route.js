
const express=require('express')
const { createBooking, bookingList } = require('../Controllers/booking.controller')
const authMiddleware = require('../Middleware/JWT/authToke')
const bookingRouter=express.Router()



bookingRouter.post('/bookSeminar', authMiddleware,createBooking)
bookingRouter.get('/bookingList', authMiddleware,bookingList)


module.exports=bookingRouter

