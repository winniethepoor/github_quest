import zh from './zh_TW.js'
import shopcart from './shopcart.js';
VeeValidate.localize('tw', zh);
Vue.component('ValidationProvider', VeeValidate.ValidationProvider);
Vue.component('ValidationObserver', VeeValidate.ValidationObserver);
Vue.component('shopcart_modal', shopcart);
// Vue.use(VueLoading);
// Vue.component('loading', VueLoading);
VeeValidate.configure({
    classes: {
        valid: 'is-valid',
        invalid: 'is-invalid',
    },
});
Vue.filter('money',function(num){
    var parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
})
new Vue({
    el:"#app",
    data:{
        total:0,
        user:{
        apiPath: 'https://course-ec-api.hexschool.io/api/',
        uuid: 'f8b5a05a-fd65-4097-8584-aa161833bcc1',
        },
        products: [],
        status: {
            loadingItem: '',
        },
        
        form:{
            name:'',
            address:'',
            tel:'',
            value:'',
            checkValue:'',
        },
        cartlist:{
            
        },
        isLoading:false,
    },
    mounted() {
       
    },
    computed: {
        
        
    },
    created(){
        this.sum();
        this.getData();
        this.getCartData();
        // this.tempProduct = Object.assign({}, item)
        
    },
    computed: {
        // isDisabled:function(y,x){
        //     if(y==x){}
        // }
    },
    methods:{
        sum() {
            this.total=0;
            const api = `${this.user.apiPath}${this.user.uuid}/ec/shopping`;
            axios.get(api).then((response) => {
                this.cartlist = response.data.data;
                this.cartlist.forEach(item => {
                    console.log(item.product.price)
                    console.log(this.total)
                    // this.total=0;
                    this.total += (item.product.price*item.quantity);
                });
            })
        },
        disabled_btn(id){
            for(var i=0;i<this.cartlist.length;i++){
                if(this.cartlist[i].product.id==id){
                    return true
                }
            }
        },
        getData() {
            
            const api = `${this.user.apiPath}${this.user.uuid}/ec/products`;
            axios.get(api).then((res) => {
                this.products = res.data.data;
                
               console.log(this.cartlist[0].quantity)
                
            }).catch((err) => {
                console.log('錯誤', err);
            });
        },
        addCart(item,quantity=1){
            const api = `${this.user.apiPath}${this.user.uuid}/ec/shopping`;
            
            const cartlist = {product:item.id,quantity};
            axios.post(api,cartlist).then(()=>{
                
                this.getCartData()
            }).catch((err)=>{
                console.log('nah....',err);
            });

        },
        //use to render cartlist
        getCartData(){
            const api =`${this.user.apiPath}${this.user.uuid}/ec/shopping`;
            axios.get(api).then((res)=>{
                this.cartlist = res.data.data;
                console.log(this.cartlist[0].quantity);
                this.sum();
                this.getData();
            }).catch((err)=>{
                this.sum();
                console.log('shit...',err);
            })
        },
        onOffjudge(){
            const a = '';
            
        },

        openshopcart(){
            $('#shopmodal').modal('show');
        },
        yes(){
            console.log('yes');
        }
    }
})