<template>
  <div class="container">
        <div class="card">
            <div class="card-header">
                <h3>Add Product</h3>
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="updateProduct">
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
                        <br>
                        <img :src="product.image" alt="" class="img-fluid">
                        <br><br>
                        <label>Upload New Product Image:</label>
                        <br>
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
  props: ['id'],
  data() {
      return {
          product: {},
          image : null,
          imageUrl: null
      }
  },
  methods: {
        updateProduct() {
           let uri = 'http://localhost:8000/api/auth/product/'+this.id;
           let jwttoken = localStorage.getItem('token')
           
            this.axios.patch(uri, this.product, {headers: {
                'Authorization': `Bearer ${jwttoken}`
            }
            }).then((response) => {
                console.log("Success: ", response.data)
                this.product = {}
                this.$router.push({ name: 'Index'});
            }).catch( (err) => {
                console.log("Error: ", err.response.data.errors)
            });
        },
        
        onChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(files[0]);
        },
        createImage(file) {
            let reader = new FileReader();
            let vm = this;
            reader.onload = (e) => {
                vm.product.image = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        getProductDetails() {
            let uri = 'http://localhost:8000/api/auth/product/'+this.id;
            this.axios.get(uri).then((response) => {
                this.product = response.data.product
            }).catch( (err) => {
                console.log("Error: ", err.response.data.errors)
            });
        }
    },
    created() {
        this.getProductDetails();
    }
}
</script>