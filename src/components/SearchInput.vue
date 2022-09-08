<script setup lang="ts">
import searchIcon from '~icons/search.svg';
import { usePostsListStore } from '@/stores/postsList';

const postsList = usePostsListStore();

const searchInputHandler = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  postsList.setFilter({ filterProp: 'userName', value });
};
</script>

<template>
  <div class="search-input input-group">
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
</template>

<style lang="scss">
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
</style>
