<template>
  <div>
    <div class="top-bar">
      <span class="title"><a href="/main#/home">SellPhone</a></span>
    </div>
    <div class="error-state">
      <p class="content">404 not found</p>
      <button class="nav-button" @click="redirectToHome">Home</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  methods: {
    redirectToHome() {
      window.location.href = "/main#/home";
    },
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

p {
  margin: 0;
}

body {
  margin: 0;
}

html {
  min-width: 120rem;
  font-size: 12px;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 5rem;
  background-color: #3b3355;
}

.title {
  margin: 0;
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

.error-state {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  line-height: 100%;
  height: 55rem;
}

.content {
  font-family: "Montserrat";
  font-size: 3.3rem;
  color: #5d5d81;
  vertical-align: middle;
  text-align: center;
}

.nav-button {
  width: 11rem;
  height: 3rem;
  font-family: "Montserrat";
  font-size: 1.3rem;
  border: none;
  border-radius: 5rem;
  color: #000000;
  background-color: #bfcde0;
  transition: all ease-in-out 100ms;
  margin-top: 2.3rem;
}

.nav-button:hover {
  cursor: pointer;
  background-color: #9baabd;
}

.nav-button:active {
  background-color: #8596ae;
}
</style>
