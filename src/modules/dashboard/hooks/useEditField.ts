import { useEffect, useRef, useState } from "react";
import { TextInput } from "react-native";

interface FieldProps {
    item: 'name' | 'lastName' | 'email'
}

export const useEditField = () => {
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingLastName, setIsEditingLastName] = useState(false);
    const nameInputRef = useRef<TextInput>(null);
    const lastNameInputRef = useRef<TextInput>(null);

    useEffect(() => {
        if (!isEditingName) {
            nameInputRef.current?.blur()
            return
        }
        const timeout = setTimeout(() => {
            nameInputRef.current?.focus()
        }, 50)
        return () => clearTimeout(timeout)
    }, [isEditingName])

    useEffect(() => {
        if (!isEditingLastName) {
            lastNameInputRef.current?.blur()
            return
        }
        const timeout = setTimeout(() => {
            lastNameInputRef.current?.focus()
        }, 50)
        return () => clearTimeout(timeout)
    }, [isEditingLastName])

    const handleEdit = ({ item }: FieldProps) => {
        if (item === 'name') {
            setIsEditingName((prev) => !prev)
        } else if (item === 'lastName') {
            setIsEditingLastName((prev) => !prev)
        }
    }


    return {
        isEditingName,
        isEditingLastName,
        nameInputRef,
        lastNameInputRef,

        setIsEditingName,
        setIsEditingLastName,
        handleEdit,
    }
}