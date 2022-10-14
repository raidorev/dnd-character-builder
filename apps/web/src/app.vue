<template>
  <v-app>
    <router-view name="NavigationDrawer" />
    <router-view name="AppBar" />

    <v-main>
      <v-container class="h-100" fluid>
        <router-view />
      </v-container>
    </v-main>

    <router-view name="Footer" />
  </v-app>
</template>
