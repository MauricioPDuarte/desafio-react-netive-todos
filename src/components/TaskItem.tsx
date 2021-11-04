import React, { useState, useRef, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Task } from './TasksList';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'

interface TaskItemProps {
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, newTitle: string) => void;
}

export function TaskItem({ task, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [taskNewTitleValue, setTaskNewTitleValue] = useState<string>(task.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setIsEditing(true);
    }

    function handleCancelEditing() {
        editTask(task.id, taskNewTitleValue);
        setIsEditing(false);
    }

    function handleSubmitEditing() {
        editTask(task.id, taskNewTitleValue);
        setIsEditing(false);
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [isEditing]);

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(task.id)}
                >
                    <View
                        style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        {task.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>

                    <TextInput
                        value={taskNewTitleValue}
                        onChangeText={setTaskNewTitleValue}
                        editable={isEditing}
                        onSubmitEditing={handleSubmitEditing}
                        style={task.done ? styles.taskTextDone : styles.taskText}
                        ref={textInputRef}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.actions}>
                {isEditing ?
                    <TouchableOpacity onPress={handleCancelEditing}>
                        <Icon name="x" size={24} color="#b2b2b2" />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={handleStartEditing}>
                        <Image source={editIcon} />
                    </TouchableOpacity>
                }

                <View style={styles.divider}></View>

                <TouchableOpacity
                    disabled={isEditing}
                    onPress={() => removeTask(task.id)}
                >
                    <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 10,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    divider: {
        width: 1,
        height: 24,
        color: 'rgba(196, 196, 196, 0.24)',
        marginRight: 5,
        marginLeft: 5
    }
})