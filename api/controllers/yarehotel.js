const Sequelize = require('sequelize')
const models = require('../database/models')
const moment = require('moment')
const Op = Sequelize.Op

Rooms = models.rooms
Customer = models.customers
Order = models.orders

const getCheckin = data => {
    const newData = data.map(item => {
      const customer = item.orders.map(entry => {
        const newCustomer = {
          id: entry.customer.id,
          name: entry.customer.name,
          identity_number: entry.customer.identity_number,
          phone_number: entry.customer.phone_number,
          image: entry.customer.image
        };
        return newCustomer;
      });
      const order = item.orders.map(entry => {
        const { id, is_booked, is_done, duration, order_end_time } = entry;
        const newOrder = {
          id,
          is_booked,
          is_done,
          duration,
          order_end_time
        };
        return newOrder;
      });
      const newItem = {
        id: item.id,
        name: item.name,
        customer: customer[0],
        order: order[0]
      };
      return newItem;
    });
    return newData;
  };

module.exports = {
rooms:(req,res) => {
    Rooms.findAll()
    .then(data => res.send(data))
},

addRoom:(req, res) => {
    const {name} = req.body
    Rooms.create({
        name,
        createdBy:1
    })
    .then(data => res.send(data))
},

editRoom:(req, res) => {
    const {room_id} = req.params
    const {name} = req.body
    Rooms.update({
        name
    },{
        where: { 
            id: room_id
        }
    })
    Rooms.findOne({
        where:{
            id:room_id
        }
    })
    .then(data => res.send(data))
},

customers:(req, res) => {
    Customer.findAll()
    .then(data => res.send(data))
},

addCustomer:(req,res) => {
    const {name, identity_number, phone_number,image} = req.body
    Customer.create({
        name,
        identity_number,
        phone_number,
        image
    })
    .then(data => res.send(data))
},

editCustomer:(req,res) => {
    const {customer_id} = req.params
    const {name, identity_number, phone_number,image} = req.body
    Customer.update({
        name,
        identity_number,
        phone_number,
        image
    },{
        where:{
            id:customer_id
        }
    })
    Customer.findOne({
        where:{
            id:customer_id
        }
    })
    .then(data => res.send(data))
},
search:(req,res) => {
    const {search} = req.query
    if(search){
       Customer.findAll({
           where  : {
               title : { [Op.like] : `%${search}%` }
             }
       })
       .then(data => res.send(data))
    } else {
        null
    }
},

checkin:(req,res) => {
    Rooms.findAll({
        include:[{
            as:'orders',
            model:Order,
            attributes:{exclude:['createdAt','updatedAt']},
            include:{
                    as:'customer',
                    model : Customer,
            },
            // where: {is_booked: false },
            required:false
            }],
           
            where:{
                // is_booked: false 
                // '$orders.is_booked$':false,
                // required:false
            },
           
        })
    .then(data => {
        // let ulala = []
        // data.map(x => {
        //     let a={}
        //     a["id"]=x.id
        //     a["name"]=x.name
        //     if(x.customers[0]==undefined){
        //         a["user"] = {}
        //     } else {
        //         a["customers_id"]=x.customers[0].id
        //         a["user"] = x.customers[0].name
        //         a["is_booked"] = x.customers[0].orders.is_booked
        //         a["is_done"] = x.customers[0].orders.is_done
        //         a["duration"] = x.customers[0].orders.duration
        //     }

        //     ulala.push(a)
        //  })
        
        
        // console.log(data)
        res.send(getCheckin(data))
    })
    .catch(err => console.log(err))
},

addCheckin:(req, res) => {
    const time = new Date()
    const {room_id, customer_id, duration, is_done, is_booked} = req.body
    const createdAt = res.createdAt
    Order.create({
        room_id,
        customer_id,
        duration,
        order_end_time : moment(createdAt).add(duration, 'minutes').format('YYYY-MM-DD hh:mm:ss'),
        is_done,
        is_booked
    })
    .then(data => res.send(data))
},

editCheckin : (req, res) => {
    const { order_id } = req.params;
  
    Order.update(
      {
        is_booked: false,
        is_done: true
      },
      {
        where: { id: order_id, is_booked: true, is_done: false }
      }
    ).then(data => res.send(data))
 },

} //this is end of exports