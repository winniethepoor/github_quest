
// import Axios from "axios";

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
        // if (this.user.token === '') {
        //     window.location = 'Login.html';
        // }
    },
    methods: {
        getProducts() {
            var vm = this;
            const api = `${apiPath}${uuid}/admin/ec/products`;
            // Axios.defaults.headers.common.Authorization = `bearer${vm.user.token}`;
            Axios.get(api).then((response)=>{
                vm.product = response.data.data;
                vm.pagination = response.data.meta.pagination;
            })
        },
    
        }
    })

