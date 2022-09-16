<template>
  <tr class="detail" :class="{ disabled: isDisabled }">
    <td></td>
    <td>
      <div class="product-title">{{ title }}</div>
    </td>
    <td>${{ price }}</td>
    <td>×</td>
    <td>{{ quantity }}</td>
    <td>
      <div class="meta-info">
        <div class="modifiers">
          <input type="text" :disabled="isDisabled" v-model="quantityMod" />
          <button
            class="modify button"
            :disabled="isDisabled || this.quantityMod == this.quantity"
            v-on:click="modify"
          >
            Modify
          </button>
          <button class="remove button" v-on:click="remove">Remove</button>
        </div>
        <p class="error" v-if="error !== ''">{{ error }}</p>
      </div>
    </td>
    <td></td>
  </tr>
</template>

<script>
import axios from "axios";
export default {
  name: "CartItem",
  props: {
    id: String,
  },
  data() {
    return {
      quantityMod: "",
    };
  },
  computed: {
    title() {
      return this.$store.state.cart[this.id].title;
    },
    price() {
      return this.$store.state.cart[this.id].price;
    },
    quantity() {
      return this.$store.state.cart[this.id].quantity;
    },
    isDisabled: {
      set(disabled) {
        this.$store.commit("setItemDisabled", {
          id: this.id,
          disabled: disabled,
        });
      },
      get() {
        return this.$store.state.cart[this.id].isDisabled;
      },
    },
    error: {
      set(error) {
        this.$store.commit("setItemError", { id: this.id, error: error });
      },
      get() {
        return this.$store.state.cart[this.id].error;
      },
    },
  },
  methods: {
    modify() {
      this.error = "";
      // Validate format/range issues before querying backend
      if (
        this.quantityMod !== null &&
        (isNaN(this.quantityMod) ||
          parseInt(this.quantityMod) !== parseFloat(this.quantityMod) ||
          this.quantityMod < 0)
      ) {
        this.error = "Please enter a non-negative integer";
        return;
      }
      let quantity = parseInt(this.quantityMod);
      // Call remove if new quantity is zero
      if (quantity === 0) {
        this.remove();
        return;
      }
      // Query backend for max quantity
      axios.get("/api/products/" + this.id).then((response) => {
        if (response.data.success) {
          if (response.data.product.disabled) {
            this.isDisabled = true;
            this.error = "Product has been disabled";
          } else {
            let maxQuantity = parseInt(response.data.product.stock);
            if (quantity > maxQuantity) {
              this.error = `Quantity exceeds stock <${maxQuantity}>`;
            } else {
              // Update store
              this.$store.commit("setItemQuantity", {
                id: this.id,
                quantity: quantity,
              });
            }
          }
        } else {
          alert(response.data.message);
        }
      });
    },
    remove() {
      this.$store.commit("removeItem", this.id);
    },
  },
  created() {
    this.quantityMod = this.$store.state.cart[this.id].quantity;
  },
};
</script>

<style scoped>
.detail {
  font-family: "Lato";
  font-size: 1.5rem;
  height: 8rem;
}

.product-title {
  display: -webkit-box;
  /* max-width: 200px; */
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.modifiers {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
}

input[type="text"] {
  width: 4rem;
  height: 1.8rem;
  padding: 0 0.7rem 0 0.7rem;
  border: solid 0.2rem #5d5d81;
  border-radius: 5rem;
  font-family: "Lato";
  font-size: 1.2rem;
  text-overflow: ellipsis;
}

input[type="text"]:focus {
  outline: none;
}

input[type="text"]:disabled {
  border-color: #888888;
}

.button {
  width: 6rem;
  height: 2.2rem;
  border: none;
  border-radius: 5rem;
  font-family: "Montserrat";
  font-size: 1rem;
  transition: all ease-in-out 100ms;
}

.modify {
  background-color: #5d5d81;
  color: #e5e5f1;
}

.modify:hover {
  cursor: pointer;
  background-color: #525271;
}

.modify:active {
  background-color: #454566;
}

.remove {
  background-color: #fe4874;
  color: #fefcfd;
}

.remove:hover {
  cursor: pointer;
  background-color: #eb3c66;
}

.remove:active {
  background-color: #d92b55;
}

.button:disabled {
  cursor: default;
  background-color: #888888;
}

.disabled {
  color: #888888;
}

.error {
  margin: 0;
  font-size: 1rem;
  padding-top: 0.3rem;
  font-family: "Lato";
  color: #ff0000;
}
</style>
