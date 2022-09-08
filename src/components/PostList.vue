<script setup lang="ts">
import { usePostsListStore } from '@/stores/postsList';
import PostItem from '@/components/PostItem.vue';

const postsList = usePostsListStore();
postsList.fetchPosts();
</script>

<template>
  <template v-if="postsList.getPosts.length">
    <ul class="post-list p-0">
      <PostItem
        v-for="post in postsList.getPosts"
        :key="post.id"
        :post="post"
      />
    </ul>
  </template>
  <div v-else>Not found...</div>
</template>

<style lang="scss">
.post-list {
  column-count: 3;

  @include media-breakpoint-down(lg) {
    column-count: 2;
  }

  @include media-breakpoint-down(md) {
    column-count: 1;
  }
}
</style>
