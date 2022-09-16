<template>
  <select id="select" v-model="brand">
    <option value="">All brands</option>
    <option value="Apple">Apple</option>
    <option value="BlackBerry">BlackBerry</option>
    <option value="HTC">HTC</option>
    <option value="Huawei">Huawei</option>
    <option value="LG">LG</option>
    <option value="Motorola">Motorola</option>
    <option value="Nokia">Nokia</option>
    <option value="Samsung">Samsung</option>
    <option value="Sony">Sony</option>
  </select>
</template>

<script>
export default {
  name: "BrandFilter",
  computed: {
    brand: {
      get() {
        return this.$store.state.brand;
      },
      set(brand) {
        this.$store.commit("updateBrand", brand);
        document.getElementById("select").blur();
      },
    },
  },
};
</script>

<style scoped>
select {
  width: 10.5rem;
  height: 2.4rem;
  background-color: #5d5d81;
  border-radius: 5rem;
  transition: all ease-in-out 100ms;
  border: none;
  background: #5d5d81;
  font-family: "Montserrat";
  font-size: 1rem;
  color: #e5e5f1;
  text-align-last: center;
  transition: all ease-in-out 100ms;
}

select:hover {
  cursor: pointer;
  background-color: #525271;
}

.select:active,
select:focus {
  background-color: #454566;
  outline: none;
}
</style>
