<template>
  <tr class="detail">
    <td></td>
    <td>
      <div class="product-title">{{ details.title }}</div>
    </td>
    <td>{{ details.brand }}</td>
    <td>${{ details.price }}</td>
    <td>{{ details.stock }}</td>
    <td>
      <div
        @click="toggle"
        class="toggle-wrapper"
        :class="{
          'toggle-wrapper-disabled': details.disabled,
          'toggle-wrapper-enabled': !details.disabled,
        }"
      >
        <div
          class="toggle"
          :class="{
            'toggle-disabled': details.disabled,
            'toggle-enabled': !details.disabled,
          }"
        ></div>
      </div>
    </td>
    <td><button class="remove" @click="remove">Remove</button></td>
    <td></td>
  </tr>
</template>

<script>
export default {
  name: "Product",
  props: {
    details: Object,
  },
  methods: {
    toggle() {
      this.$emit("toggle", this.details._id);
    },
    remove() {
      this.$emit("remove", this.details._id);
    },
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
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.toggle-wrapper {
  width: 4.5rem;
  height: 2.2rem;
  border-radius: 5rem;
  display: flex;
  align-items: center;
  transition: all ease-in-out 100ms;
}

.toggle-wrapper-enabled {
  background-color: #5d5d81;
  /* justify-content: right; */
}

.toggle-wrapper-enabled:hover {
  cursor: pointer;
  background-color: #525271;
}

.toggle-wrapper-enabled:active {
  background-color: #454566;
}

.toggle-wrapper-disabled {
  background-color: #e5e5f1;
  justify-content: left;
}

.toggle-wrapper-disabled:hover {
  cursor: pointer;
  background-color: #d1d1e0;
}

.toggle-wrapper-disabled:active {
  background-color: #bdbdd1;
}

.toggle {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 5rem;
  transition: all ease-in-out 100ms;
}

.toggle-enabled {
  background-color: #e5e5f1;
  margin-left: 2.7rem;
}

.toggle-disabled {
  background-color: #5d5d81;
  margin-left: 0.25rem;
}

.remove {
  width: 7rem;
  height: 2rem;
  border: none;
  border-radius: 5rem;
  font-family: "Montserrat";
  font-size: 1.1rem;
  background-color: #fe4874;
  color: #fefcfd;
  transition: all ease-in-out 100ms;
}

.remove:hover {
  cursor: pointer;
  background-color: #eb3c66;
}

.remove:active {
  background-color: #d92b55;
}
</style>
