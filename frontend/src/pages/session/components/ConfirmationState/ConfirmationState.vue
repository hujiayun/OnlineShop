<template>
  <div class="centre-content">
    <p class="prompt-text">An email has been sent to the address</p>
    <p class="email-text">{{ this.email }}</p>
    <p class="prompt-text">Please continue with the link in the email</p>
    <div class="time" v-show="toRedirect">redirect in {{ timerCount }}s</div>
    <div class="nav-buttons" v-show="!toRedirect">
      <button class="nav-button" v-on:click="redirectToHome">Home</button>
      <button class="nav-button" v-on:click="redirectToSignIn">Sign-in</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmationState",
  data() {
    return {
      email: "",
      toRedirect: false,
      timerCount: 3,
    };
  },
  methods: {
    redirectToHome() {
      window.location.href = "/main#/home";
    },
    redirectToSignIn() {
      window.location.href = "/session#/signin";
    },
  },
  created() {
    this.email = this.$route.query.email;
    this.toRedirect = this.$route.query.redirect !== undefined;
    if (this.toRedirect) {
      let countdownTask = setInterval(() => {
        if (this.timerCount) {
          this.timerCount--;
        } else {
          clearInterval(countdownTask);
          let redirectDestination = "/main#/home";
          if (localStorage.getItem("last-visited")) {
            redirectDestination = localStorage.getItem("last-visited");
          } else {
            console.log("There was no storage of last page");
          }
          window.location.href = redirectDestination;
        }
      }, 1000);
    }
  },
};
</script>

<style scoped>
.centre-content {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  line-height: 100%;
  height: 55rem;
}

.prompt-text {
  font-family: "Montserrat";
  font-size: 2rem;
  color: #5d5d81;
  vertical-align: middle;
}

.email-text {
  font-family: "Lato";
  font-size: 2rem;
  color: #000000;
}

.nav-buttons {
  width: 25rem;
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}

.nav-button {
  width: 11rem;
  height: 3rem;
  font-family: "Montserrat";
  font-size: 1.5rem;
  border: none;
  border-radius: 5rem;
  color: #000000;
  background-color: #bfcde0;
  transition: all ease-in-out 100ms;
}

.nav-button:hover {
  cursor: pointer;
  background-color: #9baabd;
}

.nav-button:active {
  background-color: #8596ae;
}
.time {
  font-family: "Montserrat";
  color: #000000;
  font-size: 1.3rem;
  text-align: center;
  margin-top: 0.5rem;
}
</style>
