<template>
  <div>
    <button v-show="loggedIn">Logout</button>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      loggedIn: false,
    };
  },
};
</script>
