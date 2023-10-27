<template>
  <v-app>
    <NavBar />
    <NavDrawer/>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from './layouts/NavBar.vue';
import NavDrawer from './layouts/NavDrawer.vue'

export default defineComponent({
  name: "App",
  components: {
    NavBar,
    NavDrawer
  },
  data() {
    return {
      drawer: true,
      rail: true,
    }
  }
})
</script>
