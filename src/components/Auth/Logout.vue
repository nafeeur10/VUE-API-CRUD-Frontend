<template>
  
</template>

<script>
export default {
    created(){
        EventBus.$emit('logout');
        this.$store.dispatch('setUserIsLoggedIn')
        this.$store.dispatch('setUserName')
        this.$router.push({ name: 'Index'})
    }
}
</script>