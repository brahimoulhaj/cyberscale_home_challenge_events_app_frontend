<template>
  <div class="container max-w-5xl py-8" v-if="data?.data">
    <!-- Event Header -->
    <div class="flex items-start justify-between mb-8">
      <div>
        <h1 class="text-4xl font-bold mb-2">{{ data.data.title }}</h1>
        <div class="flex items-center gap-4 text-muted-foreground">
          <div class="flex items-center gap-2">
            <CalendarIcon class="w-4 h-4" />
            {{ $dayjs(`${data.data.date} ${data.data.time}`).format('dddd, MMMM D, YYYY') }}
          </div>
          <div class="flex items-center gap-2">
            <ClockIcon class="w-4 h-4" />
            {{ $dayjs(`${data.data.date} ${data.data.time}`).format('HH:mm A') }}
          </div>
        </div>
      </div>
      <div class="flex gap-3">
        <Button v-if="!data.data.isPast && !isHost"
          @click="attended ? handleLeaveEvent(data.data) : handleAttendEvent(data.data)" :disabled="loading"
          :variant="attended ? 'outline' : 'default'">
          <UserPlus v-if="!attended" class="w-4 h-4 mr-2" />
          <UserMinus v-else class="w-4 h-4 mr-2" />
          {{ attended ? 'Leave Event' : 'Join Event' }}
        </Button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-3 gap-6">
      <!-- Left Column: Event Details -->
      <div class="col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle class="text-xl">About this event</CardTitle>
          </CardHeader>
          <CardContent>
            <p v-if="data.data.description" class="text-muted-foreground">
              {{ data.data.description }}
            </p>
            <p v-else class="text-muted-foreground italic">
              No description provided
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle class="text-xl">Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="flex items-start gap-3">
              <MapPin class="w-5 h-5 mt-1 text-muted-foreground" />
              <div>
                <p class="font-medium">{{ data.data.location }}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Participants List -->
        <Card>
          <CardHeader class="flex flex-row items-center justify-between">
            <CardTitle class="text-xl">Participants</CardTitle>
            <Badge variant="secondary">
              {{ data.data.countParticipants }}/{{ data.data.maxParticipants }}
            </Badge>
          </CardHeader>
          <CardContent>
            <Progress class="mb-4" :value="(data.data.countParticipants / data.data.maxParticipants) * 100" />
            <div class="space-y-4">
              <div v-for="participant in data.data.participants" :key="participant.id"
                class="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                <div class="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage :src="`https://avatar.vercel.sh/${participant.email}.png`" />
                    <AvatarFallback>{{ participant.name.charAt(0) }}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p class="font-medium">{{ participant.name }}</p>
                    <p class="text-sm text-muted-foreground">{{ participant.email }}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Right Column: Host Info & Quick Stats -->
      <div class="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle class="text-xl">
              Host
              <small v-if="isHost"
                class="ms-1 text-xs text-muted-foreground rounded bg-muted-foreground/10 px-2 py-1">You</small>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div class="flex items-center gap-4">
              <Avatar>
                <AvatarImage :src="`https://avatar.vercel.sh/${data.data.host.email}.png`" />
                <AvatarFallback>{{ data.data.host.name.charAt(0) }}</AvatarFallback>
              </Avatar>
              <div>
                <p class="font-medium">{{ data.data.host.name }}</p>
                <p class="text-sm text-muted-foreground">{{ data.data.host.email }}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle class="text-xl">Quick Info</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-muted-foreground">Status</span>
              <Badge :variant="data.data.isPast ? 'destructive' : 'success'">
                {{ data.data.isPast ? 'Past' : 'Upcoming' }}
              </Badge>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-muted-foreground">Capacity</span>
              <span class="font-medium">{{ data.data.maxParticipants }} people</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-muted-foreground">Available Spots</span>
              <span class="font-medium">{{ data.data.maxParticipants - data.data.countParticipants }}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  MapPin,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  UserPlus,
  UserMinus,
} from 'lucide-vue-next';

const route = useRoute();
const currentUser: any = useState('currentUser');
const loading = ref(false);

const data = ref<any>(null);

const getEvent = async () => {
  loading.value = true;
  const response = await $fetch(`/api/events/${route.params.slug}`);
  data.value = response;
  loading.value = false;
}

onMounted(getEvent);

const attended = computed(() => {
  return data.value?.data.participants?.some(p => p.id === currentUser.value?.id);
});

const isHost = computed(() => {
  return data.value?.data.host?.id === currentUser.value?.id;
});


const handleAttendEvent = async (event: any) => {
  console.log('Attend event', event.id);
  await $fetch(`/api/events/${event.id}/attend`, { method: 'POST' });
  getEvent();
}

const handleLeaveEvent = async (event: any) => {
  console.log('Leave event', event.id);
  await $fetch(`/api/events/${event.id}/leave`, { method: 'POST' });
  getEvent();
}

</script>
