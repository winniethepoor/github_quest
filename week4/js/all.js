import delModal_js from './delModal.js';
import modal_js from './modal.js';
import pagination_js from './pagination.js';
Vue.component('delmodal_compo_name',delModal_js);
Vue.component('modal_compo_name', modal_js);
Vue.component('pagination_compo_name', pagination_js);
new Vue({
    el: '#app',
    data: {
        apiPath: 'https://course-ec-api.hexschool.io/api/',
        products: [],
        pagination: {},
        tempProducts:{
            imageUrl:[],
        },
        
        isNew: false,
        status: {
        fileUploading: false,
        },
        user: {
            token: '',
            uuid: 'f8b5a05a-fd65-4097-8584-aa161833bcc1',
        },
        

    },
    // props:['page'],
    created() {

        this.user.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");


        if (this.user.token === '') {
            window.location = 'login.html';
        }
        this.getProducts();
    },
    methods: {
        getProducts(num=1) {

            const api = `${this.apiPath}${this.user.uuid}/admin/ec/products?page=${num}`;

            axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;
            axios.get(api).then((response) => {
                this.products = response.data.data;
                this.pagination = response.data.meta.pagination;
            }).catch((err) => {
                console.log(err)
            })
        },
            // 開啟 Modal 視窗
            // item是item in products
    openModal(isNew, item) {
      switch (isNew) {
        case 'new':
              this.$refs.modalData.tempProduct = {
            imageUrl: [],
          };
          this.isNew = true;
          $('#productModal').modal('show');
          break;
        case 'edit':
            //用tempProduct存入product的item
          this.tempProducts = Object.assign({}, item);
          // 使用 refs 觸發子元件方法
              this.$refs.modalData.getProduct(this.tempProducts.id);
          this.isNew = false;
          break;
        case 'delete':
              this.tempProducts = Object.assign({}, item);
              this.$refs.delModalData.getProduct(this.tempProducts.id);
              this.isNew = false;
          break;
        default:
          break;
      }
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

