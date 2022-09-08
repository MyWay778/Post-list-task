<script setup lang="ts">
import type { Post } from '@/stores/postsList';
import { usePostsListStore } from '@/stores/postsList';

defineProps<{ post: Post }>();

const postsList = usePostsListStore();

const getUserName = (userId: number) => {
  const user = postsList.userById(userId);
  return user?.name ?? 'unknown';
};
</script>
<template>
  <li class="post-list-card d-inline-block mb-1 card" :key="post.id">
    <div class="card-body">
      <h5 class="card-title">{{ post.title }}</h5>
      <p>
        {{ post.body }}
      </p>
      <div>{{ getUserName(post.userId) }}</div>
    </div>
  </li>
</template>

<style lang="scss"></style>
