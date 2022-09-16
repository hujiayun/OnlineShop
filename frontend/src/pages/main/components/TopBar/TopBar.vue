<template>
  <div class="top-bar">
    <span class="title"><a href="/main#/home">SellPhone</a></span>
    <div class="search-filter">
      <search-bar @search-and-filter="searchAndFilter" />
      <filters
        v-show="showFilters"
        @search-and-filter="searchAndFilter"
        :minPrice="minPrice"
        :maxPrice="maxPrice"
      />
    </div>
    <div class="buttons-wrapper">
      <input
        type="button"
        value="Checkout"
        v-on:click="redirectToCheckout"
        class="button nav-button"
      />
      <input
        type="button"
        value="Sign-in"
        v-if="!this.$store.state.signedIn"
        v-on:click="redirectToSignIn"
        class="button nav-button"
      />
      <input
        type="button"
        value="Profile"
        v-if="this.$store.state.signedIn"
        v-on:click="redirectToProfile"
        class="button nav-button"
      />
      <input
        type="button"
        value="Sign-out"
        v-if="this.$store.state.signedIn"
        v-on:click="signOut"
        class="button action-button"
      />
    </div>
  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";
import Filters from "./Filters.vue";
import axios from "axios";
export default {
  name: "TopBar",
  components: {
    SearchBar,
    Filters,
  },
  data() {
    return {
      maxPrice: 0,
      minPrice: 0,
      showFilters: false,
    };
  },
  methods: {
    redirectToSignIn: function () {
      localStorage.setItem("last-visited", document.URL);
      window.location.href = "/session#/signin";
    },
    redirectToCheckout: function () {
      if (this.$store.state.signedIn) {
        localStorage.setItem("last-visited", document.URL);
        window.location.href = "/checkout";
      } else {
        localStorage.setItem("last-visited", document.URL);
        window.location.href = "/session#/signin";
      }
    },
    redirectToProfile: function () {
      window.location.href = "/user#/profile";
    },
    signOut: function () {
      if (confirm("Are you sure you want to sign-out?")) {
        axios.post("/api/session/signout");
        this.$cookies.remove("signedIn");
        // Update state upon signing out
        this.$store.commit("updateSignedIn", null);
        this.$store.commit("signOut");
        this.$store.commit("clearCart");
        window.location.href = "/main#/home";
      }
    },
    searchAndFilter: function () {
      // Grab search params from VueX
      window.location.hash =
        "/search?keywords=" +
        this.$store.state.keywords +
        "&brand=" +
        this.$store.state.brand +
        "&maxPrice=" +
        this.$store.state.maxPrice;
    },
  },
  created() {
    // Update upon visiting the page
    this.$store.commit("updateSignedIn", this.$cookies.get("signedIn"));

    // Pull from server the price stats
    axios.get("/api/product/stats").then((response) => {
      this.maxPrice = response.data.maxPrice;
      this.minPrice = response.data.minPrice;

      if (window.location.hash.includes("search")) {
        // Update selected maxPrice if provided by url
        let params = new URLSearchParams(window.location.hash.slice(9));
        this.$store.commit("updateMaxPrice", params.get("maxPrice"));
      } else {
        // Otherwise use maximum
        this.$store.commit("updateMaxPrice", this.maxPrice);
      }
    });

    // If the page is visited via /search, grab search criteria from URL
    // and update vuex
    if (window.location.hash.includes("search")) {
      let params = new URLSearchParams(window.location.hash.slice(9));
      this.$store.commit("updateKeywords", params.get("keywords"));
      this.$store.commit("updateBrand", params.get("brand"));
    }
  },
  watch: {
    $route() {
      this.showFilters = this.$route.href.startsWith("#/search");
    },
  },
};
</script>

<style scoped>
.top-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5rem;
  background-color: #3b3355;
}

.title {
  margin: 0;
  width: calc((100% - 60rem) / 2);
  padding: 0 0 0 2rem;
  font-family: "Montserrat";
  font-size: 2.5rem;
  line-height: 2.5rem;
  color: #e5e5f1;
}

a,
a:visited {
  color: inherit;
  text-decoration: none;
}

.search-filter {
  display: flex;
  gap: 2.1rem;
  width: 60rem;
  justify-content: center;
  align-items: center;
}

.buttons-wrapper {
  display: flex;
  margin-left: auto;
  padding-right: 2rem;
  gap: 1.4rem;
}

.button {
  width: 9.5rem;
  height: 2.4rem;
  border: none;
  border-radius: 5rem;
  font-family: "Montserrat";
  font-size: 1rem;
  transition: all ease-in-out 100ms;
}

.nav-button {
  background-color: #bfcde0;
  color: #000000;
}

.action-button {
  background-color: #5d5d81;
  color: #e5e5f1;
}

.nav-button:hover {
  cursor: pointer;
  background-color: #9baabd;
}

.nav-button:active {
  background-color: #8596ae;
}

.action-button:hover {
  cursor: pointer;
  background-color: #525271;
}

.action-button:active {
  background-color: #454566;
}
</style>
