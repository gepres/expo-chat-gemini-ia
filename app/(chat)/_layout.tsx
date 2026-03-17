import { useThemeColor } from '@/hooks/useThemeColor';
import { Layout } from '@ui-kitten/components';
import { Stack } from 'expo-router';

export default function ChatLayout() {
  const iconColor = useThemeColor({}, 'icon');

  return (
    <Layout style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerBackTitle: 'Volver',
          headerTintColor: iconColor,
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Gemini AI' }} />
        <Stack.Screen
          name="basic-prompt"
          options={{ title: 'Prompt básico' }}
        />
      </Stack>
    </Layout>
  );
}
