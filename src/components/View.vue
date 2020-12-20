<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        {{ product.name }}
      </div>
      <div class="card-body">
        {{ product.description }}
        <img :src="product.image" alt="" class="img-fluid">
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
