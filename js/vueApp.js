let mainPage = Vue.component('vx-main',{
  name: 'challenges',
  template: `
    <div>
    <vx-search v-on:custom="customHandler"></vx-search>
    <section class="row justify-content-center">
    <div><p class="text-center"v-if="arr.length == 0 && !is_done">جاري التحميل...</p></div>
    <div><p class="text-center"v-if="arr.length == 0 && is_done">هناك خطب ما... يبدو أن هناك مشكلة.</p></div>
            <div class="col-lg-4 col-md-6"  v-for="value in arr">
               <router-link class="goto" :to="'challenge/' + value.id"> <div class="card mt-2 bg-dark"> <div class="card-body d-inline-flex">
              <div class="info-body"><p class="card-text font-weight-light"v-text="value.title"></p></div><div data-image><img :src="value.imageSrc" v-on:error="ImageError" class="img-fluid" alt="Responsive image"></div>
          </div>
            <div class="card-footer text-muted">
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
          </svg><span class="iconFooter" v-text="value.pageNambuer"></span>
          </div>
            </div>
                </div>
                   </router-link>
            </div>
            <nav v-if="arr.length >= 9" aria-label="Page navigation">
            <ul class="pagination justify-content-center">
              <li class="page-item">
                <a class="page-link" href="#">السابق</a>
              </li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item">
                <a class="page-link" href="#" tabindex="-1">التالي</a>
              </li>
            </ul>
          </nav>
</section>
</div>`,
    data: function () {
        return {
          arr: [],
          data_: null,
          is_done: false
        }
      },
      methods: {
        customHandler : function(e){
          this.data_ = e;
        },
        ImageError: function(e){
          e.target.src = "static-files/image-404.png"
        },
        getData: async function () {
          try {
            let _page = await fetch("https://script.google.com/macros/s/AKfycbzvhspgE7zujdr7CYNuTv9J9Gi4tlqwy0VQUcYB_sWyTLXBgcE2uT18ig5VCmgR1lH-/exec?type=feed", {cache: "no-cache"});
          if (_page.ok){
            this.arr = await _page.json();
          }
          this.is_done = true;
          } catch (error) {
          this.is_done = true;
          }
        },
          closeBox: function(element_){
          let alert = bootstrap.Alert.getInstance(element_.target);
          alert.close();
          }
      },
      mounted() {
        this.getData()
      },
    })

let search_ = Vue.component('vx-search',{
  data() {
    return {
      text: null
    }
  },
  methods: {
    do_: function (e) {
      this.$emit('custom', this.text);
    }
  },
    template: `<div class="row justify-content-center">
    <div class="mt-4 col-10 col-lg-3 col-md-8">
    <div class="input-group mb-3">
<input type="text" v-model="text" class="form-control text-light bg-dark" placeholder="ابحث في التحديات..." aria-label="Saerch" aria-describedby="button-addon2">
  <button class="btn btn-outline-dark bg-dark" type="button" v-on:click="do_()" id="button-search"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-image-fill"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
</svg> بحث</button>
</div>
    </div>
    </div>`
})

let page = Vue.component('vx-page',{
  data() {
    return {
      data_: ""
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.do_();
    })
  },
  watch: {
    '$route.params.page_name': function () {
      this.do_();
    }
  },
  methods: {
    do_: async function () {
    let _page = await fetch("pages/" + this.$route.params.page_name + ".html", {cache: "no-cache"});
    if (_page.status !== 404){
      this.data_ = await _page.text();
    } else {
      this.data_ = "<div><p class='text-center'>عذرًا يبدو أن الصفحة التي طلبتها، غير موجودة!</p></div>";
    }     
      }
  },
    template: `<div class="row">
    <div class="mt-4">
      <div v-html="data_"></div>
    </div>
    </div>`
})

var challenge = Vue.component('vx-challenge',{
  data() {
    return {
      questions:[],
      is_done: false
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    check_: function (e) {
      console.log(e.target.reportValidity());
      let object = new Object();
      (new FormData(this.$refs.form_).forEach((value, key) => object[key] = value));
      console.log(JSON.stringify(object));
    },
    getData: async function () {
      try {
        let _page = await fetch("https://script.google.com/macros/s/AKfycbzvhspgE7zujdr7CYNuTv9J9Gi4tlqwy0VQUcYB_sWyTLXBgcE2uT18ig5VCmgR1lH-/exec?type=challenges", {cache: "no-cache"});
      if (_page.ok){
        this.questions = await _page.json();
      }
      this.is_done = true;
      } catch (error) {
      this.is_done = true;
      }
    },
  },
    template: `<div class="row justify-content-center">
    <div class="p-2"></div>
    <div class="p-4" v-if="questions.length == 0"><p class="text-center">جاري التحميل...</p></div>
    <div v-show="questions.length > 0 && is_done" class="col-lg-7 me-auto">
      <form v-on:submit.prevent="check_($event)" ref="form_">
      <div data-form>
      <!--Card-->
      <div v-for="(value, q_index) in questions" class="card bg-dark p-4">
      <label for="exampleFormControlInput1" class="form-label fs-4 fw-bold">{{value.qText}}</label>
      <div class="form-check">
      <!--Check-->
      <div class="form-check ans" v-for="(ans, i) in value.choice">
      <input class="form-check-input" type="radio" :id="'Radios' + i" :name="q_index" :value="ans.letter">
      <label class="form-check-label" :for="'Radios' + i">
        {{ans.text}}
      </label>
    </div>
      <!--Check-->
      </div>
      </div>
    <!--Card-->
    </div>
    <div class="col-12 mt-3 text-end">
      <button type="submit" class="btn btn-light">أرسال</button>
    </div>
      </form>
    </div>
    </div>`
})
const routes = [
    {path: '/', redirect: '/challenges'},
    {path: '/challenges', component: mainPage},
    {path: '/page/:page_name', component: page},
    {path: '/challenge/:id', component: challenge}
]

const router = new VueRouter({
    routes,
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active"
})

var app = new Vue({
    router,
    methods: {
      getCookie: function (name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      },
      setCookie: function(name, value){
        document.cookie = name + '=' + value + ';';
      },
      trn_do: function(){
        document.body.style.overflow = "hidden";
      }, 
      trn_end: function(){
        this.$nextTick(function () {
          document.body.style.overflow = "auto";
        })
      }
    }
}).$mount('#app')
