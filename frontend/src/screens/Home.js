import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import baseURL from '../../assets/common/baseurl';
import Header from '../components/Header';
import Toast from 'react-native-toast-message';

const Home = () => {
  const [latestData, setLatestData] = useState({
    cellFood: {},
    cellWeight: {},
    pH: {},
    rfid: {},
    foodLevel: {},
    waterLevel: {},
  });

  const fetchLatestData = async () => {
    try {
      const [
        cellFoodResponse,
        cellWeightResponse,
        pHResponse,
        rfidResponse,
        foodLevelResponse,
        waterLevelResponse,
      ] = await Promise.all([
        axios.get(`${baseURL}/loadcell-food-data`),
        axios.get(`${baseURL}/loadcell-data`),
        axios.get(`${baseURL}/ph-data`),
        axios.get(`${baseURL}/rfid-data`),
        axios.get(`${baseURL}/foodlevel-data`),
        axios.get(`${baseURL}/waterlevel-data`),
      ]);

      const processLatestData = (data) => {
        return data.length ? data[data.length - 1] : {};
      };

      const newLatestData = {
        cellFood: processLatestData(cellFoodResponse.data),
        cellWeight: processLatestData(cellWeightResponse.data),
        pH: processLatestData(pHResponse.data),
        rfid: processLatestData(rfidResponse.data),
        foodLevel: processLatestData(foodLevelResponse.data),
        waterLevel: processLatestData(waterLevelResponse.data),
      };

      setLatestData(newLatestData);

      // Toast conditions
      if (newLatestData.foodLevel.foodLevel <= 20) {
        Toast.show({
          type: 'error',
          text1: 'Warning',
          text2: 'Food stock is low!',
          topOffset: 60,
          props: {
            onClose: () => Toast.hide(), // Adding close button functionality
          },
        });
      }
      if (newLatestData.pH.ph <= 6 || newLatestData.pH.ph > 8) {
        Toast.show({
          type: 'error',
          text1: 'Warning',
          text2: 'pH level is not safe!',
          topOffset: 60,
          props: {
            onClose: () => Toast.hide(), // Adding close button functionality
          },
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchLatestData(); // Initial fetch
    const interval = setInterval(fetchLatestData, 3000); // Fetch every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const renderScale = (title, value, icon, unit, style) => (
    <View style={[styles.sensorContainer, style]}>
      <Text style={styles.sensorTitle}>{title}</Text>
      <View style={[styles.scale, style]}>
        {icon}
        <Text style={styles.scaleText}>{value !== undefined && value !== null ? `${value} ${unit}` : 'N/A'}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Header title="Pet Feeder Monitoring" />
      <Text style={styles.title}>Latest Sensor Data</Text>
      <View style={styles.chartContainer}>
        {renderScale(
          'Cell Food',
          latestData.cellFood.weight,
          <FontAwesome5 name="utensils" size={64} color="black" />,
          'g',
          styles.cellFood
        )}
        {renderScale(
          'Cell Weight',
          latestData.cellWeight.weightScale,
          <FontAwesome5 name="weight" size={64} color="black" />,
          'kg',
          styles.cellWeight
        )}
        {renderScale(
          'pH',
          latestData.pH.ph,
          <MaterialCommunityIcons name="water-percent" size={64} color="black" />,
          'pH',
          styles.pH
        )}
        {renderScale(
          'RFID',
          latestData.rfid.uid,
          <MaterialCommunityIcons name="tag" size={64} color="black" />,
          '',
          styles.rfid
        )}
        {renderScale(
          'Food Level',
          latestData.foodLevel.foodLevel,
          <FontAwesome5 name="box" size={64} color="black" />,
          'g',
          styles.foodLevel
        )}
        {renderScale(
          'Water Level',
          latestData.waterLevel.waterLevel,
          <MaterialCommunityIcons name="cup-water" size={64} color="black" />,
          '%',
          styles.waterLevel
        )}
      </View>
      <Toast config={{
        error: ({ text1, text2, props }) => (
          <View style={styles.toastContainer}>
            <Text style={styles.toastText1}>{text1}</Text>
            <Text style={styles.toastText2}>{text2}</Text>
            <TouchableOpacity onPress={props.onClose}>
              <Text style={styles.toastCloseButton}>X</Text>
            </TouchableOpacity>
          </View>
        ),
      }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 16, textAlign: 'center' },
  chartContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  sensorContainer: { marginBottom: 20, alignItems: 'center' },
  sensorTitle: { fontSize: 20, marginBottom: 10 },
  scale: { width: 200, height: 200, justifyContent: 'center', alignItems: 'center', borderRadius: 100, borderWidth: 5 },
  scaleText: { fontSize: 18, marginTop: 10 },
  cellFood: { borderColor: '#f39c12', backgroundColor: '#f7dc6f' },
  cellWeight: { borderColor: '#27ae60', backgroundColor: '#abebc6' },
  pH: { borderColor: '#2980b9', backgroundColor: '#aed6f1' },
  rfid: { borderColor: '#8e44ad', backgroundColor: '#d7bde2' },
  foodLevel: { borderColor: '#e67e22', backgroundColor: '#f0b27a' },
  waterLevel: { borderColor: '#3498db', backgroundColor: '#85c1e9' },
  toastContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'red', padding: 10, borderRadius: 5 },
  toastText1: { color: 'white', fontWeight: 'bold', marginRight: 10 },
  toastText2: { color: 'white', marginRight: 10 },
  toastCloseButton: { color: 'white', fontWeight: 'bold' },
});

export default Home;
