<template>
  <div class="comments-state">
    <product-comments
      v-for="product of products"
      :key="product._id"
      :product="product"
    />
    <button v-if="!isLastPage" @click="load">Load more phones</button>
    <p class="empty-prompt" v-if="products.length === 0">
      You haven't created any product.
    </p>
  </div>
</template>

<script>
import axios from "axios";
import ProductComments from "./ProductComments.vue";
export default {
  name: "CommentsState",
  components: {
    ProductComments,
  },
  data() {
    return {
      products: [],
      pageSize: 5,
      pageNo: 1,
      isLastPage: false,
    };
  },
  methods: {
    load() {
      axios
        .get(`/api/user/products?page=${this.pageNo}&size=${this.pageSize}`)
        .then((response) => {
          if (response.data.success) {
            this.products = this.products.concat(response.data.products);
            this.isLastPage = response.data.isLastPage;
            this.pageNo++;
          } else {
            alert(response.data.message);
          }
        });
    },
  },
  created() {
    this.load();
  },
};
</script>

<style scoped>
.comments-state {
  padding: 5rem;
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 2rem;
  width: calc(100% - 22rem - 10rem);
}

button {
  width: 15rem;
  height: 3rem;
  border: none;
  border-radius: 5rem;
  font-family: "Montserrat";
  font-size: 1.2rem;
  transition: all ease-in-out 100ms;
  background-color: #5d5d81;
  color: #e5e5f1;
}

button:hover {
  cursor: pointer;
  background-color: #525271;
}

button:active {
  background-color: #454566;
}

.empty-prompt {
  text-align: center;
  padding: 1.2rem;
  font-family: "Montserrat";
  font-size: 2.5rem;
  color: #5d5d81;
}
</style>
