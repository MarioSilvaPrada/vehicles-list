import React from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {RootStackNavigationProp} from '../navigation/MainNavigator';
import {useNavigation} from '@react-navigation/native';
import {ChevronIcon} from '../assets/svg/chevron';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  goBack?: boolean;
};

export const Layout = ({children, title, goBack}: LayoutProps) => {
  const {goBack: back} = useNavigation<RootStackNavigationProp<'BOTTOM_NAV'>>();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          {goBack && (
            <Pressable onPress={back} style={styles.backBtn}>
              <ChevronIcon />
            </Pressable>
          )}
          {title && <Text style={styles.title}>{title}</Text>}
        </View>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 10,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backBtn: {
    position: 'absolute',
    left: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
