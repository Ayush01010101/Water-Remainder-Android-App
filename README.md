# Water Reminder App

A simple yet effective React Native application built with Expo to help you track your daily water intake. Users can set a daily goal, log glasses of water consumed, view their progress, and set timed reminders. The app uses local storage to save user data.

## Features

* **User Setup:** Simple login screen for username and initial daily water goal (4-12 glasses).
* **Goal Setting:** Allows setting a daily goal.
* **Progress Tracking:** Displays daily progress (completed vs. goal) with a progress bar.
* **Quick Logging ("Drink Now"):** Button to easily log 1 glass of water consumed. Checks if the goal is already met.
* **Quick Goal Adjustment:** Buttons to quickly add +1, +2, or +3 glasses to the *daily goal* (up to a max of 15 glasses).
* **Smart Reminders:**
    * Users can set reminder intervals (15, 30, 45 min) via a clock icon button (visible when the goal isn't met).
    * The active reminder interval is displayed on the main card.
    * Reminders work in the background using Expo Notifications, even if the app is closed.
    * Uses a custom notification sound (requires a **Development Build** and setup).
    * Reminders stop automatically when the daily goal is reached.
    * Users can manually stop reminders.
* **Daily Reset:** A reset button appears when the goal is complete, allowing the user to reset progress (completed=0, goal=4).
* **Greetings:** Displays time-based greetings.
* **Persistent Storage:** Uses AsyncStorage for username, goal, progress, and reminder interval.
* **UI:** Dark-themed, built with NativeWind.
* **Permission Handling:** Checks for notification permissions and guides the user if denied.

## Technology Stack

* React Native with Expo SDK
* NativeWind (Tailwind CSS)
* React Context API
* AsyncStorage
* Expo Router
* Expo Notifications

## Getting Started

### Using Docker
    docker build -t <image_name> .
    docker run -it -p 8081:8081 <image_name>
### or
### Prerequisites

* Node.js (LTS version recommended)
* npm or Yarn
* Expo CLI (`npm install -g expo-cli`)
* EAS CLI (`npm install -g eas-cli`) - **Required for custom notification sounds and development builds**
* An Android device or emulator

### Installation

1.  Clone the repository:
    ```bash
    git clone <https://github.com/Ayush01010101/Water-Remainder-Android-App.git>
    cd <Water-Remainder-Android-App>
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  Add your custom sound file (e.g., `ring.mp3`) to `assets/sounds/`.
4.  Configure `app.json` and your notification code (`PushNotification.ts` or similar) to use the custom sound file correctly (lowercase, without extension in code, with extension in `app.json`).

## Running the App

**1. Using Expo Go (Limited Features):**

* Start the Metro bundler:
    ```bash
    npx expo start
    ```
* Scan the QR code using the Expo Go app on your device.
* **Note:** Custom notification sounds **will not work**. Default sounds will be used.

**2. Using a Development Build (Required for Full Features):**

* Build the Development Client:
    ```bash
    # Login to EAS if you haven't already
    eas login
    # Create the build (ensure sound file is configured before building)
    npx eas build --profile development --platform android
    ```
* Download and install the generated `.apk` file onto your Android device. **Uninstall previous versions first.**
* Start the Metro bundler for the Dev Client:
    ```bash
    npx expo start --dev-client
    ```
* Open the installed app on your device.
* **Note:** This build is required for custom notification sounds.
