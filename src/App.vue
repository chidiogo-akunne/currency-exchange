<template>
  <Converter />
</template>

<script>
import { useQueryProvider } from 'vue-query';
import Converter from './components/Converter.vue';

export default {
  name: 'App',
  components: {
    Converter,
  },
  setup() {
    useQueryProvider();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
