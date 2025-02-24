<template>
  <div class="w-full h-screen">
    <div class="flex gap-2 mb-6 mt-2">
      <h1 class="text-2xl font-bold">Events</h1>
      <NuxtLink to="/events/create" class="mx-auto me-0">
        <Button>Create a new event</Button>
      </NuxtLink>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
      <NuxtLink :to="`/events/${event.slug}`" v-for="event in data?.data ?? []" :key="event.id">
        <EventCard :event="event" @attend="handleAttendEvent" @leave="handleLeaveEvent" />
      </NuxtLink>
    </div>
    <div v-if="data?.data?.length === 0" class="flex items-center justify-center h-full">
      No events
    </div>
    <div v-if="data?.meta" class="py-4 flex justify-center">
      <Pagination v-slot="{ page }" :items-per-page="data.meta.perPage" :total="data.meta.total" :sibling-count="1"
        show-edges :default-page="data.meta.currentPage" @update:page="handlePageChange">
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
          <PaginationFirst />
          <PaginationPrev />

          <template v-for="(item, index) in items">
            <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
              <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </template>

          <PaginationNext />
          <PaginationLast />
        </PaginationList>
      </Pagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toast } from 'vue-sonner'

const route = useRoute();
const router = useRouter();
const currentUser = useState('currentUser');

const data: any = ref([]);

const { $echo } = useNuxtApp()

onMounted(() => {
  $echo.private(`JoinEvent.${currentUser.value.id}`)
    .listen('UserJoinAnEvent', (event: any) => {
      toast.info('Great news! A new attendee joined your event!', {
        description: `${event.participant.name} joins ${event.event.title}`,
      })
      getEvents(Number(`${route.query.page || 1}`));
    });
})

onBeforeRouteLeave(() => {
  $echo.leave(`JoinEvent.${currentUser.value.id}`);
})

const getEvents = async (page: number = 1) => {
  const response = await fetch('api/events?page=' + page);
  data.value = await response.json();
};

const handlePageChange = (page: number) => {
  router.push({ query: { page } });
  getEvents(page);
};

const handleAttendEvent = async (event: any) => {
  console.log('Attend event', event.id);
  await $fetch(`/api/events/${event.id}/attend`, { method: 'POST' });
  getEvents(Number(`${route.query.page || 1}`));
}

const handleLeaveEvent = async (event: any) => {
  console.log('Leave event', event.id);
  await $fetch(`/api/events/${event.id}/leave`, { method: 'POST' });
  getEvents(Number(`${route.query.page || 1}`));
}

getEvents(Number(`${route.query.page || 1}`));
</script>

<style></style>