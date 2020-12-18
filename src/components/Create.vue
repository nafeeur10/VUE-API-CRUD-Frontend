<template>
  <div class="container">
        <div class="card">
            <div class="card-header">
                <h3>Add Product</h3>
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="addProduct">
                    <div class="form-group">
                        <label>Product Name:</label>
                        <input type="text" class="form-control" v-model="product.name"/>
                    </div>
                    <div class="form-group">
                        <label>Product Description:</label>
                        <textarea type="text" rows="5" class="form-control" v-model="product.description"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Product Price:</label>
                        <input type="text" class="form-control" v-model="product.price"/>
                    </div>
                    <div class="form-group">
                        <label>Product Image:</label>
                        <input type="file" class="form-control" accept="image/*" @change="onChange" />
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Add Item"/>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
      return {
          product: {},
          image : null,
          imageUrl: null
      }
  },
  methods: {
      addProduct() {
           let uri = 'http://localhost:8000/api/auth/product';
            this.axios.post(uri, this.product).then((response) => {
                console.log(response.data)
            });
        },
        
        onChange(e) {
            const file = e.target.files[0]
            this.image = file
            this.product.image = this.image
            this.imageUrl = URL.createObjectURL(file)
            console.log(this.product)
        }
    }
}
</script>