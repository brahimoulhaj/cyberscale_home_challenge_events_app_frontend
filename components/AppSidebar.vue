<script setup lang="ts">
import {
    Calendar,
    Home,
    Building,
    CalendarCheck,
} from "lucide-vue-next"

// Menu items.
const items = [
    {
        title: "All Events",
        url: "/events",
        icon: Calendar,
    },
    {
        title: "My Events",
        url: "/events/host",
        icon: Building,
    },
    {
        title: "Attended Events",
        url: "/events/attended",
        icon: CalendarCheck,
    },
];
</script>

<template>
    <Sidebar collapsible="icon">
        <SidebarHeader class="border-b">
            <span class="font-black text-3xl h-10 flex items-center justify-center">
                <img src="https://www.cyber-scale.me/public/images/logo-orange-full_1.png" alt="" class="max-h-7">
            </span>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <NuxtLink to="/">
                                    <Home />
                                    <span>Home</span>
                                </NuxtLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
                <SidebarGroupLabel>Events</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem v-for="item in items" :key="item.title">
                            <SidebarMenuButton asChild>
                                <NuxtLink :to="item.url">
                                    <component :is="item.icon" />
                                    <span>{{ item.title }}</span>
                                </NuxtLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter class="border-t">
            <UserDropdown></UserDropdown>
        </SidebarFooter>
    </Sidebar>
</template>