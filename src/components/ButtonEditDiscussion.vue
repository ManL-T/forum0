<template>
  <div class="edit-discussion">
      <button>
          <slot>
        <h5>
            <router-link
              :to="{name: 'DiscussionEdit', params: {id: this.id}}"
              class="btn-green btn-small"
              tag="button"
            >
              Edit Discussion
            </router-link>
        </h5>
        </slot>
      </button>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>