<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a href="#" aria-label="Предыдущая страница" class="pagination__link pagination__link--arrow" :class="{'pagination__link--disabled': page === 1}" @click.prevent="paginate(page-1)">
<!--        <svg width="8" height="14" fill="currentColor">-->
<!--          <use xlink:href="#icon-arrow-left"></use>-->
<!--        </svg>-->
        &laquo;
      </a>
    </li>
    <li class="pagination__item" v-for="item in pages" :key="item">
      <a href="#" class="pagination__link" :class="{'pagination__link--current': item === page}" @click.prevent="paginate(item)">
        {{item}}
      </a>
    </li>
    <li class="pagination__item">
      <a href="#" aria-label="Следующая страница" class="pagination__link pagination__link--arrow" :class="{'pagination__link--disabled': page === pages}" @click.prevent="paginate(page+1)">
<!--        <svg width="8" height="14" fill="currentColor">-->
<!--          <use xlink:href="#icon-arrow-right"></use>-->
<!--        </svg>-->
        &raquo;
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  model: {
    prop: 'page',
    event: 'paginate',
  },
  props: ['page', 'totalItems', 'perPage'], // Важно. Принимаем пропсы в стиле camelCase а пробрасываем/вызываем в стиле kebab-case. Vue автоматом сконвертит в camel. Ибо vue это html а там не исп camel.
  computed: {
    pages() {//кол-во страниц. Число. Передается в v-for, в шаблон.
      return Math.ceil(this.totalItems / this.perPage);//v-for="item in pages" - итерация по диапазону чисел как по итему в массиве.
    },
  },
  methods: {
    paginate(toPage) {
      if(toPage!==0 && toPage!==(Math.ceil(this.totalItems / this.perPage)+1)){
        console.log('paginating... this.page:',this.page, 'toPage:',toPage);
        this.$emit('paginate', toPage);// отправить событие 'paginate' и передаем 2м аргументом номер страницы на кот хотим переключиться.
      }else{
        console.log('paginating ignored');
      }
    },
  },
};
</script>
