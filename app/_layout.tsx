import { Stack } from "expo-router";
import './globals.css';

export default function RootLayout() {
  return (
      <Stack>
        <Stack.Screen
            name="(tabs)"
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen
            name="drinks/[id]"
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen
            name="events/[id]"
            options={{
                headerShown: false,
            }}
        />
      </Stack>
  )
}
