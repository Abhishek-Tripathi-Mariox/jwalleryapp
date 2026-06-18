import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Linking,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../themes/Colors';
import { fetchSupportInfo } from '../../utils/api';

const DEFAULT_BOT_MESSAGES = [
  { id: 1, question: 'Track my order', answer: 'Please provide your order ID to track your order status. You can find it in your Orders section.' },
  { id: 2, question: 'Return & Exchange', answer: 'We offer 7-day easy returns. Items must be unused with original packaging and tags intact.' },
  { id: 3, question: 'Payment options', answer: 'We accept UPI, Credit/Debit cards, Net Banking, and Cash on Delivery.' },
  { id: 4, question: 'Shipping info', answer: 'Free shipping on orders above ₹999. Standard delivery takes 5-7 business days.' },
  { id: 5, question: 'Talk to support', answer: 'connect_support' },
];

export default function CustomerServiceChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [supportInfo, setSupportInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showContactOptions, setShowContactOptions] = useState(false);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    loadSupportInfo();
  }, []);

  const loadSupportInfo = async () => {
    try {
      const res = await fetchSupportInfo();
      if (res?.code === 1 && res.data) {
        setSupportInfo(res.data);
      } else {
        // Use defaults
        setSupportInfo({
          phone: '+91 9876543210',
          email: 'support@jewellery.com',
          whatsapp: '+91 9876543210',
          workingHours: '9:00 AM - 6:00 PM',
          chatBotMessages: DEFAULT_BOT_MESSAGES,
        });
      }
    } catch (e) {
      console.log('Support info load error:', e);
      setSupportInfo({
        phone: '+91 9876543210',
        email: 'support@jewellery.com',
        whatsapp: '+91 9876543210',
        workingHours: '9:00 AM - 6:00 PM',
        chatBotMessages: DEFAULT_BOT_MESSAGES,
      });
    } finally {
      setLoading(false);
      // Add welcome message
      setMessages([
        {
          id: 1,
          text: 'Hello! 👋 Welcome to Jewellery Support. How can I help you today?',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          from: 'bot',
        },
      ]);
    }
  };

  const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleQuestionPress = (item) => {
    const question = item.question;
    const answer = item.answer;

    // Add user message
    setMessages(prev => [
      ...prev,
      { id: prev.length + 1, text: question, time: getTime(), from: 'user' },
    ]);

    setTimeout(() => {
      if (answer === 'connect_support') {
        setMessages(prev => [
          ...prev,
          {
            id: prev.length + 1,
            text: 'Sure! Please choose how you would like to connect with our support team:',
            time: getTime(),
            from: 'bot',
          },
        ]);
        setShowContactOptions(true);
      } else {
        setMessages(prev => [
          ...prev,
          { id: prev.length + 1, text: answer, time: getTime(), from: 'bot' },
        ]);
      }
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 500);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');

    // Add user message
    setMessages(prev => [
      ...prev,
      { id: prev.length + 1, text: userMsg, time: getTime(), from: 'user' },
    ]);

    // Bot response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          text: 'Thank you for your message. Our support team will get back to you shortly. In the meantime, please check the quick options below or connect with us directly.',
          time: getTime(),
          from: 'bot',
        },
      ]);
      setShowContactOptions(true);
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 1000);
  };

  const handleCall = () => {
    const phone = supportInfo?.phone || '+91 9876543210';
    Linking.openURL(`tel:${phone.replace(/\s/g, '')}`);
  };

  const handleEmail = () => {
    const email = supportInfo?.email || 'support@jewellery.com';
    Linking.openURL(`mailto:${email}`);
  };

  const handleWhatsApp = () => {
    const whatsapp = supportInfo?.whatsapp || supportInfo?.phone || '+91 9876543210';
    const cleanNumber = whatsapp.replace(/[^0-9]/g, '');
    Linking.openURL(`whatsapp://send?phone=${cleanNumber}&text=Hi, I need help with my order.`).catch(() => {
      Alert.alert('WhatsApp not installed', 'Please install WhatsApp to use this feature.');
    });
  };

  const botMessages = supportInfo?.chatBotMessages?.length > 0 
    ? supportInfo.chatBotMessages 
    : DEFAULT_BOT_MESSAGES;

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Colors.theme1} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBackBtn}>
          <AntDesign name="arrowleft" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CUSTOMER SUPPORT</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Contact Info Banner */}
      <View style={styles.contactBanner}>
        <Text style={styles.contactBannerText}>
          Working Hours: {supportInfo?.workingHours || '9:00 AM - 6:00 PM'}
        </Text>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        style={styles.chatContainer} 
        contentContainerStyle={{ paddingVertical: 16 }}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {/* Messages */}
        {messages.map(msg => (
          <View
            key={msg.id}
            style={[
              styles.messageRow,
              msg.from === 'user' ? styles.userRow : styles.botRow
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                msg.from === 'user' ? styles.userBubble : styles.botBubble
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  msg.from === 'user' ? styles.userText : styles.botText
                ]}
              >
                {msg.text}
              </Text>
            </View>
            <Text style={styles.timeText}>{msg.time}</Text>
          </View>
        ))}

        {/* Quick Questions */}
        {!showContactOptions && (
          <View style={styles.quickQuestionsContainer}>
            <Text style={styles.quickQuestionsTitle}>Quick Help:</Text>
            {botMessages.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.questionButton}
                onPress={() => handleQuestionPress(item)}
              >
                <Text style={styles.questionButtonText}>{item.question}</Text>
                <AntDesign name="right" size={14} color={Colors.theme1} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Contact Options */}
        {showContactOptions && (
          <View style={styles.contactOptionsContainer}>
            <Text style={styles.contactOptionsTitle}>Connect with us:</Text>
            <View style={styles.contactButtons}>
              <TouchableOpacity style={styles.contactButton} onPress={handleCall}>
                <Feather name="phone" size={24} color="#fff" />
                <Text style={styles.contactButtonText}>Call Us</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.contactButton, styles.whatsappButton]} onPress={handleWhatsApp}>
                <MaterialCommunityIcons name="whatsapp" size={24} color="#fff" />
                <Text style={styles.contactButtonText}>WhatsApp</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.contactButton, styles.emailButton]} onPress={handleEmail}>
                <Feather name="mail" size={24} color="#fff" />
                <Text style={styles.contactButtonText}>Email</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity 
              style={styles.backToQuestionsBtn}
              onPress={() => setShowContactOptions(false)}
            >
              <Text style={styles.backToQuestionsText}>← Back to Quick Help</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Input Row */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor="#aaa"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <AntDesign name="arrowright" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.theme1,
    height: 60,
    paddingHorizontal: 16,
  },
  headerBackBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 19,
    fontWeight: '500',
    letterSpacing: 2,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
  contactBanner: {
    backgroundColor: '#FFF3E0',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  contactBannerText: {
    color: '#E65100',
    fontSize: 13,
    textAlign: 'center',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  messageRow: {
    marginBottom: 12,
    flexDirection: 'column',
  },
  userRow: {
    alignItems: 'flex-end',
  },
  botRow: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '85%',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  userBubble: {
    backgroundColor: Colors.theme1,
  },
  botBubble: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  userText: {
    color: '#fff',
  },
  botText: {
    color: '#333',
  },
  timeText: {
    fontSize: 11,
    color: '#888',
    marginTop: 4,
    marginHorizontal: 4,
  },
  quickQuestionsContainer: {
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quickQuestionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
  questionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 8,
  },
  questionButtonText: {
    fontSize: 15,
    color: '#333',
    flex: 1,
  },
  contactOptionsContainer: {
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  contactOptionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  contactButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  contactButton: {
    backgroundColor: Colors.theme1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 90,
  },
  whatsappButton: {
    backgroundColor: '#25D366',
  },
  emailButton: {
    backgroundColor: '#4285F4',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 6,
    fontWeight: '500',
  },
  backToQuestionsBtn: {
    marginTop: 16,
    alignItems: 'center',
  },
  backToQuestionsText: {
    color: Colors.theme1,
    fontSize: 14,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#F5F5F5',
    marginRight: 10,
  },
  sendBtn: {
    backgroundColor: Colors.theme1,
    borderRadius: 24,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});