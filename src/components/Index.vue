<template>
    <div class="container">
        <h1 class="py-3">All Products</h1>

        <table class="table table-hover">
            <thead>
            <tr class="table-secondary">
                <th scope="col">Product Name</th>
                <th scope="col">Product Description</th>
                <th scope="col">Product Price</th>
                <th scope="col">Product Image</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>

            <tbody>
                <tr v-for="(product, index) in products" :key="index">
                    <td>{{ product.name }}</td>
                    <td>{{ product.description }}</td>
                    <td>{{ product.price }}</td>
                    <td><img :src="product.image" class="img-fluid" style="width: 150px;"/></td>
                    <td>
                        <router-link :to="{name: 'View', params: { id: product.id }}" class="btn btn-sm btn-success">View</router-link>
                        <div v-if="$store.getters.getUserIsLoggedIn">
                        <router-link :to="{name: 'Edit', params: { id: product.id }}" class="btn btn-sm btn-primary">Edit</router-link>
                        <button @click="deleteProduct(product)" class="btn btn-danger btn-sm">Delete</button>
                        </div>
                        </td>
                        
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            products: []
        }
    },

    created(){
        this.fetchProducts();
    },

    methods: {
        fetchProducts()
        {
            let uri = 'http://localhost:8000/api/auth/product';
            this.axios.get(uri).then((response) => {
                this.products = response.data.products;
            });
        },
        deleteProduct(product) {
            let uri = 'http://localhost:8000/api/auth/product/'+product.id;
            this.axios.delete(uri, product).then((response) => {
                this.fetchProducts();
            });
        }
    }
}
</script>