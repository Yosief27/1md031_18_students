



// var vm = new Vue({
//     el: '.main-ID',
//     data: {
//        food:food,
//        form:{
//         name:'',
//         email:'',
//         husnum:'',
//         gender:'Undisclosed',
//         paytype:'Credit Card',
//         husnum:'',
//         streetname:'',
//         burgername:''
        
//         }
      
    
//     },
//     methods:{
//          process:function(){
//              console.log({name:this.form['name'],email:this.form['email']})
        
//             alert('processing');
            
//         }
//     }
    
//   })

  var vm = new Vue({
    el: '.main-ID',
    data() {
        return{
       food:food,
       form:{
        name:'',
        email:'',
        // husnum:'',
        gender:'Undisclosed',
        paytype:'Credit Card',
        
        // streetname:'',
        burgername:[]
        
        },
        displayVals:{}
    };
    
    },
    methods:{
         process:function(){
            this.displayVals={...this.form};
            
        },
    },
    watch:{
        displayVals:{
            deep:true,
            handler(){
                this.form={...this.displayVals}
            }
        }
    }
    
  })

  var vm = new Vue({
    el: '#dots',
    data: {
      orders: {},
    },
    /* Please note that there should actually be some more code here. That code is included and explained in the next example */
    methods: {
      addOrder: function (event) {
        socket.emit("addOrder", { orderId: this.getNext(),
                                  details: { x: event.clientX-10 - event.currentTarget.getBoundingClientRect().left,
                                             y: event.clientX-10 - event.currentTarget.getBoundingClientRect().top, },
                                  orderItems: ["Beans", "Curry"]
                                });
      }
    }