<template>
  <Card>
      <CardHeader>
        <CardDescription>
          {{ $dayjs(`${event.date} ${event.time}`).format('ddd, MMM D, YYYY - HH:mm A') }}
        </CardDescription>
      </CardHeader>
      <CardContent>
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
              <small>Attending: </small>
              <span class="text-xs">
                {{event.countParticipants}}
                <sub>/{{event.maxParticipants}}</sub>
              </span>
            </div>
            <Progress :modelValue="100 * (event.countParticipants / event.maxParticipants)" />
          </div>
          <div class="mx-auto me-0">
            <Button>Attend</Button>
          </div>
        </div>
      </CardFooter>
    </Card>
</template>

<script lang="ts" setup>
import { MapPin, Users } from 'lucide-vue-next';

defineProps({
  event: {
    type: Object,
    required: true,
  },
});
</script>

<style>

</style>