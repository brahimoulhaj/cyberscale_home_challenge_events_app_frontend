<script setup lang="ts">
import { ChevronsUpDown, LogOut } from "lucide-vue-next"
import { useSidebar } from "./ui/sidebar";

defineProps({
  viewEmail: {
    type: Boolean,
    default: true
  }
})

const user = {
  avatar: 'https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg',
  name: "Brahim O.",
  email: "brahimoulhaj17@gmail.com"
}

const { isMobile } = useSidebar()
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar class="h-8 w-8 rounded-lg">
                <AvatarImage :src="user.avatar" alt="@unovue" />
                <AvatarFallback class="rounded-lg">
                  {{ user.name.charAt(0).toUpperCase() }}
                </AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">{{ user.name }}</span>
                <span v-if="viewEmail" class="truncate text-xs">{{ user.email }}</span>
              </div>
              <ChevronsUpDown class="ml-auto size-4" />
            </div>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          :side="isMobile ? 'bottom' : 'right'" align="end" :side-offset="4">
          <DropdownMenuLabel class="p-0">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar class="h-8 w-8 rounded-lg">
                <AvatarImage :src="user.avatar" :alt="user.name" />
                <AvatarFallback class="rounded-lg">
                  {{ user.name.charAt(0).toUpperCase() }}
                </AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">{{ user.name }}</span>
                <span class="truncate text-xs">{{ user.email }}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="cursor-pointer">
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>