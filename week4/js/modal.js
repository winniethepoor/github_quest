


export default{
    template:
    `   <div class="modal fade  mx-auto" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="bg-light p-3 modal-dialog">
    
            <div class="modal-content">
                <div class="modal-header">
                    <h4 v-if="this.isnew" class="modal-title" id="exampleModalLabel">[後台] 新增產品</h4>
                    <h4 v-else class="modal-title" id="exampleModalLabel">[後台] 編輯產品</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                    <label for="title">標題</label>
                    <input type="text" id="title" placeholder="請輸入標題" class="form-control" v-model="tempProduct.title">
                    </div>
                    <div class="form-group">
                        <label for="category">分類</label>
                        <input type="text" id="category" placeholder="請輸入分類" class="form-control" v-model="tempProduct.category">
                    </div>
                    <div class="form-group">
                        <label for="content">商品敘述</label>
                        <input type="text" id="content" placeholder="請輸入商品敘述" class="form-control" v-model="tempProduct.content">
                    </div>
                    <div class="form-group">
                        <label for="description">商品說明</label>
                        <input type="text" id="description" placeholder="請輸入商品說明" class="form-control" v-model="tempProduct.description">
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="origin_price">原價</label>
                            <input type="number" id="origin_price" placeholder="" class="form-control" v-model="tempProduct.origin_price">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="price">售價</label>
                            <input type="number" id="price" placeholder="" class="form-control" v-model="tempProduct.price">
                        </div>
                    </div>
                </div>
                    <hr>
                <div class="container">
                    <div class="form-row">
                        <div class="col">
                            <div class="form-group">
                            
                                <label for="image">輸入圖片網址</label>
                                <input type="file" ref="file" id="image" placeholder="請輸入圖片連結" class="form-control" @change="uploadpic" >
                            </div>
                        </div>
                        <div class="form-group col">
                            <img v-if="this.isnew" src="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1349&amp;q=80"
                                alt="" class="img-fluid">
                                <img v-else :src="tempProduct.imageUrl[0]"
                                alt="" class="img-fluid">
                        </div>
                    </div>
                </div> 
                <div class="modal-footer">
                    <div class="form-group">
                        <div class="form-check">
                        <input  type="checkbox" id="enabled" class="form-check-input" v-model="tempProduct.enabled" >
                        
                        <label for="enabled" class="form-check-label">
                        是否啟用</label>
                        </div>
                    </div>
                    <div class="mt-3 text-right">
                        <button type="button" class="btn btn-primary" @click="updateProduct(isnew)">
                            測試 上傳產品資料 (需要通過驗證)
                        </button>
                        <p class="mb-0 mt-1">
                            <small>每次點擊都會新增資料，請避免過度點擊</small>
                        </p>
                    </div>
                </div>
                </div>
            </div>
        </div>`,
        data(){
            return {
                tempProduct:{
                    imageUrl:[],
            },
        };
        
        },
    props: ['isnew', 'status', 'user'],
        methods:{
            getProduct(id) {
                const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${id}`;
                axios.get(api).then((res) => {
                    
                    $('#productModal').modal('show');
                    this.tempProduct = res.data.data;
                }).catch((error) => {
                    console.log(error);
                });
            },
            updateProduct(isnew){
                switch(isnew){
                    case true :
                        let apiPath1 = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product`;
                        axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;
                        axios.post(apiPath1,this.tempProduct).then(()=>{
                            $('#productModal').modal('hide');
                            this.$emit('update')
                        }).catch((err)=>{
                            console.log(err)
                        });
                        break;
                    case false :
                        let apiPath2 = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${this.tempProduct.id}`;
                        axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;
                        axios.patch(apiPath2, this.tempProduct).then(() => {
                            $('#productModal').modal('hide');
                            this.$emit('update')
                        }).catch((err) => {
                            console.log(err)
                        });
                        break;
                };
            },
            //     // let api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product`;
            //     // let httpMethod = 'post';
            //     // // 當不是新增商品時則切換成編輯商品 API
            //     // if (!this.isNew) {
            //     //     api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${this.tempProduct.id}`;
            //     //     httpMethod = 'patch';
            //     // }

            //     // //預設帶入 token
            //     // axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

            //     // axios[httpMethod](api, this.tempProduct).then(() => {
            //     //     $('#productModal').modal('hide');
            //     //     this.$emit('update');
            //     // }).catch((error) => {
            //     //     console.log(error)
            //     // });
            // },
            // updateProduct() {
            //     // 新增商品
            //     let api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product`;
            //     let httpMethod = 'post';
            //     // 當不是新增商品時則切換成編輯商品 API
            //     if (this.isNew) {
            //         api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${this.tempProduct.id}`;
            //         httpMethod = 'patch';
            //     }

            //     //預設帶入 token
            //     axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

            //     axios[httpMethod](api, this.tempProduct).then(() => {
            //         $('#productModal').modal('hide');
            //         this.$emit('update');
            //     }).catch((error) => {
            //         console.log(error)
            //     });
            // },
            uploadpic(){
                const uploadedFile = this.$refs.file.files[0];
                const formData = new FormData();
                formData.append('file', uploadedFile);
                const url = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/storage`;
                // this.status.fileUploading = true;
                axios.post(url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }).then((response) => {
                    // this.status.fileUploading = false;
                    if (response.status === 200) {
                        this.tempProduct.imageUrl.push(response.data.data.path);
                    }
                }).catch(() => {
                    console.log('上傳不可超過 2 MB');
                    // this.status.fileUploading = false;
                });
            },
            
        },

}