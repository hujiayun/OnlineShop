<template>
  <div class="verify-state">
    <p v-if="success" class="title">
      Your email has been successfully verified.
    </p>
    <p v-else class="title">The token has expired or is invalid</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "VerifyState",
  data() {
    return {
      success: false,
    };
  },
  created() {
    let token = this.$route.query.token;
    axios.post("/api/session/verify", { token: token }).then((response) => {
      this.success = response.data.success;
    });
  },
};
</script>

<style scoped>
p {
  padding: 0;
  margin: 0;
}
.verify-state {
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-top: 14rem;
}
.title {
  font-family: "Montserrat";
  font-size: 3rem;
  color: #5d5d81;
  margin-bottom: 4.5rem;
  text-align: center;
  white-space: nowrap;
}
</style>
