<template>
  <div class="profile-state">
    <div class="section">
      <p class="label">First name</p>
      <input type="text" class="content input" v-model="firstName" />
      <p class="error" v-if="errors.firstname !== ''">
        {{ errors.firstName }}
      </p>
    </div>
    <div class="section">
      <p class="label">Last name</p>
      <input type="text" class="content input" v-model="lastName" />
      <p class="error" v-if="errors.lastname !== ''">
        {{ errors.lastName }}
      </p>
    </div>
    <div class="section">
      <p class="label">Email</p>
      <input type="text" class="content input" v-model="email" />
      <p class="error" v-if="errors.email !== ''">
        {{ errors.email }}
      </p>
    </div>
    <div class="section">
      <button class="update-button" id="submit" v-on:click="validate">
        Update
      </button>
      <p class="error" v-if="errors.password !== ''">
        {{ errors.password }}
      </p>
    </div>
    <Modal v-model="showModal">
      <password-modal @close="showModal = false" @confirm="submitUpdate" />
    </Modal>
  </div>
</template>

<script>
import PasswordModal from "./PasswordModal.vue";
import md5 from "md5";
import axios from "axios";
export default {
  name: "ProfileState",
  components: {
    PasswordModal,
  },
  data() {
    return {
      showModal: false,
      firstName: "",
      lastName: "",
      email: "",
      errors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
    };
  },
  created() {
    axios.get("/api/user").then((response) => {
      if (response.data.success) {
        this.firstName = response.data.user.firstname;
        this.lastName = response.data.user.lastname;
        this.email = response.data.user.email;
      } else {
        alert(response.data.message);
      }
    });
  },
  methods: {
    validate() {
      const EMAIL_REGEX =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let isValid = true;
      this.errors.firstName = "";
      this.errors.lastName = "";
      this.errors.email = "";
      this.errors.password = "";

      if (this.firstName === "") {
        this.errors.firstName = "Cannot be empty";
        isValid = false;
      }
      if (this.lastName === "") {
        this.errors.lastName = "Cannot be empty";
        isValid = false;
      }
      if (this.email === "") {
        this.errors.email = "Cannot be empty";
        isValid = false;
      } else if (!EMAIL_REGEX.test(this.email)) {
        this.errors.email = "Invalid email format";
        isValid = false;
      }
      this.showModal = isValid;
    },
    submitUpdate(password) {
      this.showModal = false;
      axios
        .post("/api/user/update", {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: md5(password),
        })
        .then(async (response) => {
          if (response.data.success) {
            document.getElementById("submit").textContent = "Updated";
            document.getElementById("submit").classList.add("success");
            await new Promise((resolve) => setTimeout(resolve, 2000));
            document.getElementById("submit").classList.remove("success");
            document.getElementById("submit").textContent = "Update";
          } else {
            // Populate errors from server
            for (let errorField of Object.keys(response.data.errors)) {
              this.errors[errorField] = response.data.errors[errorField];
            }
            document.getElementById("submit").textContent = "Failed";
            document.getElementById("submit").classList.add("failure");
            await new Promise((resolve) => setTimeout(resolve, 2000));
            document.getElementById("submit").classList.remove("failure");
            document.getElementById("submit").textContent = "Update";
          }
        });
    },
  },
};
</script>

<style scoped>
p {
  padding: 0;
  margin: 0;
}

.profile-state {
  margin-top: 5rem;
  margin-left: 7rem;
}

.section {
  margin-top: 1.5rem;
  width: 25rem;
  height: 5rem;
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
  color: #000000;
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
  text-overflow: hidden;
  line-height: 2rem;
}
.input:focus {
  outline: none;
}

.input-password {
  margin-top: 1rem;
  height: 2.5rem;
  border-radius: 0.5rem;
}

.update-buttons {
  width: 25rem;
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.update-button {
  width: 12rem;
  height: 3rem;
  font-family: "Montserrat";
  font-size: 1.5rem;
  border: none;
  border-radius: 5rem;
  color: #e5e5f1;
  background-color: #5d5d81;
  transition: all ease-in-out 100ms;
  margin-top: 2rem;
}
.update-button:hover {
  background-color: #525271;
  cursor: pointer;
}
.update-button:active {
  background-color: #454566;
}

.error {
  font-family: "lato";
  font-size: 13.5px;
  color: #ff0000;
}

.success {
  background-color: green;
}

.failure {
  background-color: #fe4874;
}
</style>
