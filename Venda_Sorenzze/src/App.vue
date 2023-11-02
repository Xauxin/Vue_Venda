<template>
  <v-app>
    <NavDrawer/>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavDrawer from './layouts/NavDrawer.vue'

export default defineComponent({
  name: "App",
  components: {
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
