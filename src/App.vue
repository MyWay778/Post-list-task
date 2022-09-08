<script setup lang="ts">
import TheHeader from './components/TheHeader.vue';
import SearchInput from './components/SearchInput.vue';
import PostList from './components/PostList.vue';
</script>

<template>
  <TheHeader>
    <SearchInput />
  </TheHeader>

  <main class="container">
    <PostList />
  </main>
</template>

<style lang="scss"></style>
