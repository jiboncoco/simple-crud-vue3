<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Add Product</h4>
                        <hr>

                        <form @submit.prevent="store">
                            <div class="form-group">
                                <label for="name" class="font-weight-bold">Name</label>
                                <input type="text" class="form-control" v-model="product.name" placeholder="Example for name" required>
                                <!-- validation -->
                                <div v-if="validation.name" class="mt-2 alert alert-danger">
                                    {{ validation.name[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="category" class="font-weight-bold">Category</label>
                                <input type="text" class="form-control" v-model="product.category" placeholder="Example for category" required>
                                <!-- validation -->
                                <div v-if="validation.category" class="mt-2 alert alert-danger">
                                    {{ validation.category[0] }}
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="description" class="font-weight-bold">Description</label>
                                <textarea class="form-control" rows="4" v-model="product.description" placeholder="Example for description" required></textarea>
                                <!-- validation -->
                                <div v-if="validation.description" class="mt-2 alert alert-danger">
                                    {{ validation.description[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="image" class="font-weight-bold">Image</label>
                                <input type="url" class="form-control" v-model="product.image" placeholder="Example for image" required>
                                <!-- validation -->
                                <div v-if="validation.image" class="mt-2 alert alert-danger">
                                    {{ validation.image[0] }}
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="color" class="font-weight-bold">Color</label>
                                <input type="text" class="form-control" v-model="product.color" placeholder="Example for color" required>
                                <!-- validation -->
                                <div v-if="validation.color" class="mt-2 alert alert-danger">
                                    {{ validation.color[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="size" class="font-weight-bold">Size</label>
                                <input type="text" class="form-control" v-model="product.size" placeholder="Example for size" required>
                                <!-- validation -->
                                <div v-if="validation.size" class="mt-2 alert alert-danger">
                                    {{ validation.size[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="price" class="font-weight-bold">Price</label>
                                <input type="number" class="form-control" v-model="product.price" placeholder="Example for price" required>
                                <!-- validation -->
                                <div v-if="validation.price" class="mt-2 alert alert-danger">
                                    {{ validation.price[0] }}
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary mt-2">Submit</button>
                        </form>                        

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
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

        //method store
        function store() {

            let name   = product.name
            let category = product.category
            let description   = product.description
            let image = product.image
            let color   = product.color
            let size = product.size
            let price = product.price

            axios.post('http://localhost:8000/api/product', {
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
            store
        }

    }

}
</script>

<style>
    body{
        background: lightgray;
    }
</style>