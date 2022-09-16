<template>
  <div class="top-bar">
    <span class="title"><a href="/main#/home">SellPhone</a></span>
    <span>{{ state }}</span>
  </div>
</template>

<script>
export default {
  name: "TopBar",
  props: {
    state: String,
  },
};
</script>

<style scoped>
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 5rem;
  background-color: #3b3355;
}

.title {
  margin: 0;
  width: calc((100% - 60rem) / 2);
  padding: 0 0 0 2rem;
  font-family: "Montserrat";
  font-size: 2.5rem;
  line-height: 2.5rem;
  color: #e5e5f1;
}

a,
a:visited {
  color: inherit;
  text-decoration: none;
}
</style>
