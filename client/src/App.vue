<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> 
  </nav> -->

  <router-view />

  <footer>
    <p style="margin: 0px;">
      Youssef El aamraoui<br>
      copyright 2023
    </p>
  </footer>
</template>

<style>
/* style to take all the page width and height */
html {
  height: 100%;
  width: 100%;
}

body {
  padding: 0px;
  margin: 0px;
  height: 100%;
  width: 100%;
}

footer {
  background-color: black;
  color: white;
  width: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #2d2d2d;
  text-decoration: none;
}
</style>
