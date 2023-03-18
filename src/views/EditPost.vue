<script setup>
  import { reactive, onMounted } from 'vue'
  import { RouterLink, useRouter, useRoute } from 'vue-router'
  import { ElInput, ElButton } from 'element-plus'

  import { Edit, Back } from '@element-plus/icons-vue'

  import axiosRequest from '~/composables/useApi'

  const router = useRouter()
  const route = useRoute()

  const post = reactive({
    author: '',
    title: '',
    description: ''
  })

  const handleSubmit = async () => {
    try {
      const response = await axiosRequest.put(`/posts/${route.params.id}`, post)

      if (response.status === 200) router.push('/')
    } catch (e) {
      throw e
    }
  }

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
        <h1>Edit Post</h1>

        <RouterLink :to="`/`">
          <ElButton size="large" :icon="Back" type="danger">Back</ElButton>
        </RouterLink>
      </div>

      <div class="form-group">
        <ElInput v-model="post.author" placeholder="Author" />
      </div>

      <div class="form-group">
        <ElInput v-model="post.title" placeholder="Title" />
      </div>

      <div class="form-group">
        <ElInput v-model="post.description" placeholder="Description" />
      </div>

      <ElButton type="warning" size="large" :icon="Edit" @click="handleSubmit">
        Edit
      </ElButton>
    </div>
  </div>
</template>
