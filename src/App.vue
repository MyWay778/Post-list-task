<script setup lang="ts">
import searchIcon from '~icons/search.svg';
import { usePostsListStore } from '@/stores/postsList';

const postsList = usePostsListStore();
postsList.fetchPosts();

const getUserName = (userId: number) => {
  const user = postsList.userById(userId);
  return user?.name ?? 'unknown';
};

const searchInputHandler = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  postsList.setFilter({ filterProp: 'userName', value });
};
</script>

<template>
  <header class="container d-flex justify-content-center p-5">
    <div class="search-input input-group w-25">
      <label
        class="search-input__label border rounded-start p-2"
        for="search-input__input"
      >
        <img :src="searchIcon" alt="search icon" />
      </label>
      <input
        id="search-input__input"
        class="search-input__input form-control"
        type="search"
        placeholder="Filter by author..."
        @input="searchInputHandler"
      />
    </div>
  </header>

  <main class="container">
    <ul class="post-list">
      <li
        class="post-list-card card"
        v-for="post in postsList.getPosts"
        :key="post.id"
      >
        <div class="card-body">
          <h5 class="card-title">{{ post.title }}</h5>
          <p>
            {{ post.body }}
          </p>
          <div>{{ getUserName(post.userId) }}</div>
        </div>
      </li>
      <li class="post-list-card card--empty"></li>
    </ul>
  </main>

  <main></main>
</template>

<style lang="scss">
@import '@/assets/main.scss';

.search-input {
  max-width: 300px;

  .search-input__label {
    border-color: #ced4da;
    background-color: $white;

    img {
      vertical-align: -3px;
    }
  }

  .search-input__input {
    &:focus {
      box-shadow: 0 0 0 0.1rem rgb(13 110 253 / 25%);
    }
  }
}

.card--empty {
  width: 1px;
}

.post-list {
  column-count: 3;
}

.post-list-card {
  display: inline-block;
  margin-bottom: 20px;
}
</style>
