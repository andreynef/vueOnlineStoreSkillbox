<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.product.image" width="120" height="120" alt="item.product.title">
    </div>
    <h3 class="product__title">
      {{item.product.title}}
    </h3>
    <span class="product__code">
      Артикул: {{item.product.id}}
    </span>

    <Counter :amount.sync="amount"/>

    <b class="product__price">
      {{(item.product.price * item.amount) | numberFormat}} ₽
    </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины" @click.prevent="deleteProduct(item.productId)">
<!--      <svg width="20" height="20" fill="currentColor">-->
<!--        <use xlink:href="#icon-close"></use>-->
<!--      </svg>-->
      x
    </button>
  </li>
</template>

<script>
import numberFormat from "../../helpers/numberFormat";
import {mapActions, mapMutations} from "vuex";
import Counter from "../common/Counter";

export default {
  components: {Counter},
  filters: {// html -> {{product.price | numberFormat}} ₽ - значение слева передается аргументом в правую функцию. Фича Vue. Либо аналогом computed. А если просто html {{numberFormat(value)}} то б ошибка на нереактивность.
    numberFormat,
  },
  props: ['item'],
  computed: {
    amount: {//изменение инпута через сторовскую мутацию. Иначе никак. Правило стора.
      get(){
        return this.item.amount;
      },
      set(value){//изменение количества товара в итеме путем dispatch action.
        this.$store.dispatch('updateCartProductAmountAction', {productId:this.item.productId, amount: value});//вариант напрямую
        // this.updateCartProductAmountAction({productId:this.item.productId, amount: value})//вариант через mapActions
      }
    }
  },
  methods:{
    // deleteProduct(productId){
    //   this.$store.commit('deleteCartProduct', {productId:productId});//= dispatch action
    // },
    //либо так
    // ...mapMutations({deleteProduct:'deleteCartProduct'}),//dispatch action. Отправка в стор команды 'deleteCartProduct' под сдешним названием deleteProduct. Аргументы переданные в deleteProduct передаются автоматически.
    ...mapActions(['deleteProductFromCartAction', 'changeProductAmountAction', 'updateCartProductAmountAction']),
    deleteProduct() {//метод инициирующий экшн кот сделает запрос на сервер об удалении товара из корзины.
      this.deleteProductFromCartAction({productId:this.item.productId})
    },
  }
};
</script>
