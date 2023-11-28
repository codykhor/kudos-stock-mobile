import React, { useState } from "react";
import { StyleSheet, View, Text, Keyboard } from "react-native";
import { Input, Button } from "react-native-elements";
import { scaleSize } from "../constants/Layout";
import { Space } from "../constants/Space";
import validator from "validator";

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submission, setSubmission] = useState(false);

  // validate input
  const isValidEmail = (email) => {
    return validator.isEmail(email);
  };

  const isValidPassword = (password) => {
    const pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/;
    return pwdRegex.test(password);
  };

  const handleSubmit = () => {
    setSubmission({
      email: !isValidEmail(email),
      password: !isValidPassword(password),
    });

    if (isValidEmail(email) && isValidPassword(password)) {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <View style={styles.main}>
      <Space>
        <Text style={styles.title}>Welcome!</Text>
      </Space>
      <View style={styles.container}>
        <Input
          style={styles.text}
          label="Email"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Enter email address"
          placeholderTextColor="#495057"
          value={email}
          onChangeText={setEmail}
        />
        {!isValidEmail(email) && submission.email && (
          <Text style={styles.errorMsg}>
            Invalid email address. Please try again.
          </Text>
        )}
        <Space />
        <Input
          style={styles.text}
          secureTextEntry={true}
          label="Password"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Enter password"
          placeholderTextColor="#495057"
          value={password}
          onChangeText={setPassword}
        />
        {!isValidPassword(password) && submission.password && (
          <Text style={styles.errorMsg}>
            Password must:
            {"\n"} - Be at least 8 characters long.
            {"\n"} - Contain at least one uppercase letter.
            {"\n"} - Contain at least one lowercase letter.
            {"\n"} - Contain at least one digit.
          </Text>
        )}
        <Space>
          <Button
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitle}
            title="Sign In"
            onPress={handleSubmit}
          />
        </Space>
        <Space>
          <Text style={styles.text}>Not a member yet?</Text>
          <Button
            title="Sign Up"
            type="clear"
            titleStyle={styles.buttonSubtitle}
            onPress={() => navigation.navigate("Signup")}
          />
        </Space>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    marginBottom: scaleSize(20),
  },
  title: {
    fontSize: scaleSize(20),
    fontWeight: 800,
    alignSelf: "center",
    color: "white",
    margin: scaleSize(20),
    paddingBottom: scaleSize(20),
  },
  container: {
    paddingHorizontal: scaleSize(15),
  },
  buttonStyle: {
    backgroundColor: "#3d5a80",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 100,
  },
  buttonTitle: {
    fontWeight: "bold",
  },
  buttonSubtitle: {
    color: "#98c1d9",
    fontSize: scaleSize(15),
    alignSelf: "center",
  },
  text: {
    color: "white",
    fontSize: scaleSize(15),
    alignSelf: "center",
  },
  errorMsg: {
    color: "grey",
    fontSize: scaleSize(12),
    alignSelf: "center",
  },
});
