import Colors from '@/constants/Colors'
import FontSize from '@/constants/FontSize'
import Spacing from '@/constants/Spacing'
import { Ionicons } from '@expo/vector-icons'
import { default as React } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function SocialMediaLinks() {
  return (
    <View style={{ marginVertical: Spacing * 3 }}>
          <Text
            style={{
              color: Colors.primary,
              textAlign: "center",
              fontSize: FontSize.small,
            }}
          >
            Or continue with
          </Text>

          <View
            style={{
              marginTop: Spacing,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {["logo-google", "logo-apple", "logo-facebook"].map((icon, index) => (
              <TouchableOpacity
                key={icon}
                style={{
                  padding: Spacing,
                  backgroundColor: Colors.gray,
                  borderRadius: Spacing / 2,
                  marginHorizontal: Spacing,
                }}
              >
                <Ionicons
                  name={icon} 
                  color={Colors.text}
                  size={Spacing * 2}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
  )
}
