<template>
  <div class="price-filter">
    <input type="range" min="0" max="100" v-model.lazy="percentage" />
    <span class="max-price">max ${{ selectedPrice }}</span>
  </div>
</template>

<script>
export default {
  name: "PriceFilter",
  props: {
    minPrice: Number,
    maxPrice: Number,
  },
  computed: {
    selectedPrice: {
      get() {
        return this.$store.state.maxPrice;
      },
    },
    percentage: {
      get() {
        return (parseInt(this.$store.state.maxPrice) / this.maxPrice) * 100;
      },
      set(percentage) {
        this.percentage_ = percentage;
        this.$store.commit(
          "updateMaxPrice",
          Math.round(
            this.minPrice + (this.maxPrice - this.minPrice) * (percentage / 100)
          )
        );
      },
    },
  },
};
</script>

<style scoped>
.price-filter {
  width: 9rem;
}

.max-price {
  font-family: "Montserrat";
  font-size: 0.9rem;
  color: #e5e5f1;
}

input[type="range"] {
  width: 9rem;
  margin: 0;
}

input[type="range"]:hover {
  cursor: pointer;
}
</style>
