export default{
  props: ['form','data_cartlist','user'],
    template:
  `


<div class="modal fade bd-example-modal-lg" id="shopmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header d-flex justify-content-between">
          <h5 class="modal-title " id="exampleModalLabel">商品明細及結帳付款</h5>
          
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
        </div>
        
    <div class="modal-body">
    <table class="table">
    
  <thead>
    <tr>
      <th scope="col">品名</th>
      <th scope="col">數量</th>
      <th scope="col">售價</th>
      <th scope="col">分類</th>
      <th scope="col">刪除</th>
      
      <th scope="col" class="text-right">
      <button type="button" @click="delCartlistAll()" class="btn btn-danger btn-sm">全部清除</button>
      </th>
      
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item,index) in data_cartlist" :key="item.product.id">
      <th scope="row">{{item.product.title}}</th>
      <td id="list_num">{{item.quantity}}</td>
      <td>{{item.product.price}}</td>
      <td>{{item.product.category}}</td>
      <td><a href="#" class="text-danger"@click.prevent="delSingle(item.product.id)">刪除</a></td>
      <td></td>
      
    </tr>

  </tbody>
</table>
    <validation-observer v-slot="{ invalid }" >
        <form>
        
          <div class="form-group">
          <validation-provider v-slot="{errors,classes}" rules="required">
          <label for="inputName">請輸入收件人</label>
          <input type="text" class="form-control" :class="classes" id="inputName" name="收件人" v-model="form.name">
          <span  class="invalid-feedback">{{errors[0]}}</span>
          </validation-provider>
          </div>
    
          <div class="form-group">
          <validation-provider v-slot="{errors,classes}" rules="required">
            <label for="inputAddress">請輸入收件地址</label>
            <input type="text" class="form-control" :class="classes" id="inputAddress"name="收件地址"  v-model="form.address">
            <span  class="invalid-feedback">{{errors[0]}}</span>
            </validation-provider>
          </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <validation-provider v-slot="{ errors, classes }" rules="required|min:8">
                <label for="tel">請輸入聯絡電話</label>
                <input id="phone" name="聯絡電話" v-model="form.tel" type="tel" class="form-control" :class="classes">
                <span  class="invalid-feedback">{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <div class="form-group col-md-6">
    
          <label for="payHow">請選擇付款方式</label>
          <validation-provider v-slot="{errors,classes}" rules="oneOf:1,2">
          <select id="payHow" name="付款方式" class="form-control" :class="classes" v-model="form.value">
          <option selected  value="0" >請選擇...</option>
          <option value="1">貨到付款</option>
          <option value="2">線上刷卡</option>
          </select>
          <span class="invalid-feedback">{{ errors[0] }}</span>
          </validation-provider>
      
        </div>
    
    </div>
    <div class="form-group">
    <div class="form-check">
    <validation-provider v-slot="{errors,classes}" :rules="{ required: { allowFalse: false } }">
      <input class="form-check-input" type="checkbox" id="gridCheck" v-model="form.checkValue">
      
      </validation-provider>
      <label class="form-check-label" for="gridCheck">
      確認無誤
      </label>
      <p class="h5 text-danger">請勾選完再把資料送出喔</p>
      </div>
      </div>
      <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
      <button type="button" class="btn btn-primary" :disabled="invalid" @click="test()">確認送出</button>
      </div>
      </form>
      </validation-observer>
    </div>
  </div>
</div>
</div>
`

,
data(){
    
    return{
      test:'alright',
      tempProduct:{
        imageUrl:[]
      },
      test1(){
        console.log('done!')
      },
      test2(){
        
        console.log(`A:${this.user.uuid}`)
      },

      delCartlistAll() {
        const api = `${this.user.apiPath}${this.user.uuid}/ec/shopping/all/product`
        axios.delete(api).then(() => {
          
          this.$emit('deleteall')
        })
      },
      delSingle(id){
        const api = `${this.user.apiPath}${this.user.uuid}/ec/shopping/${id}`;
        axios.delete(api).then(()=>{
          this.$emit('delete')
        })
        
      }

    };
  },
}