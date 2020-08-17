<template>
  <div id="app">
    <b-nav id="nav" align="center">
      <b-nav-text>100日ワニタイマー</b-nav-text>
      <b-nav-item>
        <router-link to="/">Home</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link to="/about">About</router-link>
      </b-nav-item>
      <b-nav-item v-if="!isSignedIn">
        <router-link to="/signin">Sign In</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link to="/signout">Sign Out</router-link>
      </b-nav-item>
    </b-nav>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isSignedIn: function () {
      return this.$store.getters.isSignIn;
    },
  },
};
</script>
