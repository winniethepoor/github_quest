export default{
    template:
    `<button type="button" value="item.id" class="btn btn-lg btn-danger"  :disabled="isDisabled(item.id,data_cartlist.product)"@click="addCart(item)" >加入訂單</button>`,
    
}