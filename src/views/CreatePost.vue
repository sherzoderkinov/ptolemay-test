<script setup>
  import { reactive } from 'vue'
  import { RouterLink, useRouter } from 'vue-router'
  import { ElInput, ElButton } from 'element-plus'

  import { Check, Back } from '@element-plus/icons-vue'

  import axiosRequest from '~/composables/useApi'

  const router = useRouter()

  const post = reactive({
    author: '',
    title: '',
    description: ''
  })

  const handleSubmit = async () => {
    try {
      const response = await axiosRequest.post('/posts', post)

      if (response.status === 201) router.push('/')
    } catch (e) {
      throw e
    }
  }
</script>

<template>
  <div class="page">
    <div class="posts">
      <div class="page-heading">
        <h1>Create Post</h1>

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

      <ElButton type="success" size="large" :icon="Check" @click="handleSubmit">
        Create
      </ElButton>
    </div>
  </div>
</template>
