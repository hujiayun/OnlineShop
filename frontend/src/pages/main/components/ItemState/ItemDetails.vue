<template>
  <div class="details-wrapper">
    <img :src="imgPath" alt="Product image" />
    <div class="details">
      <p class="title">{{ title }}</p>
      <div>
        <p class="minor-detail first-minor-detail">Product by {{ brand }}</p>
        <p class="minor-detail">Stock: {{ stock }}</p>
        <p class="minor-detail">Seller: {{ seller }}</p>
      </div>
      <p class="price">${{ price }}</p>
      <input type="button" value="Add to cart" v-on:click="addToCart" />
      <p class="added-to-cart">Added to cart: {{ inCart }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ItemDetails",
  data() {
    return {
      productID: "",
      title: "",
      brand: "",
      stock: "",
      seller: "",
      price: "",
      imgPath: "",
    };
  },
  computed: {
    inCart: {
      get() {
        if (this.$store.state.cart[this.productID])
          return this.$store.state.cart[this.productID].quantity;
        else return 0;
      },
    },
  },
  methods: {
    addToCart() {
      if (!this.$cookies.get("signedIn")) {
        localStorage.setItem("last-visited", document.URL);
        window.location.href = "/session#/signin";
        return;
      }
      let quantity = prompt("Please specify the quantity to add");
      // Validate
      if (
        quantity !== null &&
        (isNaN(quantity) ||
          parseInt(quantity) !== parseFloat(quantity) ||
          quantity <= 0)
      ) {
        alert("Please enter a positive integer");
      } else if (quantity !== null) {
        quantity = parseInt(quantity);
        if (quantity + this.inCart > this.stock) {
          alert("Cannot add more than available stock");
        } else {
          this.$store.commit("addToCart", {
            id: this.productID,
            title: this.title,
            quantity: quantity,
            price: this.price,
          });
        }
      }
    },
  },
  created() {
    this.productID = this.$route.params.itemID;
    axios.get("/api/products/" + this.productID).then((response) => {
      if (response.data.success) {
        let product = response.data.product;
        this.title = product.title;
        this.brand = product.brand;
        this.stock = product.stock;
        this.seller = product.seller;
        this.price = product.price;
        this.imgPath = product.image;
      } else {
        console.log(response.data.message);
      }
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  width: 25rem;
  height: 25rem;
}

p {
  padding: 0;
  margin: 0;
}

.details-wrapper {
  font-family: "Lato";
  display: flex;
}

.details {
  margin-left: 8rem;
}

.title {
  font-size: 2rem;
  width: 60rem;
  height: 10rem;
  font-weight: bold;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.minor-detail {
  padding-top: 0.5rem;
  font-size: 1.5rem;
  font-style: italic;
}

.first-minor-detail {
  padding-top: 1.5rem;
}

.price {
  padding-top: 1.5rem;
  font-size: 3rem;
}

input[type="button"] {
  margin-top: 1.5rem;
  width: 15rem;
  height: 4rem;
  font-family: "Montserrat";
  font-size: 1.5rem;
  color: #e5e5f1;
  border-radius: 5rem;
  border: none;
  background-color: #5d5d81;
  transition: all ease-in-out 100ms;
}

input[type="button"]:hover {
  background-color: #525271;
  cursor: pointer;
}

input[type="button"]:active {
  background-color: #454566;
}

.added-to-cart {
  margin-top: 1.2rem;
  font-size: 1.2rem;
  font-family: "Lato";
}
</style>
