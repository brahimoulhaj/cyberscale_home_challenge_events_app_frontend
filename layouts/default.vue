<template>
    <div>
        <SidebarProvider>
            <!-- <AppSidebar /> -->
            <SidebarInset>
                <main>
                    <div class="flex items-center w-full gap-2 p-2 border-b">
                        <NuxtLink to="/" class="text-3xl font-black">
                            LO<span class="text-cyan-700 font-thin">G</span>O
                        </NuxtLink>
                        <!-- <SidebarTrigger class="" /> -->
                        <div class="mx-auto me-0 flex items-center gap-2">
                            <Button variant="outline" size="icon" class="shrink-0">
                                <Bell class="w-4 h-4" />
                            </Button>
                            <UserDropdown :viewEmail="false" />
                        </div>
                    </div>
                    <div class="p-4">
                        <slot />
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
        <Toaster position="top-right" />
    </div>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components';
import { Bell } from 'lucide-vue-next';
</script>
