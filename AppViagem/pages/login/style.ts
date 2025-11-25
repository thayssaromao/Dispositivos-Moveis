import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#81A4CD",
    width: "100%",
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
    height: "70%",
    gap: 15
  },
  titleContainer: {
    width: "100%",
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 40,
  },
  input: {
    width: "90%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  googleBtn: {
    width: "90%",
    height: 50,
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  googleText: {
    fontSize: 16,
    fontWeight: "500",
  },
  loginBtn: {
    width: "90%",
    height: 50,
    borderRadius: 12,
    backgroundColor: "#F17300",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerText: {
    fontSize: 14,
    color: "#000000ff",
  },
  registerLink: {
    fontWeight: "bold",
  },
});

export default styles;