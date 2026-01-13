import { AlertTriangle } from 'lucide-react-native';
import React from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { useSettingsStore } from '../store/settingsStore';
import { Button } from './Button';
import { AppText } from './Typography';

interface CustomAlertProps {
    visible: boolean;
    title: string;
    message: string;
    onClose: () => void;
    type?: 'error' | 'success' | 'info';
    buttonText?: string;
}

export function CustomAlert({ visible, title, message, onClose, type = 'error', buttonText = 'OK' }: CustomAlertProps) {
    const { appTheme } = useSettingsStore();
    const isDark = appTheme === 'dark';

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-black/50 justify-center items-center px-6">
                <TouchableOpacity
                    className="absolute inset-0"
                    activeOpacity={1}
                    onPress={onClose}
                />

                <View className={`w-full max-w-sm rounded-[32px] p-6 shadow-2xl ${isDark ? 'bg-[#182235]' : 'bg-white'}`}>
                    <View className="items-center">
                        <View className={`w-16 h-16 rounded-full items-center justify-center mb-4 ${isDark ? 'bg-red-500/10' : 'bg-red-50'}`}>
                            <AlertTriangle
                                size={32}
                                color={isDark ? '#FF6B6B' : '#DC2626'}
                                strokeWidth={2.5}
                            />
                        </View>

                        <AppText variant="h3" className="text-center mb-2">
                            {title}
                        </AppText>

                        <AppText variant="body" className={`text-center mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {message}
                        </AppText>

                        <Button
                            title={buttonText}
                            onPress={onClose}
                            className={`w-full rounded-2xl ${type === 'error' ? 'bg-red-500' : ''}`}
                            textClassName="font-bold"
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
}
