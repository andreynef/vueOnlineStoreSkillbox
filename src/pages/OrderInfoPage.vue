<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <BreadCrumbItem :to="{name:'main'}" text="Каталог"/>
        <BreadCrumbItem :to="{name:'cart'}" text="Корзина"/>
        <BreadCrumbItem :to="{name:'orderInfo'}" text="Оформление заказа"/>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span v-if="getOrderInfo">№ {{getOrderInfo.basket.id}}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary" v-if="getOrderInfo">
            <DictionaryItem left="Получатель" :right="getOrderInfo.name"/>
            <DictionaryItem left="Адрес доставки" :right="getOrderInfo.address"/>
            <DictionaryItem left="Телефон" :right="getOrderInfo.phone"/>
            <DictionaryItem left="Email" :right="getOrderInfo.email"/>
            <DictionaryItem left="Способ оплаты" right="картой при получении"/>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders" v-if="getOrderInfo">
            <li class="cart__order" v-for="item in getOrderInfo.basket.items">
              <h3>{{item.product.title}}</h3>
              <b>{{item.price * item.quantity}} ₽</b>
              <span>Артикул: {{item.id}}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p v-if="getOrderInfo">Итого: <b>{{getOrderInfo.basket.items.length}}</b> товара на сумму <b>{{getOrderInfo.totalPrice}} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
  import {mapGetters} from "vuex";
  import DictionaryItem from "../components/common/DictionaryItem";
  import BreadCrumbItem from "../components/common/BreadCrumbItem";

  export default {
    components: {DictionaryItem, BreadCrumbItem},
    computed: {
      ...mapGetters(['getOrderInfo']),
    },
    created() {
      if(this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id){
        return;
      }
      this.$store.dispatch('loadOrderInfo', this.$route.params.id)
    }
  };

</script>

