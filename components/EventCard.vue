<template>
  <Card class="flex flex-col h-full" :class='event.isPast ? "opacity-45" : ""'>
    <CardHeader>
      <CardDescription class="flex items-center justify-between gap-1">
        <span>{{ $dayjs(`${event.date} ${event.time}`).format('ddd, MMM D, YYYY - HH:mm A') }}</span>
        <div v-if="event.isPast && !isHost">
          <small v-if="!attended" class="text-red-500 bg-red-500/10 px-2 py-1 rounded">Missed</small>
          <small v-else class="text-blue-500 bg-blue-500/10 px-2 py-1 rounded">Attended</small>
        </div>
        <small v-if="isHost" class="text-green-600 bg-green-500/10 px-2 rounded">
          {{ event.isPast ? 'Hosted' : 'Host' }}
        </small>
      </CardDescription>
    </CardHeader>
    <CardContent class="flex-1">
      <CardTitle class="mb-3 first-letter:uppercase">
        {{ event.title }}
      </CardTitle>
      <small class="flex gap-1 items-center">
        <MapPin :size="20" />
        <span class="first-letter:uppercase">{{ event.location }}</span>
      </small>
    </CardContent>
    <CardFooter>
      <div class="flex items-center w-full">
        <div class="flex flex-col">
          <div class="flex items-center gap-1">
            <Users :size="16" />
            <small>Attendees: </small>
            <span class="text-xs">
              {{ event.countParticipants }}
              <sub>/{{ event.maxParticipants }}</sub>
            </span>
          </div>
          <Progress :modelValue="100 * (event.countParticipants / event.maxParticipants)" />
        </div>
        <div v-if="!event.isPast && !isHost" class="mx-auto me-0">
          <Button @click="$emit('attend', event)" v-if="!attended">Attend</Button>
          <Button @click="$emit('leave', event)" v-else variant="destructive">Leave</Button>
        </div>
      </div>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { MapPin, Users } from 'lucide-vue-next';

const currentUser: any = useState('currentUser');

const attended = computed(() => {
  return props.event.participants.includes(currentUser.value.id);
});
const isHost = computed(() => {
  return props.event.host.id === currentUser.value.id;
});

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});
</script>

<style></style>