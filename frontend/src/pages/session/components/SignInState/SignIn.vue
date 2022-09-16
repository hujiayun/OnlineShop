<template>
  <div class="sign-in">
    <p class="title">Sign-in</p>
    <div class="section">
      <p class="label">Email</p>
      <input type="text" class="content input" v-model="email" />
      <p class="error" v-if="errors.email !== ''">
        {{ errors.email }}
      </p>
    </div>
    <div class="section">
      <p class="label">Password</p>
      <input type="password" class="content input" v-model="password" />
      <p class="error" v-if="errors.password !== ''">
        {{ errors.password }}
      </p>
    </div>
    <div class="section forget-password">
      <a href="/session#/forget">Forget password?</a>
    </div>
    <button class="sign-in-button" v-on:click="validate">Sign-in</button>
  </div>
</template>
<script>
import md5 from "md5";
import axios from "axios";
export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: "",
      errors: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    validate() {
      let isValid = true;
      // Unset all errors
      this.errors.email = "";
      this.errors.password = "";
      // Validate
      if (this.password === "") {
        this.errors.password = "Cannot be empty";
        isValid = false;
      }

      if (this.email === "") {
        this.errors.email = "Cannot be empty";
        isValid = false;
      }

      let emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (this.email !== "" && !emailRegex.test(this.email)) {
        this.errors.email = "Invalid email format";
        isValid = false;
      }

      if (!isValid) return;

      axios
        .post("/api/session/signin", {
          email: this.email,
          password: md5(this.password),
        })
        .then((response) => {
          if (response.data.success) {
            let redirectDestination = "/main#/home";
            if (localStorage.getItem("last-visited") !== undefined) {
              redirectDestination = localStorage.getItem("last-visited");
            }
            window.location.href = redirectDestination;
          } else {
            this.errors.password = response.data.message;
          }
        });
    },
  },
  created() {
    let params = new URLSearchParams(window.location.hash.slice(8));
    this.token = params.get("token");
    this.email = params.get("email");
  },
};
</script>

<style scoped>
p {
  padding: 0;
  margin: 0;
}

a {
  text-decoration: none;
}

.sign-in {
  display: flex;
  flex-flow: column;
  align-items: center;
  margin: 0, auto;
  gap: 0;
}

.title {
  font-family: "Montserrat";
  font-size: 2.5rem;
  color: #5d5d81;
  width: 20rem;
  text-align: center;
}

.section {
  margin-top: 1.5rem;
  width: 25rem;
  height: 5rem;
}

.forget-password {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Montserrat";
  font-size: 1.5rem;
}

.label {
  font-family: "Montserrat";
  font-size: 1.5rem;
  color: #5d5d81;
}

.content {
  font-family: "Lato";
  font-size: 1.3rem;
  margin-top: 0.5rem;
}

.input {
  width: 25rem;
  height: 2.4rem;
  border-radius: 5rem;
  padding-left: 1rem;
  padding-right: 0.8rem;
  box-sizing: border-box;
  border: 0.2rem solid #bfcde0;
  font-size: 1.1rem;
  text-overflow: hidden;
  line-height: 2rem;
}
.input:focus {
  outline: none;
}
.sign-in-button {
  width: 12rem;
  height: 3rem;
  font-family: "Montserrat";
  font-size: 1.5rem;
  border: none;
  border-radius: 5rem;
  color: #e5e5f1;
  background-color: #5d5d81;
  transition: all ease-in-out 100ms;
  margin-top: 3rem;
}
.sign-in-button:hover {
  background-color: #525271;
  cursor: pointer;
}
.sign-in-button:active {
  background-color: #454566;
}

.error {
  font-family: "lato";
  font-size: 13.5px;
  color: #ff0000;
}
</style>
