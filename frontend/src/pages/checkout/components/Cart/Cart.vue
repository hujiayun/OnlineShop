<template>
  <table>
    <thead class="head">
      <tr>
        <th class="padding-col"></th>
        <th class="product-col">Product</th>
        <th class="price-col">Price</th>
        <th class="times-col"></th>
        <th class="quantity-col">Quantity</th>
        <th></th>
        <th class="padding-col"></th>
      </tr>
    </thead>
    <tbody>
      <cart-item v-for="[id] of cart" :key="id" :id="id" />
      <tr v-if="cart.length === 0">
        <td colspan="7" class="empty-prompt">Empty Cart</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import CartItem from "./CartItem";
export default {
  name: "Cart",
  components: {
    CartItem,
  },
  computed: {
    cart() {
      return Object.entries(this.$store.state.cart);
    },
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

th {
  font-family: "Montserrat";
  font-size: 1.4rem;
  color: #e5e5f1;
  font-weight: unset;
  padding: 0.8rem 0 0.8rem 0;
  background-color: #5d5d81;
}

.product-col {
  width: 35rem;
}

.price-col {
  width: 8rem;
}

.times-col {
  width: 2rem;
}

.quantity-col {
  width: 6rem;
}

thead {
  text-align: left;
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

.empty-prompt {
  text-align: center;
  padding: 1.2rem;
  font-family: "Montserrat";
  font-size: 1.5rem;
  color: #5d5d81;
}
</style>
