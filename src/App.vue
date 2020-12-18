<template>
  <div id="app">
    <nav class="navbar navbar-expand-sm bg-light">
      <ul class="navbar-nav mx-auto">
        <li class="nav-item">
          <router-link :to="{ name: 'Create' }" class="nav-link">Add Product</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'Index' }" class="nav-link">All Products</router-link>
        </li>
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