<template>
  <NuxtLayout>
    <div v-if="loading" class="w-full h-screen flex items-center justify-center">
      <Loader class="animate-spin" />
    </div>
    <NuxtPage v-else />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { Loader } from 'lucide-vue-next';

const currentUser = useState('currentUser');
const loading = ref(false)

const setCurrentUser = async () => {
  loading.value = true
  try {
    const { data } = await useFetch('/api/auth/me');
    if (data) {
      currentUser.value = data;
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

setCurrentUser();
</script>
