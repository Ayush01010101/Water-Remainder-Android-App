import * as Notifications from 'expo-notifications';
import { Platform, Alert } from 'react-native';
const SOUND_FILE_NAME = "Ring.mp3";

export async function setupNotifications() {
  const { status } = await Notifications.requestPermissionsAsync();
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
  if (status !== 'granted') {
    Alert.alert('Permission Denied', 'Aapko reminder ke liye notification permission deni padegi.');
    return false
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      sound: SOUND_FILE_NAME,
    });
  }

  return true;
}

export const startReminderLoop = async (minutes: number) => {

  await Notifications.cancelAllScheduledNotificationsAsync();
  console.log('Purane reminders cancel kar diye.');

  await Notifications.scheduleNotificationAsync({
    content: {
      title: '💧 Paani Peelo!',
      body: 'Hydrate hone ka time ho gaya hai.',
      sound: SOUND_FILE_NAME,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 10,
      repeats: true,
    },
  });
  console.log('Naya reminder schedule ho gaya.');
};

export const stopReminderLoop = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
  console.log('Saare reminders cancel kar diye gaye.');
};;
