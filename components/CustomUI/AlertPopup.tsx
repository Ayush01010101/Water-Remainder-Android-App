import React, { FC } from "react";
import { View, Text, Modal, Pressable } from "react-native";
type AlertPopupProps = {
  visible: boolean;
  text: string;
  description?: string;
  onClose: () => void;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
};

const AlertPopup: FC<AlertPopupProps> = ({
  visible,
  text,
  description,
  onClose,
  confirmText = "OK",
  cancelText,
  onConfirm,
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 items-center justify-center bg-black/40">
        <View className="w-4/5 rounded-xl bg-white p-5 dark:bg-neutral-900">
          <Text className="mb-2 text-lg font-bold text-neutral-900 dark:text-white">
            {text}
          </Text>
          {description && (
            <Text className="mb-4 text-base text-neutral-600 dark:text-neutral-300">
              {description}
            </Text>
          )}

          <View className="flex-row justify-end space-x-3">
            {cancelText && (
              <Pressable onPress={onClose} className="px-3 py-2">
                <Text className="font-medium text-violet-600 dark:text-violet-400">
                  {cancelText}
                </Text>
              </Pressable>
            )}
            <Pressable
              onPress={() => {
                onConfirm?.();
                onClose();
              }}
              className="rounded-md bg-violet-600 px-3 py-2 active:bg-violet-700 dark:bg-violet-500 dark:active:bg-violet-600"
            >
              <Text className="font-semibold text-white">{confirmText}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AlertPopup;

