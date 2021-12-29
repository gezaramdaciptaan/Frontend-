<template>
  <v-container >    
    <v-row
      no-gutters
    >
      <v-col
        md ="12"
      >
        <v-card
          max-width="450"
          class="mx-auto"
        >
          <v-toolbar
            color="cyan"
            dark
          >        
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>
 
              <v-btn
                color="error"
                class="mr-8"
                @click="Logout"
              >
                Logout
              </v-btn>
          
            </v-toolbar-title>
            <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
    
          </v-toolbar>

          <v-list three-line>
              <template v-for="(item, index) in items">

                  <v-subheader
                    v-if="item.header"
                    :key="item.header"
                    v-text="item.header"
                  ></v-subheader>

                  <v-divider
                    v-else-if="item.divider"
                    :key="index"
                    :inset="item.inset"
                  ></v-divider>

                  <v-list-item
                    v-else
                    :key="item.title"
                  >

                  <v-list-item-avatar>
                    <v-img :src="item.avatar"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-html="item.title"></v-list-item-title>
                    <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                  </v-list-item-content>
    
                  </v-list-item>
              </template>

                </v-list>
              </v-card>
            </v-col>
          <v-col
            md ="2"
          >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
  export default {
    data: () => ({
      items: [
        { header: 'User' },    
      ],
    }),
    
    mounted() {
      if (localStorage.getItem('islogin') == null){
        this.$router.push('/login')
      }

    let config = {
       headers: {
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Bearer " + localStorage.getItem('token'),
      }
    }

    axios.get('http://localhost:8005/api/user', config)
    .then(response => {
      this.items.push({
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: response.data.name,
        subtitle: response.data.email,
      })
      
      console.log(response);
    })

    .catch(error => {
      console.log(error);
    });
                        
  },

    methods: {
      Logout () {
        localStorage.removeItem('islogin');
        localStorage.removeItem('token');
        alert("yakin ingin keluar?")
        this.$router.push('/login')
      },
    },
  }
</script>