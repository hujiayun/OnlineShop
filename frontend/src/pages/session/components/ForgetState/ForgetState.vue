<template>
  <div class="forget-state">
    <p class="title" style="display: inline">Verify your email</p>
    <div class="section">
      <p class="label">Email</p>
      <input type="email" class="email-input" v-model="email" />
      <p class="error" v-if="emailError !== ''">
        {{ emailError }}
      </p>
    </div>
    <button class="button verify" v-on:click="validate">Verify</button>
    <button class="button back" v-on:click="redirectToSignIn">Back</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ForgetState",
  data() {
    return {
      email: "",
      emailError: "",
    };
  },
  methods: {
    validate() {
      let emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // Unset all errors
      this.emailError = "";
      // Validate on client side
      if (this.email === "") {
        this.emailError = "Cannot be empty";
        return;
      } else if (!emailRegex.test(this.email)) {
        this.emailError = "Invalid email format";
        return;
      }

      axios
        .post("/api/session/forget", {
          email: this.email,
        })
        .then((response) => {
          if (response.data.success) {
            window.location.href = `/session#/confirmation?email=${this.email}`;
          } else {
            this.emailError = response.data.message;
          }
        });
    },
    redirectToSignIn: function () {
      window.location.href = "/session#/signin";
    },
  },
};
</script>

<style scoped>
p {
  padding: 0;
  margin: 0;
}

.forget-state {
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-top: 14rem;
  gap: 0;
}

.title {
  font-family: "Montserrat";
  font-size: 2.35rem;
  color: #5d5d81;
  width: 20rem;
  text-align: center;
  margin-bottom: 2rem;
  white-space: pre-wrap;
}

.section {
  margin-top: 1rem;
  width: 25rem;
}

.label {
  font-family: "Montserrat";
  font-size: 1.5rem;
  color: #5d5d81;
}

.email-input {
  width: 25rem;
  height: 2.4rem;
  border-radius: 5rem;
  padding-left: 1rem;
  padding-right: 0.8rem;
  margin-top: 0.5rem;
  box-sizing: border-box;
  border: 0.2rem solid #bfcde0;
  font-family: "Lato";
  font-size: 1.3rem;
  text-overflow: ellipsis;
  line-height: 2rem;
}

.email-input:focus {
  outline: none;
}

.button {
  width: 15.8rem;
  height: 3.6rem;
  font-family: "Montserrat";
  font-size: 1.5rem;
  border: none;
  border-radius: 5rem;
  transition: all ease-in-out 100ms;
  margin-top: 2rem;
}

.verify {
  color: #e5e5f1;
  background-color: #5d5d81;
}

.verify:hover {
  cursor: pointer;
  background-color: #525271;
}

.verify:active {
  background-color: #454566;
}

.back {
  color: #000000;
  background-color: #a8bccd;
}

.back:hover {
  cursor: pointer;
  background-color: #9baabd;
}

.back:active {
  background-color: #8596ae;
}

.error {
  font-family: "Montserrat";
  font-size: 0.8rem;
  color: red;
  margin-top: 0.1rem;
}
</style>
