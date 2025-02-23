<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { object, string } from 'zod'

const route = useRoute()
const router = useRouter()
const currentUser = useState('currentUser')

const validationSchema = toTypedSchema(
    object({
        email: string().min(1, { message: 'Email is required' })
            .email({ message: 'Invalid email' }),
        password: string().min(4, { message: 'Must be at least 4 characters' })
            .max(20, { message: 'Must be at most 20 characters' }),
    })
)

const form = useForm({ validationSchema })

const processing = ref(false)
const formError = ref()
const onSubmit = form.handleSubmit(async (values) => {
    processing.value = true
    formError.value = undefined
    try {
        await $fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(values),
        })
        window.location.href = `${route.query.redirect || '/'}`
    } catch (error: any) {
        formError.value = error.statusMessage
    } finally {
        processing.value = false
    }
})

definePageMeta({ layout: 'auth' })
onMounted(() => {
    if (currentUser.value) {
        router.push(`${route.query.redirect || '/'}`)
    }
})
</script>

<template>
    <div>
        <div v-if="formError" class="rounded-lg mb-3 p-4 bg-red-500/10 text-red-500">
            {{ formError }}
        </div>
        <form @submit.prevent="onSubmit">
            <Card>
                <CardHeader>
                    <CardTitle>
                        Login
                    </CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent class="grid gap-4">
                    <FormField v-slot="{ componentField }" name="email">
                        <FormItem class="flex flex-col">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="user@cysc.fr" v-bind="componentField" />
                            </FormControl>
                            <FormMessage class="text-[10px] text-light" />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="password">
                        <FormItem class="flex flex-col">
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="*****" v-bind="componentField" />
                            </FormControl>
                            <FormMessage class="text-[10px] text-light" />
                        </FormItem>
                    </FormField>
                </CardContent>
                <CardFooter class="flex flex-col items-stretch">
                    <Button type="submit" :disabled="processing">
                        <span v-if="processing">Processing...</span>
                        <span v-else>Sign In</span>
                    </Button>
                    <div class="mt-4 text-center text-sm">
                        Don't have an account?
                        <NuxtLink to="/auth/register" class="underline">
                            Sign up
                        </NuxtLink>
                    </div>
                </CardFooter>
            </Card>
        </form>
    </div>
</template>