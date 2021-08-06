<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Edit Product</h4>
                        <hr>

                        <form @submit.prevent="update">

                            <div class="form-group">
                                <label for="name" class="font-weight-bold">Name</label>
                                <input type="text" class="form-control" v-model="product.name" placeholder="Example for Name">
                                <!-- validation -->
                                <div v-if="validation.name" class="mt-2 alert alert-danger">
                                    {{ validation.name[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="category" class="font-weight-bold">Category</label>
                                <input type="text" class="form-control" v-model="product.category" placeholder="Example for category">
                                <!-- validation -->
                                <div v-if="validation.category" class="mt-2 alert alert-danger">
                                    {{ validation.category[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="description" class="font-weight-bold">Description</label>
                                <textarea class="form-control" rows="4" v-model="product.description" placeholder="Example for description"></textarea>
                                <!-- validation -->
                                <div v-if="validation.description" class="mt-2 alert alert-danger">
                                    {{ validation.description[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="image" class="font-weight-bold">Image</label>
                                <input type="url" class="form-control" v-model="product.image" placeholder="Example for image">
                                <!-- validation -->
                                <div v-if="validation.image" class="mt-2 alert alert-danger">
                                    {{ validation.image[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="color" class="font-weight-bold">Color</label>
                                <input type="text" class="form-control" v-model="product.color" placeholder="Example for color">
                                <!-- validation -->
                                <div v-if="validation.color" class="mt-2 alert alert-danger">
                                    {{ validation.color[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="size" class="font-weight-bold">Size</label>
                                <input type="text" class="form-control" v-model="product.size" placeholder="Example for size">
                                <!-- validation -->
                                <div v-if="validation.size" class="mt-2 alert alert-danger">
                                    {{ validation.size[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="price" class="font-weight-bold">price</label>
                                <input type="number" class="form-control" v-model="product.price" placeholder="Example for price">
                                <!-- validation -->
                                <div v-if="validation.price" class="mt-2 alert alert-danger">
                                    {{ validation.price[0] }}
                                </div>
                            </div>
                            
                            <button type="submit" class="btn btn-primary">SIMPAN</button>
                        </form>                        

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {

    setup() {

        //state products
        const product = reactive({
            name: '',
            category: '',
            description: '',
            image: '',
            color: '',
            size: '',
            price: ''
        })

        //state validation
        const validation = ref([])

        //vue router
        const router = useRouter()

        //vue router
        const route = useRoute()

        //mounted
        onMounted(() => {

            //get API from Laravel Backend
            axios.get(`http://localhost:8000/api/product/${route.params.id}`)
            .then(response => {
              
              //assign state products with response data
              product.name    = response.data.data.name  
              product.category  = response.data.data.category  
              product.description    = response.data.data.description  
              product.image  = response.data.data.image  
              product.color    = response.data.data.color  
              product.size  = response.data.data.size  
              product.price  = response.data.data.price  

            }).catch(error => {
                console.log(error.response.data)
            })

        })

        //method update
        function update() {

            let name   = product.name
            let category = product.category
            let description   = product.description
            let image = product.image
            let color   = product.color
            let size = product.size
            let price = product.price

            axios.put(`http://localhost:8000/api/product/${route.params.id}`, {
                name: name,
                category: category,
                description: description,
                image: image,
                color: color,
                size: size,
                price: price
            }).then(() => {

                //redirect ke product index
                router.push({
                    name: 'product.index'
                })

            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })

        }

        //return
        return {
            product,
            validation,
            router,
            update
        }

    }

}
</script>

<style>
    body{
        background: lightgray;
    }
</style>