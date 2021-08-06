<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Data Product</h4>
                        <hr>
                        <router-link :to="{name: 'product.create'}" class="btn btn-md btn-success">Add</router-link>

                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Color</th>
                                    <th scope="col">Size</th>
                                    <th scope="col">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(product, index) in products" :key="index">
                                    <td>{{ product.name }}</td>
                                    <td>{{ product.category }}</td>
                                    <td>{{ product.description }}</td>
                                    <td>{{ product.image }}</td>
                                    <td>{{ product.color }}</td>
                                    <td>{{ product.size }}</td>
                                    <td>{{ product.price }}</td>
                                    <td class="text-center">
                                        <router-link :to="{name: 'product.edit', params:{id: product.id }}" class="btn btn-sm btn-primary mr-1">EDIT</router-link>
                                        <button @click.prevent="productDelete(product.id)" class="btn btn-sm btn-danger ml-1">DELETE</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'

export default {

    setup() {

        //reactive state
        let products = ref([])

        //mounted
        onMounted(() => {

            //get API from Laravel Backend
            axios.get('http://localhost:8000/api/product')
            .then(response => {
              
              //assign state products with response data
              products.value = response.data.data

            }).catch(error => {
                console.log(error.response.data)
            })

        })

        //method delete
        function productDelete(id) {
                    
        //delete data product by ID
        axios.delete(`http://localhost:8000/api/product/${id}`)
        .then(() => {
                    
            //splice products 
            products.value.splice(products.value.indexOf(id), 1);

            }).catch(error => {
                console.log(error.response.data)
            })

        }

        //return
        return {
            products,
            productDelete
        }

    }

}
</script>

<style>
    body{
        background: lightgray;
    }
</style>