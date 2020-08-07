export default{
    props: ['page'],
    template:`<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    <li class="page-item" v-for="i in page.total_pages" :key="i"><a class="page-link" href="#" @click.prevent="updatePage(i)">{{i}}</a></li>
    
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>
</nav>`,
methods:{
    updatePage(num){
        //觸發外部事件$emit  emit()就只有傳資料到外層 update是載體名稱 num是資料
        this.$emit('updatepage', num)
    }
}

}