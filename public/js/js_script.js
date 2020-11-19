

'use strict';
var socket = io();

  var vm = new Vue({
    el: '.main-ID',
    data() {
        return{
       food:food,
       orders:{
        name:'',
        email:'',
        
        gender:'female',
        paytype:'Credit Card',
        details:'' ,
        
        burgername:[],
        
       },
        
       
    
        
        displayVals:{},
        ordersmore:[]
        
    };
    
    // },
    // created: function () {
    //   socket.on('initialize', function (data) {
    //     this.orders = data.orders;
    //   }.bind(this));
  
    //   socket.on('currentQueue', function (data) {
    //     this.orders = data.orders;
    //   }.bind(this));
    },
  
    methods:{
         addOrder:function(){
           
       
         
           this.displayVals={...this.orders};
           this.ordersmore.push(this.orders);
           console.log(this.ordersmore);
         
            socket.emit("addOrder", { orderId: this.getNext(),
                                      details:this.orders.details,
                                       
                                          
                                          orderItems: [this.orders.name,this.orders.email,this.orders.burgername]
                                        });
            
           
                                        document.getElementById('order_section').style.display = 'inline';  
        },
        
        getNext: function () {
          var lastOrder = Object.keys(this.ordersmore).reduce(function (last, next) {
            return Math.max(last, next);
          }, 0);
          console.log(lastOrder);
          return lastOrder + 1;
        },
       
        
        displayOrder: function (event) {
          
          var offset = {x: event.currentTarget.getBoundingClientRect().left,
                        y: event.currentTarget.getBoundingClientRect().top};
          this.orders.details={ x: event.clientX - 15 - offset.x,
            y: event.clientY - 15 - offset.y }; 
          
            
            
          
        }
    },

    
    
  })

  