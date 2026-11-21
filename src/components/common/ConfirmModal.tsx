import { globalStyle } from '@/styles/global.style'
import { GlassView, isGlassEffectAPIAvailable } from 'expo-glass-effect'
import { useRef } from 'react'
import { Modal, Platform, StyleSheet, Text, View } from 'react-native'
import { PrimaryButtton } from '../ui'

interface Props {
    titleOne: string
    variantOne: 'filled' | 'outline' | 'alert'
    titleTwo?: string
    variantTwo?: 'filled' | 'outline' | 'alert'
    text: string
    visible: boolean

    onPressOne: () => void
    onPressTwo: () => void
}

function ConfirmModal({ titleOne, variantOne, titleTwo, variantTwo, text, onPressOne, onPressTwo, visible }: Props) {
    const blurTargetRef = useRef<View>(null)
    return (

        <Modal
            animationType='slide'
            transparent
            allowSwipeDismissal
            visible={visible}
            onRequestClose={onPressTwo}
        >
            <View className='flex-1 justify-end items-center p-2'>
                {
                    Platform.OS === 'ios' && isGlassEffectAPIAvailable() ? (
                        <GlassView
                            glassEffectStyle={'clear'}

                            style={styles.internalContainer}
                        >
                            <Text className='text-center text-3xl font-light'>{text}</Text>
                            <View className='gap-4 pb-4 w-full justify-center items-center'>
                                <PrimaryButtton
                                    text={titleOne}
                                    variant={variantOne}
                                    size='lg'
                                    onPress={onPressOne}
                                />
                                {
                                    titleTwo && (
                                        <PrimaryButtton
                                            text={titleTwo}
                                            variant={variantTwo ?? 'outline'}
                                            size='lg'
                                            onPress={onPressTwo}
                                        />
                                    )}
                            </View>



                        </GlassView>
                    ) : (
                        <View
                            style={globalStyle.shadow.large}
                            className='rounded-t-3xl bg-white/50 p-4 pt-6 h-1/3 justify-between items-center border border-gray-04'
                        >
                            <Text className='text-center text-3xl font-light'>{text}</Text>
                            <View className='gap-4 pb-4 w-full justify-center'>
                                <PrimaryButtton
                                    text={titleOne}
                                    variant={variantOne}
                                    size='lg'
                                    onPress={onPressOne}
                                />
                                {
                                    titleTwo && (
                                        <PrimaryButtton
                                            text={titleTwo}
                                            variant={variantTwo ?? 'outline'}
                                            size='lg'
                                            onPress={onPressTwo}
                                        />
                                    )}
                            </View>

                        </View>

                    )
                }
            </View>
        </Modal>

    );
}

export default ConfirmModal;

const styles = StyleSheet.create({
    internalContainer: {
        width: '100%',
        borderRadius: 52,
        padding: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingTop: 24,
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16
    },
})