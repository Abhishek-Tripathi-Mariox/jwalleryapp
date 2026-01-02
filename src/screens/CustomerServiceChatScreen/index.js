import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const initialMessages = [
  { id: 1, text: 'Hello, good morning.', time: '10:41 pm', from: 'agent' },
  { id: 2, text: 'I am a Customer Service, is there anything I can help you with?', time: '10:41 pm', from: 'agent' },
  { id: 3, text: "Hi, I'm having problems with my order & payment.", time: '10:50 pm', from: 'user' },
  { id: 4, text: 'Can you help me?', time: '10:50 pm', from: 'user' },
  { id: 5, text: 'Of course...', time: '10:51 pm', from: 'agent' },
  { id: 6, text: 'Can you tell me the problem you are having? so I can help solve it', time: '10:51 pm', from: 'agent' },
  { id: 7, text: 'Lorem Ipsum is simply dummy text of the printing and', time: '10:50 pm', from: 'user' },
  { id: 8, text: 'Lorem Ipsum is simply dummy', time: '10:50 pm', from: 'user' },
];

export default function CustomerServiceChatScreen({ navigation }) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: input, time: 'now', from: 'user' }
      ]);
      setInput('');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBackBtn}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CUSTOMER SERVICE</Text>
      </View>
      <ScrollView style={styles.chatContainer} contentContainerStyle={{ paddingVertical: 16 }}>
        <View style={styles.dateBadge}>
          <Text style={styles.dateBadgeText}>Today</Text>
        </View>
        {messages.map(msg => (
          <View
            key={msg.id}
            style={[
              styles.messageRow,
              msg.from === 'user' ? styles.userRow : styles.agentRow
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                msg.from === 'user' ? styles.userBubble : styles.agentBubble
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  msg.from === 'user' ? styles.userText : styles.agentText
                ]}
              >
                {msg.text}
              </Text>
            </View>
            <Text style={styles.timeText}>{msg.time}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Write your message..."
          placeholderTextColor="#aaa"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <AntDesign name="arrowright" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A1011B',
    paddingTop: 48,
    paddingBottom: 18,
    paddingHorizontal: 16,
  },
  headerBackBtn: {
    marginRight: 12,
    backgroundColor: 'transparent',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  dateBadge: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 2,
    marginBottom: 10,
    marginTop: 2,
    elevation: 2,
  },
  dateBadgeText: {
    color: '#868686',
    fontSize: 13,
    fontWeight: 'bold',
  },
  messageRow: {
    marginBottom: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  userRow: {
    alignItems: 'flex-end',
  },
  agentRow: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  userBubble: {
    backgroundColor: '#C8002F',
    alignSelf: 'flex-end',
  },
  agentBubble: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#f0e0e0',
  },
  messageText: {
    fontSize: 15,
  },
  userText: {
    color: '#fff',
  },
  agentText: {
    color: '#222',
  },
  timeText: {
    fontSize: 11,
    color: '#868686',
    marginTop: 2,
    marginLeft: 2,
    alignSelf: 'flex-end',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 15,
    color: '#222',
    backgroundColor: '#fff',
    marginRight: 8,
  },
  sendBtn: {
    backgroundColor: '#C8002F',
    borderRadius: 24,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});