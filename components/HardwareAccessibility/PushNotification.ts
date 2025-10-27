import * as Notifications from 'expo-notifications';
import { Platform, Alert } from 'react-native';

export async function setupNotifications() {
  const { status } = await Notifications.requestPermissionsAsync();
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

  if (status !== 'granted') {
    Alert.alert('Permission Denied', 'Aapko reminder ke liye notification permission deni padegi.');
    return false;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(
      'default',
      {
        name: 'Water Reminders',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
      }
    );
  }
  return true;
}

export const startReminderLoop = async (minutes: number) => {
  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: '💧 Drink Some Water!',
      body: 'Drink 1 Glass Of Water Buddy.',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 20000,
      repeats: true,
    },


  });
};

export const stopReminderLoop = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
  console.log('Saare reminders cancel kar diye gaye.');
};
