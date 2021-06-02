<template>
<!--  <main class="content container" v-if="isProductLoading">Loading...</main>-->
  <Loader v-if="isProductLoading"/>
  <span v-else-if="isProductLoadingFailed">Network error. Couldn't load a product.</span>
  <main class="content container" v-else-if="!productData">Network error</main>
  <main class="content container" v-else="productData"><!-- Шаблон грузится сразу до всяких скриптов. Поэтому условие - "если уже есть инфа о товаре" -->
    <div class="content__top">
      <ul class="breadcrumbs">
        <BreadCrumbItem :to="{name:'main'}" text="Каталог"/>
        <BreadCrumbItem :to="{name:'main'}" :text="category.title"/>
        <BreadCrumbItem :to="{name:'product'}" :text="productData.title"/>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="productData.preview.file.url" :alt="productData.preview.slug">
        </div>
<!--        <ul class="pics__list">-->
<!--          <li class="pics__item">-->
<!--            <a href="" class="pics__link pics__link&#45;&#45;current">-->
<!--              <img width="98" height="98" src="img/phone-square-1.jpg" srcset="img/phone-square-1@2x.jpg 2x" alt="Название товара">-->
<!--            </a>-->
<!--          </li>-->
<!--          <li class="pics__item">-->
<!--            <a href="" class="pics__link">-->
<!--              <img width="98" height="98" src="img/phone-square-2.jpg" srcset="img/phone-square-2@2x.jpg 2x" alt="Название товара">-->
<!--            </a>-->
<!--          </li>-->
<!--          <li class="pics__item">-->
<!--            <a href="" class="pics__link">-->
<!--              <img width="98" height="98" src="img/phone-square-3.jpg" srcset="img/phone-square-3@2x.jpg 2x" alt="Название товара">-->
<!--            </a>-->
<!--          </li>-->
<!--          <li class="pics__item">-->
<!--            <a class="pics__link" href="#">-->
<!--              <img width="98" height="98" src="img/phone-square-4.jpg" srcset="img/phone-square-4@2x.jpg 2x" alt="Название товара">-->
<!--            </a>-->
<!--          </li>-->
<!--        </ul>-->
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{product.id}}</span>
        <h2 class="item__title">
          {{computedTitle}}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <b class="item__price">
              {{computedPrice | numberFormat}} ₽
            </b>
            <BaseFilterField title="Цвет:" :error="colorError">
              <ColorList :colors-arr="colors" :picked-color-id.sync="pickedColorId"/>
            </BaseFilterField>
            <BaseFilterField :title="product.mainProp.title" :error="offerError">
              <OfferList :offers-arr="offers" :picked-offer-id.sync="pickedOfferId"/>
            </BaseFilterField>

            <div class="item__row">
              <Counter :amount.sync="pickedAmount"/>
              <button class="button button--primery" type="submit" :disabled="isProductAdding">
                <Loader v-show="isProductAdding"/>
                <span v-show="!isProductAdding">В корзину</span>
              </button>
            </div>
            <div v-show="isProductAdded">Product successfully added</div>
            <div v-show="isProductAddingFailed">Network Error. Adding failed.</div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
            Синхронизация со смартфоном<br>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
            Поддержка сторонних приложений<br>
          </p>

          <a href="#">
            Все характеристики
          </a>

          <h3>Что это?</h3>

          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои велотренировки, сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS синхронизируется с датчиками по ANT+, объединяя полученную с них информацию. Данные отображаются на дисплее, а также сохраняются на смартфоне. При этом на мобильное устройство можно установить как фирменное приложение, так и различные приложения сторонних разработчиков. Велокомпьютер точно отслеживает местоположение, принимая сигнал с целого комплекса спутников. Эта информация позволяет смотреть уже преодоленные маршруты и планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют всего 74,6 x 47,3 x 22,1 мм. что не превышает габариты смартфона. Корпус гаджета выполнен из черного пластика. На обращенной к пользователю стороне расположен дисплей диагональю 56 мм. На дисплей выводятся координаты и скорость, а также полученная со смартфона и синхронизированных датчиков информация: интенсивность, скорость вращения педалей, пульс и т.д. (датчики не входят в комплект поставки). Корпус велокомпьютера имеет степень защиты от влаги IPX7. Это означает, что устройство не боится пыли, а также выдерживает кратковременное (до 30 минут) погружение в воду на глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
  import gotoPage from "@/helpers/gotoPage";
  import numberFormat from "@/helpers/numberFormat";
  import Counter from "../components/common/Counter";
  import ColorList from "../components/common/ColorList";
  import Loader from "../components/common/Loader";
  import {mapActions} from "vuex";
  import BreadCrumbItem from "../components/common/BreadCrumbItem";
  import OfferList from "../components/common/OfferList";
  import BaseFilterField from "../components/common/BaseFilterField";

  export default {
    components: {BaseFilterField, OfferList, BreadCrumbItem, Counter, ColorList, Loader},
    // props:['pageParams'],//=':page-params' на входе.
    data(){
      return {
        productData:null,
        pickedAmount: 1,
        pickedColorId:null,
        pickedOfferId: null,
        isProductLoading:false,
        isProductLoadingFailed:false,
        isProductAdded:false,
        isProductAdding:false,
        isProductAddingFailed:false,
      }
    },
    filters: {// html -> {{product.price | numberFormat}} ₽ - значение слева передается аргументом в правую функцию. Фича Vue. Либо аналогом computed.
      numberFormat,
    },
    computed: {//вычисляемые значения передают состояние (= значения с сервера)
      category() {
        return this.productData.category;
      },
      colors() {
        return this.productData.colors.map(item=>item.color);
      },
      offers() {
        return this.productData.offers;
      },
      computedPrice(){
        if (!this.pickedOfferId) return this.productData.price;
        return this.productData.offers.find(item=>item.id===this.pickedOfferId).price
      },
      computedTitle(){
        if (!this.pickedOfferId) return this.productData.title;
        return this.productData.offers.find(item=>item.id===this.pickedOfferId).title
      }
    },
    methods: {
      ...mapActions(['addProductToCart', 'loadProductAction']),//передаем метод добавления товара стору чтобы он через аксиос послал запрос и записал в свой стор нов данные.
      gotoPage,
      addToCart() {
        if(!this.pickedColorId||!this.pickedOfferId){
          return alert('Ошибка. Выберите цвет и предложение')
        }
        this.isProductAdded=false;
        this.isProductAdding=true;
        this.addProductToCart({offerId: this.pickedOfferId, amount: this.pickedAmount, colorId:this.pickedColorId})//...mapActions(['addProductToCart']) = dispatch action
        .then(()=> this.isProductAdded = true)
        .catch((err) => {this.isProductAddingFailed = true; console.log(err)})
        .then(()=>this.isProductAdding = false)

      },
      loadProduct() {//запрос на итем
        this.isProductLoading = true;
        this.isProductLoadingFailed = false;
        this.loadProductAction({productId: this.$route.params.id})//попав на эту стр по клику сверху формируется динамичн сегмент роутера откуда можно достать id запрашиваемого товара.
          .then(res => this.productData = res.data)
          .catch(() => this.isProductLoadingFailed = true)
          .then(() => this.isProductLoading = false);
      },
    },
    watch: {//при ручном изменении урла срабатывает рендер. При первом рендере и при послед изменениях.
      '$route.params.id': {
        handler(){//завод опция "что сделать"
          this.loadProduct();
        },
        immediate:true,//= метод created() сработает с таким же содержимым (при первом рендере). Можно удалить оригинальный метод created() .
      }
    },
  };
</script>
