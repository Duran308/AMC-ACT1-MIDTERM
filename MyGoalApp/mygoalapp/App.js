import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const goalInputHandler = (enteredText) => {
    setEnteredGoalText(enteredText);
  };

  const addGoalHandler = () => {
    if (enteredGoalText.trim() === '') return;

    if (editingIndex !== null) {
      const updatedGoals = [...courseGoals];
      updatedGoals[editingIndex] = { text: enteredGoalText, id: updatedGoals[editingIndex].id };
      setCourseGoals(updatedGoals);
      setEditingIndex(null);
    } else {
      setCourseGoals((currentCourseGoals) => [
        ...currentCourseGoals,
        { text: enteredGoalText, id: Math.random().toString() }
      ]);
    }
    setEnteredGoalText('');
  };

  const deleteGoal = (index) => {
    const updatedGoals = [...courseGoals];
    updatedGoals.splice(index, 1);
    setCourseGoals(updatedGoals);
    if (editingIndex === index) setEditingIndex(null);
  };

  const startEditing = (index) => {
    setEnteredGoalText(courseGoals[index].text);
    setEditingIndex(index);
  };

  const getRainbowColor = (index) => {
    const colors = ['gold', 'purple', 'red', 'cyan', 'orange', 'brown'];
    return { backgroundColor: colors[index % colors.length] };
  };

  return (
    <View>
      <View>
        <TextInput
          placeholder="My Goal"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <Button title={editingIndex !== null ? 'Edit Goal' : 'Add Goal'} onPress={addGoalHandler} />
      </View>

      <FlatList
        data={courseGoals}
        renderItem={({ item, index }) => (
          <View style={[styles.goalContainer, getRainbowColor(index)]}>
            <Text>{item.text}</Text>
            <TouchableOpacity onPress={() => deleteGoal(index)}>
              <Text>X</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => startEditing(index)}>
              <Text>EDIT</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
        alwaysBounceVertical={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  goalContainer: {
    paddingTop: 20,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  }
});