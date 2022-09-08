import addSearchToUrl from '@/helpers/addSearchToUrl';
import { defineStore } from 'pinia';

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

type User = {
  id: number;
  name: string;
};

type Filter = {
  userName: string;
};

interface PostsState {
  posts: Post[];
  users: User[];
  filter: Filter;
}

export const usePostsListStore = defineStore('posts', {
  state: (): PostsState => ({
    posts: [],
    users: [],
    filter: {
      userName: ''
    }
  }),

  getters: {
    userById(state) {
      return (id: number) => state.users.find(user => user.id === id);
    },

    getPosts(state): Post[] {
      if (state.filter.userName) {
        return this.searchPostByAuthor;
      } else {
        return state.posts;
      }
    },

    getTest: state => state.posts,

    searchPostByAuthor: state => {
      const foundUsers = state.users.filter(user =>
        user.name.toLowerCase().includes(state.filter.userName)
      );
      const foundUsersIds = foundUsers.map(user => user.id);
      const posts = state.posts.filter(post =>
        foundUsersIds.includes(post.userId)
      );
      return posts;
    }
  },

  actions: {
    async fetchPosts() {
      const response = await fetch('http://jsonplaceholder.typicode.com/posts');
      const posts = (await response.json()) as Post[];
      this.posts = posts;

      const userIds = posts.map(post => post.userId);
      this.fetchUsersByIds(userIds);
    },

    async fetchUsersByIds(ids: number[]) {
      const search = ids.map(id => ['id', id]);
      const url = addSearchToUrl(
        'http://jsonplaceholder.typicode.com/users',
        search as [string, number][]
      );
      const response = await fetch(url);
      const users = (await response.json()) as User[];
      this.users = users;
    },

    setFilter({
      filterProp,
      value
    }: {
      filterProp: keyof Filter;
      value: string;
    }) {
      this.filter[filterProp] = value.toLocaleLowerCase();
    }
  }
});
