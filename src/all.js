

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


function product() {
    const obj = {
        data: {
            apiPath: 'https://course-ec-api.hexschool.io/api/',
            uuid: 'f8b5a05a-fd65-4097-8584-aa161833bcc1',
            products: [],
        },
        getData: function () {
            const vm = this;
            const api = `${vm.data.apiPath}${vm.data.uuid}/ec/products`;
            axios.get(api).then((res) => {
                vm.data.products = res.data.data;
                vm.render();
                console.log(res.data);
            }).catch((err) => {
                console.log('錯誤', err);
            }).finally(() => {
                console.log('api 請求結束');
            });
        },
        render: function () {
            const vm = this;
            let str = '';
            const jsInnerCard = document.getElementById('innercard');
            vm.data.products.forEach((item) => {
                str += `<div class="col mb-4">
    <div class="card">
      <img src="${item.imageUrl}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${ item.title}</h5>
        <p class="card-text">${ item.content}</p>
<span class="btn btn-outline-primary"  >${item.price}元</span>
<div class="mt-5 card-footer">

<a href="#" class="btn btn-lg btn-danger">加入訂單</a>
</div>
      </div>
    </div>
  </div>`
            });
            
            jsInnerCard.innerHTML= str;
        },
    };
    obj.getData();
};

product();


