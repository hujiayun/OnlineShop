<template>
  <div>
    <top-bar class="top-bar" />
    <router-view class="state" />
  </div>
</template>

<script>
import TopBar from "./components/TopBar/TopBar.vue";
export default {
  name: "Main",
  components: {
    TopBar,
  },
  created() {
    this.$store.commit("updateSignedIn", this.$cookies.get("signedIn"));
  },
};
</script>

<style>
@font-face {
  font-family: "Montserrat";
  src: local("Montserrat"),
    url("../../assets/fonts/Montserrat/Montserrat-Regular.ttf")
      format("truetype");
}

@font-face {
  font-family: "Lato";
  src: local("Lato"),
    url("../../assets/fonts/Lato/Lato-Regular.ttf") format("truetype");
}

body {
  margin: 0;
}

html {
  min-width: 120rem;
  font-size: 12px;
}

.top-bar {
  /* To make it stay on top */
  position: fixed;
}

.state {
  padding-top: 5rem;
}
</style>
