import React, { useState } from "react";
import { StyleSheet, View, Text, Keyboard } from "react-native";
import { Input, Button } from "react-native-elements";
import { scaleSize } from "../constants/Layout";
import { Space } from "../constants/Space";
import validator from "validator";
import { useStocksContext } from "../contexts/StocksContext";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submission, setSubmission] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { ServerURL } = useStocksContext();

  // validate input
  const isValidEmail = (email) => {
    return validator.isEmail(email);
  };

  const isValidPassword = (password) => {
    const pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/;
    return pwdRegex.test(password);
  };

  const handleSubmit = async () => {
    setSubmission({
      email: !isValidEmail(email),
      password: !isValidPassword(password),
    });

    // add user to database
    if (isValidEmail(email) && isValidPassword(password)) {
      try {
        const response = await fetch(ServerURL + "/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          setEmail("");
          setPassword("");
          setErrorMsg("");
          alert("Sign up success! Please check your email for verification.");
          // console.log(response);
        } else {
          const errorData = await response.json();
          // console.log(response);
          if (errorData && errorData.message) {
            setErrorMsg(errorData.message);
            alert(errorMsg);
          } else {
            setErrorMsg("Error encountered. Please try again.");
            alert(errorMsg);
          }
        }
      } catch (error) {
        console.log(error);
      }
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
            title="Sign Up"
            onPress={handleSubmit}
          />
        </Space>
        {errorMsg !== "" && <Text style={styles.errorMsg}>{errorMsg}</Text>}
        <Space>
          <Text style={styles.text}>Already a member?</Text>
          <Button
            title="Sign In"
            type="clear"
            titleStyle={styles.buttonSubtitle}
            onPress={() => navigation.navigate("Signin")}
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
