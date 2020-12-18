<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        {{ product.title }}
      </div>
      <div class="card-body">
        {{ product.description }}
        {{ product.image }}
      </div>
      <div class="card-footer">
        Price: {{ product.price }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewProduct',
  props: ['id'],
  data() {
    return {
      product: []
    }
  },
  methods: {
    getProductDetails() {
      let uri = 'http://localhost:8000/api/auth/product/'+this.id;
        this.axios.get(uri).then((response) => {
            this.product = response.data.product;
            console.log(response);
      });
    }
  },
  created: function() {
    this.getProductDetails();
  }
}
</script>

<style scoped>

</style>
