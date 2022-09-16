<template>
  <div class="sign-in-state">
    <sign-up class="signup" />
    <div class="vline"></div>
    <sign-in class="signin" />
  </div>
</template>
<script>
import SignIn from "./SignIn.vue";
import SignUp from "./SignUp.vue";
export default {
  name: "SignInState",
  components: {
    SignIn,
    SignUp,
  },
};
</script>

<style scoped>
.sign-in-state {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
  height: 55rem;
}
.vline {
  height: 100%;
  border-radius: 5rem;
  border-left: 0.2rem solid #bfcde0;
  margin: 0 10rem;
}
</style>
