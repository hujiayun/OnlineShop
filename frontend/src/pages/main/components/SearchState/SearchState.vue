<template>
  <div class="search-state">
    <p class="title">Results</p>
    <span class="start content">Searching </span>
    <span class="content parameter" v-if="this.title !== ''">
      "{{ this.title }}"
    </span>
    <span class="content" v-else>All products</span>
    <span class="content" v-if="this.brand != ''"> of brand </span>
    <span class="content parameter" v-if="this.brand !== ''">
      "{{ this.brand }}"
    </span>
    <span class="content" v-if="this.maxPrice !== ''"> at max price </span>
    <span class="content parameter" v-if="this.maxPrice !== ''">
      ${{ this.maxPrice }}
    </span>
    <br />
    <span class="start content">Found </span>
    <span class="content parameter">{{ this.totalCount }} </span>
    <span class="content"> results </span>
    <div class="products">
      <product
        v-for="product in this.products"
        :key="product"
        :product="product"
      />
    </div>
    <div class="more">
      <button v-if="showNext" v-on:click="loadNextProducts">More</button>
    </div>
  </div>
</template>

<script>
import Product from "./Product.vue";
import axios from "axios";
export default {
  name: "SearchState",
  components: {
    Product,
  },
  data() {
    return {
      title: "",
      brand: "",
      maxPrice: 0,
      totalCount: 0,
      page: 1,
      products: [],
      showNext: false,
    };
  },
  methods: {
    loadNextProducts() {
      let url =
        "/api/search?keywords=" +
        this.title +
        "&brand=" +
        this.brand +
        "&maxPrice=" +
        this.maxPrice;
      url += "&page=" + this.page + "&size=12";
      axios.get(url).then((response) => {
        if (response.data.success) {
          this.totalCount = response.data.resultCount;
          if (response.data.isLastPage) {
            this.showNext = false;
          } else {
            this.page++;
            this.showNext = true;
          }
          this.products = this.products.concat(response.data.products);
        } else {
          console.log(response.data.message);
        }
      });
    },
    load() {
      this.title = this.$route.query.keywords;
      this.brand = this.$route.query.brand;
      this.maxPrice = this.$route.query.maxPrice;
      this.loadNextProducts();
    },
  },
  created() {
    this.load();
  },
  watch: {
    $route() {
      if (window.location.hash.includes("search")) {
        this.products = [];
        this.page = 1;
        this.load();
      }
    },
  },
};
</script>

<style scoped>
.products {
  display: flex;
  flex-wrap: wrap;
  gap: 0;
}
p {
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-left: 5.5rem;
  align-items: left;
}

.more {
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-bottom: 5rem;
}

.title {
  font-family: "Montserrat";
  font-size: 2.5rem;
  color: #5d5d81;
}

span {
  align-items: left;
}

.start {
  padding-left: 5.5rem;
}

.content {
  font-family: "Lato";
  font-size: 1.5rem;
  color: #000000;
}

.parameter {
  font-style: italic;
}

button {
  width: 10rem;
  height: 3rem;
  border: none;
  border-radius: 5rem;
  background-color: #5d5d81;
  font-family: "Montserrat";
  font-size: 1.5rem;
  color: #fefcfd;
  transition: all ease-in-out 100ms;
}

button:hover {
  background-color: #525271;
  cursor: pointer;
}

button:active {
  background-color: #454566;
}
</style>
