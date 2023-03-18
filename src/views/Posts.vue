<script setup>
  import { ref, onMounted } from 'vue'
  import { RouterLink, useRouter } from 'vue-router'
  import { ElTable, ElTableColumn, ElButton } from 'element-plus'

  import { Check, Delete, Edit, Star } from '@element-plus/icons-vue'

  import axiosRequest from '~/composables/useApi'

  const router = useRouter()

  const posts = ref([])

  const handleView = (_, row) => {
    router.push(`/posts/view/${row.id}`)
  }

  const handleEdit = (_, row) => {
    router.push(`/posts/edit/${row.id}`)
  }

  const handleDelete = async (_, row) => {
    const response = await axiosRequest.delete(`/posts/${row.id}`)

    const { data } = await axiosRequest.get('/posts')
    posts.value = data
  }

  onMounted(async () => {
    const response = await axiosRequest.get('/posts')
    posts.value = response.data
  })
</script>

<template>
  <div class="page">
    <div class="posts">
      <div class="page-heading">
        <h1>Posts</h1>
        <RouterLink :to="`/posts/create`">
          <ElButton size="large" type="success" :icon="Check">Create</ElButton>
        </RouterLink>
      </div>
      <ElTable :data="posts" style="width: 100%">
        <ElTableColumn label="Author" prop="author" />
        <ElTableColumn label="Title" prop="title" />
        <ElTableColumn label="Description" prop="description" />
        <ElTableColumn align="right">
          <template #default="scope">
            <ElButton
              type="primary"
              :icon="Star"
              circle
              @click="handleView(scope.$index, scope.row)"
            />
            <ElButton
              type="warning"
              :icon="Edit"
              circle
              @click="handleEdit(scope.$index, scope.row)"
            />

            <ElButton
              type="danger"
              :icon="Delete"
              circle
              @click="handleDelete(scope.$index, scope.row)"
            />
          </template>
        </ElTableColumn>
      </ElTable>
    </div>
  </div>
</template>
