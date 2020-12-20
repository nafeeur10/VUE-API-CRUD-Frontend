<template>
  <div id="app">
    <nav class="navbar navbar-expand-sm bg-dark d-flex justify-content-between">
      <ul class="navbar-nav">
        <li class="nav-item">
          <img src="https://wedevs.com/img/logos/wedevs/wedevs-logo-colored.svg" class="img-fluid mr-5" style="width: 150px" alt="">
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'Create' }" class="nav-link text-light" v-if="$store.getters.getUserIsLoggedIn == true">Add Product</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'Index' }" class="nav-link text-light">All Products</router-link>
        </li>
      </ul>
      <ul class="navbar-nav">
        <span class="nav-link text-light" v-if="$store.getters.getUserIsLoggedIn == true">Assalamu Alaikum, {{ this.$store.getters.getUserName }}</span>
        <router-link :to="{ name: 'Register' }" class="nav-link text-light" v-if="$store.getters.getUserIsLoggedIn == false">Register</router-link>
        <router-link :to="{ name: 'Login' }" class="nav-link text-light" v-if="$store.getters.getUserIsLoggedIn == false">Log In</router-link>
        <router-link :to="{ name: 'Logout' }" class="nav-link text-light" v-if="$store.getters.getUserIsLoggedIn == true">Log Out</router-link>
      </ul>
    </nav>
    <transition name="fade">
      <div class="gap">
        <router-view></router-view>        
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isLoggedIn: User.loggedIn()
    }
  },
  created() {
    EventBus.$on("logout", () => {
      User.logout();
    });
    this.$store.dispatch('setUserIsLoggedIn')
    this.$store.dispatch('setUserName')
  }
}
</script>

<style>
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
      opacity: 0
    }
    .gap {
      margin-top: 50px;
    }
</style>