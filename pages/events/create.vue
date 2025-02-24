<template>
  <div class="container mx-auto flex flex-col gap-2 p-4">
    <h1 class="text-2xl font-bold">Create an event</h1>
    <p class="text-gray-500">Fill in the form below to create an event</p>
    <!-- <div v-if="formError" class="rounded-lg mb-3 p-4 bg-red-500/10 text-red-500">
      {{ formError }}
    </div> -->
    <form @submit="onSubmit" class="flex flex-col gap-4 mt-4">
      <div class="grid sm:grid-cols-2 items-start gap-4">
        <FormField v-slot="{ componentField }" name="title">
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Laracon Morocco" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="location">
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input type="text" placeholder="ENSAM Meknes" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <div class="grid sm:grid-cols-3 items-start gap-4">
        <FormField v-slot="{ componentField }" name="date">
          <FormItem>
            <FormLabel>Date</FormLabel>
            <FormControl>
              <Input type="date" :min="tomorrow" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="time">
          <FormItem>
            <FormLabel>Time</FormLabel>
            <FormControl>
              <Input type="time" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="max_participants">
          <FormItem>
            <FormLabel>Maximum participants</FormLabel>
            <FormControl>
              <Input type="number" min="1" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <Button type="submit" :disabled="processing">
        <span v-if="!processing">Create</span>
        <span v-else>Creating...</span>
      </Button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import { number, object, string, date } from 'zod'

const router = useRouter()

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const validationSchema = toTypedSchema(
  object({
    title: string().min(1, { message: 'Title is required' }),
    date: string().date().min(1, { message: 'Date is required' }),
    time: string().min(1, { message: 'Time is required' }).regex(/^\d{2}:\d{2}$/, { message: 'Invalid time' }),
    location: string().min(1, { message: 'Location is required' }),
    max_participants: number().gte(1, { message: 'The event must have at least 1 participant' }),
  })
)

const form = useForm({ validationSchema })
const processing = ref(false)
const formError = ref()

const onSubmit = form.handleSubmit(async (values) => {
  processing.value = true
  formError.value = undefined
  console.log(values)
  try {
    await $fetch('/api/events', {
      method: 'POST',
      body: JSON.stringify(values),
    })
    router.push('/')
  } catch (error: any) {
    formError.value = error.statusMessage
  } finally {
    processing.value = false
  }
})
</script>
