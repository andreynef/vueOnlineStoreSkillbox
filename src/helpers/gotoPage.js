import eventBus from "../eventBus";

export default function gotoPageFromItem(pageName, pageParams){
  eventBus.$emit('gotoPageFromItem', pageName, pageParams);//отправка события в глобальн обл видимости дабы избежать дриллинга.
}
