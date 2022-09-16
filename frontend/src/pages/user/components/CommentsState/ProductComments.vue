<template>
  <table>
    <thead>
      <tr>
        <th class="padding-col"></th>
        <th>{{ product.title }}</th>
        <th class="padding-col"></th>
      </tr>
    </thead>
    <tbody>
      <review v-for="review of reviews" :key="review" :review="review" />
      <tr v-if="!isLastPage">
        <td colspan="3" class="more-row">
          <button @click="load">Load more reviews</button>
        </td>
      </tr>
      <tr v-if="reviews.length === 0">
        <td colspan="3" class="empty-prompt">
          No comments can be found for this product
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";
import Review from "./Review.vue";
export default {
  name: "ProductComments",
  components: {
    Review,
  },
  props: {
    product: Object,
  },
  data() {
    return {
      reviews: [],
      pageNo: 1,
      pageSize: 3,
      isLastPage: false,
    };
  },
  methods: {
    load() {
      axios
        .get(
          `/api/products/${this.product._id}/reviews?page=${this.pageNo}&size=${this.pageSize}`
        )
        .then((response) => {
          if (response.data.success) {
            this.reviews = this.reviews.concat(response.data.reviews);
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

<style>
table {
  width: 75rem;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0;
}

.padding-col:first-child {
  width: 2rem;
  border-top-left-radius: 1rem;
}

.padding-col:last-child {
  width: 2rem;
  border-top-right-radius: 1rem;
}

.more-row {
  text-align: center;
  padding: 2rem;
}

th {
  font-family: "Montserrat";
  font-size: 1.4rem;
  color: #e5e5f1;
  font-weight: unset;
  padding: 0.8rem 0 0.8rem 0;
  background-color: #5d5d81;
}

thead {
  text-align: center;
}

td:first-child {
  border-left: solid #5d5d81 0.2rem;
}

td:last-child {
  border-right: solid #5d5d81 0.2rem;
}

tbody > tr:last-child > td {
  border-bottom: solid #5d5d81 0.2rem;
}

tbody > tr:last-child > td:first-child {
  border-bottom-left-radius: 1rem;
}

tbody > tr:last-child > td:last-child {
  border-bottom-right-radius: 1rem;
}

tbody > tr:not(:last-child) > td:not(:first-child, :last-child) {
  border-bottom: 0.2rem solid #bfcde0;
}
</style>

<style scoped>
button {
  width: 13rem;
  height: 2.5rem;
  border: none;
  border-radius: 5rem;
  font-family: "Montserrat";
  font-size: 1.1rem;
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
  font-size: 1.5rem;
  color: #5d5d81;
}
</style>
