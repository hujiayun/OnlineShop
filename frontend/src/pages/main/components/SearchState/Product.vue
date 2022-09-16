<template>
  <div class="product" v-on:click="toItemState">
    <img :src="product.image" alt="product image" />
    <p class="product-title">{{ this.product.title }}</p>
    <p class="product-brand">Product by {{ product.brand }}</p>
    <p class="product-stock">Stock: {{ product.stock }}</p>
    <p class="product-price">${{ product.price }}</p>
  </div>
</template>

<script>
export default {
  name: "Product",
  props: {
    product: Object,
  },
  data() {
    return {
      title: "",
    };
  },
  methods: {
    toItemState: function () {
      window.location.hash = "/item/" + this.product._id;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product {
  margin: 2rem;
  border-radius: 25px;
  border: 0.3rem solid #e5e5f1;
  background-color: #ffffff;
  padding: 1.5rem;
  width: 10rem;
  height: 23rem;
  justify-content: space-between;
  transition: all ease-in-out 100ms;
}

.product:hover {
  cursor: pointer;
  background-color: #e5e5f1;
}

.product:active {
  background-color: #d3d3eb;
  border: 0.3rem solid #d3d3eb;
  outline: none;
}

img {
  width: 10rem;
  height: 10rem;
}

p {
  padding: 0;
  margin: 0;
}

.product-title {
  margin-top: 0.5rem;
  width: 10rem;
  height: 5.4rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  font-family: "Lato";
  font-size: 1.1rem;
  color: #000000;
}

.product-brand {
  margin-top: 1rem;
  font-family: "Lato";
  font-size: 0.9rem;
  color: #a4a4a4;
  font-style: italic;
}

.product-stock {
  margin-top: 0.1rem;
  font-family: "Lato";
  font-size: 0.9rem;
  color: #a4a4a4;
  font-style: italic;
}

.product-price {
  margin-top: 0.7rem;
  font-family: "Lato";
  font-size: 2.7rem;
  color: #5d5d81;
  font-weight: bold;
}
</style>
