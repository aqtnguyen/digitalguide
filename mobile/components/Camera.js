import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Button, SafeAreaView } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";

const Camera = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = (id) => {
    setScanned(true);
    Linking.openURL(id.data);
    //navigation.navigate("Poi", { id: id.data }) | QR Code only with single POI ID
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ flex: 1 }}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});

export default Camera;
