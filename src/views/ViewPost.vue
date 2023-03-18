<script setup>
  import { reactive, onMounted } from 'vue'
  import { RouterLink, useRoute } from 'vue-router'
  import { ElButton } from 'element-plus'

  import { Edit, Back } from '@element-plus/icons-vue'

  import axiosRequest from '~/composables/useApi'

  const route = useRoute()

  const post = reactive({
    author: '',
    title: '',
    description: ''
  })

  onMounted(async () => {
    try {
      const { data } = await axiosRequest.get(`/posts/${route.params.id}`)

      post.author = data.author
      post.title = data.title
      post.description = data.description
    } catch (e) {
      throw e
    }
  })
</script>

<template>
  <div class="page">
    <div class="posts">
      <div class="page-heading">
        <h1>{{ post.title }}</h1>

        <div class="buttons">
          <RouterLink :to="`/posts/edit/${route.params.id}`">
            <ElButton size="large" :icon="Edit" type="warning">Edit</ElButton>
          </RouterLink>

          <RouterLink :to="`/`">
            <ElButton size="large" :icon="Back" type="danger">Back</ElButton>
          </RouterLink>
        </div>
      </div>

      <p>{{ post.description }}</p>
    </div>
  </div>
</template>
