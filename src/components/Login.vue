<template>
    <v-container >   
        <p class="text-uppercase text-center class=pa-10 mt-12 mb-2 font-weight-bold " >
            SILAHKAN MASUKKAN AKUN ANDA !
        </p>
        
        <v-row
            align="center" justify="center" class="text-center"
            no-gutters
        >
            <v-col
                md ="5"
            >
                <v-card
                    class="pa-10 mt-10 mb-10"
                    outlined
                    tile
                >
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                    >

                    <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="Email"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="password"
                        :rules="passwordRules"
                        label="Password"
                         required
                    ></v-text-field>
                        
                    <v-btn
                        color="error"
                        class="mr-4"
                        @click="Login"
                    >
                        Login
                    </v-btn>

                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios'
    export default {
        data: () => ({
            valid: true,
            
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],

            password: '',
            passwordRules: [
                v => !!v || 'Password minimum 8 characters',
                v => (v && v.length <= 8) || 'password must be 8 characters',
            ],
        }),

        methods: {
            Login () {
                let config = {
                    headers: {
                     "Access-Control-Allow-Origin": "*",
                    }
                }

                let data = {
                    "email": this.email,
                    "password":this.password ,
                }

        axios.post('http://localhost:8005/api/login', data, config)
        .then(response => {
            console.log(response);
            if (response.data.message == "success"){
                alert("Login Berhasil")
                this.$router.push('/home')
                localStorage.setItem('islogin', true)
                localStorage.setItem('token', response.data.token)        
            }
        })
        
        .catch(error => {
            console.log(error);
        });

            },
        },
    }
</script>