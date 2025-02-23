<template>
  <div v-if="data" class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    <div v-for="event in data?.data ?? []" :key="event.id">
      <EventCard :event="event" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const data = ref([]);

const getEvents = async () => {
  const response = await fetch('api/events');
  return await response.json();
};

onMounted(async () => {
  data.value = await getEvents();
});
</script>

<style></style>