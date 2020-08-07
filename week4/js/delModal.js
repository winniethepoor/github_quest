export default{
    template:
    ` <div class="modal fade" id="delProductModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">刪除產品</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary" @click="productdel">確定刪除</button>
      </div>
    </div>
  </div>
</div>`,
    data() {
        return {
            tempProduct: {
                imageUrl: [],
            },
        };

    },
    props:['user',''],
    methods:{
        getProduct(id) {
            const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${id}`;
            axios.get(api).then((res) => {

                $('#delProductModal').modal('show');
                this.tempProduct = res.data.data;
            }).catch((error) => {
                console.log(error);
            });
        },
        productdel(){
            const url = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${this.tempProduct.id}`;
            axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;
            axios.delete(url).then(()=>{

                $('#delProductModal').modal('hide');
                this.$emit('update')
            }).catch((err) => {
                console.log(err)
            });
        }
    }
}