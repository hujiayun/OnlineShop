<template>
  <div class="home-state">
    <p class="title">Sold out soon</p>
    <div class="items">
      <home-item
        v-for="item in this.soldOutSoonItems"
        :key="item.id"
        :item="item"
      />
    </div>
    <div class="hline"></div>
    <p class="title">Best sellers</p>
    <div class="items">
      <home-item
        v-for="item in this.bestSellerItems"
        :key="item.id"
        :item="item"
      />
    </div>
  </div>
</template>

<script>
import HomeItem from "./HomeItem.vue";
import axios from "axios";
export default {
  name: "HomeState",
  components: {
    HomeItem,
  },
  data() {
    return {
      soldOutSoonItems: [],
      bestSellerItems: [],
    };
  },
  created() {
    axios.get("/api/top/soldoutsoon").then((response) => {
      if (response.data.success) {
        for (let item of response.data.products) {
          this.soldOutSoonItems.push({
            id: item._id,
            image: item.image,
            label:
              "$" +
              // eslint-disable-next-line
              (Math.round(parseFloat(item.price) * 100) / 100).toFixed(2),
          });
        }
      } else {
        console.log(response.data.message);
      }
    });

    axios.get("/api/top/bestsellers").then((response) => {
      if (response.data.success) {
        for (let item of response.data.products) {
          this.bestSellerItems.push({
            id: item._id,
            image: item.image,
            label:
              "" +
              (Math.round(parseFloat(item.averageRating) * 10) / 10).toFixed(1),
          });
        }
      } else {
        console.log(response.data.message);
      }
    });
  },
};
</script>

<style scoped>
.home-state {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
}

.title {
  font-family: "Montserrat";
  font-size: 4rem;
  color: #5d5d81;
  margin: 0;
  margin-bottom: 2.5rem;
}

.hline {
  width: 80%;
  height: 0.3rem;
  background-color: #bfcde0;
  border-radius: 5rem;
  margin: 2.5rem 0;
}

.sold-out-soon {
  display: flex;
}

.items {
  display: flex;
  gap: 3rem;
}
</style>
