import { Platform } from 'react-native';
import {
  check,
  request,
  requestMultiple,
  requestNotifications,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

function mapResult(result) {
  switch (result) {
    case RESULTS.GRANTED:
      return 'granted';
    case RESULTS.BLOCKED:
      return 'blocked';
    case RESULTS.DENIED:
      return 'denied';
    case RESULTS.LIMITED:
      return 'limited';
    case RESULTS.UNAVAILABLE:
      return 'unavailable';
    default:
      return 'other';
  }
}

/* 🌍 LOCATION */
export async function requestLocationPermission() {
  try {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    const result = await request(permission);
    return mapResult(result);
  } catch (err) {
    console.error('Location permission error:', err);
    return 'other';
  }
}

/* 📸 CAMERA */
export async function requestCameraPermission() {
  try {
    const permission =
      Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
    const result = await request(permission);
    return mapResult(result);
  } catch (err) {
    console.error('Camera permission error:', err);
    return 'other';
  }
}

/* 🎧 MICROPHONE */
export async function requestMicrophonePermission() {
  try {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.MICROPHONE
        : PERMISSIONS.ANDROID.RECORD_AUDIO;
    const result = await request(permission);
    return mapResult(result);
  } catch (err) {
    console.error('Microphone permission error:', err);
    return 'other';
  }
}

/* 💾 STORAGE / FILE ACCESS */
export async function requestFilePermission() {
  try {
    if (Platform.OS === 'ios') {
      const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      return mapResult(result);
    } else if (Platform.Version >= 33) {
      const result = await requestMultiple([
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      ]);
      return Object.values(result).every(r => r === RESULTS.GRANTED)
        ? 'granted'
        : 'denied';
    } else {
      const result = await requestMultiple([
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      ]);
      return Object.values(result).every(r => r === RESULTS.GRANTED)
        ? 'granted'
        : 'denied';
    }
  } catch (err) {
    console.error('File permission error:', err);
    return 'other';
  }
}

/* 🔵 BLUETOOTH */
export async function requestBluetoothPermission() {
  try {
    if (Platform.OS === 'ios') {
      const result = await request(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL);
      return mapResult(result);
    } else {
      const result = await requestMultiple([
        PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
      ]);
      return Object.values(result).every(r => r === RESULTS.GRANTED)
        ? 'granted'
        : 'denied';
    }
  } catch (err) {
    console.error('Bluetooth permission error:', err);
    return 'other';
  }
}

/* 🔔 NOTIFICATIONS */
export async function requestNotificationPermission() {
  try {
    const { status } = await requestNotifications(['alert', 'sound', 'badge']);
    return mapResult(status);
  } catch (err) {
    console.error('Notification permission error:', err);
    return 'other';
  }
}

/* 🌐 WIFI */
export async function requestWifiPermission() {
  return await requestLocationPermission();
}

export async function requestAllPermissions() {
  const results = {};

  results.location = await requestLocationPermission();
  results.camera = await requestCameraPermission();
  results.microphone = await requestMicrophonePermission();
  results.bluetooth = await requestBluetoothPermission();
  results.file = await requestFilePermission();
  results.notification = await requestNotificationPermission();

  console.log('All permission results:', results);
  return results;
}

export async function openAppSettingsIfBlocked(status) {
  if (status === 'blocked') {
    await openSettings();
  }
}
