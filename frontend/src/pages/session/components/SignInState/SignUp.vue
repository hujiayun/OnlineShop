<template>
  <div class="sign-up">
    <p class="title">Sign-up</p>
    <div class="section fullname">
      <div class="partial-name">
        <p class="label">First name</p>
        <input
          type="text"
          class="content input name-input"
          v-model="firstname"
        />
        <p class="error" v-if="errors.firstname !== ''">
          {{ errors.firstname }}
        </p>
      </div>
      <div class="partial-name">
        <p class="label">Last name</p>
        <input
          type="text"
          class="content input name-input"
          v-model="lastname"
        />
        <p class="error" v-if="errors.lastname !== ''">
          {{ errors.lastname }}
        </p>
      </div>
    </div>
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
    <button class="sign-up-button" v-on:click="validate">Sign-up</button>
  </div>
</template>
<script>
import md5 from "md5";
import axios from "axios";
export default {
  name: "SignUp",
  data() {
    return {
      token: "",
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      errors: {
        passwordError: "",
        firstnameError: "",
        lastnameError: "",
        emailError: "",
      },
    };
  },
  methods: {
    validate() {
      let isValid = true;
      this.errors.firstname = "";
      this.errors.lastname = "";
      this.errors.email = "";
      this.errors.password = "";

      if (this.firstname === "") {
        this.errors.firstname = "Cannot be empty";
        isValid = false;
      }
      if (this.lastname === "") {
        this.errors.lastname = "Cannot be empty";
        isValid = false;
      }
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

      if (isValid) {
        axios
          .post("/api/session/signup", {
            firstName: this.firstname,
            lastName: this.lastname,
            email: this.email,
            password: md5(this.password),
          })
          .then((response) => {
            if (response.data.success) {
              window.location.href =
                "/session#/confirmation?redirect=true&email=" + this.email;
            } else {
              for (let field of [
                "firstname",
                "lastname",
                "email",
                "password",
              ]) {
                let remoteError = response.data.errors[field];
                this.errors[field] =
                  remoteError === undefined ? "" : remoteError;
              }
            }
          });
      }
    },
  },
};
</script>

<style scoped>
p {
  padding: 0;
  margin: 0;
}

.sign-up {
  display: flex;
  flex-flow: column;
  align-items: center;
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

.fullname {
  display: flex;
  justify-content: space-between;
}

.partial-name {
  width: 12rem;
  display: inline-block;
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
  text-overflow: ellipsis;
  line-height: 2rem;
}

.name-input {
  width: 12rem;
}

.input:focus {
  outline: none;
}

.sign-up-button {
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

.sign-up-button:hover {
  background-color: #525271;
  cursor: pointer;
}

.sign-up-button:active {
  background-color: #454566;
}

.error {
  font-family: "lato";
  font-size: 13.5px;
  color: #ff0000;
}
</style>
