import React, { useState } from "react";
import {
    TextInput
} from "react-native";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
import Spacing from "../../constants/Spacing";

const AppTextInput= ({ ...otherProps }) => {
    const [focused, setFocused] = useState(false);
    return (
        <TextInput
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholderTextColor={Colors.darkText}
            style={[
                {
                    fontSize: FontSize.small,
                    padding: Spacing * 2,
                    backgroundColor: Colors.lightPrimary,
                    borderRadius: Spacing,
                    marginVertical: Spacing,
                },
                focused && {
                    borderWidth: 3,
                    borderColor: Colors.primary,
                    shadowOffset: { width: 4, height: Spacing },
                    shadowColor: Colors.primary,
                    shadowOpacity: 0.2,
                    shadowRadius: Spacing,
                },
            ]}
            {...otherProps}
        />
    );
};

export default AppTextInput;