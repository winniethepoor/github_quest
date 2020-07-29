


new Vue({
    el: '#app',
    data: {
        apiPath: 'https://course-ec-api.hexschool.io/api/',
        products: [],
        pagination: {},
        tempProduct: {
            imageUrl: [],
        },
        user: {
            token: '',
            uuid: 'f8b5a05a-fd65-4097-8584-aa161833bcc1',
        },
    },
    created() {
        this.user.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        Axios.defaults.headers.common.Authorization = `bearer${vm.user.token}`;
        // if (this.user.token === '') {
        //     window.location = 'Login.html';
        // }
    },
    methods: {
        getProducts(num=1) {
            var vm = this;
            const api = `${apiPath}${uuid}/admin/ec/products?page=${num}`;
            
            axios.get(api).then((response)=>{
                vm.product = response.data.data;
                vm.pagination = response.data.meta.pagination;
            })
        },
    
        }
    });

// new Vue({
//     el: '#app',
//     data: {
//         products: [],
//         tempProduct: {
//             imageUrl: []
//         },
//         pagination: {},
//         api: {
//             uuid: 'f8b5a05a-fd65-4097-8584-aa161833bcc1',
//             path: 'https://course-ec-api.hexschool.io/api/'
//         },
//         token: '',
//         isNew: '',
//         loadingBtn: ''
//     },
//     methods: {
//         openModal(isNew, item) {//打開彈跳視窗的方法
//             switch (isNew) {
//                 case 'new'://新增
//                     //清空暫存使用
//                     this.tempProduct = {
//                         imageUrl: []
//                     };
//                     $('#productsModal').modal('show');//bootstrap的Modal用法
//                     break;
//                 case 'edit'://編輯
//                     this.loadingBtn = item.id;
//                     const editUrl = `${this.api.path}${this.api.uuid}/admin/ec/product/${item.id}`;
//                     axios.get(editUrl).then(resdata => {
//                         this.tempProduct = resdata.data.data;
//                         $('#productsModal').modal('show');
//                         this.loadingBtn = '';//清除
//                     });
//                     break;
//                 case 'delete'://刪除
//                     this.loadingBtn = item.id;
//                     const deleteUrl = `${this.api.path}${this.api.uuid}/admin/ec/product/${item.id}`;
//                     axios.get(deleteUrl).then(resdata => {
//                         this.tempProduct = resdata.data.data;
//                         $('#delproductsModal').modal('show');
//                         this.loadingBtn = '';//清除
//                     });
//                     break;
//                 default:
//                     break;
//             }
//         },
//         getProducts(num = 1) {
//             const url = `${this.api.path}${this.api.uuid}/admin/ec/products?page=${num}`;
//             axios.get(url)
//                 .then(resdata => {
//                     //console.log(resdata);
//                     this.products = resdata.data.data;
//                     this.pagination = resdata.data.meta.pagination;

//                     if (this.tempProduct.id) {
//                         //先清空避免重複觸發事件
//                         this.tempProduct = {
//                             imageUrl: []
//                         };
//                     }

//                     $('#productsModal').modal('hide');
//                 });
//         },
//         updateProduct() {

//         },
//         delProduct() {
//             //DELETE api/{uuid}/admin/ec/product/{id}
//             const urldelProduct = `${this.api.path}${this.api.uuid}/admin/ec/product/${this.tempProduct.id}`;
//             axios.delete(urldelProduct).then((resdata) => {
//                 //console.log(res);
//                 //重新取得產品列表
//                 this.getProducts();
//             })
//                 .catch(function (msg) {
//                     console.log('=== deleteData catch ===');
//                     console.log(msg);
//                 })

//             //清空暫存的資料
//             this.tempProduct = {
//                 imageUrl: []
//             };

//             //把彈跳視窗隱藏
//             $('#delproductsModal').modal('hide');
//         }
//     },
//     created() {
//         //取得 token
//         this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
//         //將 Token 加入到 Headers 內 當作預設值發送 `Bearer ${this.token}` 是api的規定寫法
//         axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
//         //重新取得產品列表
//         this.getProducts();
//     }

// })

