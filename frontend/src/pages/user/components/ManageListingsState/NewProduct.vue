<template>
  <div class="new-product">
    <div class="switch" @click="showForm = !showForm">
      <p>Create Product</p>
      <p class="status" :class="{ 'status-on': showForm }">+</p>
    </div>
    <transition name="slide-fade">
      <div class="product-details" v-show="showForm">
        <div>
          <p class="label">Title</p>
          <input type="text" class="input" v-model="title" />
          <p class="error" v-show="errors.title !== ''">{{ errors.title }}</p>
        </div>
        <div>
          <p class="label">Brand</p>
          <select class="input" v-model="brand">
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
          <p class="error" v-show="errors.brand !== ''">{{ errors.brand }}</p>
        </div>
        <div>
          <p class="label">Price</p>
          <div class="price-wrapper">
            <p class="price-prefix">$</p>
            <input type="text" class="input price" v-model="price" />
          </div>
          <p class="error" v-show="errors.price !== ''">{{ errors.price }}</p>
        </div>
        <div>
          <p class="label">Stock</p>
          <input type="text" class="input" v-model="stock" />
          <p class="error" v-show="errors.stock !== ''">{{ errors.stock }}</p>
        </div>
        <div>
          <p class="label">Image URL</p>
          <input type="text" class="input" v-model="imageURL" />
          <p class="error" v-show="errors.imageURL !== ''">
            {{ errors.imageURL }}
          </p>
        </div>
        <div class="enabled-section">
          <p class="label">Enabled</p>
          <input type="checkbox" v-model="enabled" />
        </div>
        <button
          class="submit"
          :disabled="submitSucceeded || submitFailed"
          :class="{
            'submit-success': submitSucceeded,
            'submit-failure': submitFailed,
            'submit-normal': !submitSucceeded && !submitFailed,
          }"
          @click="add"
        >
          {{ addButtonPrompt }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "NewProduct",
  data() {
    return {
      showForm: false,
      title: "",
      brand: "",
      price: "",
      stock: "",
      imageURL: "",
      enabled: true,
      submitSucceeded: false,
      submitFailed: false,
      addButtonPrompt: "Add",
      errors: {
        title: "",
        brand: "",
        price: "",
        stock: "",
        imageURL: "",
      },
    };
  },
  methods: {
    validate() {
      this.errors = {
        title: "",
        brand: "",
        price: "",
        stock: "",
        imageURL: "",
      };
      let isValid = true;

      // Emptiness
      for (let field of ["title", "brand", "price", "stock", "imageURL"]) {
        if (this[field] === "") {
          this.errors[field] = "Cannot be empty";
          isValid = false;
        }
      }

      // Positive number
      for (let field of ["price", "stock"]) {
        if (isNaN(this[field]) || this[field] <= 0) {
          this.errors[field] = "Must be a positive number";
          isValid = false;
        }
      }

      // Integer
      if (
        !isNaN(this.stock) &&
        parseInt(this.stock) !== parseFloat(this.stock)
      ) {
        this.errors.stock = "Must be a positive integer";
        isValid = false;
      }

      return isValid;
    },
    add() {
      if (this.validate()) {
        axios
          .post("/api/user/product/add", {
            title: this.title,
            brand: this.brand,
            price: Math.round(parseFloat(this.price) * 100) / 100,
            stock: parseInt(this.stock),
            image: this.imageURL,
            disabled: !this.enabled,
          })
          .then(async (response) => {
            if (response.data.success) {
              this.addButtonPrompt = "Added";
              this.submitSucceeded = true;
              await new Promise((resolve) => setTimeout(resolve, 2000));
              this.submitSucceeded = false;
              this.addButtonPrompt = "Add";
              // Clear form
              this.title = "";
              this.brand = "";
              this.price = "";
              this.stock = "";
              this.imageURL = "";
            } else {
              // Populate errors from server
              for (let errorField of Object.keys(response.data.errors)) {
                this.errors[errorField] = response.data.errors[errorField];
              }
              this.addButtonPrompt = "Failed";
              this.submitFailed = true;
              await new Promise((resolve) => setTimeout(resolve, 2000));
              this.submitFailed = false;
              this.addButtonPrompt = "Add";
            }
          });
      }
    },
  },
};
</script>

<style scoped>
p {
  margin: 0;
}

.new-product {
  display: flex;
  flex-flow: column;
  gap: 2rem;
}

.switch {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 15rem;
  height: 3rem;
  background-color: #5d5d81;
  border-radius: 5rem;
  font-family: "Montserrat";
  font-size: 1.3rem;
  color: #e5e5f1;
  transition: all ease-in-out 100ms;
}

.switch:hover {
  cursor: pointer;
  background-color: #525271;
}

.switch:active {
  background-color: #454566;
}

.status {
  font-size: 2rem;
  transition: all ease-in-out 350ms;
}

.status-on {
  transform: rotateZ(135deg);
}

.product-details {
  display: flex;
  flex-flow: column;
  width: 20rem;
  gap: 1.5rem;
  border: #5d5d81 0.2rem solid;
  border-radius: 1rem;
  padding: 2rem;
}

.label {
  font-size: 1.5rem;
  font-family: "Montserrat";
  color: #5d5d81;
}

.input {
  width: 20rem;
  height: 2.4rem;
  border-radius: 5rem;
  padding-left: 1rem;
  padding-right: 0.8rem;
  box-sizing: border-box;
  border: 0.2rem solid #bfcde0;
  font-size: 1.1rem;
  text-overflow: ellipsis;
  line-height: 2rem;
}
.input:focus {
  outline: none;
}

.price {
  width: 17.5rem;
  border-radius: 0 5rem 5rem 0;
  border-left: none;
  padding-left: 0;
}

.price-wrapper {
  display: flex;
}

.price-prefix {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.2rem solid #bfcde0;
  width: 2.5rem;
  height: 2rem;
  border-radius: 5rem 0 0 5rem;
  border-right: none;
  font-family: "Montserrat";
  font-size: 1.4rem;
}

.error {
  color: #ff0000;
  font-family: "Lato";
}

.submit {
  width: 9rem;
  height: 2.4rem;
  border: none;
  border-radius: 5rem;
  font-family: "Montserrat";
  font-size: 1.2rem;
  transition: all ease-in-out 100ms;
  background-color: #5d5d81;
  color: #e5e5f1;
}

.submit-normal:hover {
  cursor: pointer;
  background-color: #525271;
}

.submit-normal:active {
  background-color: #454566;
}

.submit-success:disabled {
  cursor: default;
  background-color: green;
}

.submit-failure:disabled {
  cursor: default;
  background-color: #fe4874;
}

.enabled-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.slide-fade-enter-active {
  animation: slide-fade-in 0.5s;
}
.slide-fade-leave-active {
  animation: slide-fade-in 0.5s reverse;
}
@keyframes slide-fade-in {
  0% {
    transform: translateY(-1rem);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
  }
}
</style>
