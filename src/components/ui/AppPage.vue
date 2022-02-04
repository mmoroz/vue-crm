<template>
<div class="card">
  <h1 class="card-title">
    {{ title }}
    <slot name="header"></slot>
  </h1>
  <slot></slot>
</div>
</template>

<script>
export default {
  name: "AppPage",
  props: {
    title: {
      type: String,
      required:true
    },
    metaDesc: {
      type:String
    },
    metaKey:{
      type: String
    }
  },
  setup(props){
    document.title = `${props.title} | Bank-online`
    document.querySelector('meta[name="description"]').setAttribute("content", props.metaDesc);
    document.querySelector('meta[name="keywords"]').setAttribute("content", props.metaKey);
  }
}
</script>

<style scoped>

</style>