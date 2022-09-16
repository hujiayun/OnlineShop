<template>
  <div class="reset-state">
    <p class="title">Reset Password</p>
    <div class="section">
      <p class="label">Email</p>
      <p class="content email">{{ email }}</p>
    </div>
    <div class="section">
      <p class="label">New password</p>
      <input
        type="password"
        class="content input"
        v-model="password"
        :disabled="updated"
      />
      <p class="error" v-if="errors.passwordError !== ''">
        {{ errors.passwordError }}
      </p>
    </div>
    <div class="section">
      <p class="label">Confirm password</p>
      <input
        type="password"
        class="content input"
        v-model="passwordRep"
        :disabled="updated"
      />
      <p class="error" v-if="errors.passwordRepError !== ''">
        {{ errors.passwordRepError }}
      </p>
    </div>
    <button
      class="reset-button"
      :class="{ success: updated }"
      v-on:click="validate"
      :disabled="updated"
    >
      {{ resetButtonText }}
    </button>
    <div class="nav-buttons">
      <button class="nav-button" v-on:click="redirectToHome" v-if="updated">
        Home
      </button>
      <button class="nav-button" v-on:click="redirectToSignIn" v-if="updated">
        Sign in
      </button>
    </div>
  </div>
</template>

<script>
import md5 from "md5";
import axios from "axios";
export default {
  name: "ResetState",
  data() {
    return {
      token: "",
      email: "",
      password: "",
      passwordRep: "",
      errors: {
        passwordError: "",
        passwordRepError: "",
      },
      updated: false,
      resetButtonText: "Reset",
    };
  },
  methods: {
    validate() {
      // Unset all errors
      this.errors.passwordError = "";
      this.errors.passwordRepError = "";

      // Validate on client side
      if (this.password === "") {
        this.errors.passwordError = "Password cannot be empty";
        return;
      }

      if (this.passwordRep !== this.password) {
        this.errors.passwordRepError = "Passwords don't match";
        return;
      }

      // Request for password update
      let hashed = md5(this.password);
      axios
        .post("/api/session/newpassword", {
          password: hashed,
          token: this.token,
        })
        .then((response) => {
          if (response.data.success) {
            this.updated = true;
            // A small delay to avoid text being wrapped
            setTimeout(() => {
              this.resetButtonText = "Password Updated";
            }, 50);
          } else {
            // Token expired
            alert(response.data.message);
          }
        });
    },
    redirectToHome() {
      window.location.href = "/main#/home";
    },
    redirectToSignIn() {
      window.location.href = "/session#/signin";
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

.reset-state {
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-top: 5rem;
  gap: 0;
}

.title {
  font-family: "Montserrat";
  font-size: 2.5rem;
  color: #5d5d81;
  width: 20rem;
  text-align: center;
  margin-bottom: 2rem;
}

.section {
  margin-top: 1.5rem;
  width: 25rem;
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

.email {
  font-weight: bold;
  margin-bottom: 2rem;
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

.reset-button {
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

.reset-button:hover {
  background-color: #525271;
  cursor: pointer;
}

.reset-button:active {
  background-color: #454566;
}

.error {
  font-family: "Montserrat";
  font-size: 0.8rem;
  color: red;
}

.success:disabled {
  width: 25rem;
  background-color: #3cae8c;
  cursor: default;
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
</style>
