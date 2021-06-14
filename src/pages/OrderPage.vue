<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <BreadCrumbItem :to="{name:'main'}" text="Каталог"/>
        <BreadCrumbItem :to="{name:'cart'}" text="Корзина"/>
        <BreadCrumbItem :to="{name:'order'}" text="Оформление заказа"/>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        Количество товаров: {{cartDetailProducts.length}} шт.
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <!--верстка внутри компонентов-->
            <BaseFormText title="ФИО" placeholder="Введите ваше полное имя" v-model="formData.name" :error="formError.name"/>
            <BaseFormText title="Адрес доставки" placeholder="Введите ваш адрес" v-model="formData.address" :error="formError.address"/>
            <BaseFormText title="Телефон" placeholder="Введите ваш телефон" v-model="formData.phone" :error="formError.phone"/>
            <BaseFormText title="Email" placeholder="Введите ваш email" v-model="formData.email" :error="formError.email"/>
            <BaseFormTextarea title="Комментарий к заказу" placeholder="Ваши пожелания" v-model="formData.comment" :error="formError.comment"/>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <OptionsItem name="delivery" v-for="item in $store.state.deliveries" :key="item.id" :value="item" :picked.sync="formData.delivery">{{item.title}}</OptionsItem>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <OptionsItem name="payment" v-for="item in $store.state.payments" :key="item.id" :value="item" :picked.sync="formData.payments">{{item.title}}</OptionsItem>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="item in cartDetailProducts">
              <h3>{{item.product.title}}</h3>
              <b>{{item.product.price * item.amount}} ₽</b>
              <span>Артикул: {{item.productId}}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>{{computedDeliveryPrice}}</b></p>
            <p>Оплата: <b>{{computedPaymentMethod}}</b></p>
            <p>Итого: <b>{{cartDetailProducts.length}}</b> товара на сумму <b>{{cartTotalPrice}} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            <Loader v-show="status.isOrdering"/>
            <span v-show="!status.isOrdering">Оформить заказ</span>
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{formErrorMessage}}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from "../components/common/BaseFormText";
import BaseFormTextarea from "../components/common/BaseFormTextarea";
import {mapGetters} from "vuex";
import Loader from "../components/common/Loader";
import BreadCrumbItem from "../components/common/BreadCrumbItem";
import OptionsItem from "../components/common/OptionsItem";

  export default {
    components: {OptionsItem, BreadCrumbItem, BaseFormTextarea, BaseFormText, Loader},
    data(){
      return {
        formData: {},//самодобавление (v-model="formData.email")
        formError:{},//самодобавление при ответе с сервера (:error="formError.phone")
        formErrorMessage: '',
        status:{
          isOrdering: false,
          isOrderingFailed: false,
        },
      }
    },
    methods: {
      order(){
        this.formError = {};
        this.formErrorMessage = '';
        this.status.isOrdering = true;
        this.$store.dispatch('makeOrder', this.formData)
          .catch((error)=>{
            this.formError = error.response.data.error.request || {};//или пустой обьект чтобы не было ошибок тк используются обьектные внутренности при рендере.
            this.formErrorMessage = error.response.data.error.message;
            this.status.isOrderingFailed = true;
          })
          .then(() => this.status.isOrdering = false);
      },
    },
    computed: {
      ...mapGetters(['cartDetailProducts', 'cartTotalPrice']),//через запятую в массиве указ все геттеры из стора.
      computedDeliveryPrice(){
        if(!this.formData.delivery){
          return 'не указано'
        }else {
          if(this.formData.delivery.price==='0') return this.formData.delivery.title.toLowerCase() + ' (бесплатно)'
          return this.formData.delivery.price + '₽'
        }
      },
      computedPaymentMethod(){
        if(!this.formData.payments){
          return 'не указано'
        }else return this.formData.payments.title
      }
    },
    watch:{
      computedDeliveryPrice(){
        delete this.formData.payments;//зачистить поле оплаты которое зависит от доставки
        if(!this.formData.delivery) return;
        this.$store.dispatch('loadPayments', {id:this.formData.delivery.id})
      },
    }
  };

</script>

