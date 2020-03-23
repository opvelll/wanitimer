<template>
  <div class="d-flex justify-content-center">
    <amplify-sign-out v-bind:signOutConfig="signOutConfig"></amplify-sign-out>
  </div>
</template>

<script>
export default {
  data() {
    return {
      signOutConfig: {
        signOutButton: "サインアウト"
      }
    };
  }
};
</script>
