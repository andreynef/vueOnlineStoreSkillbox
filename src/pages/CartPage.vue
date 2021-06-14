<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{name:'main'}" class="breadcrumbs__link">
            Каталог
          </router-link>        </li>
        <li class="breadcrumbs__item">
          <router-link :to="{name:'cart'}" class="breadcrumbs__link">
            Корзина
          </router-link>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        Количество товаров: {{cartDetailProducts.length}} шт.
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in cartDetailProducts" :key="item.productId" :item="item"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{cartTotalPrice | numberFormat}} ₽</span>
          </p>

          <router-link :to="{name:'order'}" tag="button" class="cart__button button button--primery" type="submit" v-if="cartDetailProducts.length">
            Перейти к оформлению заказа
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from "../helpers/numberFormat";
import {mapGetters} from "vuex";
import CartItem from "../components/cart/CartItem";

  export default {
    components: {CartItem},
    filters: {// html -> {{product.price | numberFormat}} ₽ - значение слева передается аргументом в правую функцию. Фича Vue. Либо аналогом computed.
      numberFormat,
    },
    computed: {
      // ...mapGetters(['cartDetailProducts']),//через запятую в массиве указ все геттеры из стора.
      // localProducts(){
      //   return this.cartDetailProducts;
      //   // return this.$store.getters.cartDetailProducts;//вариант доставания метода без mapGetters.
      // },
      //либо просто
      // ...mapGetters({localProducts:'cartDetailProducts', localTotalPrice:'cartTotalPrice'})//переименование сторного геттера на локальный.
      ...mapGetters(['cartDetailProducts','cartTotalPrice'])
    },
  };

</script>

